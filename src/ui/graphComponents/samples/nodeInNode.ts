import G6 from '@antv/g6';

const data = {
  nodes: [
    { id: 'node1', label: 'Node 1', x: 150, y: 150, size: 40 },
    { id: 'node2', label: 'Node 2', x: 150, y: 150, size: 20, visible: false },
    { id: 'node3', label: 'Node 3', x: 170, y: 170, size: 20, visible: false },
    { id: 'node4', label: 'Node 4', x: 130, y: 170, size: 20, visible: false },
  ],
  edges: []
};


export function graphNodeInNode(container: HTMLDivElement) => {
    const graph = new G6.Graph({
      container: contaienr,
      width: 500,
      height: 500,
    });

    graph.data(data);
    graph.render();

    graph.on('node:click', (evt) => {
      const node = evt.item;
      if (node.getModel().id === 'node1') {
        if (node.getModel().size === 40) {
          // ノードを拡大し、子ノードを表示
          node.update({ size: 80 });
          ['node2', 'node3', 'node4'].forEach(childId => {
            const childNode = graph.findById(childId);
            childNode.show();
          });
        } else {
          // ノードを元のサイズに戻し、子ノードを非表示
          node.update({ size: 40 });
          ['node2', 'node3', 'node4'].forEach(childId => {
            const childNode = graph.findById(childId);
            childNode.hide();
          });
        }
        graph.refresh();
      }
    });


}


// drag n drop
// エリア表示
// 

const nodes = [
  {
    id: 'root',
    label: 'Root',
    childrenIds: ['child1', 'child2'],
  },
  {
    id: 'child1',
    label: 'Child1',
    childrenIds: ['grandchild1', 'grandchild2'],
  },
  {
    id: 'child2',
    label: 'Child2',
  },
  {
    id: 'grandchild1',
    label: 'Grandchild1',
  },
  {
    id: 'grandchild2',
    label: 'Grandchild2',
  },
];


const constrainBox = { x: 60, y: 50, width: 500, height: 150 };

const backrect = document.createElement('div');
backrect.style.backgroundColor = '#666';
backrect.style.opacity = '0.1';
backrect.style.left = `${constrainBox.x}px`;
backrect.style.top = `${constrainBox.y}px`;
backrect.style.width = `${constrainBox.width}px`;
backrect.style.height = `${constrainBox.height}px`;
backrect.style.position = 'absolute';
container.appendChild(backrect);

const onTick = () => {
  let minx = 99999999;
  let maxx = -99999999;
  let miny = 99999999;
  let maxy = -99999999;
  let maxsize = -9999999;
  
  const graphNodes = graph.getNodes();
  graphNodes.forEach((nodeItem) => {
    const model = nodeItem.getModel();
    if (minx > model.x) minx = model.x;
    if (maxx < model.x) maxx = model.x;
    if (miny > model.y) miny = model.y;
    if (maxy < model.y) maxy = model.y;
    if (maxsize < model.size) maxsize = model.size;
  });

  const scalex = (constrainBox.width - maxsize) / (maxx - minx);
  const scaley = (constrainBox.height - maxsize) / (maxy - miny);
  
  graphNodes.forEach((nodeItem) => {
    const model = nodeItem.getModel();
    model.x = (model.x - minx) * scalex + constrainBox.x;
    model.y = (model.y - miny) * scaley + constrainBox.y;
  });
};

const graph = new G6.Graph({
  container: 'container',
  width: container.offsetWidth,
  height: container.offsetHeight,
  layout: {
    type: 'force',
    onTick,
  },
  defaultNode: {
    size: 15,
  },
  modes: {
    default: ['click-select', 'drag-canvas'],  // ここに 'drag-canvas' を追加
  },
});

// 初期データセットとしてrootノードのみを表示
graph.data({
  nodes: [nodes[0]],
  edges: [],
});

graph.render();

graph.on('node:click', (e) => {
  const nodeModel = e.item.getModel();
  const clickedNode = nodes.find((n) => n.id === nodeModel.id);

  if (clickedNode && clickedNode.childrenIds) {
    const childrenNodes = nodes.filter((n) => clickedNode.childrenIds.includes(n.id));

    // 子ノードをグラフに追加
    childrenNodes.forEach((childNode) => {
      graph.addItem('node', childNode);
    });
  }
});


container.addEventListener('click', (e) => {
  if (!e.target.closest('.g6-node')) {
    // クリックされたエリアがノード外である場合、子ノードとエリアを削除
    const rootModel = graph.findById('root').getModel();
    const childrenToRemove = [];
    graph.getNodes().forEach((node) => {
      const model = node.getModel();
      if (rootModel.childrenIds.includes(model.id)) {
        childrenToRemove.push(model.id);
      }
    });
    childrenToRemove.forEach((childId) => {
      graph.removeItem(childId);
    });
    backrect.style.display = 'none';  // エリアを非表示
  }
}, false);

graph.on('node:click', (e) => {
  const nodeModel = e.item.getModel();
  const clickedNode = nodes.find((n) => n.id === nodeModel.id);

  if (clickedNode && clickedNode.childrenIds) {
    const childrenNodes = nodes.filter((n) => clickedNode.childrenIds.includes(n.id));

    // 子ノードをグラフに追加
    childrenNodes.forEach((childNode) => {
      graph.addItem('node', childNode);
    });

    backrect.style.display = 'block';  // エリアを表示
  }
});