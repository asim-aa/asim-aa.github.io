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
    const restAngle = -24;

    if (reduceMotion) {
      // no continuous ambient spin, but a click is a deliberate, bounded
      // action the user asked for, so the button still does something:
      // one short, finite turn back to rest rather than silently nothing.
      let angle = restAngle;
      compRig.style.transform = 'rotateX(-10deg) rotateY(' + angle + 'deg)';
      if (spinBtn) {
        let spinning = false;
        spinBtn.addEventListener('click', () => {
          if (spinning) return;
          spinning = true;
          const start = angle;
          const target = angle + 220;
          const duration = 480;
          const t0 = performance.now();
          const step = (t) => {
            const p = Math.min((t - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            angle = start + (target - start) * eased;
            compRig.style.transform = 'rotateX(-10deg) rotateY(' + angle + 'deg)';
            if (p < 1) {
              requestAnimationFrame(step);
            } else {
              spinning = false;
            }
          };
          requestAnimationFrame(step);
        });
      }
    } else {
      const baseSpeed = 360 / 24000; // deg/ms — one slow ambient turn every 24s
      let angle = restAngle;
      let boost = 0;
      let lastT = null;

      // mouse-follow tilt: only for real cursors, not touch, and only here
      // since this whole branch already means motion is welcome
      const compScene = document.querySelector('.comp-scene');
      const canHover = window.matchMedia && window.matchMedia('(pointer: fine)').matches;
      let tiltX = 0, tiltY = 0, tiltTX = 0, tiltTY = 0;
      if (compScene && canHover) {
        const maxTiltX = 10; // deg, up/down look
        const maxTiltY = 18; // deg, left/right look
        compScene.addEventListener('mousemove', (e) => {
          const rect = compScene.getBoundingClientRect();
          const relX = (e.clientX - rect.left) / rect.width - 0.5;
          const relY = (e.clientY - rect.top) / rect.height - 0.5;
          tiltTX = -relY * maxTiltX;
          tiltTY = relX * maxTiltY;
        });
        compScene.addEventListener('mouseleave', () => {
          tiltTX = 0;
          tiltTY = 0;
        });
      }

      const frame = (t) => {
        if (lastT === null) lastT = t;
        const dt = Math.min(t - lastT, 50); // clamp so a backgrounded tab can't jump
        lastT = t;
        angle += (baseSpeed + boost) * dt;
        boost *= Math.pow(0.04, dt / 1000); // quick exponential decay after a click
        if (boost < 0.0004) boost = 0;
        const tiltEase = 1 - Math.pow(0.001, dt / 1000); // frame-rate-independent settle
        tiltX += (tiltTX - tiltX) * tiltEase;
        tiltY += (tiltTY - tiltY) * tiltEase;
        compRig.style.transform = 'rotateX(' + (-10 + tiltX) + 'deg) rotateY(' + (angle + tiltY) + 'deg)';
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
