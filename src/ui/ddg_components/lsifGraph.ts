import G6 from '@antv/g6';
import { initializeLsifData } from 'application/services/initializeLsifData';
import Logger from 'domain/logs/logs';
import { initializeGraphData } from 'application/services/initializeGraphData';
// import { data as rawData } from 'infrastructure/database/dao/mocks/datas/dagreLRData';
import { expressFetchData } from 'ui/ddg_components/express';

export function graphLsif(container: HTMLDivElement) {
  const tipDiv = document.createElement('div');
  tipDiv.innerHTML = 'Here is LSIF';
  container.appendChild(tipDiv);
  const graph = new G6.Graph({
    container: container,
    width: container.scrollWidth,
    height: container.scrollHeight || 1920,
    fitView: true,
    modes: {
      default: ['drag-canvas', 'drag-node'],
    },
    layout: {
      type: 'dagre',
      rankdir: 'LR',
      align: 'UL',
      controlPoints: true,
      nodesepFunc: () => 1,
      ranksepFunc: () => 1,
    },
    defaultNode: {
      size: [30, 20],
      type: 'rect',
      style: {
        lineWidth: 2,
        stroke: '#5B8FF9',
        fill: '#C6E5FF',
      },
    },
    defaultEdge: {
      type: 'polyline',
      size: 1,
      color: '#e2e2e2',
      style: {
        endArrow: {
          path: 'M 0,0 L 8,4 L 8,-4 Z',
          fill: '#e2e2e2',
        },
        radius: 20,
      },
    },
  });

  // graph.on('click') {
  //   expressFetchData();
  // }
  //
  // const initDataInstance = new initializeLsifData();
  // headData.forEach((i) => {
  //   initDataInstance.addVertex(i);
  //   Logger.debug(`vertex: ${i}`);
  // });
  // graph.data(initDataInstance.generate());
  // graph.render();
  // const gen = new initializeGraphData();
  // for (let node of rawData.nodes) {
  //   gen.addNode(node);
  // }
  // for (let edge of rawData.edges) {
  //   gen.addEdge(edge);
  // }
  // graph.data(gen.generate());
  // graph.render();
}
