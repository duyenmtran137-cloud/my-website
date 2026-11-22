// =========================================================
// Fukurai Premium – shared script (index.html & story.html)
// X-Factor: Day / Night mode, remembered across both pages.
// =========================================================

const MODE_KEY = 'fukurai-mode';

// Text that changes on the landing page when the mode flips.
const COPY = {
  day: {
    btn: '🌙 Switch to Night (Wine)',
    heroTag: 'Daytime European Apartment Café',
    heroTitle: 'Slow Mornings & Artisanal Coffee',
    heroSub: 'Step inside our two-story European apartment sanctuary. Enjoy handcrafted espresso beneath arched windows by day, or switch to Night Mode to explore our evening wine and cocktail bistro.',
    menuHeading: 'Daytime Café Menu',
    menuSub: 'Crafted espresso classics & comforting European plates (Prices in VND).',
  },
  night: {
    btn: '☀️ Switch to Day (Café)',
    heroTag: 'Evening Wine & Cocktail Bistro',
    heroTitle: 'Velvet Evenings & Bespoke Cocktails',
    heroSub: 'As twilight falls, the lights dim across our mezzanine. Unwind with bespoke cocktails, artisanal cold cuts, and classic European dinner plates.',
    menuHeading: 'Evening Bistro & Cocktail Menu',
    menuSub: 'Signature bespoke cocktails & dinner pairings (Prices in VND).',
  },
};

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function applyMode(isNight) {
  document.body.classList.toggle('night-mode', isNight);
  const copy = isNight ? COPY.night : COPY.day;

  // These ids exist only on some pages – setText skips missing ones.
  setText('modeBtn', copy.btn);
  setText('heroTag', copy.heroTag);
  setText('heroTitle', copy.heroTitle);
  setText('heroSub', copy.heroSub);
  setText('menuHeading', copy.menuHeading);
  setText('menuSub', copy.menuSub);

  const dayMenu = document.getElementById('dayMenu');
  const nightMenu = document.getElementById('nightMenu');
  if (dayMenu && nightMenu) {
    dayMenu.hidden = isNight;
    nightMenu.hidden = !isNight;
  }
}

function toggleMode() {
  const isNight = !document.body.classList.contains('night-mode');
  applyMode(isNight);
  try { localStorage.setItem(MODE_KEY, isNight ? 'night' : 'day'); } catch (e) {}
}

// Hide the video placeholder once the video can play.
function initVideo() {
  const video = document.getElementById('heroVideo');
  const fallback = document.getElementById('videoFallback');
  if (!video || !fallback) return;

  const hideFallback = () => { fallback.hidden = true; };
  if (video.readyState >= 2) hideFallback();
  video.addEventListener('loadeddata', hideFallback);

  // Some browsers block autoplay until muted is set from JS.
  video.muted = true;
  const p = video.play();
  if (p && p.catch) p.catch(() => {});
}

document.addEventListener('DOMContentLoaded', () => {
  let saved = 'day';
  try { saved = localStorage.getItem(MODE_KEY) || 'day'; } catch (e) {}
  applyMode(saved === 'night');

  document.getElementById('modeBtn')?.addEventListener('click', toggleMode);
  initVideo();
});
