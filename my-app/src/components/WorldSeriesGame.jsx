import React, { useState, useEffect, useRef, useCallback } from "react";

const CW = 460;
const CH = 340;
const PLAYER_W = 16;
const PLAYER_H = 30;
const PLAYER_SPEED = 4.6;
const BALL_R = 8;
const PY_MIN = 85;
const PY_MAX = CH - PLAYER_H - 14;
const SPAWN_START = 78;
const SPEED_START = 3.3;

// ─── Pure drawing functions ───────────────────────────────────────────────────

function drawBg(ctx) {
  // Sky
  ctx.fillStyle = "#4a90c4";
  ctx.fillRect(0, 0, CW, 36);

  // Bleachers / crowd
  ctx.fillStyle = "#1e2d50";
  ctx.fillRect(0, 0, CW, 22);
  const crowdCols = ["#e8d5b0", "#c9a87c", "#f0d8a0", "#d4aa80", "#f5e0b8"];
  for (let i = 0; i < 30; i++) {
    ctx.fillStyle = crowdCols[i % 5];
    ctx.fillRect(6 + i * 15, 3, 7, 9);
    ctx.fillStyle = crowdCols[(i + 2) % 5];
    ctx.fillRect(0 + i * 15, 12, 7, 8);
  }

  // Outfield wall
  ctx.fillStyle = "#1a2840";
  ctx.fillRect(0, 20, CW, 14);
  ctx.fillStyle = "#FFD700";
  ctx.fillRect(0, 20, CW, 3);

  // Field stripes
  for (let i = 0; i < 9; i++) {
    ctx.fillStyle = i % 2 === 0 ? "#2d8b2d" : "#247024";
    const sw = Math.ceil(CW / 9);
    ctx.fillRect(i * sw, 34, sw + 1, CH - 80);
  }

  // Warning track
  ctx.fillStyle = "#9B7540";
  ctx.fillRect(0, CH - 46, CW, 46);
  ctx.fillStyle = "#7a5c2e";
  for (let i = 0; i < 48; i++) {
    ctx.fillRect(4 + i * 10 + (i % 3) * 2, CH - 38 + (i % 4) * 7, 3, 2);
  }

  // Grass/track separator
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, CH - 46, CW, 2);
}

