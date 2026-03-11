'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import StudioScene from '@/components/hero/StudioScene';

import * as THREE from 'three';

export const Scene = () => {
    return (
        <Canvas
            className="h-full w-full"
            camera={{ position: [0, 0, 5], fov: 45 }}
            dpr={[1, 2]}
            gl={{
                antialias: true,
                toneMapping: THREE.ACESFilmicToneMapping
            }}
        >
            <Suspense fallback={null}>
                <StudioScene />
            </Suspense>
        </Canvas>
    );
};
