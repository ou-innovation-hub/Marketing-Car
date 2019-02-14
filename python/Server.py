from flask import Flask, render_template, Response, request
from werkzeug.datastructures import ImmutableMultiDict
import numpy as np
import cv2
import time
import engineio as eio
import eventlet
from flask_socketio import SocketIO
app = Flask(__name__)
frame = None
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)
def gen():
    """Video streaming generator function."""
    global frame
    while True:
        if frame is None:
            yield b'--frame\r\n' \
                  b'Content-Type: image/jpeg\r\n\r\n' + b'\r\n'
            return
#        yield(frame)
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')



@app.route('/')
def index():
    """Video streaming home page."""
    return render_template('index.html')

@app.route('/video_feed', methods=['POST', 'GET'])
def video_feed():
    global frame
    if request.method == 'GET':
        return Response(gen(),
                        mimetype='multipart/x-mixed-replace; boundary=frame')
    if request.method == 'POST':
        # r = request
        # nparr = np.fromstring(r.data, np.uint8)
        # img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        frame = request.data
        return "OK"

@socketio.on('image')
def handleImage(image):
    global frame
    frame = image
    # print(type(image))
    # print("Got image")

if __name__ == '__main__':
    app.run(host='0.0.0.0', port =83, debug=True, threaded=True)
    socketio.run(app)
