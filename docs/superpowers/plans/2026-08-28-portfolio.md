# Munish Bhardwaj Portfolio — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page scrollytelling DevOps portfolio with workshop metaphor, 4 case study subpages, Lenis smooth scroll, and GSAP parallax.

**Architecture:** Vanilla HTML/CSS/JS, zero build step. index.html is the main scrolling page with 7 scroll sections. Each of the 4 case studies gets its own HTML file using a shared template pattern. All motion is driven by Lenis (inertial scroll) + GSAP ScrollTrigger (parallax transforms). No opacity-fade-in animations — depth illusion via translate/scale only.

**Tech Stack:** HTML5, CSS3 custom properties, vanilla JS ES6+, Lenis v1.0.42 (CDN), GSAP 3.12.5 + ScrollTrigger (CDN), Clash Grotesk (Fontshare CDN), Inter (Google Fonts CDN)

**Spec:** Brainstorming session 2026-08-28. Content source: `Portfolio-Content-Munish-Bhardwaj.md`. Style source: `andrewsbodega.md`.

## Global Constraints

- Colors exactly: `--blue: #194DC4`, `--red: #DA0D00`, `--black: #141413`, `--card-bg: #FAFAFA`, `--page-bg: #F0F0F0`, `--navy: #0D2040`
- Buttons: `border-radius: 100px`, `background: #194DC4`, `color: #fff`, `padding: 10px 20px`, `font-family: 'Clash Grotesk'`, `font-weight: 700`, `font-size: 15px`, no border, no box-shadow
- Cards: `background: #FAFAFA`, `border: 2px solid #0D2040`, `border-radius: 15px`, `box-shadow: 10px 12px 12px rgba(0,0,0,0.27)`
- Badges: micro-tilt via `transform: rotate(var(--tilt))`, range ±5–20deg, each badge sets its own `--tilt` inline
- No comments in HTML/CSS/JS unless the WHY is non-obvious
- Verify each task by opening `index.html` (or the relevant file) in a browser

---

### Task 1: Project scaffold — CSS design system + base layout

**Files:**
- Create: `css/style.css`
- Create: `index.html` (shell only, no sections yet)

**Interfaces:**
- Produces: CSS custom properties consumed by all subsequent tasks; `<body>` shell with grain overlay and nav consumed by Tasks 2–6

- [ ] **Step 1: Create `css/style.css` with design system**

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@700,600,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue: #194DC4;
  --red: #DA0D00;
  --black: #141413;
  --navy: #0D2040;
  --card-bg: #FAFAFA;
  --page-bg: #F0F0F0;
  --card-shadow: 10px 12px 12px rgba(0,0,0,0.27);
  --card-radius: 15px;
  --card-border: 2px solid var(--navy);
  --font-display: 'Clash Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

html { background: var(--page-bg); }

body {
  font-family: var(--font-body);
  color: var(--black);
  background: var(--page-bg);
  overflow-x: hidden;
}

/* Grain overlay */
body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}

/* Nav */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 40px;
  mix-blend-mode: multiply;
}

.nav-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--navy);
  letter-spacing: -0.02em;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-links a {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--navy);
  text-decoration: none;
  letter-spacing: -0.01em;
}

/* Pill button */
.btn {
  display: inline-block;
  background: var(--blue);
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  padding: 10px 22px;
  border-radius: 100px;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: opacity 0.15s;
}

.btn:hover { opacity: 0.85; }

.btn-ghost {
  background: transparent;
  color: var(--navy);
  border: 2px solid var(--navy);
}

.btn-ghost:hover { background: var(--navy); color: #fff; opacity: 1; }

/* Section base */
section {
  position: relative;
  width: 100%;
}

/* Card shell */
.card {
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
}

/* Pegboard dot-grid */
.pegboard-bg {
  background-color: var(--card-bg);
  background-image: radial-gradient(circle, var(--navy) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
}

/* Red section label */
.section-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--red);
}

/* Skill badge */
.skill-badge {
  display: inline-flex;
  flex-direction: column;
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: 10px;
  padding: 12px 16px;
  box-shadow: 6px 7px 0px rgba(0,0,0,0.18);
  transform: rotate(var(--tilt, 0deg));
  min-width: 120px;
}

.badge-name {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 16px;
  color: var(--navy);
  letter-spacing: -0.02em;
}

.badge-tag {
  font-family: var(--font-body);
  font-size: 11px;
  color: var(--red);
  margin-top: 3px;
}

/* Notecard */
.notecard {
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: 32px;
  max-width: 420px;
}

.notecard-heading {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 28px;
  color: var(--red);
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

/* Impact stat */
.impact-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(48px, 6vw, 80px);
  color: var(--blue);
  line-height: 1;
  letter-spacing: -0.04em;
}

.impact-label {
  font-family: var(--font-body);
  font-size: 14px;
  color: var(--black);
  margin-top: 4px;
}

/* Responsive base */
@media (max-width: 768px) {
  .nav { padding: 16px 20px; }
}
```

- [ ] **Step 2: Create `index.html` shell**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Munish Bhardwaj — DevOps Engineer</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="nav">
    <span class="nav-logo">MB</span>
    <div class="nav-links">
      <a href="#work">Case Studies</a>
      <a href="#contact">Contact</a>
    </div>
  </nav>

  <!-- Sections go here in Tasks 2–6 -->

  <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.42/bundled/lenis.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Create `js/main.js` stub**

```javascript
gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);
```

- [ ] **Step 4: Open `index.html` in browser — verify**
  - Nav renders fixed top with "MB" logo and two links
  - Page background is `#F0F0F0`
  - Console shows no errors (Lenis/GSAP loaded from CDN)

---

### Task 2: Hero — Workshop exterior section

**Files:**
- Modify: `index.html` (add section between nav and scripts)
- Modify: `css/style.css` (append workshop exterior styles)

**Interfaces:**
- Consumes: `.btn`, `.nav`, CSS variables from Task 1
- Produces: `.workshop-exterior` section with `.door-left` / `.door-right` elements consumed by Task 7 (GSAP animations)

- [ ] **Step 1: Add workshop exterior HTML inside `<body>` after `<nav>`**

```html
<section class="workshop-exterior" id="hero">
  <div class="workshop-facade">
    <div class="workshop-sky"></div>
    <div class="workshop-building">
      <div class="workshop-sign">
        <span class="sign-text">MUNISH'S WORKSHOP</span>
        <span class="sign-sub">DevOps · Infrastructure · Cloud</span>
      </div>
      <div class="door-frame">
        <div class="door-panel door-left"></div>
        <div class="door-panel door-right"></div>
        <div class="door-interior pegboard-bg"></div>
      </div>
    </div>
  </div>

  <div class="hero-content">
    <p class="section-label">DevOps Engineer · Chandigarh, India</p>
    <h1 class="hero-headline">Building infrastructure<br>that scales.</h1>
    <p class="hero-sub">I build systems that let banking-scale teams ship without holding their breath. Multi-cloud infrastructure, zero-trust identity, CI/CD that actually gates releases.</p>

    <div class="hero-stat-strip">
      <div class="hero-stat">
        <span class="hero-stat-num">3+</span>
        <span class="hero-stat-label">Years</span>
      </div>
      <div class="hero-stat-divider"></div>
      <div class="hero-stat">
        <span class="hero-stat-num">24</span>
        <span class="hero-stat-label">Incidents resolved</span>
      </div>
      <div class="hero-stat-divider"></div>
      <div class="hero-stat">
        <span class="hero-stat-num">0</span>
        <span class="hero-stat-label">Static secrets remaining</span>
      </div>
    </div>

    <div class="hero-buttons">
      <a href="#work" class="btn">View Work</a>
      <a href="#contact" class="btn btn-ghost">Get in Touch</a>
    </div>

    <div class="competency-chips">
      <span class="chip">Multi-Cloud</span>
      <span class="chip">Zero-Trust Identity</span>
      <span class="chip">Infrastructure as Code</span>
      <span class="chip">Incident Response</span>
      <span class="chip">CI/CD</span>
      <span class="chip">Cross-Team Delivery</span>
    </div>
  </div>

  <div class="scroll-hint">Scroll to enter ↓</div>
</section>
```

