import G6 from '@antv/g6';

export class GraphLsifElement
  extends HTMLElement
  implements BaseWebComponentInterface
{
  private graph?: any;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.init();
  }

  init() {
    this.render();
  }

  updateData(data: any) {
    // ここでデータの更新処理を実装できます
  }

  render() {
    if (!this.shadowRoot) return;

    const container = document.createElement('div');
    this.shadowRoot.appendChild(container);

    const tipDiv = document.createElement('div');
    tipDiv.innerHTML = 'Here is LSIF';
    container.appendChild(tipDiv);

    this.graph = new G6.Graph({
      container: container,
      // ... その他のG6設定
    });

    this.shadowRoot.appendChild(container);
  }

  dispose() {
    if (this.graph) {
      this.graph.destroy();
      this.graph = null;
    }
  }

  onError(error: Error) {
    console.error('An error occurred:', error);
  }
}
