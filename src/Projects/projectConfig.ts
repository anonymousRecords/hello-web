import HoverAnimation from "./0/HoverAnimation";
import TimerStopwatch from "./1/TimerStopwatch";

export const projects: ProjectItem[] = [
  {
    id: "1",
    name: "Hover 애니메이션",
    categories: ["css", "hover"],
    description: "hover 애니메이션",
    component: HoverAnimation,
  },
  {
    id: "2",
    name: "타이머 & 스톱워치",
    categories: ["react"],
    description: "타이머 & 스톱워치",
    component: TimerStopwatch,
  },
];
