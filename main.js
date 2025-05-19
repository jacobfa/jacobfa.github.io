/* =======================================================
   Jacob Fein-Ashley · Portfolio – main.js (robust build)
   – header shrink, publications loader, self‑loading Vanta NET
   ======================================================= */

//--------------------------------------------------------
//  Tiny helper – $(selector, ctx)
//--------------------------------------------------------
const $ = (sel, ctx = document) => ctx.querySelector(sel);

//--------------------------------------------------------
// 1. Header shrinks after scrolling 80 px
//--------------------------------------------------------
function initHeaderShrink() {
  const header = $("header");
  if (!header) return;
  const toggle = () => header.classList.toggle("shrink", window.scrollY > 80);
  window.addEventListener("scroll", toggle, { passive: true });
  toggle(); // run once on load (refreshes mid‑page)
}

//--------------------------------------------------------
// 2. Publications grid loader
//--------------------------------------------------------
async function loadPublications() {
  const container = $(".pub-list");
  if (!container) return;

  try {
    const res = await fetch("publications.json");
    if (!res.ok) throw new Error(res.statusText);
    const pubs = await res.json();

    const frag = document.createDocumentFragment();
    pubs.forEach(({ image, title, link, publication, year }) => {
      const item = document.createElement("div");
      item.className = "pub-item";
      item.innerHTML = `
        <img src="${image}" alt="${title} thumbnail" class="pub-thumb" loading="lazy" />
        <div class="pub-content">
          <h4><a href="${link}" target="_blank" rel="noopener noreferrer">${title}</a></h4>
          <p>${publication}, ${year}</p>
        </div>`;
      frag.appendChild(item);
    });
    container.appendChild(frag);
  } catch (err) {
    console.error("Error fetching publications:", err);
    container.innerHTML = "<p>Unable to load publications at this time.</p>";
  }
}

//--------------------------------------------------------
// 3. Vanta – self‑loading minimal NET effect
//--------------------------------------------------------
let vantaEffect = null;

const VANTA_SRC = {
  three: "https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js",
  net: "https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js",
};

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if ([...document.scripts].some((s) => s.src === src)) {
      // Already present (or loading) – wait until it fires "load".
      const existing = [...document.scripts].find((s) => s.src === src);
      if (existing.dataset.ready) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", reject);
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.defer = true;
    s.addEventListener("load", () => {
      s.dataset.ready = "1";
      resolve();
    });
    s.addEventListener("error", reject);
    document.body.appendChild(s);
  });
}

async function ensureVantaScripts() {
  if (window.VANTA && window.VANTA.NET) return;
  try {
    // Need Three.js first, then Vanta.NET
    await loadScript(VANTA_SRC.three);
    await loadScript(VANTA_SRC.net);
  } catch (err) {
    console.error("Failed to load Vanta libraries:", err);
  }
}

function startVanta() {
  if (!window.VANTA || !window.VANTA.NET) return;

  if (vantaEffect) vantaEffect.destroy();

  vantaEffect = window.VANTA.NET({
    el: "#vanta-bg",

    // Palette
    color: 0x00e0ff,
    backgroundColor: 0x0e0e10,

    // Geometry
    points: 8.0,
    maxDistance: 20.0,
    spacing: 18.0,

    // Motion
    speed: 0.25,
    chaos: 0.35,

    // Interaction
    mouseControls: true,
    touchControls: false,
    gyroControls: true,
  });
}

async function initVanta() {
  // Auto‑create the holder DIV if author removed it
  if (!$("#vanta-bg")) {
    const bg = document.createElement("div");
    bg.id = "vanta-bg";
    document.body.prepend(bg);
  }

  await ensureVantaScripts();
  startVanta();
}

function destroyVanta() {
  if (vantaEffect) {
    vantaEffect.destroy();
    vantaEffect = null;
  }
}

//--------------------------------------------------------
// 4. Boot sequence
//--------------------------------------------------------
function boot() {
  initHeaderShrink();
  loadPublications();
  initVanta();
}

document.readyState === "loading"
  ? document.addEventListener("DOMContentLoaded", boot)
  : boot();

// Clean‑up for SPA navigations / reloads
window.addEventListener("beforeunload", destroyVanta);
