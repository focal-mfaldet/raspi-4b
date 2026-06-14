# raspi-4b — portrait smart frame

A wall-mounted MagicMirror² smart frame on a Raspberry Pi 4 (2GB).
Portrait orientation, no glass, no news. Photos come from an iCloud Shared Album,
plus a wedding countdown, calendar, weather, and an optional room sensor.

> Throughout this repo the username is assumed to be `pi` and paths live under
> `/home/pi`. Raspberry Pi Imager makes you pick a username — if yours differs,
> replace `pi` everywhere (config paths, scripts, systemd units).

## What's here

```
config/config.js                  MagicMirror config (no news, portrait layout)
modules/MMM-WeddingCountdown/      custom: days-until-the-wedding
modules/MMM-RoomSensor/            custom: shows DHT22 temp/humidity
scripts/display-power.sh           monitor on/off over DDC/CI
scripts/motion-display.py          PIR motion -> wake/sleep the screen
scripts/dht_read.py                DHT22 reader -> writes sensor.json
systemd/*.service                  run the two scripts on boot
docs/PARTS.md                      shopping list
```

## 1. Flash the OS
- Raspberry Pi Imager → Raspberry Pi OS (64-bit, with desktop).
- In Imager settings: set hostname, **username**, Wi-Fi, enable SSH.

## Fast path: setup.sh
After flashing, do steps 2–7 in one shot:
```bash
cd ~ && git clone https://github.com/focal-mfaldet/raspi-4b.git
cd ~/raspi-4b && ./setup.sh
```
`setup.sh` installs MagicMirror, links this repo's config + modules, clones the
photo module, installs ddcutil, and generates+enables the systemd services for
your user. Then jump to step 4 (fill in TODOs) and step 5 (rotation). The manual
steps below are the same thing, broken out, if you'd rather do it by hand.

## 2. Install MagicMirror²
```bash
sudo apt update && sudo apt full-upgrade -y
bash -c "$(curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/raspberry.sh)"
```
This installs Node + MagicMirror at `~/MagicMirror` and offers to set up pm2 autostart.

## 3. Wire in this repo
```bash
cd ~ && git clone https://github.com/focal-mfaldet/raspi-4b.git

# config (symlink so edits here are live)
ln -sf ~/raspi-4b/config/config.js ~/MagicMirror/config/config.js

# custom modules
ln -sf ~/raspi-4b/modules/MMM-WeddingCountdown ~/MagicMirror/modules/
ln -sf ~/raspi-4b/modules/MMM-RoomSensor ~/MagicMirror/modules/

# third-party photo module
cd ~/MagicMirror/modules && git clone https://github.com/sdetweil/MMM-Wallpaper.git
```

## 4. Fill in config.js
Open `config/config.js` and replace every `TODO`:
- **Weather** — free API key from openweathermap.org/api, plus your lat/lon.
- **Wedding** — the real `weddingDate` (ISO format, with start time).
- **Calendar** — iCloud: Calendar app → share a calendar → Public Calendar →
  copy the link and change `webcal://` to `https://`.
- **Photos** — iCloud Shared Album → turn on "Public Website" → copy the text
  *after* the `#` in the link into `source: "icloud:..."`.

## 5. Portrait rotation
Bookworm uses Wayland. Find your output name with `wlr-randr`, then add to
`~/.config/wayfire.ini` (or use the desktop's Screen Configuration GUI):
```ini
[output:HDMI-A-1]
transform = 270
```
(Use 90 or 270 depending on which way you hang the frame.)

## 6. Motion wake (PIR)
```bash
sudo apt install -y ddcutil
sudo usermod -aG i2c $USER        # then reboot
ddcutil detect                    # confirm the monitor is found
chmod +x ~/raspi-4b/scripts/display-power.sh

sudo cp ~/raspi-4b/systemd/motion-display.service /etc/systemd/system/
sudo systemctl enable --now motion-display.service
```
Wiring: PIR `OUT`→BCM17, `VCC`→5V, `GND`→GND. Screen wakes on approach, sleeps
after 3 min idle (tune `IDLE_TIMEOUT` in the script).

## 7. Room sensor (optional)
```bash
sudo apt install -y libgpiod2
pip install --break-system-packages adafruit-circuitpython-dht

sudo cp ~/raspi-4b/systemd/dht-sensor.service /etc/systemd/system/
sudo systemctl enable --now dht-sensor.service
```
Wiring: DHT22 `DATA`→BCM4, `VCC`→3.3V, `GND`→GND, 10k pull-up DATA↔VCC.

## First milestone (do this before buying a frame)
Run on any TV/monitor and confirm clock + weather + calendar + the wedding
countdown render, then breadboard the PIR and DHT to prove motion-wake and the
room widget. Only then commit to the frame build.
