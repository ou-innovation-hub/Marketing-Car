import {Server, Socket} from "socket.io";
var Socket = require("socket.io");
export class SocketListener{

    public io:Socket;
    public bufferHeader = null;
    constructor(app:any){
        this.io = Socket(app, {perMessageDeflate:false})
    }

    public setListeners() {
        this.io.on('connection', (socket: Socket)=> {
            console.log("Connected");
            socket.on('disconnect', function () {
                console.log("Client disconnected")
            });
            /* Presenter */
            socket.on('bufferHeader', (packet)=>{
                // Buffer header can be saved on server so it can be passed to new user
                this.bufferHeader = packet;
                socket.broadcast.emit('bufferHeader', packet);
            });
            socket.on('left', ()=>{
                this.io.emit("left", "left")
            });
            socket.on('right', ()=>{
                this.io.emit('right', "right")
            });
            socket.on('forward', ()=>{
                this.io.emit('forward', 'forward')
            });
            socket.on('reverse', ()=>{
                this.io.emit('reverse', 'reverse')
            });
            socket.on('stream', function(image){
                socket.broadcast.emit('stream',image);
            });
            socket.on('audioStream', function(audio){
                socket.broadcast.emit('audioStream', audio)
            });
            // Send buffer header to new user
            socket.on('requestBufferHeader', ()=>{
                console.log("Req buff head");
                socket.emit('bufferHeader', this.bufferHeader);
            });
            socket.on('stop', ()=>{
                this.io.emit('stop', 'stop')
            })
        })
    }
}
