const ui = document.getElementById('ui');
const particlesContainer = document.getElementById('particles');
const text = 'I love you ';
const numLines = 60;
const heartEmojis = ['❤️', '🩷', '💕', '💗', '💓', '💖', '💘', '💝'];

// ── Build the heart ──────────────────────────────────────────
for (let i = 0; i < numLines; i++) {
  const t = (i / numLines) * Math.PI * 2;

  const hx = 16 * Math.pow(Math.sin(t), 3);
  const hy = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));

  const scale = 14;
  const x = hx * scale;
  const y = hy * scale;

  const dt = 0.01;
  const hx2 = 16 * Math.pow(Math.sin(t + dt), 3);
  const hy2 = -(13 * Math.cos(t + dt) - 5 * Math.cos(2 * (t + dt)) - 2 * Math.cos(3 * (t + dt)) - Math.cos(4 * (t + dt)));
  const dx = hx2 - hx;
  const dy = hy2 - hy;
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  const r = Math.sqrt(x * x + y * y);
  const baseAngle = Math.atan2(y, x) * (180 / Math.PI);

  const div = document.createElement('div');
  div.className = 'love_horizontal';
  div.style.cssText = `
    --angle: ${baseAngle}deg;
    --r1: ${r * 0.92}px;
    --r2: ${r * 1.08}px;
    animation-delay: calc(${i} * -300ms);
  `;

  const span = document.createElement('span');
  span.className = 'love_word';
  span.style.transform = `translateY(-50%) rotateZ(${angle - baseAngle - 30}deg)`;
  span.textContent = text.repeat(3);

  div.appendChild(span);
  ui.appendChild(div);
}

// ── Click → explode hearts ───────────────────────────────────
document.addEventListener('click', (e) => {
  const count = 18;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    const emoji = heartEmojis[Math.floor(Math.random() * heartEmojis.length)];
    particle.textContent = emoji;

    const angle = (i / count) * 360;
    const distance = 80 + Math.random() * 120;
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad) * distance;
    const dy = Math.sin(rad) * distance;
    const dur = 600 + Math.random() * 600;
    const rot = -180 + Math.random() * 360;

    particle.style.cssText = `
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      --dx: ${dx}px;
      --dy: ${dy}px;
      --dur: ${dur}ms;
      --rot: ${rot}deg;
      font-size: ${0.8 + Math.random() * 1.2}rem;
    `;

    particlesContainer.appendChild(particle);

    // Remove after animation
    setTimeout(() => particle.remove(), dur + 100);
  }
});