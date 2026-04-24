import { Canvas } from "@react-three/fiber";
import {
  Float,
  OrbitControls,
  Sphere,
  Text,
  Billboard,
  Html,
} from "@react-three/drei";
import { FaReact, FaNodeJs, FaPython } from "react-icons/fa";
import { SiTailwindcss, SiPostgresql, SiMongodb } from "react-icons/si";

const featuredTechs = [
  {
    name: "React",
    position: [3, 1.2, 0],
    size: 1.08,
    color: "#61DAFB",
    Icon: FaReact,
  },
  {
    name: "Node.js",
    position: [0, 1.75, 0],
    size: 0.9,
    color: "#68A063",
    Icon: FaNodeJs,
  },
  {
    name: "Python",
    position: [-2.7, 0.95, 0],
    size: 0.95,
    color: "#3776AB",
    Icon: FaPython,
  },
  {
    name: "Tailwind",
    position: [3.35, -1.45, 0],
    size: 1.18,
    color: "#38BDF8",
    Icon: SiTailwindcss,
  },
  {
    name: "PostgreSQL",
    position: [0, -1.85, 0],
    size: 0.98,
    color: "#336791",
    Icon: SiPostgresql,
  },
  {
    name: "MongoDB",
    position: [-2.85, -0.9, 0],
    size: 0.9,
    color: "#47A248",
    Icon: SiMongodb,
  },
];

function TechBubble({ name, position, size = 1, color = "#7c6dfa", Icon, isDark }) {
  return (
    <Float speed={2} rotationIntensity={0.3} floatIntensity={1.1}>
      <group position={position}>
        <mesh>
          <sphereGeometry args={[size * 1.18, 32, 32]} />
          <meshBasicMaterial color={color} transparent opacity={0.08} />
        </mesh>

        <Sphere args={[size, 64, 64]}>
          <meshPhysicalMaterial
            color={color}
            transparent
            opacity={0.8}
            roughness={0.14}
            metalness={0.25}
            clearcoat={1}
            clearcoatRoughness={0.08}
          />
        </Sphere>

        <Html
          position={[0, size * 0.1, size + 0.02]}
          center
          distanceFactor={8}
          transform
          sprite
        >
          <div
            className={[
              "flex items-center justify-center rounded-full border backdrop-blur-md",
              isDark
                ? "border-white/15 bg-[#0f172a]/70 shadow-[0_0_30px_rgba(255,255,255,0.08)]"
                : "border-black/10 bg-white/80 shadow-[0_0_24px_rgba(15,23,42,0.08)]",
            ].join(" ")}
            style={{
              width: `${size * 36}px`,
              height: `${size * 36}px`,
            }}
          >
            <Icon
              style={{
                color,
                width: `${size * 18}px`,
                height: `${size * 18}px`,
              }}
            />
          </div>
        </Html>

        <Billboard>
          <Text
            position={[0, -size * 0.58, size + 0.03]}
            fontSize={size * 0.16}
            color={isDark ? "#ffffff" : "#111827"}
            anchorX="center"
            anchorY="middle"
            maxWidth={size * 2.2}
          >
            {name}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function CenterBubble({ isDark, language }) {
  return (
    <Float speed={1.5} rotationIntensity={0.15} floatIntensity={0.6}>
      <group position={[0, 0, -1.15]}>
        <mesh>
          <sphereGeometry args={[1.22, 40, 40]} />
          <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
        </mesh>

        <Sphere args={[1.02, 64, 64]}>
          <meshPhysicalMaterial
            color="#7c6dfa"
            transparent
            opacity={0.2}
            roughness={0.08}
            metalness={0.18}
            clearcoat={1}
            clearcoatRoughness={0.04}
          />
        </Sphere>

        <Billboard>
          <Text
            position={[0, 0.08, 1.06]}
            fontSize={0.2}
            color={isDark ? "#ffffff" : "#111827"}
            anchorX="center"
            anchorY="middle"
          >
            Jocsan
          </Text>
          <Text
            position={[0, -0.22, 1.06]}
            fontSize={0.09}
            color={isDark ? "#c4b5fd" : "#5b4fd8"}
            anchorX="center"
            anchorY="middle"
            maxWidth={1.8}
          >
            {language === "es" ? "Desarrollador Full-Stack" : "Full-Stack Developer"}
          </Text>
        </Billboard>
      </group>
    </Float>
  );
}

function BackgroundOrbs() {
  return (
    <>
      <mesh position={[-5, 2, -4]}>
        <sphereGeometry args={[0.65, 24, 24]} />
        <meshBasicMaterial color="#38bdf8" transparent opacity={0.08} />
      </mesh>
      <mesh position={[5, -2, -4]}>
        <sphereGeometry args={[0.8, 24, 24]} />
        <meshBasicMaterial color="#a78bfa" transparent opacity={0.08} />
      </mesh>
      <mesh position={[0, 3, -5]}>
        <sphereGeometry args={[0.5, 24, 24]} />
        <meshBasicMaterial color="#22c55e" transparent opacity={0.06} />
      </mesh>
    </>
  );
}

export default function TechSphere({ theme, language }) {
  const isDark = theme === "dark";

  return (
    <section
      id="tech-sphere"
      className="relative z-10 px-6 py-24 sm:px-10 lg:px-14"
    >
      <div className="mb-10">
        <p
          style={{ "--delay": "60ms" }}
          className="reveal mb-4 text-xs font-medium uppercase tracking-[0.25em] text-[#7c6dfa]"
        >
          {language === "es" ? "Tecnologias" : "Technologies"}
        </p>

        <h2
          style={{ "--delay": "150ms" }}
          className={[
            "reveal text-4xl font-bold tracking-tight md:text-5xl",
            isDark ? "text-white" : "text-[#111827]",
          ].join(" ")}
        >
          {language === "es" ? "Tecnologias" : "Technologies"}
        </h2>

        <p
          style={{ "--delay": "240ms" }}
          className={[
            "reveal mt-4 max-w-2xl text-base leading-7",
            isDark ? "text-[#9aa0b8]" : "text-[#475569]",
          ].join(" ")}
        >
          {language === "es"
            ? "Una visualizacion interactiva de mis tecnologias mas importantes."
            : "An interactive visualization of my most important technologies."}
        </p>
      </div>

      <div
        style={{ "--delay": "340ms" }}
        data-spotlight
        className={[
          "reveal-panel h-[560px] overflow-hidden rounded-[32px] border backdrop-blur-xl",
          isDark
            ? "border-white/10 bg-[radial-gradient(circle_at_top,rgba(124,109,250,0.12),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))]"
            : "border-black/10 bg-[radial-gradient(circle_at_top,rgba(124,109,250,0.10),transparent_35%),linear-gradient(135deg,rgba(255,255,255,0.82),rgba(248,250,252,0.96))] shadow-[0_12px_40px_rgba(15,23,42,0.06)]",
        ].join(" ")}
      >
        <Canvas camera={{ position: [0, 0, 8.5], fov: 42 }}>
          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2.1} />
          <pointLight position={[-5, -3, 5]} intensity={1.35} />
          <pointLight position={[0, 4, 2]} intensity={0.8} color="#c4b5fd" />

          <BackgroundOrbs />
          <CenterBubble isDark={isDark} language={language} />

          {featuredTechs.map((tech) => (
            <TechBubble
              key={tech.name}
              name={tech.name}
              position={tech.position}
              size={tech.size}
              color={tech.color}
              Icon={tech.Icon}
              isDark={isDark}
            />
          ))}

          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.9}
          />
        </Canvas>
      </div>
    </section>
  );
}
