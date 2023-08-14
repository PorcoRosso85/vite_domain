import { GraphComponent } from "./ddg_components/components";

// CustomElementの定義
class ComponentOne extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");

    container.textContent = "Hello from Component One!";
    container.style.border = "1px solid black";
    container.style.padding = "10px";
    container.style.marginBottom = "10px";

    shadow.appendChild(container);
  }
}

class ComponentTwo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: "open" });
    const container = document.createElement("div");

    container.textContent = "Hello from Component Two!";
    container.style.border = "1px solid red";
    container.style.padding = "10px";

    shadow.appendChild(container);
  }
}

// CustomElementをカスタムタグ名として登録
customElements.define("component-one", ComponentOne);
customElements.define("component-two", ComponentTwo);
customElements.define("graph-component", GraphComponent);
