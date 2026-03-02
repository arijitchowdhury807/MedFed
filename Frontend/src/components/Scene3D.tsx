import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { HospitalBlock } from './HospitalBlock';
import { GlobalModel } from './GlobalModel';
import { ConnectingBeam } from './ConnectingBeam';
import { Particles } from './Particles';
import { Hospital } from '../types';

interface Scene3DProps {
  hospitals: Hospital[];
  globalAccuracy: number;
  isPulsing: boolean;
}

export function Scene3D({ hospitals, globalAccuracy, isPulsing }: Scene3DProps) {
  const hospitalPositions: [number, number, number][] = [
    [-6, 2, 0],
    [-3, -2, 2],
    [3, 2, -1],
    [6, -1, 1],
    [4, -3, -2],
  ];

  return (
    <div className="w-full h-[500px] relative">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 15]} />
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          autoRotate
          autoRotateSpeed={0.5}
        />

        <ambientLight intensity={0.3} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <pointLight position={[-10, -10, -10]} intensity={0.3} color="#a855f7" />

        <Particles />

        <GlobalModel accuracy={globalAccuracy} isPulsing={isPulsing} />

        {hospitals.map((hospital, index) => {
          const position = hospitalPositions[index % hospitalPositions.length];
          return (
            <group key={hospital.id}>
              <HospitalBlock
                position={position}
                name={hospital.name}
                accuracy={hospital.accuracy}
                contribution={hospital.contribution}
                isPulsing={isPulsing}
              />
              <ConnectingBeam
                start={position}
                end={[0, 0, 0]}
                isPulsing={isPulsing}
              />
            </group>
          );
        })}
      </Canvas>
    </div>
  );
}
