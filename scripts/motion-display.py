#!/usr/bin/env python3
"""Wake the frame's monitor on motion, sleep it after an idle timeout.

Wiring (HC-SR501 PIR):
    OUT  -> BCM 17 (physical pin 11)
    VCC  -> 5V
    GND  -> GND

Runs forever; install as a systemd service (see systemd/motion-display.service).
gpiozero ships on Raspberry Pi OS and uses the lgpio backend on Bookworm.
"""
import os
import subprocess
import time
from gpiozero import MotionSensor

PIR_PIN = 17
IDLE_TIMEOUT = 180  # seconds with no motion before the screen sleeps
HELPER = os.path.join(os.path.dirname(os.path.abspath(__file__)), "display-power.sh")

pir = MotionSensor(PIR_PIN)
screen_on = None
last_motion = time.time()


def set_power(on):
    global screen_on
    if on != screen_on:
        subprocess.run([HELPER, "on" if on else "off"], check=False)
        screen_on = on


set_power(True)
while True:
    if pir.motion_detected:
        last_motion = time.time()
        set_power(True)
    elif time.time() - last_motion > IDLE_TIMEOUT:
        set_power(False)
    time.sleep(1)
