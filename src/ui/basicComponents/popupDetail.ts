export class PopupComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
      <div style="background-color: white; border: 1px solid black; padding: 20px;">
        This is a custom popup.
      </div>
    `;
  }
}

// Register the custom element
customElements.define('popup-component', PopupComponent);
