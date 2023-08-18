import {
  ElementTypes,
  VertexLabels,
  V,
  MetaData,
  Event,
} from 'domain/entities/lsifData';
import { headData } from 'infrastructure/database/dao/mocks/datas/headLsifData';

export interface IVertex extends V {
  label: string; // Additional label property
}

export class initializeLsifData {
  private vertices: IVertex[] = [];

  processListData(dataList: V[]): V {
    // return dataList.map((data) => {
    //   label基準で処理条件分岐
    //   switch (data.label) {
    //     case VertexLabels.metaData:
    //       return processLabelMetaData(data);
    //     case AdditionalLabels.group:
    //       return processLabelGroup(data);
    //     case VertexLabels.event:
    //       return processLabelEvent(data);
    //     default:
    //       throw new Error(`Unsupported label value: ${data.label}`);
    //   }

    // });

    return dataList.filter((data) => data.type === ElementTypes.vertex);
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

    // it('EVENTラベルを持つprocessListData', () => {
    //   const inputData = [{ label: VertexLabels.EVENT, value: 'sampleData' }];
    //   const dataList = initDataInstance.processListData(inputData);
    //   expect(dataList[0].value).toBe('sampleData');
    // });

    it('vertexタイプを持つprocessListData', () => {
      const inputData = headData;
      const dataList = initDataInstance.processListData(inputData);
      dataList.forEach((i) => {
        expect(i.type).toBe(ElementTypes.vertex);
      });
    });
  });
}
