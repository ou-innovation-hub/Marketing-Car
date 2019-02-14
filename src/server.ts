import app from "./app";
import {SocketListener} from "./routes/Sockets";
const PORT = 8081;

var socket:SocketListener;
var server = app.app.listen(PORT, () => {
    console.log('Express server listening on localhost:' + PORT);
});

socket = new SocketListener(server);
socket.setListeners();