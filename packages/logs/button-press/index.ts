/** AUTO-GENERATED — do not edit */
export const meta = {"id":"button-press","date":"2025-01-01","title":"button-press"};
export const md = "## Notes\\n(설명 없음)";

const HTML = "<!doctype html>\n<html lang=\"en\">\n  <head>\n    <meta charset=\"UTF-8\" />\n    <link rel=\"icon\" type=\"image/svg+xml\" href=\"/favicon.ico\" />\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />\n    <title>button-press</title>\n  </head>\n  <body>\n    <div id=\"app\"></div>\n    <script type=\"module\" src=\"/src/main.js\"></script>\n  </body>\n</html>\n";
const CSS  = ":root {\n  font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;\n  line-height: 1.5;\n  font-weight: 400;\n\n  color-scheme: light dark;\n  color: rgba(255, 255, 255, 0.87);\n  /* background-color: #242424; */\n\n  font-synthesis: none;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\nbody {\n  margin: 0;\n  display: flex;\n  place-items: center;\n  min-width: 320px;\n  min-height: 100vh;\n}\n\n#app {\n  max-width: 1280px;\n  margin: 0 auto;\n  padding: 2rem;\n  text-align: center;\n}\n\n.wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  gap: 32px;\n}\n\n.container {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: 16px;\n}\n\n.btn {\n  background: #171717;\n  color: white;\n  border: none;\n  border-radius: 24px;\n  padding: 8px 24px;\n  font-size: 16px;\n  transition:\n    transform 120ms ease-out,\n    box-shadow 120ms ease-out;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n\n.btn:hover {\n  background: #232323;\n}\n\n.btn:active {\n  transform: scale(0.97);\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);\n}\n\n.container.bad .btn:active {\n  transform: none;\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);\n}\n\nspan {\n  color: black;\n}";
const JS   = "(() => {\n  // packages/logs/button-press/main.js\n  document.querySelector(\"#app\").innerHTML = `\n<div class=\"wrapper\">\n  <div class=\"container\">\n    <button class=\"btn\">Paste</button>\n    <span>\\u{1F44D} Good button pressed</span>\n  </div>\n\n  <div class=\"container bad\">\n    <button class=\"btn\">Paste</button>\n    <span>\\u{1F44E} Bad button pressed</span>\n  </div>\n</div>\n`;\n})();\n";

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
