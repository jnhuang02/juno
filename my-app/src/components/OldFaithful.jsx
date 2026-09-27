import React, { useState, useEffect, useRef, useCallback } from "react";

const CW = 460;
const CH = 340;
const CAR_W = 26;
const CAR_H = 44;
const PLAYER_SPEED = 4.2;
const ROAD_X = 72;
const ROAD_W = CW - ROAD_X * 2;
const HORIZON = 66; // bottom of the stadium backdrop band
const PY_MIN = HORIZON + 6;
const PY_MAX = CH - CAR_H / 2 - 8;
const SPAWN_START = 82;
const SPEED_START = 3.0;

const OBSTACLES = [
  { type: "light", w: 18, h: 42 },
  { type: "police", w: 28, h: 44 },
  { type: "contract", w: 36, h: 24 },
];

// Real Levi's Stadium backdrop (drawn only, never read back, so cross-origin is fine).
// Falls back to pixel-art stands until/unless the image loads.
const bgImg = new Image();
let bgReady = false;
bgImg.onload = () => { bgReady = true; };
bgImg.src =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Levi%27s_Stadium_from_Outside_the_Stadium.JPG/1280px-Levi%27s_Stadium_from_Outside_the_Stadium.JPG";

// Draw an image "cover"-style (center-cropped) into a destination rect.
function drawImageCover(ctx, img, dx, dy, dw, dh) {
  const ir = img.width / img.height;
  const dr = dw / dh;
  let sw, sh, sx, sy;
  if (ir > dr) {
    sh = img.height;
    sw = sh * dr;
    sx = (img.width - sw) / 2;
    sy = 0;
  } else {
    sw = img.width;
    sh = sw / dr;
    sx = 0;
    sy = (img.height - sh) / 2;
  }
  ctx.drawImage(img, sx, sy, sw, sh, dx, dy, dw, dh);
}

// Pixel-art crowd stands (fallback before the photo loads).
function drawStands(ctx) {
  ctx.fillStyle = "#2e0d0d";
  ctx.fillRect(0, 0, CW, HORIZON);
  const crowd = ["#AA0000", "#C9A84C", "#f0f0f0", "#7a0000", "#E0BF6A"];
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 30; col++) {
      ctx.fillStyle = crowd[(col + row * 2) % crowd.length];
      ctx.fillRect(4 + col * 15.4 + (row % 2) * 7, 3 + row * 11, 6, 7);
    }
  }
}

// ─── Pure drawing functions ───────────────────────────────────────────────────

function drawBg(ctx, roadOffset, frame) {
  // ── Levi's Stadium photo as the ENTIRE background ──
  if (bgReady) {
    drawImageCover(ctx, bgImg, 0, 0, CW, CH);
    // Subtle dark overlay so the road and sprites stay readable
    ctx.fillStyle = "rgba(8,12,24,0.32)";
    ctx.fillRect(0, 0, CW, CH);
  } else {
    ctx.fillStyle = "#0d1b36";
    ctx.fillRect(0, 0, CW, CH);
    drawStands(ctx);
  }

  // "LEVI'S STADIUM" label (top-left corner)
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(8, 8, 116, 14);
  ctx.fillStyle = "#FFD54A";
  ctx.font = "bold 8px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "middle";
  ctx.fillText("LEVI'S STADIUM", 12, 16);
  ctx.textBaseline = "alphabetic";

  // ── Road drawn over the stadium (sides show the stadium photo) ──
  // Road surface
  ctx.fillStyle = "#3b3b42";
  ctx.fillRect(ROAD_X, 0, ROAD_W, CH);

  // Red/white racing curbs along both edges (scrolling)
  for (let y = -32; y < CH; y += 16) {
    const sy = y + (roadOffset % 32);
    ctx.fillStyle = Math.floor((y + roadOffset) / 16) % 2 === 0 ? "#cc2222" : "#f2f2f2";
    ctx.fillRect(ROAD_X - 6, sy, 6, 16);
    ctx.fillRect(ROAD_X + ROAD_W, sy, 6, 16);
  }

  // Lane dashes (two dividers, scrolling)
  ctx.fillStyle = "#FFD54A";
  const laneA = ROAD_X + ROAD_W / 3;
  const laneB = ROAD_X + (ROAD_W * 2) / 3;
  for (let y = -40; y < CH; y += 40) {
    const sy = y + (roadOffset % 40);
    ctx.fillRect(laneA - 2, sy, 4, 22);
    ctx.fillRect(laneB - 2, sy, 4, 22);
  }
}

