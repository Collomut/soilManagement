import fs from 'fs';
import path from 'path';

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <title>ZERTHIVA // BENEATH THE LIVING EARTH · Interactive 3D Soil Intelligence</title>
  <meta name="description" content="Cinematic, high-fidelity real-time 3D soil intelligence visualization. Detailed maize plant anatomy, geological soil cutaway, root-zone electrochemical sensing, and autonomous agronomic simulation.">

  <!-- Typography -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Space+Grotesk:wght@300;400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <!-- Libraries: Three.js (r128), OrbitControls, GLTFLoader, RGBELoader, GSAP 3.12, Lucide Icons -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/GLTFLoader.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/RGBELoader.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
  <script src="https://unpkg.com/lucide@latest"></script>

  <style>
    :root {
      --bg-deep: #030705;
      --bg-panel: rgba(5, 12, 8, 0.78);
      --bg-panel-elevated: rgba(8, 18, 13, 0.94);
      --border-subtle: rgba(255, 255, 255, 0.08);
      --border-accent: rgba(0, 255, 135, 0.35);
      
      --text-main: #f5fdf9;
      --text-muted: #8ca396;
      --text-dim: #50665b;

      --accent-emerald: #00ff87;
      --accent-cyan: #00e5ff;
      --accent-amber: #ffb703;
      --accent-crimson: #ff2a5f;

      --font-display: 'Space Grotesk', -apple-system, sans-serif;
      --font-sans: 'Plus Jakarta Sans', sans-serif;
      --font-mono: 'Space Mono', monospace;
    }

    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      user-select: none;
      -webkit-user-select: none;
    }

    body {
      background-color: var(--bg-deep);
      color: var(--text-main);
      font-family: var(--font-sans);
      overflow: hidden;
      width: 100vw;
      height: 100vh;
      position: relative;
    }

    #webgl-canvas {
      position: absolute;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 1;
    }

    /* Cinematic Film Vignette & Subtle Fog Gradient */
    .film-vignette {
      position: absolute;
      inset: 0;
      pointer-events: none;
      z-index: 2;
      background: radial-gradient(circle at 50% 45%, transparent 55%, rgba(2, 5, 3, 0.85) 100%);
    }

    /* Initial Loading Screen */
    .loading-screen {
      position: absolute;
      inset: 0;
      background: #030705;
      z-index: 200;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 18px;
      transition: opacity 0.8s ease, visibility 0.8s ease;
    }
    .loading-screen.hidden {
      opacity: 0;
      visibility: hidden;
      pointer-events: none;
    }
    .loading-title {
      font-family: var(--font-display);
      font-size: 1.1rem;
      font-weight: 700;
      letter-spacing: 0.12em;
      color: #fff;
      text-transform: uppercase;
    }
    .loading-sub {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      color: var(--accent-emerald);
      letter-spacing: 0.08em;
    }
    .loading-bar-wrap {
      width: 260px;
      height: 3px;
      background: rgba(255,255,255,0.1);
      border-radius: 999px;
      overflow: hidden;
    }
    .loading-bar-fill {
      height: 100%;
      width: 0%;
      background: var(--accent-emerald);
      box-shadow: 0 0 12px var(--accent-emerald);
      transition: width 0.3s ease;
    }

    /* Top Minimalist Header */
    header.experience-header {
      position: absolute;
      top: 24px;
      left: 32px;
      right: 32px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 30;
      pointer-events: none;
    }

    .brand-pill {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 12px;
      background: var(--bg-panel);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border-subtle);
      padding: 8px 18px;
      border-radius: 999px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.4);
    }

    .brand-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 12px var(--accent-emerald);
      animation: pulseDot 2.4s infinite;
    }

    @keyframes pulseDot {
      0%, 100% { transform: scale(0.9); opacity: 0.6; }
      50% { transform: scale(1.3); opacity: 1; box-shadow: 0 0 18px var(--accent-emerald); }
    }

    .brand-title {
      font-family: var(--font-display);
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: -0.01em;
      color: #fff;
    }

    .brand-sub {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-muted);
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding-left: 8px;
      border-left: 1px solid rgba(255,255,255,0.12);
    }

    .header-actions {
      pointer-events: auto;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .btn-pill {
      background: var(--bg-panel);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      border: 1px solid var(--border-subtle);
      color: var(--text-main);
      padding: 8px 16px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 0.72rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      text-transform: uppercase;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .btn-pill:hover {
      background: rgba(255, 255, 255, 0.12);
      border-color: rgba(255, 255, 255, 0.25);
      transform: translateY(-2px);
      color: #fff;
    }

    .btn-pill.btn-signature {
      background: linear-gradient(135deg, rgba(0, 255, 135, 0.2), rgba(0, 229, 255, 0.2));
      border-color: var(--accent-emerald);
      color: #fff;
      font-weight: 700;
    }

    .btn-pill.btn-signature:hover {
      box-shadow: 0 0 25px rgba(0, 255, 135, 0.4);
      transform: translateY(-2px) scale(1.02);
    }

    /* Left Minimalist Contextual Card */
    aside.contextual-dock {
      position: absolute;
      top: 96px;
      left: 32px;
      width: 340px;
      max-height: calc(100vh - 190px);
      background: var(--bg-panel);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-subtle);
      border-radius: 18px;
      padding: 20px;
      z-index: 20;
      display: flex;
      flex-direction: column;
      gap: 14px;
      box-shadow: 0 20px 50px rgba(0,0,0,0.5);
      overflow-y: auto;
      scrollbar-width: thin;
      scrollbar-color: var(--accent-emerald) transparent;
      transition: transform 0.4s ease, opacity 0.4s ease;
    }

    .chapter-tag-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 8px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }

    .chapter-tag {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.12em;
      color: var(--accent-emerald);
      text-transform: uppercase;
    }

    .badge-evidence {
      font-family: var(--font-mono);
      font-size: 0.58rem;
      font-weight: 700;
      padding: 2px 6px;
      border-radius: 4px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      background: rgba(0, 255, 135, 0.12);
      color: var(--accent-emerald);
      border: 1px solid rgba(0, 255, 135, 0.25);
    }

    .chapter-headline {
      font-family: var(--font-display);
      font-size: 1.25rem;
      font-weight: 700;
      color: #fff;
      line-height: 1.25;
      letter-spacing: -0.02em;
    }

    .chapter-paragraph {
      font-size: 0.8rem;
      line-height: 1.55;
      color: var(--text-muted);
    }

    /* Contextual Action Module */
    .module-controls {
      display: flex;
      flex-direction: column;
      gap: 8px;
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 10px;
      padding: 10px 12px;
    }

    .module-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .module-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--text-muted);
      text-transform: uppercase;
    }

    .range-slider {
      width: 140px;
      height: 4px;
      accent-color: var(--accent-emerald);
      cursor: pointer;
    }

    .btn-action-small {
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      padding: 6px 12px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 6px;
      transition: all 0.2s;
    }
    .btn-action-small:hover {
      background: rgba(0, 255, 135, 0.15);
      border-color: var(--accent-emerald);
    }

    /* Live Telemetry Cells */
    .tele-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .tele-box {
      background: rgba(0,0,0,0.3);
      border: 1px solid rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 8px 10px;
    }

    .tele-box-title {
      font-family: var(--font-mono);
      font-size: 0.58rem;
      color: var(--text-dim);
      margin-bottom: 2px;
      display: flex;
      justify-content: space-between;
    }
    .tele-box-badge {
      font-size: 0.52rem;
      color: var(--accent-cyan);
      opacity: 0.8;
    }

    .tele-box-val {
      font-family: var(--font-display);
      font-size: 1.15rem;
      font-weight: 700;
      color: #fff;
    }

    /* Floating Visibility Toolbar */
    .visibility-toolbar {
      position: absolute;
      bottom: 80px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-panel);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      padding: 5px 14px;
      z-index: 28;
      display: flex;
      align-items: center;
      gap: 6px;
      box-shadow: 0 14px 40px rgba(0,0,0,0.5);
    }
    .vis-toggle {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: var(--text-muted);
      padding: 4px 10px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 0.62rem;
      letter-spacing: 0.04em;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 5px;
      transition: all 0.2s;
    }
    .vis-toggle:hover {
      background: rgba(255, 255, 255, 0.12);
      color: #fff;
    }
    .vis-toggle.active {
      background: rgba(0, 255, 135, 0.16);
      border-color: var(--accent-emerald);
      color: #fff;
      font-weight: 700;
    }

    /* Interactive 3D Component Inspector Card */
    .component-inspector-card {
      position: absolute;
      bottom: 136px;
      right: 32px;
      width: 320px;
      background: var(--bg-panel-elevated);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-accent);
      border-radius: 16px;
      padding: 16px 18px;
      z-index: 35;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      display: none;
      animation: fadeInCard 0.25s ease;
    }
    @keyframes fadeInCard {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .card-close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
      font-size: 0.8rem;
    }

    /* Right Chapter Rail (10 Guided Narrative Nodes) */
    aside.chapter-rail {
      position: absolute;
      top: 50%;
      right: 32px;
      transform: translateY(-50%);
      display: flex;
      flex-direction: column;
      gap: 8px;
      z-index: 25;
    }

    .chapter-node {
      display: flex;
      align-items: center;
      gap: 12px;
      cursor: pointer;
      opacity: 0.4;
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
      padding: 4px 0;
    }

    .chapter-node:hover, .chapter-node.active {
      opacity: 1;
      transform: translateX(-4px);
    }

    .chapter-bullet {
      width: 22px;
      height: 22px;
      border-radius: 50%;
      background: rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.2);
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-mono);
      font-size: 0.58rem;
      color: var(--text-muted);
      transition: all 0.25s;
    }

    .chapter-node.active .chapter-bullet {
      background: var(--accent-emerald);
      border-color: var(--accent-emerald);
      color: #000;
      font-weight: 700;
      box-shadow: 0 0 14px var(--accent-emerald);
    }

    .chapter-name {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--text-muted);
      white-space: nowrap;
    }

    .chapter-node.active .chapter-name {
      color: #fff;
      font-weight: 600;
    }

    /* Bottom Playback & Chapter Navigation */
    .timeline-dock {
      position: absolute;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: var(--bg-panel);
      backdrop-filter: blur(28px);
      -webkit-backdrop-filter: blur(28px);
      border: 1px solid var(--border-subtle);
      border-radius: 999px;
      padding: 8px 18px;
      z-index: 30;
      box-shadow: 0 20px 50px rgba(0,0,0,0.6);
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .nav-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.06);
      border: 1px solid rgba(255, 255, 255, 0.1);
      color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }

    .nav-btn:hover {
      background: rgba(0, 255, 135, 0.2);
      border-color: var(--accent-emerald);
    }

    .timeline-bar {
      width: 200px;
      height: 4px;
      background: rgba(255,255,255,0.1);
      border-radius: 999px;
      position: relative;
      overflow: hidden;
    }

    .timeline-fill {
      height: 100%;
      width: 10%;
      background: var(--accent-emerald);
      border-radius: 999px;
      transition: width 0.3s;
    }

    .timeline-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      color: var(--accent-emerald);
      text-transform: uppercase;
      font-weight: 700;
    }

    /* Skip Opening Sequence Pill */
    .skip-btn {
      position: absolute;
      top: 24px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(0, 0, 0, 0.7);
      backdrop-filter: blur(16px);
      border: 1px solid var(--border-accent);
      color: #fff;
      padding: 6px 14px;
      border-radius: 999px;
      font-family: var(--font-mono);
      font-size: 0.65rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      z-index: 40;
      display: none;
      transition: all 0.2s;
    }
    .skip-btn:hover {
      background: rgba(0, 255, 135, 0.2);
      box-shadow: 0 0 15px rgba(0, 255, 135, 0.3);
    }

    /* Spatial Screen-Projected Pins */
    .spatial-pin {
      position: absolute;
      transform: translate(-50%, -50%);
      pointer-events: auto;
      cursor: pointer;
      z-index: 15;
      display: flex;
      align-items: center;
      gap: 8px;
      background: rgba(6, 14, 10, 0.85);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(255,255,255,0.15);
      padding: 5px 12px;
      border-radius: 999px;
      transition: all 0.2s;
    }

    .spatial-pin:hover {
      border-color: var(--accent-emerald);
      transform: translate(-50%, -50%) scale(1.1);
      box-shadow: 0 0 20px rgba(0, 255, 135, 0.4);
    }

    .pin-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 8px var(--accent-emerald);
    }

    .pin-text {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: #fff;
      letter-spacing: 0.06em;
      text-transform: uppercase;
    }

    /* Modal Dossier */
    .inspector-modal {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%) scale(0.9);
      background: var(--bg-panel-elevated);
      backdrop-filter: blur(36px);
      -webkit-backdrop-filter: blur(36px);
      border: 1px solid var(--border-accent);
      border-radius: 20px;
      padding: 28px;
      width: 520px;
      max-width: 90vw;
      max-height: 85vh;
      overflow-y: auto;
      z-index: 100;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      box-shadow: 0 35px 80px rgba(0,0,0,0.85);
    }

    .inspector-modal.active {
      opacity: 1;
      pointer-events: auto;
      transform: translate(-50%, -50%) scale(1);
    }

    .modal-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: none;
      border: none;
      color: var(--text-muted);
      cursor: pointer;
    }

    /* Responsive */
    @media (max-width: 1080px) {
      aside.contextual-dock {
        width: 300px;
      }
      aside.chapter-rail {
        display: none;
      }
      .timeline-dock {
        width: 92vw;
        justify-content: space-between;
      }
      .visibility-toolbar {
        bottom: 84px;
        flex-wrap: wrap;
        width: 92vw;
        justify-content: center;
      }
    }
  </style>
