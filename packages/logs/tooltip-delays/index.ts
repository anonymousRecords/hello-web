/** AUTO-GENERATED — do not edit */
export const meta = {"id":"tooltip-delays","date":"2025-01-01","title":"tooltip-delays"};
export const md = "## Notes\\n(설명 없음)";

const HTML = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>Tooltip Delays</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/src/main.js\"></script>\n  </body>\n</html>\n";
const CSS  = "body {\n  font-family: sans-serif;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\nsection {\n  display: flex;\n  flex-direction: row;\n}\n\n.wrapper {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin: 0 2rem;\n}\n\n.container {\n  display: flex;\n  gap: 1rem;\n}\n\n.item {\n  position: relative;\n}\n\nbutton {\n  width: 100%;\n  aspect-ratio: 1 / 1;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  border-radius: 8px;\n  border: none;\n  background: #eee;\n  padding: 12px;\n  font-size: 18px;\n  cursor: pointer;\n  transition: background 0.2s;\n}\n\nbutton:hover {\n  background: #ddd;\n}\n\n.tooltip {\n  background: black;\n  color: white;\n  padding: 4px 8px;\n  border-radius: 6px;\n  font-size: 12px;\n  white-space: nowrap;\n  opacity: 0;\n  visibility: hidden;\n  pointer-events: none;\n  transition:\n    opacity 0.18s ease,\n    transform 0.18s ease;\n  position: absolute;\n  bottom: 120%;\n  left: 50%;\n  transform: translate(-50%, 10%);\n}\n\n.tooltip.visible {\n  opacity: 1;\n  visibility: visible;\n  pointer-events: auto;\n  transform: translate(-50%, 0);\n}\n\n.tooltip.no-anim {\n  transition: none !important;\n}\n\n.container.bad .tooltip {\n  transition-delay: 0.3s;\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .tooltip,\n  .tooltip.no-anim {\n    transition: none !important;\n  }\n}\n";
const JS   = "(() => {\n  // packages/logs/tooltip-delays/main.js\n  document.querySelector(\"#app\").innerHTML = `\n  <section>\n    <div class=\"wrapper\">\n      <div class=\"container\" aria-label=\"Good tooltips\">\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">music</div>\n          <button>\\u{1F3B5}</button>\n        </div>\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">writing</div>\n          <button>\\u270D\\uFE0F</button>\n        </div>\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">shining</div>\n          <button>\\u2728</button>\n        </div>\n      </div>\n\n      <p>\\u{1F44D} Good tooltip delay</p>\n    </div>\n\n    <div class=\"wrapper\">\n      <div class=\"container bad\" aria-label=\"Bad tooltips\">\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">music</div>\n          <button>\\u{1F3B5}</button>\n        </div>\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">writing</div>\n          <button>\\u270D\\uFE0F</button>\n        </div>\n        <div class=\"item\">\n          <div class=\"tooltip\" role=\"tooltip\">shining</div>\n          <button>\\u2728</button>\n        </div>\n      </div>\n\n      <p>\\u{1F44E} Bad tooltip delay</p>\n    </div>\n  </section>\n`;\n  var primed = false;\n  var timers = /* @__PURE__ */ new Map();\n  var goodGroup = document.querySelector(\".container:not(.bad)\");\n  var goodButtons = goodGroup.querySelectorAll(\"button\");\n  var groupLeaveTimer;\n  goodGroup.addEventListener(\"mouseleave\", () => {\n    clearTimeout(groupLeaveTimer);\n    groupLeaveTimer = setTimeout(() => primed = false, 300);\n  });\n  goodButtons.forEach((btn) => {\n    btn.addEventListener(\"mouseenter\", () => onEnter(btn));\n    btn.addEventListener(\"mouseleave\", () => onLeave(btn));\n    btn.addEventListener(\"focus\", () => onEnter(btn));\n    btn.addEventListener(\"blur\", () => onLeave(btn));\n  });\n  function onEnter(btn) {\n    hideSiblings(btn);\n    if (primed) {\n      showTooltip(btn, { noAnim: true });\n    } else {\n      const t = setTimeout(() => {\n        showTooltip(btn);\n        primed = true;\n      }, 300);\n      timers.set(btn, t);\n    }\n  }\n  function onLeave(btn) {\n    const t = timers.get(btn);\n    if (t) {\n      clearTimeout(t);\n      timers.delete(btn);\n    }\n    hideTooltip(btn);\n  }\n  var badButtons = document.querySelectorAll(\".container.bad button\");\n  var badTimers = /* @__PURE__ */ new Map();\n  badButtons.forEach((btn) => {\n    btn.addEventListener(\"mouseenter\", () => {\n      hideSiblings(btn);\n      const t = setTimeout(() => showTooltip(btn), 300);\n      badTimers.set(btn, t);\n    });\n    btn.addEventListener(\"mouseleave\", () => {\n      const t = badTimers.get(btn);\n      if (t) {\n        clearTimeout(t);\n        badTimers.delete(btn);\n      }\n      hideTooltip(btn);\n    });\n  });\n  function showTooltip(el, opts = {}) {\n    const tip = el.previousElementSibling;\n    if (!tip) return;\n    if (opts.noAnim) {\n      tip.classList.add(\"no-anim\");\n      requestAnimationFrame(() => {\n        tip.classList.add(\"visible\");\n        requestAnimationFrame(() => tip.classList.remove(\"no-anim\"));\n      });\n    } else {\n      tip.classList.add(\"visible\");\n    }\n  }\n  function hideTooltip(el) {\n    el?.previousElementSibling?.classList.remove(\"visible\");\n  }\n  function hideSiblings(el) {\n    const group = el.closest(\".container\");\n    group?.querySelectorAll(\".tooltip.visible\").forEach((tip) => {\n      if (tip !== el.previousElementSibling) tip.classList.remove(\"visible\");\n    });\n  }\n})();\n";

export function mount(container: HTMLElement) {
  const root = container.shadowRoot ?? container.attachShadow({ mode: "open" });
  root.innerHTML = HTML;
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  root.prepend(styleEl);
  if (JS.trim()) {
    try {
      const documentProxy = {
        querySelector: root.querySelector.bind(root),
        querySelectorAll: root.querySelectorAll.bind(root),
        getElementById: (id: string) => root.querySelector(`#${id}`),
        addEventListener: root.addEventListener.bind(root),
        removeEventListener: root.removeEventListener.bind(root),
        get body() { return root; },
        get head() { return root; },
      };
      const run = new Function("document", JS);
      run(documentProxy);
      root.dispatchEvent(new Event("DOMContentLoaded"));
    } catch (e) {
      console.error("Failed to run embedded JS for", meta.id, e);
    }
  }
  return () => { root.innerHTML = ""; };
}
