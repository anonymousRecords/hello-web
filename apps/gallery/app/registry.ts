/** AUTO-GENERATED — do not edit */

export interface InteractionEntry {
  id: string;
  title: string;
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
  "opening-box": 4019,
  "sparckling-text": 4014,
  "staggered-grid-effect": 4015,
  "stranger-things": 4020,
  "tactile-fader": 4017,
  "tooltip-delays": 4002,
  "traffic-light": 4018,
  "website-header": 4016
};

export const interactions: InteractionEntry[] = [
  {"id":"button-press","title":"Button Press"},
  {"id":"curtain-reveal-menu","title":"Curtain Reveal Menu"},
  {"id":"fancy-gradient-hover-link","title":"Fancy Gradient Hover Link"},
  {"id":"fancy-nav","title":"Fancy Nav"},
  {"id":"full-screen-carousel","title":"Full Screen Carousel"},
  {"id":"hover-card-effect","title":"Hover Card Effect"},
  {"id":"hover-effect","title":"Hover Effect"},
  {"id":"hover-glide-image-gallery","title":"Hover Glide Image Gallery"},
  {"id":"intelligent-mouse-trailer","title":"Intelligent Mouse Trailer"},
  {"id":"living-shapes","title":"Living Shapes"},
  {"id":"mouse-move-image-gallery","title":"Mouse Move Image Gallery"},
  {"id":"opening-box","title":"Opening Box"},
  {"id":"sparckling-text","title":"Sparckling Text"},
  {"id":"staggered-grid-effect","title":"Staggered Grid Effect"},
  {"id":"stranger-things","title":"Stranger Things"},
  {"id":"tactile-fader","title":"Tactile Fader"},
  {"id":"tooltip-delays","title":"Tooltip Delays"},
  {"id":"traffic-light","title":"Traffic Light"},
  {"id":"website-header","title":"Website Header"}
];

export function getUrl(id: string, isDev: boolean): string {
  const port = portMap[id];
  if (isDev && port) {
    return `http://localhost:${port}`;
  }
  return `/interactions/${id}/`;
}
