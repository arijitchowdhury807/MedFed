import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface ConnectingBeamProps {
  start: [number, number, number];
  end: [number, number, number];
  isPulsing: boolean;
}

export function ConnectingBeam({ start, end, isPulsing }: ConnectingBeamProps) {
  const lineRef = useRef<THREE.Line>(null);

  useFrame((state) => {
    if (lineRef.current && lineRef.current.material instanceof THREE.LineBasicMaterial) {
      lineRef.current.material.opacity = isPulsing
        ? 0.3 + Math.sin(state.clock.elapsedTime * 5) * 0.2
        : 0.2;
    }
  });

  const points = [new THREE.Vector3(...start), new THREE.Vector3(...end)];
  const geometry = new THREE.BufferGeometry().setFromPoints(points);

  return (
    <>
      <line ref={lineRef} geometry={geometry}>
        <lineBasicMaterial
          color="#00ffff"
          transparent
          opacity={0.2}
          linewidth={2}
        />
      </line>

      {isPulsing && (
        <line geometry={geometry}>
          <lineBasicMaterial
            color="#a855f7"
            transparent
            opacity={0.5}
            linewidth={3}
          />
        </line>
      )}
    </>
  );
}
