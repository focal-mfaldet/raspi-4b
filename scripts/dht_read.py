#!/usr/bin/env python3
"""Read a DHT22 and write temp/humidity JSON for MMM-RoomSensor.

Wiring (DHT22 / AM2302):
    DATA -> BCM 4 (physical pin 7)
    VCC  -> 3.3V
    GND  -> GND
    10k pull-up resistor between DATA and VCC (one is in your Freenove kit)

Deps:
    sudo apt install libgpiod2
    pip install --break-system-packages adafruit-circuitpython-dht

Runs forever; install as a systemd service (see systemd/dht-sensor.service).
DHT sensors throw frequent transient read errors — that's normal, we just retry.
"""
import json
import os
import time
import board
import adafruit_dht

OUT = os.path.abspath(
    os.path.join(os.path.dirname(__file__), "..", "modules", "MMM-RoomSensor", "sensor.json")
)
INTERVAL = 60

dht = adafruit_dht.DHT22(board.D4)

while True:
    try:
        temp_c = dht.temperature
        humidity = dht.humidity
        if temp_c is not None and humidity is not None:
            data = {
                "tempF": round(temp_c * 9 / 5 + 32),
                "humidity": round(humidity),
                "ts": time.time(),
            }
            with open(OUT, "w") as f:
                json.dump(data, f)
    except RuntimeError:
        pass  # transient sensor read failure — ignore and retry
    time.sleep(INTERVAL)
