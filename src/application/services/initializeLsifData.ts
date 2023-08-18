import { V, Event } from 'domain/entities/lsifData';

export interface IVertex extends V {
  label: string; // Additional label property
}

enum VertexLabels {
  // 根拠はprotocol.ts
  EVENT = 'VertexLabels.event',
}

type InputData = Array<any>;
type ProcessedData = Array<any>;

export class initializeLsifData {
  private vertices: IVertex[] = [];

  processListData(dataList: InputData): ProcessedData {
    return dataList.map((data) => {
      switch (data.label) {
        case VertexLabels.EVENT:
          return processLabelEvent(data);
        default:
          throw new Error(`Unsupported label value: ${data.label}`);
      }
    });
  }

  addVertex(vertex: IVertex): InitializeLsifData {
    this.vertices.push(vertex);
    return this;
  }

  generate(): any {
    // The return type can be adjusted to your actual graph data type
    // Generate graph data based on the vertices list
    return { nodes: this.vertices };
  }
}

function processLabelEvent(data: Event): any {
  // add additional process here
  return data;
}

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('initializeLsifDataクラス', () => {
    const initDataInstance = new initializeLsifData();

    it('EVENTラベルを持つprocessListData', () => {
      const inputData = [{ label: VertexLabels.EVENT, value: 'sampleData' }];
      const data = initDataInstance.processListData(inputData);

      expect(data[0].value).toBe('sampleData');
    });
  });
}
