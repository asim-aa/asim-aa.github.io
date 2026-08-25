const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.reveal').forEach((el, i) => {
    el.style.transitionDelay = (Math.min(i, 4) * 60) + 'ms';
    io.observe(el);
  });

  /* ---------- mobile nav ---------- */
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
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
