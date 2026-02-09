/**
 * Eigen analytics tracker die events naar Supabase stuurt.
 * Batch events om het aantal API calls te beperken.
 */

import { supabase } from "@/lib/supabase";
import { ANALYTICS } from "@/constants";
import type { AnalyticsEventName, EventCategory } from "@/types/analytics";

interface QueuedEvent {
  session_id: string;
  landing_page_id: string;
  variant_id?: string;
  event_name: string;
  event_category: string;
  event_data: Record<string, unknown>;
  created_at: string;
}

const EVENT_QUEUE: QueuedEvent[] = [];
const FLUSH_INTERVAL_MS = ANALYTICS.EVENT_FLUSH_INTERVAL_MS;
const MAX_BATCH_SIZE = ANALYTICS.EVENT_BATCH_SIZE;

let flushTimer: ReturnType<typeof setInterval> | null = null;

function getCategoryForEvent(name: AnalyticsEventName): EventCategory {
  switch (name) {
    case "form_submit":
    case "whatsapp_click":
    case "phone_click":
    case "email_click":
    case "calendly_click":
      return "conversion";
    case "page_view":
    case "page_exit":
      return "navigation";
    default:
      return "engagement";
  }
}

export function queueEvent(
  sessionId: string,
  landingPageId: string,
  variantId: string | undefined,
  eventName: AnalyticsEventName,
  eventData: Record<string, unknown> = {}
): void {
  EVENT_QUEUE.push({
    session_id: sessionId,
    landing_page_id: landingPageId,
    variant_id: variantId,
    event_name: eventName,
    event_category: getCategoryForEvent(eventName),
    event_data: eventData,
    created_at: new Date().toISOString(),
  });

  if (EVENT_QUEUE.length >= MAX_BATCH_SIZE) {
    flushEvents();
  }
}

async function flushEvents(): Promise<void> {
  if (EVENT_QUEUE.length === 0) return;

  const batch = EVENT_QUEUE.splice(0, MAX_BATCH_SIZE);

  try {
    const { error } = await supabase.from("analytics_events").insert(batch);
    if (error) {
      console.warn("Failed to flush analytics events:", error.message);
      // Zet events terug in de queue bij fout
      EVENT_QUEUE.unshift(...batch);
    }
  } catch (err) {
    console.warn("Analytics flush error:", err);
    EVENT_QUEUE.unshift(...batch);
  }
}

export function startEventFlushing(): void {
  if (flushTimer) return;
  flushTimer = setInterval(flushEvents, FLUSH_INTERVAL_MS);

  // Flush bij page exit
  window.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      flushEvents();
    }
  });

  window.addEventListener("beforeunload", () => {
    flushEvents();
  });
}

export function stopEventFlushing(): void {
  if (flushTimer) {
    clearInterval(flushTimer);
    flushTimer = null;
  }
  flushEvents();
}
