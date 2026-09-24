import { useEffect, useMemo, useState } from "react";

export default function JungleBackground() {
  // 生成一次性粒子（避免每次 render 重算）
  const fireflies = useMemo(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: 30 + Math.random() * 60,       // 只在下半部分飘
        size: 2 + Math.random() * 4,
        duration: 6 + Math.random() * 8,
        delay: Math.random() * 5,
      })),
    []
  );

  const leaves = useMemo(
    () =>
      Array.from({ length: 10 }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        size: 14 + Math.random() * 12,
        duration: 12 + Math.random() * 10,
        delay: Math.random() * 8,
        emoji: ["🍃", "🍂", "🌿"][i % 3],
      })),
    []
  );

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* 夜空渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0b1e2d] via-[#123326] to-[#0a1a12]" />

      {/* 星星（只在顶部） */}
      <div
        className="absolute inset-x-0 top-0 h-1/2 opacity-70"
        style={{
          backgroundImage:
            "radial-gradient(1.5px 1.5px at 20% 30%, #fff, transparent), radial-gradient(1px 1px at 60% 15%, #fff, transparent), radial-gradient(1px 1px at 80% 40%, #fff, transparent), radial-gradient(1.5px 1.5px at 35% 55%, #fff, transparent), radial-gradient(1px 1px at 90% 25%, #fff, transparent), radial-gradient(1px 1px at 10% 60%, #fff, transparent)",
        }}
      />

      {/* 月亮 */}
      <div className="absolute top-10 right-16 md:top-16 md:right-24">
        <div className="relative">
          <div className="w-20 h-20 md:w-28 md:h-28 rounded-full bg-gradient-to-br from-yellow-100 to-amber-200 shadow-[0_0_80px_30px_rgba(255,220,150,0.35)]" />
          {/* 月亮表面的暗斑，简单画两个圆 */}
          <div className="absolute top-6 left-5 w-3 h-3 rounded-full bg-amber-100/60" />
          <div className="absolute top-12 left-12 w-4 h-4 rounded-full bg-amber-100/50" />
          <div className="absolute top-16 left-6 w-2 h-2 rounded-full bg-amber-100/50" />
        </div>
      </div>

      {/* 远山 / 丛林剪影 三层 */}
      <svg
        className="absolute bottom-0 left-0 w-full h-64 md:h-80"
        viewBox="0 0 1200 300"
        preserveAspectRatio="none"
      >
        {/* 最远层 */}
        <path
          d="M0,200 Q150,120 300,180 T600,150 T900,190 T1200,140 L1200,300 L0,300 Z"
          fill="#0f2a1f"
          opacity="0.85"
        />
        {/* 中间层 */}
        <path
          d="M0,240 Q200,180 400,230 T800,210 T1200,240 L1200,300 L0,300 Z"
          fill="#0a1f17"
          opacity="0.9"
        />
        {/* 最近层 */}
        <path
          d="M0,270 Q300,240 600,265 T1200,260 L1200,300 L0,300 Z"
          fill="#06140d"
        />
      </svg>

      {/* 萤火虫 */}
      {mounted &&
        fireflies.map((f) => (
          <div
            key={f.id}
            className="absolute rounded-full bg-yellow-200"
            style={{
              left: `${f.left}%`,
              top: `${f.top}%`,
              width: `${f.size}px`,
              height: `${f.size}px`,
              boxShadow: "0 0 10px 3px rgba(253, 230, 138, 0.7)",
              animation: `firefly ${f.duration}s ease-in-out ${f.delay}s infinite`,
            }}
          />
        ))}

      {/* 落叶 */}
      {mounted &&
        leaves.map((l) => (
          <div
            key={l.id}
            className="absolute select-none"
            style={{
              left: `${l.left}%`,
              top: "-40px",
              fontSize: `${l.size}px`,
              animation: `leaf-fall ${l.duration}s linear ${l.delay}s infinite`,
            }}
          >
            {l.emoji}
          </div>
        ))}

      {/* 底部雾 */}
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-emerald-950/70 to-transparent" />
    </div>
  );
}