import G6 from '@antv/g6';
import { PopupComponent } from 'ui/ddg';

export function graphPopupTest(container: HTMLDivElement) {
  const graph = new G6.Graph({
    container,
    width: container.offsetWidth,
    height: container.offsetHeight,
    modes: {
      default: ['drag-canvas', 'zoom-canvas'],
    },
  });

  graph.data({
    nodes: [{ id: 'node1', label: 'Node 1' }],
    edges: [],
  });

  graph.render();

  graph.on('node:click', (evt) => {
    const { item } = evt;
    const model = item?.getModel();
    const node = evt.item;
    const { x, y } = node?.getCanvasBBox();

    const popup = new PopupComponent();
    popup.style.position = 'absolue';
    popup.style.left = '${x}px';
    popup.style.top = '${y}px';
    container.appendChild(popup);
  });
}
