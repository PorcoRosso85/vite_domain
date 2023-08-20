import G6 from '@antv/g6';
import { PopupComponent } from 'ui/basic_components/';

export function graphPopupTest(container: HTMLDivElement) {
  const tipDiv = document.createElement('div');
  tipDiv.innerHTML = 'Here is PopupTest';
  container.appendChild(tipDiv);
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
    //
    // 既存のpopup-componentがあれば削除
    const existingPopup = container.querySelector('popup-component');
    if (existingPopup) {
      container.removeChild(existingPopup);
    }

    // 新しいpopup-componentを作成
    // const popup = new PopupComponent();
    const popup = document.createElement('popup-component');
    popup.style.position = 'absolute';
    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.style.zIndex = '10000';
    container.appendChild(popup);
  });
}
