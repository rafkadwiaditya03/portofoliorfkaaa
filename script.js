/* ==========================================
   PORTFOLIO — script.js
   GSAP Animations + Interactions
   SMK Negeri 1 Lumajang — RPL
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ================================================
  // 1. GSAP PLUGINS REGISTRATION
  // ================================================
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // ================================================
  // 2. SET INITIAL STATES via JS (bukan CSS)
  //    Supaya konten tidak kosong jika GSAP lambat
  // ================================================
  gsap.set('.hero-tag',        { opacity: 0, x: -30 });
  gsap.set('#heroLine1',       { opacity: 0, y: 40 });
  gsap.set('.name-word',       { opacity: 0, y: 60 });
  gsap.set('#heroLine2',       { opacity: 0, y: 30 });
  gsap.set('#heroDesc',        { opacity: 0, y: 20 });
  gsap.set('#heroCta',         { opacity: 0, y: 20 });
  gsap.set('#heroStats .stat', { opacity: 0, y: 20 });
  gsap.set('.float-card',      { opacity: 0, scale: 0.85, y: 20 });
  gsap.set('#scrollHint',      { opacity: 0 });

  gsap.set('.reveal-text',  { opacity: 0, y: 40 });
  gsap.set('.reveal-fade',  { opacity: 0, y: 20 });
  gsap.set('.reveal-up',    { opacity: 0, y: 50 });
  gsap.set('.section-label',{ opacity: 0, x: -20 });
  gsap.set('.tl-item',      { opacity: 0, x: -20 });
  gsap.set('.info-row',     { opacity: 0, x: -15 });
  gsap.set('.footer',       { opacity: 0, y: 20 });

  // ================================================
  // 3. CUSTOM CURSOR
  // ================================================
  const cursor   = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(cursor, { x: mouseX, y: mouseY, duration: 0.1, ease: 'none' });
    });

    (function animateFollower() {
      followerX += (mouseX - followerX) * 0.1;
      followerY += (mouseY - followerY) * 0.1;
      gsap.set(follower, { x: followerX, y: followerY });
      requestAnimationFrame(animateFollower);
    })();

    document.addEventListener('mouseleave', () => gsap.to([cursor, follower], { opacity: 0, duration: 0.3 }));
    document.addEventListener('mouseenter', () => gsap.to([cursor, follower], { opacity: 1, duration: 0.3 }));
  }

  // ================================================
  // 4. NAVBAR SCROLL EFFECT
  // ================================================
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 80);
  });

  // ================================================
  // 5. HAMBURGER MENU
  // ================================================
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open');
      document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
    });
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ================================================
  // 6. HERO ENTRANCE ANIMATION
  // ================================================
  const heroTL = gsap.timeline({ delay: 0.2 });
  heroTL
    .to('.hero-tag',        { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' })
    .to('#heroLine1',       { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.4')
    .to('.name-word',       { opacity: 1, y: 0, skewX: 0, duration: 0.8, ease: 'power4.out', stagger: 0.1 }, '-=0.4')
    .to('#heroLine2',       { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
    .to('#heroDesc',        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#heroCta',         { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
    .to('#heroStats .stat', { opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out' }, '-=0.2')
    .to('.float-card',      { opacity: 1, scale: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'back.out(1.7)' }, '-=0.4')
    .to('#scrollHint',      { opacity: 1, duration: 0.5 }, '-=0.2');

  // ================================================
  // 7. TYPED TEXT EFFECT
  // ================================================
  const typedEl = document.getElementById('typed');
  if (typedEl) {
    const words = ['Web Developer', 'Problem Solver', 'UI/UX Enthusiast', 'Code Learner'];
    let wordIdx = 0, charIdx = 0, isDeleting = false;

    function typeEffect() {
      const currentWord = words[wordIdx];
      if (!isDeleting) {
        typedEl.textContent = currentWord.substring(0, charIdx + 1);
        charIdx++;
        if (charIdx === currentWord.length) {
          isDeleting = true;
          setTimeout(typeEffect, 1800);
          return;
        }
      } else {
        typedEl.textContent = currentWord.substring(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
          isDeleting = false;
          wordIdx = (wordIdx + 1) % words.length;
        }
      }
      setTimeout(typeEffect, isDeleting ? 50 : 100);
    }
    setTimeout(typeEffect, 1800);
  }

  // ================================================
  // 8. COUNTER ANIMATION (Stats)
  // ================================================
  function animateCounter(el, target) {
    const startTime = performance.now();
    (function update(now) {
      const p = Math.min((now - startTime) / 1500, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(update);
    })(startTime);
  }

  ScrollTrigger.create({
    trigger: '#heroStats',
    start: 'top 98%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.stat-num[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
    }
  });

  // ================================================
  // 9. SCROLL REVEAL — SECTION LABELS
  // ================================================
  gsap.utils.toArray('.section-label').forEach(label => {
    gsap.to(label, {
      scrollTrigger: { trigger: label, start: 'top 98%', once: true },
      opacity: 1, x: 0, duration: 0.7, ease: 'power2.out'
    });
  });

  // ================================================
  // 10. SCROLL REVEAL — TITLES
  // ================================================
  gsap.utils.toArray('.reveal-text').forEach(el => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      opacity: 1, y: 0, duration: 0.9, ease: 'power3.out'
    });
  });

  // ================================================
  // 11. SCROLL REVEAL — FADE
  // ================================================
  gsap.utils.toArray('.reveal-fade').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      opacity: 1, y: 0, duration: 0.8, delay: i * 0.05, ease: 'power2.out'
    });
  });

  // ================================================
  // 12. SCROLL REVEAL — SLIDE UP
  // ================================================
  gsap.utils.toArray('.reveal-up').forEach((el, i) => {
    gsap.to(el, {
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
      opacity: 1, y: 0, duration: 0.9, delay: i * 0.08, ease: 'power3.out'
    });
  });

  // ================================================
  // 13. SKILL BAR ANIMATION
  // ================================================
  ScrollTrigger.create({
    trigger: '.skills-grid',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      document.querySelectorAll('.skill-fill').forEach((bar, i) => {
        gsap.to(bar, {
          width: bar.dataset.width + '%',
          duration: 1.4, ease: 'power2.out', delay: i * 0.07
        });
      });
    }
  });

  // ================================================
  // 14. ABOUT TIMELINE
  // ================================================
  gsap.utils.toArray('.tl-item').forEach((item, i) => {
    gsap.to(item, {
      scrollTrigger: { trigger: item, start: 'top 95%', once: true },
      opacity: 1, x: 0, duration: 0.6, delay: i * 0.12, ease: 'power2.out'
    });
  });

  // ================================================
  // 15. INFO ROWS
  // ================================================
  gsap.utils.toArray('.info-row').forEach((row, i) => {
    gsap.to(row, {
      scrollTrigger: { trigger: row, start: 'top 98%', once: true },
      opacity: 1, x: 0, duration: 0.5, delay: i * 0.08, ease: 'power2.out'
    });
  });

  // ================================================
  // 16. FLOAT CARD FLOATING
  // ================================================
  if (document.querySelector('.card-code')) {
    gsap.to('.card-code',  { y: -12, duration: 3,   ease: 'sine.inOut', repeat: -1, yoyo: true });
    gsap.to('.card-skill', { y: 10,  duration: 3.5, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 0.5 });
  }

  // ================================================
  // 17. ORB MOUSE PARALLAX
  // ================================================
  document.addEventListener('mousemove', (e) => {
    const xR = (e.clientX / window.innerWidth - 0.5) * 2;
    const yR = (e.clientY / window.innerHeight - 0.5) * 2;
    gsap.to('.orb-1', { x: xR * 20, y: yR * 20, duration: 1.5, ease: 'power1.out' });
    gsap.to('.orb-2', { x: -xR * 25, y: -yR * 15, duration: 1.5, ease: 'power1.out' });
  });

  // ================================================
  // 18. PROJECT CARD TILT
  // ================================================
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, { rotateX: -y * 6, rotateY: x * 6, duration: 0.4, ease: 'power2.out', transformPerspective: 800 });
    });
    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });

  // ================================================
  // 19. SCROLL SPY NAV
  // ================================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(sec => {
      if (sec.getBoundingClientRect().top < window.innerHeight * 0.5) current = sec.id;
    });
    navLinks.forEach(link => {
      link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
    });
  });

  // ================================================
  // 20. CONTACT FORM
  // ================================================
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      gsap.timeline().to(btn, { scale: 0.96, duration: 0.1 }).to(btn, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
      btn.innerHTML = '<span>Pesan Terkirim ✓</span>';
      setTimeout(() => { btn.innerHTML = orig; form.reset(); }, 3000);
    });
  }

  // ================================================
  // 21. BADGE MARQUEE PAUSE ON HOVER
  // ================================================
  const badgeRow = document.querySelector('.badge-row');
  if (badgeRow) {
    badgeRow.addEventListener('mouseenter', () => badgeRow.style.animationPlayState = 'paused');
    badgeRow.addEventListener('mouseleave', () => badgeRow.style.animationPlayState = 'running');
  }

  // ================================================
  // 22. FOOTER REVEAL
  // ================================================
  gsap.to('.footer', {
    scrollTrigger: { trigger: '.footer', start: 'top 98%', once: true },
    opacity: 1, y: 0, duration: 0.8, ease: 'power2.out'
  });

  // ================================================
  // 23. RING & GRID SCROLL FX
  // ================================================
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    document.querySelectorAll('.visual-ring').forEach((ring, i) => {
      ring.style.transform = `rotate(${scrollY * (i + 1) * 0.05}deg)`;
    });
    const heroGrid = document.querySelector('.hero-grid');
    if (heroGrid) heroGrid.style.opacity = Math.max(0, 1 - scrollY / 600);
  });

  // ================================================
  // 24. REFRESH SCROLLTRIGGER (penting!)
  // ================================================
  ScrollTrigger.refresh();
  setTimeout(() => ScrollTrigger.refresh(), 300);
  window.addEventListener('load', () => ScrollTrigger.refresh());

  console.log('%c[RPL Portfolio] ✓ Loaded', 'color:#00e5c2;font-family:monospace;font-weight:bold;font-size:14px;');
});