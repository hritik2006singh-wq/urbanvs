"use client"

import { useRef } from "react"
import { useFrame, useLoader } from "@react-three/fiber"
import * as THREE from "three"
import { TextureLoader } from "three"

export default function StudioOrb() {
  const globeRef = useRef<THREE.Mesh>(null!)

  const texture = useLoader(TextureLoader, "/textures/earth.jpg")

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.003
    }
  })

  return (
    <>
      {/* Earth */}
      <mesh ref={globeRef} position={[0, 0.3, 0]}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={texture}
          metalness={0.1}
          roughness={0.6}
          emissive={"#111111"}
          emissiveIntensity={0.5}
        />
      </mesh>

      {/* Light glow edge */}
      
    </>
  )
}