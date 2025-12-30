'use client'

import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Box, Sphere } from '@react-three/drei'
import { useRef, useCallback, useImperativeHandle, forwardRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { Camera } from 'lucide-react'

import { FloatingActions } from '@/components/FloatingActions'
import { FloatingActionButton } from '@/components/FloatingActionButton'

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

export interface SceneInnerRef {
  getScreenshotDataUrl: () => string | null
}

const SceneInner = forwardRef<SceneInnerRef>(function SceneInner(_, ref) {
  const { gl } = useThree()

  const getScreenshotDataUrl = useCallback((): string | null => {
    if (!gl?.domElement) return null
    return gl.domElement.toDataURL('image/png')
  }, [gl])

  useImperativeHandle(ref, () => ({ getScreenshotDataUrl }), [getScreenshotDataUrl])

  return <Scene />
})

function downloadDataUrl(dataUrl: string, filename: string) {
  const link = document.createElement('a')
  link.href = dataUrl
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export default function Home() {
  const sceneRef = useRef<SceneInnerRef>(null)

  const handleScreenshot = useCallback(() => {
    const dataUrl = sceneRef.current?.getScreenshotDataUrl()
    if (dataUrl) {
      downloadDataUrl(dataUrl, 'screenshot.png')
    }
  }, [])

  return (
    <div className="w-full h-screen">
      <Canvas gl={{ preserveDrawingBuffer: true }}>
        <SceneInner ref={sceneRef} />
      </Canvas>

      <FloatingActions>
        <FloatingActionButton
          icon={<Camera className="h-6 w-6" />}
          onClick={handleScreenshot}
          aria-label="Take screenshot"
        />
      </FloatingActions>
    </div>
  )
}
