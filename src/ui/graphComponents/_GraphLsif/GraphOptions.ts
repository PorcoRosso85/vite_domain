import { GraphOptions } from '@antv/g6';

export const graphOptions: GraphOptions = {
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
};
