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
      'ML & Data Science, UC San Diego',
      '$ stack --top',
      'Python · PyTorch · LangGraph · FastAPI',
      '$ status',
      'Open to ML / DS roles · San Diego, CA',
    ];
    const escapeHtml = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      termBody.textContent = lines.join('\n');
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

  /* ---------- hero computer: spin button ---------- */
  const compRig = document.getElementById('compRig');
  const spinBtn = document.getElementById('spinBtn');
  if (compRig && spinBtn) {
    let spinning = false;
    spinBtn.addEventListener('click', () => {
      if (spinning) return;
      spinning = true;
      const prevDuration = compRig.style.animationDuration;
      compRig.style.animationDuration = '1s';
      setTimeout(() => {
        compRig.style.animationDuration = prevDuration || '';
        spinning = false;
      }, 1000);
    });
  }
