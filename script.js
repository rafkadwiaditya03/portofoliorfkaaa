/* ─── CUSTOM CURSOR ─── */
const cursor = {
  dot: document.getElementById('cursor-dot'),
  ring: document.getElementById('cursor-ring')
};
let mx = -100, my = -100, rx = -100, ry = -100;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
});

(function animateCursor() {
  cursor.dot.style.left = mx + 'px';
  cursor.dot.style.top  = my + 'px';
  rx += (mx - rx) * .14;
  ry += (my - ry) * .14;
  cursor.ring.style.left = rx + 'px';
  cursor.ring.style.top  = ry + 'px';
  requestAnimationFrame(animateCursor);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.ring.style.width       = '56px';
    cursor.ring.style.height      = '56px';
    cursor.ring.style.opacity     = '1';
    cursor.ring.style.borderColor = 'var(--accent2)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.ring.style.width       = '36px';
    cursor.ring.style.height      = '36px';
    cursor.ring.style.opacity     = '.5';
    cursor.ring.style.borderColor = 'var(--accent)';
  });
});

/* ─── PARTICLES CANVAS ─── */
const canvas = document.getElementById('bg-canvas');
const ctx    = canvas.getContext('2d');
let W, H, particles = [];

function resize() {
  W = canvas.width  = innerWidth;
  H = canvas.height = innerHeight;
}
resize();
window.addEventListener('resize', resize);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x     = Math.random() * W;
    this.y     = Math.random() * H;
    this.size  = Math.random() * 1.5 + .3;
    this.vx    = (Math.random() - .5) * .3;
    this.vy    = (Math.random() - .5) * .3;
    this.alpha = Math.random() * .6 + .1;
    this.color = Math.random() > .5 ? '#00ff9d' : '#00c9ff';
  }
  draw() {
    ctx.globalAlpha = this.alpha;
    ctx.fillStyle   = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > W || this.y < 0 || this.y > H) this.reset();
  }
}

for (let i = 0; i < 120; i++) particles.push(new Particle());

function drawConnections() {
  ctx.globalAlpha = 1;
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const d  = Math.sqrt(dx * dx + dy * dy);
      if (d < 120) {
        ctx.globalAlpha = (1 - d / 120) * .07;
        ctx.strokeStyle = '#00ff9d';
        ctx.lineWidth   = .5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animate);
}
animate();

/* ─── SCROLL REVEAL ─── */
const reveals  = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      e.target.querySelectorAll?.('.skill-bar').forEach(b => {
        setTimeout(() => b.classList.add('animated'), 200);
      });
    }
  });
}, { threshold: .12 });
reveals.forEach(r => observer.observe(r));

/* ─── SKILL BAR OBSERVER ─── */
const barObserver = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.skill-bar').forEach((bar, i) => {
        setTimeout(() => bar.classList.add('animated'), i * 100 + 300);
      });
    }
  });
}, { threshold: .3 });
document.querySelectorAll('.skill-card').forEach(c => barObserver.observe(c));

/* ─── TYPING EFFECT on hero tag ─── */
const tag  = document.querySelector('.hero-tag');
const full = tag.textContent;
tag.textContent = '';
let i = 0;
setTimeout(() => {
  const type = () => {
    if (i < full.length) {
      tag.textContent += full[i++];
      setTimeout(type, 40);
    }
  };
  type();
}, 800);

/* ─── SMOOTH NAV ─── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});