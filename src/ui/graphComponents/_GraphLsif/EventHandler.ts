import G6 from '@antv/g6';
import { IG6GraphEvent } from '@antv/g6';

export const customBehavior = {
  onMouseEnter(e: IG6GraphEvent) {
    console.log('Mouse entered node:', e);
  },
  onMouseLeave(e: IG6GraphEvent) {
    console.log('Mouse left node:', e);
  },
  // その他のイベントもここに追加
};

export class EventHandler {
  constructor(private graph: G6.Graph) {
    this.registerEvents();
  }

  private registerEvents() {
    this.graph.on('node:mouseenter', customBehavior.onMouseEnter);
    this.graph.on('node:mouseleave', customBehavior.onMouseLeave);
    // 他のイベントも追加可能
  }
  //   private onMouseEnter(event: any) {
  //     // 処理
  //   }

  //   private onMouseLeave(event: any) {
  //     // 処理
  //   }
}
