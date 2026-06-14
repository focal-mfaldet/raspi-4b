/* MMM-WeddingCountdown — a tiny self-contained countdown module.
 * No third-party dependencies, no node_helper. Set the date in config.js.
 */
Module.register("MMM-WeddingCountdown", {
  defaults: {
    weddingDate: "2026-07-18T16:00:00",
    title: "Mac & the big day",
    location: "Rosemount, MN · July 2026",
    updateInterval: 60 * 60 * 1000 // recompute hourly
  },

  getStyles() {
    return ["MMM-WeddingCountdown.css"];
  },

  start() {
    const self = this;
    setInterval(() => self.updateDom(1000), this.config.updateInterval);
  },

  getDom() {
    const wrapper = document.createElement("div");
    wrapper.className = "wc-wrapper";

    const target = new Date(this.config.weddingDate);
    const msPerDay = 24 * 60 * 60 * 1000;
    const days = Math.max(0, Math.ceil((target - new Date()) / msPerDay));

    const title = document.createElement("div");
    title.className = "wc-title";
    title.textContent = this.config.title;

    const big = document.createElement("div");
    big.className = "wc-days";
    if (days === 0) {
      big.textContent = "Today!";
    } else {
      big.textContent = days + " " + (days === 1 ? "day" : "days");
    }

    const loc = document.createElement("div");
    loc.className = "wc-location";
    loc.textContent = this.config.location;

    wrapper.appendChild(title);
    wrapper.appendChild(big);
    wrapper.appendChild(loc);
    return wrapper;
  }
});
