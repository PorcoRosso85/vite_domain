class SampleElement extends HTMLElement implements BaseWebComponentInterface {
  private data: any;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.init();
  }

  // コンストラクタでinit()を呼び出していますが、他のライフサイクルメソッド（例：connectedCallback, disconnectedCallbackなど）もOK
  init() {
    this.data = {};
    this.render();
  }

  // 外部からデータを更新するためのメソッドで、この例ではJavaScriptで簡単に呼び出す
  // 実際の応用例では、Ajax呼び出しやWebSocketなどでデータが更新されたときに使用できる
  updateData(data: any) {
    this.data = data;
    this.render();
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
        <p>Hello, this is a sample element.</p>
        <p>Data: ${JSON.stringify(this.data)}</p>
      `;
  }

  // コンポーネントのクリーンアップを行います。この例では非常にシンプルですが、実際にはイベントリスナの解除や外部リソースの解放など、必要なクリーンアップ処理を行うことができます。
  dispose() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = '';
    }
  }

  // エラーハンドリング用のメソッドです。この例では単にコンソールにエラーを出力していますが、より詳細なエラーレポートやユーザーへのフィードバックに使用できます。
  onError(error: Error) {
    console.error('An error occurred:', error);
  }
}

customElements.define('sample-element', SampleElement);
