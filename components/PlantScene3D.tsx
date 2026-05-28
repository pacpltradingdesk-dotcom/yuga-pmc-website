// components/PlantScene3D.tsx
// Interactive 3D bio-bitumen plant — Three.js / React Three Fiber
"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* ── Mouse-responsive camera ─────────────────────────────────── */
function CameraRig() {
  const { camera, mouse } = useThree();
  useFrame(() => {
    camera.position.x += (mouse.x * 2.5 - camera.position.x) * 0.04;
    camera.position.y += (mouse.y * 1.2 + 0.5 - camera.position.y) * 0.04;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ── Pulsing lights ──────────────────────────────────────────── */
function SceneLighting() {
  const goldRef = useRef<THREE.PointLight>(null!);
  const greenRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (goldRef.current)  goldRef.current.intensity  = 3 + Math.sin(t * 0.9) * 0.4;
    if (greenRef.current) greenRef.current.intensity = 1.5 + Math.sin(t * 1.1 + 1) * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.12} color="#0a0a14" />
      <pointLight ref={goldRef}  position={[4, 4, 4]}   color="#F59E0B" intensity={3}   distance={18} />
      <pointLight ref={greenRef} position={[-3, 2, 3]}  color="#22C55E" intensity={1.5} distance={14} />
      <pointLight                position={[0, -3, -4]} color="#3B82F6" intensity={0.7} distance={10} />
      <directionalLight          position={[1, 6, 2]}   color="#FDE68A" intensity={0.4} />
    </>
  );
}

/* ── Materials ───────────────────────────────────────────────── */
const darkMetal  = { color: "#161B22", metalness: 0.88, roughness: 0.18 } as const;
const goldMetal  = { color: "#F59E0B", metalness: 0.95, roughness: 0.08, emissive: "#F59E0B" as THREE.ColorRepresentation, emissiveIntensity: 0.25 } as const;
const pipeMetal  = { color: "#0D1117", metalness: 0.92, roughness: 0.10 } as const;

/* ── Main reactor vessel ─────────────────────────────────────── */
function Reactor() {
  return (
    <Float speed={0.6} rotationIntensity={0} floatIntensity={0.15}>
      <group position={[0.4, 0.3, 0]}>
        {/* Body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.62, 0.72, 3.8, 20]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
        {/* Gold band rings */}
        {([-1.6, -0.8, 0, 0.8, 1.6] as number[]).map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.73, 0.042, 8, 28]} />
            <meshStandardMaterial {...goldMetal} />
          </mesh>
        ))}
        {/* Dome top */}
        <mesh position={[0, 2.1, 0]}>
          <sphereGeometry args={[0.62, 18, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial {...darkMetal} />
        </mesh>
        {/* Exhaust pipes */}
        <mesh position={[0.25, 2.55, 0.15]}>
          <cylinderGeometry args={[0.07, 0.09, 0.9, 8]} />
          <meshStandardMaterial {...pipeMetal} />
        </mesh>
        <mesh position={[-0.2, 2.4, -0.1]}>
          <cylinderGeometry args={[0.05, 0.065, 0.6, 8]} />
          <meshStandardMaterial {...pipeMetal} />
        </mesh>
        {/* Gold glow at base */}
        <mesh position={[0, -1.95, 0]}>
          <torusGeometry args={[0.73, 0.06, 8, 28]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.8} metalness={0.9} roughness={0.05} />
        </mesh>
      </group>
    </Float>
  );
}

/* ── Storage tank ────────────────────────────────────────────── */
function Tank({ pos, s = 1 }: { pos: [number, number, number]; s?: number }) {
  return (
    <group position={pos} scale={s}>
      <mesh castShadow>
        <cylinderGeometry args={[0.36, 0.4, 2, 14]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Dome */}
      <mesh position={[0, 1.1, 0]}>
        <sphereGeometry args={[0.36, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Gold band */}
      <mesh>
        <torusGeometry args={[0.41, 0.025, 6, 20]} />
        <meshStandardMaterial {...goldMetal} />
      </mesh>
      {/* Bottom glow ring */}
      <mesh position={[0, -0.98, 0]}>
        <torusGeometry args={[0.41, 0.018, 6, 20]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.4} metalness={0.9} roughness={0.05} />
      </mesh>
    </group>
  );
}

/* ── Pipe between two points ─────────────────────────────────── */
function Pipe({ from, to, r = 0.048 }: { from: [number,number,number]; to: [number,number,number]; r?: number }) {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const len = a.distanceTo(b);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  const q   = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    b.clone().sub(a).normalize()
  );
  return (
    <mesh position={mid.toArray() as [number,number,number]} quaternion={q}>
      <cylinderGeometry args={[r, r, len, 8]} />
      <meshStandardMaterial {...pipeMetal} />
    </mesh>
  );
}

