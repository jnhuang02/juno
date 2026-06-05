import React, { useState, useEffect, useRef, useCallback } from "react";

const CW = 400;
const CH = 260;
const FISH_X = 75;
const FISH_R = 10;
const GRAVITY = 0.13;
const JUMP_VY = -3.0;
const PIPE_W = 32;
const PIPE_GAP = 120;
const PIPE_SPEED = 1.1;
const SPAWN_EVERY = 150;

// ─── Pure drawing functions (stable references, no component deps) ────────────

function drawBg(ctx) {
  ctx.fillStyle = "#0d1b36";
  ctx.fillRect(0, 0, CW, CH);
  // Crowd dots
  ctx.fillStyle = "#16234a";
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 22; col++) {
      ctx.fillRect(col * 19 + (row % 2) * 9, 28 + row * 11, 7, 7);
    }
  }
  // Floor
  ctx.fillStyle = "#7B4A28";
  ctx.fillRect(0, CH - 18, CW, 18);
  ctx.fillStyle = "#9B6038";
  ctx.fillRect(0, CH - 18, CW, 3);
  // Center court line
  ctx.strokeStyle = "rgba(255,210,0,0.18)";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(CW / 2, CH - 18);
  ctx.lineTo(CW / 2, CH);
  ctx.stroke();
}

function drawHoop(ctx, pipe) {
  const { x, gapTop } = pipe;
  const gapBot = gapTop + PIPE_GAP;

  // Top wall
  ctx.fillStyle = "#1e3a6e";
  ctx.fillRect(x, 0, PIPE_W, gapTop);
  ctx.fillStyle = "#2d55a0";
  ctx.fillRect(x, 0, 3, gapTop);
  ctx.fillRect(x + PIPE_W - 3, 0, 3, gapTop);

  // Bottom wall
  ctx.fillStyle = "#1e3a6e";
  ctx.fillRect(x, gapBot, PIPE_W, CH - gapBot);
  ctx.fillStyle = "#2d55a0";
  ctx.fillRect(x, gapBot, 3, CH - gapBot);
  ctx.fillRect(x + PIPE_W - 3, gapBot, 3, CH - gapBot);

  // Backboard
  const bbX = x - 5;
  const bbW = PIPE_W + 10;
  ctx.fillStyle = "#eeeeee";
  ctx.fillRect(bbX, gapTop - 32, bbW, 32);
  ctx.strokeStyle = "#c0392b";
  ctx.lineWidth = 2;
  ctx.strokeRect(bbX + 6, gapTop - 26, bbW - 12, 14);
  ctx.lineWidth = 1;

  // Rim
  const rimX = x - 9;
  const rimW = PIPE_W + 18;
  const rimY = gapTop + 3;
  ctx.fillStyle = "#e67e22";
  ctx.fillRect(rimX, rimY, rimW, 5);
  ctx.fillStyle = "#a04000";
  ctx.fillRect(rimX, rimY + 5, rimW, 2);

  // Net
  ctx.strokeStyle = "rgba(255,255,255,0.4)";
  ctx.lineWidth = 1;
  const nTop = rimY + 7;
  const nH = 15;
  for (let i = 0; i <= 6; i++) {
    ctx.beginPath();
    ctx.moveTo(rimX + (i / 6) * rimW, nTop);
    ctx.lineTo(rimX + rimW * 0.1 + (i / 6) * (rimW * 0.8), nTop + nH);
    ctx.stroke();
  }
  for (let j = 1; j <= 2; j++) {
    ctx.beginPath();
    ctx.moveTo(rimX, nTop + (j / 3) * nH);
    ctx.lineTo(rimX + rimW, nTop + (j / 3) * nH);
    ctx.stroke();
  }

  // +2 float popup
  if (pipe.justScored) {
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 14px monospace";
    ctx.textAlign = "center";
    ctx.shadowColor = "#000";
    ctx.shadowBlur = 3;
    ctx.fillText("+2", x + PIPE_W / 2, gapTop - 40 + pipe.floatY);
    ctx.shadowBlur = 0;
  }
}

