// basic_components
import { registerHelloComponents } from 'ui/basicComponents';
import { GraphLsifElement } from 'ui/graphComponents';
// registerHelloComponents();

// ddg_components
// import { graphLsif } from 'ui/graphComponents';
// import {
//   graphDagreLR,
//   graphDecisionBubble,
//   graphPopupTest,
//   graphForcedDirectedBubble,
// } from 'ui/ddg_components/samples';

function initializeGraph(container: HTMLDivElement): void {
  // graphDagreLR(container);
  // graphLargeEploration(container)
  // initializeLargeExploration(container)
  // graphForcedDirectedBubble(container);
  // graphDecisionBubble(container);
  // graphPopupTest(container);
  // graphLsif(container);
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

// function registerGraphComponent() {
//   // customElements.define('graph-component', GraphComponent);
//   customElements.define('graph-lsif-element', GraphLsifElement);
// }
// registerGraphComponent();

const elementsToRegister: CustomElementInfo[] = [
  // { name: 'graph-component', constructor: GraphComponent },
  { name: 'graph-lsif-element', constructor: GraphLsifElement },
  // 他のエレメントをこちらに追加
];

interface CustomElementInfo {
  name: string;
  constructor: new () => HTMLElement;
}

export function registerAndAppendElements() {
  elementsToRegister.forEach((elementInfo) => {
    // エレメントを登録
    customElements.define(elementInfo.name, elementInfo.constructor);

    // エレメントをbodyに追加
    const newElement = document.createElement(elementInfo.name);
    document.body.appendChild(newElement);
  });
}

// エレメントを登録と同時に追加
registerAndAppendElements();

// registerAndAppendElementsはページ読み込み完了後に呼び出すべき関数
window.addEventListener('DOMContentLoaded', () => {
  registerAndAppendElements();
});
