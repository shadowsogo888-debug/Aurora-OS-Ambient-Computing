import { useEffect, useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

interface PanelProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  size: [number, number, number];
  color: string;
  accent?: string;
  delay?: number;
}

function GlassPanel({
  position,
  rotation = [0, 0, 0],
  size,
  color,
  accent,
  delay = 0,
}: PanelProps) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime + delay;
    ref.current.position.y = position[1] + Math.sin(t * 0.6) * 0.08;
    ref.current.rotation.z = rotation[2] + Math.sin(t * 0.3) * 0.02;
  });
  return (
    <group ref={ref} position={position} rotation={rotation}>
      <RoundedBox args={size} radius={0.06} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          transmission={0.85}
          thickness={0.4}
          roughness={0.15}
          ior={1.3}
          metalness={0}
          transparent
          opacity={0.55}
          clearcoat={1}
          clearcoatRoughness={0.1}
        />
      </RoundedBox>
      {accent && (
        <mesh position={[-size[0] / 2 + 0.15, size[1] / 2 - 0.08, size[2] / 2 + 0.001]}>
          <planeGeometry args={[0.25, 0.025]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      )}
    </group>
  );
}

function DriftingLights() {
  const mint = useRef<THREE.PointLight>(null);
  const purple = useRef<THREE.PointLight>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (mint.current) {
      mint.current.position.x = Math.sin(t * 0.3) * 3;
      mint.current.position.y = Math.cos(t * 0.4) * 2;
    }
    if (purple.current) {
      purple.current.position.x = Math.cos(t * 0.25) * 3;
      purple.current.position.y = Math.sin(t * 0.35) * 2;
    }
  });
  return (
    <>
      <pointLight ref={mint} color="#6effc0" intensity={40} distance={10} position={[2, 1, 2]} />
      <pointLight
        ref={purple}
        color="#b07cff"
        intensity={35}
        distance={10}
        position={[-2, -1, 2]}
      />
      <ambientLight intensity={0.15} />
    </>
  );
}

function CursorParallax({ children }: { children: React.ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 0.4;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.3;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, []);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += (target.current.x - ref.current.rotation.y) * 0.05;
    ref.current.rotation.x += (-target.current.y - ref.current.rotation.x) * 0.05;
  });
  return <group ref={ref}>{children}</group>;
}

function Scene() {
  return (
    <>
      <DriftingLights />
      <CursorParallax>
        <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.4}>
          <GlassPanel
            position={[0, 0, 0]}
            size={[3.2, 1.9, 0.08]}
            color="#1a1f3a"
            accent="#6effc0"
          />
        </Float>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <GlassPanel
            position={[-2.1, 0.6, 0.8]}
            rotation={[0, 0.25, 0.05]}
            size={[1.6, 1.1, 0.06]}
            color="#2a1f3a"
            accent="#b07cff"
            delay={1}
          />
        </Float>
        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.45}>
          <GlassPanel
            position={[2.2, -0.7, 0.6]}
            rotation={[0, -0.22, -0.04]}
            size={[1.4, 1.4, 0.06]}
            color="#152030"
            accent="#6effc0"
            delay={2}
          />
        </Float>
        <Float speed={1.3} rotationIntensity={0.12} floatIntensity={0.35}>
          <GlassPanel
            position={[1.4, 1.0, 1.2]}
            rotation={[0, -0.15, 0.03]}
            size={[1.0, 0.7, 0.05]}
            color="#1a2540"
            delay={0.5}
          />
        </Float>
        <Float speed={1.4} rotationIntensity={0.1} floatIntensity={0.3}>
          <GlassPanel
            position={[-1.3, -0.9, 1.1]}
            rotation={[0, 0.18, -0.05]}
            size={[0.9, 0.6, 0.05]}
            color="#251a3a"
            delay={1.5}
          />
        </Float>
      </CursorParallax>
      <Environment preset="night" />
    </>
  );
}

export function SpatialScene() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 6], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
