```jsx
import React, { useState, useEffect } from 'react';
import Globe from './components/Globe';
import VitalsPanel from './components/VitalsPanel';
import HelpCounter from './components/HelpCounter';
import useWebSocket from './hooks/useWebSocket';
import usePlanetaryData from './hooks/usePlanetaryData';

function App() {
  const { hotspots, vitals } = usePlanetaryData();
  const { actionCount, sendAction } = useWebSocket('http://localhost:3001');
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      <Globe 
        hotspots={hotspots} 
        onHotspotClick={setSelectedHotspot}
      />
      <VitalsPanel data={vitals} />
      <HelpCounter count={actionCount} />
      
      {selectedHotspot && (
        <div style={{
          position: 'absolute',
          bottom: 20,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: 20,
          borderRadius: 10,
          zIndex: 10
        }}>
          <h3>{selectedHotspot.city}</h3>
          <p>Issue: {selectedHotspot.issue}</p>
          <button onClick={() => sendAction(selectedHotspot.id)}>
            🌱 Help {selectedHotspot.city}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
```
