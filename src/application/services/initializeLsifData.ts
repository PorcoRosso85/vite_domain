import { LSIFEntry } from "domain/entities/lsifData";

// この関数で、LSIFあるいはsqliteからのデータを、G6でカスタムノード・カスタムエッジできるように変換する
export function initializeLsifData(entries: LSIFEntry[]): { nodes: any[], edges: any[] } {
    const nodes = [];
    const edges = [];
  
    entries.forEach(entry => {
      if (entry.type === 'vertex' && ['metaData', 'group', 'project', 'document'].includes(entry.label)) {
        nodes.push({
          id: entry.id.toString(),
          label: entry.label,
          // 必要に応じて他の属性も追加
        });
      } else if (entry.type === 'edge' && ['moniker', 'next', 'textDocument/definition', 'textDocument/references'].includes(entry.label)) {
        edges.push({
          source: entry.outV.toString(),
          target: entry.inV.toString(),
          label: entry.label
          // 必要に応じて他の属性も追加
        });
      }
    });
  
    return { nodes, edges };
  }
  