- [ ] **Step 2: Append workshop exterior styles to `css/style.css`**

```css
/* ── Workshop Exterior / Hero ── */
.workshop-exterior {
  min-height: 100vh;
  display: grid;
  grid-template-rows: 1fr;
  position: relative;
  overflow: hidden;
}

.workshop-facade {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
}

.workshop-sky {
  flex: 1;
  background: linear-gradient(180deg, #b8d4f0 0%, #daeaff 60%, #f0f0f0 100%);
}

.workshop-building {
  height: 55vh;
  background: #e8e2d8;
  border-top: 3px solid var(--navy);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  padding-top: 24px;
}

.workshop-sign {
  background: var(--navy);
  color: #fff;
  padding: 12px 32px;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 20px;
  box-shadow: 4px 5px 0 rgba(0,0,0,0.25);
}

.sign-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 2.5vw, 28px);
  letter-spacing: 0.04em;
  display: block;
}

.sign-sub {
  font-family: var(--font-body);
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: rgba(255,255,255,0.65);
  display: block;
  margin-top: 4px;
}

.door-frame {
  position: relative;
  width: 200px;
  height: 280px;
  border: 3px solid var(--navy);
  border-bottom: none;
  overflow: hidden;
  border-radius: 4px 4px 0 0;
}

.door-interior {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.door-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: #c8b89a;
  border: 1px solid rgba(0,0,0,0.15);
  z-index: 1;
}

.door-left { left: 0; transform-origin: left center; }
.door-right { right: 0; transform-origin: right center; }

/* Door panel details */
.door-panel::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1.5px solid rgba(0,0,0,0.2);
  border-radius: 2px;
}

/* Hero content */
.hero-content {
  position: relative;
  z-index: 10;
  max-width: 720px;
  margin: 0 auto;
  padding: 120px 40px 80px;
  text-align: center;
}

.hero-headline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(40px, 6vw, 80px);
  color: var(--navy);
  line-height: 1.0;
  letter-spacing: -0.03em;
  margin: 12px 0 20px;
}

.hero-sub {
  font-size: 17px;
  line-height: 1.6;
  color: var(--black);
  max-width: 520px;
  margin: 0 auto 36px;
  opacity: 0.8;
}

.hero-stat-strip {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-bottom: 36px;
  flex-wrap: wrap;
}

.hero-stat { text-align: center; }

.hero-stat-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 36px;
  color: var(--blue);
  letter-spacing: -0.03em;
  display: block;
}

.hero-stat-label {
  font-size: 12px;
  color: var(--black);
  opacity: 0.7;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.hero-stat-divider {
  width: 1px;
  height: 40px;
  background: var(--navy);
  opacity: 0.2;
}

.hero-buttons {
  display: flex;
  gap: 12px;
  justify-content: center;
  margin-bottom: 32px;
  flex-wrap: wrap;
}

.competency-chips {
  display: flex;
  gap: 8px;
  justify-content: center;
  flex-wrap: wrap;
}

.chip {
  font-family: var(--font-display);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
  background: var(--navy);
  color: #fff;
  padding: 5px 12px;
  border-radius: 100px;
  opacity: 0.75;
}

.scroll-hint {
  position: absolute;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  font-family: var(--font-body);
  font-size: 13px;
  color: var(--navy);
  opacity: 0.5;
  z-index: 10;
  animation: nudge 2s ease-in-out infinite;
}

@keyframes nudge {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(6px); }
}
```

- [ ] **Step 3: Open `index.html` in browser — verify**
  - Workshop facade visible: sky gradient top, beige building bottom, navy workshop sign
  - Door frame with two wooden door panels
  - Hero headline, subline, 3-stat strip, two buttons, 6 chips all render
  - Scroll hint animates up/down

---

### Task 3: Pegboard wall — Skills section

**Files:**
- Modify: `index.html` (add section after `.workshop-exterior`)
- Modify: `css/style.css` (append pegboard section styles)

**Interfaces:**
- Consumes: `.pegboard-bg`, `.skill-badge`, `.section-label` from Task 1
- Produces: `#skills` section with `.badges-grid` consumed by Task 7 (badge entrance animation)

- [ ] **Step 1: Add pegboard/skills HTML after `</section>` of `.workshop-exterior`**

```html
<section class="inside-section pegboard-section" id="skills">
  <div class="inside-header">
    <span class="section-label">Inside the Workshop</span>
    <h2 class="inside-title">The Toolkit</h2>
    <p class="inside-sub">Tools I reach for every day — and a few I reach for when things break.</p>
  </div>

  <div class="badges-grid">
    <div class="skill-badge" style="--tilt: -8deg">
      <span class="badge-name">AWS</span>
      <span class="badge-tag">Daily driver · 3+ yrs</span>
    </div>
    <div class="skill-badge" style="--tilt: 5deg">
      <span class="badge-name">Azure</span>
      <span class="badge-tag">Daily driver · 3+ yrs</span>
    </div>
    <div class="skill-badge" style="--tilt: -4deg">
      <span class="badge-name">Kubernetes</span>
      <span class="badge-tag">EKS · AKS · ROSA</span>
    </div>
    <div class="skill-badge" style="--tilt: 11deg">
      <span class="badge-name">Terraform</span>
      <span class="badge-tag">25+ resource types</span>
    </div>
    <div class="skill-badge" style="--tilt: -14deg">
      <span class="badge-name">GCP</span>
      <span class="badge-tag">Multi-cloud</span>
    </div>
    <div class="skill-badge" style="--tilt: 7deg">
      <span class="badge-name">Python</span>
      <span class="badge-tag">Automation · scripting</span>
    </div>
    <div class="skill-badge" style="--tilt: -6deg">
      <span class="badge-name">GitHub Actions</span>
      <span class="badge-tag">10 workflows built</span>
    </div>
    <div class="skill-badge" style="--tilt: 16deg">
      <span class="badge-name">Playwright</span>
      <span class="badge-tag">198 specs authored</span>
    </div>
    <div class="skill-badge" style="--tilt: -10deg">
      <span class="badge-name">Helm</span>
      <span class="badge-tag">K8s packaging</span>
    </div>
    <div class="skill-badge" style="--tilt: 4deg">
      <span class="badge-name">Jenkins</span>
      <span class="badge-tag">CI/CD pipelines</span>
    </div>
    <div class="skill-badge" style="--tilt: -18deg">
      <span class="badge-name">PostgreSQL</span>
      <span class="badge-tag">Major-version upgrades</span>
    </div>
    <div class="skill-badge" style="--tilt: 9deg">
      <span class="badge-name">Bash</span>
      <span class="badge-tag">Every incident, first tool</span>
    </div>
  </div>

  <div class="philosophy-block">
    <p class="philosophy-text">"If a human has to rotate it, it's a future incident. Automate the credential, not just the fix."</p>
  </div>
</section>
```

- [ ] **Step 2: Append pegboard section styles to `css/style.css`**

```css
/* ── Inside / Pegboard ── */
.inside-section {
  padding: 100px 40px;
  max-width: 1100px;
  margin: 0 auto;
}

.inside-header {
  text-align: center;
  margin-bottom: 64px;
}

.inside-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(36px, 5vw, 60px);
  color: var(--navy);
  letter-spacing: -0.03em;
  margin: 8px 0 12px;
}

.inside-sub {
  font-size: 16px;
  color: var(--black);
  opacity: 0.7;
  max-width: 480px;
  margin: 0 auto;
  line-height: 1.6;
}

.pegboard-section {
  max-width: 100%;
  background: var(--card-bg);
  background-image: radial-gradient(circle, var(--navy) 1.5px, transparent 1.5px);
  background-size: 24px 24px;
  padding: 100px 60px;
}

.pegboard-section .inside-header {
  max-width: 600px;
  margin: 0 auto 64px;
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: 32px 40px;
}

.badges-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto 60px;
}

.philosophy-block {
  max-width: 600px;
  margin: 0 auto;
  background: var(--navy);
  border-radius: var(--card-radius);
  padding: 32px 40px;
  box-shadow: var(--card-shadow);
}

.philosophy-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 2vw, 24px);
  color: #fff;
  line-height: 1.4;
  letter-spacing: -0.02em;
  text-align: center;
}
```

