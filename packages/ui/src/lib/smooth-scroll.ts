const SCROLL_DURATION = 1800;
const HEADER_OFFSET = 90;

export function smoothScrollTo(targetY: number) {
  const startY = window.scrollY;
  const distance = targetY - startY;
  const startTime = performance.now();
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / SCROLL_DURATION, 1);
    window.scrollTo(0, startY + distance * easeOutCubic(progress));
    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

export function handleAnchorClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return;

  const target = document.querySelector(href);
  if (!target) return;

  e.preventDefault();
  const targetY = target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
  smoothScrollTo(Math.max(targetY, 0));
}