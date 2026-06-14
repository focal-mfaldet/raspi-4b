/* MagicMirror² config — raspi-4b smart frame
 *
 * Portrait orientation. No news, ever. Photos from an iCloud Shared Album.
 * Search this file for "TODO" and fill in every one before the first run.
 */
let config = {
  address: "0.0.0.0",
  port: 8080,
  basePath: "/",
  // Allow this machine + your home LAN (needed for MMM-Remote-Control from your phone).
  // Older MagicMirror versions call this "ipWhitelist".
  ipAllowList: ["127.0.0.1", "::ffff:127.0.0.1", "::1", "192.168.0.0/16"],
  useHttps: false,
  language: "en",
  locale: "en-US",
  logLevel: ["INFO", "LOG", "WARN", "ERROR"],
  timeFormat: 12,
  units: "imperial",

  modules: [
    {
      module: "clock",
      position: "top_left",
      config: {
        displaySeconds: false,
        showDate: true,
        dateFormat: "dddd, MMMM D"
      }
    },
    {
      module: "weather",
      position: "top_right",
      config: {
        weatherProvider: "openweathermap",
        type: "current",
        apiKey: "TODO_OPENWEATHER_API_KEY", // free key at openweathermap.org/api
        lat: 44.7391,   // TODO your location (default = Rosemount, MN)
        lon: -93.1258,
        showHumidity: true,
        showFeelsLike: true
      }
    },
    {
      module: "weather",
      position: "top_right",
      header: "Forecast",
      config: {
        weatherProvider: "openweathermap",
        type: "forecast",
        apiKey: "TODO_OPENWEATHER_API_KEY",
        lat: 44.7391,
        lon: -93.1258,
        maxNumberOfDays: 3,
        fade: false
      }
    },
    {
      module: "MMM-WeddingCountdown",
      position: "upper_third",
      config: {
        weddingDate: "2026-07-18T16:00:00", // TODO set the real date + start time
        title: "Mac & the big day",
        location: "Rosemount, MN · July 2026"
      }
    },
    {
      module: "calendar",
      header: "Upcoming",
      position: "middle_center",
      config: {
        maximumEntries: 6,
        maximumNumberOfDays: 60,
        fade: false,
        calendars: [
          {
            symbol: "calendar-check",
            // iCloud: make a calendar public, then paste its https .ics link here.
            // (Calendar app → right-click calendar → Share → Public Calendar → copy link,
            //  change webcal:// to https://)
            url: "https://TODO-your-icloud-published-calendar.ics"
          }
        ]
      }
    },
    {
      module: "MMM-Wallpaper",
      position: "lower_third",
      config: {
        // iCloud Shared Album → enable "Public Website" → copy the text AFTER the # in the link.
        source: "icloud:TODO_ALBUM_ID",
        slideInterval: 60 * 1000,
        maximumEntries: 100,
        fillRegion: false,
        width: "380px",
        height: "260px",
        crop: false,            // false = show whole photo (no cropping wedding shots)
        addCacheBuster: true
      }
    },
    {
      // Optional — only renders once the DHT22 is wired and scripts/dht_read.py is running.
      module: "MMM-RoomSensor",
      position: "bottom_left"
    },
    {
      module: "compliments",
      position: "bottom_bar",
      config: {
        updateInterval: 30000,
        compliments: {
          anytime: ["Be where your feet are.", "Good things are coming.", "One day closer."],
          morning: ["Morning, Mac.", "Make today count."],
          evening: ["Wind down.", "Proud of today's work."]
        }
      }
    }
  ]
};

if (typeof module !== "undefined") { module.exports = config; }
