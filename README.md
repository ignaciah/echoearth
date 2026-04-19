# echoearth
A real time global planetary pulse, visualizer and action platform that shows live environmental data(air quality, temperature, humidity, seismic activity) from open APIs.

```
echoearth/
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── Globe.jsx
│   │   │   ├── Hotspots.jsx
│   │   │   ├── VitalsPanel.jsx
│   │   │   ├── ActionButton.jsx
│   │   │   └── HelpCounter.jsx
│   │   ├── hooks/
│   │   │   ├── useWebSocket.js
│   │   │   └── usePlanetaryData.js
│   │   ├── utils/
│   │   │   ├── api.js
│   │   │   ├── coordinates.js
│   │   │   └── colors.js
│   │   ├── styles/
│   │   │   └── global.css
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── config.js
│   ├── package.json
│   ├── vite.config.js
│   └── .env
│
├── backend/
│   ├── src/
│   │   ├── routes/
│   │   │   ├── actions.js
│   │   │   └── data.js
│   │   ├── services/
│   │   │   ├── openaq.js
│   │   │   ├── weather.js
│   │   │   └── earthquakes.js
│   │   ├── socket/
│   │   │   └── index.js
│   │   ├── utils/
│   │   │   └── cache.js
│   │   └── server.js
│   ├── package.json
│   ├── .env
│   └── .gitignore
│
├── docker-compose.yml (optional)
├── README.md
└── .gitignore
```
```markdown
# 🌍 EchoEarth - Planetary Pulse Visualizer

## Hackathon Weekend Project

### Quick Start

```bash
# Clone and enter project
git clone <your-repo>
cd echoearth

# Backend
cd backend
npm install
npm run dev

# Frontend (new terminal)
cd frontend
npm install
npm run dev
```