function drawFish(ctx, x, y, vy) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(Math.max(-0.45, Math.min(0.5, vy * 0.07)));

  // Tail fin
  ctx.fillStyle = "#FF6600";
  ctx.beginPath();
  ctx.moveTo(-20, 0);
  ctx.lineTo(-11, -10);
  ctx.lineTo(-11, 10);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Body base
  ctx.fillStyle = "#FF6600";
  ctx.fillRect(-11, -9, 23, 18);

  // White stripes
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(-5, -8, 5, 16);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(5, -8, 5, 16);

  // Stripe outlines
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(-5, -8, 1, 16);
  ctx.fillRect(-1, -8, 1, 16);
  ctx.fillRect(5, -8, 1, 16);
  ctx.fillRect(9, -8, 1, 16);

  // Body border
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(-11, -9, 23, 18);

  // Dorsal fin
  ctx.fillStyle = "#FF6600";
  ctx.beginPath();
  ctx.moveTo(-3, -9);
  ctx.lineTo(0, -17);
  ctx.lineTo(6, -9);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Pectoral fin
  ctx.fillStyle = "#FF8833";
  ctx.beginPath();
  ctx.moveTo(2, 0);
  ctx.lineTo(7, 7);
  ctx.lineTo(-2, 7);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.stroke();

  // Eye
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(7, -6, 6, 6);
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(9, -5, 3, 3);
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(10, -5, 1, 1);

  // Number "2" on first white stripe
  ctx.fillStyle = "#1a1a1a";
  ctx.font = "bold 7px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("2", -3, 0);

  ctx.restore();
}