function drawPlayer(ctx, px, py, frame, moving) {
  const x = Math.round(px);
  const y = Math.round(py);
  const walk = moving ? Math.floor(frame / 5) % 2 : 0;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.18)";
  ctx.fillRect(x - 11, y + PLAYER_H - 1, 22, 5);

  // Cleats
  ctx.fillStyle = "#111111";
  const lly = walk === 0 ? y + PLAYER_H - 4 : y + PLAYER_H - 7;
  const rly = walk === 0 ? y + PLAYER_H - 7 : y + PLAYER_H - 4;
  ctx.fillRect(x - 8, lly, 8, 4);
  ctx.fillRect(x + 1, rly, 8, 4);
  ctx.fillStyle = "#333";
  ctx.fillRect(x - 10, lly + 2, 8, 2);
  ctx.fillRect(x + 2, rly + 2, 8, 2);

  // Pants
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(x - 6, y + 18, 5, 10);
  ctx.fillRect(x + 1, y + 18, 5, 10);
  ctx.fillStyle = "#003087";
  ctx.fillRect(x - 5, y + 18, 1, 10);
  ctx.fillRect(x - 2, y + 18, 1, 10);
  ctx.fillRect(x + 2, y + 18, 1, 10);
  ctx.fillRect(x + 5, y + 18, 1, 10);

  // Belt
  ctx.fillStyle = "#111";
  ctx.fillRect(x - 7, y + 16, 14, 2);

  // Jersey
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(x - 7, y + 4, 14, 13);
  ctx.fillStyle = "#003087";
  for (let i = 0; i < 4; i++) ctx.fillRect(x - 6 + i * 4, y + 4, 1, 13);

  // Number 99
  ctx.fillStyle = "#003087";
  ctx.font = "bold 5px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("99", x, y + 11);

  // Left arm
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(x - 11, y + 6, 4, 9);
  ctx.fillStyle = "#003087";
  ctx.fillRect(x - 11, y + 6, 4, 1);

  // Right arm (raised)
  ctx.fillStyle = "#f8f8f8";
  ctx.fillRect(x + 7, y + 2, 4, 9);
  ctx.fillStyle = "#003087";
  ctx.fillRect(x + 7, y + 2, 4, 1);

  // Glove
  ctx.fillStyle = "#7a3c12";
  ctx.fillRect(x + 8, y - 3, 9, 7);
  ctx.fillStyle = "#5a2c0e";
  ctx.fillRect(x + 9, y - 2, 7, 5);
  ctx.fillStyle = "#6B3410";
  ctx.fillRect(x + 10, y - 3, 3, 2);
  ctx.fillRect(x + 14, y - 3, 2, 2);

  // Head
  ctx.fillStyle = "#FDBCB4";
  ctx.fillRect(x - 4, y - 4, 8, 9);

  // Cap
  ctx.fillStyle = "#003087";
  ctx.fillRect(x - 5, y - 10, 10, 7);
  ctx.fillRect(x - 4, y - 11, 8, 2);
  ctx.fillRect(x - 7, y - 5, 14, 2);

  // NY logo
  ctx.fillStyle = "#C9A84C";
  ctx.font = "bold 4px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("NY", x, y - 7);

  // Eyes
  ctx.fillStyle = "#1a1a1a";
  ctx.fillRect(x - 2, y, 1, 1);
  ctx.fillRect(x + 1, y, 1, 1);

  ctx.textBaseline = "alphabetic";
}

function drawBall(ctx, ball) {
  const bx = Math.round(ball.x);
  const by = Math.round(ball.y);

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.14)";
  ctx.beginPath();
  ctx.ellipse(bx + 2, by + 3, BALL_R, BALL_R * 0.45, 0, 0, Math.PI * 2);
  ctx.fill();

  // Body
  ctx.fillStyle = "#f5f5ee";
  ctx.beginPath();
  ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
  ctx.fill();

  // Stitching (rotated with ball)
  ctx.save();
  ctx.translate(bx, by);
  ctx.rotate(ball.angle);
  ctx.strokeStyle = "#cc1100";
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.arc(-2, 0, 4.5, -0.75, 0.75);
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(2, 0, 4.5, Math.PI - 0.75, Math.PI + 0.75);
  ctx.stroke();
  ctx.restore();

  // Outline
  ctx.strokeStyle = "rgba(120,90,50,0.3)";
  ctx.lineWidth = 0.8;
  ctx.beginPath();
  ctx.arc(bx, by, BALL_R, 0, Math.PI * 2);
  ctx.stroke();

  // Highlight
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.fillRect(bx - 3, by - BALL_R + 1, 2, 2);
}

function drawHud(ctx, score) {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(8, 35, 80, 28);
  ctx.strokeStyle = "#FFD700";
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 35, 80, 28);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "8px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("DODGED", 14, 39);
  ctx.fillStyle = "#FFD700";
  ctx.font = "bold 14px monospace";
  ctx.fillText(score, 14, 49);
  ctx.textBaseline = "alphabetic";
}

