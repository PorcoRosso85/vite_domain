import * as graphs from ".";

export class GraphComponent extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    this.container = document.createElement("div");
    this.container.style.width = "100%";
    this.container.style.height = "600px";
    shadow.appendChild(this.container);
  }

  connectedCallback() {
    graphs.initializeGraph(this.container);
  }
}
