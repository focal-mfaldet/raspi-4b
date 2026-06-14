#!/usr/bin/env bash
# Turn the external monitor on/off over DDC/CI. Works under both X11 and Wayland
# because it talks to the monitor over the HDMI data channel, not the OS display server.
#
# Setup:  sudo apt install ddcutil
#         sudo usermod -aG i2c "$USER"   (then reboot)
#         verify with:  ddcutil detect
#
# Usage:  display-power.sh on | off
#
# If your monitor ignores DDC power control, comment out the ddcutil lines and use
# the Wayland fallback instead (adjust HDMI-A-1 to your output from `wlr-randr`):
#   on)  wlr-randr --output HDMI-A-1 --on  ;;
#   off) wlr-randr --output HDMI-A-1 --off ;;
set -euo pipefail
ACTION="${1:-on}"
case "$ACTION" in
  on)  ddcutil setvcp D6 01 ;;   # VCP D6 = power mode: 01 = on
  off) ddcutil setvcp D6 04 ;;   # 04 = off (use 05 if your monitor only supports standby)
  *)   echo "usage: $0 on|off" >&2; exit 1 ;;
esac