- [ ] **Step 3: Verify in browser**
  - Pegboard dot-grid background covers full section
  - 12 skill badges render at their respective tilts, each with name + red tagline
  - Philosophy quote in navy card at bottom

---

### Task 4: Stats strip + Projects catalog section

**Files:**
- Modify: `index.html` (add two sections after pegboard)
- Modify: `css/style.css` (append stats + catalog styles)

**Interfaces:**
- Consumes: `.card`, `.btn`, `.section-label`, `.pegboard-bg` from Task 1
- Produces: `#work` section with `.project-card` elements linking to case study pages

- [ ] **Step 1: Add stats strip + catalog HTML after pegboard `</section>`**

```html
<section class="stats-strip-section">
  <div class="stats-strip-inner">
    <span class="section-label">Impact at a glance</span>
    <div class="stats-strip">
      <div class="impact-block">
        <span class="impact-num">10+</span>
        <span class="impact-label">Production environments built &amp; operated</span>
      </div>
      <div class="impact-block">
        <span class="impact-num">24</span>
        <span class="impact-label">Documented incidents resolved</span>
      </div>
      <div class="impact-block">
        <span class="impact-num">1,632</span>
        <span class="impact-label">Tests gating every release</span>
      </div>
      <div class="impact-block">
        <span class="impact-num">0</span>
        <span class="impact-label">Static secrets across banking environment</span>
      </div>
      <div class="impact-block">
        <span class="impact-num">34+</span>
        <span class="impact-label">Technical docs authored</span>
      </div>
      <div class="impact-block">
        <span class="impact-num">5</span>
        <span class="impact-label">Countries collaborated across on releases</span>
      </div>
    </div>
  </div>
</section>

<section class="catalog-section" id="work">
  <div class="catalog-header-card card">
    <div class="catalog-header-left">
      <span class="section-label">Selected Work</span>
      <h2 class="catalog-title">Case Studies</h2>
      <p class="catalog-sub">Four flagship engineering stories from production banking infrastructure.</p>
    </div>
    <ul class="catalog-toc">
      <li><a href="case-study-1.html">Zero Static Secrets</a></li>
      <li><a href="case-study-2.html">Cluster Isolation</a></li>
      <li><a href="case-study-3.html">The Outage Runbook</a></li>
      <li><a href="case-study-4.html">Test Suite</a></li>
    </ul>
  </div>

  <div class="projects-pegboard pegboard-bg">
    <div class="project-card card">
      <div class="project-meta">
        <span class="project-tag">IDENTITY &amp; SECURITY · AZURE</span>
        <span class="new-badge">Latest</span>
      </div>
      <h3 class="project-title">Zero Static Secrets, One Banking Cluster</h3>
      <p class="project-blurb">Eliminating every static secret from a Fortune 500 banking environment — passwordless, by design, at scale.</p>
      <div class="project-stats-row">
        <span class="project-stat"><strong>24</strong> Federated credentials</span>
        <span class="project-stat"><strong>0</strong> Static secrets remaining</span>
      </div>
      <a href="case-study-1.html" class="btn">View Case Study</a>
    </div>

    <div class="project-card card">
      <div class="project-meta">
        <span class="project-tag">INFRASTRUCTURE STRATEGY · ROSA / AWS</span>
      </div>
      <h3 class="project-title">Four Options, One Decision: Isolating a Production Cluster</h3>
      <p class="project-blurb">Airgapping a production OpenShift cluster — and choosing the boring option on purpose.</p>
      <div class="project-stats-row">
        <span class="project-stat"><strong>4</strong> Approaches evaluated</span>
        <span class="project-stat"><strong>0</strong> New shared dependencies</span>
      </div>
      <a href="case-study-2.html" class="btn">View Case Study</a>
    </div>

    <div class="project-card card">
      <div class="project-meta">
        <span class="project-tag">INCIDENT RESPONSE · KUBERNETES</span>
      </div>
      <h3 class="project-title">The Outage That Became a Runbook</h3>
      <p class="project-blurb">A full-cluster outage, root-caused, fixed across 9 namespaces, and turned into a script so it can't happen the same way twice.</p>
      <div class="project-stats-row">
        <span class="project-stat"><strong>33+</strong> Pods recovered</span>
        <span class="project-stat"><strong>9/9</strong> Namespaces</span>
      </div>
      <a href="case-study-3.html" class="btn">View Case Study</a>
    </div>

    <div class="project-card card">
      <div class="project-meta">
        <span class="project-tag">CI/CD · TEST INFRASTRUCTURE</span>
      </div>
      <h3 class="project-title">A Test Suite That Gates Every Release</h3>
      <p class="project-blurb">Building the automated test platform every release runs through before it ships — from zero to 1,600+ tests, one auth provider at a time.</p>
      <div class="project-stats-row">
        <span class="project-stat"><strong>1,632</strong> Test functions</span>
        <span class="project-stat"><strong>198</strong> Playwright specs</span>
      </div>
      <a href="case-study-4.html" class="btn">View Case Study</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Append stats + catalog styles to `css/style.css`**

```css
/* ── Stats strip ── */
.stats-strip-section {
  padding: 80px 40px;
  background: var(--navy);
}

.stats-strip-inner {
  max-width: 1100px;
  margin: 0 auto;
}

.stats-strip-section .section-label {
  color: rgba(255,255,255,0.5);
  display: block;
  margin-bottom: 40px;
  text-align: center;
}

.stats-strip {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 40px;
}

.impact-block { text-align: center; }

.stats-strip-section .impact-num {
  color: #fff;
}

.stats-strip-section .impact-label {
  color: rgba(255,255,255,0.6);
  font-size: 13px;
  line-height: 1.4;
}

/* ── Projects catalog ── */
.catalog-section {
  padding: 80px 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.catalog-header-card {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 40px 48px;
  margin-bottom: 40px;
  gap: 40px;
  flex-wrap: wrap;
}

.catalog-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(32px, 4vw, 52px);
  color: var(--navy);
  letter-spacing: -0.03em;
  margin: 8px 0 12px;
}

.catalog-sub {
  font-size: 15px;
  color: var(--black);
  opacity: 0.7;
  max-width: 340px;
  line-height: 1.6;
}

.catalog-toc {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 4px;
}

.catalog-toc a {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 15px;
  color: var(--blue);
  text-decoration: none;
  letter-spacing: -0.01em;
}

.catalog-toc a:hover { text-decoration: underline; }

.projects-pegboard {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
  padding: 40px;
  border-radius: 20px;
  border: var(--card-border);
}

.project-card {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 28px;
}

.project-meta {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  flex-wrap: wrap;
}

.project-tag {
  font-family: var(--font-body);
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--red);
}

.new-badge {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 11px;
  background: var(--red);
  color: #fff;
  padding: 3px 10px;
  border-radius: 100px;
  transform: rotate(-4deg);
  display: inline-block;
}

.project-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 20px;
  color: var(--navy);
  letter-spacing: -0.02em;
  line-height: 1.2;
}

.project-blurb {
  font-size: 14px;
  line-height: 1.6;
  color: var(--black);
  opacity: 0.75;
  flex: 1;
}

