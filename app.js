/* ---------- theme (init early to avoid flash) ---------- */
(function () {
  try {
    if (localStorage.getItem('theme') === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();

/* ---------- scroll reveal ---------- */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = (Math.min(i, 4) * 60) + 'ms';
  io.observe(el);
});

/* ---------- nav: build theme toggle, restructure, wire mobile menu ---------- */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navIn = document.querySelector('.nav-in');

if (navIn && navToggle) {
  const themeToggle = document.createElement('button');
  themeToggle.className = 'theme-toggle';
  themeToggle.id = 'themeToggle';
  themeToggle.type = 'button';
  themeToggle.setAttribute('aria-label', 'Toggle color theme');
  themeToggle.innerHTML =
    '<svg class="icon-sun" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"></path></svg>' +
    '<svg class="icon-moon" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>';

  themeToggle.addEventListener('click', () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    if (isLight) {
      document.documentElement.removeAttribute('data-theme');
      try { localStorage.setItem('theme', 'dark'); } catch (e) {}
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      try { localStorage.setItem('theme', 'light'); } catch (e) {}
    }
  });

  // group links + theme toggle + hamburger together so the nav keeps its
  // original brand-left / controls-right layout on every page
  const navRight = document.createElement('div');
  navRight.className = 'nav-right';
  if (navLinks) navRight.appendChild(navLinks);
  navRight.appendChild(themeToggle);
  navRight.appendChild(navToggle);
  navIn.appendChild(navRight);

  navToggle.addEventListener('click', () => {
    const open = navLinks ? navLinks.classList.toggle('open') : false;
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  if (navLinks) {
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }
}

/* ---------- filter bars (projects / learning lab) ---------- */
document.querySelectorAll('[data-filter-bar]').forEach(bar => {
  const targetSel = bar.getAttribute('data-filter-bar');
  const items = document.querySelectorAll(targetSel);
  const buttons = bar.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      items.forEach(item => {
        const cats = (item.getAttribute('data-cats') || '').split(' ');
        const show = cat === 'all' || cats.includes(cat);
        item.style.display = show ? '' : 'none';
      });
    });
  });
});

/* ---------- custom cursor (pointer devices only) ---------- */
(function () {
  const canHover = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
  if (!canHover) return;

  document.body.classList.add('custom-cursor');
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  document.body.appendChild(ring);
  document.body.appendChild(dot);

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0, started = false;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = 'translate(' + mouseX + 'px,' + mouseY + 'px) translate(-50%,-50%)';
    if (!started) {
      started = true;
      ringX = mouseX; ringY = mouseY;
      ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
      dot.classList.add('show');
      ring.classList.add('show');
    }
  });

  document.addEventListener('mouseleave', () => {
    dot.classList.remove('show');
    ring.classList.remove('show');
  });
  document.addEventListener('mouseenter', () => {
    if (started) { dot.classList.add('show'); ring.classList.add('show'); }
  });

  function tick() {
    const ease = reduceMotion ? 1 : 0.16;
    ringX += (mouseX - ringX) * ease;
    ringY += (mouseY - ringY) * ease;
    ring.style.transform = 'translate(' + ringX + 'px,' + ringY + 'px) translate(-50%,-50%)';
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);

  const hoverSel = 'a, button, .btn, .filter-btn, .card, .mini, .res-card, .contact-item, .theme-toggle, .nav-toggle';
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.add('hover');
  });
  document.addEventListener('mouseout', (e) => {
    if (e.target.closest && e.target.closest(hoverSel)) ring.classList.remove('hover');
  });
})();
