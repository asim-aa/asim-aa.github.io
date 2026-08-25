/* ---------- hero computer: keyboard grid ---------- */
  const kbRows = document.getElementById('kbRows');
  if (kbRows) {
    const rowLengths = [11, 11, 10, 8];
    const keys = [];
    rowLengths.forEach(len => {
      const row = document.createElement('div');
      row.className = 'kb-row';
      for (let i = 0; i < len; i++) {
        const key = document.createElement('span');
        key.className = 'kb-key';
        row.appendChild(key);
        keys.push(key);
      }
      kbRows.appendChild(row);
    });
    // idle "typing" shimmer across the keyboard
    setInterval(() => {
      const key = keys[Math.floor(Math.random() * keys.length)];
      key.classList.add('lit');
      setTimeout(() => key.classList.remove('lit'), 220);
    }, 140);
  }

  /* ---------- hero computer: terminal typewriter ---------- */
  const termBody = document.getElementById('termBody');
  if (termBody) {
    const lines = [
      '$ whoami',
      'Asim Ahmed',
      '$ role --current',
      'ML & Data Science @ UCSD',
      '$ stack --top',
      'Python · PyTorch · LangGraph',
      '$ status',
      'Open to ML/DS roles · SD, CA',
    ];
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      // the full 8-line log doesn't fit the screen at rest — show a short,
      // curated snapshot instead of the whole typewriter script
      termBody.textContent = ['$ whoami', 'Asim Ahmed', 'Open to ML/DS roles'].join('\n');
    } else {
      let li = 0, ci = 0, deleting = false, shown = '';
      const tick = () => {
        const full = lines[li];
        if (!deleting) {
          ci++;
          shown = full.slice(0, ci);
          if (ci >= full.length) {
            termBody.innerHTML = escapeHtml(shown) + '<span class="cur"></span>';
            setTimeout(() => { deleting = true; tick(); }, 900);
            return;
          }
        } else {
          ci--;
          shown = full.slice(0, ci);
          if (ci <= 0) {
            deleting = false;
            li = (li + 1) % lines.length;
            ci = 0;
          }
        }
        termBody.innerHTML = escapeHtml(shown) + '<span class="cur"></span>';
        setTimeout(tick, deleting ? 22 : 42);
      };
      tick();
    }
  }

  /* ---------- hero computer: continuous spin, driven frame-by-frame
     so the ambient rotation and the button-triggered "flick" are the same
     smooth motion (no jump from swapping CSS animation-duration mid-flight) ---------- */
  const compRig = document.getElementById('compRig');
  const spinBtn = document.getElementById('spinBtn');
  if (compRig) {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      compRig.style.transform = 'rotateX(-10deg) rotateY(-24deg)';
    } else {
      const baseSpeed = 360 / 24000; // deg/ms — one slow ambient turn every 24s
      let angle = -24;
      let boost = 0;
      let lastT = null;

      const frame = (t) => {
        if (lastT === null) lastT = t;
        const dt = Math.min(t - lastT, 50); // clamp so a backgrounded tab can't jump
        lastT = t;
        angle += (baseSpeed + boost) * dt;
        boost *= Math.pow(0.04, dt / 1000); // quick exponential decay after a click
        if (boost < 0.0004) boost = 0;
        compRig.style.transform = 'rotateX(-10deg) rotateY(' + angle + 'deg)';
        requestAnimationFrame(frame);
      };
      requestAnimationFrame(frame);

      if (spinBtn) {
        spinBtn.addEventListener('click', () => {
          boost += 360 / 700; // a burst of extra angular velocity that decays smoothly
        });
      }
    }
  }
