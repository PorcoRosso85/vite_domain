import { initializeGraph } from "./initializeGraph"

export class GraphComponent extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    const slot = document.createElement('slot')
    shadow.appendChild(slot);

    this.container = document.createElement("div");
    this.container.style.width = "100%";
    this.container.style.height = "600px";
    // shadow.appendChild(this.container);
  }

  connectedCallback() {
    this.appendChild(this.container);
    initializeGraph(this.container);
  }
  
  disconnectedCallback() {
    this.removeChild(this.container);
  }
}