.project-stats-row {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.project-stat {
  font-size: 13px;
  color: var(--black);
  opacity: 0.7;
}

.project-stat strong {
  color: var(--blue);
  font-family: var(--font-display);
  font-weight: 700;
}
```

- [ ] **Step 3: Verify in browser**
  - Stats strip: dark navy background, 6 impact numbers in white
  - Catalog header card: "Selected Work" label, title, TOC links all render
  - 4 project cards in pegboard grid, each with tag, title, blurb, stats, blue pill button
  - "Latest" badge on card 1 is slightly rotated

---

### Task 5: Kabir notecard + Testimonials + Skills + Footer

**Files:**
- Modify: `index.html` (add remaining sections before scripts)
- Modify: `css/style.css` (append remaining section styles)

**Interfaces:**
- Consumes: `.notecard`, `.card`, `.section-label`, `.btn` from Task 1
- Produces: complete `index.html` page structure

- [ ] **Step 1: Add Kabir + Testimonials + Skills + Footer HTML before `<script>` tags**

```html
<section class="kabir-section">
  <div class="kabir-inner">
    <div class="kabir-notecard notecard">
      <img src="assets/kabir.jpg" alt="Kabir" class="kabir-photo">
      <p class="notecard-heading">Hey.</p>
      <p class="notecard-body">Thanks for stopping by. I'm Munish — the engineer. Kabir's the one with better work-life balance.</p>
      <ul class="personal-list">
        <li>Part-time surfer — certified in Varkala</li>
        <li>Certified cinephile. Tell me your mood, I'll find the film.</li>
        <li>Publishing AI/engineering content under <strong>#0to100xEngineers</strong></li>
        <li>Competitive at go-karting. Apparently also at karaoke.</li>
      </ul>
    </div>
    <div class="kabir-aside">
      <blockquote class="testimonial-card card">
        <p class="testimonial-text">"You've really been through the trenches to know all the nuances of this process."</p>
        <cite class="testimonial-cite">
          <strong>Jeffrey Canisius</strong><br>
          Feb 2026 · after resolving a telemetry server issue on ROSA
        </cite>
      </blockquote>
      <blockquote class="testimonial-card card">
        <p class="testimonial-text">"Debugging is where I learned the most."</p>
        <cite class="testimonial-cite">
          <strong>Abhishek Lale</strong><br>
          Dec 2024 · on learning HAIC Azure deployments together
        </cite>
      </blockquote>
    </div>
  </div>
</section>

<section class="skills-section" id="skills-full">
  <div class="skills-inner">
    <div class="skills-block">
      <span class="section-label">Cloud &amp; Kubernetes</span>
      <p class="skills-list">AWS (EKS, EC2, S3, Lambda, IAM, Secrets Manager) · Microsoft Azure (AKS, Key Vault, Workload Identity) · Google Cloud Platform · Red Hat OpenShift (ROSA/ARO) · Helm · CRDs · RBAC</p>
    </div>
    <div class="skills-block">
      <span class="section-label">Infrastructure as Code</span>
      <p class="skills-list">Terraform — 25+ resource types authored, multi-cloud</p>
    </div>
    <div class="skills-block">
      <span class="section-label">CI/CD</span>
      <p class="skills-list">Jenkins · GitHub Actions · GitHub OIDC · Playwright · Allure · TestRail</p>
    </div>
    <div class="skills-block">
      <span class="section-label">Security &amp; Identity</span>
      <p class="skills-list">AWS IAM · OIDC · Azure Workload Identity · Federated credentials · Trivy vulnerability scanning</p>
    </div>
    <div class="skills-block">
      <span class="section-label">Languages</span>
      <p class="skills-list">Python · Bash · SQL · Groovy</p>
    </div>
    <div class="skills-block">
      <span class="section-label">Data &amp; Messaging</span>
      <p class="skills-list">PostgreSQL · Kafka · Snowflake · Databricks · Redis · MinIO</p>
    </div>
    <div class="skills-block">
      <span class="section-label">Certifications</span>
      <p class="skills-list">Claude Certified Architect — Foundations (CCA-F), Anthropic <em>in progress, 2026</em> · B.Tech, IIIT Pune (2016–2020)</p>
    </div>
  </div>
</section>

<footer class="workshop-footer" id="contact">
  <div class="footer-top">
    <div class="footer-close-door">
      <div class="footer-door-panel footer-door-left"></div>
      <div class="footer-door-panel footer-door-right"></div>
    </div>
  </div>
  <div class="footer-content">
    <p class="footer-headline">Let's build something reliable together.</p>
    <p class="footer-sub">Open to DevOps / Platform / SRE roles and conversations.</p>
    <div class="footer-links">
      <div class="footer-group">
        <span class="section-label">Work</span>
        <a href="#work">Case Studies</a>
        <a href="#hero">About</a>
      </div>
      <div class="footer-group">
        <span class="section-label">Connect</span>
        <a href="mailto:itsbhardwaj@icloud.com">Email Me</a>
        <a href="https://linkedin.com/in/itsmunishbhardwaj" target="_blank" rel="noopener">LinkedIn</a>
        <a href="https://github.com/itsmunishbhardwaj" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
    <p class="footer-credit">Chandigarh, India · +91 8356869703</p>
  </div>
</footer>
```

- [ ] **Step 2: Append remaining styles to `css/style.css`**

```css
/* ── Kabir section ── */
.kabir-section {
  padding: 80px 40px;
  background: var(--page-bg);
}

.kabir-inner {
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: start;
}

.kabir-photo {
  width: 100%;
  max-width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 12px;
  border: var(--card-border);
  margin-bottom: 20px;
  display: block;
}

.notecard-body {
  font-size: 15px;
  line-height: 1.6;
  color: var(--black);
  opacity: 0.8;
  margin-bottom: 20px;
}

.personal-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.personal-list li {
  font-size: 14px;
  color: var(--black);
  opacity: 0.75;
  padding-left: 14px;
  position: relative;
  line-height: 1.5;
}

.personal-list li::before {
  content: '–';
  position: absolute;
  left: 0;
  color: var(--red);
}

.kabir-aside {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.testimonial-card {
  padding: 28px 32px;
}

.testimonial-text {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--navy);
  letter-spacing: -0.02em;
  line-height: 1.4;
  margin-bottom: 16px;
}

.testimonial-cite {
  font-size: 13px;
  color: var(--black);
  opacity: 0.65;
  line-height: 1.5;
  font-style: normal;
}

/* ── Skills section ── */
.skills-section {
  padding: 80px 40px;
  background: var(--card-bg);
  border-top: var(--card-border);
  border-bottom: var(--card-border);
}

.skills-inner {
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.skills-block { display: flex; flex-direction: column; gap: 8px; }

.skills-list {
  font-size: 15px;
  color: var(--black);
  line-height: 1.7;
  opacity: 0.8;
}

/* ── Footer ── */
.workshop-footer {
  background: var(--navy);
  color: #fff;
  overflow: hidden;
}

.footer-top {
  height: 120px;
  position: relative;
  overflow: hidden;
}

.footer-close-door {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 120px;
  display: flex;
}

.footer-door-panel {
  flex: 1;
  background: #c8b89a;
  border: 1px solid rgba(0,0,0,0.15);
}

.footer-door-panel::before {
  content: '';
  position: absolute;
  inset: 12px;
  border: 1.5px solid rgba(0,0,0,0.2);
  border-radius: 2px;
}

.footer-content {
  padding: 60px 40px 40px;
  max-width: 900px;
  margin: 0 auto;
}

.footer-headline {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(28px, 4vw, 48px);
  letter-spacing: -0.03em;
  margin-bottom: 8px;
}

.footer-sub {
  font-size: 15px;
  opacity: 0.6;
  margin-bottom: 48px;
}

.footer-links {
  display: flex;
  gap: 60px;
  margin-bottom: 48px;
  flex-wrap: wrap;
}

.footer-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.footer-group .section-label { color: var(--red); }

.footer-group a {
  color: rgba(255,255,255,0.75);
  text-decoration: none;
  font-size: 15px;
  transition: color 0.15s;
}

.footer-group a:hover { color: #fff; }

.footer-credit {
  font-size: 12px;
  opacity: 0.4;
  border-top: 1px solid rgba(255,255,255,0.1);
  padding-top: 20px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .kabir-inner { grid-template-columns: 1fr; }
  .catalog-header-card { flex-direction: column; }
  .stats-strip { grid-template-columns: repeat(2, 1fr); }
  .hero-content { padding: 100px 20px 60px; }
  .pegboard-section { padding: 80px 20px; }
  .inside-section { padding: 80px 20px; }
  .catalog-section { padding: 60px 20px; }
}
```

- [ ] **Step 3: Verify in browser**
  - Kabir section: notecard with photo placeholder (grey box until you drop `assets/kabir.jpg`), personal bullets, two testimonial cards on the right
  - Skills section: white background, 7 skill categories with red labels
  - Footer: navy background, footer "door" visual at top, headline, two link groups, credit line

---

### Task 6: Lenis + GSAP animations

**Files:**
- Modify: `js/main.js` (replace stub with full implementation)

**Interfaces:**
- Consumes: `.door-left`, `.door-right`, `.skill-badge`, `.workshop-exterior`, `.stats-strip`, `.project-card` from Tasks 2–5
- Produces: inertial scroll + parallax depth on door, badge entrance animations

- [ ] **Step 1: Replace `js/main.js` with full animation code**

```javascript
gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// Door opening parallax — panels slide apart as user scrolls down from hero
gsap.to('.door-left', {
  xPercent: -100,
  ease: 'none',
  scrollTrigger: {
    trigger: '.workshop-exterior',
    start: 'top top',
    end: 'center top',
    scrub: 1.5,
  }
});

gsap.to('.door-right', {
  xPercent: 100,
  ease: 'none',
  scrollTrigger: {
    trigger: '.workshop-exterior',
    start: 'top top',
    end: 'center top',
    scrub: 1.5,
  }
});

// Workshop sky parallax — sky moves slower than foreground
gsap.to('.workshop-sky', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.workshop-exterior',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

// Workshop building parallax — slightly faster than sky
gsap.to('.workshop-building', {
  yPercent: 15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.workshop-exterior',
    start: 'top top',
    end: 'bottom top',
    scrub: true,
  }
});

// Skill badges — scale in from slightly below on first scroll into view
// Staggered by their natural DOM order
gsap.from('.skill-badge', {
  scale: 0.85,
  y: 30,
  stagger: 0.06,
  ease: 'back.out(1.4)',
  scrollTrigger: {
    trigger: '.badges-grid',
    start: 'top 80%',
    end: 'top 40%',
    scrub: false,
    once: true,
  }
});

// Project cards — scale in from slightly below, staggered
gsap.from('.project-card', {
  scale: 0.95,
  y: 24,
  stagger: 0.1,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.projects-pegboard',
    start: 'top 75%',
    once: true,
  }
});

// Stats numbers — subtle scale punch
gsap.from('.impact-num', {
  scale: 0.9,
  stagger: 0.08,
  ease: 'back.out(1.2)',
  scrollTrigger: {
    trigger: '.stats-strip',
    start: 'top 80%',
    once: true,
  }
});
```

- [ ] **Step 2: Verify in browser**
  - Door panels slide apart left/right as you scroll past the hero
  - Sky moves slightly slower than the building (parallax depth)
  - Skill badges scale in with a slight bounce as pegboard section enters viewport
  - Project cards scale in staggered as catalog enters viewport
  - Scroll feels weighted/inertial (Lenis working)
  - No jank or console errors

---

### Task 7: Case study shared template

**Files:**
- Create: `css/case-study.css` (template styles, imported by all 4 case study pages)

**Interfaces:**
- Produces: `.cs-nav`, `.cs-hero`, `.cs-stats-strip`, `.cs-before-after`, `.cs-solution`, `.cs-learnings`, `.cs-nav-footer` — all consumed by Tasks 8–11

- [ ] **Step 1: Create `css/case-study.css`**

```css
@import url('https://api.fontshare.com/v2/css?f[]=clash-grotesk@700,600,500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --blue: #194DC4;
  --red: #DA0D00;
  --black: #141413;
  --navy: #0D2040;
  --card-bg: #FAFAFA;
  --page-bg: #F0F0F0;
  --card-shadow: 10px 12px 12px rgba(0,0,0,0.27);
  --card-radius: 15px;
  --card-border: 2px solid var(--navy);
  --font-display: 'Clash Grotesk', sans-serif;
  --font-body: 'Inter', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  font-family: var(--font-body);
  color: var(--black);
  background: var(--page-bg);
  overflow-x: hidden;
}

body::after {
  content: '';
  position: fixed;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
  opacity: 0.035;
  pointer-events: none;
  z-index: 9999;
}

.cs-nav {
  padding: 24px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: var(--page-bg);
  border-bottom: 1px solid rgba(13,32,64,0.1);
  position: sticky;
  top: 0;
  z-index: 50;
}

.cs-nav-back {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  color: var(--navy);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 6px;
}

.cs-nav-back:hover { color: var(--blue); }

.cs-nav-logo {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--navy);
  text-decoration: none;
  letter-spacing: -0.02em;
}

/* CS Hero */
.cs-hero {
  max-width: 900px;
  margin: 0 auto;
  padding: 80px 48px 60px;
}

.cs-category {
  font-family: var(--font-body);
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
  display: block;
  margin-bottom: 16px;
}

.cs-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(36px, 5vw, 64px);
  color: var(--navy);
  letter-spacing: -0.03em;
  line-height: 1.05;
  margin-bottom: 20px;
}

