'use client'

import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Circle } from '@/components/Circle'

function Scene() {
  return (
    <>
      <Circle i={0} position={[0, 0, 0]} scale={3} />
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
    </>
  )
}

export default function ShaderPage() {
  return (
    <div className="w-full h-screen bg-black">
      <Canvas
        gl={{ preserveDrawingBuffer: true }}
        camera={{ position: [0, 0, 2], fov: 50 }}
      >
        <Scene />
      </Canvas>
    </div>
  )
}
