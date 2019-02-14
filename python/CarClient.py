from flask import Flask, render_template, Response
import requests
from camera_opencv import Camera
import socketio
import time
import cv2
import numpy as np
import Adafruit_PCA9685
pwm = Adafruit_PCA9685.PCA9685(0x40)
pwm.set_pwm_freq(60)
speedList = [372,374,376, 400, 430, 432, 434, 436]
speedIndex = 3
fwdmax = 550
stop = 400
revmax = 200
servo_min = 315  # Min pulse length out of 4096
servo_start = 400
servo_max = 525  # Max pulse length out of 4096
go = 400
inc = 1
turn = servo_start

sio = socketio.Client()
sio.connect('http://localhost:8081')

def changeSpeed(up=False, down=False):
    global speedIndex
    if up and speedIndex < len(speedList) - 1:
        speedIndex = speedIndex + 1
        return speedList[speedIndex]
    if down and speedIndex > 0:
        speedIndex =speedIndex - 1
        return speedList[speedIndex]
    return speedList[speedIndex]

def bootup():
    boot = 200
    while boot < fwdmax:
        boot += inc
        pwm.set_pwm(0,0,boot)
        pwm.set_pwm(1, 0, servo_start)
        time.sleep(0.1)
        if boot > fwdmax:
            while boot > revmax:
                 boot -= inc
                 pwm.set_pwm(0,0,boot)
                 time.sleep(0.1)
                 if boot < revmax:
                     boot = 400
                     pwm.set_pwm(0,0,boot)
                     spinup = 0
                     break


@sio.on('connect')
def on_connect():
    print("Im connected")
    bootup()

@sio.on('disconnect')
def on_disconnect():
    global go, speedIndex
    go = stop
    speedIndex = 3
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)

@sio.on('left')
def on_left(data):
    global turn
    if turn > servo_min:
                turn -= 5
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)
    print("Left")

@sio.on('right')
def on_right(data):
    global turn
    print("Right")
    if turn < servo_max:
                turn += 5
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)

@sio.on('forward')
def on_forward(data):
    global go
    if go < fwdmax:
        go = changeSpeed(up=True)
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)

@sio.on('reverse')
def on_reverse(data):
    global go
    if go > revmax:
        go = changeSpeed(down=True)
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)

@sio.on('stop')
def on_stop(data):
    global go, speedIndex
    go = stop
    speedIndex = 3
    pwm.set_pwm(0, 0, go)
    pwm.set_pwm(1, 0, turn)