function drawReferee(ctx, showMsg) {
  const rx = CW - 28;
  const ry = 4;

  // Legs
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(rx - 6, ry + 30, 4, 12);
  ctx.fillRect(rx + 2, ry + 30, 4, 12);
  ctx.fillStyle = "#333";
  ctx.fillRect(rx - 8, ry + 40, 6, 4);
  ctx.fillRect(rx + 2, ry + 40, 6, 4);

  // Striped shirt (vertical stripes)
  for (let i = 0; i < 5; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#1a1a1a" : "#FFFFFF";
    ctx.fillRect(rx - 8 + i * 3, ry + 16, 3, 15);
  }

  // Left arm
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(rx - 14, ry + 18, 6, 3);
  // Right arm raised
  ctx.fillRect(rx + 8, ry + 14, 3, 8);
  ctx.fillRect(rx + 11, ry + 14, 5, 3);

  // Whistle
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(rx + 15, ry + 12, 5, 3);

  // Head
  ctx.fillStyle = "#FDBCB4";
  ctx.fillRect(rx - 6, ry + 4, 12, 12);
  ctx.fillStyle = "#2a1a0a";
  ctx.fillRect(rx - 6, ry + 4, 12, 3);
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(rx - 3, ry + 10, 2, 1);
  ctx.fillRect(rx + 1, ry + 10, 2, 1);
  ctx.fillRect(rx - 2, ry + 14, 4, 1);

  if (!showMsg) return;

  const bx = 14;
  const by = 5;
  const bw = CW - 58;
  const bh = 42;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.3)";
  ctx.fillRect(bx + 3, by + 3, bw, bh);

  // Bubble
  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(bx, by, bw, bh);
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2;
  ctx.strokeRect(bx, by, bw, bh);

  // Tail
  ctx.fillStyle = "#FFFFFF";
  ctx.beginPath();
  ctx.moveTo(bx + bw, by + 10);
  ctx.lineTo(bx + bw + 14, by + 22);
  ctx.lineTo(bx + bw, by + 30);
  ctx.closePath();
  ctx.fill();
  ctx.strokeStyle = "#1a1a1a";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(bx + bw, by + 10);
  ctx.lineTo(bx + bw + 14, by + 22);
  ctx.lineTo(bx + bw, by + 30);
  ctx.stroke();

  ctx.fillStyle = "#e63946";
  ctx.font = "bold 11px monospace";
  ctx.textAlign = "center";
  ctx.fillText("SHOOTING FOUL,", bx + bw / 2, by + 17);
  ctx.fillStyle = "#1a1a1a";
  ctx.fillText("TWO SHOTS!", bx + bw / 2, by + 32);
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function UnethicalHoops() {
  const canvasRef = useRef(null);
  const gRef = useRef({
    phase: "idle",
    fy: CH / 2,
    fvy: 0,
    pipes: [],
    score: 0,
    frame: 0,
    refMsg: false,
    refTimer: 0,
  });
  const rafRef = useRef(null);
  const [ui, setUi] = useState({
    phase: "idle",
    score: 0,
    hs: +(localStorage.getItem("hoops_hs") || 0),
  });

  const loop = useCallback(() => {
    const g = gRef.current;
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(loop); return; }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    if (g.phase === "playing") {
      g.frame++;
      g.fvy = Math.min(g.fvy + GRAVITY, 9);
      g.fy += g.fvy;

      if (g.frame % SPAWN_EVERY === 0) {
        const minTop = 38;
        const maxTop = CH - 18 - PIPE_GAP - 52;
        g.pipes.push({
          x: CW + 10,
          gapTop: minTop + Math.random() * (maxTop - minTop),
          passed: false,
          justScored: false,
          floatY: 0,
          scoreTimer: 0,
        });
      }

      for (const p of g.pipes) {
        p.x -= PIPE_SPEED;
        if (p.justScored && p.scoreTimer > 0) {
          p.scoreTimer--;
          p.floatY -= 0.4;
          if (p.scoreTimer === 0) p.justScored = false;
        }
        if (!p.passed && p.x + PIPE_W < FISH_X) {
          p.passed = true;
          g.score += 2;
          p.justScored = true;
          p.scoreTimer = 50;
          p.floatY = 0;
          g.refMsg = true;
          g.refTimer = 100;
          setUi(u => ({ ...u, score: g.score }));
        }
      }
      g.pipes = g.pipes.filter(p => p.x > -80);

      if (g.refTimer > 0 && --g.refTimer === 0) g.refMsg = false;

      const hit =
        g.fy - FISH_R < 0 ||
        g.fy + FISH_R > CH - 18 ||
        g.pipes.some(p =>
          FISH_X + FISH_R > p.x &&
          FISH_X - FISH_R < p.x + PIPE_W &&
          (g.fy - FISH_R < p.gapTop || g.fy + FISH_R > p.gapTop + PIPE_GAP)
        );

      if (hit) {
        g.phase = "dead";
        const prev = +(localStorage.getItem("hoops_hs") || 0);
        const hs = Math.max(g.score, prev);
        localStorage.setItem("hoops_hs", hs);
        setUi(u => ({ ...u, phase: "dead", hs }));
      }
    }

    if (g.phase === "idle") {
      g.fy = CH / 2 + Math.sin(Date.now() / 600) * 6;
    }

    drawBg(ctx);
    for (const p of g.pipes) drawHoop(ctx, p);
    drawFish(ctx, FISH_X, g.fy, g.phase === "idle" ? 0 : g.fvy);
    drawReferee(ctx, g.refMsg);

    if (g.phase !== "idle") {
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 20px monospace";
      ctx.textAlign = "left";
      ctx.shadowColor = "rgba(0,0,0,0.9)";
      ctx.shadowBlur = 4;
      ctx.fillText(g.score, 14, 62);
      ctx.shadowBlur = 0;
    }

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  const jump = useCallback(() => {
    const g = gRef.current;
    if (g.phase === "idle") {
      g.phase = "playing";
      g.fy = CH / 2;
      g.fvy = JUMP_VY;
      setUi(u => ({ ...u, phase: "playing" }));
    } else if (g.phase === "playing") {
      g.fvy = JUMP_VY;
    } else if (g.phase === "dead") {
      Object.assign(g, {
        phase: "idle", fy: CH / 2, fvy: 0,
        pipes: [], score: 0, frame: 0,
        refMsg: false, refTimer: 0,
      });
      setUi(u => ({ ...u, phase: "idle", score: 0 }));
    }
  }, []);

  useEffect(() => {
    const onKey = e => {
      if (e.code === "Space" || e.code === "ArrowUp") { e.preventDefault(); jump(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [jump]);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <canvas
        ref={canvasRef}
        width={CW}
        height={CH}
        onClick={jump}
        style={{
          display: "block",
          cursor: "pointer",
          imageRendering: "pixelated",
          borderRadius: 8,
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      />

      {ui.phase === "idle" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", borderRadius: 8,
          background: "rgba(13,27,54,0.78)",
        }}>
          <p style={{ color: "#FFD700", fontFamily: "monospace", fontSize: 20, fontWeight: 900, letterSpacing: 2, margin: 0 }}>
            UNETHICAL HOOPS
          </p>
          <p style={{ color: "#a5b4fc", fontFamily: "monospace", fontSize: 12, marginTop: 10, marginBottom: 0 }}>
            TAP or SPACE to start
          </p>
          <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 11, marginTop: 6, marginBottom: 0 }}>
            Best: {ui.hs} pts
          </p>
        </div>
      )}

      {ui.phase === "dead" && (
        <div style={{
          position: "absolute", inset: 0, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", borderRadius: 8,
          background: "rgba(13,27,54,0.82)",
        }}>
          <p style={{ color: "#ef4444", fontFamily: "monospace", fontSize: 20, fontWeight: 900, margin: 0 }}>
            GAME OVER
          </p>
          <p style={{ color: "#FFFFFF", fontFamily: "monospace", fontSize: 14, marginTop: 8, marginBottom: 0 }}>
            Score: {ui.score}
          </p>
          {ui.score > 0 && ui.score >= ui.hs && (
            <p style={{ color: "#FFD700", fontFamily: "monospace", fontSize: 12, marginTop: 3, marginBottom: 0 }}>
              🏆 NEW BEST!
            </p>
          )}
          <p style={{ color: "#6b7280", fontFamily: "monospace", fontSize: 11, marginTop: 4, marginBottom: 0 }}>
            Best: {ui.hs} pts
          </p>
          <p style={{ color: "#a5b4fc", fontFamily: "monospace", fontSize: 11, marginTop: 14, marginBottom: 0 }}>
            TAP or SPACE to retry
          </p>
        </div>
      )}
    </div>
  );
}
