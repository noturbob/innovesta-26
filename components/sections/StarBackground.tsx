"use client";

import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import * as THREE from "three";

// 1. Reusable helper to generate random points in a sphere
// Removes the need for 'maath' and ensures no NaN errors
const generateSpherePositions = (count: number, radius: number): Float32Array => {
  // Ensure we have exact multiples of 3 for (x, y, z)
  const points = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    // Standard spherical distribution math
    const u = Math.random();
    const v = Math.random();
    const theta = 2 * Math.PI * u;
    const phi = Math.acos(2 * v - 1);
    const r = Math.cbrt(Math.random()) * radius; // cbrt ensures uniform distribution
    
    const x = r * Math.sin(phi) * Math.cos(theta);
    const y = r * Math.sin(phi) * Math.sin(theta);
    const z = r * Math.cos(phi);
    
    points[i * 3] = x;
    points[i * 3 + 1] = y;
    points[i * 3 + 2] = z;
  }
  return points;
};

interface StarFieldProps {
  [key: string]: any; // For spread props compatibility
}

const StarField = (props: StarFieldProps) => {
  const ref = useRef<THREE.Points>(null);
  
  // 2. Use our safe generator function
  // We use 5001 to be safe, but our function handles the math correctly regardless
  const [sphere] = useState<Float32Array>(() => generateSpherePositions(3000, 1.2));

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarBackground = () => {
  return (
    <div className="w-full h-auto fixed inset-0 z-[0]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <StarField />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarBackground;