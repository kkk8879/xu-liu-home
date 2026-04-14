const revealItems = [...document.querySelectorAll('.reveal')];

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealItems.forEach((el, idx) => {
  el.style.transitionDelay = `${Math.min(idx * 70, 240)}ms`;
  observer.observe(el);
});

const effortHubEl = document.querySelector('#effort-hub');
const openEffortHubEl = document.querySelector('#open-effort-hub');
const morningPanelEl = document.querySelector('#morning-panel');
const morningOpenBtnEl = document.querySelector('#open-morning-report');
const effortMorningDateEl = document.querySelector('#effort-morning-date');

function showEffortHub() {
  if (!effortHubEl) return;
  effortHubEl.classList.remove('hidden');
}

function showMorningPanel() {
  if (!morningPanelEl) return;
  showEffortHub();
  morningPanelEl.classList.remove('hidden');
}

if (openEffortHubEl) {
  openEffortHubEl.addEventListener('click', (event) => {
    event.preventDefault();
    showEffortHub();
    effortHubEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

if (morningOpenBtnEl) {
  morningOpenBtnEl.addEventListener('click', () => {
    showMorningPanel();
    morningPanelEl?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
}

const morningDateEl = document.querySelector('#morning-date');
if (morningDateEl) {
  const now = new Date();
  const y = now.getFullYear();
  const m = `${now.getMonth() + 1}`.padStart(2, '0');
  const d = `${now.getDate()}`.padStart(2, '0');
  const dateText = `${y}-${m}-${d}`;
  morningDateEl.textContent = dateText;
  if (effortMorningDateEl) effortMorningDateEl.textContent = dateText;
}

async function hydrateMorningReport() {
  const summaryEl = document.querySelector('#morning-summary');
  const highlightsEl = document.querySelector('#morning-highlights');
  const actionsEl = document.querySelector('#morning-actions');
  const fullLinkEl = document.querySelector('#morning-full-link');
  if (!summaryEl || !highlightsEl || !actionsEl || !morningDateEl || !fullLinkEl) return;

  try {
    const response = await fetch('/morning/latest.json', { cache: 'no-store' });
    if (!response.ok) return;
    const data = await response.json();

    if (typeof data.date === 'string' && data.date.trim()) {
      const dateText = data.date.trim();
      morningDateEl.textContent = dateText;
      if (effortMorningDateEl) effortMorningDateEl.textContent = dateText;
    }
    if (typeof data.summary === 'string' && data.summary.trim()) {
      summaryEl.textContent = data.summary.trim();
    }

    if (Array.isArray(data.highlights) && data.highlights.length > 0) {
      highlightsEl.innerHTML = data.highlights
        .filter((item) => typeof item === 'string' && item.trim())
        .map((item) => `<li>${item.trim()}</li>`)
        .join('');
    }

    if (Array.isArray(data.actions) && data.actions.length > 0) {
      actionsEl.innerHTML = data.actions
        .filter((item) => typeof item === 'string' && item.trim())
        .map((item) => `<li>${item.trim()}</li>`)
        .join('');
    }

    if (typeof data.fullUrl === 'string' && data.fullUrl.trim()) {
      fullLinkEl.setAttribute('href', data.fullUrl.trim());
    }
  } catch (error) {
    console.warn('Failed to load /morning/latest.json', error);
  }
}

hydrateMorningReport();
