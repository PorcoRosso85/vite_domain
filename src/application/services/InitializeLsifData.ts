import { LsifDataDto } from 'application/dtos/LsifDataDto';
import {
  ElementTypes,
  V,
  VertexLabels,
} from 'domain/entities/LsifDataEntities';
import { LsifDataRepository } from 'domain/repositories/LsifDataRepository';

export class InitializeLsifData {
  private vertices: V[] = [];

  constructor(private lsifDataRepository: LsifDataRepository) {}

  // processListData(dataList: V[]): V[] {
  //   // return dataList.map((data) => {
  //   // //   label基準で処理条件分岐
  //   //   switch (data.label) {
  //   //     case VertexLabels.metaData:
  //   //       return processLabelMetaData(data);
  //   //     case AdditionalLabels.group:
  //   //       return processLabelGroup(data);
  //   //     case VertexLabels.event:
  //   //       return processLabelEvent(data);
  //   //     default:
  //   //       throw new Error(`Unsupported label value: ${data.label}`);
  //   //   }

  //   // });
  //   return dataList.filter((data) => data.type === ElementTypes.vertex);
  // }

  async processListData(): Promise<V[]> {
    const dataList = await this.lsifDataRepository.getDataList();
    return dataList.filter((data) => data.type === ElementTypes.vertex);
  }

  addVertex(vertex: V): InitializeLsifData {
    if (vertex.type !== ElementTypes.vertex) {
      throw new Error(`Invalid element type: ${ElementTypes[vertex.type]}`);
    }
    this.vertices.push(vertex);
    return this;
  }

  generate(): LsifDataDto {
    return new LsifDataDto(this.vertices);
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

  describe('InitializeLsifDataクラス', () => {
    let mockLsifDataRepository: LsifDataRepository;
    let initDataInstance: InitializeLsifData;
    let mockGetDataList: any;

    // テストケース内でのデータ作成
    const vertices: V[] = [
      {
        type: ElementTypes.vertex,
        label: VertexLabels.source,
        id: 'anyId',
      },
      {
        type: ElementTypes.vertex,
        label: VertexLabels.source,
        id: 'anyId',
      },
    ];
    const vertex: V = {
      type: ElementTypes.vertex,
      label: VertexLabels.source,
      id: 'anyId',
    };
    // const edge: V = { type: ElementTypes.edge, label: "someLabel", id: "someId" };

    beforeEach(() => {
      mockGetDataList = vi.fn();
      mockLsifDataRepository = {
        getDataList: mockGetDataList,
      };
      initDataInstance = new InitializeLsifData(mockLsifDataRepository);
    });

    it('vertexタイプを持つprocessListData', async () => {
      mockGetDataList.mockReturnValue([
        { type: ElementTypes.vertex },
        { type: ElementTypes.edge },
      ]);

      const dataList = await initDataInstance.processListData();
      expect(dataList).toEqual([{ type: ElementTypes.vertex }]);
    });

    it('vertexが1行追加されているか, 追加した頂点がverticeリストに正しく格納されているか', () => {
      initDataInstance.addVertex(vertex);

      const generatedData = initDataInstance.generate();
      expect(generatedData.nodes).toEqual([vertex]);
    });

    it('複数のverticeが追加されているか', () => {
      vertices.forEach((vertex) => initDataInstance.addVertex(vertex));

      const generatedData = initDataInstance.generate();
      expect(generatedData.nodes).toEqual(vertices);
    });

    it('同じ頂点を複数回追加したときの動作を確認', () => {
      initDataInstance.addVertex(vertex);
      initDataInstance.addVertex(vertex);

      const generatedData = initDataInstance.generate();
      expect(generatedData.nodes).toEqual([vertex, vertex]);
    });

    // FIXME
    it('vertexでないときエラーを返す', () => {
      expect(() => {
        initDataInstance.addVertex(vertex);
      }).toThrow(`Invalid element type: ${ElementTypes[vertex.type]}`);
    });
  });
}
