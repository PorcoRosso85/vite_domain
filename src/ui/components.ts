// basic_components
import { registerHelloComponents } from 'ui/basic_components';
registerHelloComponents();

// ddg_components
import { graphLsif } from 'ui/ddg_components';
import {
  graphDagreLR,
  graphDecisionBubble,
  graphPopupTest,
  graphForcedDirectedBubble,
} from 'ui/ddg_components/samples';

export function initializeGraph(container: HTMLDivElement): void {
  // graphDagreLR(container);
  // graphLargeEploration(container)
  // initializeLargeExploration(container)
  // graphForcedDirectedBubble(container);
  // graphDecisionBubble(container);
  graphPopupTest(container);
  graphLsif(container);
}

export class GraphComponent extends HTMLElement {
  private container: HTMLDivElement;

  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const slot = document.createElement('slot');
    shadow.appendChild(slot);

    this.container = document.createElement('div');
    // コンポーネントの内部サイズを親要素のサイズに合わせるためのもの
    // this.container.style.width = '100%';
    // this.container.style.height = '100%';
    this.container.style.width = '800px';
    this.container.style.height = '800px';
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

function registerGraphComponent() {
  customElements.define('graph-component', GraphComponent);
}
registerGraphComponent();
