// components/PlantScene3D.tsx
"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera, Environment, SpotLight, MeshReflectorMaterial } from "@react-three/drei";
import { EffectComposer, Bloom, DepthOfField, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";

function SceneFog() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.FogExp2("#050508", 0.042);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}

function CameraRig() {
  const { camera, mouse } = useThree();
  const angle = useRef(0);
  useFrame(({ clock }) => {
    angle.current = clock.elapsedTime * 0.055;
    const targetX = Math.sin(angle.current) * 2.2 + mouse.x * 1.5;
    const targetY = 1.0 + mouse.y * 0.75;
    camera.position.x += (targetX - camera.position.x) * 0.022;
    camera.position.y += (targetY - camera.position.y) * 0.022;
    camera.position.z += (11 - camera.position.z) * 0.022;
    camera.lookAt(0, 0.4, 0);
  });
  return null;
}

const R = { color: "#1a2030", metalness: 0.95, roughness: 0.08, clearcoat: 1 as number, clearcoatRoughness: 0.05, envMapIntensity: 2.0 };
const G = { color: "#F59E0B", metalness: 1.0, roughness: 0.04, emissive: "#F59E0B" as THREE.ColorRepresentation, emissiveIntensity: 0.6, envMapIntensity: 3.0 };
const P = { color: "#0a0e14", metalness: 0.96, roughness: 0.06, envMapIntensity: 1.5 };
const glow = (c: string, i = 5) => ({ color: c, emissive: c as THREE.ColorRepresentation, emissiveIntensity: i, metalness: 0, roughness: 0.5 });

function Reactor() {
  const ref = useRef<THREE.Group>(null!);
  useFrame(({ clock }) => { if (ref.current) ref.current.position.y = Math.sin(clock.elapsedTime * 0.4) * 0.04; });
  return (
    <group ref={ref} position={[0.3, 0.2, 0]}>
      <mesh castShadow><cylinderGeometry args={[0.7, 0.8, 4.4, 28]} /><meshPhysicalMaterial {...R} /></mesh>
      {([-2.0, -1.0, 0, 1.0, 2.0] as number[]).map((y) => (
        <mesh key={y} position={[0, y, 0]}><torusGeometry args={[0.81, 0.05, 10, 34]} /><meshPhysicalMaterial {...G} /></mesh>
      ))}
      <mesh position={[0, 2.46, 0]}><sphereGeometry args={[0.7, 22, 12, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshPhysicalMaterial {...R} /></mesh>
      <mesh position={[0.28, 3.0, 0.18]}><cylinderGeometry args={[0.07, 0.09, 1.1, 10]} /><meshPhysicalMaterial {...P} /></mesh>
      <mesh position={[-0.22, 2.75, -0.12]}><cylinderGeometry args={[0.055, 0.07, 0.7, 10]} /><meshPhysicalMaterial {...P} /></mesh>
      <mesh position={[0, -2.22, 0]}><torusGeometry args={[0.81, 0.08, 10, 34]} /><meshStandardMaterial {...glow("#F59E0B", 3)} /></mesh>
      <mesh position={[0, 0, 0.71]}><boxGeometry args={[0.1, 3.2, 0.04]} /><meshStandardMaterial {...glow("#22C55E", 2)} /></mesh>
    </group>
  );
}

function Tank({ p, s = 1 }: { p: [number, number, number]; s?: number }) {
  return (
    <Float speed={0.4} floatIntensity={0.12} rotationIntensity={0}>
      <group position={p} scale={s}>
        <mesh castShadow><cylinderGeometry args={[0.38, 0.43, 2.3, 16]} /><meshPhysicalMaterial {...R} /></mesh>
        <mesh position={[0, 1.26, 0]}><sphereGeometry args={[0.38, 16, 10, 0, Math.PI * 2, 0, Math.PI / 2]} /><meshPhysicalMaterial {...R} /></mesh>
        <mesh><torusGeometry args={[0.44, 0.03, 8, 24]} /><meshPhysicalMaterial {...G} /></mesh>
        <mesh position={[0, -1.15, 0]}><torusGeometry args={[0.44, 0.022, 8, 24]} /><meshStandardMaterial {...glow("#F59E0B", 2.5)} /></mesh>
      </group>
    </Float>
  );
}

function Pipe({ a, b, r = 0.05 }: { a: [number, number, number]; b: [number, number, number]; r?: number }) {
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
  const len = va.distanceTo(vb);
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  const q = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), vb.clone().sub(va).normalize());
  return (
    <mesh position={mid.toArray() as [number, number, number]} quaternion={q} castShadow>
      <cylinderGeometry args={[r, r, len, 10]} /><meshPhysicalMaterial {...P} />
    </mesh>
  );
}

