/* ════════════════════════════════════════════
   NEW HERO CAROUSEL LOGIC
   ════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  const car = document.getElementById('carousel');
  if (!car) return;

  const slides = car.querySelectorAll('.slide');
  const dotsEl = document.getElementById('cDots');
  const prevBtn = document.getElementById('cPrev');
  const nextBtn = document.getElementById('cNext');
  
  if (slides.length === 0) return;

  let cur = 0;
  let timer;

  // Create dots
  if (dotsEl) {
    dotsEl.innerHTML = ''; // Clear existing
    slides.forEach((_, i) => {
      const d = document.createElement('button');
      d.className = 'c-dot' + (i === 0 ? ' active' : '');
      d.setAttribute('aria-label', `Go to slide ${i + 1}`);
      d.onclick = () => goTo(i);
      dotsEl.appendChild(d);
    });
  }

  function goTo(n) {
    cur = (n + slides.length) % slides.length;
    car.style.transform = `translateX(-${cur * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll('.c-dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === cur));
    
    // Reset timer
    startTimer();
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(cur + 1), 6000);
  }

  if (prevBtn) prevBtn.onclick = () => goTo(cur - 1);
  if (nextBtn) nextBtn.onclick = () => goTo(cur + 1);

  // Initial timer start
  startTimer();

  // Touch swipe
  let ts = 0;
  car.addEventListener('touchstart', e => {
    ts = e.touches[0].clientX;
  }, { passive: true });

  car.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - ts;
    if (Math.abs(dx) > 50) {
      goTo(dx < 0 ? cur + 1 : cur - 1);
    }
  }, { passive: true });
});