function drawCar(ctx, cx, cy, moving, frame) {
  const x = Math.round(cx);
  const y = Math.round(cy);
  const top = y - CAR_H / 2;
  const left = x - CAR_W / 2;

  // Shadow
  ctx.fillStyle = "rgba(0,0,0,0.28)";
  ctx.fillRect(left - 2, top + 4, CAR_W + 4, CAR_H);

  // Wheels (black, sticking out the sides)
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(left - 4, top + 5, 5, 11);
  ctx.fillRect(left + CAR_W - 1, top + 5, 5, 11);
  ctx.fillRect(left - 4, top + CAR_H - 16, 5, 11);
  ctx.fillRect(left + CAR_W - 1, top + CAR_H - 16, 5, 11);

  // Rear wing
  ctx.fillStyle = "#111111";
  ctx.fillRect(left - 3, top + CAR_H - 5, CAR_W + 6, 5);

  // Body (black with tapered nose)
  ctx.fillStyle = "#161616";
  ctx.fillRect(left + 2, top + 4, CAR_W - 4, CAR_H - 8);
  ctx.fillStyle = "#161616";
  ctx.beginPath();
  ctx.moveTo(left + 5, top + 6);
  ctx.lineTo(x, top - 2);
  ctx.lineTo(left + CAR_W - 5, top + 6);
  ctx.closePath();
  ctx.fill();

  // 49ers red racing stripe down the center
  ctx.fillStyle = "#AA0000";
  ctx.fillRect(x - 4, top + 2, 8, CAR_H - 6);
  // Gold pinstripes
  ctx.fillStyle = "#C9A84C";
  ctx.fillRect(x - 5, top + 2, 1, CAR_H - 6);
  ctx.fillRect(x + 4, top + 2, 1, CAR_H - 6);

  // Front wing
  ctx.fillStyle = "#0a0a0a";
  ctx.fillRect(left + 1, top + 2, CAR_W - 2, 3);

  // Cockpit
  ctx.fillStyle = "#050505";
  ctx.fillRect(x - 6, top + 14, 12, 16);

  // Driver — 49ers #11 jersey + helmet
  ctx.fillStyle = "#AA0000"; // red jersey shoulders
  ctx.fillRect(x - 6, top + 22, 12, 8);
  ctx.fillStyle = "#C9A84C"; // gold helmet
  ctx.fillRect(x - 4, top + 15, 8, 8);
  ctx.fillStyle = "#7a0000"; // helmet visor
  ctx.fillRect(x - 4, top + 17, 8, 2);
  // "11" on the jersey
  ctx.fillStyle = "#ffffff";
  ctx.font = "bold 6px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("11", x, top + 26);
  ctx.textBaseline = "alphabetic";

  // Exhaust flames when moving
  if (moving && frame % 6 < 3) {
    ctx.fillStyle = "#FF7A18";
    ctx.fillRect(x - 5, top + CAR_H, 3, 4);
    ctx.fillRect(x + 2, top + CAR_H, 3, 4);
    ctx.fillStyle = "#FFD54A";
    ctx.fillRect(x - 4, top + CAR_H, 1, 2);
    ctx.fillRect(x + 3, top + CAR_H, 1, 2);
  }
}

