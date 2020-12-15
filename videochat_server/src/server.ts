import express , { Application } from "express";
import { Server as SocketIOServer, Socket } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import User from "./User"

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    //private activeSockets: string[] = [];
    private rooms: Map<string, User[] | undefined>;

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.rooms = new Map();
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer, {
            cors: {
              origin: "http://localhost:3000",
              methods: ["GET", "POST"]
            }
        });

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private handleRoutes(): void{
        this.app.get('/', (req, res) => {
            res.send('<h1>Hello world</h1>');
        });
    }

    private removeUser(socket: Socket): void{
        for(const key of this.rooms.keys()){   
            this.rooms.set(key, this.rooms.get(key)?.filter(user =>{
                return user.getUserId() !== socket.id;
            }));
        }
    }

    private handleSocketConnection(): void{
        this.io.on('connection', (socket: Socket) =>{
            console.log('connected ', socket.id, socket.request.headers.referer );
            
            socket.on('create-room', (name:string , cb: (roomId: string, err?: Error) => void) =>{
                const roomId: string = Math.random().toString(16).slice(2, 7);
                socket.join(roomId);
                this.rooms.set(roomId, [new User(socket.id, name)]);
                cb(roomId);
                console.log(this.rooms);
            })

            socket.on('join-room', (data: {roomId: string, name: string}, cb:(res?: string, err?: string) => void) =>{
                console.log(data.roomId);
                if(!this.rooms.get(data.roomId)){
                    cb(undefined, 'This room doesn\'t exist.'); 
                    return;
                }else{
                    if(this.rooms.get(data.roomId)?.length === 2){
                        const error = 'The room is full.';
                        cb(undefined, error);
                        return;
                    }

                    socket.join(data.roomId);
                    let user;
                    console.log(this.rooms.size);
                    if(this.rooms.size != 0){
                        const iterator = this.rooms.values();
                        [user] = iterator.next().value;
                        console.log(user);

                    }
                    this.rooms.get(data.roomId)?.push(new User(socket.id, data.name));
                    socket.broadcast.to(data.roomId).emit('update-user-list', data.name, socket.id); 
                    socket.emit('update-user-list', user?.getUserName(), user?.getUserId());
                    console.log(this.rooms);
                    cb(data.roomId);
                }
            })

            socket.on('make-offer', (data) =>{
                socket.to(data.roomId).emit('offer-made', {
                    data: data.offer,
                    socketId: socket.id
                }); 
            });

            socket.on('make-answer', (data) =>{
                socket.to(data.socketId).emit('answer-made', {
                    data: data.answer,
                    socketId: socket.id
                })
            })

            socket.on('disconnect', () =>{
                console.log('disconnect', socket.id);

                this.removeUser(socket);

                console.log(this.rooms);

                socket.broadcast.emit('remove-user', {
                    socketId: socket.id
                });
            });

            socket.on("call-user", (data: { to: any; offer: any; }) => {
                socket.to(data.to).emit("call-made", {
                    offer: data.offer,
                    socket: socket.id
                });
            });

            socket.on('make-answer', (data: { to: any; answer: any; }) =>{
                socket.to(data.to).emit('answer-made',  {
                    socket: socket.id,
                    answer: data.answer
                });
            });

            socket.on('leave', (roomId: string) =>{
                socket.leave(roomId);
                this.removeUser(socket);
                console.log(this.rooms);
            })
        });
    }

    public listen(callback: (port: number) => void): void {  
        this.httpServer.listen(this.DEFAULT_PORT, () =>{
            callback(this.DEFAULT_PORT)
        });
    }
}