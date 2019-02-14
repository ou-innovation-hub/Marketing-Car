"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var app_1 = require("./app");
var Sockets_1 = require("./routes/Sockets");
var PORT = 8081;
var socket;
var server = app_1.default.app.listen(PORT, function () {
    console.log('Express server listening on localhost:' + PORT);
});
socket = new Sockets_1.SocketListener(server);
socket.setListeners();
//# sourceMappingURL=server.js.map