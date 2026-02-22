"use client";

import { Environment, Float } from "@react-three/drei"
import StudioOrb from "./StudioOrb"

export function StudioScene() {
    return (
        <>


            {/* REALISTIC LIGHTING */}
            <ambientLight intensity={0.4} />
            <directionalLight position={[4, 3, 5]} intensity={1.2} />
            <pointLight
                position={[2, 1, 2]}
                intensity={1.8}
                color={'#4f8cff'}
            />
            {/* RIM LIGHTS */}
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <directionalLight position={[-5, -5, -5]} intensity={0.4} />

            {/* HDRI ENVIRONMENT — CRITICAL */}
            <Environment preset="studio" />

            {/* FLOATING GLASS ORB */}
            <Float
                speed={1}
                rotationIntensity={0.25}
                floatIntensity={0.2}
                floatingRange={[-0.08, 0.08]}
            >
                <StudioOrb />
            </Float>
        </>
    )
}
