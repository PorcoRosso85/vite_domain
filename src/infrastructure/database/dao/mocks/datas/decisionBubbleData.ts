const data = {
    "nodes": [
      {
        "id": "trend",
        "name": "Trend",
        "level": 0,
        "childrenNum": 11,
        "tag": "trend"
      },
      {
        "id": "compare",
        "name": "Compare",
        "level": 0,
        "childrenNum": 33,
        "tag": "compare"
      },
      {
        "id": "percentage",
        "name": "Percentage",
        "level": 0,
        "childrenNum": 14,
        "tag": "percentage"
      },
      {
        "id": "flow",
        "name": "Flow",
        "level": 0,
        "childrenNum": 4,
        "tag": "flow"
      },
      {
        "id": "distribution",
        "name": "Distribution",
        "level": 0,
        "tag": "distribution",
        "childrenNum": 12
      },
      {
        "id": "relation",
        "name": "Relation",
        "level": 0,
        "tag": "relation",
        "childrenNum": 34
      },
      {
        "id": "composition",
        "name": "Composition",
        "level": 0,
        "childrenNum": 1,
        "tag": "composition"
      },
      {
        "id": "clustering",
        "name": "Clustering",
        "level": 1,
        "childrenNum": 7,
        "tag": "clustering",
        "isLeaf": false,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "hierarchy",
        "name": "Hierarchy",
        "level": 1,
        "childrenNum": 5,
        "tag": "hierarchy",
        "isLeaf": false,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "basiclinechart",
        "name": "Line\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend"
        ]
      },
      {
        "id": "multilinechart",
        "name": "Multi-line\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend",
          "compare"
        ]
      },
      {
        "id": "basicareachart",
        "name": "Area\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend"
        ]
      },
      {
        "id": "stackareachart",
        "name": "Stacked\nArea Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend",
          "compare",
          "percentage"
        ]
      },
      {
        "id": "percentstackareachart",
        "name": "% Stacked\nArea Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend",
          "compare",
          "percentage"
        ]
      },
      {
        "id": "intervalareachart",
        "name": "Interval\nArea Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend",
          "compare"
        ]
      },
      {
        "id": "streamchart",
        "name": "Stream Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend",
          "compare"
        ]
      },
      {
        "id": "basichistogram",
        "name": "Histogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "grouphistogram",
        "name": "Grouped\nHistogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "stackhistogram",
        "name": "Stacked\nHistogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "percentstackhistogram",
        "name": "% Stacked\nHistogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "intervalhistogram",
        "name": "Interval\nHistogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "waterfall",
        "name": "Waterfall",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "histogramunit",
        "name": "Histogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "distribution"
        ]
      },
      {
        "id": "basicbarchart",
        "name": "Bar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "stackbarchart",
        "name": "Stacked\nBar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "percentstackbarchart",
        "name": "Percent Stacked\nBar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "groupbarchart",
        "name": "Grouped\nBar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "intervalbarchart",
        "name": "Interval Bar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "radiobarchart",
        "name": "Radio\nBar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "percentage"
        ]
      },
      {
        "id": "symetricgroupbarchart",
        "name": "Symetric Grouped\nBar Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "basicpiechart",
        "name": "Pie Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "percentage"
        ]
      },
      {
        "id": "ringpiechart",
        "name": "Ring\nPie Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "percentage"
        ]
      },
      {
        "id": "nestpiechart",
        "name": "Nested\nPie Chart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "percentage"
        ]
      },
      {
        "id": "nightingalechart",
        "name": "Nightingale\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "percentage"
        ]
      },
      {
        "id": "scatterplotunit",
        "name": "Scatter\nPlot",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "distribution",
          "relation"
        ]
      },
      {
        "id": "bubblescatterplot",
        "name": "Bubble\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "distribution",
          "relation"
        ]
      },
      {
        "id": "circulararcdiagram",
        "name": "Circular\nArc Diagram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "arcdiagram",
        "name": "Arc\nDiagram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "chorddiagram",
        "name": "Chord\nDiagram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "treemap",
        "name": "Treemap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "percentage",
          "compare",
          "relation"
        ]
      },
      {
        "id": "sankey",
        "name": "Sankey",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "flow",
          "trend",
          "relation"
        ]
      },
      {
        "id": "basicfunnel",
        "name": "Funnel",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "flow",
          "compare",
          "relation"
        ]
      },
      {
        "id": "comparefunnel",
        "name": "Compared\nFunnel",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "flow",
          "compare",
          "relation"
        ]
      },
      {
        "id": "symetricfunnel",
        "name": "Symetric\nFunnel",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "flow",
          "compare",
          "relation"
        ]
      },
      {
        "id": "bubblemap",
        "name": "Bubble\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "binchart",
        "name": "Bin\nChart",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "colorblockheatmap",
        "name": "Color Block\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "basicheatmap",
        "name": "Heatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "instrument",
        "name": "Instrument",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "radar",
        "name": "Radar",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "stockklines",
        "name": "Stock\nKLines",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "trend"
        ]
      },
      {
        "id": "wordcloud",
        "name": "Word\nCloud",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "candlestick",
        "name": "Candle\nStick",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend"
        ]
      },
      {
        "id": "compactBox",
        "name": "CompactBox",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-hierarchy"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*WGHWQYjLmXoAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/tree/compactBox#tbCompactBox"
        ],
        "links_en": [
          "/g6/en/examples/tree/compactBox#tbCompactBox"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "dendrogram",
        "name": "Dendrogram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-hierarchy"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*r51nTJ-Ha5MAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/tree/dendrogram#tbDendrogram"
        ],
        "links_en": [
          "/g6/en/examples/tree/dendrogram#tbDendrogram"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "mindmap",
        "name": "Mindmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-hierarchy"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*VFXlT6A_g7wAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/tree/mindmap"
        ],
        "links_en": [
          "/g6/en/examples/tree/mindmap"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "indented",
        "name": "Indeted",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-hierarchy"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*ywVeSJIfeK8AAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/tree/indented"
        ],
        "links_en": [
          "/g6/en/examples/tree/indented"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "radialtree",
        "name": "Radial\nTree",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-hierarchy"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*vUkTSpv9YqkAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/tree/radialtree"
        ],
        "links_en": [
          "/g6/en/examples/tree/radialtree"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "flowdiagram",
        "name": "Flow\nDiagram",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*35XETpuMRpsAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/dagreFlow"
        ],
        "links_en": [
          "/g6/en/examples/net/dagreFlow"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "fruchtermancluster",
        "name": "Fruchterman\nClustering",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-clustering"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*8qAMTomesZcAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/furchtermanLayout#fruchtermanClustering"
        ],
        "links_en": [
          "/g6/en/examples/net/furchtermanLayout#fruchtermanClustering"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "fruchterman",
        "name": "Fruchterman",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*XD22Q7uxddEAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/furchtermanLayout"
        ],
        "links_en": [
          "/g6/en/examples/net/furchtermanLayout"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "forcedirected",
        "name": "Force\nDirected",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*dokGR7uP50oAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/forceDirected"
        ],
        "links_en": [
          "/g6/en/examples/net/forceDirected"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "circular",
        "name": "Circular",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*2ZNjRqRzJggAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/circular"
        ],
        "links_en": [
          "/g6/en/examples/net/circular"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "spiral",
        "name": "Spiral",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*5NkUTJyXfIcAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/circular#spiralCircular"
        ],
        "links_en": [
          "/g6/en/examples/net/circular#spiralCircular"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "radial",
        "name": "Radial",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*KON0Rbv5XtEAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/radialLayout"
        ],
        "links_en": [
          "/g6/en/examples/net/radialLayout"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "concentric",
        "name": "Concentric",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*zxlhRobv7VEAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/concentricLayout"
        ],
        "links_en": [
          "/g6/en/examples/net/concentricLayout"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "grid",
        "name": "Grid",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*wlkBRKmjVNgAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/gridLayout"
        ],
        "links_en": [
          "/g6/en/examples/net/gridLayout"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "bubbles",
        "name": "Bubbles",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation",
          "compare"
        ],
        "imgSrc": "https://gw.alipayobjects.com/mdn/rms_f8c6a0/afts/img/A*EaIlRqda-VcAAAAAAAAAAABkARQnAQ",
        "links": [
          "/g6/zh/examples/net/forceDirected#forceBubbles"
        ],
        "links_en": [
          "/g6/en/examples/net/forceDirected#forceBubbles"
        ],
        "linkNames": [
          "G6"
        ]
      },
      {
        "id": "dotmap",
        "name": "Dot Map",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution"
        ]
      },
      {
        "id": "symbollayer",
        "name": "Symbol\nLayer",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "clustermap",
        "name": "Clustered\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation-clustering",
          "compare"
        ]
      },
      {
        "id": "chartmap",
        "name": "Chart\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare",
          "composition"
        ]
      },
      {
        "id": "columnmap",
        "name": "3D Column\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution",
          "compare"
        ]
      },
      {
        "id": "scattermap",
        "name": "Scatter\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "distribution"
        ]
      },
      {
        "id": "pathmap",
        "name": "Path Map",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "trend"
        ]
      },
      {
        "id": "relationmap",
        "name": "Relation\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "arc3dmap",
        "name": "3D Arc Map",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "relation"
        ]
      },
      {
        "id": "choroplethmap",
        "name": "Chropleth\nMap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare"
        ]
      },
      {
        "id": "hexagonalheatmap",
        "name": "Hexagonal\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "relation-clustering"
        ]
      },
      {
        "id": "3dgridbinheatmap",
        "name": "3D Grid\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "relation-clustering"
        ]
      },
      {
        "id": "3dhexagonalheatmap",
        "name": "3D Hexagonal\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "relation-clustering"
        ]
      },
      {
        "id": "classicalheatmap",
        "name": "Classical\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "relation-clustering"
        ]
      },
      {
        "id": "gridbinheatmap",
        "name": "Grid Bin\nHeatmap",
        "level": 2,
        "isLeaf": true,
        "tags": [
          "compare",
          "relation-clustering"
        ]
      }
    ],
    "edges": [
      {
        "source": "relation",
        "target": "hierarchy"
      },
      {
        "source": "relation",
        "target": "clustering"
      },
      {
        "source": "trend",
        "target": "basiclinechart"
      },
      {
        "source": "trend",
        "target": "multilinechart"
      },
      {
        "source": "compare",
        "target": "multilinechart"
      },
      {
        "source": "trend",
        "target": "basicareachart"
      },
      {
        "source": "trend",
        "target": "stackareachart"
      },
      {
        "source": "compare",
        "target": "stackareachart"
      },
      {
        "source": "percentage",
        "target": "stackareachart"
      },
      {
        "source": "trend",
        "target": "percentstackareachart"
      },
      {
        "source": "compare",
        "target": "percentstackareachart"
      },
      {
        "source": "percentage",
        "target": "percentstackareachart"
      },
      {
        "source": "trend",
        "target": "intervalareachart"
      },
      {
        "source": "compare",
        "target": "intervalareachart"
      },
      {
        "source": "trend",
        "target": "streamchart"
      },
      {
        "source": "compare",
        "target": "streamchart"
      },
      {
        "source": "compare",
        "target": "basichistogram"
      },
      {
        "source": "compare",
        "target": "grouphistogram"
      },
      {
        "source": "compare",
        "target": "stackhistogram"
      },
      {
        "source": "compare",
        "target": "percentstackhistogram"
      },
      {
        "source": "percentage",
        "target": "percentstackhistogram"
      },
      {
        "source": "compare",
        "target": "intervalhistogram"
      },
      {
        "source": "compare",
        "target": "waterfall"
      },
      {
        "source": "compare",
        "target": "histogramunit"
      },
      {
        "source": "distribution",
        "target": "histogramunit"
      },
      {
        "source": "compare",
        "target": "basicbarchart"
      },
      {
        "source": "percentage",
        "target": "basicbarchart"
      },
      {
        "source": "compare",
        "target": "stackbarchart"
      },
      {
        "source": "percentage",
        "target": "stackbarchart"
      },
      {
        "source": "compare",
        "target": "percentstackbarchart"
      },
      {
        "source": "percentage",
        "target": "percentstackbarchart"
      },
      {
        "source": "compare",
        "target": "groupbarchart"
      },
      {
        "source": "percentage",
        "target": "groupbarchart"
      },
      {
        "source": "compare",
        "target": "intervalbarchart"
      },
      {
        "source": "percentage",
        "target": "intervalbarchart"
      },
      {
        "source": "compare",
        "target": "radiobarchart"
      },
      {
        "source": "percentage",
        "target": "radiobarchart"
      },
      {
        "source": "compare",
        "target": "symetricgroupbarchart"
      },
      {
        "source": "percentage",
        "target": "basicpiechart"
      },
      {
        "source": "percentage",
        "target": "ringpiechart"
      },
      {
        "source": "percentage",
        "target": "nestpiechart"
      },
      {
        "source": "percentage",
        "target": "nightingalechart"
      },
      {
        "source": "comare",
        "target": "scatterplotunit"
      },
      {
        "source": "distribution",
        "target": "scatterplotunit"
      },
      {
        "source": "relation",
        "target": "scatterplotunit"
      },
      {
        "source": "comare",
        "target": "bubblescatterplot"
      },
      {
        "source": "distribution",
        "target": "bubblescatterplot"
      },
      {
        "source": "relation",
        "target": "bubblescatterplot"
      },
      {
        "source": "relation",
        "target": "circulararcdiagram"
      },
      {
        "source": "relation",
        "target": "arcdiagram"
      },
      {
        "source": "relation",
        "target": "chorddiagram"
      },
      {
        "source": "compare",
        "target": "treemap"
      },
      {
        "source": "relation",
        "target": "treemap"
      },
      {
        "source": "percentage",
        "target": "treemap"
      },
      {
        "source": "flow",
        "target": "sankey"
      },
      {
        "source": "relation",
        "target": "sankey"
      },
      {
        "source": "trend",
        "target": "sankey"
      },
      {
        "source": "flow",
        "target": "basicfunnel"
      },
      {
        "source": "compare",
        "target": "basicfunnel"
      },
      {
        "source": "relation",
        "target": "basicfunnel"
      },
      {
        "source": "flow",
        "target": "comparefunnel"
      },
      {
        "source": "compare",
        "target": "comparefunnel"
      },
      {
        "source": "relation",
        "target": "comparefunnel"
      },
      {
        "source": "flow",
        "target": "symetricfunnel"
      },
      {
        "source": "compare",
        "target": "symetricfunnel"
      },
      {
        "source": "relation",
        "target": "symetricfunnel"
      },
      {
        "source": "compare",
        "target": "bubblemap"
      },
      {
        "source": "distribution",
        "target": "bubblemap"
      },
      {
        "source": "compare",
        "target": "binchart"
      },
      {
        "source": "distribution",
        "target": "binchart"
      },
      {
        "source": "compare",
        "target": "colorblockheatmap"
      },
      {
        "source": "distribution",
        "target": "colorblockheatmap"
      },
      {
        "source": "compare",
        "target": "basicheatmap"
      },
      {
        "source": "distribution",
        "target": "basicheatmap"
      },
      {
        "source": "compare",
        "target": "instrument"
      },
      {
        "source": "compare",
        "target": "radar"
      },
      {
        "source": "trend",
        "target": "stockklines"
      },
      {
        "source": "compare",
        "target": "stockklines"
      },
      {
        "source": "compare",
        "target": "wordcloud"
      },
      {
        "source": "trend",
        "target": "candlestick"
      },
      {
        "source": "hierarchy",
        "target": "compactBox"
      },
      {
        "source": "hierarchy",
        "target": "dendrogram"
      },
      {
        "source": "hierarchy",
        "target": "mindmap"
      },
      {
        "source": "hierarchy",
        "target": "indented"
      },
      {
        "source": "hierarchy",
        "target": "radialtree"
      },
      {
        "source": "relation",
        "target": "flowdiagram"
      },
      {
        "source": "clustering",
        "target": "fruchtermancluster"
      },
      {
        "source": "relation",
        "target": "fruchterman"
      },
      {
        "source": "relation",
        "target": "forcedirected"
      },
      {
        "source": "relation",
        "target": "circular"
      },
      {
        "source": "relation",
        "target": "spiral"
      },
      {
        "source": "relation",
        "target": "radial"
      },
      {
        "source": "relation",
        "target": "concentric"
      },
      {
        "source": "distribution",
        "target": "concentric"
      },
      {
        "source": "distribution",
        "target": "grid"
      },
      {
        "source": "relation",
        "target": "grid"
      },
      {
        "source": "relation",
        "target": "bubbles"
      },
      {
        "source": "compare",
        "target": "bubbles"
      },
      {
        "source": "distribution",
        "target": "dotmap"
      },
      {
        "source": "distribution",
        "target": "symbollayer"
      },
      {
        "source": "compare",
        "target": "symbollayer"
      },
      {
        "source": "clustering",
        "target": "clustermap"
      },
      {
        "source": "compare",
        "target": "clustermap"
      },
      {
        "source": "compare",
        "target": "chartmap"
      },
      {
        "source": "composition",
        "target": "chartmap"
      },
      {
        "source": "distribution",
        "target": "chartmap"
      },
      {
        "source": "distribution",
        "target": "columnmap"
      },
      {
        "source": "compare",
        "target": "columnmap"
      },
      {
        "source": "distribution",
        "target": "scattermap"
      },
      {
        "source": "trend",
        "target": "pathmap"
      },
      {
        "source": "relation",
        "target": "relationmap"
      },
      {
        "source": "relation",
        "target": "arc3dmap"
      },
      {
        "source": "compare",
        "target": "choroplethmap"
      },
      {
        "source": "compare",
        "target": "hexagonalheatmap"
      },
      {
        "source": "clustering",
        "target": "hexagonalheatmap"
      },
      {
        "source": "compare",
        "target": "3dgridbinheatmap"
      },
      {
        "source": "clustering",
        "target": "3dgridbinheatmap"
      },
      {
        "source": "compare",
        "target": "3dhexagonalheatmap"
      },
      {
        "source": "clustering",
        "target": "3dhexagonalheatmap"
      },
      {
        "source": "compare",
        "target": "classicalheatmap"
      },
      {
        "source": "clustering",
        "target": "classicalheatmap"
      },
      {
        "source": "compare",
        "target": "gridbinheatmap"
      },
      {
        "source": "clustering",
        "target": "gridbinheatmap"
      }
    ]
  }