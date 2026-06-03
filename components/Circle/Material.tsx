import { shaderMaterial } from "@react-three/drei"
import { extend } from "@react-three/fiber"
import { Color, ShaderMaterial } from "three"

import { colors } from "@/constants/colors"
import frag from "./frag"

/* eslint-disable @typescript-eslint/no-namespace */

const vert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;
    gl_Position = projectionPosition;
    vUv = uv;
  }
`

export type CustomMaterialType = ShaderMaterial & {
  time: number
  pink: Color
  blue: Color
  blur: number
  position: [number, number]
  radius: number
  seed: number
}

const CustomMaterial = shaderMaterial(
  {
    time: 0,
    pink: new Color(colors.pink),
    blue: new Color(colors.blue),
    blur: 0.0,
    position: [0.11, -0.15],
    radius: 0.15,
    seed: 0,
  },
  vert,
  frag
)

extend({ CustomMaterial })

export { CustomMaterial }

// Type declaration for R3F JSX
declare global {
  namespace React {
    namespace JSX {
      interface IntrinsicElements {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        customMaterial: any
      }
    }
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
