/** AUTO-GENERATED — do not edit */

export interface InteractionEntry {
  id: string;
  title: string;
  date: string;
  description?: string;
  tags?: string[];
}

const portMap: Record<string, number> = {
  "button-press": 4001,
  "curtain-reveal-menu": 4004,
  "fancy-gradient-hover-link": 4005,
  "fancy-nav": 4006,
  "full-screen-carousel": 4007,
  "hover-card-effect": 4008,
  "hover-effect": 4009,
  "hover-glide-image-gallery": 4010,
  "intelligent-mouse-trailer": 4011,
  "living-shapes": 4012,
  "mouse-move-image-gallery": 4013,
  "sparckling-text": 4014,
  "staggered-grid-effect": 4015,
  "tactile-fader": 4017,
  "tooltip-delays": 4002,
  "website-header": 4016
};

export const interactions: InteractionEntry[] = [
  {"id":"button-press","title":"Button Press","date":"2025-01-01"},
  {"id":"curtain-reveal-menu","title":"Curtain Reveal Menu","date":"2025-01-01"},
  {"id":"fancy-gradient-hover-link","title":"Fancy Gradient Hover Link","date":"2025-01-01"},
  {"id":"fancy-nav","title":"Fancy Nav","date":"2025-01-01"},
  {"id":"full-screen-carousel","title":"Full Screen Carousel","date":"2025-01-01"},
  {"id":"hover-card-effect","title":"Hover Card Effect","date":"2025-01-01"},
  {"id":"hover-effect","title":"Hover Effect","date":"2025-01-01"},
  {"id":"hover-glide-image-gallery","title":"Hover Glide Image Gallery","date":"2025-01-01"},
  {"id":"intelligent-mouse-trailer","title":"Intelligent Mouse Trailer","date":"2025-01-01"},
  {"id":"living-shapes","title":"Living Shapes","date":"2025-01-01"},
  {"id":"mouse-move-image-gallery","title":"Mouse Move Image Gallery","date":"2025-01-01"},
  {"id":"sparckling-text","title":"Sparckling Text","date":"2025-01-01"},
  {"id":"staggered-grid-effect","title":"Staggered Grid Effect","date":"2025-01-01"},
  {"id":"tactile-fader","title":"Tactile Fader","date":"2025-01-01"},
  {"id":"tooltip-delays","title":"Tooltip Delays","date":"2025-01-01"},
  {"id":"website-header","title":"Website Header","date":"2025-01-01"}
];

export function getUrl(id: string, isDev: boolean): string {
  const port = portMap[id];
  if (isDev && port) {
    return `http://localhost:${port}`;
  }
  return `/interactions/${id}/`;
}