</head>
<body>

  <!-- WebGL Render Canvas -->
  <div id="webgl-canvas"></div>
  <div class="film-vignette"></div>

  <!-- Initial Loading Screen -->
  <div class="loading-screen" id="loading-screen">
    <div class="brand-dot" style="width:16px; height:16px;"></div>
    <div class="loading-title">ZERTHIVA // SIS 3D</div>
    <div class="loading-sub" id="loading-status-text">INITIALIZING BOTANICAL ENGINE & PBR STRATA...</div>
    <div class="loading-bar-wrap">
      <div class="loading-bar-fill" id="loading-progress-bar"></div>
    </div>
  </div>

  <!-- Skip Opening Button -->
  <button class="skip-btn" id="btn-skip-intro">
    <i data-lucide="fast-forward" style="width:12px; height:12px; display:inline-block; vertical-align:middle; margin-right:4px;"></i> Skip Intro
  </button>

  <!-- Top Header Navigation -->
  <header class="experience-header">
    <div class="brand-pill">
      <div class="brand-dot"></div>
      <span class="brand-title">ZERTHIVA</span>
      <span class="brand-sub">SOIL INTELLIGENCE SYSTEM</span>
    </div>

    <div class="header-actions">
      <!-- Signature Continuous Cutaway Sequence Trigger -->
      <button class="btn-pill btn-signature" id="btn-signature-reveal" title="Trigger 12-stage signature cinematic cutaway">
        <i data-lucide="sparkles" style="width: 13px; height: 13px;"></i> Reveal Hidden System
      </button>

      <!-- Reset View -->
      <button class="btn-pill" id="btn-reset-view" title="Reset camera to default hero composition">
        <i data-lucide="rotate-ccw" style="width: 13px; height: 13px;"></i> Reset View
      </button>

      <!-- Audio Synthesizer -->
      <button class="btn-pill" id="btn-toggle-audio" title="Mute/unmute ambient audio">
        <i data-lucide="volume-2" id="icon-audio" style="width: 13px; height: 13px;"></i> Audio
      </button>

      <!-- Master Technical Dossier Link -->
      <a href="./index.html" class="btn-pill" target="_blank" title="Open master 58-section dossier">
        <i data-lucide="file-text" style="width: 13px; height: 13px;"></i> Master Specs
      </a>

      <!-- 3D Assets & Scientific Citations -->
      <button class="btn-pill" id="btn-open-citations" title="View 3D asset licenses, PBR textures, and scientific citations">
        <i data-lucide="info" style="width: 13px; height: 13px;"></i> Citations
      </button>
    </div>
  </header>

  <!-- Left Contextual Narrative & Telemetry Panel -->
  <aside class="contextual-dock" id="narrative-panel">
    <div class="chapter-tag-row">
      <span class="chapter-tag" id="label-chapter-tag">CHAPTER 01 // SURFACE</span>
      <span class="badge-evidence" id="badge-evidence-type">IMPLEMENTED</span>
    </div>

    <h2 class="chapter-headline" id="text-chapter-title">The Living Surface</h2>
    <p class="chapter-paragraph" id="text-chapter-desc">
      What happens above the soil begins beneath it. A mature maize plant (<em>Zea mays</em>) flourishes under ambient daylight. As we descend, the opaque ground opens into an explorable subterranean ecosystem.
    </p>

    <!-- Contextual Chapter Controls (Dynamically switched per chapter) -->
    <div class="module-controls" id="contextual-controls">
      <!-- Injected per chapter -->
    </div>

    <!-- Live Telemetry Stream Grid -->
    <div class="tele-grid">
      <div class="tele-box">
        <div class="tele-box-title">BULK EC₂₅ <span class="tele-box-badge">[MEASURED]</span></div>
        <div class="tele-box-val" id="val-ec">1.42</div>
      </div>

      <div class="tele-box">
        <div class="tele-box-title">MOISTURE θ <span class="tele-box-badge">[MEASURED]</span></div>
        <div class="tele-box-val" id="val-moist">31.8</div>
      </div>

      <div class="tele-box">
        <div class="tele-box-title">SOIL TEMP <span class="tele-box-badge">[MEASURED]</span></div>
        <div class="tele-box-val" id="val-temp">24.6</div>
      </div>

      <div class="tele-box">
        <div class="tele-box-title">MAAS-HOFFMAN <span class="tele-box-badge">[SIMULATED]</span></div>
        <div class="tele-box-val" id="val-penalty" style="color: var(--accent-emerald);">0.0% LOSS</div>
      </div>
    </div>
  </aside>

  <!-- Floating Layer Visibility Toolbar -->
  <div class="visibility-toolbar">
    <button class="vis-toggle active" id="tog-canopy" title="Toggle Above-Ground Plant Canopy"><i data-lucide="leaf" style="width:12px; height:12px;"></i> Canopy</button>
    <button class="vis-toggle active" id="tog-roots" title="Toggle Subsurface Root Architecture"><i data-lucide="git-branch" style="width:12px; height:12px;"></i> Roots</button>
    <button class="vis-toggle active" id="tog-soil" title="Toggle Geological Soil Strata"><i data-lucide="layers" style="width:12px; height:12px;"></i> Soil Strata</button>
    <button class="vis-toggle active" id="tog-hw" title="Toggle Hardware & Sensors"><i data-lucide="cpu" style="width:12px; height:12px;"></i> Hardware</button>
    <button class="vis-toggle active" id="tog-hydro" title="Toggle Hydrologic Flow Lines"><i data-lucide="droplet" style="width:12px; height:12px;"></i> Hydrology</button>
  </div>

  <!-- Interactive 3D Raycast Component Inspector Card -->
  <div class="component-inspector-card" id="component-card">
    <button class="card-close-btn" id="btn-close-card">&times;</button>
    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
      <span id="card-tag" style="font-family:var(--font-mono); font-size:0.6rem; color:var(--accent-emerald); text-transform:uppercase;">COMPONENT</span>
      <span id="card-badge" class="badge-evidence">MEASURED</span>
    </div>
    <h4 id="card-title" style="font-family:var(--font-display); font-size:1.05rem; font-weight:700; color:#fff; margin-bottom:6px;">Component Title</h4>
    <p id="card-desc" style="font-size:0.75rem; line-height:1.5; color:var(--text-muted); margin-bottom:10px;">Description text.</p>
    <div id="card-meta" style="background:rgba(0,0,0,0.35); padding:8px 10px; border-radius:6px; font-family:var(--font-mono); font-size:0.65rem; color:var(--accent-cyan); margin-bottom:10px;">
      Details / Formulas
    </div>
    <button class="btn-action-small" id="btn-focus-component" style="width:100%; justify-content:center;">
      <i data-lucide="crosshair" style="width:12px; height:12px;"></i> Frame Camera on Component
    </button>
  </div>

  <!-- Right Chapter Navigation Rail (10 Interactive Story Chapters) -->
  <aside class="chapter-rail">
    <div class="chapter-node active" data-chapter="0">
      <div class="chapter-bullet">01</div>
      <div class="chapter-name">The Living Surface</div>
    </div>
    <div class="chapter-node" data-chapter="1">
      <div class="chapter-bullet">02</div>
      <div class="chapter-name">Descent Into Soil</div>
    </div>
    <div class="chapter-node" data-chapter="2">
      <div class="chapter-bullet">03</div>
      <div class="chapter-name">Plant Dissection</div>
    </div>
    <div class="chapter-node" data-chapter="3">
      <div class="chapter-bullet">04</div>
      <div class="chapter-name">Hidden Water World</div>
    </div>
    <div class="chapter-node" data-chapter="4">
      <div class="chapter-bullet">05</div>
      <div class="chapter-name">Nutrient Chemistry</div>
    </div>
    <div class="chapter-node" data-chapter="5">
      <div class="chapter-bullet">06</div>
      <div class="chapter-name">The Sensor Reveal</div>
    </div>
    <div class="chapter-node" data-chapter="6">
      <div class="chapter-bullet">07</div>
      <div class="chapter-name">Hardware Explosion</div>
    </div>
    <div class="chapter-node" data-chapter="7">
      <div class="chapter-bullet">08</div>
      <div class="chapter-name">Monitoring Sequence</div>
    </div>
    <div class="chapter-node" data-chapter="8">
      <div class="chapter-bullet">09</div>
      <div class="chapter-name">Decision Engine</div>
    </div>
    <div class="chapter-node" data-chapter="9">
      <div class="chapter-bullet">10</div>
      <div class="chapter-name">Experimental Lab</div>
    </div>
  </aside>

  <!-- Bottom Timeline & Storyboard Controls -->
  <div class="timeline-dock">
    <button class="nav-btn" id="btn-prev-chapter" title="Previous chapter"><i data-lucide="chevron-left" style="width: 16px; height: 16px;"></i></button>
    <button class="nav-btn" id="btn-play-tour" title="Play / pause autonomous narrative tour"><i data-lucide="play" id="icon-play-tour" style="width: 16px; height: 16px;"></i></button>
    <button class="nav-btn" id="btn-next-chapter" title="Next chapter"><i data-lucide="chevron-right" style="width: 16px; height: 16px;"></i></button>

    <div class="timeline-bar">
      <div class="timeline-fill" id="timeline-progress-fill"></div>
    </div>

    <span class="timeline-label" id="label-playback-status">CHAPTER 01 OF 10</span>
  </div>

  <!-- Screen-Projected Spatial Hotspots -->
  <div id="hotspot-probe" class="spatial-pin" style="display: none;">
    <div class="pin-dot"></div>
    <span class="pin-text">EC & Dielectric Probe [15-25cm]</span>
  </div>

  <div id="hotspot-node" class="spatial-pin" style="display: none;">
    <div class="pin-dot" style="background: var(--accent-cyan);"></div>
    <span class="pin-text">ESP32 Edge Gateway & Solar Cap</span>
  </div>

  <!-- Deep Inspector Modal -->
  <div class="inspector-modal" id="inspector-modal">
    <button class="modal-close" id="btn-close-modal"><i data-lucide="x"></i></button>
    <div id="modal-body-content"></div>
  </div>

  <!-- Main Three.js Application Logic -->
  <script>
    lucide.createIcons();

    /* =========================================================================
       1. SYNTHESIZED AUDIO DESIGN (Web Audio API - 100% Self-Contained)
       ========================================================================= */
    class SoilAudioSynthesizer {
      constructor() {
        this.ctx = null;
        this.enabled = true;
        this.ambientGain = null;
      }

      init() {
        if (this.ctx) return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.ctx = new AudioContext();

        // Subterranean resonant brownian noise drone (55 Hz earth fundamental)
        const bufferSize = this.ctx.sampleRate * 2;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let lastOut = 0.0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          output[i] = (lastOut + 0.02 * white) / 1.02;
          lastOut = output[i];
          output[i] *= 3.5;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = this.ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(65, this.ctx.currentTime);

        this.ambientGain = this.ctx.createGain();
        this.ambientGain.gain.setValueAtTime(0.035, this.ctx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(this.ambientGain);
        this.ambientGain.connect(this.ctx.destination);
        whiteNoise.start();
      }

      playPing(freq = 660) {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(freq * 0.5, this.ctx.currentTime + 0.18);
        gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.18);
      }

      playWaterInfiltration() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        for (let i = 0; i < 5; i++) {
          setTimeout(() => {
            if (!this.ctx) return;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'sine';
            const f = 400 + Math.random() * 400;
            osc.frequency.setValueAtTime(f, this.ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(f * 1.4, this.ctx.currentTime + 0.08);
            gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start();
            osc.stop(this.ctx.currentTime + 0.08);
          }, i * 65);
        }
      }

      playWarning() {
        if (!this.enabled) return;
        this.init();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, this.ctx.currentTime);
        osc.frequency.setValueAtTime(240, this.ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.35);
      }
    }

    const sound = new SoilAudioSynthesizer();

    document.getElementById('btn-toggle-audio').addEventListener('click', () => {
      sound.enabled = !sound.enabled;
      const icon = document.getElementById('icon-audio');
      if (sound.enabled) {
        sound.init();
        if (sound.ambientGain) sound.ambientGain.gain.setValueAtTime(0.035, sound.ctx.currentTime);
        icon.setAttribute('data-lucide', 'volume-2');
        sound.playPing(880);
      } else {
        if (sound.ambientGain) sound.ambientGain.gain.setValueAtTime(0, sound.ctx.currentTime);
        icon.setAttribute('data-lucide', 'volume-x');
      }
      lucide.createIcons();
    });

    /* =========================================================================
       2. ASSET LOADING & PROGRESS MANAGER
       ========================================================================= */
    let loadedAssets = 0;
    const totalAssets = 7;
    function updateLoadingProgress(stepName) {
      loadedAssets++;
      const pct = Math.min(100, Math.round((loadedAssets / totalAssets) * 100));
      const bar = document.getElementById('loading-progress-bar');
      const text = document.getElementById('loading-status-text');
      if (bar) bar.style.width = pct + '%';
      if (text) text.innerText = \`LOADING \${stepName} (\${pct}%)...\`;
      if (loadedAssets >= totalAssets) {
        setTimeout(() => {
          const screen = document.getElementById('loading-screen');
          if (screen) screen.classList.add('hidden');
        }, 500);
      }
    }

    const texLoader = new THREE.TextureLoader();

    function setupPBRTexture(url, rx = 2.0, ry = 2.0, name = 'Texture') {
      return texLoader.load(url, () => updateLoadingProgress(name), undefined, (err) => {
        console.warn('Fallback active for:', url);
        updateLoadingProgress(name);
      });
    }

    // Poly Haven CC0 1K PBR Textures
    const texDirtDiff  = setupPBRTexture('assets/textures/soil/dirt_diff_1k.jpg', 2.0, 2.0, 'Topsoil Diffuse');
    texDirtDiff.wrapS = texDirtDiff.wrapT = THREE.RepeatWrapping;
    const texDirtNor   = setupPBRTexture('assets/textures/soil/dirt_nor_1k.jpg', 2.0, 2.0, 'Topsoil Normal');
    texDirtNor.wrapS = texDirtNor.wrapT = THREE.RepeatWrapping;
    const texDirtRough = setupPBRTexture('assets/textures/soil/dirt_rough_1k.jpg', 2.0, 2.0, 'Topsoil Roughness');
    texDirtRough.wrapS = texDirtRough.wrapT = THREE.RepeatWrapping;

    const texMudDiff   = setupPBRTexture('assets/textures/soil/brown_mud_02_diff_1k.jpg', 2.5, 2.5, 'Subsoil Diffuse');
    texMudDiff.wrapS = texMudDiff.wrapT = THREE.RepeatWrapping;
    const texMudNor    = setupPBRTexture('assets/textures/soil/brown_mud_02_nor_1k.jpg', 2.5, 2.5, 'Subsoil Normal');
    texMudNor.wrapS = texMudNor.wrapT = THREE.RepeatWrapping;
    const texMudRough  = setupPBRTexture('assets/textures/soil/brown_mud_02_rough_1k.jpg', 2.5, 2.5, 'Subsoil Roughness');
    texMudRough.wrapS = texMudRough.wrapT = THREE.RepeatWrapping;

    // Procedural Monocot Maize Leaf Texture with parallel venation & central midrib
    function generateMaizeLeafTexture() {
      const c = document.createElement('canvas');
      c.width = 512;
      c.height = 1024;
      const ctx = c.getContext('2d');

      ctx.fillStyle = '#2c8f38';
      ctx.fillRect(0, 0, 512, 1024);

      const lenGrad = ctx.createLinearGradient(0, 0, 0, 1024);
      lenGrad.addColorStop(0, 'rgba(56, 155, 65, 0.45)');
      lenGrad.addColorStop(0.5, 'rgba(38, 130, 48, 0.15)');
      lenGrad.addColorStop(1.0, 'rgba(28, 105, 36, 0.55)');
      ctx.fillStyle = lenGrad;
      ctx.fillRect(0, 0, 512, 1024);

      // Fine parallel monocot venation lines
      ctx.lineWidth = 1;
      for (let x = 0; x < 512; x += 3) {
        const isMajor = (x % 18 === 0);
        ctx.strokeStyle = isMajor ? 'rgba(85, 205, 95, 0.32)' : 'rgba(20, 80, 28, 0.22)';
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 1024);
        ctx.stroke();
      }

      // Pale luminous midrib along the center (x = 256)
      const midrib = ctx.createLinearGradient(236, 0, 276, 0);
      midrib.addColorStop(0, 'rgba(85, 205, 95, 0)');
      midrib.addColorStop(0.3, 'rgba(155, 225, 140, 0.8)');
      midrib.addColorStop(0.5, 'rgba(195, 245, 175, 0.95)');
      midrib.addColorStop(0.7, 'rgba(155, 225, 140, 0.8)');
      midrib.addColorStop(1, 'rgba(85, 205, 95, 0)');
      ctx.fillStyle = midrib;
      ctx.fillRect(236, 0, 40, 1024);

      const t = new THREE.CanvasTexture(c);
      t.wrapS = THREE.ClampToEdgeWrapping;
      t.wrapT = THREE.ClampToEdgeWrapping;
      return t;
    }

    const leafTexture = generateMaizeLeafTexture();

    /* =========================================================================
       3. THREE.JS SCENE SETUP & PROFESSIONAL LIGHTING PIPELINE
       ========================================================================= */
    const container = document.getElementById('webgl-canvas');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x030705);
    scene.fog = new THREE.FogExp2(0x030705, 0.038);

    const camera = new THREE.PerspectiveCamera(42, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(3.4, 0.6, 5.6);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Poly Haven CC0 HDRI Environment Map via RGBELoader + PMREMGenerator
    const pmremGen = new THREE.PMREMGenerator(renderer);
    pmremGen.compileEquirectangularShader();
    new THREE.RGBELoader()
      .setDataType(THREE.UnsignedByteType)
      .load('assets/hdr/autumn_field_1k.hdr', (texture) => {
        const envMap = pmremGen.fromEquirectangular(texture).texture;
        scene.environment = envMap;
        texture.dispose();
        pmremGen.dispose();
        updateLoadingProgress('Outdoor HDRI');
      }, undefined, (err) => {
        console.warn('HDRI environment fallback:', err);
        updateLoadingProgress('Outdoor HDRI (Fallback)');
      });

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.maxPolarAngle = Math.PI / 2 + 0.15;
    controls.minDistance = 1.8;
    controls.maxDistance = 14.0;
    controls.target.set(0, -0.15, 0);

    // Controlled 4-Point Cinematic Lighting Setup
    // 1. Soft Warm Key Sunlight from above
    const keySunLight = new THREE.DirectionalLight(0xfff5e6, 2.6);
    keySunLight.position.set(6, 12, 5.5);
    keySunLight.castShadow = true;
    keySunLight.shadow.mapSize.width = 2048;
    keySunLight.shadow.mapSize.height = 2048;
    keySunLight.shadow.camera.near = 0.5;
    keySunLight.shadow.camera.far = 28;
    keySunLight.shadow.camera.left = -4.5;
    keySunLight.shadow.camera.right = 4.5;
    keySunLight.shadow.camera.top = 4.5;
    keySunLight.shadow.camera.bottom = -4.5;
    keySunLight.shadow.bias = -0.0003;
    scene.add(keySunLight);

    // 2. Cool Sky Fill Light from opposite angle
    const skyFillLight = new THREE.DirectionalLight(0x8bc3ea, 0.85);
    skyFillLight.position.set(-5, 6, -3);
    scene.add(skyFillLight);

    // 3. Subterranean Earthen Bounce Light (illuminates root cavities & cutaway)
    const earthenBounce = new THREE.DirectionalLight(0x5c4028, 0.75);
    earthenBounce.position.set(0, -6, 2);
    scene.add(earthenBounce);

    // 4. Subtle Foliage Rim Light (separates foliage from deep dark backdrop)
    const rimLight = new THREE.DirectionalLight(0x80ffb0, 0.5);
    rimLight.position.set(-6, 2, -6);
    scene.add(rimLight);

    const ambientLight = new THREE.AmbientLight(0xdcf0e5, 0.45);
    scene.add(ambientLight);

    /* =========================================================================
       4. SCULPTED GEOLOGICAL SOIL CUTAWAY & STRATA HORIZONS
       ========================================================================= */
    const geologyGroup = new THREE.Group();
    scene.add(geologyGroup);

    const blockW = 3.6;
    const blockD = 3.6;

    // Helper to sculpt organic fracture relief on cutaway faces
    function sculptSoilFace(geo, height, isTop = false) {
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const z = pos.getZ(i);

        // Displace the front cutaway face (z near front boundary)
        if (z > (blockD / 2) - 0.1) {
          const fracture = Math.sin(x * 5.2 + y * 4.1) * 0.035 + Math.cos(x * 8.0) * 0.015;
          pos.setZ(i, z + fracture);
        }

        // If top organic layer, sculpt the surface mound & undulations
        if (isTop && y > 0.04) {
          const distToPlant = Math.sqrt((x - 0.35) ** 2 + (z - 0.2) ** 2);
          const mound = Math.max(0, 0.09 * (1.0 - distToPlant / 0.85));
          pos.setY(i, y + mound + Math.sin(x * 3.5) * Math.cos(z * 3.5) * 0.022);
        }
      }
      geo.computeVertexNormals();
    }

    // Horizon O: Organic Mulch & Humus Litter (0 - 4cm)
    const horizonOGroup = new THREE.Group();
    geologyGroup.add(horizonOGroup);
    const matHorizonO = new THREE.MeshStandardMaterial({
      color: 0x2e3d2a,
      map: texDirtDiff,
      normalMap: texDirtNor,
      normalScale: new THREE.Vector2(0.85, 0.85),
      roughnessMap: texDirtRough,
      roughness: 0.94,
      metalness: 0.02
    });
    const geoO = new THREE.BoxGeometry(blockW, 0.16, blockD, 24, 4, 24);
    sculptSoilFace(geoO, 0.16, true);
    const meshO = new THREE.Mesh(geoO, matHorizonO);
    meshO.position.y = 0;
    meshO.receiveShadow = true;
    meshO.castShadow = true;
    meshO.userData = { id: 'soil-o', name: 'Horizon O (Organic Mulch)', type: 'GEOLOGY', badge: 'MEASURED' };
    horizonOGroup.add(meshO);

    // Horizon A: Topsoil Humus Layer (4 - 24cm)
    const horizonAGroup = new THREE.Group();
    geologyGroup.add(horizonAGroup);
    const matHorizonA = new THREE.MeshStandardMaterial({
      color: 0x3d2919,
      map: texDirtDiff,
      normalMap: texDirtNor,
      normalScale: new THREE.Vector2(1.15, 1.15),
      roughnessMap: texDirtRough,
      roughness: 0.92,
      metalness: 0.01
    });
    const geoA = new THREE.BoxGeometry(blockW, 0.95, blockD, 24, 12, 24);
    sculptSoilFace(geoA, 0.95);
    const meshA = new THREE.Mesh(geoA, matHorizonA);
    meshA.position.y = -0.55;
    meshA.receiveShadow = true;
    meshA.userData = { id: 'soil-a', name: 'Horizon A (Humus Topsoil)', type: 'GEOLOGY', badge: 'MEASURED' };
    horizonAGroup.add(meshA);

    // Horizon B: Compacted Clay Subsoil (24 - 55cm)
    const horizonBGroup = new THREE.Group();
    geologyGroup.add(horizonBGroup);
    const matHorizonB = new THREE.MeshStandardMaterial({
      color: 0x6e4827,
      map: texMudDiff,
      normalMap: texMudNor,
      normalScale: new THREE.Vector2(1.25, 1.25),
      roughnessMap: texMudRough,
      roughness: 0.84,
      metalness: 0.03
    });
    const geoB = new THREE.BoxGeometry(blockW, 0.95, blockD, 24, 12, 24);
    sculptSoilFace(geoB, 0.95);
    const meshB = new THREE.Mesh(geoB, matHorizonB);
    meshB.position.y = -1.50;
    meshB.receiveShadow = true;
    meshB.userData = { id: 'soil-b', name: 'Horizon B (Clay Subsoil)', type: 'GEOLOGY', badge: 'MEASURED' };
    horizonBGroup.add(meshB);

    // Horizon C: Gravel Drainage & Bedrock Substratum (55cm+)
    const horizonCGroup = new THREE.Group();
    geologyGroup.add(horizonCGroup);
    const matHorizonC = new THREE.MeshStandardMaterial({
      color: 0x242826,
      map: texMudDiff,
      normalMap: texMudNor,
      normalScale: new THREE.Vector2(1.5, 1.5),
      roughnessMap: texMudRough,
      roughness: 0.70,
      metalness: 0.24
    });
    const geoC = new THREE.BoxGeometry(blockW, 0.75, blockD, 24, 10, 24);
    sculptSoilFace(geoC, 0.75);
    const meshC = new THREE.Mesh(geoC, matHorizonC);
    meshC.position.y = -2.35;
    meshC.receiveShadow = true;
    meshC.userData = { id: 'soil-c', name: 'Horizon C (Parent Substratum)', type: 'GEOLOGY', badge: 'MEASURED' };
    horizonCGroup.add(meshC);

    // Embedded 3D Soil Aggregates & Mineral Stones along the cutaway face
    const stoneGeo = new THREE.DodecahedronGeometry(0.045, 1);
    const stoneMat = new THREE.MeshStandardMaterial({ color: 0x7a6b58, roughness: 0.85 });
    const stoneInstanced = new THREE.InstancedMesh(stoneGeo, stoneMat, 55);
    const dummyObj = new THREE.Object3D();
    for (let s = 0; s < 55; s++) {
      const sx = (Math.random() - 0.5) * (blockW - 0.35);
      const sy = -0.12 - Math.random() * 2.3;
      const sz = (blockD / 2) - 0.05 + (Math.random() - 0.5) * 0.12;
      dummyObj.position.set(sx, sy, sz);
      dummyObj.scale.set(0.6 + Math.random() * 0.9, 0.4 + Math.random() * 0.6, 0.6 + Math.random() * 0.7);
      dummyObj.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      dummyObj.updateMatrix();
      stoneInstanced.setMatrixAt(s, dummyObj.matrix);
    }
    stoneInstanced.instanceMatrix.needsUpdate = true;
    geologyGroup.add(stoneInstanced);

    /* =========================================================================
       5. BOTANICAL MAIZE ORGANISM (ZEA MAYS L.) WITH DETAILED FIBROUS ARCHITECTURE
       ========================================================================= */
    const plantGroup = new THREE.Group();
    plantGroup.position.set(0.35, 0.07, 0.2);
    scene.add(plantGroup);

    const anatomyParts = {
      stem: new THREE.Group(),
      sheaths: new THREE.Group(),
      leaves: new THREE.Group(),
      ears: new THREE.Group(),
      braceRoots: new THREE.Group(),
      crownRoots: new THREE.Group(),
      seminalRoots: new THREE.Group(),
      lateralRoots: new THREE.Group(),
      rootTips: new THREE.Group()
    };
    Object.values(anatomyParts).forEach(g => plantGroup.add(g));

    // Stalk (Culm) Material with subtle rind luster
    const stalkMat = new THREE.MeshStandardMaterial({
      color: 0x3d9e38,
      roughness: 0.50,
      metalness: 0.05
    });

    // Root Materials with natural ivory-cream hydration sheen (fibrous monocot system)
    const braceRootMat = new THREE.MeshStandardMaterial({
      color: 0xd6c7af,
      roughness: 0.40,
      metalness: 0.03
    });
    const crownRootMat = new THREE.MeshStandardMaterial({
      color: 0xe8dfce,
      roughness: 0.38,
      metalness: 0.02
    });
    const lateralRootMat = new THREE.MeshStandardMaterial({
      color: 0xf0e8db,
      roughness: 0.34,
      metalness: 0.02
    });
    const rootCapMat = new THREE.MeshStandardMaterial({
      color: 0xfdfbf7,
      roughness: 0.22,
      metalness: 0.04
    });

    // Stratified Canopy Foliage Materials (Upper, Mid, Lower Canopy with distinct age & cuticle thickness)
    const leafMatUpper = new THREE.MeshStandardMaterial({
      color: 0x4fae3b,
      map: leafTexture,
      roughness: 0.32,
      metalness: 0.03,
      side: THREE.DoubleSide
    });
    const leafMatMid = new THREE.MeshStandardMaterial({
      color: 0x277824,
      map: leafTexture,
      roughness: 0.36,
      metalness: 0.04,
      side: THREE.DoubleSide
    });
    const leafMatLower = new THREE.MeshStandardMaterial({
      color: 0x316f2b,
      map: leafTexture,
      roughness: 0.44,
      metalness: 0.05,
      side: THREE.DoubleSide
    });
    const sheathMat = new THREE.MeshStandardMaterial({
      color: 0x48963c,
      roughness: 0.46,
      metalness: 0.04,
      side: THREE.DoubleSide
    });

    // A. Culm (Stalk) with Anatomically Spaced Nodes and Solid Internodes
    const stalkPoints = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0.012, 0.4, -0.008),
      new THREE.Vector3(-0.015, 0.95, 0.012),
      new THREE.Vector3(0.01, 1.6, -0.01),
      new THREE.Vector3(0.005, 2.3, 0.0)
    ];
    const stalkCurve = new THREE.CatmullRomCurve3(stalkPoints);
    const stalkGeo = new THREE.TubeGeometry(stalkCurve, 40, 0.046, 16, false);
    const stalkMesh = new THREE.Mesh(stalkGeo, stalkMat);
    stalkMesh.castShadow = true;
    stalkMesh.receiveShadow = true;
    stalkMesh.userData = { id: 'plant-stem', name: 'Zea Mays Culm (Stalk Internodes)', type: 'BOTANY', badge: 'MEASURED' };
    anatomyParts.stem.add(stalkMesh);

    // Node Collars along the Culm
    const nodeHeights = [0.08, 0.18, 0.35, 0.55, 0.80, 1.08, 1.38, 1.70, 2.05];
    nodeHeights.forEach((nh, idx) => {
      const nodeGeo = new THREE.TorusGeometry(0.049, 0.008, 8, 24);
      nodeGeo.rotateX(Math.PI / 2);
      const nodeMesh = new THREE.Mesh(nodeGeo, stalkMat);
      nodeMesh.position.set(0, nh, 0);
      nodeMesh.userData = { id: `culm-node-${idx+1}`, name: `Culm Node Collar #${idx+1}`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.stem.add(nodeMesh);
    });

    // Apical Tassel (Male Inflorescence with central spike & radiating branches)
    const tasselSpike = new THREE.TubeGeometry(new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 2.25, 0),
      new THREE.Vector3(0, 2.52, 0)
    ]), 8, 0.008, 6, false);
    const tasselMat = new THREE.MeshStandardMaterial({ color: 0xd4be6a, roughness: 0.65 });
    const spikeMesh = new THREE.Mesh(tasselSpike, tasselMat);
    spikeMesh.userData = { id: 'tassel-central', name: 'Tassel Central Rachis (Inflorescence)', type: 'BOTANY', badge: 'MEASURED' };
    anatomyParts.stem.add(spikeMesh);

    for (let t = 0; t < 10; t++) {
      const angle = (t / 10) * Math.PI * 2 + (Math.random() - 0.5) * 0.2;
      const tCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, 2.26 + (t / 10) * 0.06, 0),
        new THREE.Vector3(Math.cos(angle) * 0.08, 2.38, Math.sin(angle) * 0.08),
        new THREE.Vector3(Math.cos(angle) * 0.19, 2.48, Math.sin(angle) * 0.19),
        new THREE.Vector3(Math.cos(angle) * 0.24, 2.44, Math.sin(angle) * 0.24)
      ]);
      const tGeo = new THREE.TubeGeometry(tCurve, 8, 0.005, 5, false);
      const tMesh = new THREE.Mesh(tGeo, tasselMat);
      tMesh.userData = { id: `tassel-branch-${t+1}`, name: `Tassel Spikelet Branch #${t+1}`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.stem.add(tMesh);
    }

    // B. Anatomically Detailed Maize Leaves (Sheath + 7-Point Cross-Section Blade with Ruffled Margins)
    const leafMeshes = [];

    function createBotanicalMaizeLeaf(index, totalLeaves) {
      const leafGroup = new THREE.Group();
      const nodeH = nodeHeights[Math.min(nodeHeights.length - 1, index + 1)] || (0.3 + (index / totalLeaves) * 1.6);
      leafGroup.position.set(0, nodeH, 0);

      // Distichous alternating phyllotaxis (~180° alternation with subtle 15° natural spiral)
      const baseAngle = (index % 2 === 0) ? 0 : Math.PI;
      const spiralOffset = (index - 5) * 0.12 + (Math.random() - 0.5) * 0.08;
      leafGroup.rotation.y = baseAngle + spiralOffset;

      // 1. Clasping Cylindrical Leaf Sheath wrapping the stalk below the collar
      const sheathLen = 0.14 + (index / totalLeaves) * 0.08;
      const sheathGeo = new THREE.CylinderGeometry(0.052, 0.050, sheathLen, 16, 1, true, 0.2, Math.PI * 1.85);
      sheathGeo.translate(0, -sheathLen * 0.45, 0);
      const sheathMesh = new THREE.Mesh(sheathGeo, sheathMat);
      sheathMesh.castShadow = true;
      sheathMesh.userData = { id: `sheath-${index+1}`, name: `Leaf Sheath #${index+1} (Clasping Collar)`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.sheaths.add(sheathMesh);

      // 2. Leaf Blade with 7-Point Profile, V-Groove, and Undulating Fluted Margins
      const length = 1.35 + Math.sin((index / totalLeaves) * Math.PI) * 0.42;
      const maxWidth = 0.17 + Math.sin((index / totalLeaves) * Math.PI) * 0.07;
      const segments = 28;

      const archFactor = 0.28 + (index / totalLeaves) * 0.35;
      const droopPower = 1.8 + (1.0 - index / totalLeaves) * 0.7;

      const curvePoints = [];
      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const x = Math.sin(u * Math.PI * 0.5) * length;
        const y = Math.sin(u * Math.PI * 0.8) * archFactor - Math.pow(u, droopPower) * (0.45 + (1.0 - index / totalLeaves) * 0.25);
        const z = Math.sin(u * Math.PI) * (0.035 * (Math.random() - 0.5));
        curvePoints.push(new THREE.Vector3(x, y, z));
      }

      // 7-Point Transverse Profile Mesh
      const geom = new THREE.BufferGeometry();
      const vertices = [];
      const uvs = [];
      const indices = [];

      for (let i = 0; i <= segments; i++) {
        const u = i / segments;
        const p = curvePoints[i];
        const w = Math.sin(u * Math.PI) * maxWidth * (1.0 - u * 0.35);

        const tangent = (i < segments)
          ? curvePoints[i + 1].clone().sub(p).normalize()
          : p.clone().sub(curvePoints[i - 1]).normalize();
        let side = new THREE.Vector3(0, 0, 1).cross(tangent).normalize();
        if (side.lengthSq() < 0.001) side.set(0, 0, 1);

        // Fluted wavy margin undulations
        const marginWave = Math.sin(u * 26.0 + index) * (0.015 * Math.sin(u * Math.PI));

        // 7 profile points: p0 (ruffled left) to p6 (ruffled right) with p3 (midrib keel)
        const v0 = p.clone().add(side.clone().multiplyScalar(w * 0.50)).add(new THREE.Vector3(0, 0.014 + marginWave, 0));
        const v1 = p.clone().add(side.clone().multiplyScalar(w * 0.32)).add(new THREE.Vector3(0, 0.008 + marginWave * 0.5, 0));
        const v2 = p.clone().add(side.clone().multiplyScalar(w * 0.12)).add(new THREE.Vector3(0, 0.002, 0));
        const v3 = p.clone().add(new THREE.Vector3(0, -0.010, 0));
        const v4 = p.clone().sub(side.clone().multiplyScalar(w * 0.12)).add(new THREE.Vector3(0, 0.002, 0));
        const v5 = p.clone().sub(side.clone().multiplyScalar(w * 0.32)).add(new THREE.Vector3(0, 0.008 - marginWave * 0.5, 0));
        const v6 = p.clone().sub(side.clone().multiplyScalar(w * 0.50)).add(new THREE.Vector3(0, 0.014 - marginWave, 0));

        vertices.push(
          v0.x, v0.y, v0.z,
          v1.x, v1.y, v1.z,
          v2.x, v2.y, v2.z,
          v3.x, v3.y, v3.z,
          v4.x, v4.y, v4.z,
          v5.x, v5.y, v5.z,
          v6.x, v6.y, v6.z
        );

        uvs.push(
          0.00, u,
          0.18, u,
          0.38, u,
          0.50, u,
          0.62, u,
          0.82, u,
          1.00, u
        );

        if (i < segments) {
          const row = i * 7;
          for (let q = 0; q < 6; q++) {
            indices.push(row + q, row + q + 7, row + q + 1);
            indices.push(row + q + 1, row + q + 7, row + q + 8);
          }
        }
      }

      geom.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
      geom.setAttribute('uv', new THREE.Float32BufferAttribute(uvs, 2));
      geom.setIndex(indices);
      geom.computeVertexNormals();

      // Stratified foliage material based on leaf insertion level
      let chosenMat = leafMatMid;
      if (index >= 7) chosenMat = leafMatUpper;
      else if (index <= 2) chosenMat = leafMatLower;

      const mesh = new THREE.Mesh(geom, chosenMat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.userData = { id: `leaf-${index + 1}`, name: `Maize Leaf Blade #${index + 1}`, type: 'BOTANY', badge: 'MEASURED' };

      leafGroup.add(mesh);
      anatomyParts.leaves.add(leafGroup);
      leafMeshes.push(leafGroup);
    }

    for (let l = 0; l < 11; l++) {
      createBotanicalMaizeLeaf(l, 11);
    }

    // C. Developing Maize Ears (Female Inflorescences with Husks and Cascading Silk)
    function createBotanicalMaizeEar(nodeHeight, angle, earIndex) {
      const earGroup = new THREE.Group();
      earGroup.position.set(0, nodeHeight, 0);
      earGroup.rotation.y = angle;
      earGroup.rotation.z = -0.44;

      // Rigid Ear Shank
      const shankGeo = new THREE.CylinderGeometry(0.018, 0.024, 0.15, 10);
      const shankMat = new THREE.MeshStandardMaterial({ color: 0x2e8b38, roughness: 0.58 });
      const shank = new THREE.Mesh(shankGeo, shankMat);
      shank.position.y = 0.07;
      earGroup.add(shank);

      // Cob Body wrapped in Spathe Husk Leaves
      const cobGeo = new THREE.CylinderGeometry(0.046, 0.068, 0.42, 16);
      const huskMat = new THREE.MeshStandardMaterial({
        color: 0x3d9e40,
        map: leafTexture,
        roughness: 0.45,
        metalness: 0.04
      });
      const cob = new THREE.Mesh(cobGeo, huskMat);
      cob.position.y = 0.26;
      cob.castShadow = true;
      cob.userData = { id: `ear-${earIndex}`, name: `Developing Maize Ear #${earIndex} (Husk Sheaths)`, type: 'BOTANY', badge: 'MEASURED' };
      earGroup.add(cob);

      // Overlapping Husk Bracts (spathes)
      for (let h = 0; h < 6; h++) {
        const hPoints = [
          new THREE.Vector3(0, 0.10, 0),
          new THREE.Vector3(Math.cos(h * 1.05) * 0.075, 0.28, Math.sin(h * 1.05) * 0.075),
          new THREE.Vector3(Math.cos(h * 1.05) * 0.022, 0.47, Math.sin(h * 1.05) * 0.022)
        ];
        const hCurve = new THREE.CatmullRomCurve3(hPoints);
        const hGeo = new THREE.TubeGeometry(hCurve, 8, 0.015, 6, false);
        const hMesh = new THREE.Mesh(hGeo, huskMat);
        earGroup.add(hMesh);
      }

      // Cascading Corn Silk Tufts (styles/stigmata)
      for (let s = 0; s < 18; s++) {
        const sAngle = (s / 18) * Math.PI * 2;
        const sCurve = new THREE.CatmullRomCurve3([
          new THREE.Vector3(0, 0.45, 0),
          new THREE.Vector3(Math.cos(sAngle) * 0.038, 0.51, Math.sin(sAngle) * 0.038),
          new THREE.Vector3(Math.cos(sAngle) * 0.075 + (Math.random() - 0.5) * 0.03, 0.56 - Math.random() * 0.04, Math.sin(sAngle) * 0.075),
          new THREE.Vector3(Math.cos(sAngle) * 0.09, 0.49 - Math.random() * 0.08, Math.sin(sAngle) * 0.09)
        ]);
        const sGeo = new THREE.TubeGeometry(sCurve, 8, 0.003, 4, false);
        const sMesh = new THREE.Mesh(sGeo, new THREE.MeshStandardMaterial({
          color: 0xdeb842,
          roughness: 0.45,
          emissive: 0x4a3508
        }));
        earGroup.add(sMesh);
      }

      anatomyParts.ears.add(earGroup);
    }

    createBotanicalMaizeEar(0.82, 1.30, 1);
    createBotanicalMaizeEar(1.40, 3.90, 2);

    // D. Whorled Aerial Brace Roots (Prop Roots for Mechanical Support & Topsoil Uptake)
    // Whorl 1: Emerging from above-ground Node 1 (8 prop roots)
    for (let c = 0; c < 8; c++) {
      const angle = (c / 8) * Math.PI * 2 + 0.15;
      const cPoints = [
        new THREE.Vector3(0, 0.08, 0),
        new THREE.Vector3(Math.cos(angle) * 0.12, 0.03, Math.sin(angle) * 0.12),
        new THREE.Vector3(Math.cos(angle) * 0.24, -0.14, Math.sin(angle) * 0.24)
      ];
      const cCurve = new THREE.CatmullRomCurve3(cPoints);
      const cGeo = new THREE.TubeGeometry(cCurve, 10, 0.022, 6, false);
      const cMesh = new THREE.Mesh(cGeo, braceRootMat);
      cMesh.castShadow = true;
      cMesh.userData = { id: `brace-root-w1-${c+1}`, name: `Brace Root (Whorl 1, #${c+1})`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.braceRoots.add(cMesh);
    }

    // Whorl 2: Emerging from above-ground Node 2 (10 prop roots)
    for (let c = 0; c < 10; c++) {
      const angle = (c / 10) * Math.PI * 2;
      const cPoints = [
        new THREE.Vector3(0, 0.18, 0),
        new THREE.Vector3(Math.cos(angle) * 0.16, 0.08, Math.sin(angle) * 0.16),
        new THREE.Vector3(Math.cos(angle) * 0.32, -0.20, Math.sin(angle) * 0.32)
      ];
      const cCurve = new THREE.CatmullRomCurve3(cPoints);
      const cGeo = new THREE.TubeGeometry(cCurve, 12, 0.026, 6, false);
      const cMesh = new THREE.Mesh(cGeo, braceRootMat);
      cMesh.castShadow = true;
      cMesh.userData = { id: `brace-root-w2-${c+1}`, name: `Brace Root (Whorl 2, #${c+1})`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.braceRoots.add(cMesh);
    }

    // E. Subterranean Crown Roots (Nodal Roots radiating in Topsoil Horizon A)
    const crownRootAxes = [];
    for (let cr = 0; cr < 16; cr++) {
      const angle = (cr / 16) * Math.PI * 2 + (Math.random() - 0.5) * 0.3;
      const reach = 0.55 + Math.random() * 0.35;
      const depth = -0.25 - Math.random() * 0.35;
      const crPoints = [
        new THREE.Vector3(0, -0.04 - (cr % 4) * 0.02, 0),
        new THREE.Vector3(Math.cos(angle) * (reach * 0.45), depth * 0.5, Math.sin(angle) * (reach * 0.45)),
        new THREE.Vector3(Math.cos(angle) * reach, depth, Math.sin(angle) * reach)
      ];
      const crCurve = new THREE.CatmullRomCurve3(crPoints);
      const crGeo = new THREE.TubeGeometry(crCurve, 16, 0.020, 6, false);
      const crMesh = new THREE.Mesh(crGeo, crownRootMat);
      crMesh.castShadow = true;
      crMesh.userData = { id: `crown-root-${cr+1}`, name: `Crown Nodal Root #${cr+1} (Horizon A)`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.crownRoots.add(crMesh);
      crownRootAxes.push(crPoints[2]);
    }

    // F. Seminal Taproot System (Deep vertical moisture axes penetrating Horizons B & C)
    const tapPoints = [
      new THREE.Vector3(0, -0.05, 0),
      new THREE.Vector3(0.03, -0.45, -0.02),
      new THREE.Vector3(-0.025, -1.05, 0.02),
      new THREE.Vector3(0.015, -1.82, 0.0)
    ];
    const tapCurve = new THREE.CatmullRomCurve3(tapPoints);
    const tapGeo = new THREE.TubeGeometry(tapCurve, 28, 0.034, 8, false);
    const tapMesh = new THREE.Mesh(tapGeo, crownRootMat);
    tapMesh.castShadow = true;
    tapMesh.userData = { id: 'seminal-taproot', name: 'Primary Seminal Taproot (Deep Subsoil)', type: 'BOTANY', badge: 'MEASURED' };
    anatomyParts.seminalRoots.add(tapMesh);

    // 4 Secondary Seminal Axes radiating downwards
    for (let s = 0; s < 4; s++) {
      const sAngle = (s / 4) * Math.PI * 2 + 0.4;
      const sCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0, -0.06, 0),
        new THREE.Vector3(Math.cos(sAngle) * 0.12, -0.65, Math.sin(sAngle) * 0.12),
        new THREE.Vector3(Math.cos(sAngle) * 0.18, -1.45, Math.sin(sAngle) * 0.18)
      ]);
      const sGeo = new THREE.TubeGeometry(sCurve, 18, 0.018, 6, false);
      const sMesh = new THREE.Mesh(sGeo, crownRootMat);
      sMesh.userData = { id: `seminal-axis-${s+1}`, name: `Secondary Seminal Axis #${s+1}`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.seminalRoots.add(sMesh);
    }

    // G. Dense Lateral Feeder Root Web (1st and 2nd Order Branches in Rhizosphere)
    const rootTipPositions = [];
    for (let r = 0; r < 48; r++) {
      const angle = (r / 48) * Math.PI * 2 + (Math.random() - 0.5) * 0.45;
      const startDepth = -0.12 - (r / 48) * 1.45;
      const reach = 0.42 + Math.random() * 0.85;
      const endDepth = startDepth - 0.18 - Math.random() * 0.32;

      const p0 = new THREE.Vector3(0, startDepth, 0);
      const p2 = new THREE.Vector3(Math.cos(angle) * reach, endDepth, Math.sin(angle) * reach);
      const p1 = new THREE.Vector3(
        (p0.x + p2.x) * 0.5 + (Math.random() - 0.5) * 0.16,
        (p0.y + p2.y) * 0.5 - 0.05,
        (p0.z + p2.z) * 0.5 + (Math.random() - 0.5) * 0.16
      );

      const latCurve = new THREE.CatmullRomCurve3([p0, p1, p2]);
      const latGeo = new THREE.TubeGeometry(latCurve, 12, 0.012, 5, false);
      const latMesh = new THREE.Mesh(latGeo, lateralRootMat);
      latMesh.userData = { id: `feeder-root-${r+1}`, name: `Lateral Feeder Root #${r+1} (Rhizosphere)`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.lateralRoots.add(latMesh);

      // Active Meristematic Root Cap (Calyptra)
      const tipGeo = new THREE.SphereGeometry(0.018, 8, 8);
      const tipMesh = new THREE.Mesh(tipGeo, rootCapMat);
      tipMesh.position.copy(p2);
      tipMesh.userData = { id: `root-cap-${r+1}`, name: `Active Root Cap #${r+1} (Calyptra)`, type: 'BOTANY', badge: 'MEASURED' };
      anatomyParts.rootTips.add(tipMesh);
      rootTipPositions.push(p2);
    }
/* =========================================================================
       6. ZERTHIVA INDUSTRIAL $30 HARDWARE & PROBE SUITE
       ========================================================================= */
    const hardwareGroup = new THREE.Group();
    hardwareGroup.position.set(-0.55, 0.0, -0.35);
    scene.add(hardwareGroup);

    const hwParts = {
      solarWafer: new THREE.Group(),
      sentryRing: new THREE.Group(),
      enclosure: new THREE.Group(),
      esp32Core: new THREE.Group(),
      batteryPack: new THREE.Group(),
      cableHarness: new THREE.Group(),
      probeShaft: new THREE.Group()
    };
    Object.values(hwParts).forEach(g => hardwareGroup.add(g));

    // 1. Monocrystal 5W Solar Collector Disc
    const pvDiscGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.04, 32);
    const pvMat = new THREE.MeshStandardMaterial({ color: 0x0a1622, metalness: 0.9, roughness: 0.18 });
    const pvDisc = new THREE.Mesh(pvDiscGeo, pvMat);
    pvDisc.userData = { id: 'pv-solar', name: '5W Monocrystal PV Collector', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.solarWafer.add(pvDisc);
    hwParts.solarWafer.position.y = 1.05;

    // 2. 360° Fresnel RGB LED Sentry Beacon (GPIO25, 26, 27)
    const sentryGeo = new THREE.TorusGeometry(0.28, 0.035, 12, 32);
    sentryGeo.rotateX(Math.PI / 2);
    const sentryMat = new THREE.MeshStandardMaterial({
      color: 0x00ff87,
      emissive: 0x00ff87,
      emissiveIntensity: 1.8,
      roughness: 0.2
    });
    const sentryRingMesh = new THREE.Mesh(sentryGeo, sentryMat);
    sentryRingMesh.userData = { id: 'sentry-beacon', name: '360° Fresnel RGB Sentry Ring', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.sentryRing.add(sentryRingMesh);
    const sentryPointLight = new THREE.PointLight(0x00ff87, 2.0, 3.5);
    hwParts.sentryRing.add(sentryPointLight);
    hwParts.sentryRing.position.y = 0.94;

    // 3. ASA Weatherproof Enclosure Body
    const chassisGeo = new THREE.CylinderGeometry(0.26, 0.24, 0.65, 32);
    const chassisMat = new THREE.MeshStandardMaterial({ color: 0x142820, roughness: 0.35, metalness: 0.2 });
    const chassisMesh = new THREE.Mesh(chassisGeo, chassisMat);
    chassisMesh.position.y = 0.52;
    chassisMesh.castShadow = true;
    chassisMesh.userData = { id: 'asa-chassis', name: 'Weatherproof ASA Enclosure Body', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.enclosure.add(chassisMesh);

    // Weatherproof seal rings
    for (let r = 0; r < 2; r++) {
      const sealGeo = new THREE.TorusGeometry(0.265, 0.014, 8, 32);
      sealGeo.rotateX(Math.PI / 2);
      const sealMesh = new THREE.Mesh(sealGeo, new THREE.MeshStandardMaterial({ color: 0x111, roughness: 0.6 }));
      sealMesh.position.y = 0.4 + r * 0.22;
      hwParts.enclosure.add(sealMesh);
    }

    // 4. Genuine Xiao ESP32-S3 Module (Dual-Core Xtensa 240MHz, 0.15mA sleep)
    const pcbGeo = new THREE.BoxGeometry(0.3, 0.48, 0.024);
    const pcbMat = new THREE.MeshStandardMaterial({ color: 0x0b4f2c, metalness: 0.5, roughness: 0.35 });
    const pcbMesh = new THREE.Mesh(pcbGeo, pcbMat);
    pcbMesh.position.y = 0.52;
    pcbMesh.userData = { id: 'esp32-mcu', name: 'Xiao ESP32-S3 MCU (Dual-Core)', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.esp32Core.add(pcbMesh);

    const gltfLoader = new THREE.GLTFLoader();
    gltfLoader.load('assets/models/esp32.glb', (gltf) => {
      const espModel = gltf.scene;
      const box = new THREE.Box3().setFromObject(espModel);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxDim = Math.max(size.x, size.y, size.z);
      const targetScale = 0.44 / maxDim;
      
      espModel.scale.setScalar(targetScale);
      espModel.position.sub(center.clone().multiplyScalar(targetScale));
      espModel.position.y += 0.52;
      espModel.rotation.y = Math.PI / 2;

      espModel.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          child.userData = { id: 'esp32-mcu', name: 'Xiao ESP32-S3 Module', type: 'HARDWARE', badge: 'MEASURED' };
          if (child.material) {
            child.material.metalness = Math.max(child.material.metalness || 0, 0.7);
            child.material.roughness = Math.min(child.material.roughness || 1.0, 0.28);
            child.material.envMapIntensity = 1.3;
          }
        }
      });

      hwParts.esp32Core.remove(pcbMesh);
      hwParts.esp32Core.add(espModel);
      updateLoadingProgress('Xiao ESP32-S3 Model');
    }, undefined, (err) => {
      console.warn('ESP32 model load note:', err);
      updateLoadingProgress('Xiao ESP32-S3 (Fallback)');
    });

    // 5. 18650 3.7V Li-ion Cell + TP4056 Solar Charge Controller
    const battGeo = new THREE.CylinderGeometry(0.065, 0.065, 0.38, 16);
    const battMat = new THREE.MeshStandardMaterial({ color: 0x00a8ff, metalness: 0.5, roughness: 0.3 });
    const battMesh = new THREE.Mesh(battGeo, battMat);
    battMesh.position.set(0.08, 0.5, -0.06);
    battMesh.userData = { id: 'battery-18650', name: '18650 2200mAh Cell + TP4056', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.batteryPack.add(battMesh);

    // 6. Industrial Cable Gland & Flexible Cable Harness
    const glandGeo = new THREE.CylinderGeometry(0.035, 0.045, 0.08, 12);
    const glandMat = new THREE.MeshStandardMaterial({ color: 0x111, roughness: 0.5 });
    const glandMesh = new THREE.Mesh(glandGeo, glandMat);
    glandMesh.position.y = 0.18;
    hwParts.cableHarness.add(glandMesh);

    const cableCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.18, 0),
      new THREE.Vector3(0.05, 0.08, 0.04),
      new THREE.Vector3(0.02, -0.02, 0.02),
      new THREE.Vector3(0, -0.12, 0)
    ]);
    const cableGeo = new THREE.TubeGeometry(cableCurve, 16, 0.014, 8, false);
    const cableMesh = new THREE.Mesh(cableGeo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.6 }));
    hwParts.cableHarness.add(cableMesh);

    // 7. Subsurface Probe Assembly at 15-25cm Active Depth
    const probeStemGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.55, 16);
    const darkStemMat = new THREE.MeshStandardMaterial({ color: 0x18201b, roughness: 0.5 });
    const probeStem = new THREE.Mesh(probeStemGeo, darkStemMat);
    probeStem.position.y = -0.12;
    probeStem.userData = { id: 'probe-shaft', name: 'Subsurface Probe Shaft', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.probeShaft.add(probeStem);

    // Depth Gauge Ring Markings (5cm, 10cm, 15cm, 20cm, 25cm)
    for (let d = 1; d <= 4; d++) {
      const markGeo = new THREE.TorusGeometry(0.082, 0.003, 6, 24);
      markGeo.rotateX(Math.PI / 2);
      const markMesh = new THREE.Mesh(markGeo, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 }));
      markMesh.position.y = -0.12 - d * 0.1;
      hwParts.probeShaft.add(markMesh);
    }

    // Dual Stainless Steel EC Electrode Rings (GPIO34 ADC1_CH6)
    const chromeMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.98, roughness: 0.08, envMapIntensity: 1.4 });
    const ecRingGeo = new THREE.CylinderGeometry(0.086, 0.086, 0.05, 24);

    const ecRing1 = new THREE.Mesh(ecRingGeo, chromeMat);
    ecRing1.position.y = -0.48;
    ecRing1.userData = { id: 'ec-ring-upper', name: '316L Stainless EC Ring (Upper)', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.probeShaft.add(ecRing1);

    const ecRing2 = new THREE.Mesh(ecRingGeo, chromeMat);
    ecRing2.position.y = -0.82;
    ecRing2.userData = { id: 'ec-ring-lower', name: '316L Stainless EC Ring (Lower)', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.probeShaft.add(ecRing2);

    // Capacitive VWC% FR4 PCB Blade (GPIO35 ADC1_CH7)
    const bladeGeo = new THREE.BoxGeometry(0.02, 0.92, 0.16);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x113d22, roughness: 0.4 });
    const bladeMesh = new THREE.Mesh(bladeGeo, bladeMat);
    bladeMesh.position.y = -0.72;
    bladeMesh.userData = { id: 'vwc-blade', name: 'FR4 Capacitive VWC% Moisture Blade', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.probeShaft.add(bladeMesh);

    // DS18B20 1-Wire Digital Thermal Probe Tip (GPIO4)
    const tipConeGeo = new THREE.ConeGeometry(0.042, 0.18, 16);
    tipConeGeo.rotateX(Math.PI);
    const tipMesh = new THREE.Mesh(tipConeGeo, chromeMat);
    tipMesh.position.y = -1.25;
    tipMesh.userData = { id: 'temp-tip', name: 'Maxim DS18B20 Thermal Capsule Tip', type: 'HARDWARE', badge: 'MEASURED' };
    hwParts.probeShaft.add(tipMesh);

    /* =========================================================================
       7. RESTRAINED SCIENTIFIC HYDROLOGY (PLANT ROOT CONVERGENCE STREAMLINES)
       ========================================================================= */
    const hydrologyGroup = new THREE.Group();
    scene.add(hydrologyGroup);

    // 18 Streamlines tracing natural gravitational infiltration & xylem uptake
    const streamlineCurves = [];
    const streamlineMeshes = [];

    for (let s = 0; s < 18; s++) {
      const sAngle = (s / 18) * Math.PI * 2;
      const sRad = 0.4 + Math.random() * 0.9;
      // Infiltration point on soil surface
      const pSurf = new THREE.Vector3(Math.cos(sAngle) * sRad + 0.35, 0.05, Math.sin(sAngle) * sRad + 0.2);
      
      // Target lateral root tip
      const targetTip = rootTipPositions[s % rootTipPositions.length] || new THREE.Vector3(0.35, -0.8, 0.2);
      const pRhizo = targetTip.clone().add(plantGroup.position);

      // Convergence into stalk base
      const pStem = plantGroup.position.clone().add(new THREE.Vector3(0, 0.15, 0));
      const pCanopy = plantGroup.position.clone().add(new THREE.Vector3(0, 0.85, 0));

      const curve = new THREE.CatmullRomCurve3([
        pSurf,
        new THREE.Vector3(pSurf.x * 0.8 + pRhizo.x * 0.2, -0.2, pSurf.z * 0.8 + pRhizo.z * 0.2),
        pRhizo,
        pStem,
        pCanopy
      ]);
      streamlineCurves.push(curve);

      // Thin scientific flow line
      const lineGeo = new THREE.TubeGeometry(curve, 32, 0.005, 5, false);
      const lineMat = new THREE.MeshStandardMaterial({
        color: 0x4aa3df,
        emissive: 0x1b4e75,
        transparent: true,
        opacity: 0.55,
        roughness: 0.3
      });
      const lineMesh = new THREE.Mesh(lineGeo, lineMat);
      lineMesh.userData = { id: 'hydro-streamline', name: 'Rhizosphere Hydraulic Streamline', type: 'HYDROLOGY', badge: 'SIMULATED' };
      hydrologyGroup.add(lineMesh);
      streamlineMeshes.push(lineMesh);
    }

    // Moving water pulses along streamlines
    const pulseCount = 36;
    const pulseGeo = new THREE.SphereGeometry(0.016, 6, 6);
    const pulseMat = new THREE.MeshStandardMaterial({
      color: 0x66c8ff,
      emissive: 0x0088cc,
      emissiveIntensity: 0.8
    });
    const pulseMeshes = [];
    for (let p = 0; p < pulseCount; p++) {
      const pm = new THREE.Mesh(pulseGeo, pulseMat);
      pm.userData = { curveIdx: p % streamlineCurves.length, offset: Math.random() };
      hydrologyGroup.add(pm);
      pulseMeshes.push(pm);
    }

    // Volumetric Soil Moisture Saturation Plume
    const plumeGeo = new THREE.CylinderGeometry(0.65, 0.85, 1.4, 16);
    const plumeMat = new THREE.MeshStandardMaterial({
      color: 0x224433,
      transparent: true,
      opacity: 0.18,
      roughness: 0.5
    });
    const plumeMesh = new THREE.Mesh(plumeGeo, plumeMat);
    plumeMesh.position.set(0.35, -0.85, 0.2);
    plumeMesh.userData = { id: 'hydro-plume', name: 'Root Zone Hydration Plume', type: 'HYDROLOGY', badge: 'SIMULATED' };
    hydrologyGroup.add(plumeMesh);

    /* =========================================================================
       8. DETERMINISTIC SIMULATION & MAAS-HOFFMAN DECISION LOGIC
       ========================================================================= */
    const simState = {
      ecRaw: 1.42,
      vwcRaw: 31.8,
      tempRaw: 24.6,
      ec25: 1.42,
      status: 'SAFE',
      yieldLoss: 0.0,
      faultType: 'NONE',
      currentChapter: 0,
      autoPlay: false,
      autoPlayTimer: null
    };

    function calculateAgronomicEngine() {
      const alpha = 0.0191;
      let ec25 = simState.ecRaw / (1 + alpha * (simState.tempRaw - 25.0));

      if (simState.faultType === 'DISCONNECTED') {
        ec25 = 0.0;
        simState.vwcRaw = 0.0;
      } else if (simState.faultType === 'OUT_OF_RANGE') {
        ec25 = 9.99;
      }

      simState.ec25 = ec25;

      // Maize Maas-Hoffman: Threshold 1.70 dS/m, slope 12.0%/dS/m
      const maizeThreshold = 1.70;
      const bSlope = 12.0;

      if (ec25 > maizeThreshold) {
        simState.yieldLoss = Math.min(100.0, bSlope * (ec25 - maizeThreshold));
        simState.status = 'CRITICAL';
      } else {
        simState.yieldLoss = 0.0;
        simState.status = 'SAFE';
      }

      document.getElementById('val-ec').innerText = simState.ec25.toFixed(2);
      document.getElementById('val-moist').innerText = simState.vwcRaw.toFixed(1);
      document.getElementById('val-temp').innerText = simState.tempRaw.toFixed(1);

      const penEl = document.getElementById('val-penalty');
      if (simState.yieldLoss > 0) {
        penEl.innerText = \`-\${simState.yieldLoss.toFixed(1)}% LOSS\`;
        penEl.style.color = 'var(--accent-crimson)';
        sentryMat.color.setHex(0xff2a5f);
        sentryMat.emissive.setHex(0xff2a5f);
        sentryPointLight.color.setHex(0xff2a5f);
      } else {
        penEl.innerText = '0.0% LOSS';
        penEl.style.color = 'var(--accent-emerald)';
        sentryMat.color.setHex(0x00ff87);
        sentryMat.emissive.setHex(0x00ff87);
        sentryPointLight.color.setHex(0x00ff87);
      }

      // Soil hydration appearance modulation
      const moistureRatio = Math.max(0, Math.min(1.0, (simState.vwcRaw - 10) / 32));
      matHorizonA.roughness = 0.94 - moistureRatio * 0.35;
      matHorizonB.roughness = 0.88 - moistureRatio * 0.32;
      plumeMat.opacity = 0.08 + moistureRatio * 0.28;
    }

    /* =========================================================================
       9. LAYER VISIBILITY CONTROLS
       ========================================================================= */
    const visibilityToggles = {
      canopy: { el: document.getElementById('tog-canopy'), active: true, target: [anatomyParts.leaves, anatomyParts.sheaths, anatomyParts.ears, anatomyParts.stem] },
      roots: { el: document.getElementById('tog-roots'), active: true, target: [anatomyParts.braceRoots, anatomyParts.crownRoots, anatomyParts.seminalRoots, anatomyParts.lateralRoots, anatomyParts.rootTips] },
      soil: { el: document.getElementById('tog-soil'), active: true, target: [geologyGroup] },
      hw: { el: document.getElementById('tog-hw'), active: true, target: [hardwareGroup] },
      hydro: { el: document.getElementById('tog-hydro'), active: true, target: [hydrologyGroup] }
    };

    Object.entries(visibilityToggles).forEach(([key, cfg]) => {
      cfg.el.addEventListener('click', () => {
        cfg.active = !cfg.active;
        if (cfg.active) cfg.el.classList.add('active');
        else cfg.el.classList.remove('active');
        cfg.target.forEach(t => t.visible = cfg.active);
        sound.playPing(cfg.active ? 740 : 420);
      });
    });

    /* =========================================================================
       10. 3D RAYCASTER & INTERACTIVE COMPONENT INSPECTOR
       ========================================================================= */
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let mouseDownPos = { x: 0, y: 0 };
    const componentCard = document.getElementById('component-card');
    let selectedComponentObj = null;

    window.addEventListener('mousedown', (e) => {
      mouseDownPos = { x: e.clientX, y: e.clientY };
    });

    window.addEventListener('mouseup', (e) => {
      // Ignore if user was dragging / orbiting
      const dx = Math.abs(e.clientX - mouseDownPos.x);
      const dy = Math.abs(e.clientY - mouseDownPos.y);
      if (dx > 4 || dy > 4) return;
      if (e.target.closest('aside') || e.target.closest('header') || e.target.closest('.timeline-dock') || e.target.closest('.visibility-toolbar') || e.target.closest('.component-inspector-card') || e.target.closest('.inspector-modal')) return;

      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const interactable = [plantGroup, geologyGroup, hardwareGroup, hydrologyGroup];
      const hits = raycaster.intersectObjects(interactable, true);

      if (hits.length > 0) {
        // Find topmost object with userData
        let picked = hits[0].object;
        while (picked && !picked.userData?.name && picked.parent && picked !== scene) {
          picked = picked.parent;
        }

        if (picked && picked.userData?.name) {
          showComponentInspector(picked, hits[0].point);
          sound.playPing(880);
        }
      }
    });

    function showComponentInspector(obj, worldHitPoint) {
      selectedComponentObj = obj;
      const data = obj.userData || {};

      document.getElementById('card-tag').innerText = data.type || 'SYSTEM';
      document.getElementById('card-badge').innerText = data.badge || 'MEASURED';
      document.getElementById('card-title').innerText = data.name || 'Component';

      let desc = 'Engineered sensor or physiological plant component.';
      let meta = 'Status: NOMINAL | Calibrated';

      if (data.id?.includes('leaf')) {
        desc = 'Linear-lanceolate monocot leaf blade with 7-point V-groove midrib, fluted wavy margins, and C4 dicarboxylic photosynthetic pathway.';
        meta = 'Transpiration: g_s ≈ 0.28 mol/m²s | Chlorophyll: High';
      } else if (data.id?.includes('sheath')) {
        desc = 'Cylindrical split leaf sheath wrapping tightly around the culm internode, providing structural mechanical reinforcement and protecting intercalary meristems.';
        meta = 'Structure: Clasping Petiole Equivalent | Node Insertion: Base Collar';
      } else if (data.id?.includes('tassel')) {
        desc = 'Apical male inflorescence terminating the main culm, with central rachis and lateral spikes shedding millions of windborne pollen grains.';
        meta = 'Anthesis Stage (VT) | Pollen Shed: ~2–5 million grains/tassel';
      } else if (data.id?.includes('brace-root')) {
        desc = 'Adventitious prop root emerging in whorls from aerial stalk nodes 1 and 2. Plunges into soil at 50° to prevent lodging and absorb topsoil moisture.';
        meta = 'Prop Roots (Whorls 1 & 2) | Anthocyanin-pigmented epidermis';
      } else if (data.id?.includes('crown-root')) {
        desc = 'Subterranean nodal crown root radiating through Horizon A topsoil, responsible for over 80% of mature vegetative water and nutrient uptake.';
        meta = 'Corona Nodal System | Rhizosphere nutrient mass flow';
      } else if (data.id?.includes('seminal')) {
        desc = 'Embryonic seminal root system penetrating vertically deep into Horizon B and C subsoil to access deep residual water tables during moisture stress.';
        meta = 'Seminal Axis | Subsoil Penetration Depth: 1.5–1.8m';
      } else if (data.id?.includes('feeder-root')) {
        desc = 'High-density 1st and 2nd order lateral feeder root network branching profusely in the rhizosphere to maximize surface area for ion diffusion.';
        meta = 'Lateral Web | Nitrate mass flow & Phosphate diffusion zone';
      } else if (data.id?.includes('root-cap')) {
        desc = 'Apical meristematic calyptra protecting dividing cell initials and secreting mucigel to lubricate soil pore passage.';
        meta = 'Calyptra | Gravitropic amyloplast statocytes | Active absorption';
      } else if (data.id?.includes('ear')) {
        desc = 'Developing maize ear enclosed in protective husks; golden silk styles receive pollen from the apical tassel.';
        meta = 'Physiological Stage: R1 Silking / R2 Blister | Grains: Active filling';
      } else if (data.id?.includes('soil')) {
        desc = 'Stratified pedological soil horizon regulating water retention, bulk density, and nutrient diffusion.';
        meta = 'Horizon Porosity: 46% | Clay content: 28% | Field Cap: 32% VWC';
      } else if (data.id?.includes('ec-ring')) {
        desc = 'Machined 316L stainless steel annular electrode ring with 10 kHz bipolar excitation avoiding electrolysis.';
        meta = 'Analog EC (GPIO34 ADC1_CH6) | EC₂₅ = EC_T / [1 + 0.0191(T-25)]';
      } else if (data.id?.includes('vwc-blade')) {
        desc = 'FR4 PCB high-frequency coplanar dielectric blade calibrated for bulk soil relative permittivity.';
        meta = 'Capacitive VWC (GPIO35 ADC1_CH7) | Topp Equation: θ(ε)';
      } else if (data.id?.includes('temp-tip')) {
        desc = '1-Wire digital temperature capsule probe for continuous real-time EC thermal normalization.';
        meta = 'DS18B20 1-Wire (GPIO4) | Accuracy: ±0.5°C (-10°C to +85°C)';
      } else if (data.id?.includes('esp32')) {
        desc = 'Dual-core Xtensa 32-bit LX7 processor running zero-cloud local edge inference with 0.15mA deep sleep.';
        meta = 'ESP32-S3 | 240MHz, 8MB PSRAM, RTC Timer Wake, 12-Bit ADC';
      } else if (data.id?.includes('streamline') || data.id?.includes('plume')) {
        desc = 'Soil hydrologic matrix flux moving through pore networks towards root absorption surfaces.';
        meta = 'Darcy Matrix Flow | Matric Potential: -33 kPa | Active Uptake';
      }

      document.getElementById('card-desc').innerText = desc;
      document.getElementById('card-meta').innerText = meta;
      componentCard.style.display = 'block';
    }

    document.getElementById('btn-close-card').addEventListener('click', () => {
      componentCard.style.display = 'none';
      selectedComponentObj = null;
    });

    document.getElementById('btn-focus-component').addEventListener('click', () => {
      if (!selectedComponentObj) return;
      sound.playPing(750);
      const targetPos = new THREE.Vector3();
      selectedComponentObj.getWorldPosition(targetPos);
      gsap.to(controls.target, {
        x: targetPos.x,
        y: targetPos.y,
        z: targetPos.z,
        duration: 1.4,
        ease: "power2.inOut"
      });
    });

    /* =========================================================================
       11. THE 10 INTERACTIVE CHAPTERS & SCENARIO CONTROLS
       ========================================================================= */
    const CHAPTERS = [
      {
        tag: "CHAPTER 01 // SURFACE",
        badge: "IMPLEMENTED",
        title: "The Living Surface",
        desc: "What happens above the soil begins beneath it. A mature maize plant (<em>Zea mays</em>) grows in natural agricultural daylight. Rotate and inspect the above-ground canopy before the subterranean descent.",
        camPos: new THREE.Vector3(3.4, 0.6, 5.6),
        camTarget: new THREE.Vector3(0, -0.15, 0),
        setup: () => {
          collapseLayers();
          assembleAnatomy();
          assembleHardware();
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Descent Trigger</span>
              <button class="btn-action-small" id="btn-begin-descent"><i data-lucide="arrow-down" style="width:12px; height:12px;"></i> Descend Below Ground</button>
            </div>
          \`);
          document.getElementById('btn-begin-descent').addEventListener('click', () => setChapter(1));
        }
      },
      {
        tag: "CHAPTER 02 // GEOLOGICAL DESCENT",
        badge: "IMPLEMENTED",
        title: "Descent Into the Soil",
        desc: "The camera dives beneath the surface, revealing stratified geological soil horizons: Horizon O (litter), Horizon A (humus topsoil), Horizon B (compacted subsoil), and Horizon C (gravel drainage).",
        camPos: new THREE.Vector3(3.8, -0.6, 4.8),
        camTarget: new THREE.Vector3(0, -0.85, 0),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Layer Separation</span>
              <input type="range" class="range-slider" id="slider-layers" min="0" max="100" value="0">
            </div>
            <div class="module-row" style="margin-top:6px;">
              <button class="btn-action-small" id="btn-explode-layers">Explode Layers</button>
              <button class="btn-action-small" id="btn-collapse-layers">Collapse</button>
            </div>
          \`);
          const slider = document.getElementById('slider-layers');
          slider.addEventListener('input', (e) => applyLayerSeparation(e.target.value / 100));
          document.getElementById('btn-explode-layers').addEventListener('click', () => { slider.value = 100; applyLayerSeparation(1.0); });
          document.getElementById('btn-collapse-layers').addEventListener('click', () => { slider.value = 0; applyLayerSeparation(0.0); });
        }
      },
      {
        tag: "CHAPTER 03 // PLANT DISSECTION",
        badge: "IMPLEMENTED",
        title: "The Plant Dissection",
        desc: "Anatomical decomposition of the maize organism into leaves, stem, developing ears, crown brace roots, main seminal roots, lateral feeder roots, and active meristematic root caps.",
        camPos: new THREE.Vector3(2.4, 0.4, 4.4),
        camTarget: new THREE.Vector3(0.35, 0.15, 0.2),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Anatomy Separation</span>
              <input type="range" class="range-slider" id="slider-anatomy" min="0" max="100" value="0">
            </div>
            <div class="module-row" style="margin-top:6px;">
              <button class="btn-action-small" id="btn-isolate-roots">Isolate Roots</button>
              <button class="btn-action-small" id="btn-reassemble-plant">Reassemble</button>
            </div>
          \`);
          const slider = document.getElementById('slider-anatomy');
          slider.addEventListener('input', (e) => applyAnatomyExplosion(e.target.value / 100));
          document.getElementById('btn-isolate-roots').addEventListener('click', () => {
            gsap.to(anatomyParts.leaves.position, { y: 2.2, duration: 0.8 });
            gsap.to(anatomyParts.sheaths.position, { y: 1.8, duration: 0.8 });
            gsap.to(anatomyParts.ears.position, { y: 1.6, duration: 0.8 });
            gsap.to(anatomyParts.stem.position, { y: 1.4, duration: 0.8 });
          });
            gsap.to(anatomyParts.ears.position, { y: 1.8, duration: 0.8 });
            gsap.to(anatomyParts.stem.position, { y: 1.4, duration: 0.8 });
          });
          document.getElementById('btn-reassemble-plant').addEventListener('click', () => {
            slider.value = 0;
            assembleAnatomy();
          });
        }
      },
      {
        tag: "CHAPTER 04 // WATER WORLD",
        badge: "SIMULATED",
        title: "The Hidden Water World",
        desc: "Visualization of irrigation infiltration, matric pore redistribution, and root xylem water uptake. Adjust input water volume to observe hydration dynamics.",
        camPos: new THREE.Vector3(3.2, -0.4, 4.2),
        camTarget: new THREE.Vector3(0, -0.7, 0),
        setup: () => {
          collapseLayers();
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Water Input (mm)</span>
              <input type="range" class="range-slider" id="slider-water-input" min="5" max="50" value="20">
            </div>
            <div class="module-row" style="margin-top:6px;">
              <button class="btn-action-small" id="btn-trigger-irrigation" style="width:100%; justify-content:center;">
                <i data-lucide="cloud-rain" style="width:12px; height:12px;"></i> Trigger Irrigation Pulse
              </button>
            </div>
          \`);
          document.getElementById('btn-trigger-irrigation').addEventListener('click', () => {
            sound.playWaterInfiltration();
            const mm = document.getElementById('slider-water-input').value;
            gsap.to(simState, {
              vwcRaw: Math.min(42.0, simState.vwcRaw + mm * 0.45),
              ecRaw: Math.max(0.8, simState.ecRaw * 0.9),
              duration: 1.8,
              onUpdate: calculateAgronomicEngine
            });
          });
        }
      },
      {
        tag: "CHAPTER 05 // NUTRIENT CHEMISTRY",
        badge: "SIMULATED",
        title: "Nutrients & Soil Chemistry",
        desc: "<strong>Scientific Clarification:</strong> Soil EC measures bulk electrolytic conductivity (total dissolved ions), NOT individual N, P, or K concentrations. Nutrient pathways are shown here as a conceptual educational model.",
        camPos: new THREE.Vector3(-2.8, -0.8, 3.8),
        camTarget: new THREE.Vector3(0, -0.9, 0),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Ion Transport Mode</span>
              <select id="select-nutrient-ion" style="background:#000; color:#fff; border:1px solid #333; padding:4px 6px; border-radius:4px; font-family:var(--font-mono); font-size:0.65rem;">
                <option value="ec">Bulk Electrical Conductivity (EC)</option>
                <option value="n">Nitrogen (NO3- / Mass Flow)</option>
                <option value="p">Phosphorus (H2PO4- / Diffusion)</option>
                <option value="k">Potassium (K+ / Root Contact)</option>
              </select>
            </div>
            <div style="font-size:0.62rem; color:var(--text-muted); margin-top:6px; line-height:1.4;">
              * EC measures total dissolved electrolytic ion conductance, not individual chemical species.
            </div>
          \`);
        }
      },
      {
        tag: "CHAPTER 06 // SENSOR REVEAL",
        badge: "MEASURED",
        title: "The Sensor Reveal",
        desc: "Inspect the physical sensor suite embedded in the root zone: dual stainless steel electrode rings (analog EC on GPIO34), FR4 capacitive blade (VWC on GPIO35), and DS18B20 1-wire thermal probe (GPIO4).",
        camPos: new THREE.Vector3(-0.55, -0.4, 2.0),
        camTarget: new THREE.Vector3(-0.55, -0.7, -0.35),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Sensor Sampling</span>
              <button class="btn-action-small" id="btn-sample-sensors"><i data-lucide="zap" style="width:12px; height:12px;"></i> Read 12-Bit ADC</button>
            </div>
            <div class="module-row" style="margin-top:6px;">
              <span style="font-family:var(--font-mono); font-size:0.65rem; color:var(--accent-cyan);">ADC1_CH6: 1840 | ADC1_CH7: 2110</span>
            </div>
          \`);
          document.getElementById('btn-sample-sensors').addEventListener('click', () => {
            sound.playPing(920);
          });
        }
      },
      {
        tag: "CHAPTER 07 // HARDWARE EXPLOSION",
        badge: "IMPLEMENTED",
        title: "Hardware Assembly Explosion",
        desc: "Cinematic vertical exploded view of the Zerthiva $30 Node: 5W solar wafer, 360° Fresnel RGB beacon, ASA housing, ESP32 MCU, 18650 cell, and soil probe stem.",
        camPos: new THREE.Vector3(-0.55, 1.2, 2.8),
        camTarget: new THREE.Vector3(-0.55, 0.4, -0.35),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Hardware View</span>
              <button class="btn-action-small" id="btn-explode-hw">Explode Assembly</button>
              <button class="btn-action-small" id="btn-assemble-hw">Reassemble</button>
            </div>
            <div class="module-row" style="margin-top:6px;">
              <span style="font-family:var(--font-mono); font-size:0.65rem; color:var(--accent-emerald);">TOTAL BOM: $30.00 EX-FACTORY</span>
            </div>
          \`);
          document.getElementById('btn-explode-hw').addEventListener('click', () => explodeHardware());
          document.getElementById('btn-assemble-hw').addEventListener('click', () => assembleHardware());
          explodeHardware();
        }
      },
      {
        tag: "CHAPTER 08 // MONITORING SEQUENCE",
        badge: "IMPLEMENTED",
        title: "The Monitoring Sequence",
        desc: "Step through the 9-stage engineering execution pipeline: Deep Sleep Wake (0.15mA) &rarr; Sensor Excitation &rarr; ADC Conversion &rarr; 25°C Normalization &rarr; Maas-Hoffman Evaluation &rarr; Output Dispatch.",
        camPos: new THREE.Vector3(0, 0.2, 4.8),
        camTarget: new THREE.Vector3(0, 0.1, 0),
        setup: () => {
          assembleHardware();
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Pipeline Stage</span>
              <span id="label-seq-step" style="font-family:var(--font-mono); font-size:0.68rem; color:var(--accent-emerald);">STAGE 1/9: WAKE</span>
            </div>
            <div class="module-row" style="margin-top:6px;">
              <button class="btn-action-small" id="btn-step-sequence"><i data-lucide="play" style="width:12px; height:12px;"></i> Step Pipeline</button>
              <button class="btn-action-small" id="btn-auto-sequence">Run All</button>
            </div>
          \`);
          let seqIdx = 1;
          const seqSteps = [
            "STAGE 1/9: ESP32 DEEP-SLEEP WAKE (0.15mA)",
            "STAGE 2/9: 10 kHz AC PROBE POLARIZATION",
            "STAGE 3/9: 12-BIT ADC SAMPLING (CH6/CH7)",
            "STAGE 4/9: DS18B20 1-WIRE TEMPERATURE READ",
            "STAGE 5/9: 25°C COMPENSATION (alpha=0.0191)",
            "STAGE 6/9: VWC% DIELECTRIC CALIBRATION",
            "STAGE 7/9: MAAS-HOFFMAN COMPARISON (1.70)",
            "STAGE 8/9: TRI-COLOR BEACON & GSM DISPATCH",
            "STAGE 9/9: MICRO-SD SPI ROLLING LOG FLUSH"
          ];
          document.getElementById('btn-step-sequence').addEventListener('click', () => {
            sound.playPing(600 + seqIdx * 50);
            document.getElementById('label-seq-step').innerText = seqSteps[seqIdx - 1];
            seqIdx = (seqIdx % 9) + 1;
          });
          document.getElementById('btn-auto-sequence').addEventListener('click', () => {
            seqIdx = 1;
            const timer = setInterval(() => {
              if (seqIdx > 9) { clearInterval(timer); return; }
              sound.playPing(600 + seqIdx * 50);
              document.getElementById('label-seq-step').innerText = seqSteps[seqIdx - 1];
              seqIdx++;
            }, 600);
          });
        }
      },
      {
        tag: "CHAPTER 09 // DECISION ENGINE",
        badge: "IMPLEMENTED",
        title: "The Decision Engine",
        desc: "Spatial software network graph showing zero-cloud local edge inference: Sensor Input &rarr; Metric Calibration &rarr; FAO-56 Water Balance &rarr; Maas-Hoffman Salinity Evaluator &rarr; Local Alert Dispatcher.",
        camPos: new THREE.Vector3(-1.8, 0.4, 4.2),
        camTarget: new THREE.Vector3(0, 0, 0),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Edge Logic</span>
              <span style="font-family:var(--font-mono); font-size:0.68rem; color:var(--accent-emerald);">MAAS_HOFFMAN_ENGINE</span>
            </div>
            <div class="module-row" style="margin-top:6px;">
              <span style="font-size:0.65rem; color:var(--text-muted);">Threshold: 1.70 dS/m | Yield slope: 12.0%/dS/m</span>
            </div>
          \`);
        }
      },
      {
        tag: "CHAPTER 10 // EXPERIMENTAL LAB",
        badge: "SIMULATED",
        title: "The Experimental Test Lab",
        desc: "Controlled test environment for fault injection, sensor drift, missing data, and boundary tests. Evaluate deterministic pass/fail results against specified project acceptance criteria.",
        camPos: new THREE.Vector3(0, 1.2, 5.8),
        camTarget: new THREE.Vector3(0, 0, 0),
        setup: () => {
          setContextualUI(\`
            <div class="module-row">
              <span class="module-label">Test Scenario</span>
              <select id="select-test-scenario" style="background:#000; color:#fff; border:1px solid #333; padding:4px 6px; border-radius:4px; font-family:var(--font-mono); font-size:0.65rem;">
                <option value="normal">Scenario A: Normal Baseline (EC 1.42)</option>
                <option value="dry">Scenario B: Dry Soil Drought (VWC 11%)</option>
                <option value="moist">Scenario C: Hydrated Field Cap (VWC 32%)</option>
                <option value="lockout">Scenario D: Osmotic Lockout (EC 3.40)</option>
                <option value="disconnect">Scenario E: Sensor Disconnected (Fault)</option>
                <option value="boundary">Scenario F: Threshold Boundary (EC 1.70)</option>
              </select>
            </div>
            <div class="module-row" style="margin-top:6px;">
              <span class="module-label">Result</span>
              <span id="label-test-result" style="font-family:var(--font-mono); font-weight:700; color:var(--accent-emerald);">PASS [STATUS: NOMINAL]</span>
            </div>
          \`);
          document.getElementById('select-test-scenario').addEventListener('change', (e) => {
            const sc = e.target.value;
            const resEl = document.getElementById('label-test-result');
            if (sc === 'normal') {
              simState.faultType = 'NONE'; simState.ecRaw = 1.42; simState.vwcRaw = 31.8;
              resEl.innerText = "PASS [NOMINAL]"; resEl.style.color = "var(--accent-emerald)";
            } else if (sc === 'dry') {
              simState.faultType = 'NONE'; simState.ecRaw = 1.55; simState.vwcRaw = 11.2;
              resEl.innerText = "PASS [PWP WILT DETECTED]"; resEl.style.color = "var(--accent-amber)";
            } else if (sc === 'moist') {
              simState.faultType = 'NONE'; simState.ecRaw = 1.20; simState.vwcRaw = 34.0;
              resEl.innerText = "PASS [FIELD CAP]"; resEl.style.color = "var(--accent-emerald)";
            } else if (sc === 'lockout') {
              simState.faultType = 'NONE'; simState.ecRaw = 3.40; simState.vwcRaw = 20.0;
              resEl.innerText = "PASS [LOCKOUT ALERT SENT]"; resEl.style.color = "var(--accent-crimson)";
              sound.playWarning();
            } else if (sc === 'disconnect') {
              simState.faultType = 'DISCONNECTED';
              resEl.innerText = "PASS [FAULT HANDLED: ZERO_READ]"; resEl.style.color = "var(--accent-crimson)";
              sound.playWarning();
            } else if (sc === 'boundary') {
              simState.faultType = 'NONE'; simState.ecRaw = 1.70; simState.vwcRaw = 26.0;
              resEl.innerText = "PASS [BOUNDARY LIMIT 1.70]"; resEl.style.color = "var(--accent-amber)";
            }
            calculateAgronomicEngine();
          });
        }
      }
    ];

    function setContextualUI(html) {
      document.getElementById('contextual-controls').innerHTML = html;
      lucide.createIcons();
    }

    function setChapter(index) {
      if (index < 0 || index >= CHAPTERS.length) return;
      simState.currentChapter = index;
      sound.playPing(520 + index * 45);

      const ch = CHAPTERS[index];

      document.getElementById('label-chapter-tag').innerText = ch.tag;
      document.getElementById('text-chapter-title').innerHTML = ch.title;
      document.getElementById('text-chapter-desc').innerHTML = ch.desc;
      document.getElementById('label-playback-status').innerText = \`CHAPTER \${index + 1} OF 10\`;
      document.getElementById('badge-evidence-type').innerText = ch.badge;

      document.querySelectorAll('.chapter-node').forEach((node, i) => {
        if (i === index) node.classList.add('active');
        else node.classList.remove('active');
      });

      document.getElementById('timeline-progress-fill').style.width = \`\${((index + 1) / 10) * 100}%\`;

      gsap.to(camera.position, {
        x: ch.camPos.x,
        y: ch.camPos.y,
        z: ch.camPos.z,
        duration: 1.8,
        ease: "power3.inOut"
      });
      gsap.to(controls.target, {
        x: ch.camTarget.x,
        y: ch.camTarget.y,
        z: ch.camTarget.z,
        duration: 1.8,
        ease: "power3.inOut"
      });

      ch.setup();
      calculateAgronomicEngine();
    }

    document.querySelectorAll('.chapter-node').forEach(node => {
      node.addEventListener('click', () => {
        setChapter(parseInt(node.dataset.chapter));
      });
    });

    document.getElementById('btn-next-chapter').addEventListener('click', () => {
      setChapter((simState.currentChapter + 1) % CHAPTERS.length);
    });
    document.getElementById('btn-prev-chapter').addEventListener('click', () => {
      const prev = simState.currentChapter > 0 ? simState.currentChapter - 1 : CHAPTERS.length - 1;
      setChapter(prev);
    });

    document.getElementById('btn-reset-view').addEventListener('click', () => {
      sound.playPing(600);
      collapseLayers();
      assembleAnatomy();
      assembleHardware();
      componentCard.style.display = 'none';
      selectedComponentObj = null;

      // Restore all visibility toggles
      Object.values(visibilityToggles).forEach(cfg => {
        cfg.active = true;
        cfg.el.classList.add('active');
        cfg.target.forEach(t => t.visible = true);
      });

      simState.faultType = 'NONE';
      simState.ecRaw = 1.42;
      simState.vwcRaw = 31.8;
      simState.tempRaw = 24.6;
      calculateAgronomicEngine();

      setChapter(0);
    });

    // Autonomous Narrative Tour
    document.getElementById('btn-play-tour').addEventListener('click', () => {
      simState.autoPlay = !simState.autoPlay;
      const icon = document.getElementById('icon-play-tour');
      if (simState.autoPlay) {
        icon.setAttribute('data-lucide', 'pause');
        sound.playPing(750);
        function loop() {
          setChapter(simState.currentChapter);
          simState.autoPlayTimer = setTimeout(() => {
            if (simState.autoPlay) {
              simState.currentChapter = (simState.currentChapter + 1) % CHAPTERS.length;
              loop();
            }
          }, 7000);
        }
        loop();
      } else {
        icon.setAttribute('data-lucide', 'play');
        clearTimeout(simState.autoPlayTimer);
      }
      lucide.createIcons();
    });

    /* =========================================================================
       12. CINEMATIC OPENING CAMERA SEQUENCE
       ========================================================================= */
    let openingTimeline = null;
    const skipBtn = document.getElementById('btn-skip-intro');

    function startCinematicOpening() {
      skipBtn.style.display = 'block';

      camera.position.set(0, 3.2, 7.8);
      controls.target.set(0, 0.8, 0);
      controls.enabled = false;

      openingTimeline = gsap.timeline({
        onComplete: () => {
          finishOpeningSequence();
        }
      });

      openingTimeline.to(camera.position, { x: 2.2, y: 1.4, z: 5.5, duration: 3.0, ease: "power2.inOut" })
        .to(controls.target, { x: 0.2, y: 0.4, z: 0.1, duration: 3.0, ease: "power2.inOut" }, "<")
        .to(camera.position, { x: 3.8, y: -0.3, z: 4.8, duration: 3.5, ease: "power2.inOut" })
        .to(controls.target, { x: 0, y: -0.6, z: 0, duration: 3.5, ease: "power2.inOut" }, "<")
        .to(camera.position, { x: 1.8, y: -0.7, z: 3.2, duration: 3.0, ease: "power2.inOut" })
        .to(controls.target, { x: 0.2, y: -0.9, z: 0.1, duration: 3.0, ease: "power2.inOut" }, "<")
        .call(() => { sound.playPing(750); })
        .to(camera.position, { x: -0.55, y: -0.4, z: 2.2, duration: 2.5, ease: "power2.inOut" })
        .to(controls.target, { x: -0.55, y: -0.65, z: -0.35, duration: 2.5, ease: "power2.inOut" }, "<")
        .call(() => { sound.playPing(920); })
        .to(camera.position, { x: -0.55, y: 0.9, z: 2.5, duration: 2.0, ease: "power2.inOut" })
        .to(controls.target, { x: -0.55, y: 0.5, z: -0.35, duration: 2.0, ease: "power2.inOut" }, "<")
        .to(camera.position, { x: 3.4, y: 0.6, z: 5.6, duration: 3.0, ease: "power3.inOut" })
        .to(controls.target, { x: 0, y: -0.15, z: 0, duration: 3.0, ease: "power3.inOut" }, "<");
    }

    function finishOpeningSequence() {
      if (openingTimeline) openingTimeline.kill();
      skipBtn.style.display = 'none';
      controls.enabled = true;
      gsap.to(camera.position, { x: 3.4, y: 0.6, z: 5.6, duration: 1.0 });
      gsap.to(controls.target, { x: 0, y: -0.15, z: 0, duration: 1.0 });
      setChapter(0);
    }

    skipBtn.addEventListener('click', () => {
      finishOpeningSequence();
    });

    /* =========================================================================
       13. SIGNATURE CONTINUOUS INTERACTION: "REVEAL THE HIDDEN SYSTEM"
       ========================================================================= */
    document.getElementById('btn-signature-reveal').addEventListener('click', () => {
      sound.playPing(880);
      const tl = gsap.timeline();

      tl.to(camera.position, { x: 3.8, y: -0.4, z: 5.2, duration: 2.0, ease: "power2.inOut" })
        .to(controls.target, { x: 0, y: -0.6, z: 0, duration: 2.0, ease: "power2.inOut" }, "<")
        .call(() => { applyLayerSeparation(0.8); sound.playPing(520); })
        .call(() => { explodeHardware(); sound.playPing(680); })
        .to(camera.position, { x: -0.55, y: 0.8, z: 3.2, duration: 2.0, ease: "power2.inOut" })
        .to(controls.target, { x: -0.55, y: 0.4, z: -0.35, duration: 2.0, ease: "power2.inOut" }, "<")
        .call(() => { sound.playPing(1046); });
    });

    /* =========================================================================
       14. GEOLOGICAL & HARDWARE PHYSICAL ANIMATIONS
       ========================================================================= */
    function applyLayerSeparation(val) {
      gsap.to(horizonOGroup.position, { y: val * 0.45, duration: 0.4 });
      gsap.to(horizonAGroup.position, { y: val * 0.15, duration: 0.4 });
      gsap.to(horizonBGroup.position, { y: -val * 0.25, duration: 0.4 });
      gsap.to(horizonCGroup.position, { y: -val * 0.65, duration: 0.4 });
    }

    function collapseLayers() {
      applyLayerSeparation(0.0);
    }

    function applyAnatomyExplosion(val) {
      gsap.to(anatomyParts.leaves.position,        { y: val * 0.85, duration: 0.4 });
      gsap.to(anatomyParts.sheaths.position,       { y: val * 0.45, duration: 0.4 });
      if (anatomyParts.ears) gsap.to(anatomyParts.ears.position, { y: val * 0.60, duration: 0.4 });
      gsap.to(anatomyParts.stem.position,          { y: val * 0.20, duration: 0.4 });
      gsap.to(anatomyParts.braceRoots.position,    { y: -val * 0.15, duration: 0.4 });
      gsap.to(anatomyParts.crownRoots.position,    { y: -val * 0.35, duration: 0.4 });
      gsap.to(anatomyParts.seminalRoots.position,  { y: -val * 0.55, duration: 0.4 });
      gsap.to(anatomyParts.lateralRoots.position,  { y: -val * 0.65, duration: 0.4 });
      gsap.to(anatomyParts.rootTips.position,      { y: -val * 0.75, duration: 0.4 });
    });
    }

    function assembleAnatomy() {
      applyAnatomyExplosion(0.0);
    }

    function explodeHardware() {
      sound.playPing(720);
      const dur = 1.0;
      const ease = "back.out(1.4)";
      gsap.to(hwParts.solarWafer.position,  { y: 2.1, duration: dur, ease });
      gsap.to(hwParts.sentryRing.position,  { y: 1.5, duration: dur, ease });
      gsap.to(hwParts.enclosure.position,   { y: 0.35, duration: dur, ease });
      gsap.to(hwParts.esp32Core.position,   { x: -0.5, y: 0.6, duration: dur, ease });
      gsap.to(hwParts.batteryPack.position, { x: 0.5, y: 0.6, duration: dur, ease });
      gsap.to(hwParts.probeShaft.position,  { y: -0.85, duration: dur, ease });
    }

    function assembleHardware() {
      const dur = 0.8;
      const ease = "power3.out";
      gsap.to(hwParts.solarWafer.position,  { y: 1.05, duration: dur, ease });
      gsap.to(hwParts.sentryRing.position,  { y: 0.94, duration: dur, ease });
      gsap.to(hwParts.enclosure.position,   { y: 0.0, duration: dur, ease });
      gsap.to(hwParts.esp32Core.position,   { x: 0.0, y: 0.0, duration: dur, ease });
      gsap.to(hwParts.batteryPack.position, { x: 0.0, y: 0.0, duration: dur, ease });
      gsap.to(hwParts.probeShaft.position,  { y: 0.0, duration: dur, ease });
    }

    /* =========================================================================
       15. MODAL INSPECTOR & CITATIONS
       ========================================================================= */
    const modal = document.getElementById('inspector-modal');
    const modalBody = document.getElementById('modal-body-content');
    document.getElementById('btn-close-modal').addEventListener('click', () => {
      sound.playPing(440);
      modal.classList.remove('active');
    });

    document.getElementById('hotspot-probe').addEventListener('click', () => {
      sound.playPing(880);
      modalBody.innerHTML = \`
        <h3 style="font-family:var(--font-display); font-size:1.3rem; color:var(--accent-emerald); margin-bottom:8px;">
          EC & Dielectric Subsurface Probe
        </h3>
        <p style="font-size:0.82rem; line-height:1.55; color:var(--text-muted); margin-bottom:12px;">
          Positioned directly at the 15–25cm maize active root horizon. Employs 10 kHz AC waveform excitation to avoid electrolysis polarization while calculating temperature-normalized bulk Electrical Conductivity.
        </p>
        <div style="background:rgba(0,0,0,0.4); padding:10px 14px; border-radius:8px; font-family:var(--font-mono); font-size:0.72rem; color:var(--accent-cyan); margin-bottom:10px;">
          EC₂₅ = EC_T / [1 + 0.0191 × (T_soil - 25)]
        </div>
        <div style="font-size:0.75rem; color:var(--text-dim);">
          Pinout: GPIO34 (ADC1_CH6 Analog EC), GPIO35 (ADC1_CH7 Capacitive VWC), GPIO4 (DS18B20 1-Wire).
        </div>
      \`;
      modal.classList.add('active');
    });

    document.getElementById('hotspot-node').addEventListener('click', () => {
      sound.playPing(880);
      modalBody.innerHTML = \`
        <h3 style="font-family:var(--font-display); font-size:1.3rem; color:var(--accent-cyan); margin-bottom:8px;">
          Zerthiva $30 Edge Gateway
        </h3>
        <p style="font-size:0.82rem; line-height:1.55; color:var(--text-muted); margin-bottom:12px;">
          100% off-grid autonomous edge computer engineered for zero-cloud rural deployment. Runs local MicroPython/PlatformIO firmware with Maas-Hoffman and FAO-56 decision logic.
        </p>
        <ul style="font-size:0.78rem; line-height:1.6; color:var(--text-main); margin-left:18px;">
          <li><strong>MCU:</strong> Xiao ESP32-S3 (240MHz Xtensa dual-core, 0.15mA sleep)</li>
          <li><strong>Power:</strong> 5W Monocrystal PV array + TP4056 + 18650 2,200mAh cell</li>
          <li><strong>Visual Feedback:</strong> 360° Fresnel RGB LED beacon (GPIO25/26/27)</li>
          <li><strong>Uplink:</strong> SIM800L GSM cellular SMS dispatcher (UART2 GPIO16/17)</li>
        </ul>
      \`;
      modal.classList.add('active');
    });

    const btnCitations = document.getElementById('btn-open-citations');
    if (btnCitations) {
      btnCitations.addEventListener('click', () => {
        sound.playPing(880);
        modalBody.innerHTML = \`
          <h3 style="font-family:var(--font-display); font-size:1.3rem; color:var(--accent-emerald); margin-bottom:8px;">
            3D Asset Licenses & Scientific Citations
          </h3>
          <p style="font-size:0.8rem; line-height:1.6; color:var(--text-muted); margin-bottom:14px;">
            Zerthiva SIS integrates physically based rendering, verified open agronomic standards, and open-source embedded hardware CAD assets.
          </p>

          <div style="background:rgba(0,0,0,0.45); padding:12px 14px; border-radius:8px; border:1px solid var(--border-subtle); margin-bottom:12px;">
            <div style="color:var(--accent-cyan); font-weight:700; font-size:0.75rem; margin-bottom:6px;">1. Poly Haven CC0 PBR Assets</div>
            <ul style="font-size:0.72rem; line-height:1.6; color:var(--text-muted); list-style:none; padding-left:0;">
              <li>• <strong style="color:var(--text-main);">Dirt 1k:</strong> Topsoil diffuse, normal, and roughness maps (<a href="https://polyhaven.com/a/dirt" target="_blank" style="color:var(--accent-cyan); text-decoration:none;">Poly Haven CC0</a>).</li>
              <li>• <strong style="color:var(--text-main);">Brown Mud 02 1k:</strong> Subsoil clay diffuse, normal, and roughness maps (<a href="https://polyhaven.com/a/brown_mud_02" target="_blank" style="color:var(--accent-cyan); text-decoration:none;">Poly Haven CC0</a>).</li>
              <li>• <strong style="color:var(--text-main);">Autumn Field 1k HDRI:</strong> Physically based outdoor Image-Based Lighting environment (<a href="https://polyhaven.com/a/autumn_field" target="_blank" style="color:var(--accent-cyan); text-decoration:none;">Poly Haven CC0</a>).</li>
            </ul>
          </div>

          <div style="background:rgba(0,0,0,0.45); padding:12px 14px; border-radius:8px; border:1px solid var(--border-subtle); margin-bottom:12px;">
            <div style="color:var(--accent-emerald); font-weight:700; font-size:0.75rem; margin-bottom:6px;">2. Open-Source Hardware 3D Model</div>
            <div style="font-size:0.72rem; line-height:1.6; color:var(--text-muted);">
              • <strong style="color:var(--text-main);">Xiao ESP32-S3 CAD Assembly:</strong> Standard 240MHz dual-core module (<a href="https://github.com/mfranzon/circuitiny" target="_blank" style="color:var(--accent-emerald); text-decoration:none;">Circuitiny / mfranzon</a>, MIT License).
            </div>
          </div>

          <div style="background:rgba(0,0,0,0.45); padding:12px 14px; border-radius:8px; border:1px solid var(--border-subtle);">
            <div style="color:var(--accent-amber); font-weight:700; font-size:0.75rem; margin-bottom:6px;">3. Scientific References</div>
            <ul style="font-size:0.72rem; line-height:1.6; color:var(--text-muted); list-style:none; padding-left:0;">
              <li>• <strong style="color:var(--text-main);">Maas, E.V. & Hoffman, G.J. (1977):</strong> <em>Crop Salt Tolerance—Evaluation of Existing Data</em>. ASCE J. Irrig. Drain. Div. Threshold 1.70 dS/m, slope 12.0%/dS/m.</li>
              <li>• <strong style="color:var(--text-main);">FAO Irrigation & Drainage Papers 29 & 56:</strong> Water Quality for Agriculture & Crop Evapotranspiration Guidelines.</li>
              <li>• <strong style="color:var(--text-main);">US Salinity Laboratory Handbook 60:</strong> Diagnosis and Improvement of Saline and Alkali Soils.</li>
            </ul>
          </div>
        \`;
        modal.classList.add('active');
      });
    }

    /* =========================================================================
       16. ANIMATION & RENDER LOOP (60 FPS)
       ========================================================================= */
    const clock = new THREE.Clock();

    function updateHotspotPosition(id, worldVector) {
      const pin = document.getElementById(id);
      if (!pin) return;
      const v = worldVector.clone();
      v.project(camera);
      if (v.z < 1) {
        const x = (v.x * 0.5 + 0.5) * window.innerWidth;
        const y = (-v.y * 0.5 + 0.5) * window.innerHeight;
        pin.style.left = \`\${x}px\`;
        pin.style.top = \`\${y}px\`;
        pin.style.display = 'flex';
      } else {
        pin.style.display = 'none';
      }
    }

    function animate() {
      requestAnimationFrame(animate);

      const t = clock.getElapsedTime();

      // Organic leaf motion in gentle agricultural breeze
      leafMeshes.forEach((leafGroup, i) => {
        leafGroup.rotation.z = Math.sin(t * 1.5 + i * 0.75) * 0.022;
      });

      // Beacon LED soft pulse
      if (simState.status === 'SAFE') {
        const pulse = 1.1 + Math.sin(t * 3.2) * 0.3;
        sentryMat.emissiveIntensity = pulse;
        sentryPointLight.intensity = pulse * 1.5;
      } else {
        const strobe = (Math.sin(t * 14.0) > 0) ? 2.8 : 0.2;
        sentryMat.emissiveIntensity = strobe;
        sentryPointLight.intensity = strobe * 2.2;
      }

      // Animate water pulses along hydraulic streamlines
      if (hydrologyGroup.visible) {
        pulseMeshes.forEach(pm => {
          pm.userData.offset = (pm.userData.offset + 0.0035) % 1.0;
          const curve = streamlineCurves[pm.userData.curveIdx];
          if (curve) {
            const pt = curve.getPointAt(pm.userData.offset);
            pm.position.copy(pt);
          }
        });
      }

      // Hotspot projections
      updateHotspotPosition('hotspot-probe', new THREE.Vector3(-0.55, -0.65, -0.35));
      updateHotspotPosition('hotspot-node', new THREE.Vector3(-0.55, 0.95, -0.35));

      controls.update();
      renderer.render(scene, camera);
    }

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // Start with the opening cinematic sweep
    startCinematicOpening();
    animate();
  </script>
</body>
</html>
`;

fs.writeFileSync('c:\\Users\\mutin\\OneDrive\\Belgeler\\innovation\\zerthiva_interactive_3d.html', htmlContent, 'utf8');
console.log('Successfully generated zerthiva_interactive_3d.html');
