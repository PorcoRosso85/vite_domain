// basic_components
import { ComponentOne, ComponentTwo } from 'ui/basicComponents';
import { GraphLsifElement } from 'ui/graphComponents';

interface CustomElementInfo {
  name: string;
  constructor: new () => HTMLElement;
}

const elementsToRegister: CustomElementInfo[] = [
  // { name: 'graph-component', constructor: GraphComponent },
  { name: 'graph-lsif-element', constructor: GraphLsifElement },
  { name: 'component-one', constructor: ComponentOne },
  { name: 'component-two', constructor: ComponentTwo },
  // 他のエレメントをこちらに追加
];

export function registerAndAppendElements() {
  elementsToRegister.forEach((elementInfo) => {
    // エレメントを登録
    customElements.define(elementInfo.name, elementInfo.constructor);

    // エレメントをbodyに追加
    const newElement = document.createElement(elementInfo.name);
    document.body.appendChild(newElement);
  });
}

// エレメントを登録と同時に追加するなら
// registerAndAppendElements();

// ページ読み込み完了後に呼び出すべきで、そうするなら
window.addEventListener('DOMContentLoaded', () => {
  registerAndAppendElements();
});
