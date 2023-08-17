class ComponentOne extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');

    container.textContent = 'Hello from Component One!';
    container.style.border = '1px solid black';
    container.style.padding = '10px';
    container.style.marginBottom = '10px';

    shadow.appendChild(container);
  }
}

class ComponentTwo extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');

    container.textContent = 'Hello from Component Two!';
    container.style.border = '1px solid red';
    container.style.padding = '10px';

    shadow.appendChild(container);
  }
}

import { graphDagreLR } from 'ui/ddg_components/dagreLR';
import { graphForcedDirectedBubble } from 'ui/ddg_components/forcedDirectedBubbles';
// import { graphLargeExploration } from "ui/ddg_components/largeExploration";
import { graphDecisionBubble } from 'ui/ddg_components/decisionBubble';
import { graphPopupTest } from 'ui/ddg_components/popupTest';

export function initializeGraph(container: HTMLDivElement): void {
  graphDagreLR(container);
  // graphLargeEploration(container)
  // initializeLargeExploration(container)
  graphForcedDirectedBubble(container);
  graphDecisionBubble(container);
  graphPopupTest(container);
}

export class GraphComponent extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    shadow.appendChild(slot);

    this.container = document.createElement('div');
    this.container.style.width = '100%';
    this.container.style.height = '100%';
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

export class PopupComponent extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = `
      <div style="background-color: white; border: 1px solid black; padding: 20px;">
        This is a custom popup.
      </div>
    `;
  }
}

customElements.define('component-one', ComponentOne);
customElements.define('component-two', ComponentTwo);
customElements.define('graph-component', GraphComponent);
customElements.define('popup-component', PopupComponent);
