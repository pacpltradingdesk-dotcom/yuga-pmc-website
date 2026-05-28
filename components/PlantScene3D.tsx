// components/PlantScene3D.tsx
"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, PerspectiveCamera } from "@react-three/drei";
import * as THREE from "three";

/* - Smooth mouse camera - */
function CameraRig() {
  const { camera, mouse } = useThree();
  const target = useRef(new THREE.Vector3(0, 0, 0));

  useFrame(() => {
    // Smooth lerp — igloo-style subtle float
    camera.position.x += (mouse.x * 1.8 - camera.position.x) * 0.028;
    camera.position.y += (mouse.y * 0.9 + 1.0 - camera.position.y) * 0.028;
    camera.lookAt(target.current);
  });
  return null;
}

/* - Lighting - */
function Lights() {
  const goldRef  = useRef<THREE.PointLight>(null!);
  const greenRef = useRef<THREE.PointLight>(null!);

  useFrame(({ clock: c }) => {
    const t = c.elapsedTime;
    if (goldRef.current)  goldRef.current.intensity  = 4   + Math.sin(t * 0.7)  * 0.5;
    if (greenRef.current) greenRef.current.intensity = 1.8 + Math.sin(t * 1.0 + 1.2) * 0.3;
  });

  return (
    <>
      <ambientLight intensity={0.08} color="#05050a" />
      {/* Warm gold key — main scene light */}
      <pointLight ref={goldRef}  position={[5, 6, 5]}    color="#F59E0B" intensity={4}   distance={22} castShadow />
      {/* Green bio fill */}
      <pointLight ref={greenRef} position={[-4, 3, 4]}   color="#22C55E" intensity={1.8} distance={16} />
      {/* Cool blue rim from behind */}
      <pointLight                position={[0, -2, -6]}  color="#1e40af" intensity={1.2} distance={14} />
      {/* Warm top rim */}
      <directionalLight          position={[2, 8, 3]}    color="#FDE68A" intensity={0.35} />
    </>
  );
}

/* Materials */
const M = {
  dark:  { color: "#161B22", metalness: 0.9,  roughness: 0.15 } as const,
  gold:  { color: "#F59E0B", metalness: 0.95, roughness: 0.06, emissive: "#F59E0B" as THREE.ColorRepresentation, emissiveIntensity: 0.3 } as const,
  pipe:  { color: "#0D1117", metalness: 0.92, roughness: 0.08 } as const,
  glow:  (c: string) => ({ color: c, emissive: c as THREE.ColorRepresentation, emissiveIntensity: 4, metalness: 0.9, roughness: 0.05 }) as const,
};

