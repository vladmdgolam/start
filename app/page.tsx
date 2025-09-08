'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function RotatingCube() {
  const meshRef = useRef<THREE.Mesh>(null!)
  
  useFrame((_, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })

  return (
    <Box ref={meshRef} args={[2, 2, 2]} position={[-2, 0, 0]}>
      <meshStandardMaterial color="orange" />
    </Box>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <RotatingCube />
      <Sphere args={[1, 32, 32]} position={[2, 0, 0]}>
        <meshStandardMaterial color="hotpink" />
      </Sphere>
      <OrbitControls />
    </>
  )
}

export default function Home() {
  return (
    <div className="w-full h-screen">
      <Canvas>
        <Scene />
      </Canvas>
    </div>
  )
}
