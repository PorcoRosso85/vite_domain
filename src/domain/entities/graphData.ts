interface IStyle {
  fill?: string;
  stroke?: string;
}

interface INode {
  id: string;
  label: string;
  ComboId?: string;
  style?: IStyle;
}

interface ICombo {
  id: string;
  label: string;
  style?: IStyle;
}

interface IEdge {
  source: string;
  target: string;
}

export class GraphData {
  nodes: INode[];
  edges?: IEdge[];
  combos?: ICombo[];

  constructor(nodes: INode[], edges?: IEdge[], combos?: ICombo[]) {
    this.nodes = nodes;
    this.edges = edges || [];
    this.combos = combos || [];
  }
}