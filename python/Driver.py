import socketio
sio = socketio.Client()
sio.connect('http://localhost:8081')

@sio.on('connect')
def on_connect():
    print("Im connected")


@sio.on('left')
def on_left(data):
    print("Left")

@sio.on('right')
def on_right(data):
    print("Right")
