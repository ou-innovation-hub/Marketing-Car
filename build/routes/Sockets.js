"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Socket = require("socket.io");
var SocketListener = /** @class */ (function () {
    function SocketListener(app) {
        this.bufferHeader = null;
        this.io = Socket(app, { perMessageDeflate: false });
    }
    SocketListener.prototype.setListeners = function () {
        var _this = this;
        this.io.on('connection', function (socket) {
            console.log("Connected");
            socket.on('disconnect', function () {
                console.log("Client disconnected");
            });
            /* Presenter */
            socket.on('bufferHeader', function (packet) {
                // Buffer header can be saved on server so it can be passed to new user
                _this.bufferHeader = packet;
                socket.broadcast.emit('bufferHeader', packet);
            });
            socket.on('left', function () {
                _this.io.emit("left", "left");
            });
            socket.on('right', function () {
                _this.io.emit('right', "right");
            });
            socket.on('forward', function () {
                _this.io.emit('forward', 'forward');
            });
            socket.on('reverse', function () {
                _this.io.emit('reverse', 'reverse');
            });
            socket.on('stream', function (image) {
                socket.broadcast.emit('stream', image);
            });
            socket.on('audioStream', function (audio) {
                socket.broadcast.emit('audioStream', audio);
            });
            // Send buffer header to new user
            socket.on('requestBufferHeader', function () {
                console.log("Req buff head");
                socket.emit('bufferHeader', _this.bufferHeader);
            });
            socket.on('stop', function () {
                _this.io.emit('stop', 'stop');
            });
        });
    };
    return SocketListener;
}());
exports.SocketListener = SocketListener;
//# sourceMappingURL=Sockets.js.map