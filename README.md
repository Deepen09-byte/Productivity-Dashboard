# Productivity Dashboard

A single-page productivity dashboard built with vanilla HTML, CSS, and JavaScript — no frameworks, no build step. Combines a to-do list, a daily planner, a Pomodoro timer, live weather, a motivational quote widget, and a theme switcher.

## Features

- **To-Do List** — add tasks, mark them complete, persisted in `localStorage` so your list survives a refresh
- **Daily Planner** — hour-by-hour schedule from 6:00 AM to 11:00 PM, editable inline, auto-saved to `localStorage`
- **Pomodoro Timer** — 25-minute work sessions / 5-minute breaks, with start/pause/reset controls
- **Live Weather** — current temperature, condition, wind, and humidity for a configured city, via WeatherAPI
- **Motivational Quotes** — random quote + author fetched from a public quotes API on load
- **Theme Switcher** — cycles through 4 custom color themes (dark, blue, slate, warm) using CSS custom properties
- **Live Clock & Date** — updates every second, 12-hour format with AM/PM

## Tech Stack

- HTML5
- CSS3 (custom properties for theming)
- Vanilla JavaScript (no frameworks, no build tools)
- Browser `localStorage` for persistence (tasks, daily plan)
- External APIs:
  - [WeatherAPI](https://www.weatherapi.com/) — current weather data
  - Motivational Spark API — random quotes

## Project Structure

```
Productivity-Dashboard/
├── index.html
├── style.css
├── script.js
└── README.md
```

## Getting Started

No installation or build step required — it's plain HTML/CSS/JS.

1. Clone the repo:
   ```bash
   git clone https://github.com/Deepen09-byte/Productivity-Dashboard.git
   cd Productivity-Dashboard
   ```
2. Open `index.html` directly in a browser, or serve it locally (recommended, avoids any fetch/CORS quirks with `file://`):
   ```bash
   npx serve .
   ```

### Weather API Key

The weather widget calls WeatherAPI with an API key. **Don't commit a real key directly in `script.js`** — before pushing this publicly:

1. Get a free key from [weatherapi.com](https://www.weatherapi.com/)
2. Move it out of the source file — either into a small local config file that's git-ignored, or load it via a backend/proxy if you don't want it exposed client-side at all (any key shipped in frontend JS is technically visible to anyone who opens dev tools)
3. Add that config file to `.gitignore`

The city is currently hardcoded (`Shahada`) — consider making it a user-editable input if you want the dashboard to work for other users.

## Known Limitations / Ideas for Improvement

- Weather city is hardcoded — no UI to change location
- No dark/light mode persistence — theme resets to default on page reload (only in-session)
- Task list has no edit or reorder functionality, only add/complete/remove
- No backend — everything is client-side and per-browser (clearing localStorage wipes tasks/plan)
- Pomodoro timer doesn't persist state across a page refresh mid-session
