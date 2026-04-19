```javascript
import { useState, useEffect } from 'react';
import axios from 'axios';

// Mock data generator (replace with real APIs)
const generateMockHotspots = () => [
  { id: 1, city: 'Delhi', lat: 28.6139, lon: 77.2090, issue: 'Air Quality', intensity: 0.85 },
  { id: 2, city: 'Los Angeles', lat: 34.0522, lon: -118.2437, issue: 'Heatwave', intensity: 0.72 },
  { id: 3, city: 'Tokyo', lat: 35.6762, lon: 139.6503, issue: 'Humidity', intensity: 0.68 },
  { id: 4, city: 'London', lat: 51.5074, lon: -0.1278, issue: 'Flood Risk', intensity: 0.55 },
  { id: 5, city: 'Sydney', lat: -33.8688, lon: 151.2093, issue: 'Fire Risk', intensity: 0.91 },
];

export default function usePlanetaryData() {
  const [hotspots, setHotspots] = useState([]);
  const [vitals, setVitals] = useState({
    avgTemp: 15.2,
    co2: 421,
    activeHotspots: 0,
    lastUpdated: new Date()
  });

  useEffect(() => {
    // Fetch real data from backend
    const fetchData = async () => {
      try {
        // Replace with your backend endpoint
        // const res = await axios.get('http://localhost:3001/api/hotspots');
        // setHotspots(res.data);
        
        // Using mock data for hackathon
        setHotspots(generateMockHotspots());
        setVitals(prev => ({
          ...prev,
          activeHotspots: generateMockHotspots().length
        }));
      } catch (error) {
        console.error('Failed to fetch planetary data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30s
    return () => clearInterval(interval);
  }, []);

  return { hotspots, vitals };
}
```
