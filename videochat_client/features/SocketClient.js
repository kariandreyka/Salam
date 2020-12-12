import io from 'socket.io-client';

const host = 'http://localhost:5000';

export default class socketAPI {
    socket;

    getId(){
        if(this.socket)
            return this.socket.id;
    }

    connect(){
        this.socket = io.connect(host);
        return new Promise((resolve, reject) =>{
            this.socket.on('connect', () => resolve());
            this.socket.on('connect_error', () => reject());
        });
    }

    disconnect(){
        return new Promise((resolve) =>{
            this.socket.disconnect(() =>{
                this.socket = null;
                resolve();
            });
        });
    }

    emit(event, data) {
        return new Promise((resolve, reject) => {
            if(!this.socket) return reject('No socket connection.');

            this.socket.emit(event, data, (res, err) =>{
                if(err){
                    console.log(err, res);
                    return reject(err);
                }

                return resolve(res);
            });
        });
    }

    on(event, fun){
        return new Promise((resolve, reject) =>{
            if(!this.socket) return reject('No socket connection.');

            this.socket.on(event, fun);
            resolve();
        });
    }
}