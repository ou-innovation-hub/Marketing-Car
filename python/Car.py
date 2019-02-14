import Adafruit_PCA9685
import time, curses

pwm = Adafruit_PCA9685.PCA9685(0x40)
pwm.set_pwm_freq(60)

screen = curses.initscr()

curses.noecho()
curses.cbreak()

screen.keypad(True)
speedList = [372,374,376, 400, 430, 432, 434, 436]
speedIndex = 3
running = True
fwdmax = 550
stop = 400
revmax = 200
servo_min = 315  # Min pulse length out of 4096
servo_start = 400
servo_max = 525  # Max pulse length out of 4096
go = 400
turn = servo_start
inc = 1
spinup = 1
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

while running:
        char = screen.getch()
        if char == ord('q'):
                running=False
        else:
                if char == ('b') and spinup == 1:
                    bootup()
                if char == curses.KEY_UP:
                        if go < fwdmax:
                                go = changeSpeed(up=True)
                elif char == curses.KEY_DOWN:
                        if go > revmax:
                                go = changeSpeed(down=True)
                elif char == curses.KEY_LEFT:
                        if turn > servo_min:
                                turn -= 5
                elif char == curses.KEY_RIGHT:
                        if turn < servo_max:
                                turn += 5
                elif char == ord(' '):
                        go = stop
                        speedIndex = 3
        pwm.set_pwm(0, 0, go)
        pwm.set_pwm(1, 0, turn)
        print(turn)


# shut down cleanly
curses.nocbreak(); screen.keypad(0); curses.echo()
curses.endwin()
