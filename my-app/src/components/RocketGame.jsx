import React, { useState, useEffect, useRef } from "react";
import shedeurImg from "../assets/shedeur.jpeg";
import { useTheme } from "../ThemeContext";

const KEYFRAMES = `
@keyframes ap-fall {
  from { top: -60px; opacity: 1; }
  to   { top: 110%;  opacity: 0.5; }
}
@keyframes ap-catch {
  0%   { transform: translate(-50%, -50%) scale(1.4); opacity: 1; }
  100% { transform: translate(-50%, -280%) scale(0.4); opacity: 0; }
}
@keyframes ap-shimmer {
  0%, 100% { opacity: 0.65; filter: brightness(1); }
  50%       { opacity: 1;    filter: brightness(1.5) drop-shadow(0 0 4px #fff); }
}
@keyframes ap-pulse {
  0%, 100% { box-shadow: 0 0 24px rgba(99,102,241,0.3); }
  50%       { box-shadow: 0 0 60px rgba(99,102,241,0.7), 0 0 100px rgba(99,102,241,0.3); }
}
@keyframes ap-gold-pulse {
  0%, 100% { box-shadow: 0 0 30px rgba(251,191,36,0.5); }
  50%       { box-shadow: 0 0 80px rgba(251,191,36,0.9), 0 0 140px rgba(251,191,36,0.4); }
}
`;

const OCTA = "polygon(29% 0%, 71% 0%, 100% 29%, 100% 71%, 71% 100%, 29% 100%, 0% 71%, 0% 29%)";

// 8 screws at octagon vertices
const SCREWS = [
  { top: "0%",   left: "29%",  transform: "translate(-50%,-50%)" },
  { top: "0%",   left: "71%",  transform: "translate(-50%,-50%)" },
  { top: "29%",  left: "100%", transform: "translate(-50%,-50%)" },
  { top: "71%",  left: "100%", transform: "translate(-50%,-50%)" },
  { top: "100%", left: "71%",  transform: "translate(-50%,-50%)" },
  { top: "100%", left: "29%",  transform: "translate(-50%,-50%)" },
  { top: "71%",  left: "0%",   transform: "translate(-50%,-50%)" },
  { top: "29%",  left: "0%",   transform: "translate(-50%,-50%)" },
];

// Pre-computed diamond spots on the watch face (stable, generated once)
const SPOTS = Array.from({ length: 72 }, (_, i) => {
  const rings = [18, 30, 42];
  const r = rings[i % 3];
  const a = (i / 72) * Math.PI * 2 + (i % 3) * 0.4;
  return {
    left: `${50 + Math.cos(a) * r}%`,
    top:  `${50 + Math.sin(a) * r}%`,
    size: 7 + (i % 4),
    delay: (i * 0.11) % 2.4,
  };
});

const TOTAL = 50;
const TIME  = 45;

const STAGES = [
  { at: 0,    label: "Plain Steel",     color: "#94a3b8", msg: "Click on the falling diamonds to start icing!" },
  { at: 0.15, label: "Lightly Iced",    color: "#38bdf8", msg: "Catching some light..." },
  { at: 0.40, label: "Half Bust 💎",    color: "#6366f1", msg: "We cooking rn 🔥" },
  { at: 0.70, label: "Almost Busted 💎💎", color: "#a855f7", msg: "Dripping on em fr 💧" },
  { at: 1.00, label: "FULLY BUSTED", color: "#fbbf24", msg: "THE AP IS COMPLETELY ICED OUT 🔥" },
];

