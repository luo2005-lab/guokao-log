export default function WillowSides() {
  return (
    <>
      {/* 左侧垂柳 */}
      <div className="hidden md:block fixed left-0 top-0 h-screen w-40 pointer-events-none z-0 opacity-70">
        <svg
          viewBox="0 0 160 800"
          preserveAspectRatio="xMinYMin slice"
          className="h-full w-full"
        >
          {/* 主干 */}
          <path
            d="M40,800 Q35,600 45,400 Q50,300 40,200 Q38,150 42,100"
            stroke="#0a1f14"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          {/* 分枝 */}
          <path
            d="M42,300 Q10,260 -10,230"
            stroke="#0a1f14"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M44,220 Q20,180 5,140"
            stroke="#0a1f14"
            strokeWidth="5"
            fill="none"
          />

          {/* 柳枝（每条用 swing 动画） */}
          {[
            { d: "M42,100 Q20,200 30,320 Q40,420 25,520", delay: 0 },
            { d: "M42,100 Q60,200 55,320 Q50,420 65,520", delay: 0.6 },
            { d: "M42,100 Q5,180 8,300 Q12,400 -5,520", delay: 1.2 },
            { d: "M42,100 Q80,180 78,300 Q75,400 90,520", delay: 0.9 },
            { d: "M42,150 Q15,260 25,380 Q35,480 18,600", delay: 1.5 },
            { d: "M42,150 Q70,260 62,380 Q55,480 72,600", delay: 0.3 },
          ].map((b, i) => (
            <path
              key={i}
              d={b.d}
              stroke="#1a3a25"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                transformOrigin: "42px 100px",
                animation: `willow-swing 5s ease-in-out ${b.delay}s infinite`,
              }}
            />
          ))}

          {/* 柳叶点缀 */}
          {[
            [22, 260], [30, 340], [48, 300], [60, 380],
            [15, 420], [35, 480], [55, 450], [28, 520],
            [8, 320], [72, 340], [68, 440], [20, 580],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="3"
              ry="6"
              fill="#2d5a3a"
              opacity="0.85"
              style={{
                transformOrigin: "42px 100px",
                animation: `willow-swing 5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </svg>
      </div>

      {/* 右侧垂柳（镜像） */}
      <div
        className="hidden md:block fixed right-0 top-0 h-screen w-40 pointer-events-none z-0 opacity-70"
        style={{ transform: "scaleX(-1)" }}
      >
        <svg
          viewBox="0 0 160 800"
          preserveAspectRatio="xMinYMin slice"
          className="h-full w-full"
        >
          <path
            d="M40,800 Q35,600 45,400 Q50,300 40,200 Q38,150 42,100"
            stroke="#0a1f14"
            strokeWidth="10"
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M42,300 Q10,260 -10,230"
            stroke="#0a1f14"
            strokeWidth="6"
            fill="none"
          />
          <path
            d="M44,220 Q20,180 5,140"
            stroke="#0a1f14"
            strokeWidth="5"
            fill="none"
          />

          {[
            { d: "M42,100 Q20,200 30,320 Q40,420 25,520", delay: 0 },
            { d: "M42,100 Q60,200 55,320 Q50,420 65,520", delay: 0.6 },
            { d: "M42,100 Q5,180 8,300 Q12,400 -5,520", delay: 1.2 },
            { d: "M42,100 Q80,180 78,300 Q75,400 90,520", delay: 0.9 },
            { d: "M42,150 Q15,260 25,380 Q35,480 18,600", delay: 1.5 },
            { d: "M42,150 Q70,260 62,380 Q55,480 72,600", delay: 0.3 },
          ].map((b, i) => (
            <path
              key={i}
              d={b.d}
              stroke="#1a3a25"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
              style={{
                transformOrigin: "42px 100px",
                animation: `willow-swing 5s ease-in-out ${b.delay}s infinite`,
              }}
            />
          ))}

          {[
            [22, 260], [30, 340], [48, 300], [60, 380],
            [15, 420], [35, 480], [55, 450], [28, 520],
            [8, 320], [72, 340], [68, 440], [20, 580],
          ].map(([x, y], i) => (
            <ellipse
              key={i}
              cx={x}
              cy={y}
              rx="3"
              ry="6"
              fill="#2d5a3a"
              opacity="0.85"
              style={{
                transformOrigin: "42px 100px",
                animation: `willow-swing 5s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </svg>
      </div>
    </>
  );
}