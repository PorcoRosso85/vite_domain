// エッジインターフェース	label値
// BelongsToEdge	'belongsTo'
// MonikerEdge	'moniker'
// NextEdge	'next'
// HoverEdge	'textDocument/hover'
// DefinitionEdge	'textDocument/definition'
// ReferencesEdge	'textDocument/references'
// ItemEdge	'item'

interface CommonAttributes {
    id: number;
    type: 'vertex' | 'edge';
    label: string;
}

// Edge Interfaces
interface BelongsToEdge extends CommonAttributes {
    label: 'belongsTo';
    outV: number;
    inV: number;
}

interface MonikerEdge extends CommonAttributes {
    label: 'moniker';
    outV: number;
    inV: number;
}

interface NextEdge extends CommonAttributes {
    label: 'next';
    outV: number;
    inV: number;
}

interface HoverEdge extends CommonAttributes {
    label: 'textDocument/hover';
    outV: number;
    inV: number;
}

interface DefinitionEdge extends CommonAttributes {
    label: 'textDocument/definition';
    outV: number;
    inV: number;
}

interface ReferencesEdge extends CommonAttributes {
    label: 'textDocument/references';
    outV: number;
    inV: number;
}

interface ItemEdge extends CommonAttributes {
    label: 'item';
    outV: number;
    inVs: number[];
    shard: number;
    property?: 'definitions' | 'references';
}

// 全てのedgeインターフェースを統合
type Edge = 
    | BelongsToEdge
    | MonikerEdge
    | NextEdge
    | HoverEdge
    | DefinitionEdge
    | ReferencesEdge
    | ItemEdge;

    

// Vertex Interfaces
interface MetaDataVertex extends CommonAttributes {
    label: 'metaData';
    version: string;
    positionEncoding: string;
}

interface GroupVertex extends CommonAttributes {
    label: 'group';
    uri: string;
}

interface EventVertex extends CommonAttributes {
    label: '$event';
    scope: string;
    kind: string;
    data: number;
}

interface ProjectVertex extends CommonAttributes {
    label: 'project';
    kind: string;
    name: string;
    resource?: string;
}

interface DocumentVertex extends CommonAttributes {
    label: 'document';
    uri: string;
}

interface ResultSetVertex extends CommonAttributes {
    label: 'resultSet';
}

interface MonikerVertex extends CommonAttributes {
    label: 'moniker';
    scheme: string;
    identifier: string;
    unique: string;
}

interface RangeVertex extends CommonAttributes {
    label: 'range';
    start: {
        line: number;
        character: number;
    };
    end: {
        line: number;
        character: number;
    };
}

interface HoverResultVertex extends CommonAttributes {
    label: 'hoverResult';
    result: {
        contents: Array<{ language: string; value: string }>;
    };
}

// TODO: ... 他のvertexインターフェースも同様に定義 ...

// 全てのvertexとedgeインターフェースを統合
type Vertex = 
    | MetaDataVertex
    | GroupVertex
    | EventVertex
    | ProjectVertex
    | DocumentVertex
    | ResultSetVertex
    | MonikerVertex
    | RangeVertex
    | HoverResultVertex
    // TODO: ... 他のvertexインターフェース ...


type LSIFEntry = Vertex | Edge;
