import G6 from '@antv/g6';

G6.registerNode('metaData-vertex', {
  draw(cfg, group) {
    const shape = group.addShape('rect', {
      attrs: {
        x: -50,
        y: -25,
        width: 100,
        height: 50,
        fill: '#9FD8CB',
        stroke: '#404040'
      }
    });

    // ノード内にラベルを追加
    if (cfg.label) {
      group.addShape('text', {
        attrs: {
          x: 0,
          y: 0,
          textAlign: 'center',
          textBaseline: 'middle',
          text: cfg.label,
          fill: '#404040'
        }
      });
    }

    return shape;
  }
});
