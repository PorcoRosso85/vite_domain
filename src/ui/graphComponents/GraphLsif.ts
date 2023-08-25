import G6, { IGraph } from '@antv/g6';
import * as GraphLsifModules from 'ui/graphComponents/_GraphLsif';
import { logger } from 'domain/logs/CreateLogger';

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

    this.graph = renderGraph(container);

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

export async function renderGraph(container: HTMLElement): Promise<IGraph> {
  const tipDiv = document.createElement('div');
  tipDiv.innerHTML = 'Here is LSIF';
  container.appendChild(tipDiv);

  const graph = new G6.Graph(GraphLsifModules.graphOptions(container));
  logger.debug(`${GraphLsifModules.fetchedDataPromise}`);
  console.log(
    'Is fetchedData undefined?',
    GraphLsifModules.fetchedDataPromise === undefined,
  );
  const data = await GraphLsifModules.fetchedDataPromise;
  graph.data(data);
  graph.render();

  return graph;
}
