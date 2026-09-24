import { useEffect, useRef, useState } from "react";
import { blessings } from "../data/blessings";

const EMOJIS = ["🥮", "🌕", "🥮", "🌙", "🥮"];

export default function MooncakeRain() {
  const [raining, setRaining] = useState(false);
  const [mooncakes, setMooncakes] = useState([]);
  const [bubble, setBubble] = useState(null); // { id, text, x, y }
  const timeoutRef = useRef(null);
  const bubbleTimerRef = useRef(null);

  // 生成一批月饼
  const startRain = () => {
    if (raining) return;

    const count = 30;
    const items = Array.from({ length: count }).map((_, i) => ({
      id: Date.now() + i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 100,          // 屏幕横向百分比
      duration: 4 + Math.random() * 5,    // 4~9 秒飘落
      delay: Math.random() * 3,           // 0~3 秒启动延迟
      size: 24 + Math.random() * 20,      // 24~44px
      rotate: Math.random() * 360,
    }));

    setMooncakes(items);
    setRaining(true);

    // 10 秒后清空（覆盖最长飘落时长 + 延迟）
    timeoutRef.current = setTimeout(() => {
      setMooncakes([]);
      setRaining(false);
    }, 10000);
  };

  // 点击月饼，弹出随机话语
  const handleMooncakeClick = (e, item) => {
    e.stopPropagation();
    const text = blessings[Math.floor(Math.random() * blessings.length)];
    const rect = e.currentTarget.getBoundingClientRect();

    setBubble({
      id: Date.now(),
      text,
      x: rect.left + rect.width / 2,
      y: rect.top,
    });

    // 2 秒后自动消失
    clearTimeout(bubbleTimerRef.current);
    bubbleTimerRef.current = setTimeout(() => setBubble(null), 2000);
  };

  // 组件卸载清定时器
  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
      clearTimeout(bubbleTimerRef.current);
    };
  }, []);

  return (
    <>
      {/* 月饼雨容器 */}
      {raining && (
        <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
          {mooncakes.map((m) => (
            <div
              key={m.id}
              onClick={(e) => handleMooncakeClick(e, m)}
              className="absolute select-none pointer-events-auto cursor-pointer hover:scale-125 transition-transform"
              style={{
                left: `${m.left}%`,
                top: "-60px",
                fontSize: `${m.size}px`,
                transform: `rotate(${m.rotate}deg)`,
                animation: `mooncake-fall ${m.duration}s linear ${m.delay}s forwards`,
              }}
            >
              {m.emoji}
            </div>
          ))}
        </div>
      )}

      {/* 气泡 */}
      {bubble && (
        <div
          className="fixed z-50 pointer-events-none animate-bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            transform: "translate(-50%, -100%)",
          }}
        >
          <div className="bg-white border border-pink-200 text-pink-500 text-sm px-4 py-2 rounded-full shadow-lg whitespace-nowrap">
            {bubble.text}
          </div>
        </div>
      )}

      {/* 右下角按钮 */}
      <button
        onClick={startRain}
        disabled={raining}
         className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-gradient-to-br from-amber-300 via-amber-400 to-orange-400 text-emerald-950 text-base font-semibold px-5 py-3 rounded-full shadow-[0_0_30px_rgba(251,191,36,0.5)] hover:shadow-[0_0_40px_rgba(251,191,36,0.8)] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
         <img
            src="/photo/1.png"
            alt="中秋"
             className="w-10 h-10 object-contain drop-shadow"
     />
        🥮 {raining ? "月饼降落中…" : "中秋快乐"}
      </button>
    </>
  );
}