function drawObstacle(ctx, o, frame) {
  const x = Math.round(o.x);
  const y = Math.round(o.y);

  if (o.type === "light") {
    // Pole
    ctx.fillStyle = "#555";
    ctx.fillRect(x + o.w / 2 - 2, y + 26, 4, o.h - 26);
    // Housing
    ctx.fillStyle = "#161616";
    ctx.fillRect(x, y, o.w, 28);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.strokeRect(x, y, o.w, 28);
    // Lamps
    const cx = x + o.w / 2;
    ctx.fillStyle = "#ff2b2b"; ctx.beginPath(); ctx.arc(cx, y + 6, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#ffd23b"; ctx.beginPath(); ctx.arc(cx, y + 14, 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = "#2ecc40"; ctx.beginPath(); ctx.arc(cx, y + 22, 3.4, 0, Math.PI * 2); ctx.fill();
    return;
  }

  if (o.type === "police") {
    // Body (white)
    ctx.fillStyle = "#eaeaea";
    ctx.fillRect(x, y, o.w, o.h);
    // Black trim / doors
    ctx.fillStyle = "#141414";
    ctx.fillRect(x, y + o.h / 2 - 7, o.w, 14);
    // Windshields
    ctx.fillStyle = "#2b3a55";
    ctx.fillRect(x + 4, y + 4, o.w - 8, 8);
    ctx.fillRect(x + 4, y + o.h - 12, o.w - 8, 8);
    // POLICE text
    ctx.fillStyle = "#141414";
    ctx.font = "bold 5px monospace";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("POLICE", x + o.w / 2, y + o.h / 2);
    ctx.textBaseline = "alphabetic";
    // Light bar (blinking red/blue)
    const blink = frame % 20 < 10;
    ctx.fillStyle = blink ? "#ff2b2b" : "#2b6bff";
    ctx.fillRect(x + 5, y + o.h / 2 - 3, 7, 6);
    ctx.fillStyle = blink ? "#2b6bff" : "#ff2b2b";
    ctx.fillRect(x + o.w - 12, y + o.h / 2 - 3, 7, 6);
    // Wheels
    ctx.fillStyle = "#0a0a0a";
    ctx.fillRect(x - 2, y + 6, 4, 9);
    ctx.fillRect(x + o.w - 2, y + 6, 4, 9);
    ctx.fillRect(x - 2, y + o.h - 15, 4, 9);
    ctx.fillRect(x + o.w - 2, y + o.h - 15, 4, 9);
    return;
  }

  // contract extension — a paper/document
  ctx.fillStyle = "rgba(0,0,0,0.2)";
  ctx.fillRect(x + 2, y + 2, o.w, o.h);
  ctx.fillStyle = "#f6f1df";
  ctx.fillRect(x, y, o.w, o.h);
  ctx.strokeStyle = "#b9ad84";
  ctx.lineWidth = 1;
  ctx.strokeRect(x, y, o.w, o.h);
  // Header
  ctx.fillStyle = "#AA0000";
  ctx.font = "bold 6px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText("CONTRACT", x + o.w / 2, y + 6);
  // Dollar / extension
  ctx.fillStyle = "#1f6b1f";
  ctx.font = "bold 8px monospace";
  ctx.fillText("+$$$", x + o.w / 2, y + o.h - 7);
  ctx.textBaseline = "alphabetic";
}

function drawHud(ctx, score) {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(8, 54, 84, 28);
  ctx.strokeStyle = "#C9A84C";
  ctx.lineWidth = 1;
  ctx.strokeRect(8, 54, 84, 28);
  ctx.fillStyle = "#9ca3af";
  ctx.font = "8px monospace";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText("DODGED", 14, 58);
  ctx.fillStyle = "#FFD54A";
  ctx.font = "bold 14px monospace";
  ctx.fillText(score, 14, 68);
  ctx.textBaseline = "alphabetic";
}

function spawnObstacle(speed) {
  const def = OBSTACLES[Math.floor(Math.random() * OBSTACLES.length)];
  const minX = ROAD_X + 4;
  const maxX = ROAD_X + ROAD_W - def.w - 4;
  return {
    type: def.type,
    w: def.w,
    h: def.h,
    x: minX + Math.random() * (maxX - minX),
    y: -def.h,
    vy: speed + Math.random() * 0.7,
    sway: def.type === "contract" ? (Math.random() - 0.5) * 1.4 : 0,
    baseX: 0,
    phase: Math.random() * Math.PI * 2,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function OldFaithful() {
  const canvasRef = useRef(null);
  const keysRef = useRef({});
  const gRef = useRef({
    phase: "idle",
    px: CW / 2,
    py: PY_MAX,
    obs: [],
    score: 0,
    frame: 0,
    roadOffset: 0,
    spawnRate: SPAWN_START,
    speed: SPEED_START,
    moving: false,
  });
  const rafRef = useRef(null);
  const [ui, setUi] = useState({
    phase: "idle",
    score: 0,
    hs: +(localStorage.getItem("of_hs") || 0),
  });

  const startGame = useCallback(() => {
    const g = gRef.current;
    Object.assign(g, {
      phase: "playing",
      px: CW / 2,
      py: PY_MAX,
      obs: [],
      score: 0,
      frame: 0,
      roadOffset: 0,
      spawnRate: SPAWN_START,
      speed: SPEED_START,
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
      g.roadOffset += 2.2;
      drawBg(ctx, g.roadOffset, g.frame++);
      const bob = Math.sin(Date.now() / 550) * 2;
      drawCar(ctx, g.px, PY_MAX + bob, false, g.frame);

      ctx.fillStyle = "rgba(0,0,0,0.64)";
      ctx.fillRect(CW / 2 - 122, CH / 2 - 36, 244, 72);
      ctx.strokeStyle = "#C9A84C";
      ctx.lineWidth = 2;
      ctx.strokeRect(CW / 2 - 122, CH / 2 - 36, 244, 72);
      ctx.fillStyle = "#C9A84C";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("OLD FAITHFUL 🏎️", CW / 2, CH / 2 - 12);
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
      drawBg(ctx, g.roadOffset, g.frame);
      for (const o of g.obs) drawObstacle(ctx, o, g.frame);
      drawCar(ctx, g.px, g.py, false, g.frame);
      drawHud(ctx, g.score);

      ctx.fillStyle = "rgba(0,0,0,0.7)";
      ctx.fillRect(CW / 2 - 112, CH / 2 - 40, 224, 80);
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 2;
      ctx.strokeRect(CW / 2 - 112, CH / 2 - 40, 224, 80);
      ctx.fillStyle = "#ef4444";
      ctx.font = "bold 16px monospace";
      ctx.textAlign = "center";
      ctx.fillText("CRASHED! 🚧", CW / 2, CH / 2 - 16);
      ctx.fillStyle = "#ffffff";
      ctx.font = "11px monospace";
      ctx.fillText(`Dodged: ${g.score}`, CW / 2, CH / 2 + 4);
      const hs = +(localStorage.getItem("of_hs") || 0);
      if (g.score > 0 && g.score >= hs) {
        ctx.fillStyle = "#FFD54A";
        ctx.font = "bold 10px monospace";
        ctx.fillText("🏆 NEW BEST!", CW / 2, CH / 2 + 20);
      } else {
        ctx.fillStyle = "#9ca3af";
        ctx.font = "9px monospace";
        ctx.fillText(`Best: ${hs}`, CW / 2, CH / 2 + 20);
      }
      ctx.fillStyle = "#a5b4fc";
      ctx.font = "9px monospace";
      ctx.fillText("Press SPACE or click to retry", CW / 2, CH / 2 + 34);

      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    // ── Playing ──
    g.frame++;
    g.roadOffset += g.speed;
    const keys = keysRef.current;

    let moved = false;
    if ((keys["ArrowLeft"]  || keys["a"] || keys["A"]) && g.px - CAR_W / 2 > ROAD_X - 4)            { g.px -= PLAYER_SPEED; moved = true; }
    if ((keys["ArrowRight"] || keys["d"] || keys["D"]) && g.px + CAR_W / 2 < ROAD_X + ROAD_W + 4)   { g.px += PLAYER_SPEED; moved = true; }
    if ((keys["ArrowUp"]    || keys["w"] || keys["W"]) && g.py > PY_MIN)                             { g.py -= PLAYER_SPEED; moved = true; }
    if ((keys["ArrowDown"]  || keys["s"] || keys["S"]) && g.py < PY_MAX)                             { g.py += PLAYER_SPEED; moved = true; }
    g.moving = moved;

    // Spawn
    if (g.frame % Math.round(g.spawnRate) === 0) {
      g.obs.push(spawnObstacle(g.speed));
      if (g.spawnRate > 32) g.spawnRate -= 0.7;
      if (g.speed < 6.5) g.speed += 0.04;
    }

    // Update + collision (AABB with a small fairness margin)
    let hit = false;
    const alive = [];
    const carL = g.px - CAR_W / 2 + 3;
    const carR = g.px + CAR_W / 2 - 3;
    const carT = g.py - CAR_H / 2 + 3;
    const carB = g.py + CAR_H / 2 - 3;
    for (const o of g.obs) {
      o.y += o.vy;
      if (o.sway) o.x += Math.sin((g.frame + o.phase * 30) / 22) * o.sway;

      if (
        carL < o.x + o.w - 3 &&
        carR > o.x + 3 &&
        carT < o.y + o.h - 3 &&
        carB > o.y + 3
      ) { hit = true; break; }

      if (o.y < CH + o.h) {
        alive.push(o);
      } else {
        g.score++;
        setUi(u => ({ ...u, score: g.score }));
      }
    }
    g.obs = alive;

    if (hit) {
      g.phase = "dead";
      const prev = +(localStorage.getItem("of_hs") || 0);
      const hs = Math.max(g.score, prev);
      localStorage.setItem("of_hs", hs);
      setUi(u => ({ ...u, phase: "dead", hs }));
      rafRef.current = requestAnimationFrame(loop);
      return;
    }

    // Draw
    drawBg(ctx, g.roadOffset, g.frame);
    for (const o of g.obs) drawObstacle(ctx, o, g.frame);
    drawCar(ctx, g.px, g.py, g.moving, g.frame);
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
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) e.preventDefault();
      if (e.code === "Space") {
        e.preventDefault();
        const g = gRef.current;
        if (g.phase === "idle" || g.phase === "dead") startGame();
      }
    };
    const up = e => { keysRef.current[e.key] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
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
          Old Faithful 🏎️
        </h1>
        <p style={{ color: "#9ca3af", fontFamily: "monospace", fontSize: 12, margin: 0 }}>
          Dodge traffic, cops and contract extensions at Levi's Stadium
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
