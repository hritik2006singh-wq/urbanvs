"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
    const count = 2000;
    const mesh = useRef<THREE.Points>(null);

    // Custom shader for the particles to perform the "Big Bang" logic on GPU or CPU
    // For simplicity and performance in R3F efficiently, we'll use a CPU-based animation loop 
    // updating positions or a simple shader material. 
    // Given the requirement "particles should form a sphere, then explode outward... then slowly implode", 
    // doing this in a useFrame loop with a buffer attribute is often easiest for control.

    const [positions, originalPositions] = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const originalPositions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Create a sphere
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);
            const r = 1.5; // Radius of the sphere

            const x = r * Math.sin(theta) * Math.cos(phi);
            const y = r * Math.sin(theta) * Math.sin(phi);
            const z = r * Math.cos(theta);

            positions[i * 3] = x;
            positions[i * 3 + 1] = y;
            positions[i * 3 + 2] = z;

            originalPositions[i * 3] = x;
            originalPositions[i * 3 + 1] = y;
            originalPositions[i * 3 + 2] = z;
        }

        return [positions, originalPositions];
    }, []);

    useFrame((state) => {
        if (!mesh.current) return;

        const time = state.clock.getElapsedTime();
        // Cycle duration: 8 seconds
        // 0-2s: Sphere
        // 2-3s: Explode
        // 3-6s: Float/Expanded
        // 6-8s: Implode back

        const cycle = time % 8;
        const positionsArray = mesh.current.geometry.attributes.position.array as Float32Array;

        for (let i = 0; i < count; i++) {
            const xOrig = originalPositions[i * 3];
            const yOrig = originalPositions[i * 3 + 1];
            const zOrig = originalPositions[i * 3 + 2];

            let scale = 1;

            if (cycle < 2) {
                // Stable Sphere with slight breathing
                scale = 1 + Math.sin(time * 2 + i) * 0.05;
            } else if (cycle < 3) {
                // Explosion phase
                const progress = cycle - 2; // 0 to 1
                // Use easing for explosion
                scale = 1 + (progress * 8); // Explode outwards to 9x size
            } else if (cycle < 6) {
                // Floating phase
                scale = 9 + Math.sin(time + i) * 0.5;
            } else {
                // Implosion phase
                const progress = cycle - 6; // 0 to 2
                scale = 9 - (progress * 4); // Shrink back
            }

            // Apply scale
            positionsArray[i * 3] = xOrig * scale;
            positionsArray[i * 3 + 1] = yOrig * scale;
            positionsArray[i * 3 + 2] = zOrig * scale;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.rotation.y = time * 0.1; // Slowly rotate the whole system
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={positions.length / 3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#00FFFF" // Cyan
                transparent
                opacity={0.8}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}

export default function ParticleScene() {
    return (
        <div className="w-full h-full absolute inset-0 bg-black">
            <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
                <Particles />
                <ambientLight intensity={0.5} />
            </Canvas>
        </div>
    );
}
