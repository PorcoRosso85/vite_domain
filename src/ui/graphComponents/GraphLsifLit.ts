import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { BaseElement } from 'ui/basicComponents/helloLit';

// コンポーネント一つ一つをLitで定義

@customElement('graph-lsif-element-lit')
export class GraphLsifElement extends BaseElement {
  @property() name = 'Graph LSIF';
  static styles = css`
    /* CSS here */
  `;

  render() {
    console.log('lsif here');
    return html`<div>${this.name}</div>`;
  }
}
