"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

function AbstractShape() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.2;
            meshRef.current.rotation.y += delta * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <mesh ref={meshRef} scale={1.5}>
                <torusKnotGeometry args={[1, 0.3, 128, 16]} />
                <meshPhysicalMaterial
                    color="#3b82f6"
                    roughness={0.1}
                    metalness={0.8}
                    clearcoat={1}
                    clearcoatRoughness={0.1}
                    transmission={0.2}
                />
            </mesh>
        </Float>
    );
}

export default function AuthScene() {
    return (
        <div className="w-full h-full absolute inset-0">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 6]} />
                <Environment preset="city" />
                <AbstractShape />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            </Canvas>
        </div>
    );
}