.cs-overview {
  font-size: 18px;
  line-height: 1.6;
  color: var(--black);
  opacity: 0.8;
  max-width: 640px;
  margin-bottom: 40px;
}

.cs-headline-stats {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
  padding-bottom: 40px;
  border-bottom: var(--card-border);
}

.cs-hstat { display: flex; flex-direction: column; }

.cs-hstat-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 36px;
  color: var(--blue);
  letter-spacing: -0.03em;
}

.cs-hstat-label {
  font-size: 13px;
  color: var(--black);
  opacity: 0.65;
}

/* Content wrapper */
.cs-content {
  max-width: 900px;
  margin: 0 auto;
  padding: 0 48px 80px;
  display: flex;
  flex-direction: column;
  gap: 60px;
}

/* Section block */
.cs-block {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cs-block-label {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--red);
}

.cs-block-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(24px, 3vw, 36px);
  color: var(--navy);
  letter-spacing: -0.02em;
}

.cs-block-body {
  font-size: 16px;
  line-height: 1.7;
  color: var(--black);
  opacity: 0.85;
}

/* Before/After table */
.cs-ba-table {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  border: var(--card-border);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.cs-ba-col { padding: 32px; }

.cs-ba-col:first-child {
  background: #fff0f0;
  border-right: var(--card-border);
}

.cs-ba-col:last-child { background: #f0fff4; }

.cs-ba-head {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.02em;
  margin-bottom: 16px;
}

.cs-ba-col:first-child .cs-ba-head { color: var(--red); }
.cs-ba-col:last-child .cs-ba-head { color: #1a7a40; }

.cs-ba-col p {
  font-size: 14px;
  line-height: 1.6;
  color: var(--black);
  opacity: 0.8;
  margin-bottom: 10px;
}

/* Stats grid */
.cs-stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 2px;
  background: var(--navy);
  border: var(--card-border);
  border-radius: var(--card-radius);
  overflow: hidden;
  box-shadow: var(--card-shadow);
}

.cs-stat-cell {
  background: var(--card-bg);
  padding: 28px 24px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.cs-stat-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 40px;
  color: var(--blue);
  letter-spacing: -0.04em;
  line-height: 1;
}

.cs-stat-label {
  font-size: 13px;
  color: var(--black);
  opacity: 0.7;
  line-height: 1.4;
}

/* Solution list */
.cs-solution-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.cs-solution-item {
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: 10px;
  box-shadow: var(--card-shadow);
  padding: 20px 24px;
}

.cs-solution-item strong {
  font-family: var(--font-display);
  font-weight: 700;
  color: var(--navy);
}

.cs-solution-item em {
  color: var(--blue);
  font-style: italic;
}

/* Principle callout */
.cs-principle {
  background: var(--navy);
  color: #fff;
  border-radius: var(--card-radius);
  padding: 32px 40px;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: clamp(18px, 2.5vw, 26px);
  letter-spacing: -0.02em;
  line-height: 1.35;
  box-shadow: var(--card-shadow);
}

.cs-principle em { color: rgba(255,255,255,0.6); font-style: normal; font-size: 0.85em; }

/* Key learnings */
.cs-learnings {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.cs-learning {
  background: var(--card-bg);
  border: var(--card-border);
  border-radius: var(--card-radius);
  box-shadow: var(--card-shadow);
  padding: 28px 32px;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 20px;
  align-items: start;
}

.cs-learning-num {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 36px;
  color: var(--blue);
  letter-spacing: -0.04em;
  line-height: 1;
}

.cs-learning-title {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 18px;
  color: var(--navy);
  letter-spacing: -0.02em;
  margin-bottom: 8px;
}

.cs-learning-body {
  font-size: 14px;
  line-height: 1.6;
  color: var(--black);
  opacity: 0.8;
}

/* Case study footer nav */
.cs-footer-nav {
  background: var(--navy);
  padding: 60px 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}

.cs-footer-nav a {
  color: #fff;
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 14px;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.15s;
}

.cs-footer-nav a:hover { opacity: 1; }

.cs-footer-nav .btn { opacity: 1; }

/* Responsive */
@media (max-width: 768px) {
  .cs-nav { padding: 16px 20px; }
  .cs-hero { padding: 60px 20px 40px; }
  .cs-content { padding: 0 20px 60px; }
  .cs-ba-table { grid-template-columns: 1fr; }
  .cs-ba-col:first-child { border-right: none; border-bottom: var(--card-border); }
  .cs-footer-nav { padding: 40px 20px; }
}
```

- [ ] **Step 2: Verify styles exist** — open `css/case-study.css` and confirm all selectors are present (no verification in browser yet — the case study pages don't exist)

---

### Task 8: case-study-1.html — Zero Static Secrets

**Files:**
- Create: `case-study-1.html`

**Interfaces:**
- Consumes: `css/style.css`, `css/case-study.css` from Tasks 1 and 7

- [ ] **Step 1: Create `case-study-1.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zero Static Secrets — Munish Bhardwaj</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/case-study.css">
</head>
<body>

<nav class="cs-nav">
  <a href="index.html" class="cs-nav-back">← All Work</a>
  <a href="index.html" class="cs-nav-logo">MB</a>
</nav>

<header class="cs-hero">
  <span class="cs-category">Identity &amp; Security · Azure · ~7 weeks (Mar–May 2025)</span>
  <h1 class="cs-title">Zero Static Secrets, One Banking Cluster</h1>
  <p class="cs-overview">Eliminating every static secret from a Fortune 500 banking environment — passwordless, by design, at scale.</p>
  <div class="cs-headline-stats">
    <div class="cs-hstat"><span class="cs-hstat-num">24</span><span class="cs-hstat-label">Federated credentials</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">13</span><span class="cs-hstat-label">Managed identities</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">0</span><span class="cs-hstat-label">Static secrets remaining</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">11</span><span class="cs-hstat-label">Namespaces secured</span></div>
  </div>
</header>

<main class="cs-content">

  <div class="cs-block">
    <span class="cs-block-label">Before → After</span>
    <div class="cs-ba-table">
      <div class="cs-ba-col">
        <p class="cs-ba-head">Before: Static-secret sprawl</p>
        <p>10+ services authenticating with long-lived static secrets to PostgreSQL and Blob Storage.</p>
        <p>Every audit flags the same finding: secrets that can leak, expire silently, or need manual rotation.</p>
      </div>
      <div class="cs-ba-col">
        <p class="cs-ba-head">After: Passwordless by design</p>
        <p>Every connected service — Keycloak, AppStore, AIEM, Telemetry, MLOps, Authz, Drive, Securestore, Feature Store, H2O GPTe — authenticates via short-lived federated tokens.</p>
        <p>Zero secrets to rotate, leak, or explain to an auditor.</p>
      </div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Problem</span>
    <h2 class="cs-block-title">A credential failure waiting to happen</h2>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">10+</span><span class="cs-stat-label">Services needing federated auth, none passwordless yet</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">2</span><span class="cs-stat-label">Recurring Azure AD errors blocking every attempt (AADSTS700211, AADSTS700213)</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">~7 wks</span><span class="cs-stat-label">Of cascading credential failures before the first working token</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">24</span><span class="cs-stat-label">Federated credentials ultimately required, by design not guesswork</span></div>
    </div>
    <p class="cs-block-body" style="font-style:italic; opacity:0.65; font-size:14px; border-left: 3px solid var(--red); padding-left: 16px;">"I might have found an alternative to make this work. We can register an app to create a service principal." — opening the investigation in #proj-workload-identity before the first working attempt existed</p>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Solution</span>
    <h2 class="cs-block-title">Terraform-authored identity, automated from the start</h2>
    <ul class="cs-solution-list">
      <li class="cs-solution-item"><strong>Terraform-authored identity, not console clicks</strong> — 13 managed identities and 24 federated credentials as reusable <code>for_each</code> loops, not one-off setup. <em>Repeatable next environment.</em></li>
      <li class="cs-solution-item"><strong>Automation for the boring part</strong> — <code>check-and-create-federated-credentials.sh</code> creates credentials across 11 namespaces in one run. <em>Minutes, not a checklist.</em></li>
      <li class="cs-solution-item"><strong>A separate audit script</strong> to verify credential status independent of the creation script. <em>Trust but verify.</em></li>
      <li class="cs-solution-item"><strong>Passwordless database and storage auth</strong> for every connected service via Azure AD tokens. <em>The actual deliverable.</em></li>
    </ul>
    <div class="cs-principle">If a human has to rotate it, it's a future incident. Automate the credential, not just the fix.</div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Impact</span>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">0</span><span class="cs-stat-label">Static secrets remaining in the environment</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">24</span><span class="cs-stat-label">Federated credentials managing auth automatically</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">10+</span><span class="cs-stat-label">Services now passwordless</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">1</span><span class="cs-stat-label">Script that recreates all of it for the next environment</span></div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">Key Learnings</span>
    <div class="cs-learnings">
      <div class="cs-learning">
        <span class="cs-learning-num">1</span>
        <div>
          <p class="cs-learning-title">Debug the abstraction, not the symptom.</p>
          <p class="cs-learning-body">AADSTS700211 and AADSTS700213 look like config typos; they're actually issuer/subject-trust mismatches. Fixing the symptom (re-entering values) doesn't work — you have to understand the federation model itself.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">2</span>
        <div>
          <p class="cs-learning-title">Automate the fix, not just the incident.</p>
          <p class="cs-learning-body">Solving it once for one service would have been a support ticket. Building the script that does it for any namespace turned a fix into infrastructure.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">3</span>
        <div>
          <p class="cs-learning-title">Security work needs a receipt.</p>
          <p class="cs-learning-body">The separate audit script wasn't asked for — it was built because "trust me it's configured" doesn't survive a compliance review.</p>
        </div>
      </div>
    </div>
  </div>

</main>

<footer class="cs-footer-nav">
  <a href="index.html">← All Case Studies</a>
  <a href="case-study-2.html" class="btn">Next: Cluster Isolation →</a>
</footer>

</body>
</html>
```

- [ ] **Step 2: Open `case-study-1.html` in browser — verify**
  - Sticky nav with "← All Work" and "MB"
  - Hero: category label, large title, overview paragraph, 4 headline stats
  - Before/After table: red-tinted left col, green-tinted right col
  - Problem stats grid, solution list with navy principle block
  - Impact stats grid, 3 numbered learnings
  - Footer nav with "← All Case Studies" and "Next: Cluster Isolation →"

---

### Task 9: case-study-2.html — Cluster Isolation

**Files:**
- Create: `case-study-2.html`

**Interfaces:**
- Consumes: `css/case-study.css` from Task 7

- [ ] **Step 1: Create `case-study-2.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cluster Isolation — Munish Bhardwaj</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/case-study.css">
</head>
<body>

<nav class="cs-nav">
  <a href="index.html" class="cs-nav-back">← All Work</a>
  <a href="index.html" class="cs-nav-logo">MB</a>
</nav>

<header class="cs-hero">
  <span class="cs-category">Infrastructure Strategy · ROSA / AWS · Feb–Apr 2026</span>
  <h1 class="cs-title">Four Options, One Decision: Isolating a Production Cluster</h1>
  <p class="cs-overview">Airgapping a production OpenShift cluster — and choosing the boring option on purpose.</p>
  <div class="cs-headline-stats">
    <div class="cs-hstat"><span class="cs-hstat-num">4</span><span class="cs-hstat-label">Approaches evaluated</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">6</span><span class="cs-hstat-label">Clusters in the shared account</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">0</span><span class="cs-hstat-label">New shared dependencies introduced</span></div>
  </div>
</header>

<main class="cs-content">

  <div class="cs-block">
    <span class="cs-block-label">Before → After</span>
    <div class="cs-ba-table">
      <div class="cs-ba-col">
        <p class="cs-ba-head">Before: Open cluster, shared blast radius</p>
        <p>No network isolation boundary on a QA-priority ROSA cluster.</p>
        <p>The "obvious" tool (AWS Network Firewall) would have made this cluster's firewall the control plane for all 6 clusters in the account.</p>
      </div>
      <div class="cs-ba-col">
        <p class="cs-ba-head">After: Scoped isolation, matched to the constraint</p>
        <p>AWS Security Groups enforcing the boundary — implemented, not just proposed.</p>
        <p>Isolation scoped to this cluster only, zero shared blast radius introduced.</p>
      </div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Problem</span>
    <h2 class="cs-block-title">Every obvious option had a hidden cost</h2>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">6</span><span class="cs-stat-label">Clusters in the same AWS account — any shared firewall becomes everyone's dependency</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">20+</span><span class="cs-stat-label">Namespaces — per-namespace firewall policy is unmanageable at that scale</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">4</span><span class="cs-stat-label">Isolation approaches on the table, each with a real cost</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">0</span><span class="cs-stat-label">Of the "obvious" options fit without a hidden trade-off</span></div>
    </div>
    <p class="cs-block-body" style="font-style:italic; opacity:0.65; font-size:14px; border-left: 3px solid var(--red); padding-left: 16px;">"I spent the last few days working on airgapping the ROSA cluster." — reporting findings to Joby, Satish, and Jeffrey, Mar 23 2026</p>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Solution</span>
    <h2 class="cs-block-title">Four evaluated, one selected for the right reason</h2>
    <ul class="cs-solution-list">
      <li class="cs-solution-item"><strong>AWS Network Firewall</strong> — rejected: becomes the shared control-plane firewall for all 6 clusters in the account. <em>Wrong blast radius.</em></li>
      <li class="cs-solution-item"><strong>EgressFirewall (OVN-Kubernetes)</strong> — rejected: needs a policy per namespace across 20+ namespaces. <em>Unmanageable at scale.</em></li>
      <li class="cs-solution-item"><strong>AdminNetworkPolicy / BaselineAdminNetworkPolicy</strong> — rejected: not yet part of the ROSA integration surface. <em>Not production-ready here.</em></li>
      <li class="cs-solution-item"><strong>AWS Security Groups</strong> — selected: fastest to implement, smallest footprint, met the actual QA-priority requirement. <em>Matched the real constraint.</em></li>
    </ul>
    <div class="cs-principle">The best tool on paper is wrong if it doesn't match your blast radius.</div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Impact</span>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">1</span><span class="cs-stat-label">Isolation boundary shipped</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">0</span><span class="cs-stat-label">New shared dependencies introduced across the other 5 clusters</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">4</span><span class="cs-stat-label">Options documented for the next person who hits this decision</span></div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">Key Learnings</span>
    <div class="cs-learnings">
      <div class="cs-learning">
        <span class="cs-learning-num">1</span>
        <div>
          <p class="cs-learning-title">Powerful and correct aren't the same thing.</p>
          <p class="cs-learning-body">Network Firewall is the more capable product. It was still the wrong choice, because "capable" here meant "becomes a shared dependency for 5 clusters you don't own."</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">2</span>
        <div>
          <p class="cs-learning-title">Write down what you rejected, not just what you shipped.</p>
          <p class="cs-learning-body">The 3 rejected options are as useful to the next engineer as the 1 that got picked — they prevent the same evaluation from being redone from scratch.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">3</span>
        <div>
          <p class="cs-learning-title">QA-priority infrastructure needs correctly-scoped tooling, not enterprise-grade tooling.</p>
          <p class="cs-learning-body">Matching the solution to the actual stakes is a judgment call, not a technical one.</p>
        </div>
      </div>
    </div>
  </div>

</main>

<footer class="cs-footer-nav">
  <a href="case-study-1.html">← Zero Static Secrets</a>
  <a href="case-study-3.html" class="btn">Next: The Outage Runbook →</a>
</footer>

</body>
</html>
```

- [ ] **Step 2: Open `case-study-2.html` in browser — verify same template structure renders correctly with different content**

---

### Task 10: case-study-3.html — The Outage Runbook

**Files:**
- Create: `case-study-3.html`

**Interfaces:**
- Consumes: `css/case-study.css` from Task 7

- [ ] **Step 1: Create `case-study-3.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>The Outage Runbook — Munish Bhardwaj</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/case-study.css">
</head>
<body>

<nav class="cs-nav">
  <a href="index.html" class="cs-nav-back">← All Work</a>
  <a href="index.html" class="cs-nav-logo">MB</a>
</nav>

<header class="cs-hero">
  <span class="cs-category">Incident Response · Kubernetes · Jan 2026</span>
  <h1 class="cs-title">The Outage That Became a Runbook</h1>
  <p class="cs-overview">A full-cluster outage, root-caused, fixed across 9 namespaces, and turned into a script so it can't happen the same way twice.</p>
  <div class="cs-headline-stats">
    <div class="cs-hstat"><span class="cs-hstat-num">33+</span><span class="cs-hstat-label">Pods down simultaneously</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">9/9</span><span class="cs-hstat-label">Namespaces recovered</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">1</span><span class="cs-hstat-label">Root cause found</span></div>
  </div>
</header>

<main class="cs-content">

  <div class="cs-block">
    <span class="cs-block-label">Before → After</span>
    <div class="cs-ba-table">
      <div class="cs-ba-col">
        <p class="cs-ba-head">Before: Silent expiration, full outage</p>
        <p>A Docker PAT token expired with no warning; every pod needing a fresh image pull started failing.</p>
        <p>33+ pods in ImagePullBackOff across the entire client environment.</p>
      </div>
      <div class="cs-ba-col">
        <p class="cs-ba-head">After: Scripted recovery, documented root cause</p>
        <p><code>fix_docker_credentials.sh</code> rotates the credential and force-restarts affected pods across every namespace in one run.</p>
        <p>A written investigation report so the next engineer doesn't re-diagnose from zero.</p>
      </div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Problem</span>
    <h2 class="cs-block-title">One shared secret. Every namespace down.</h2>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">33+</span><span class="cs-stat-label">Pods down simultaneously, ImagePullBackOff across every namespace</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">9</span><span class="cs-stat-label">Namespaces affected by one expired secret</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">1</span><span class="cs-stat-label">Shared registry secret (h2oai-registry) — a single point of failure for the whole environment</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">0</span><span class="cs-stat-label">Warning before the token expired — it just stopped working</span></div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Solution</span>
    <h2 class="cs-block-title">Fix it live. Then make the fix a script.</h2>
    <ul class="cs-solution-list">
      <li class="cs-solution-item"><strong>Root-caused to the actual failure, not the symptom</strong> — traced ImagePullBackOff back to an expired Docker PAT in the shared registry secret, not a Kubernetes scheduling issue.</li>
      <li class="cs-solution-item"><strong>Fixed it live</strong> — updated credentials across all 9 affected namespaces and force-restarted every impacted pod.</li>
      <li class="cs-solution-item"><strong>Then didn't stop there</strong> — built <code>fix_docker_credentials.sh</code> so the same fix is a script next time, not a live investigation. <em>One command, any namespace.</em></li>
      <li class="cs-solution-item"><strong>Wrote the investigation report</strong> — root cause, blast radius, and fix, documented while it was fresh.</li>
    </ul>
    <div class="cs-principle">A fix that isn't automated is a promise to debug the same thing again.</div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Impact</span>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">9/9</span><span class="cs-stat-label">Namespaces recovered</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">1</span><span class="cs-stat-label">Reusable script for the next occurrence</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">1</span><span class="cs-stat-label">Written investigation report for institutional memory</span></div>
    </div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">Key Learnings</span>
    <div class="cs-learnings">
      <div class="cs-learning">
        <span class="cs-learning-num">1</span>
        <div>
          <p class="cs-learning-title">A single shared secret is a single point of failure, full stop.</p>
          <p class="cs-learning-body">The outage wasn't really a Docker problem — it was an architecture problem (one secret, every namespace depends on it) that happened to surface as a Docker problem.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">2</span>
        <div>
          <p class="cs-learning-title">The fix isn't done until it's reusable.</p>
          <p class="cs-learning-body">Restoring service ends the incident. Writing the script ends the next incident before it starts.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">3</span>
        <div>
          <p class="cs-learning-title">Document while it's fresh, not after.</p>
          <p class="cs-learning-body">The investigation report was written during recovery, not weeks later from memory — that's the difference between an accurate root cause and a guess.</p>
        </div>
      </div>
    </div>
  </div>

</main>

<footer class="cs-footer-nav">
  <a href="case-study-2.html">← Cluster Isolation</a>
  <a href="case-study-4.html" class="btn">Next: Test Suite →</a>
</footer>

</body>
</html>
```

- [ ] **Step 2: Open `case-study-3.html` in browser — verify template renders correctly**

---

### Task 11: case-study-4.html — Test Suite

**Files:**
- Create: `case-study-4.html`

**Interfaces:**
- Consumes: `css/case-study.css` from Task 7

- [ ] **Step 1: Create `case-study-4.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Suite — Munish Bhardwaj</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/case-study.css">
</head>
<body>

<nav class="cs-nav">
  <a href="index.html" class="cs-nav-back">← All Work</a>
  <a href="index.html" class="cs-nav-logo">MB</a>
</nav>

<header class="cs-hero">
  <span class="cs-category">CI/CD · Test Infrastructure · Ongoing since Oct 2023 (187 commits Jun 2025–Jun 2026)</span>
  <h1 class="cs-title">A Test Suite That Gates Every Release</h1>
  <p class="cs-overview">Building the automated test platform every release runs through before it ships — from zero to 1,600+ tests, one auth provider at a time.</p>
  <div class="cs-headline-stats">
    <div class="cs-hstat"><span class="cs-hstat-num">1,632</span><span class="cs-hstat-label">Test functions</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">198</span><span class="cs-hstat-label">Playwright UI specs</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">10</span><span class="cs-hstat-label">GitHub Actions workflows</span></div>
    <div class="cs-hstat"><span class="cs-hstat-num">3</span><span class="cs-hstat-label">Identity providers unified</span></div>
  </div>
</header>

<main class="cs-content">

  <div class="cs-block">
    <span class="cs-block-label">The Scale This Had to Cover</span>
    <h2 class="cs-block-title">Zero to 1,632 tests — one auth provider at a time</h2>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">3</span><span class="cs-stat-label">Identity providers UI tests authenticate through — Keycloak, Okta, OTP — each breaking tests differently when auth changes</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">18</span><span class="cs-stat-label">Test module directories to keep consistent (connectors, Drive, orchestrator, H2O GPTe, and more)</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">Every PR</span><span class="cs-stat-label">Needing E2E and connector coverage before merge — no room for a flaky suite</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">0</span><span class="cs-stat-label">Tolerance for a release shipping without passing the gate</span></div>
    </div>
    <p class="cs-block-body" style="font-style:italic; opacity:0.65; font-size:14px; border-left: 3px solid var(--red); padding-left: 16px;">"All our testing is done using playwright." — explaining the setup to an intern, Apr 9 2026</p>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Solution</span>
    <h2 class="cs-block-title">Test infrastructure is CI/CD infrastructure</h2>
    <ul class="cs-solution-list">
      <li class="cs-solution-item"><strong>A custom pytest plugin (<code>hac-playwright</code>)</strong> — abstracts away Keycloak, Okta, and OTP auth so tests don't break every time an identity provider changes. <em>Auth becomes one solved problem, not three recurring ones.</em></li>
      <li class="cs-solution-item"><strong>198 Playwright specs</strong> covering every application and every data connector (S3, Redshift, BigQuery, Azure Blob, Snowflake, HDFS, Databricks, Delta Table). <em>Breadth, not just depth.</em></li>
      <li class="cs-solution-item"><strong>10 GitHub Actions workflows</strong> — a main test runner, dedicated UI workflow, release-testing with dynamic environment matrices, connector-suite testing, and a two-phase generate/validate workflow for upgrade testing. <em>CI/CD design, not just test-writing.</em></li>
      <li class="cs-solution-item"><strong>A 1,003-line root <code>conftest.py</code></strong> with parallel-test isolation (<code>xdist_group</code>) and resource tracking for pre/post-upgrade validation. <em>Infrastructure other engineers build tests on top of.</em></li>
    </ul>
    <div class="cs-principle">Auth changes should never be why a test suite breaks.</div>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">The Impact</span>
    <div class="cs-stats-grid">
      <div class="cs-stat-cell"><span class="cs-stat-num">1,632</span><span class="cs-stat-label">Test functions across 2,525 files</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">198</span><span class="cs-stat-label">Playwright UI specs</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">10</span><span class="cs-stat-label">GitHub Actions workflows orchestrating the suite</span></div>
      <div class="cs-stat-cell"><span class="cs-stat-num">187</span><span class="cs-stat-label">Commits to the central test repository</span></div>
    </div>
    <p class="cs-block-body">Recent proof it holds up: RC2 run, May 26 2026 — <strong>47 passed, 2 failed, 4 skipped, 8 errors in 1,583s.</strong> Real signal, not a suite that only ever reports green.</p>
  </div>

  <div class="cs-block">
    <span class="cs-block-label">Key Learnings</span>
    <div class="cs-learnings">
      <div class="cs-learning">
        <span class="cs-learning-num">1</span>
        <div>
          <p class="cs-learning-title">Test infrastructure is CI/CD infrastructure, not "just QA."</p>
          <p class="cs-learning-body">The auth-provider plugin, the workflow matrix design, and the parallel-isolation fixtures are pipeline engineering — they happen to gate tests, but the skill is the same as gating deployments.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">2</span>
        <div>
          <p class="cs-learning-title">Abstraction pays for itself the second time a dependency changes.</p>
          <p class="cs-learning-body">Building hac-playwright once meant the next Okta or Keycloak change didn't break every UI test — it broke one plugin.</p>
        </div>
      </div>
      <div class="cs-learning">
        <span class="cs-learning-num">3</span>
        <div>
          <p class="cs-learning-title">A suite that only reports green isn't trustworthy.</p>
          <p class="cs-learning-body">The May 26 RC2 run had real failures and errors reported alongside passes — that's a signal worth showing, not hiding.</p>
        </div>
      </div>
    </div>
  </div>

</main>

<footer class="cs-footer-nav">
  <a href="case-study-3.html">← The Outage Runbook</a>
  <a href="index.html" class="btn">Back to All Work</a>
</footer>

</body>
</html>
```

- [ ] **Step 2: Open `case-study-4.html` in browser — verify template renders correctly, "Every PR" stat cell renders without overflow**

---

## Self-Review

**Spec coverage check:**
- ✅ Workshop exterior / hero with door parallax → Tasks 2, 6
- ✅ Pegboard dot-grid / skills section → Task 3
- ✅ Stats strip (6 impact numbers) → Task 4
- ✅ Projects catalog (4 cards, pegboard grid, pill buttons) → Task 4
- ✅ Kabir notecard with photo → Task 5
- ✅ Testimonials (Jeffrey, Abhishek) → Task 5
- ✅ Skills + Certs section → Task 5
- ✅ Footer with workshop close visual + red section labels → Task 5
- ✅ Lenis inertial scroll → Tasks 1, 6
- ✅ GSAP door parallax + badge entrance (no opacity fade spam) → Task 6
- ✅ Clash Grotesk headlines, Inter body → Task 1
- ✅ All 4 case study pages with full content → Tasks 8–11
- ✅ Case study template: before/after, problem stats, solution list, principle block, impact grid, 3 learnings, prev/next nav → Task 7
- ✅ Grain texture → Task 1
- ✅ Responsive breakpoints → Tasks 1–5
- ✅ Color system exactly as spec → Task 1

**Placeholder scan:** None found. All HTML/CSS/JS contains actual implementation code.

**Type consistency:** All CSS class names used in JS (`door-left`, `door-right`, `workshop-exterior`, `skill-badge`, `badges-grid`, `project-card`, `projects-pegboard`, `stats-strip`, `impact-num`) match their definitions in Tasks 2–5.
