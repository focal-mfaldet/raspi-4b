#!/usr/bin/env bash
# setup.sh — install + wire the smart frame on a fresh Raspberry Pi OS (Bookworm).
#
# Run this ON THE PI, from inside the cloned repo:
#     cd ~/raspi-4b && ./setup.sh
#
# It is re-runnable: anything already in place is skipped. It does README steps 2–7.
# Paths and the systemd user are derived automatically, so your username can be anything.
set -euo pipefail

REPO_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
MM_DIR="$HOME/MagicMirror"
USER_NAME="$(id -un)"

echo "==> Smart frame setup (user: $USER_NAME, repo: $REPO_DIR)"

# --- Step 2: MagicMirror² ---
if [ ! -d "$MM_DIR" ]; then
  echo "==> Installing MagicMirror² (long; may prompt to set up pm2 autostart)"
  bash -c "$(curl -sL https://raw.githubusercontent.com/sdetweil/MagicMirror_scripts/master/raspberry.sh)"
else
  echo "==> MagicMirror² already present — skipping install"
fi

# --- Step 3: link config + custom modules, clone photo module ---
echo "==> Linking config and modules"
ln -sf  "$REPO_DIR/config/config.js"               "$MM_DIR/config/config.js"
ln -sfn "$REPO_DIR/modules/MMM-WeddingCountdown"   "$MM_DIR/modules/MMM-WeddingCountdown"
ln -sfn "$REPO_DIR/modules/MMM-RoomSensor"         "$MM_DIR/modules/MMM-RoomSensor"

if [ ! -d "$MM_DIR/modules/MMM-Wallpaper" ]; then
  git clone https://github.com/sdetweil/MMM-Wallpaper.git "$MM_DIR/modules/MMM-Wallpaper"
else
  echo "==> MMM-Wallpaper already present — skipping"
fi

# --- Step 6 deps: ddcutil for monitor power over DDC/CI ---
echo "==> Installing ddcutil and enabling i2c"
sudo apt-get update
sudo apt-get install -y ddcutil
sudo usermod -aG i2c "$USER_NAME"
chmod +x "$REPO_DIR/scripts/display-power.sh"

# --- Step 7 deps: DHT22 room sensor (optional) ---
INSTALL_DHT=0
read -r -p "Install DHT22 room-sensor deps too? [y/N] " ans
if [[ "${ans,,}" == "y" ]]; then
  sudo apt-get install -y libgpiod2
  pip install --break-system-packages adafruit-circuitpython-dht
  INSTALL_DHT=1
fi

# --- systemd services, generated with this user + these paths ---
echo "==> Installing systemd services"
gen_service() {
  local name="$1" desc="$2" script="$3" after="$4"
  sudo tee "/etc/systemd/system/$name" >/dev/null <<EOF
[Unit]
Description=$desc
After=$after

[Service]
ExecStart=/usr/bin/python3 $REPO_DIR/scripts/$script
Restart=always
User=$USER_NAME

[Install]
WantedBy=multi-user.target
EOF
}

gen_service "motion-display.service" "Smart frame — PIR motion to display power" "motion-display.py" "graphical.target"
sudo systemctl daemon-reload
sudo systemctl enable --now motion-display.service

if [ "$INSTALL_DHT" = "1" ]; then
  gen_service "dht-sensor.service" "Smart frame — DHT22 room sensor reader" "dht_read.py" "multi-user.target"
  sudo systemctl daemon-reload
  sudo systemctl enable --now dht-sensor.service
fi

cat <<DONE

==> Done. Manual steps that remain:
   1. Fill in the TODOs in config/config.js
      (OpenWeather key, wedding date, iCloud calendar .ics, iCloud album id).
   2. Set portrait rotation — README step 5.
   3. Reboot so i2c group membership takes effect:  sudo reboot
DONE
