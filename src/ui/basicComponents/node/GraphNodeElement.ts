// クリックイベントに対応し、クリックされると NodeDetailElement を作成して表示
class GraphNodeElement
  extends HTMLElement
  implements BaseWebComponentInterface
{
  private data: any;

  init(data?: any) {
    this.data = data;
    this.addEventListener('click', () => this.onClick());
  }

  updateData(data: any) {
    this.data = data;
    this.render();
  }

  render() {
    this.innerHTML = `<div>${this.data.name}</div>`;
  }

  dispose() {
    // Remove any event listeners, clear data, etc.
    this.removeEventListener('click', () => this.onClick());
  }

  onError(error: Error) {
    console.error(`An error occurred: ${error.message}`);
  }

  onClick() {
    const detailElement = document.createElement(
      'node-detail',
    ) as NodeDetailElement;
    detailElement.init({ detail: this.data.detail });
    document.body.appendChild(detailElement);
  }
}
