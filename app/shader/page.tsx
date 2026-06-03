import type { Metadata } from "next";

import { ShaderExperience } from "@/components/ShaderExperience";

export const metadata: Metadata = {
  title: "Shader",
};

export default function ShaderPage() {
  return <ShaderExperience />;
}
