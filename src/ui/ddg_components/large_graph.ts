import G6 from "@antv/g6";
import * as datas from "../../infrastructure/database/dao/mocks/datas.js"
import * as initializegraphdata from "../../application/services/initializeGraphData"
// import "./large_graph_exploration.js";

const raw_data = datas.data;

export function initializeGraph(container: HTMLDivElement): void {
  const gen = new initializegraphdata.initializeGraphData();
  for (let node of raw_data.nodes) {
    gen.addNode(node);
  }
  for (let edge of raw_data.edges) {
    gen.addEdge(edge);
  }

  const graph = new G6.Graph({
    container: container,
    width: container.scrollWidth,
    height: container.scrollHeight || 1920,
    fitView: true,
    modes: {
      default: ["drag-canvas", "drag-node"],
    },
    layout: {
      type: "dagre",
      rankdir: "LR",
      align: "UL",
      controlPoints: true,
      nodesepFunc: () => 1,
      ranksepFunc: () => 1,
    },
    defaultNode: {
      size: [30, 20],
      type: "rect",
      style: {
        lineWidth: 2,
        stroke: "#5B8FF9",
        fill: "#C6E5FF",
      },
    },
    defaultEdge: {
      type: "polyline",
      size: 1,
      color: "#e2e2e2",
      style: {
        endArrow: {
          path: "M 0,0 L 8,4 L 8,-4 Z",
          fill: "#e2e2e2",
        },
        radius: 20,
      },
    },
  });
  graph.data(gen.generate());
  graph.render();
}