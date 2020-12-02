import express , { Application } from "express";
import { Server as SocketIOServer } from "socket.io";
import { createServer, Server as HTTPServer } from "http";
import User from "./User"

export class Server {
    private httpServer: HTTPServer;
    private app: Application;
    private io: SocketIOServer;
    private activeSockets: string[] = [];
    private activeUsers: User[] = [];

    private readonly DEFAULT_PORT = 5000;

    constructor() {
        this.app = express();
        this.httpServer = createServer(this.app);
        this.io = new SocketIOServer(this.httpServer);

        this.handleRoutes();
        this.handleSocketConnection();
    }

    private handleRoutes(): void{
        this.app.get('/', (req, res) => {
            res.send('<h1>Hello world</h1>');
        });
    }

    private handleSocketConnection(): void{
        this.io.on('connection', socket =>{
            const existingSocket = this.activeSockets.find(
                existingSocket => existingSocket === socket.id
            );
            if(!existingSocket){
                this.activeSockets.push(socket.id);
            }

            socket.on('add-user', (data:{userName: string, socketId: string}) =>{
                this.activeUsers.push(new User(data.socketId, data.userName));
                socket.broadcast.emit('update-user-list', this.activeUsers);
            })

            socket.on('disconnect', () =>{
                this.activeSockets = this.activeSockets.filter(
                    existingSocket => existingSocket != socket.id
                )
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
        });
    }

    public listen(callback: (port: number) => void): void {  
        this.httpServer.listen(this.DEFAULT_PORT, () =>{
            callback(this.DEFAULT_PORT)
        });
    }
}