function spawnBall(speed) {
  return {
    x: BALL_R + Math.random() * (CW - BALL_R * 2),
    y: -BALL_R,
    vx: (Math.random() - 0.5) * 2.5,
    vy: speed + Math.random() * 0.8,
    angle: 0,
    spin: (Math.random() - 0.5) * 0.12,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function WorldSeriesGame() {
  const canvasRef = useRef(null);
  const keysRef   = useRef({});
  const gRef = useRef({
    phase: "idle",
    px: CW / 2,
    py: PY_MAX,
    balls: [],
    score: 0,
    frame: 0,
    spawnRate: SPAWN_START,
    ballSpeed: SPEED_START,
    moving: false,
  });
  const rafRef = useRef(null);
  const [ui, setUi] = useState({
    phase: "idle",
    score: 0,
    hs: +(localStorage.getItem("ws_hs") || 0),
  });

  const reset = useCallback(() => {
    const g = gRef.current;
    Object.assign(g, {
      phase: "idle",
      px: CW / 2,
      py: PY_MAX,
      balls: [],
      score: 0,
      frame: 0,
      spawnRate: SPAWN_START,
      ballSpeed: SPEED_START,
      moving: false,
    });
    setUi(u => ({ ...u, phase: "idle", score: 0 }));
  }, []);

  const startGame = useCallback(() => {
    const g = gRef.current;
    Object.assign(g, {
      phase: "playing",
      px: CW / 2,
      py: PY_MAX,
      balls: [],
      score: 0,
      frame: 0,
      spawnRate: SPAWN_START,
      ballSpeed: SPEED_START,
      moving: false,
    });
    setUi(u => ({ ...u, phase: "playing", score: 0 }));
  }, []);

  const loop = useCallback(() => {
    const g = gRef.current;
    const canvas = canvasRef.current;
    if (!canvas) { rafRef.current = requestAnimationFrame(loop); return; }
    const ctx = canvas.getContext("2d");
    ctx.imageSmoothingEnabled = false;

    // ── Idle ──
    if (g.phase === "idle") {
      drawBg(ctx);
      const bob = Math.sin(Date.now() / 550) * 3;
      drawPlayer(ctx, g.px, PY_MAX + bob, 0, false);

      ctx.fillStyle = "rgba(0,0,0,0.62)";
      ctx.fillRect(CW / 2 - 120, CH / 2 - 34, 240, 68);
      ctx.strokeStyle = "#FFD700";
      ctx.lineWidth = 2;
      ctx.strokeRect(CW / 2 - 120, CH / 2 - 34, 240, 68);
      ctx.fillStyle = "#FFD700";
      ctx.font = "bold 13px monospace";
      ctx.textAlign = "center";
      ctx.fillText("GAME 5 WORLD SERIES ⚾", CW / 2, CH / 2 - 12);
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "10px monospace";
      ctx.fillText("Arrow keys / WASD to dodge", CW / 2, CH / 2 + 7);
      ctx.fillStyle = "#6b7280";
      ctx.font = "9px monospace";
      ctx.fillText(`Best: ${ui.hs} dodged`, CW / 2, CH / 2 + 22);

      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    // ── Dead ──
    if (g.phase === "dead") {
      drawBg(ctx);
      drawPlayer(ctx, g.px, g.py, g.frame, false);
      for (const b of g.balls) { b.angle += b.spin; drawBall(ctx, b); }
      drawHud(ctx, g.score);

      ctx.fillStyle = "rgba(0,0,0,0.68)";
      ctx.fillRect(CW / 2 - 110, CH / 2 - 38, 220, 76);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.strokeRect(CW / 2 - 110, CH / 2 - 38, 220, 76);
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("YOU'RE OUT! ⚾", CW / 2, CH / 2 - 14);
      ctx.fillStyle = "#ffffff";
      ctx.font = "11px monospace";
      ctx.fillText(`Dodged: ${g.score}`, CW / 2, CH / 2 + 6);
      const hs = +(localStorage.getItem("ws_hs") || 0);
      if (g.score > 0 && g.score >= hs) {
        ctx.fillStyle = "#FFD700";
        ctx.font = "bold 10px monospace";
        ctx.fillText("🏆 NEW BEST!", CW / 2, CH / 2 + 22);
      } else {
        ctx.fillStyle = "#9ca3af";
        ctx.font = "9px monospace";
        ctx.fillText(`Best: ${hs}`, CW / 2, CH / 2 + 22);
      }
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "9px monospace";
      ctx.fillText("Press SPACE or click to retry", CW / 2, CH / 2 + 36);

      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    // ── Playing ──
    g.frame++;
    const keys = keysRef.current;

    let moved = false;
    if ((keys["ArrowLeft"]  || keys["a"] || keys["A"]) && g.px - PLAYER_W / 2 > 0)   { g.px -= PLAYER_SPEED; moved = true; }
    if ((keys["ArrowRight"] || keys["d"] || keys["D"]) && g.px + PLAYER_W / 2 < CW)  { g.px += PLAYER_SPEED; moved = true; }
    if ((keys["ArrowUp"]    || keys["w"] || keys["W"]) && g.py > PY_MIN)              { g.py -= PLAYER_SPEED; moved = true; }
    if ((keys["ArrowDown"]  || keys["s"] || keys["S"]) && g.py < PY_MAX)              { g.py += PLAYER_SPEED; moved = true; }
    g.moving = moved;

    // Spawn
    if (g.frame % Math.round(g.spawnRate) === 0) {
      g.balls.push(spawnBall(g.ballSpeed));
      if (g.spawnRate > 30) g.spawnRate -= 0.8;
      if (g.ballSpeed < 6.5)  g.ballSpeed  += 0.045;
    }

    // Update balls + collision
    let hit = false;
    const alive = [];
    for (const b of g.balls) {
      b.x += b.vx;
      b.y += b.vy;
      b.angle += b.spin;

      // Circle vs rect collision
      const cx = Math.max(g.px - PLAYER_W / 2, Math.min(b.x, g.px + PLAYER_W / 2));
      const cy = Math.max(g.py,                 Math.min(b.y, g.py + PLAYER_H));
      const dx = b.x - cx, dy = b.y - cy;
      if (dx * dx + dy * dy < BALL_R * BALL_R) { hit = true; break; }

      if (b.y < CH + BALL_R * 2) {
        alive.push(b);
      } else {
        // Exited bottom = dodged
        g.score++;
        if (g.frame % 1 === 0) setUi(u => ({ ...u, score: g.score }));
      }
    }
    g.balls = alive;

    if (hit) {
      g.phase = "dead";
      const prev = +(localStorage.getItem("ws_hs") || 0);
      const hs = Math.max(g.score, prev);
      localStorage.setItem("ws_hs", hs);
      setUi(u => ({ ...u, phase: "dead", hs }));
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    // Draw
    drawBg(ctx);
    for (const b of g.balls) drawBall(ctx, b);
    drawPlayer(ctx, g.px, g.py, g.frame, g.moving);
    drawHud(ctx, g.score);

    rafRef.current = requestAnimationFrame(loop);
  }, []);

  useEffect(() => {
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [loop]);

  useEffect(() => {
    const down = e => {
      keysRef.current[e.key] = true;
      if (["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(e.key)) e.preventDefault();
      if (e.code === "Space") {
        e.preventDefault();
        const g = gRef.current;
        if (g.phase === "idle") startGame();
        else if (g.phase === "dead") startGame();
      }
    };
    const up = e => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup",   up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, [startGame]);

  const handleClick = useCallback(() => {
    const g = gRef.current;
    if (g.phase === "idle" || g.phase === "dead") startGame();
  }, [startGame]);

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 0" }}>
      <div style={{ textAlign: "center", marginBottom: 16 }}>
        <h1 style={{ color: "#ffffff", fontFamily: "monospace", fontSize: 22, fontWeight: 900, margin: "0 0 4px", letterSpacing: 1 }}>
          Game 5 World Series ⚾
        </h1>
        <p style={{ color: "#9ca3af", fontFamily: "monospace", fontSize: 12, margin: 0 }}>
          Dodge the baseballs — Arrow keys / WASD to move
        </p>
      </div>
      <div style={{ position: "relative", display: "inline-block" }}>
        <canvas
          ref={canvasRef}
          width={CW}
          height={CH}
          onClick={handleClick}
          style={{
            display: "block",
            cursor: "pointer",
            imageRendering: "pixelated",
            borderRadius: 8,
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        />
      </div>
    </div>
  );
}
