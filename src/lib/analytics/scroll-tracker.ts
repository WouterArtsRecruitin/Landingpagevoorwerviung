/**
 * Scroll depth tracking via IntersectionObserver
 * Track 25%, 50%, 75% en 100% scroll depth
 */

type ScrollCallback = (depth: number) => void;

const THRESHOLDS = [25, 50, 75, 100];

export function initScrollTracking(callback: ScrollCallback): () => void {
  const trackedDepths = new Set<number>();

  function checkScrollDepth() {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollTop = window.scrollY;
    const percentage = Math.round((scrollTop / scrollHeight) * 100);

    for (const threshold of THRESHOLDS) {
      if (percentage >= threshold && !trackedDepths.has(threshold)) {
        trackedDepths.add(threshold);
        callback(threshold);
      }
    }
  }

  // Throttle scroll events
  let ticking = false;
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        checkScrollDepth();
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}
