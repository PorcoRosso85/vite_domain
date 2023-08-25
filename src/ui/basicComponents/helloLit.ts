import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';

// ベースクラスを作成
export class BaseElement extends LitElement {
  connectedCallback() {
    super.connectedCallback();
    // ライフサイクルフック
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    // ライフサイクルフック
  }
}

@customElement('component-one-lit')
export class ComponentOne extends LitElement {
  @property() name: string;

  constructor() {
    super();
    this.name = 'Component One';
  }

  static styles = css`
    /* CSS here */
  `;

  render() {
    console.log(`rendering ${this.name}`);
    return html`<div>${this.name}</div>`;
  }
}

@customElement('component-two-lit')
export class ComponentTwo extends LitElement {
  @property() name = 'Component Two';

  static styles = css`
    /* CSS here */
  `;

  render() {
    console.log(`rendering ${this.name}`);
    return html`<div>${this.name}</div>`;
  }
}
