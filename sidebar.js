// Resize the inspector without changing the map's zoom or scroll position.
(() => {
  const layout = document.querySelector('.layout');
  const divider = document.getElementById('sidebar-divider');
  const storageKey = 'm2-test-map.sidebar-width';
  const defaultWidth = () => window.innerWidth <= 900 ? 280 : 350;
  let preferredWidth = null;
  let dragging = null;

  try {
    const stored = Number(localStorage.getItem(storageKey));
    if (Number.isFinite(stored) && stored >= 240) preferredWidth = stored;
  } catch (_) { /* Storage can be unavailable for local files or private browsing. */ }

  function bounds() {
    return { min: 240, max: Math.max(240, layout.clientWidth - 250) };
  }

  function applyWidth(width, remember = false) {
    const { min, max } = bounds();
    const value = Math.round(Math.min(max, Math.max(min, width)));
    layout.style.setProperty('--sidebar-width', value + 'px');
    divider.setAttribute('aria-valuemin', min);
    divider.setAttribute('aria-valuemax', max);
    divider.setAttribute('aria-valuenow', value);
    divider.setAttribute('aria-valuetext', value + ' pixels wide');
    if (remember) {
      preferredWidth = value;
      try { localStorage.setItem(storageKey, String(value)); } catch (_) {}
    }
    return value;
  }

  divider.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    event.preventDefault();
    divider.focus();
    dragging = { x: event.clientX, width: Number(divider.getAttribute('aria-valuenow')) };
    divider.setPointerCapture(event.pointerId);
    document.body.classList.add('resizing-sidebar');
  });
  divider.addEventListener('pointermove', event => {
    if (!dragging) return;
    applyWidth(dragging.width + dragging.x - event.clientX);
  });
  function stopDragging() {
    if (!dragging) return;
    dragging = null;
    document.body.classList.remove('resizing-sidebar');
    applyWidth(Number(divider.getAttribute('aria-valuenow')), true);
  }
  divider.addEventListener('pointerup', stopDragging);
  divider.addEventListener('pointercancel', stopDragging);
  divider.addEventListener('lostpointercapture', stopDragging);
  divider.addEventListener('keydown', event => {
    const step = event.shiftKey ? 50 : 10;
    const value = Number(divider.getAttribute('aria-valuenow'));
    const { min, max } = bounds();
    const actions = { ArrowLeft: value + step, ArrowRight: value - step, Home: min, End: max };
    if (!(event.key in actions)) return;
    event.preventDefault();
    applyWidth(actions[event.key], true);
  });
  divider.addEventListener('dblclick', () => {
    preferredWidth = null;
    try { localStorage.removeItem(storageKey); } catch (_) {}
    applyWidth(defaultWidth());
  });
  window.addEventListener('resize', () => applyWidth(preferredWidth ?? defaultWidth()));
  applyWidth(preferredWidth ?? defaultWidth());
})();
