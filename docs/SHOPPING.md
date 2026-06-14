# Shopping list + frame spec

All sized around the chosen display: **ASUS ProArt PA278CV** (27" matte IPS QHD),
mounted **portrait**, **no cover glass** (keeps the anti-glare benefit).

## Already have — don't buy
- Raspberry Pi 4 Model B (2GB)
- Freenove Ultimate Starter Kit (DHT11, jumpers, 10k resistors, breadboard, button)
- Official Pi 4 USB-C power supply *(if it came with one — else see list)*

## Buy

### Core electronics
| # | Item | ~Price | Link |
|---|---|---|---|
| 1 | ASUS ProArt PA278CV (27" matte IPS QHD) — or PA278QV (~$230, no USB-C) | $299 | [ASUS](https://www.asus.com/us/displays-desktops/monitors/proart/proart-display-pa278cv/) · [Amazon](https://www.amazon.com/s?k=ASUS+ProArt+PA278CV) |
| 2 | micro-HDMI → HDMI cable, right-angle, ~3 ft (Pi 4 uses *micro*-HDMI) | $9 | [Amazon](https://www.amazon.com/s?k=micro+hdmi+to+hdmi+right+angle+cable) |
| 3 | Argon ONE V3 case (active cooling, ports to the back) — M.2 version (~$45) if SSD-booting | $25 | [Amazon](https://www.amazon.com/s?k=Argon+ONE+V3+Raspberry+Pi+4+case) |
| 4 | SanDisk High Endurance 64GB microSD (survives 24/7 writes) | $14 | [Amazon](https://www.amazon.com/s?k=SanDisk+High+Endurance+64GB+microSD) |
| 5 | Official Raspberry Pi 4 USB-C PSU, 15W *(skip if you have one)* | $10 | [Amazon](https://www.amazon.com/s?k=official+raspberry+pi+4+power+supply) |

### Sensors
| # | Item | ~Price | Link |
|---|---|---|---|
| 6 | HC-SR501 PIR motion sensor (3-pack) — wakes/sleeps the screen | $8 | [Amazon](https://www.amazon.com/s?k=HC-SR501+PIR+motion+sensor) |
| 7 | DHT22 / AM2302 module (built-in pull-up) — room temp/humidity *(optional)* | $8 | [Amazon](https://www.amazon.com/s?k=DHT22+AM2302+module) |

### Mounting & cable management
| # | Item | ~Price | Link |
|---|---|---|---|
| 8 | VESA 100×100 low-profile fixed plate (monitor → frame backing) | $11 | [Amazon](https://www.amazon.com/s?k=VESA+100x100+low+profile+fixed+mount+plate) |
| 9 | Heavy-duty French cleat (rated ≥ 50 lb, into studs) | $13 | [Amazon](https://www.amazon.com/s?k=heavy+duty+french+cleat+picture+hanging) |
| 10 | Cable raceway / cord cover (hide the single drop to the outlet) | $13 | [Amazon](https://www.amazon.com/s?k=cable+raceway+cord+cover+paintable) |
| 11 | Velcro cable ties / adhesive clips | $6 | [Amazon](https://www.amazon.com/s?k=velcro+cable+ties) |

### DIY frame materials (you're building)
- Hardwood molding or 1×4 poplar/oak for the face + sides (see dimensions below)
- ¼" plywood/MDF backing board
- Wood glue, corner/strap clamps, brad nails or pocket screws
- Black paint or stain to taste
- (Optional) thin foam weatherstrip as a bezel cushion against the frame lip

**Rough total** (have Pi + PSU): **~$390** electronics/mounting + ~$40–70 frame materials.

---

## Frame build spec — portrait

Build to the **active image**, not the monitor body (the panel sits slightly off-center
behind the opening because of the bottom "chin").

| Dimension | Value | Notes |
|---|---|---|
| Active image (must show fully) | 336 × 597 mm (13.2 × 23.5 in) | portrait |
| **Sight opening — cut to this** | **334 × 594 mm (13.15 × 23.4 in)** | overlaps bezel ~1 mm/side; hides all black border |
| Monitor body to enclose (no stand) | 372 × 615 × 54 mm (14.65 × 24.2 × 2.1 in) | make inner cavity ≥ 380 × 620 mm |
| Box interior depth | ≥ 90 mm (3.5 in) | fits 54 mm panel + Pi/Argon behind + airflow |
| Monitor weight | 5.8 kg (12.8 lb) | plan the cleat for ~10 kg (22 lb) total |
| Outer size (example, 60 mm molding) | ~454 × 714 mm (18 × 28 in) | = opening + 2 × molding width |

Build notes:
- **Center the active area** in the opening — the ~30 mm bottom chin sits off-center behind the lip.
- **Mount via VESA 100×100** to an internal cross-brace; hang the whole box on a French cleat into studs.
- **Ventilate**: cut slots/holes top and bottom — it runs 24/7.
- **No glass/acrylic** over the panel — a cover would reintroduce the glare the matte panel avoids.
- Leave a notch/grommet at the bottom edge for the single power cord.

### Off-the-shelf size reference
IKEA RIBBA / RÖDALM **50×70 cm** (outer ~19.7 × 27.6 in) is close to the example outer size,
but only ~4.5 cm deep — too shallow for the Pi, so build deeper. Good for gauging proportions.