export default function RocketGame() {
  const { isDark } = useTheme();
  const textPrimary   = isDark ? "#ffffff" : "#0f172a";
  const textSecondary = isDark ? "#9ca3af" : "#64748b";
  const textMuted     = isDark ? "#6b7280" : "#94a3b8";
  const [phase,   setPhase]   = useState("idle");
  const [caught,  setCaught]  = useState(0);
  const [time,    setTime]    = useState(TIME);
  const [fallers, setFallers] = useState([]);
  const [effects, setEffects] = useState([]);

  const idRef      = useRef(0);
  const spawnTimer = useRef(null);
  const countdown  = useRef(null);
  const gameArea   = useRef(null);

  const progress = Math.min(caught / TOTAL, 1);
  const stage    = [...STAGES].reverse().find(s => progress >= s.at) ?? STAGES[0];

  // Inject keyframe CSS once
  useEffect(() => {
    const el = document.createElement("style");
    el.textContent = KEYFRAMES;
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  // Game loop
  useEffect(() => {
    if (phase !== "playing") return;

    countdown.current = setInterval(() => {
      setTime(t => {
        if (t <= 1) { setPhase("done"); return 0; }
        return t - 1;
      });
    }, 1000);

    const scheduleSpawn = () => {
      const id  = idRef.current++;
      const big = Math.random() < 0.15;
      const dur = 2.2 + Math.random() * 2.8;
      setFallers(p => [...p, {
        id, big,
        left: 5 + Math.random() * 88,
        dur,
        size:  big ? 40 : 22 + Math.random() * 10,
        value: big ? 3 : 1,
      }]);
      setTimeout(() => setFallers(p => p.filter(f => f.id !== id)), (dur + 0.3) * 1000);
      spawnTimer.current = setTimeout(scheduleSpawn, 480 + Math.random() * 680);
    };
    spawnTimer.current = setTimeout(scheduleSpawn, 250);

    return () => {
      clearInterval(countdown.current);
      clearTimeout(spawnTimer.current);
    };
  }, [phase]);

  // End game immediately when fully busted
  useEffect(() => {
    if (phase === "playing" && caught >= TOTAL) {
      clearInterval(countdown.current);
      clearTimeout(spawnTimer.current);
      setFallers([]);
      setPhase("won");
    }
  }, [caught, phase]);

  const startGame = () => {
    setCaught(0); setTime(TIME);
    setFallers([]); setEffects([]);
    setPhase("playing");
  };

  const catchDiamond = (e, f) => {
    e.stopPropagation();
    if (phase !== "playing") return;
    setFallers(p => p.filter(d => d.id !== f.id));
    setCaught(p => Math.min(p + f.value, TOTAL));

    const areaRect = gameArea.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
    const r = e.currentTarget.getBoundingClientRect();
    const x = r.left + r.width / 2  - areaRect.left;
    const y = r.top  + r.height / 2 - areaRect.top;
    const eid = idRef.current++;
    setEffects(p => [...p, { id: eid, x, y, value: f.value }]);
    setTimeout(() => setEffects(p => p.filter(e => e.id !== eid)), 700);
  };

  // Watch appearance changes with progress
  const bezelColor = progress >= 1 ? "#fbbf24" : progress >= 0.5 ? "#818cf8" : "#94a3b8";
  const watchBg =
    progress >= 1   ? "linear-gradient(135deg,#fbbf24,#f59e0b,#fbbf24)" :
    progress >= 0.4 ? "linear-gradient(135deg,#3730a3,#6d28d9)" :
                      "linear-gradient(135deg,#1e293b,#334155)";
  const glowAnim =
    progress >= 1   ? "ap-gold-pulse 2s ease-in-out infinite" :
    progress >= 0.3 ? "ap-pulse 2s ease-in-out infinite" : "none";

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Title */}
      <div className="text-center mb-4">
        <h1 className="text-3xl md:text-4xl font-black mb-1" style={{ color: textPrimary }}>
          Bust Down the AP 💎
        </h1>
        <p className="text-sm" style={{ color: textSecondary }}>
          Click on the falling diamonds to ice out the Royal Oak
        </p>
      </div>

      {/* HUD */}
      <div className="flex gap-8 mb-3 z-10">
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest" style={{ color: textMuted }}>Diamonds</div>
          <div className="font-black text-xl" style={{ color: textPrimary }}>
            {caught}<span className="text-sm font-normal" style={{ color: textMuted }}> / {TOTAL}</span>
          </div>
        </div>
        {phase === "playing" && (
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-widest" style={{ color: textMuted }}>Time</div>
            <div className={`font-black text-xl ${time <= 10 ? "text-red-400" : ""}`} style={time <= 10 ? {} : { color: textPrimary }}>
              {time}s
            </div>
          </div>
        )}
        <div className="text-center">
          <div className="text-[10px] uppercase tracking-widest" style={{ color: textMuted }}>Status</div>
          <div className="font-bold text-sm" style={{ color: stage.color }}>{stage.label}</div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-2 bg-gray-800 rounded-full mb-5 overflow-hidden" style={{ width: 460 }}>
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg,#38bdf8,#6366f1,#fbbf24)",
          }}
        />
      </div>

      {/* Game area */}
      <div
        ref={gameArea}
        className="relative rounded-2xl overflow-hidden"
        style={{
          width: 460, height: 460,
          background: "transparent",
        }}
      >
        {/* Watch */}
        <div
          className="absolute left-1/2 top-1/2"
          style={{
            transform: "translate(-50%,-50%)",
            width: 210, height: 210,
            animation: glowAnim,
          }}
        >
          {/* Outer bezel */}
          <div
            className="absolute inset-0"
            style={{
              clipPath: OCTA,
              background: `linear-gradient(135deg,${bezelColor}55,${bezelColor}22)`,
              outline: `2px solid ${bezelColor}88`,
              transition: "all 0.9s",
            }}
          />

          {/* Inner face */}
          <div
            className="absolute"
            style={{
              top: "13px", left: "13px", right: "13px", bottom: "13px",
              clipPath: OCTA,
              background: watchBg,
              transition: "background 1s",
            }}
          >
            {/* Tapisserie pattern */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(45deg,rgba(255,255,255,.25) 0,rgba(255,255,255,.25) 1px,transparent 1px,transparent 7px)," +
                  "repeating-linear-gradient(-45deg,rgba(255,255,255,.25) 0,rgba(255,255,255,.25) 1px,transparent 1px,transparent 7px)",
              }}
            />
            {/* AP label */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="font-black text-lg tracking-[0.22em]" style={{ color: "#ffffff" }}>AP</span>
              <span className="text-white/50 text-[8px] tracking-[0.28em] font-bold mt-0.5">
                ROYAL OAK
              </span>
            </div>
          </div>

          {/* Bezel screws */}
          {SCREWS.map((s, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full pointer-events-none"
              style={{
                ...s,
                background: bezelColor,
                boxShadow: `0 0 5px ${bezelColor}`,
                transition: "all 0.9s",
              }}
            />
          ))}

          {/* Ice diamonds on watch face */}
          {SPOTS.slice(0, Math.round(progress * SPOTS.length)).map((d, i) => (
            <div
              key={i}
              className="absolute pointer-events-none select-none"
              style={{
                left: d.left, top: d.top,
                fontSize: d.size,
                transform: "translate(-50%,-50%)",
                animation: `ap-shimmer ${1.4 + d.delay}s ease-in-out infinite`,
                animationDelay: `${d.delay}s`,
              }}
            >
              💎
            </div>
          ))}
        </div>

        {/* Falling diamonds */}
        {phase === "playing" && fallers.map(f => (
          <div
            key={f.id}
            onClick={e => catchDiamond(e, f)}
            className="absolute cursor-pointer select-none z-20"
            style={{
              left: `${f.left}%`,
              top: "-60px",
              fontSize: f.size,
              animation: `ap-fall ${f.dur}s linear forwards`,
              filter: f.big
                ? "drop-shadow(0 0 8px #fbbf24) drop-shadow(0 0 16px #fbbf24)"
                : "drop-shadow(0 0 4px rgba(99,102,241,0.7))",
              transition: "transform 0.08s",
            }}
            onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.3)")}
            onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
          >
            💎
          </div>
        ))}

        {/* Catch effects */}
        {effects.map(ef => (
          <div
            key={ef.id}
            className="absolute pointer-events-none select-none font-black z-30"
            style={{
              left: ef.x, top: ef.y,
              fontSize: ef.value > 1 ? "1.4rem" : "1rem",
              animation: "ap-catch 0.7s ease-out forwards",
              whiteSpace: "nowrap",
              color: isDark ? "#fde047" : "#b45309",
            }}
          >
            +{ef.value} 💎
          </div>
        ))}

        {/* Start / End overlay */}
        {phase !== "playing" && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center z-40"
            style={
              phase === "won"
                ? {
                    backgroundImage: `url(${shedeurImg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center top",
                  }
                : { background: "rgba(0,0,0,0.75)", backdropFilter: "blur(6px)" }
            }
          >
            {phase === "won" ? (
              <div className="flex flex-col items-center" style={{ background: "rgba(0,0,0,0.55)", borderRadius: 20, padding: "24px 36px" }}>
                <div className="text-5xl mb-2">👑💎👑</div>
                <h2 className="text-2xl font-black text-white mb-1">AP FULLY BUSTED!</h2>
                <p className="text-yellow-300 font-bold text-sm mb-1">Perfect timing</p>
                <p className="text-white/60 text-xs mb-5">{TOTAL} / {TOTAL} diamonds set</p>
                <button
                  onClick={startGame}
                  className="px-8 py-2.5 rounded-full font-bold text-base"
                  style={{ background: "linear-gradient(135deg,#fbbf24,#f59e0b)", color: "#fff" }}
                >
                  Play Again
                </button>
              </div>
            ) : phase === "done" ? (
              <>
                <div className="text-5xl mb-3">
                  {progress >= 0.5 ? "💎" : "⌚"}
                </div>
                <h2 className="text-2xl font-black mb-1" style={{ color: "#ffffff" }}>Time's Up!</h2>
                <p className="font-bold text-lg mb-1" style={{ color: stage.color }}>
                  {stage.label}
                </p>
                <p className="text-sm mb-1" style={{ color: "#9ca3af" }}>{stage.msg}</p>
                <p className="text-white/60 text-sm mb-6">
                  {caught} / {TOTAL} diamonds set
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-2.5 rounded-full font-bold text-base"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff" }}
                >
                  Play Again
                </button>
              </>
            ) : (
              <>
                <div className="text-6xl mb-4">💎</div>
                <p className="text-xs mb-6" style={{ color: textMuted }}>
                  Big diamonds = +3 &nbsp;|&nbsp; 45 seconds &nbsp;|&nbsp; Goal: {TOTAL} 💎
                </p>
                <button
                  onClick={startGame}
                  className="px-8 py-2.5 rounded-full font-bold text-base"
                  style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)", color: "#fff" }}
                >
                  Start Busting 💎
                </button>
              </>
            )}
          </div>
        )}
      </div>

      {/* Status message */}
      {phase === "playing" && (
        <p className="text-sm mt-4 italic" style={{ color: "#9ca3af" }}>{stage.msg}</p>
      )}
    </div>
  );
}
