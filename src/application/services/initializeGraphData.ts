import * as graphData from '../../domain/entities/graphData';

// サンプルとしてdagreLRグラフに使用できるインターフェースと生成
// いずれinitializeGraphDataと統合される
export class initializeGraphData {
  private nodes: graphData.INode[] = [];
  private edges: graphData.IEdge[] = [];

  addNode(node: graphData.INode): initializeGraphData {
    this.nodes.push(node);
    return this;
  }

  addEdge(edge: graphData.IEdge): initializeGraphData {
    if (this.validateEdge(edge)) {
      this.edges.push(edge);
    } else {
      throw new Error("Invalid edge: source or target node doesn't exist.");
    }
    return this;
  }

  generate(): graphData.GraphData {
    return new graphData.GraphData(this.nodes, this.edges);
  }

  private validateEdge(edge: graphData.IEdge): boolean {
    return (
      this.nodes.some((node) => node.id === edge.source) &&
      this.nodes.some((node) => node.id === edge.target)
    );
  }
}
