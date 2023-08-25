// NodeDetailElement はデータを受け取って描画される
class NodeDetailElement
  extends HTMLElement
  implements BaseWebComponentInterface
{
  private data: any;

  init(data?: any) {
    this.data = data;
    this.render();
  }

  updateData(data: any) {
    this.data = data;
    this.render();
  }

  render() {
    this.innerHTML = `<div class="node-detail">${this.data.detail}</div>`;
  }

  dispose() {
    // Clear any data, remove event listeners, etc.
  }

  onError(error: Error) {
    console.error(`An error occurred: ${error.message}`);
  }
}

customElements.define('graph-node', GraphNodeElement);
customElements.define('node-detail', NodeDetailElement);
