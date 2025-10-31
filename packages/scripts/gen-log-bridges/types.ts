export type Meta = {
  id: string;
  date: string; // YYYY-MM-DD
  title: string;
  tags?: string[];
};

export interface DocumentLike {
  querySelector: ShadowRoot["querySelector"];
  querySelectorAll: ShadowRoot["querySelectorAll"];
  getElementById(id: string): Element | null;
  addEventListener: ShadowRoot["addEventListener"];
  removeEventListener: ShadowRoot["removeEventListener"];
  readonly body: HTMLElement;
  readonly head: HTMLElement;
}
