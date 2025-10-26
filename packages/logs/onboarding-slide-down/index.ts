/** AUTO-GENERATED — do not edit */
export const meta = {"id":"onboarding-slide-down","date":"2025-10-23","title":"Onboarding · Slide-down assurance","tags":["onboarding"]};
export const md = "## Intent\n\n선택 직후의 불확실성을 '상세 정보 준비됨'으로 전환.\n\n## Notes\n\n- 처음 60ms 지연 → 사용자 시선이 버튼에서 패널로 자연 이동\n- 슬라이드+페이드 동시 전환으로 '부드럽게 열린다' 감각\n";

const HTML = "<!doctype html>\n<meta charset=\"utf-8\" />\n<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n<title>Onboarding · Slide-down</title>\n<link rel=\"stylesheet\" href=\"./style.css\" />\n<button id=\"toggle\">Plan selected → details</button>\n<div class=\"panel\" aria-hidden=\"true\">\n  <p>Details appear here…</p>\n</div>\n<script type=\"module\" src=\"./main.js\"></script>\n";
const CSS  = ":root {\n  --dur: 0.32s;\n  --ease: cubic-bezier(0.2, 0.8, 0.2, 1);\n}\n:host,\nbody {\n  font: 16px/1.4 system-ui;\n  margin: 40px auto;\n  max-width: 420px;\n}\n#toggle {\n  width: 100%;\n  padding: 12px 16px;\n}\n.panel {\n  overflow: hidden;\n  max-height: 0;\n  opacity: 0;\n  transform: translateY(-8px);\n  transition:\n    max-height var(--dur) var(--ease),\n    opacity var(--dur) var(--ease),\n    transform var(--dur) var(--ease);\n  background: #f7f7f8;\n  border: 1px solid #e6e6ea;\n  border-radius: 10px;\n  padding: 0 16px;\n}\n.panel.open {\n  max-height: 240px;\n  opacity: 1;\n  transform: translateY(0);\n  padding: 12px 16px;\n}\n";
const JS   = "const btn = document.getElementById(\"toggle\");\nconst panel = document.querySelector(\".panel\");\nbtn?.addEventListener(\"click\", () => {\n  const open = panel?.classList.toggle(\"open\");\n  panel?.setAttribute(\"aria-hidden\", String(!open));\n});\n";

export function mount(container: HTMLElement) {
  const root = container.shadowRoot ?? container.attachShadow({ mode: "open" });
  root.innerHTML = HTML;
  const styleEl = document.createElement("style");
  styleEl.textContent = CSS;
  root.prepend(styleEl);
  if (JS.trim()) {
    try {
      const docProxy = {
        querySelector: root.querySelector.bind(root),
        querySelectorAll: root.querySelectorAll.bind(root),
        getElementById: (id: string) => root.querySelector(`#${id}`),
          addEventListener: root.addEventListener.bind(root),
          removeEventListener: root.removeEventListener.bind(root),

          get body() { return root as unknown as HTMLElement; },
          get head() { return root as unknown as HTMLElement; },

          _root: root
        };

        const run = new Function("document", JS);
        run(docProxy);

        root.dispatchEvent(new Event("DOMContentLoaded"));
      } catch (e) {
        console.error("Failed to run embedded JS for", meta.id, e);
      }
    }
    return () => { root.innerHTML = ""; };
  }
  