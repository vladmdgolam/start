'use client'

import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { MathUtils, NormalBlending } from "three"

import { customEasing } from "@/helpers/customEasing"
import { CustomMaterial } from "./Material"

interface CircleProps {
  i?: number
  position?: [number, number, number]
  scale?: number | [number, number, number]
}

interface MaterialRef {
  time: number
  position: [number, number]
}

export const Circle = ({ i = 0, ...props }: CircleProps) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ref = useRef<MaterialRef>(null as any)

  useFrame((state, delta) => {
    if (!ref.current) return

    ref.current.time += delta

    const futurePosition: [number, number] = [
      customEasing(state.pointer.x),
      customEasing(state.pointer.y),
    ]

    // lerp
    ref.current.position[0] = MathUtils.lerp(
      ref.current.position[0],
      futurePosition[0],
      0.1
    )
    ref.current.position[1] = MathUtils.lerp(
      ref.current.position[1],
      futurePosition[1],
      0.1
    )
  })

  return (
    <mesh key={CustomMaterial.key} {...props}>
      <planeGeometry />
      <customMaterial
        ref={ref}
        seed={i}
        toneMapped={false}
        blending={NormalBlending}
        alphaTest={0.1}
        transparent
      />
    </mesh>
  )
}
