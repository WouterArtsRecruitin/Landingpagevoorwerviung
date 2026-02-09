/**
 * Time on page milestone tracking
 * Fire events op 30s, 60s, 120s, 300s
 */

const MILESTONES = [30, 60, 120, 300];

export function initTimeTracking(
  callback: (seconds: number) => void
): () => void {
  const trackedMilestones = new Set<number>();
  let elapsed = 0;

  const timer = setInterval(() => {
    elapsed += 1;

    for (const milestone of MILESTONES) {
      if (elapsed >= milestone && !trackedMilestones.has(milestone)) {
        trackedMilestones.add(milestone);
        callback(milestone);
      }
    }

    // Stop na langste milestone
    if (elapsed > MILESTONES[MILESTONES.length - 1]) {
      clearInterval(timer);
    }
  }, 1000);

  return () => clearInterval(timer);
}
