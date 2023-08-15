import { LSIFEntry } from 'domain/entities/lsifData';
import { initializeLsifData } from 'application/services/initializeLsifData';
import G6 from '@antv/g6'

const graph = new G6.Graph({
    container: 'graph-container',
    width: 800,
    height: 600,
    layout: {
      type: 'force',
      preventOverlap: true
    },
    defaultNode: {
      type: 'metaData-vertex'
    },
    defaultEdge: {
      type: 'moniker-edge'
    }
  });
  

const lsifEntries: LSIFEntry[] = [...];  // あなたのデータ
const data = initializeLsifData(lsifEntries);

graph.data(data);
graph.render();
