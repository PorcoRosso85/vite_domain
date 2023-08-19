import { ElementTypes, V } from 'domain/entities/lsifData';
import { headData } from 'infrastructure/database/dao/mocks/datas/headLsifData';
import Logger from 'domain/logs/logs';

export class initializeLsifData {
  private vertices: V[] = [];

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

  addVertex(vertex: V): initializeLsifData {
    if (vertex.type !== ElementTypes.vertex) {
      throw new Error(`Invalid element type: ${ElementTypes[vertex.type]}`);
    }
    this.vertices.push(vertex);
    return this;
  }

  generate(): any {
    // The return type can be adjusted to your actual graph data type
    // Generate graph data based on the vertices list
    return { nodes: this.vertices };
  }
}

// 各ラベルごとに別処理をするなら実装する
// function processLabelMetaData(data: MetaData): any {
//   // add additional process here
//   return data;
// }
// function processLabelGroup(data): any {
//   return data;
// }
// function processLabelEvent(data: Event): any {
//   // add additional process here
//   return data;
// }

if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest;

  describe('initializeLsifDataクラス', () => {
    // it('EVENTラベルを持つprocessListData', () => {
    //   const inputData = [{ label: VertexLabels.EVENT, value: 'sampleData' }];
    //   const dataList = initDataInstance.processListData(inputData);
    //   expect(dataList[0].value).toBe('sampleData');
    // });

    it('vertexタイプを持つprocessListData', () => {
      const initDataInstance = new initializeLsifData();
      const dataList = initDataInstance.processListData(headData);
      dataList.forEach((i) => {
        Logger.debug(`headData: \n${JSON.stringify(i, null, 2)}`);
        expect(i.type).toBe(ElementTypes.vertex);
      });
    });
    it('vertexが1行追加されているか, 追加した頂点がverticeリストに正しく格納されているか', () => {
      const initDataInstance = new initializeLsifData();
      const vertex: V = { type: ElementTypes.vertex };
      initDataInstance.addVertex(vertex);
      const vertices = (initDataInstance as any).vertices;

      expect(vertices).to.have.lengthOf(1);
      expect(vertices[0]).to.equal(vertex);
    });
    it('複数のverticeが追加されているか', () => {
      const initDataInstance = new initializeLsifData();
      const vertex1: V = { type: ElementTypes.vertex };
      const vertex2: V = { type: ElementTypes.vertex };
      initDataInstance.addVertex(vertex1).addVertex(vertex2);
      const vertices = (initDataInstance as any).vertices;

      expect(vertices).to.have.lengthOf(2);
      expect(vertices[0]).to.equal(vertex1);
      expect(vertices[1]).to.equal(vertex2);
    });
    it('同じ頂点を複数回追加したときの動作を確認', () => {
      const initDataInstance = new initializeLsifData();
      const vertex: V = { type: ElementTypes.vertex };
      initDataInstance.addVertex(vertex).addVertex(vertex);
      const vertices = (initDataInstance as any).vertices;

      expect(vertices).to.have.lengthOf(2);
      expect(vertices[0]).to.equal(vertex);
      expect(vertices[1]).to.equal(vertex);
    });
    it('vertexでないときエラーを返す', () => {
      const instance = new initializeLsifData();
      const edge: V = { type: ElementTypes.edge };

      expect(() => instance.addVertex(edge)).to.throw(
        Error,
        'Invalid element type: edge',
      );
    });
  });
}
