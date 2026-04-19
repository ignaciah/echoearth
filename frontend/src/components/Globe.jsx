```jsx
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { TextureLoader, MeshStandardMaterial } from 'three';
import { OrbitControls, Sphere, Html } from '@react-three/drei';

function Earth() {
  const earthRef = useRef();
  const [earthMap] = React.useState(() => 
    new TextureLoader().load('https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg')
  );

  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Sphere ref={earthRef} args={[2, 64, 64]}>
      <meshStandardMaterial map={earthMap} metalness={0.1} roughness={0.5} />
    </Sphere>
  );
}

function HotspotMarker({ position, color, onClick }) {
  return (
    <mesh position={position} onClick={onClick}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <Html distanceFactor={10}>
        <div style={{ 
          background: 'red', 
          width: 10, 
          height: 10, 
          borderRadius: '50%',
          cursor: 'pointer'
        }} />
      </Html>
    </mesh>
  );
}

export default function Globe({ hotspots, onHotspotClick }) {
  const latLonToVector3 = (lat, lon, radius = 2.05) => {
    const phi = (90 - lat) * Math.PI / 180;
    const theta = lon * Math.PI / 180;
    return {
      x: radius * Math.sin(phi) * Math.cos(theta),
      y: radius * Math.cos(phi),
      z: radius * Math.sin(phi) * Math.sin(theta)
    };
  };

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Earth />
      {hotspots.map((hotspot, i) => {
        const pos = latLonToVector3(hotspot.lat, hotspot.lon);
        return (
          <HotspotMarker 
            key={i}
            position={[pos.x, pos.y, pos.z]}
            color={hotspot.intensity > 0.7 ? '#ff4444' : '#ffaa44'}
            onClick={() => onHotspotClick(hotspot)}
          />
        );
      })}
      <OrbitControls enableZoom enablePan autoRotate autoRotateSpeed={0.5} />
    </Canvas>
  );
}
```
