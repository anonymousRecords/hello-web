/** AUTO-GENERATED — do not edit */
export const entries = [
  {
    "id": "button-press",
    "date": "2025-01-01",
    "title": "button-press"
  },
  {
    "id": "tooltip-delays",
    "date": "2025-01-01",
    "title": "tooltip-delays"
  }
] as const;
export async function load(id: string) {
  switch (id) {
    case "button-press": return await import("@repo/logs/button-press");
    case "tooltip-delays": return await import("@repo/logs/tooltip-delays");
    default: throw new Error("Unknown log id: " + id);
  }
}