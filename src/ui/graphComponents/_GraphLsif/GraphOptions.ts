import { GraphOptions } from '@antv/g6';

export function graphOptions(container: HTMLElement): GraphOptions {
  return {
    container: container,
    width: container.scrollWidth,
    height: (container.scrollHeight || 500) - 20,
    fitView: true,
    modes: {
      default: ['drag-canvas', 'zoom-canvas', 'drag-node', 'lasso-select'],
    },
    layout: {
      type: 'force',
      preventOverlap: true,
      // TODO: any
      linkDistance: (d: any) => {
        if (d.source.id === 'node0') {
          return 300;
        }
        return 60;
      },
      nodeStrength: (d: any) => {
        if (d.isLeaf) {
          return -50;
        }
        return -10;
      },
      edgeStrength: (d: any) => {
        if (
          d.source.id === 'node1' ||
          d.source.id === 'node2' ||
          d.source.id === 'node3'
        ) {
          return 0.7;
        }
        return 0.1;
      },
    },
  };
}
