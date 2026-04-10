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
