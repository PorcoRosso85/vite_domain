import G6 from '@antv/g6';
import { initializeLsifData } from 'application/services/initializeLsifData';
import Logger from 'domain/logs/logs';
// import { headData } from 'infrastructure/database/dao/mocks/datas/headLsifData';
import { initializeGraphData } from 'application/services/initializeGraphData';
// import { data as rawData } from 'infrastructure/database/dao/mocks/datas/dagreLRData';

async function fetchData() {
  console.log('Attempting to fetch data...');
  try {
    // const res = await fetch('http://localhost:3000/api/data', { mode: 'cors' });
    const res = await fetch('/api/data', { mode: 'cors' });
    console.log('Response received:', res);
    const data = await res.json();
    console.log('Data parsed:', data);
  } catch (error) {
    console.error('Fetch failed: ', error);
  }
}

export function graphLsif(container: HTMLDivElement) {
  fetchData();
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
