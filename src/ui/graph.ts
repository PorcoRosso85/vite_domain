import G6 from '@antv/g6';
// import Sigma from "sigma";
import { trpc } from 'ui/communication/TrpcClient';

// export const graphData = trpc.graphData.query();
export const graphData = {
  nodes: [
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
  ],
  edges: [
    { source: 'node1', target: 'node2' },
    { source: 'node2', target: 'node3' },
  ],
};

export const graphConfig = (container: HTMLElement) => {
  return {
    container: container,
    width: 800,
    height: 600,
  };
};

export class SimpleGraph {
  private graph;

  constructor(data: any, config: any) {
    if (typeof window !== 'undefined') {
      this.graph = new G6.Graph(config);
      this.graph.data(data);
      this.graph.render();
    }
  }
}

// export const graphConfig = () => {
//   return {
//     minCameraRatio: 0.1,
//     maxCameraRatio: 10,
//   };
// };

// export class SimpleGraph {
//   private graph;

//   constructor(data: any, container: HTMLElement, config: any) {
//     if (typeof window !== "undefined") {
//       this.graph = new Sigma(data, container, config);
//       this.graph.refresh();
//     }
//   }
// }
