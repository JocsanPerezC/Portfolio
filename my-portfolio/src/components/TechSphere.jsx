import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html, OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiTailwindcss } from "react-icons/si";

// Each technology is a specimen drawn in the plate idiom: an unlit flat disc of a guide colour,
// outlined in ink, with a numbered label. Fill roles cycle through the guide palette.
const FILL_ROLES = ["cloth", "accent", "page", "cloth", "accent", "page"];
const SPECIMENS = [
  { name: "React", position: [1.94, 1.25, 0.3], size: 1.0, color: "#61dafb", Icon: FaReact },
  { name: "Node.js", position: [0.0, 2.0, -0.4], size: 0.82, color: "#5fa04e", Icon: FaNodeJs },
  { name: "Python", position: [-1.87, 1.0, 0.2], size: 0.9, color: "#3776ab", Icon: FaPython },
  { name: "Tailwind", position: [2.09, -1.35, -0.2], size: 0.95, color: "#38bdf8", Icon: SiTailwindcss },
  { name: "PostgreSQL", position: [0.07, -2.0, 0.3], size: 0.9, color: "#336791", Icon: SiPostgresql },
  { name: "MongoDB", position: [-1.94, -1.15, -0.3], size: 0.85, color: "#47a248", Icon: SiMongodb },
];

function Drift({ children, enabled }) {
  if (!enabled) return children;
  return (
    <Float speed={1.1} rotationIntensity={0.1} floatIntensity={0.35}>
      {children}
    </Float>
  );
}

function Specimen({ name, position, size, color, Icon, index, motion, palette }) {
  return (
    <Drift enabled={motion}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[size * 1.06, 40, 40]} />
          <meshBasicMaterial color={palette.ink} side={BackSide} />
        </mesh>
        <mesh>
          <sphereGeometry args={[size, 40, 40]} />
          <meshBasicMaterial color={palette[FILL_ROLES[index]]} />
        </mesh>
        <Html position={[0, -size - 0.28, 0]} center distanceFactor={9} zIndexRange={[10, 0]}>
          <div className="flex items-stretch whitespace-nowrap text-[15px] font-bold">
            <span className="tabular flex w-7 items-center justify-center bg-ink text-page">{index + 1}</span>
            <span className="flex items-center gap-1.5 border-2 border-ink bg-page px-2 py-0.5 text-ink">
              <Icon aria-hidden="true" style={{ color }} />
              {name}
            </span>
          </div>
        </Html>
      </group>
    </Drift>
  );
}

export default function TechSphere({ language, palette, motion = true }) {
  const containerRef = useRef(null);
  const [visible, setVisible] = useState(() => typeof IntersectionObserver === "undefined");

  useEffect(() => {
    if (!containerRef.current || typeof IntersectionObserver === "undefined") return undefined;

    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "200px 0px",
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-full w-full cursor-grab active:cursor-grabbing"
      role="img"
      aria-label={
        language === "es"
          ? "Modelo 3D interactivo con React, Node.js, Python, Tailwind, PostgreSQL y MongoDB alrededor de mi nombre."
          : "Interactive 3D model with React, Node.js, Python, Tailwind, PostgreSQL and MongoDB around my name."
      }
    >
      {visible && (
        <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0.0, 0, 14], fov: 42 }}>
          <mesh position={[0, 0, -0.8]}>
            <sphereGeometry args={[1.05, 48, 48]} />
            <meshBasicMaterial color={palette.ink} />
          </mesh>
          <Html position={[0, 0, 0.4]} center distanceFactor={9} zIndexRange={[5, 0]}>
            <span className="whitespace-nowrap font-display text-xl font-extrabold text-page">Jocsan</span>
          </Html>

          {SPECIMENS.map((specimen, index) => (
            <Specimen key={specimen.name} {...specimen} index={index} motion={motion} palette={palette} />
          ))}

          <OrbitControls enableZoom={false} enablePan={false} autoRotate={motion} autoRotateSpeed={0.5} />
        </Canvas>
      )}
    </div>
  );
}
