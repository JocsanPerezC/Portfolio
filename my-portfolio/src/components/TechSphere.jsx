import { Canvas } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { BackSide } from "three";
import { FaNodeJs, FaPython, FaReact } from "react-icons/fa";
import { SiMongodb, SiPostgresql, SiTailwindcss } from "react-icons/si";

// Each technology is a specimen drawn in the plate idiom: an unlit flat disc of a guide colour,
// outlined in ink, with a numbered label. Nothing floats; the visitor turns the model by dragging.
const FILL_ROLES = ["cloth", "accent", "page", "cloth", "accent", "page"];
const SPECIMENS = [
  { name: "React", position: [1.94, 1.25, 0.3], size: 1.0, Icon: FaReact },
  { name: "Node.js", position: [0.0, 2.0, -0.4], size: 0.82, Icon: FaNodeJs },
  { name: "Python", position: [-1.87, 1.0, 0.2], size: 0.9, Icon: FaPython },
  { name: "Tailwind", position: [2.09, -1.35, -0.2], size: 0.95, Icon: SiTailwindcss },
  { name: "PostgreSQL", position: [0.07, -2.0, 0.3], size: 0.9, Icon: SiPostgresql },
  { name: "MongoDB", position: [-1.94, -1.15, -0.3], size: 0.85, Icon: SiMongodb },
];

function Specimen({ name, position, size, Icon, index, palette }) {
  return (
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
        <div className="flex items-stretch whitespace-nowrap text-sm font-bold">
          <span className="tabular flex w-7 items-center justify-center bg-ink text-page">{index + 1}</span>
          <span className="flex items-center gap-1.5 border-2 border-ink bg-page px-2 py-0.5 text-ink">
            <Icon aria-hidden="true" />
            {name}
          </span>
        </div>
      </Html>
    </group>
  );
}

export default function TechSphere({ palette }) {
  return (
    <Canvas dpr={[1, 1.5]} gl={{ antialias: true, alpha: true }} camera={{ position: [0, 0, 14], fov: 42 }}>
      <mesh position={[0, 0, -0.8]}>
        <sphereGeometry args={[1.05, 48, 48]} />
        <meshBasicMaterial color={palette.ink} />
      </mesh>
      <Html position={[0, 0, 0.4]} center distanceFactor={9} zIndexRange={[5, 0]}>
        <span className="whitespace-nowrap font-display text-xl font-extrabold text-page">Jocsan</span>
      </Html>

      {SPECIMENS.map((specimen, index) => (
        <Specimen key={specimen.name} {...specimen} index={index} palette={palette} />
      ))}

      <OrbitControls enableZoom={false} enablePan={false} />
    </Canvas>
  );
}
