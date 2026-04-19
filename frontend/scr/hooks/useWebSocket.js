```javascript
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';

export default function useWebSocket(url) {
  const [actionCount, setActionCount] = useState(0);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io(url);
    
    socketRef.current.on('connect', () => {
      console.log('Connected to planetary network');
    });
    
    socketRef.current.on('actionCount', (count) => {
      setActionCount(count);
    });
    
    return () => {
      socketRef.current.disconnect();
    };
  }, [url]);
  
  const sendAction = (hotspotId) => {
    socketRef.current.emit('helpAction', { hotspotId, timestamp: Date.now() });
  };
  
  return { actionCount, sendAction };
}
```
