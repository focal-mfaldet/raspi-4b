/* MMM-RoomSensor — displays room temp/humidity written by scripts/dht_read.py.
 * The python script writes sensor.json into this folder; the client just reads it.
 */
Module.register("MMM-RoomSensor", {
  defaults: {
    updateInterval: 60 * 1000,
    dataFile: "modules/MMM-RoomSensor/sensor.json",
    staleAfter: 10 * 60 * 1000 // hide if no fresh reading in 10 min
  },

  getStyles() {
    return ["MMM-RoomSensor.css"];
  },

  start() {
    this.sensor = null;
    this.fetchData();
    setInterval(() => this.fetchData(), this.config.updateInterval);
  },

  async fetchData() {
    try {
      const res = await fetch(this.config.dataFile + "?t=" + Date.now());
      if (res.ok) {
        this.sensor = await res.json();
        this.updateDom(500);
      }
    } catch (e) {
      // ignore transient read errors
    }
  },

  getDom() {
    const w = document.createElement("div");
    w.className = "rs-wrapper dimmed small";
    if (!this.sensor) {
      return w;
    }
    const ageMs = Date.now() - (this.sensor.ts || 0) * 1000;
    if (ageMs > this.config.staleAfter) {
      return w;
    }
    w.innerHTML =
      '<i class="fa fa-thermometer-half"></i> Room ' +
      this.sensor.tempF + "° · " + this.sensor.humidity + "%";
    return w;
  }
});