function Pelletizer() {
  const drumRef = useRef<THREE.Mesh>(null!);
  useFrame(() => { if (drumRef.current) drumRef.current.rotation.z += 0.007; });
  return (
    <group position={[-1.6, -1.95, 0.5]}>
      <mesh castShadow><boxGeometry args={[1.5, 0.72, 0.92]} /><meshPhysicalMaterial {...R} /></mesh>
      <mesh ref={drumRef} position={[0, 0.47, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.24, 0.24, 1.0, 14]} /><meshPhysicalMaterial color="#0d1a0d" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0.68, 0.44, 0.48]}><sphereGeometry args={[0.065, 10, 10]} /><meshStandardMaterial {...glow("#22C55E", 6)} /></mesh>
    </group>
  );
}

function Floor() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.6, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <MeshReflectorMaterial blur={[400, 200]} resolution={512} mixBlur={1} mixStrength={50} roughness={0.95} depthScale={1.4} minDepthThreshold={0.85} maxDepthThreshold={1} color="#050810" metalness={0.7} />
    </mesh>
  );
}

function GridLines() {
  return (
    <group position={[0, -2.54, 0]}>
      {([-5, -3, -1, 1, 3, 5] as number[]).map((x) => (
        <mesh key={`x${x}`} position={[x, 0, 0]}><boxGeometry args={[0.016, 0.016, 14]} /><meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.2} /></mesh>
      ))}
      {([-5, -2.5, 0, 2.5, 5] as number[]).map((z) => (
        <mesh key={`z${z}`} position={[0, 0, z]}><boxGeometry args={[14, 0.016, 0.016]} /><meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.14} /></mesh>
      ))}
    </group>
  );
}

function Lights() {
  const goldRef = useRef<THREE.PointLight>(null!);
  const greenRef = useRef<THREE.PointLight>(null!);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (goldRef.current)  goldRef.current.intensity  = 5   + Math.sin(t * 0.7)  * 0.6;
    if (greenRef.current) greenRef.current.intensity = 2.5 + Math.sin(t * 0.9 + 1) * 0.4;
  });
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight ref={goldRef}  position={[4, 6, 4]}   color="#F59E0B" intensity={5}   distance={20} castShadow />
      <pointLight ref={greenRef} position={[-3, 4, 3]}  color="#22C55E" intensity={2.5} distance={15} />
      <pointLight                position={[0, -1, -5]} color="#1e3a8a" intensity={1.8} distance={14} />
      <SpotLight position={[0, 8, 3]} angle={0.28} penumbra={0.8} intensity={12} color="#FDE68A" castShadow distance={20} attenuation={6} anglePower={4} />
    </>
  );
}

function Plant() {
  return (
    <>
      <Floor />
      <GridLines />
      <Reactor />
      <Tank p={[-2.5, -1.2, 0.8]}  s={0.9} />
      <Tank p={[-3.4, -1.45, -0.2]} s={0.68} />
      <Tank p={[2.6,  -1.3, 0.6]}  s={0.8} />
      <Pelletizer />
      <Pipe a={[-0.9, -1.95, 0.5]} b={[-0.18, -0.55, 0.1]} />
      <Pipe a={[-2.0, -1.5,  0.7]} b={[-1.2,  -1.95, 0.5]} />
      <Pipe a={[1.0,  -0.4,  0.0]} b={[2.3,   -1.2,  0.5]} />
      <Pipe a={[0.3,   0.2,  0.0]} b={[-2.0,  -1.0,  0.6]} r={0.035} />
      <Pipe a={[0.3,  -0.9,  0.0]} b={[0.3,   -2.5,  0.2]} r={0.035} />
      <Pipe a={[-2.5, -0.9,  0.5]} b={[2.3,   -0.9,  0.5]} r={0.03} />
      <mesh position={[-1.6, -1.5, 0.5]}><sphereGeometry args={[0.08, 10, 10]} /><meshStandardMaterial {...glow("#22C55E", 8)} /></mesh>
      <mesh position={[0.3, -2.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.3, 32]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.9} transparent opacity={0.18} side={THREE.DoubleSide} />
      </mesh>
      <Sparkles count={80} scale={[8, 7, 5]} position={[0.3, 0.8, 0]} size={2.5} speed={0.2} color="#F59E0B" opacity={0.28} />
      <Sparkles count={40} scale={[4, 5, 3]} position={[-0.5, 0.5, 0]} size={1.6} speed={0.15} color="#22C55E" opacity={0.22} />
    </>
  );
}

function Effects() {
  return (
    <EffectComposer>
      <Bloom intensity={2.0} luminanceThreshold={0.35} luminanceSmoothing={0.9} mipmapBlur />
      <DepthOfField focusDistance={0.008} focalLength={0.04} bokehScale={4} height={480} />
      <Vignette eskil={false} offset={0.15} darkness={0.85} />
    </EffectComposer>
  );
}

export default function PlantScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 1, 11], fov: 55 }}
      gl={{ antialias: true, alpha: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      shadows
    >
      <PerspectiveCamera makeDefault position={[0, 1, 11]} fov={55} />
      <SceneFog />
      <CameraRig />
      <Lights />
      <Environment preset="warehouse" />
      <Plant />
      <Effects />
    </Canvas>
  );
}