/* Main pyrolysis reactor */
function Reactor() {
  return (
    <Float speed={0.5} rotationIntensity={0} floatIntensity={0.18}>
      <group position={[0.3, 0.2, 0]}>
        {/* Main body */}
        <mesh castShadow>
          <cylinderGeometry args={[0.68, 0.78, 4.2, 22]} />
          <meshStandardMaterial {...M.dark} />
        </mesh>
        {/* Gold rings */}
        {([-1.8, -0.9, 0, 0.9, 1.8] as number[]).map((y) => (
          <mesh key={y} position={[0, y, 0]}>
            <torusGeometry args={[0.79, 0.045, 8, 30]} />
            <meshStandardMaterial {...M.gold} />
          </mesh>
        ))}
        {/* Dome */}
        <mesh position={[0, 2.35, 0]}>
          <sphereGeometry args={[0.68, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial {...M.dark} />
        </mesh>
        {/* Exhaust pipes */}
        <mesh position={[0.28, 2.85, 0.18]}>
          <cylinderGeometry args={[0.075, 0.095, 1.0, 8]} />
          <meshStandardMaterial {...M.pipe} />
        </mesh>
        <mesh position={[-0.22, 2.65, -0.12]}>
          <cylinderGeometry args={[0.055, 0.07, 0.65, 8]} />
          <meshStandardMaterial {...M.pipe} />
        </mesh>
        {/* Base glow */}
        <mesh position={[0, -2.15, 0]}>
          <torusGeometry args={[0.79, 0.07, 8, 30]} />
          <meshStandardMaterial {...M.glow("#F59E0B")} />
        </mesh>
      </group>
    </Float>
  );
}

/* - Storage tank - */
function Tank({ p, s = 1 }: { p: [number,number,number]; s?: number }) {
  return (
    <group position={p} scale={s}>
      <mesh castShadow>
        <cylinderGeometry args={[0.38, 0.42, 2.2, 14]} />
        <meshStandardMaterial {...M.dark} />
      </mesh>
      <mesh position={[0, 1.22, 0]}>
        <sphereGeometry args={[0.38, 14, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial {...M.dark} />
      </mesh>
      <mesh><torusGeometry args={[0.43, 0.028, 6, 22]} /><meshStandardMaterial {...M.gold} /></mesh>
      <mesh position={[0, -1.1, 0]}>
        <torusGeometry args={[0.43, 0.02, 6, 22]} />
        <meshStandardMaterial {...M.glow("#F59E0B")} />
      </mesh>
    </group>
  );
}

/* - Pipe - */
function Pipe({ a, b, r = 0.05 }: { a:[number,number,number]; b:[number,number,number]; r?:number }) {
  const va = new THREE.Vector3(...a), vb = new THREE.Vector3(...b);
  const len = va.distanceTo(vb);
  const mid = va.clone().add(vb).multiplyScalar(0.5);
  const q   = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0,1,0), vb.clone().sub(va).normalize()
  );
  return (
    <mesh position={mid.toArray() as [number,number,number]} quaternion={q}>
      <cylinderGeometry args={[r, r, len, 8]} />
      <meshStandardMaterial {...M.pipe} />
    </mesh>
  );
}

/* Pelletizer */
function Pelletizer() {
  const drumRef = useRef<THREE.Mesh>(null!);
  useFrame(() => { if (drumRef.current) drumRef.current.rotation.z += 0.007; });
  return (
    <group position={[-1.5, -1.85, 0.4]}>
      <mesh castShadow><boxGeometry args={[1.5, 0.7, 0.9]} /><meshStandardMaterial {...M.dark} /></mesh>
      <mesh ref={drumRef} position={[0, 0.46, 0]} rotation={[0,0,Math.PI/2]}>
        <cylinderGeometry args={[0.24, 0.24, 1.0, 12]} />
        <meshStandardMaterial color="#1a2a1a" metalness={0.8} roughness={0.2} />
      </mesh>
      {/* Status LED */}
      <mesh position={[0.66, 0.42, 0.46]}>
        <sphereGeometry args={[0.06, 8, 8]} />
        <meshStandardMaterial {...M.glow("#22C55E")} />
      </mesh>
      <mesh position={[0, -0.26, 0.46]}>
        <boxGeometry args={[0.9, 0.13, 0.01]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.35} metalness={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
}

/* - Ground + grid - */
function Ground() {
  return (
    <group position={[0, -2.5, 0]}>
      {/* Main platform */}
      <mesh receiveShadow>
        <boxGeometry args={[16, 0.12, 8]} />
        <meshStandardMaterial color="#090d11" metalness={0.6} roughness={0.4} />
      </mesh>
      {/* Extended dark ground plane */}
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[60, 0.06, 60]} />
        <meshStandardMaterial color="#050508" metalness={0.3} roughness={0.8} />
      </mesh>
      {/* Gold grid lines — x-axis */}
      {([-6,-4,-2,0,2,4,6] as number[]).map((x) => (
        <mesh key={`x${x}`} position={[x, 0.07, 0]}>
          <boxGeometry args={[0.018, 0.018, 8]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.18} metalness={0.95} roughness={0.04} />
        </mesh>
      ))}
      {/* Gold grid lines — z-axis */}
      {([-3,-1.5,0,1.5,3] as number[]).map((z) => (
        <mesh key={`z${z}`} position={[0, 0.07, z]}>
          <boxGeometry args={[16, 0.018, 0.018]} />
          <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={0.12} metalness={0.95} roughness={0.04} />
        </mesh>
      ))}
    </group>
  );
}

/* - Bio particles - */
function Particles() {
  return (
    <>
      <Sparkles count={70} scale={[7,6,4]} position={[0.3, 1, 0]} size={2.2} speed={0.22} color="#F59E0B" opacity={0.32} />
      <Sparkles count={35} scale={[4,5,3]} position={[-0.5, 0.5, 0]} size={1.5} speed={0.16} color="#22C55E" opacity={0.26} />
    </>
  );
}

/* - Full scene - */
function Scene() {
  return (
    <>
      <Ground />
      <Reactor />
      <Tank p={[-2.4,-1.2, 0.7]}  s={0.9} />
      <Tank p={[-3.3,-1.4,-0.2]}  s={0.68} />
      <Tank p={[ 2.5,-1.3, 0.5]}  s={0.8} />
      <Pelletizer />
      <Pipe a={[-0.9,-1.85,0.4]} b={[-0.18,-0.55,0.1]} />
      <Pipe a={[-1.9,-1.5, 0.6]} b={[-1.1,-1.8, 0.4]} />
      <Pipe a={[ 1.0,-0.4, 0.0]} b={[ 2.2,-1.2, 0.4]} />
      <Pipe a={[ 0.3, 0.2, 0.0]} b={[-1.8,-1.0, 0.6]} r={0.036} />
      <Pipe a={[ 0.3,-0.9, 0.0]} b={[ 0.3,-2.4, 0.2]} r={0.036} />
      {/* Horizontal header pipe */}
      <Pipe a={[-2.4,-1.0, 0.4]} b={[ 2.2,-1.0, 0.4]} r={0.032} />
      {/* Glow dots */}
      <mesh position={[-1.5,-1.45,0.4]}>
        <sphereGeometry args={[0.075,8,8]} />
        <meshStandardMaterial {...M.glow("#22C55E")} />
      </mesh>
      <mesh position={[0.3,-2.38,0]}>
        <sphereGeometry args={[0.18,10,10]} />
        <meshStandardMaterial color="#F59E0B" emissive="#F59E0B" emissiveIntensity={1.8} transparent opacity={0.45} />
      </mesh>
      <Particles />
    </>
  );
}


function SceneFog() {
  const { scene } = useThree();
  useEffect(() => {
    scene.fog = new THREE.Fog("#050508", 14, 32);
    return () => { scene.fog = null; };
  }, [scene]);
  return null;
}
/* - Exported canvas - */
export default function PlantScene3D() {
  return (
    <Canvas
      camera={{ position: [0, 1, 11], fov: 58 }}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
      dpr={[1, 1.5]}
      shadows
    >
      <SceneFog /><PerspectiveCamera makeDefault position={[0, 1, 11]} fov={58} />
      <CameraRig />
      <Lights />
      <Scene />
    </Canvas>
  );
}
