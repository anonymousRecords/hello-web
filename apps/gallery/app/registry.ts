/** AUTO-GENERATED — do not edit */
export const entries = [
  {
    "id": "onboarding-slide-down",
    "date": "2025-10-23",
    "title": "Onboarding · Slide-down assurance",
    "tags": [
      "onboarding"
    ]
  }
] as const;

export async function load(id: string) {
  switch (id) {
    case "onboarding-slide-down": return await import("@repo/logs/onboarding-slide-down");
    default: throw new Error("Unknown log id: " + id);
  }
}


export type Meta = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  tags?: string[];
};