/* ── Processing unit (pelletizer) ────────────────────────────── */
function Pelletizer() {
  const drumRef = useRef<THREE.Mesh>(null!);
  useFrame(() => { if (drumRef.current) drumRef.current.rotation.z += 0.008; });

  return (
    <group position={[-1.4, -1.7, 0.3]}>
      {/* Housing */}
      <mesh castShadow>
        <boxGeometry args={[1.4, 0.65, 0.85]} />
        <meshStandardMaterial {...darkMetal} />
      </mesh>
      {/* Rotating drum */}
      <mesh ref={drumRef} position={[0, 0.42, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.22, 0.22, 0.9, 12]} />
        <meshStandardMaterial color="#1a2a1a" metalness={0.8} roughness={0.25} />
      </mesh>
      {/* Status light — green */}
      <mesh position={[0.62, 0.38, 0.44]}>
        <sphereGeometry args={[0.055, 8, 8]} />
        <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={3} />
      </mesh>
      {/* Label strip */}
      <mesh position={[0, -0.24, 0.43]}>
        <boxGeometry args={[0.8, 0.12, 0.01]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.3} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* ── Platform / base ─────────────────────────────────────────── */
function Platform() {
  return (
    <group position={[0, -2.3, 0]}>
      <mesh receiveShadow>
        <boxGeometry args={[9, 0.14, 4.5]} />
        <meshStandardMaterial color="#0D1117" metalness={0.55} roughness={0.45} />
      </mesh>
      {/* Gold grid lines */}
      {([-3.5, -1.75, 0, 1.75, 3.5] as number[]).map((x) => (
        <mesh key={x} position={[x, 0.08, 0]}>
          <boxGeometry args={[0.018, 0.018, 4.5]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.15} metalness={0.9} roughness={0.05} />
        </mesh>
      ))}
      {([-2, 0, 2] as number[]).map((z) => (
        <mesh key={z} position={[0, 0.08, z]}>
          <boxGeometry args={[9, 0.018, 0.018]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.1} metalness={0.9} roughness={0.05} />
        </mesh>
      ))}
    </group>
  );
}

/* ── Ambient bio-particles ───────────────────────────────────── */
function Particles() {
  return (
    <>
      <Sparkles count={60}  scale={[5,5,3]} position={[0, 0.5, 0]} size={1.8} speed={0.25} color="#F59E0B" opacity={0.35} />
      <Sparkles count={30}  scale={[3,4,2]} position={[-0.5, 1, 0]} size={1.2} speed={0.18} color="#22C55E" opacity={0.28} />
    </>
  );
}

/* ── Full plant assembly ─────────────────────────────────────── */
function PlantAssembly() {
  return (
    <group>
      <Platform />
      <Reactor />

      {/* Storage tanks */}
      <Tank pos={[-2.2, -1.15, 0.6]}  s={0.88} />
      <Tank pos={[-3.1, -1.35, -0.2]} s={0.68} />
      <Tank pos={[2.3,  -1.2,  0.4]}  s={0.78} />

      {/* Pelletizer unit */}
      <Pelletizer />

      {/* Piping network */}
      <Pipe from={[-0.8, -1.6, 0.3]} to={[-0.15, -0.5, 0.1]} />
      <Pipe from={[-1.8, -1.45, 0.55]} to={[-1.05, -1.65, 0.35]} />
      <Pipe from={[0.95, -0.4, 0]} to={[2.0, -1.15, 0.3]} />
      <Pipe from={[0.4,  0.2, 0]} to={[-1.6, -1.0, 0.5]} r={0.035} />
      <Pipe from={[0.4, -0.8, 0]} to={[0.4, -2.2, 0.2]} r={0.035} />
      {/* Horizontal header pipe */}
      <Pipe from={[-2.2, -0.9, 0.3]} to={[2.0, -0.9, 0.3]} r={0.03} />

      {/* Particles */}
      <Particles />

      {/* Bio-oil glow indicator */}
      <mesh position={[-1.4, -1.35, 0.3]}>
        <sphereGeometry args={[0.07, 8, 8]} />
        <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={4} />
      </mesh>
      {/* Reactor glow */}
      <mesh position={[0.4, -1.95, 0]}>
        <sphereGeometry args={[0.15, 10, 10]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.5} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

/* ── Exported canvas ─────────────────────────────────────────── */
export default function PlantScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 0.5, 9], fov: 48 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 0.5, 9]} fov={48} />
      <CameraRig />
      <SceneLighting />
      <PlantAssembly />
      <fog attach="fog" args={["#050508", 14, 28]} />
    </Canvas>
  );
}
