gsap.registerPlugin(ScrollTrigger);

// Lenis smooth scroll
const lenis = new Lenis({ lerp: 0.08, smoothWheel: true, syncTouch: true });
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => lenis.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

// ── Workshop Entrance: pinned door sequence ──
// Page stays fixed while sign rises, then door panels slide apart, revealing toolkit.
const entranceTl = gsap.timeline({
  scrollTrigger: {
    trigger: '.workshop-entrance',
    start: 'top top',
    end: '+=250%',
    pin: true,
    scrub: 1.5,
    anticipatePin: 1,
  }
});

entranceTl
  // Phase 1: sign slides up and fades (0 → 1)
  .to('.entrance-sign', {
    yPercent: -160,
    autoAlpha: 0,
    duration: 1,
    ease: 'power2.in',
  })
  // Phase 2: door panels slide apart simultaneously (1.2 → 2.5)
  .to('.entrance-door-left', {
    xPercent: -100,
    duration: 1.5,
    ease: 'power2.inOut',
  }, '+=0.2')
  .to('.entrance-door-right', {
    xPercent: 100,
    duration: 1.5,
    ease: 'power2.inOut',
  }, '<');

// ── Skill badges — staggered entrance ──
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

// ── Project cards ──
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

// ── Stats numbers ──
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
