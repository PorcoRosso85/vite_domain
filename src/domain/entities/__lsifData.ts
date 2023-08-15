export type LSIFEntry = Vertex | Edge;

interface CommonAttributes {
    id: number;
    type: 'vertex' | 'edge';
    label: string;
}

// type Vertex =
//     | DocumentVertex              // 特定のドキュメントやファイルを表す頂点。コードのスコープやブロックを理解するための基盤。
//     | ReferenceResultVertex       // 参照の結果を表す頂点。
//     | MonikerVertex               // 一意の識別子を持つエンティティを表す頂点。依存関係やスコープの情報には直接関連しない。
//     | HoverResultVertex           // ホバー操作（マウスオーバーなど）の結果を表す頂点。欲しい情報の取得には必要ではない。
//     | GroupVertex                 // グループやカテゴリを表す頂点。
//     | ProjectVertex               // プロジェクトやリポジトリを表す頂点。
//     | MetadataVertex              // メタデータ情報を表す頂点。
//     | RangeVertex                 // ソースコード内の特定の範囲を表す頂点。特定のスコープ、ブロック、またはメソッドを示す。
//     | DocumentSymbolResultVertex  // ドキュメント内のシンボルの検索結果を表す頂点。
//     | DollarEventVertex           // 特定のイベントやアクションを表す頂点。
//     | FoldingRangeResultVertex    // 折りたたみ範囲の結果を表す頂点。
//     | DefinitionResultVertex      // 定義の検索結果を表す頂点。
//     | ResultSetVertex             // クエリの結果セットを表す頂点。

// type Edge = 
//     | BelongsToEdge               // あるエンティティが別のエンティティに属している関係を表すエッジ。頂点間の依存関係や階層関係を示す。
//     | MonikerEdge                 // 一意の識別子を関連付けるためのエッジ。
//     | NextEdge                    // シーケンス内の次のエンティティへの参照を表すエッジ。
//     | HoverEdge                   // ホバー操作の結果と関連するエンティティを結びつけるエッジ。
//     | DefinitionEdge              // ソースコード内の定義とその位置を結びつけるエッジ。特定のメソッドや変数の定義を理解するのに役立つ。
//     | ReferencesEdge              // 参照とその位置を結びつけるエッジ。どの頂点が他の頂点に依存しているかを理解するのに役立つ。
//     | ItemEdge                    // 一般的なアイテムとその関連情報を結びつけるエッジ。
//     | ContainsEdge                // あるエンティティが別のエンティティを含む関係を表すエッジ。頂点間の依存関係を示すのに役立つ。
//     | DocumentsymbolEdge          // ドキュメント内のシンボルとその位置を結びつけるエッジ。
//     | FoldingrangeEdge            // 折りたたみ範囲とその位置を結びつけるエッジ。




    interface BelongsToEdge extends CommonAttributes {
        label: 'BelongsTo';
        outV: number;
        inV: number;
    }
    
    interface MonikerEdge extends CommonAttributes {
        label: 'Moniker';
        outV: number;
        inV: number;
    }
    
    interface NextEdge extends CommonAttributes {
        label: 'Next';
        outV: number;
        inV: number;
    }
    
    interface HoverEdge extends CommonAttributes {
        label: 'Hover';
        outV: number;
        inV: number;
    }
    
    interface DefinitionEdge extends CommonAttributes {
        label: 'Definition';
        outV: number;
        inV: number;
    }
    
    interface ReferencesEdge extends CommonAttributes {
        label: 'References';
        outV: number;
        inV: number;
    }
    
    interface ItemEdge extends CommonAttributes {
        label: 'Item';
        outV: number;
        inVs: number[];
        shard: number;
        property: string;
    }
    
    interface ContainsEdge extends CommonAttributes {
        label: 'Contains';
        outV: number;
        inVs: number[];
    }
    
    interface DocumentsymbolEdge extends CommonAttributes {
        label: 'Documentsymbol';
        outV: number;
        inV: number;
    }
    
    interface FoldingrangeEdge extends CommonAttributes {
        label: 'Foldingrange';
        outV: number;
        inV: number;
    }
    



interface DocumentVertex extends CommonAttributes {
    label: 'document';
    uri: string;
    languageId: string;
    contents: string;
}

interface ReferenceResultVertex extends CommonAttributes {
    label: 'referenceResult';
}


interface MonikerVertex extends CommonAttributes {
    label: 'moniker';
    scheme: string;
    identifier: string;
    unique: string;
    kind: string;
}

interface HoverResultVertex extends CommonAttributes {
    label: 'hoverResult';
    result: object;
}

interface GroupVertex extends CommonAttributes {
    label: 'group';
    uri: string;
    conflictResolution: string;
    name: string;
    rootUri: string;
}

interface ProjectVertex extends CommonAttributes {
    label: 'project';
    kind: string;
    name: string;
    resource: string;
}

interface MetadataVertex extends CommonAttributes {
    label: 'metaData';
    version: string;
    positionEncoding: string;
}

interface RangeVertex extends CommonAttributes {
    label: 'range';
    start: object;
    end: object;
    tag: object;
}

interface DocumentSymbolResultVertex extends CommonAttributes {
    label: 'documentSymbolResult';
    result: any[];
}

interface DollarEventVertex extends CommonAttributes {
    label: '$event';
    scope: string;
    kind: string;
    data: number;
}

interface FoldingRangeResultVertex extends CommonAttributes {
    label: 'foldingRangeResult';
    result: any[];
}

interface DefinitionResultVertex extends CommonAttributes {
    label: 'definitionResult';
}

interface ResultSetVertex extends CommonAttributes {
    label: 'resultSet';
}
