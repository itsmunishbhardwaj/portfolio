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
