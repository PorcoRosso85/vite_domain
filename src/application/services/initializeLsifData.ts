import { VertexLabels, V, MetaData, Event } from 'domain/entities/lsifData';
import { headData } from 'infrastructure/database/dao/mocks/datas/headLsifData';

export interface IVertex extends V {
  label: string; // Additional label property
}

enum AdditionalLabels {
  group = 'group',
}

type InputData = Array<any>;
type ProcessedData = Array<any>;

export class initializeLsifData {
  private vertices: IVertex[] = [];

  processListData(dataList: InputData): ProcessedData {
    return dataList.map((data) => {
      switch (data.label) {
        case VertexLabels.metaData:
          return processLabelMetaData(data);
        case AdditionalLabels.group:
          return processLabelGroup(data);
        case VertexLabels.event:
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

// TODO: 各処理を追加すべきか検討
function processLabelMetaData(data: MetaData): any {
  // add additional process here
  return data;
}

function processLabelGroup(data): any {
  return data;
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
      // const inputData = [{ label: VertexLabels.EVENT, value: 'sampleData' }];
      const inputData = headData;
      const data = initDataInstance.processListData(inputData);

      expect(data[0].value).toBe('sampleData');
    });
  });
}
