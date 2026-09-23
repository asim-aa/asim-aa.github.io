/* Render EDS 124 entries from teaching-content.js without changing the page layout. */
(function () {
  const groups = [
    ['teachingProjects', teachingContent.projects, 'project'],
    ['teachingVideos', teachingContent.videos, 'video'],
    ['teachingReflections', teachingContent.reflections, 'reflection'],
    ['teachingResources', teachingContent.resources, 'resource']
  ];
  const linkLabels = {
    url: 'View Project', github: 'View Source', scratch: 'View Scratch Project',
    snap: 'View Snap Project', video: 'Watch Video', reflection: 'View Reflection'
  };
  function safeUrl(value) {
    if (!value) return null;
    try {
      const url = new URL(value, document.baseURI);
      return ['https:', 'http:'].includes(url.protocol) ? url : null;
    } catch (e) { return null; }
  }
  function addText(parent, tag, value, className) {
    if (!value) return null;
    const el = document.createElement(tag);
    if (className) el.className = className;
    el.textContent = value;
    parent.appendChild(el);
    return el;
  }
  function addLink(parent, value, label) {
    const url = safeUrl(value);
    if (!url) return;
    const a = document.createElement('a');
    a.href = url.href;
    a.textContent = label;
    if (url.origin !== location.origin) {
      a.target = '_blank';
      a.rel = 'noopener noreferrer';
    }
    parent.appendChild(a);
  }
  function render(item, kind) {
    const card = document.createElement('article');
    card.className = 'teaching-card';
    const image = safeUrl(item.image);
    if (image) {
      const img = document.createElement('img');
      img.className = 'teaching-thumb';
      img.src = image.href;
      img.alt = item.imageAlt || '';
      img.loading = 'lazy';
      card.appendChild(img);
    }
    if (kind === 'video' && item.embedId && /^[A-Za-z0-9_-]{11}$/.test(item.embedId)) {
      const frame = document.createElement('iframe');
      frame.className = 'teaching-video';
      frame.src = 'https://www.youtube-nocookie.com/embed/' + item.embedId;
      frame.title = item.title || 'Teaching video';
      frame.loading = 'lazy';
      frame.referrerPolicy = 'strict-origin-when-cross-origin';
      frame.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      frame.allowFullscreen = true;
      card.appendChild(frame);
    }
    addText(card, 'div', item.date || item.week || item.topic || item.type, 'teaching-meta');
    addText(card, 'h3', item.title);
    addText(card, 'p', item.description || item.text);
    if (Array.isArray(item.tools) && item.tools.length) {
      const tools = document.createElement('div');
      tools.className = 'teaching-tools';
      item.tools.forEach(tool => addText(tools, 'span', tool, 'chip'));
      card.appendChild(tools);
    }
    const links = document.createElement('div');
    links.className = 'teaching-links';
    if (kind === 'resource') addLink(links, item.url, item.linkLabel || 'Open ' + (item.type || 'Resource'));
    else if (kind === 'reflection') addLink(links, item.url, 'Read Reflection');
    else {
      Object.keys(linkLabels).forEach(key => {
        if (key === 'url' && kind === 'video') return;
        addLink(links, item[key], linkLabels[key]);
      });
      if (kind === 'video') addLink(links, item.url, 'Watch Video');
    }
    if (links.childElementCount) card.appendChild(links);
    return card;
  }
  groups.forEach(([id, entries, kind]) => {
    const container = document.getElementById(id);
    if (!container || !Array.isArray(entries) || !entries.length) return;
    container.replaceChildren(...entries.map(item => render(item, kind)));
  });
})();
