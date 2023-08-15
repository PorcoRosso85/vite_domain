import G6 from '@antv/g6'

G6.registerEdge('moniker-edge', {
    draw(cfg, group) {
      const shape = group.addShape('path', {
        attrs: {
          path: [
            ['M', cfg.startPoint.x, cfg.startPoint.y],
            ['L', cfg.endPoint.x, cfg.endPoint.y]
          ],
          stroke: '#F6A623',
          lineWidth: 2,
          endArrow: true
        }
      });
  
      return shape;
    }
  });
  