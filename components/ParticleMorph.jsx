'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Helper function to generate particle positions for each shape
function generateShapePoints(shapeType, count = 2000) {
  const points = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    let x, y, z;
    
    switch (shapeType) {
      case 'handshake':
        // Handshake shape - two curved forms meeting in middle
        const handPhase = (i / count) * Math.PI * 2;
        const handRadius = 1.5 + Math.sin(handPhase * 3) * 0.3;
        x = Math.cos(handPhase) * handRadius * 0.8;
        y = Math.sin(handPhase) * 1.2;
        z = (Math.random() - 0.5) * 0.5;
        // Add second hand
        if (i > count / 2) {
          x = -x + 0.5;
          y = y * 0.9;
        }
        break;
        
      case 'camera':
        // Camera shape - rectangular body with lens circle
        const camPart = i < count * 0.7 ? 'body' : 'lens';
        if (camPart === 'body') {
          x = (Math.random() - 0.5) * 2.5;
          y = (Math.random() - 0.5) * 1.8;
          z = (Math.random() - 0.5) * 0.3;
        } else {
          const lensAngle = (i / count) * Math.PI * 2;
          const lensRadius = 0.6;
          x = Math.cos(lensAngle) * lensRadius;
          y = Math.sin(lensAngle) * lensRadius;
          z = 0.2;
        }
        break;
        
      case 'frame':
        // Picture frame - rectangular border
        const side = i % 4;
        const progress = (i / count) % 0.25;
        switch (side) {
          case 0: // Top
            x = (progress * 4 - 2) * 0.7;
            y = 1.2;
            break;
          case 1: // Right
            x = 1.4;
            y = (1 - progress * 4) * 1.2;
            break;
          case 2: // Bottom
            x = (2 - progress * 4) * 0.7;
            y = -1.2;
            break;
          case 3: // Left
            x = -1.4;
            y = (progress * 4 - 1) * 1.2;
            break;
        }
        z = (Math.random() - 0.5) * 0.2;
        break;
        
      default:
        x = (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 2;
        z = (Math.random() - 0.5) * 0.5;
    }
    
    points[i3] = x;
    points[i3 + 1] = y;
    points[i3 + 2] = z;
  }
  
  return points;
}

export default function ParticleMorph({ className = '' }) {
  const pointsRef = useRef();
  const materialRef = useRef();
  
  // Generate target positions for all three shapes
  const shapeData = useMemo(() => ({
    handshake: generateShapePoints('handshake', 2000),
    camera: generateShapePoints('camera', 2000),
    frame: generateShapePoints('frame', 2000),
  }), []);
  
  // Current and target shape indices
  const currentShapeRef = useRef(0);
  const targetShapeRef = useRef(1);
  const morphProgressRef = useRef(0);
  const stateTimerRef = useRef(0);
  
  const shapeNames = ['handshake', 'camera', 'frame'];
  
  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    
    // Update timer for state transitions
    stateTimerRef.current += delta;
    
    // Hold current shape for 3 seconds, then morph for 1.5 seconds
    if (stateTimerRef.current > 3) {
      morphProgressRef.current += delta / 1.5;
      
      if (morphProgressRef.current >= 1) {
        // Morph complete, move to next shape
        morphProgressRef.current = 0;
        stateTimerRef.current = 0;
        currentShapeRef.current = targetShapeRef.current;
        targetShapeRef.current = (targetShapeRef.current + 1) % 3;
      }
    }
    
    // Interpolate particle positions
    const positions = pointsRef.current.geometry.attributes.position.array;
    const currentShape = shapeData[shapeNames[currentShapeRef.current]];
    const targetShape = shapeData[shapeNames[targetShapeRef.current]];
    
    for (let i = 0; i < positions.length; i++) {
      const current = currentShape[i];
      const target = targetShape[i];
      // Smooth interpolation with easing
      const eased = morphProgressRef.current < 0.5 
        ? 2 * morphProgressRef.current * morphProgressRef.current
        : 1 - Math.pow(-2 * morphProgressRef.current + 2, 2) / 2;
      positions[i] = current + (target - current) * eased;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Subtle rotation for visual interest
    pointsRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
  });
  
  // Initial positions (start with handshake)
  const initialPositions = useMemo(() => shapeData.handshake, [shapeData]);
  
  return (
    <group className={className} scale={0.8}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={initialPositions.length / 3}
            array={initialPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          ref={materialRef}
          size={0.03}
          color="#000000"
          transparent
          opacity={0.9}
          sizeAttenuation
        />
      </points>
    </group>
  );
}