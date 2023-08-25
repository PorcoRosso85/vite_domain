import G6 from "@antv/g6";
import insertCss from "insert-css";
import { isNumber, isArray } from '@antv/util';

export function graphLargeExploration(container: HTMLDivElement) {
	insertCss(`
	  .g6-component-contextmenu {
	    position: absolute;
	    z-index: 2;
	    list-style-type: none;
	    background-color: #363b40;
	    border-radius: 6px;
	    font-size: 14px;
	    color: hsla(0,0%,100%,.85);
	    width: fit-content;
	    transition: opacity .2s;
	    text-align: center;
	    padding: 0px 20px 0px 20px;
			box-shadow: 0 5px 18px 0 rgba(0, 0, 0, 0.6);
			border: 0px;
	  }
	  .g6-component-contextmenu ul {
			padding-left: 0px;
			margin: 0;
	  }
	  .g6-component-contextmenu li {
	    cursor: pointer;
	    list-style-type: none;
	    list-style: none;
	    margin-left: 0;
	    line-height: 38px;
	  }
	  .g6-component-contextmenu li:hover {
	    color: #aaaaaa;
		}
	`);

	const { labelPropagation, louvain, findShortestPath } = G6.Algorithm;
	const { uniqueId } = G6.Util;

	const NODESIZEMAPPING = "degree";
	const SMALLGRAPHLABELMAXLENGTH = 5;
	let labelMaxLength = SMALLGRAPHLABELMAXLENGTH;
	const DEFAULTNODESIZE = 20;
	const DEFAULTAGGREGATEDNODESIZE = 53;
	const NODE_LIMIT = 40; // TODO: find a proper number for maximum node number on the canvas

	let graph = null;
	let currentUnproccessedData = { nodes: [], edges: [] };
	let nodeMap = {};
	let aggregatedNodeMap = {};
	let hiddenItemIds = []; // 隐藏的元素 id 数组
	let largeGraphMode = true;
	let cachePositions = {};
	let manipulatePosition = undefined;
	let descreteNodeCenter;
	let layout = {
	  type: "",
	  instance: null,
	  destroyed: true,
	};
	let expandArray = [];
	let collapseArray = [];
	let shiftKeydown = false;
	let CANVAS_WIDTH = 800,
	  CANVAS_HEIGHT = 800;

	const duration = 2000;
	const animateOpacity = 0.6;
	const animateBackOpacity = 0.1;
	const virtualEdgeOpacity = 0.1;
	const realEdgeOpacity = 0.2;

	const darkBackColor = "rgb(43, 47, 51)";
	const disableColor = "#777";
	const theme = "dark";
	const subjectColors = [
	  "#5F95FF", // blue
	  "#61DDAA",
	  "#65789B",
	  "#F6BD16",
	  "#7262FD",
	  "#78D3F8",
	  "#9661BC",
	  "#F6903D",
	  "#008685",
	  "#F08BB4",
	];

	// このコードの断片は、G6 ライブラリの Util.getColorSetsBySubjectColors メソッドを使用して、与えられたテーマや色に基づいて一連の色セットを取得しています。具体的なパラメータについて説明します：
	// subjectColors: 主要な色の配列またはリスト。これらの色を基に色セットが生成されます。
	// darkBackColor: 背景色や基準色として使用される色。一般的に、暗い背景色を指す場合が多いです。
	// theme: 使用するテーマ。テーマに応じて、色の明るさや彩度が調整される可能性があります。
	// disableColor: 非アクティブまたは無効化された要素の色を指定します。
	// このメソッドの出力は、各 subjectColor に対する色セットとして返されます。色セットは、元の色に加えて、その派生色や関連色など、その色に関連するさまざまな色から成り立っています。
	// この機能は、グラフの視覚的な一貫性を向上させるために役立ちます。たとえば、ノードやエッジの色を他の関連する要素の色と一致させることで、ユーザーがグラフを解釈するのが容易になります。
	const colorSets = G6.Util.getColorSetsBySubjectColors(
	  subjectColors,
	  darkBackColor,
	  theme,
	  disableColor
	);

	// このコードは、global というオブジェクトを定義しており、G6 グラフのグローバルなスタイル設定を持っています。具体的には、ノードとエッジのデフォルトのスタイルや、特定の状態（この場合は「focus」）のときのスタイルを設定しています。
	// node: ノードに関する全般的なスタイルを指定します。
	// style: ノードの基本的なスタイル。fill はノードの背景色を指定します。
	// labelCfg: ノードのラベルに関する設定。
	// style: ラベルのスタイル。fill はテキストの色、stroke はテキストの周りの線の色を指定します。
	// stateStyles: 特定の状態のときのノードのスタイル。
	// focus: 「focus」状態のときのスタイル。fill は背景色を指定します。
	// edge: エッジ（リンクや接続線）に関する全般的なスタイルを指定します。
	// style: エッジの基本的なスタイル。stroke はエッジの色、realEdgeStroke は実際のエッジの色、realEdgeOpacity はエッジの透明度、strokeOpacity はエッジの線の透明度を指定します。
	// labelCfg: エッジのラベルに関する設定。
	// style: ラベルのスタイル。fill はテキストの色、realEdgeStroke はテキストの周りの実際の線の色、realEdgeOpacity はテキストの周りの線の透明度、stroke はテキストの周りの線の色を指定します。
	// stateStyles: 特定の状態のときのエッジのスタイル。
	// focus: 「focus」状態のときのスタイル。stroke はエッジの色を指定します。
	// この global オブジェクトは、G6 グラフを初期化するときや、グラフのスタイルを動的に変更するときに使用できます。
	const global = {
	  node: {
	    style: {
	      fill: "#2B384E",
	    },
	    labelCfg: {
	      style: {
		fill: "#acaeaf",
		stroke: "#191b1c",
	      },
	    },
	    stateStyles: {
	      focus: {
		fill: "#2B384E",
	      },
	    },
	  },
	  edge: {
	    style: {
	      stroke: "#acaeaf",
	      realEdgeStroke: "#acaeaf", //'#f00',
	      realEdgeOpacity,
	      strokeOpacity: realEdgeOpacity,
	    },
	    labelCfg: {
	      style: {
		fill: "#acaeaf",
		realEdgeStroke: "#acaeaf", //'#f00',
		realEdgeOpacity: 0.5,
		stroke: "#191b1c",
	      },
	    },
	    stateStyles: {
	      focus: {
		stroke: "#fff", // '#3C9AE8',
	      },
	    },
	  },
	};

	// このコードは、G6 ライブラリを使用して、カスタムの「aggregated-node」という名前のノードタイプを定義しています。
	// draw(cfg, group): ノードを描画するための関数。
	// ノードのサイズやスタイルを定義。 いくつかのシェイプ（矩形、テキスト、円）をグループに追加して、ノードの外観を構築。
	// setState(name, value, item): ノードの状態を設定する関数。
	// hover および focus の2つの主要な状態を処理。これらの状態が変わったときに、ノードの外観を変更するロジックが含まれている。
	// hover 状態が true のとき、ハロー（輝き）が表示され、キーシェイプの色がアクティブ色に変更。
	// focus 状態が true のとき、ストロークが表示され、キーシェイプの色が選択された色に変更。
	// update: 現在は未定義。ノードが更新されるときのロジックを追加する場所。
	// このカスタムノードは、"single-node" を基にしており、G6 の既存の single-node タイプの特性を継承しています。
	// このようなカスタムのノード定義を使用することで、通常の四角や円形のノードよりも複雑で視覚的に魅力的なノードを作成できます。
	// Custom super node
	G6.registerNode(
	  "aggregated-node",
	  {
	    draw(cfg, group) {
	      let width = 53,
		height = 27;
	      const style = cfg.style || {};
	      const colorSet = cfg.colorSet || colorSets[0];

	      // halo for hover
	      group.addShape("rect", {
		attrs: {
		  x: -width * 0.55,
		  y: -height * 0.6,
		  width: width * 1.1,
		  height: height * 1.2,
		  fill: colorSet.mainFill,
		  opacity: 0.9,
		  lineWidth: 0,
		  radius: (height / 2 || 13) * 1.2,
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "halo-shape",
		visible: false,
	      });

	      // focus stroke for hover
	      group.addShape("rect", {
		attrs: {
		  x: -width * 0.55,
		  y: -height * 0.6,
		  width: width * 1.1,
		  height: height * 1.2,
		  fill: colorSet.mainFill, // '#3B4043',
		  stroke: "#AAB7C4",
		  lineWidth: 1,
		  lineOpacty: 0.85,
		  radius: (height / 2 || 13) * 1.2,
		},
		name: "stroke-shape",
		visible: false,
	      });

	      const keyShape = group.addShape("rect", {
		attrs: {
		  ...style,
		  x: -width / 2,
		  y: -height / 2,
		  width,
		  height,
		  fill: colorSet.mainFill, // || '#3B4043',
		  stroke: colorSet.mainStroke,
		  lineWidth: 2,
		  cursor: "pointer",
		  radius: height / 2 || 13,
		  lineDash: [2, 2],
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "aggregated-node-keyShape",
	      });

	      let labelStyle = {};
	      if (cfg.labelCfg) {
		labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
	      }
	      group.addShape("text", {
		attrs: {
		  text: `${cfg.count}`,
		  x: 0,
		  y: 0,
		  textAlign: "center",
		  textBaseline: "middle",
		  cursor: "pointer",
		  fontSize: 12,
		  fill: "#fff",
		  opacity: 0.85,
		  fontWeight: 400,
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "count-shape",
		className: "count-shape",
		draggable: true,
	      });

	      // tag for new node
	      if (cfg.new) {
		group.addShape("circle", {
		  attrs: {
		    x: width / 2 - 3,
		    y: -height / 2 + 3,
		    r: 4,
		    fill: "#6DD400",
		    lineWidth: 0.5,
		    stroke: "#FFFFFF",
		  },
		  // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		  name: "typeNode-tag-circle",
		});
	      }
	      return keyShape;
	    },
	    setState: (name, value, item) => {
	      const group = item.get("group");
	      if (name === "layoutEnd" && value) {
		const labelShape = group.find((e) => e.get("name") === "text-shape");
		if (labelShape) labelShape.set("visible", true);
	      } else if (name === "hover") {
		if (item.hasState("focus")) {
		  return;
		}
		const halo = group.find((e) => e.get("name") === "halo-shape");
		const keyShape = item.getKeyShape();
		const colorSet = item.getModel().colorSet || colorSets[0];
		if (value) {
		  halo && halo.show();
		  keyShape.attr("fill", colorSet.activeFill);
		} else {
		  halo && halo.hide();
		  keyShape.attr("fill", colorSet.mainFill);
		}
	      } else if (name === "focus") {
		const stroke = group.find((e) => e.get("name") === "stroke-shape");
		const keyShape = item.getKeyShape();
		const colorSet = item.getModel().colorSet || colorSets[0];
		if (value) {
		  stroke && stroke.show();
		  keyShape.attr("fill", colorSet.selectedFill);
		} else {
		  stroke && stroke.hide();
		  keyShape.attr("fill", colorSet.mainFill);
		}
	      }
	    },
	    update: undefined,
	  },
	  "single-node"
	);

	// このコードは、前回の「aggregated-node」に続いて、G6 ライブラリを使って「real-node」という名前の新しいカスタムノードを定義しています。この新しいカスタムノードは、円形の形状で、一連の視覚的な機能とインタラクティブな動作を持っています。
	// draw(cfg, group): ノードを描画するための関数。
	// ノードのサイズやスタイルを定義。
	// ノードの中心点を基にしていくつかのシェイプ（円、テキスト）をグループに追加し、ノードの外観を構築。
	// setState(name, value, item): ノードの状態を設定する関数。
	// hover、focus、layoutEndといった状態を処理しています。これらの状態が変わったときに、ノードの外観やラベルのフォントの変更などのロジックが含まれています。
	// update: 現在は未定義ですが、ノードが更新されるときのロジックを追加する場所として予約されています。
	// また、このカスタムノードは、先に定義した"aggregated-node"の機能を継承しています。これにより、aggregated-nodeのsetState機能などがreal-nodeにも適用されることを意味します。
	// 全体として、このカスタムノードは、ユーザーがノード上にマウスをホバーするか、ノードをフォーカスするときのインタラクティブな動作を持っており、このようなカスタムのノード定義を使用することで、通常の円形のノードよりも複雑で視覚的に魅力的なノードを作成することができます。
	// Custom real node
	G6.registerNode(
	  "real-node",
	  {
	    draw(cfg, group) {
	      let r = 30;
	      if (isNumber(cfg.size)) {
		r = cfg.size / 2;
	      } else if (isArray(cfg.size)) {
		r = cfg.size[0] / 2;
	      }
	      const style = cfg.style || {};
	      const colorSet = cfg.colorSet || colorSets[0];

	      // halo for hover
	      group.addShape("circle", {
		attrs: {
		  x: 0,
		  y: 0,
		  r: r + 5,
		  fill: style.fill || colorSet.mainFill || "#2B384E",
		  opacity: 0.9,
		  lineWidth: 0,
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "halo-shape",
		visible: false,
	      });

	      // focus stroke for hover
	      group.addShape("circle", {
		attrs: {
		  x: 0,
		  y: 0,
		  r: r + 5,
		  fill: style.fill || colorSet.mainFill || "#2B384E",
		  stroke: "#fff",
		  strokeOpacity: 0.85,
		  lineWidth: 1,
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "stroke-shape",
		visible: false,
	      });

	      const keyShape = group.addShape("circle", {
		attrs: {
		  ...style,
		  x: 0,
		  y: 0,
		  r,
		  fill: colorSet.mainFill,
		  stroke: colorSet.mainStroke,
		  lineWidth: 2,
		  cursor: "pointer",
		},
		// must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		name: "aggregated-node-keyShape",
	      });

	      let labelStyle = {};
	      if (cfg.labelCfg) {
		labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
	      }

	      if (cfg.label) {
		const text = cfg.label;
		let labelStyle = {};
		let refY = 0;
		if (cfg.labelCfg) {
		  labelStyle = Object.assign(labelStyle, cfg.labelCfg.style);
		  refY += cfg.labelCfg.refY || 0;
		}
		let offsetY = 0;
		const fontSize = labelStyle.fontSize < 8 ? 8 : labelStyle.fontSize;
		const lineNum = cfg.labelLineNum || 1;
		offsetY = lineNum * (fontSize || 12);
		group.addShape("text", {
		  attrs: {
		    text,
		    x: 0,
		    y: r + refY + offsetY + 5,
		    textAlign: "center",
		    textBaseLine: "alphabetic",
		    cursor: "pointer",
		    fontSize,
		    fill: "#fff",
		    opacity: 0.85,
		    fontWeight: 400,
		    stroke: global.edge.labelCfg.style.stroke,
		  },
		  // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		  name: "text-shape",
		  className: "text-shape",
		});
	      }

	      // tag for new node
	      if (cfg.new) {
		group.addShape("circle", {
		  attrs: {
		    x: r - 3,
		    y: -r + 3,
		    r: 4,
		    fill: "#6DD400",
		    lineWidth: 0.5,
		    stroke: "#FFFFFF",
		  },
		  // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		  name: "typeNode-tag-circle",
		});
	      }

	      return keyShape;
	    },
	    setState: (name, value, item) => {
	      const group = item.get("group");
	      if (name === "layoutEnd" && value) {
		const labelShape = group.find((e) => e.get("name") === "text-shape");
		if (labelShape) labelShape.set("visible", true);
	      } else if (name === "hover") {
		if (item.hasState("focus")) {
		  return;
		}
		const halo = group.find((e) => e.get("name") === "halo-shape");
		const keyShape = item.getKeyShape();
		const colorSet = item.getModel().colorSet || colorSets[0];
		if (value) {
		  halo && halo.show();
		  keyShape.attr("fill", colorSet.activeFill);
		} else {
		  halo && halo.hide();
		  keyShape.attr("fill", colorSet.mainFill);
		}
	      } else if (name === "focus") {
		const stroke = group.find((e) => e.get("name") === "stroke-shape");
		const label = group.find((e) => e.get("name") === "text-shape");
		const keyShape = item.getKeyShape();
		const colorSet = item.getModel().colorSet || colorSets[0];
		if (value) {
		  stroke && stroke.show();
		  keyShape.attr("fill", colorSet.selectedFill);
		  label && label.attr("fontWeight", 800);
		} else {
		  stroke && stroke.hide();
		  keyShape.attr("fill", colorSet.mainFill); // '#2B384E'
		  label && label.attr("fontWeight", 400);
		}
	      }
	    },
	    update: undefined,
	  },
	  "aggregated-node"
	); // 这样可以继承 aggregated-node 的 setState

	// このコードは、G6 ライブラリを使用して "custom-quadratic" という名前の新しいカスタムエッジを定義しています。この新しいエッジは、二次曲線（quadratic curve）を基にしており、特定の状態や動作に対する反応として視覚的な効果が設定されています。
	//
	// setState(name, value, item): エッジの状態を設定するための関数。
	// focus という名前の状態に対するロジックが定義されています。
	// フォーカスが当たった場合（value が true の場合）、エッジの外観が変更され、白色になります。さらに、エッジが実エッジ（isReal が true）の場合、エッジのアニメーションが実行されます。
	// フォーカスが外れた場合、エッジの外観はデフォルトの色に戻り、アニメーションが停止します。
	//
	// エッジがフォーカスされている間のアニメーション：
	// 実エッジの場合、エッジ全体がアニメーション効果を持ちます。
	// 実エッジではない場合、エッジのダッシュオフセットが変更され、エッジが動的に見えるようになります。
	//
	// アニメーションの設定には、lineDash, lineDashOffset などの属性が利用されており、これによってエッジの外観や動作が制御されています。
	// 最後に、このカスタムエッジは "quadratic" の機能を継承しています。これにより、quadratic エッジの基本的な機能や振る舞いが custom-quadratic エッジにも適用されることになります。
	// 全体として、このカスタムエッジは、ユーザーがエッジにフォーカスするときのインタラクティブな反応を持っており、このようなカスタムのエッジ定義を使用することで、通常のエッジよりも視覚的に魅力的なエッジを作成することができます。
	// Custom the quadratic edge for multiple edges between one node pair
	G6.registerEdge(
	  "custom-quadratic",
	  {
	    setState: (name, value, item) => {
	      const group = item.get("group");
	      const model = item.getModel();
	      if (name === "focus") {
		const back = group.find((ele) => ele.get("name") === "back-line");
		if (back) {
		  back.stopAnimate();
		  back.remove();
		  back.destroy();
		}
		const keyShape = group.find((ele) => ele.get("name") === "edge-shape");
		const arrow = model.style.endArrow;
		if (value) {
		  if (keyShape.cfg.animation) {
		    keyShape.stopAnimate(true);
		  }
		  keyShape.attr({
		    strokeOpacity: animateOpacity,
		    opacity: animateOpacity,
		    stroke: "#fff",
		    endArrow: {
		      ...arrow,
		      stroke: "#fff",
		      fill: "#fff",
		    },
		  });
		  if (model.isReal) {
		    const { lineWidth, path, endArrow, stroke } = keyShape.attr();
		    const back = group.addShape("path", {
		      attrs: {
			lineWidth,
			path,
			stroke,
			endArrow,
			opacity: animateBackOpacity,
		      },
		      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		      name: "back-line",
		    });
		    back.toBack();
		    const length = keyShape.getTotalLength();
		    keyShape.animate(
		      (ratio) => {
			// the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
			const startLen = ratio * length;
			// Calculate the lineDash
			const cfg = {
			  lineDash: [startLen, length - startLen],
			};
			return cfg;
		      },
		      {
			repeat: true, // Whether executes the animation repeatly
			duration, // the duration for executing once
		      }
		    );
		  } else {
		    let index = 0;
		    const lineDash = keyShape.attr("lineDash");
		    const totalLength = lineDash[0] + lineDash[1];
		    keyShape.animate(
		      () => {
			index++;
			if (index > totalLength) {
			  index = 0;
			}
			const res = {
			  lineDash,
			  lineDashOffset: -index,
			};
			// returns the modified configurations here, lineDash and lineDashOffset here
			return res;
		      },
		      {
			repeat: true, // whether executes the animation repeatly
			duration, // the duration for executing once
		      }
		    );
		  }
		} else {
		  keyShape.stopAnimate();
		  const stroke = "#acaeaf";
		  const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
		  keyShape.attr({
		    stroke,
		    strokeOpacity: opacity,
		    opacity,
		    endArrow: {
		      ...arrow,
		      stroke,
		      fill: stroke,
		    },
		  });
		}
	      }
	    },
	  },
	  "quadratic"
	);

	// このコードは、G6 ライブラリを使用して、一対のノード間の単一のエッジを表現するためのカスタムエッジ "custom-line" を登録しています。このカスタムエッジは、線型のエッジとして定義され、特定の状態や動作に対する視覚的な効果が設定されています。
	//
	// setState(name, value, item): エッジの状態を設定するための関数。
	// focus という名前の状態に対するロジックが定義されています。
	// フォーカスが当たった場合（value が true の場合）、エッジの外観が変更され、白色になります。さらに、エッジが実エッジ（isReal が true）の場合、エッジのアニメーションが実行されます。
	// フォーカスが外れた場合、エッジの外観はデフォルトの色に戻り、アニメーションが停止します。
	//
	// エッジがフォーカスされている間のアニメーション：
	// 実エッジの場合、エッジ全体がアニメーション効果を持ちます。
	// 実エッジではない場合、エッジのダッシュオフセットが変更され、エッジが動的に見えるようになります。
	//
	// アニメーションの設定には、lineDash, lineDashOffset などの属性が利用されており、これによってエッジの外観や動作が制御されています。
	// このカスタムエッジは "single-edge" の機能を継承しています。ただし、コード内で "single-edge" に関する詳細な定義が提供されていないため、"single-edge" の具体的な動作や属性は明確には分かりません。
	// 全体として、このカスタムエッジは、ユーザーがエッジにフォーカスするときのインタラクティブな反応を持っており、このようなカスタムのエッジ定義を使用することで、通常のエッジよりも視覚的に魅力的なエッジを作成することができます。
	// Custom the line edge for single edge between one node pair
	G6.registerEdge(
	  "custom-line",
	  {
	    setState: (name, value, item) => {
	      const group = item.get("group");
	      const model = item.getModel();
	      if (name === "focus") {
		const keyShape = group.find((ele) => ele.get("name") === "edge-shape");
		const back = group.find((ele) => ele.get("name") === "back-line");
		if (back) {
		  back.stopAnimate();
		  back.remove();
		  back.destroy();
		}
		const arrow = model.style.endArrow;
		if (value) {
		  if (keyShape.cfg.animation) {
		    keyShape.stopAnimate(true);
		  }
		  keyShape.attr({
		    strokeOpacity: animateOpacity,
		    opacity: animateOpacity,
		    stroke: "#fff",
		    endArrow: {
		      ...arrow,
		      stroke: "#fff",
		      fill: "#fff",
		    },
		  });
		  if (model.isReal) {
		    const { path, stroke, lineWidth } = keyShape.attr();
		    const back = group.addShape("path", {
		      attrs: {
			path,
			stroke,
			lineWidth,
			opacity: animateBackOpacity,
		      },
		      // must be assigned in G6 3.3 and later versions. it can be any string you want, but should be unique in a custom item type
		      name: "back-line",
		    });
		    back.toBack();
		    const length = keyShape.getTotalLength();
		    keyShape.animate(
		      (ratio) => {
			// the operations in each frame. Ratio ranges from 0 to 1 indicating the prograss of the animation. Returns the modified configurations
			const startLen = ratio * length;
			// Calculate the lineDash
			const cfg = {
			  lineDash: [startLen, length - startLen],
			};
			return cfg;
		      },
		      {
			repeat: true, // Whether executes the animation repeatly
			duration, // the duration for executing once
		      }
		    );
		  } else {
		    const lineDash = keyShape.attr("lineDash");
		    const totalLength = lineDash[0] + lineDash[1];
		    let index = 0;
		    keyShape.animate(
		      () => {
			index++;
			if (index > totalLength) {
			  index = 0;
			}
			const res = {
			  lineDash,
			  lineDashOffset: -index,
			};
			// returns the modified configurations here, lineDash and lineDashOffset here
			return res;
		      },
		      {
			repeat: true, // whether executes the animation repeatly
			duration, // the duration for executing once
		      }
		    );
		  }
		} else {
		  keyShape.stopAnimate();
		  const stroke = "#acaeaf";
		  const opacity = model.isReal ? realEdgeOpacity : virtualEdgeOpacity;
		  keyShape.attr({
		    stroke,
		    strokeOpacity: opacity,
		    opacity: opacity,
		    endArrow: {
		      ...arrow,
		      stroke,
		      fill: stroke,
		    },
		  });
		}
	      }
	    },
	  },
	  "single-edge"
	);

	// このコードは、配列のオブジェクトを指定されたプロパティで降順にソートするための比較関数を生成するヘルパー関数です。
	//
	// descendCompare(p):
	// 引数 p は、ソートの基準となるオブジェクトのプロパティを指定します。
	// この関数は、比較関数を返します。
	//
	// return function (m, n):
	// Array.prototype.sort() メソッドに供給するための比較関数です。
	// 引数 m と n は、ソートする配列の中の2つの要素です。
	//
	// const a = m[p];:
	// m のオブジェクトから、指定されたプロパティ p の値を取得します。
	//
	// const b = n[p];:
	// n のオブジェクトから、指定されたプロパティ p の値を取得します。
	//
	// return b - a;:
	// 降順のソートを行うため、b から a を引いた結果を返します。
	// b が a よりも大きい場合、正の数が返されます。
	// a が b よりも大きい場合、負の数が返されます。
	// a と b が等しい場合、0が返されます。
	const descendCompare = (p) => {
	  // 这是比较函数
	  // このコードは、2つの配列を比較し、1つ目の配列の要素が2つ目の配列の要素よりも大きい場合は1を返し、小さい場合は-1を返し、同じ場合は0を返す関数です。
	  // この関数は、Array.prototype.sort()メソッドで使用されます。
	  return function (m, n) {
	    const a = m[p];
	    const b = n[p];
	    return b - a; // 降序
	  };
	};

	// この関数clearFocusItemStateは、与えられたグラフのフォーカスされたノードとエッジの状態をクリアする目的で作られています。具体的な実装が提供されていませんが、関数名から推測できる動作は以下の通りです：
	// 与えられたgraphがnullやundefinedでないことを確認します。
	// clearFocusNodeState(graph)を呼び出して、フォーカスされたノードの状態をクリアします。
	// clearFocusEdgeState(graph)を呼び出して、フォーカスされたエッジの状態をクリアします。
	// これらのclearFocusNodeStateとclearFocusEdgeState関数の具体的な実装や動作は提供されていませんが、おそらくこれらの関数はG6グラフライブラリを使用してノードやエッジの特定の状態やスタイルをリセットするためのものでしょう。
	// 例えば、ユーザーが特定のノードやエッジをクリックまたはホバーしたときに、そのノードやエッジに特定のスタイルが適用されるかもしれません。この関数は、それらのスタイルをリセットして元の状態に戻すために使われる可能性があります。
	const clearFocusItemState = (graph) => {
	  if (!graph) return;
	  clearFocusNodeState(graph);
	  clearFocusEdgeState(graph);
	};

	// この関数`clearFocusNodeState`は、与えられたグラフ上のすべてのノードの`focus`状態および関連するスタイルをクリアするためのものです。関数の動作は以下のとおりです：
	// 1. 与えられた`graph`上で`focus`状態を持つすべてのノードを検索します。この状態のノードは`focusNodes`という配列に保存されます。
	// 2. `focusNodes`配列の各ノードに対して、`setItemState`メソッドを使用してそのノードの`focus`状態を`false`に設定します。これにより、ノードは`focus`状態を失い、関連するスタイルもクリアされます。
	// この関数は、グラフのノードが何らかの理由でハイライトまたは強調表示されている場合、そのハイライトや強調表示をリセットするために使われると考えられます。たとえば、ユーザーが特定のノードをクリックまたはホバーしたときに、そのノードがハイライトされる場合、この関数はそのハイライトを解除するために使われるでしょう。
	// 清除图上所有节点的 focus 状态及相应样式
	const clearFocusNodeState = (graph) => {
	  const focusNodes = graph.findAllByState("node", "focus");
	  focusNodes.forEach((fnode) => {
	    graph.setItemState(fnode, "focus", false); // false
	  });
	};

	// この関数clearFocusEdgeStateは、与えられたグラフ上のすべてのエッジ（辺）のfocus状態および関連するスタイルをクリアするためのものです。関数の動作は以下のとおりです：
	// 与えられたgraph上でfocus状態を持つすべてのエッジ（辺）を検索します。この状態のエッジはfocusEdgesという配列に保存されます。
	// focusEdges配列の各エッジに対して、setItemStateメソッドを使用してそのエッジのfocus状態をfalseに設定します。これにより、エッジはfocus状態を失い、関連するスタイルもクリアされます。
	// この関数は、グラフのエッジが何らかの理由でハイライトまたは強調表示されている場合、そのハイライトや強調表示をリセットするために使われると考えられます。たとえば、ユーザーが特定のエッジをクリックまたはホバーしたときに、そのエッジがハイライトされる場合、この関数はそのハイライトを解除するために使われるでしょう。
	// 清除图上所有边的 focus 状态及相应样式
	const clearFocusEdgeState = (graph) => {
	  const focusEdges = graph.findAllByState("edge", "focus");
	  focusEdges.forEach((fedge) => {
	    graph.setItemState(fedge, "focus", false);
	  });
	};

	// 截断长文本。length 为文本截断后长度，elipsis 是后缀
	// このコードではformatTextという関数を定義し、text、length、elipsisという3つのパラメータを受け取ります。
	// この関数は、入力テキストの長さが指定された長さより大きい場合、そのテキストを切り詰めたものを返します。入力テキストの長さが指定した長さ以下の場合、関数は元のテキストを返します。elipsis パラメータは、切り捨てられたテキストに接尾辞を追加するために使用されます。入力テキストが不正な文字列（例えば null や undefined や ""）である場合，この関数は空文字列を返します．
	const formatText = (text, length = 5, elipsis = "...") => {
	  if (!text) return "";
	  if (text.length > length) {
	    return `${text.substr(0, length)}${elipsis}`;
	  }
	  return text;
	};

	// labelFormatterという関数は、与えられたテキスト文字列が指定された最小の長さを超える場合に、そのテキストを切り取り、切り取られた部分に三点リーダー（...）を追加する目的で作成されました。以下は、それがどのように動作するかの簡単な説明です：
	// この関数は、2つのパラメータを受け取ります：
	// text：フォーマットしたい文字列。
	// minLength：テキストが切り取られる前に含むべき最大の文字数。デフォルト値は10です。
	// textの長さ（文字数として）がminLengthを超える場合、関数はテキストをminLengthまで切り取り、その後に三点リーダーを追加して返します。
	//
	// テキストがminLengthよりも短い、またはテキストが提供されていない場合、元のテキストをそのまま返します。 例として：
	// labelFormatter("こんにちは、世界！")を呼び出すと、"こんにちは、世..."という結果になります。
	// labelFormatter("こんにちは、世界！", 5)を呼び出すと、"こんに..."という結果になります。
	// labelFormatter("こんにちは！")を呼び出すと、"こんにちは！"という結果になります。
	// この関数は、UIのスペースが限られている場面や、長いラベルがレイアウトを崩したり、インターフェースを見づらくする可能性がある場面に特に便利です。
	const labelFormatter = (text, minLength = 10) => {
	  if (text && text.split("").length > minLength)
	    return `${text.substr(0, minLength)}...`;
	  return text;
	};

	// この関数は、ノードとエッジのデータを処理し、それらをグラフに描画するために必要な情報を生成します。
	// ノードの処理: 関数はまず、ノードの配列をループします。各ノードに対して、そのタイプ、ラベル、度数（接続されているエッジの数）、IDなどのプロパティが設定されます。また、ノードの位置がキャッシュされている場合はそれを使用し、そうでない場合は新しい位置を生成します。
	// エッジの処理: 次に、エッジの配列をループします。各エッジに対して、そのID、ソースノードとターゲットノード、度数（接続されているノードの数）などのプロパティが設定されます。また、エッジのカウント（重み）が最大値と最小値に基づいてサイズが計算されます。
	// ノードとエッジのスタイル設定: ノードとエッジの視覚的なスタイル（サイズ、色、ラベルの配置など）が設定されます。これには、ノードのレベル（リアルノードまたは集約ノード）、エッジのカウント（重み）、ノードの度数などが考慮されます。
	// 位置の調整: エッジのソースノードとターゲットノードの位置が調整され、それらが適切に配置されます。また、孤立したノード（どのエッジにも接続されていないノード）も特定の位置に配置されます。
	// 並行エッジの処理: G6.Util.processParallelEdges関数を使用して、並行エッジ（同じソースノードとターゲットノードを持つ複数のエッジ）が処理されます。
	// 結果の返却: 最大の度数とエッジの配列が返されます。これらは、後続の描画処理で使用されます。
	// この関数は、ノードとエッジのデータを受け取り、それらを適切に処理してグラフの描画に必要な情報を生成する役割を果たします。
	const processNodesEdges = (
	  nodes,
	  edges,
	  width,
	  height,
	  largeGraphMode,
	  edgeLabelVisible,
	  isNewGraph = false
	) => {
	  if (!nodes || nodes.length === 0) return {};
	  const currentNodeMap = {};
	  let maxNodeCount = -Infinity;
	  const paddingRatio = 0.3;
	  const paddingLeft = paddingRatio * width;
	  const paddingTop = paddingRatio * height;
	  nodes.forEach((node) => {
	    node.type = node.level === 0 ? "real-node" : "aggregated-node";
	    node.isReal = node.level === 0 ? true : false;
	    node.label = `${node.id}`;
	    node.labelLineNum = undefined;
	    node.oriLabel = node.label;
	    node.label = formatText(node.label, labelMaxLength, "...");
	    node.degree = 0;
	    node.inDegree = 0;
	    node.outDegree = 0;
	    if (currentNodeMap[node.id]) {
	      console.warn("node exists already!", node.id);
	      node.id = `${node.id}${Math.random()}`;
	    }
	    currentNodeMap[node.id] = node;
	    if (node.count > maxNodeCount) maxNodeCount = node.count;
	    const cachePosition = cachePositions ? cachePositions[node.id] : undefined;
	    if (cachePosition) {
	      node.x = cachePosition.x;
	      node.y = cachePosition.y;
	      node.new = false;
	    } else {
	      node.new = isNewGraph ? false : true;
	      if (manipulatePosition && !node.x && !node.y) {
		node.x =
		  manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
		node.y =
		  manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
	      }
	    }
	  });

	  let maxCount = -Infinity;
	  let minCount = Infinity;
	  // let maxCount = 0;
	  edges.forEach((edge) => {
	    // to avoid the dulplicated id to nodes
	    if (!edge.id) edge.id = uniqueId("edge");
	    else if (edge.id.split("-")[0] !== "edge") edge.id = `edge-${edge.id}`;
	    // TODO: delete the following line after the queried data is correct
	    if (!currentNodeMap[edge.source] || !currentNodeMap[edge.target]) {
	      console.warn(
		"edge source target does not exist",
		edge.source,
		edge.target,
		edge.id
	      );
	      return;
	    }
	    const sourceNode = currentNodeMap[edge.source];
	    const targetNode = currentNodeMap[edge.target];

	    if (!sourceNode || !targetNode)
	      console.warn(
		"source or target is not defined!!!",
		edge,
		sourceNode,
		targetNode
	      );

	    // calculate the degree
	    sourceNode.degree++;
	    targetNode.degree++;
	    sourceNode.outDegree++;
	    targetNode.inDegree++;

	    if (edge.count > maxCount) maxCount = edge.count;
	    if (edge.count < minCount) minCount = edge.count;
	  });

	  nodes.sort(descendCompare(NODESIZEMAPPING));
	  const maxDegree = nodes[0].degree || 1;

	  const descreteNodes = [];
	  nodes.forEach((node, i) => {
	    // assign the size mapping to the outDegree
	    const countRatio = node.count / maxNodeCount;
	    const isRealNode = node.level === 0;
	    node.size = isRealNode ? DEFAULTNODESIZE : DEFAULTAGGREGATEDNODESIZE;
	    node.isReal = isRealNode;
	    node.labelCfg = {
	      position: "bottom",
	      offset: 5,
	      style: {
		fill: global.node.labelCfg.style.fill,
		fontSize: 6 + countRatio * 6 || 12,
		stroke: global.node.labelCfg.style.stroke,
		lineWidth: 3,
	      },
	    };

	    if (!node.degree) {
	      descreteNodes.push(node);
	    }
	  });

	  const countRange = maxCount - minCount;
	  const minEdgeSize = 1;
	  const maxEdgeSize = 7;
	  const edgeSizeRange = maxEdgeSize - minEdgeSize;
	  edges.forEach((edge) => {
	    // set edges' style
	    const targetNode = currentNodeMap[edge.target];

	    const size =
	      ((edge.count - minCount) / countRange) * edgeSizeRange + minEdgeSize || 1;
	    edge.size = size;

	    const arrowWidth = Math.max(size / 2 + 2, 3);
	    const arrowLength = 10;
	    const arrowBeging = targetNode.size + arrowLength;
	    let arrowPath = `M ${arrowBeging},0 L ${
	      arrowBeging + arrowLength
	    },-${arrowWidth} L ${arrowBeging + arrowLength},${arrowWidth} Z`;
	    let d = targetNode.size / 2 + arrowLength;
	    if (edge.source === edge.target) {
	      edge.type = "loop";
	      arrowPath = undefined;
	    }
	    const sourceNode = currentNodeMap[edge.source];
	    const isRealEdge = targetNode.isReal && sourceNode.isReal;
	    edge.isReal = isRealEdge;
	    const stroke = isRealEdge
	      ? global.edge.style.realEdgeStroke
	      : global.edge.style.stroke;
	    const opacity = isRealEdge
	      ? global.edge.style.realEdgeOpacity
	      : global.edge.style.strokeOpacity;
	    const dash = Math.max(size, 2);
	    const lineDash = isRealEdge ? undefined : [dash, dash];
	    edge.style = {
	      stroke,
	      strokeOpacity: opacity,
	      cursor: "pointer",
	      lineAppendWidth: Math.max(edge.size || 5, 5),
	      fillOpacity: 1,
	      lineDash,
	      endArrow: arrowPath
		? {
		    path: arrowPath,
		    d,
		    fill: stroke,
		    strokeOpacity: 0,
		  }
		: false,
	    };
	    edge.labelCfg = {
	      autoRotate: true,
	      style: {
		stroke: global.edge.labelCfg.style.stroke,
		fill: global.edge.labelCfg.style.fill,
		lineWidth: 4,
		fontSize: 12,
		lineAppendWidth: 10,
		opacity: 1,
	      },
	    };
	    if (!edge.oriLabel) edge.oriLabel = edge.label;
	    if (largeGraphMode || !edgeLabelVisible) edge.label = "";
	    else {
	      edge.label = labelFormatter(edge.label, labelMaxLength);
	    }

	    // arrange the other nodes around the hub
	    const sourceDis = sourceNode.size / 2 + 20;
	    const targetDis = targetNode.size / 2 + 20;
	    if (sourceNode.x && !targetNode.x) {
	      targetNode.x =
		sourceNode.x + sourceDis * Math.cos(Math.random() * Math.PI * 2);
	    }
	    if (sourceNode.y && !targetNode.y) {
	      targetNode.y =
		sourceNode.y + sourceDis * Math.sin(Math.random() * Math.PI * 2);
	    }
	    if (targetNode.x && !sourceNode.x) {
	      sourceNode.x =
		targetNode.x + targetDis * Math.cos(Math.random() * Math.PI * 2);
	    }
	    if (targetNode.y && !sourceNode.y) {
	      sourceNode.y =
		targetNode.y + targetDis * Math.sin(Math.random() * Math.PI * 2);
	    }

	    if (!sourceNode.x && !sourceNode.y && manipulatePosition) {
	      sourceNode.x =
		manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
	      sourceNode.y =
		manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
	    }
	    if (!targetNode.x && !targetNode.y && manipulatePosition) {
	      targetNode.x =
		manipulatePosition.x + 30 * Math.cos(Math.random() * Math.PI * 2);
	      targetNode.y =
		manipulatePosition.y + 30 * Math.sin(Math.random() * Math.PI * 2);
	    }
	  });

	  descreteNodeCenter = {
	    x: width - paddingLeft,
	    y: height - paddingTop,
	  };
	  descreteNodes.forEach((node) => {
	    if (!node.x && !node.y) {
	      node.x =
		descreteNodeCenter.x + 30 * Math.cos(Math.random() * Math.PI * 2);
	      node.y =
		descreteNodeCenter.y + 30 * Math.sin(Math.random() * Math.PI * 2);
	    }
	  });

	  G6.Util.processParallelEdges(edges, 12.5, "custom-quadratic", "custom-line");
	  return {
	    maxDegree,
	    edges,
	  };
	};

	// この関数getForceLayoutConfigは、グラフの力学的配置に関する設定を生成します。具体的には、ノードやエッジの配置や間隔、力の強さなどのパラメータを設定します。以下、この関数の内容を日本語で詳しく説明します：
	// パラメータ:
	// graph: これはグラフのインスタンスです。
	// largeGraphMode: 大規模なグラフモードが有効かどうかを示すブーリアン値。
	// configSettings: ユーザーから渡される設定のオブジェクト。
	// 設定のデフォルト値:
	// いくつかの設定にはデフォルト値が設定されており、ユーザーから特定の値が提供されていない場合、これらのデフォルト値が使用されます。
	// 力学的配置の設定:
	// linkDistance: ノード間の距離。
	// edgeStrength: エッジの強度。
	// nodeStrength: ノードの引力または斥力の強度。
	// nodeSize: ノードのサイズ。
	// nodeSpacing: ノード間の間隔。
	// 一部の設定は、具体的な条件に基づいて動的に計算されます。例えば、エッジの強度やノード間の距離は、そのエッジやノードが「集約された」ものかどうかに基づいて変わる場合があります。
	// onLayoutEnd: これはレイアウトが完了したときに呼び出されるコールバック関数で、大規模なグラフモードが有効な場合、各エッジのラベルをフォーマットします。
	// tick: これはレイアウトが更新されるたびに呼び出される関数で、グラフの位置をリフレッシュします。
	// 最後に、この関数は設定のオブジェクトを返します。
	// この関数を使用すると、G6グラフライブラリのgForceレイアウトに必要な設定を動的に生成できます。
	const getForceLayoutConfig = (graph, largeGraphMode, configSettings) => {
	  let {
	    linkDistance,
	    edgeStrength,
	    nodeStrength,
	    nodeSpacing,
	    preventOverlap,
	    nodeSize,
	    collideStrength,
	    alpha,
	    alphaDecay,
	    alphaMin,
	  } = configSettings || { preventOverlap: true };

	  if (!linkDistance && linkDistance !== 0) linkDistance = 225;
	  if (!edgeStrength && edgeStrength !== 0) edgeStrength = 50;
	  if (!nodeStrength && nodeStrength !== 0) nodeStrength = 200;
	  if (!nodeSpacing && nodeSpacing !== 0) nodeSpacing = 5;

	  const config = {
	    type: "gForce",
	    minMovement: 0.01,
	    maxIteration: 5000,
	    preventOverlap,
	    damping: 0.99,
	    linkDistance: (d) => {
	      let dist = linkDistance;
	      const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
	      const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
	      // // 两端都是聚合点
	      // if (sourceNode.level && targetNode.level) dist = linkDistance * 3;
	      // // 一端是聚合点，一端是真实节点
	      // else if (sourceNode.level || targetNode.level) dist = linkDistance * 1.5;
	      if (!sourceNode.level && !targetNode.level) dist = linkDistance * 0.3;
	      return dist;
	    },
	    edgeStrength: (d) => {
	      const sourceNode = nodeMap[d.source] || aggregatedNodeMap[d.source];
	      const targetNode = nodeMap[d.target] || aggregatedNodeMap[d.target];
	      // 聚合节点之间的引力小
	      if (sourceNode.level && targetNode.level) return edgeStrength / 2;
	      // 聚合节点与真实节点之间引力大
	      if (sourceNode.level || targetNode.level) return edgeStrength;
	      return edgeStrength;
	    },
	    nodeStrength: (d) => {
	      // 给离散点引力，让它们聚集
	      if (d.degree === 0) return -10;
	      // 聚合点的斥力大
	      if (d.level) return nodeStrength * 2;
	      return nodeStrength;
	    },
	    nodeSize: (d) => {
	      if (!nodeSize && d.size) return d.size;
	      return 50;
	    },
	    nodeSpacing: (d) => {
	      if (d.degree === 0) return nodeSpacing * 2;
	      if (d.level) return nodeSpacing;
	      return nodeSpacing;
	    },
	    onLayoutEnd: () => {
	      if (largeGraphMode) {
		graph.getEdges().forEach((edge) => {
		  if (!edge.oriLabel) return;
		  edge.update({
		    label: labelFormatter(edge.oriLabel, labelMaxLength),
		  });
		});
	      }
	    },
	    tick: () => {
	      graph.refreshPositions();
	    },
	  };

	  if (nodeSize) config["nodeSize"] = nodeSize;
	  if (collideStrength) config["collideStrength"] = collideStrength;
	  if (alpha) config["alpha"] = alpha;
	  if (alphaDecay) config["alphaDecay"] = alphaDecay;
	  if (alphaMin) config["alphaMin"] = alphaMin;

	  return config;
	};

	// この関数hideItemsは、特定のアイテムIDのリストに基づいて、グラフ上のアイテムを非表示にします。
	// パラメータ:
	// graph: これはグラフのインスタンスを示します。
	// 関数内で、hiddenItemIdsという配列をイテレーションします。この配列には非表示にするアイテムのIDが含まれています。
	// 各IDに対して、graph.hideItem(id)メソッドを使用して、対応するアイテムを非表示にします。
	// この関数を使用することで、指定されたIDのアイテムを簡単にグラフから非表示にすることができます。
	const hideItems = (graph) => {
	  hiddenItemIds.forEach((id) => {
	    graph.hideItem(id);
	  });
	};

	// この関数showItemsは、グラフ上の非表示のアイテム（ノードやエッジ）をすべて表示にするためのものです。
	// パラメータ:
	// graph: これはグラフのインスタンスを示します。
	// 関数は、グラフ上のすべてのノードを反復処理します。そして、それぞれのノードが非表示の場合（!node.isVisible()がtrueの場合）、graph.showItem(node)を使ってノードを表示します。
	// 同様に、関数はすべてのエッジを反復処理し、非表示のエッジを表示します。
	// 最後に、hiddenItemIdsという配列を空の配列にリセットします。これにより、以前非表示にされたアイテムのIDのリストがクリアされます。
	const showItems = (graph) => {
	  graph.getNodes().forEach((node) => {
	    if (!node.isVisible()) graph.showItem(node);
	  });
	  graph.getEdges().forEach((edge) => {
	    if (!edge.isVisible()) edge.showItem(edge);
	  });
	  hiddenItemIds = [];
	};

	// この関数handleRefreshGraphは、指定されたグラフデータに基づいてグラフをリフレッシュ（更新）するためのものです。以下は、関数の詳細な説明です。
	// パラメータ:
	// graph: グラフのインスタンス。
	// graphData: 更新するグラフデータ。
	// width: グラフの幅。
	// height: グラフの高さ。
	// largeGraphMode: 大きなグラフモードかどうかを示すブール値。
	// edgeLabelVisible: エッジのラベルが表示されているかどうかを示すブール値。
	// isNewGraph: 新しいグラフかどうかを示すブール値。
	// 関数の動作:
	// 有効なgraphDataやgraphがない場合、関数はすぐに終了します。
	// 現在のグラフ上のフォーカス状態をクリアします。
	// すべての非表示のノードやエッジを再表示します。
	// processNodesEdges関数を使用してノードとエッジを処理します。これにより、位置や他の特性が調整されます。
	// グラフのデータを新しいノードとエッジで更新します。
	// 非表示のアイテムを隠します。
	// すべてのノードを前面に移動します。
	// レイアウトのインスタンスを初期化して、新しいレイアウトを実行します。
	// この関数は、与えられたデータに基づいてグラフを更新するために使用されます。
	const handleRefreshGraph = (
	  graph,
	  graphData,
	  width,
	  height,
	  largeGraphMode,
	  edgeLabelVisible,
	  isNewGraph
	) => {
	  if (!graphData || !graph) return;
	  clearFocusItemState(graph);
	  // reset the filtering
	  graph.getNodes().forEach((node) => {
	    if (!node.isVisible()) node.show();
	  });
	  graph.getEdges().forEach((edge) => {
	    if (!edge.isVisible()) edge.show();
	  });

	  let nodes = [],
	    edges = [];

	  nodes = graphData.nodes;
	  const processRes = processNodesEdges(
	    nodes,
	    graphData.edges || [],
	    width,
	    height,
	    largeGraphMode,
	    edgeLabelVisible,
	    isNewGraph
	  );

	  edges = processRes.edges;

	  graph.changeData({ nodes, edges });

	  hideItems(graph);
	  graph.getNodes().forEach((node) => {
	    node.toFront();
	  });

	  // layout.instance.stop();
	  // force 需要使用不同 id 的对象才能进行全新的布局，否则会使用原来的引用。因此复制一份节点和边作为 force 的布局数据
	  layout.instance.init({
	    nodes: graphData.nodes,
	    edges,
	  });

	  layout.instance.minMovement = 0.0001;
	  // layout.instance.getCenter = d => {
	  // 	const cachePosition = cachePositions[d.id];
	  // 	if (!cachePosition && (d.x || d.y)) return [d.x, d.y, 10];
	  // 	else if (cachePosition) return [cachePosition.x, cachePosition.y, 10];
	  // 	return [width / 2, height / 2, 10];
	  // }
	  layout.instance.getMass = (d) => {
	    const cachePosition = cachePositions[d.id];
	    if (cachePosition) return 5;
	    return 1;
	  };
	  layout.instance.execute();
	  return { nodes, edges };
	};

	// この関数getMixedGraphは、集約されたグラフデータと元のグラフデータを元に、ミックスされたグラフデータ（集約と非集約のノードおよびエッジが混在するデータ）を生成します。
	// パラメータ:
	// aggregatedData: 集約されたグラフデータ。
	// originData: 元のグラフデータ。
	// nodeMap: 各ノードがどのクラスタに属しているかを示すマップ。
	// aggregatedNodeMap: 集約されたノードのマップ。
	// expandArray: 展開されるべきクラスタのモデルの配列。
	// collapseArray: 折りたたまれるべきクラスタのモデルの配列。
	// 動作の概要:
	// 展開および折りたたみのマップを作成します。
	// 集約されたデータの各クラスタをループして、展開マップに該当する場合、そのクラスタに含まれるノードを結果のノードリストに追加します。それ以外の場合は、集約されたノードを追加します。
	// 元のデータのエッジをループして、エッジの両端が展開マップ内のクラスタに存在する場合、エッジをそのまま追加します。それ以外の場合は、仮想エッジ（集約ノードと通常のノードの間のエッジ）を生成して追加します。
	// 集約されたエッジをループして、両端が展開マップに存在しない場合、エッジを追加します。
	// 関数は、ミックスされたグラフデータを返します。これにより、グラフ上でクラスタが展開および折りたたみされたときの適切な表示を得ることができます。
	const getMixedGraph = (
	  aggregatedData,
	  originData,
	  nodeMap,
	  aggregatedNodeMap,
	  expandArray,
	  collapseArray
	) => {
	  let nodes = [],
	    edges = [];

	  const expandMap = {},
	    collapseMap = {};
	  expandArray.forEach((expandModel) => {
	    expandMap[expandModel.id] = true;
	  });
	  collapseArray.forEach((collapseModel) => {
	    collapseMap[collapseModel.id] = true;
	  });

	  aggregatedData.clusters.forEach((cluster, i) => {
	    if (expandMap[cluster.id]) {
	      nodes = nodes.concat(cluster.nodes);
	      aggregatedNodeMap[cluster.id].expanded = true;
	    } else {
	      nodes.push(aggregatedNodeMap[cluster.id]);
	      aggregatedNodeMap[cluster.id].expanded = false;
	    }
	  });
	  originData.edges.forEach((edge) => {
	    const isSourceInExpandArray = expandMap[nodeMap[edge.source].clusterId];
	    const isTargetInExpandArray = expandMap[nodeMap[edge.target].clusterId];
	    if (isSourceInExpandArray && isTargetInExpandArray) {
	      edges.push(edge);
	    } else if (isSourceInExpandArray) {
	      const targetClusterId = nodeMap[edge.target].clusterId;
	      const vedge = {
		source: edge.source,
		target: targetClusterId,
		id: uniqueId("edge"),
		label: "",
	      };
	      edges.push(vedge);
	    } else if (isTargetInExpandArray) {
	      const sourceClusterId = nodeMap[edge.source].clusterId;
	      const vedge = {
		target: edge.target,
		source: sourceClusterId,
		id: uniqueId("edge"),
		label: "",
	      };
	      edges.push(vedge);
	    }
	  });
	  aggregatedData.clusterEdges.forEach((edge) => {
	    if (expandMap[edge.source] || expandMap[edge.target]) return;
	    else edges.push(edge);
	  });
	  return { nodes, edges };
	};

	// この関数getNeighborMixedGraphは、指定された中心ノード（centerNodeModel）を中心として、そのノードの近隣ノードとエッジを取得して現在のグラフデータに追加します。関数の詳細について説明します。
	// パラメータ:
	// centerNodeModel: 中心となるノードのモデル。
	// step: 中心ノードからの距離に基づいて近隣のノードを取得するためのステップ数。
	// originData: オリジナルのグラフデータ。
	// clusteredData: クラスタリングされたグラフデータ。
	// currentData: 現在のグラフデータ。
	// nodeMap: 各ノードがどのクラスタに属しているかを示すマップ。
	// aggregatedNodeMap: 集約されたノードのマップ。
	// maxNeighborNumPerNode: 各ノードに対して取得する最大近隣ノード数（デフォルトは5）。
	// 動作の概要:
	// generateNeighbors関数を使用して、指定された中心ノードの近隣ノードとエッジを生成します。
	// オリジナルのグラフデータ（originData）に新しく生成されたノードとエッジを追加します。
	// nodeMapに新しく生成されたノードを追加します。
	// clusteredData（クラスタリングされたデータ）を更新して、新しく生成されたノードとエッジを適切なクラスタに追加します。
	// aggregatedNodeMapのカウントを更新します。
	// 現在のデータ（currentData）に新しく生成されたノードとエッジを追加します。
	// 関数の最終的な目的は、指定された中心ノードの近隣のノードとエッジを取得して、それを現在のグラフに組み込むことです。このようにして、ユーザーは中心ノードの周囲の関係をより詳細に視覚化できます。
	const getNeighborMixedGraph = (
	  centerNodeModel,
	  step,
	  originData,
	  clusteredData,
	  currentData,
	  nodeMap,
	  aggregatedNodeMap,
	  maxNeighborNumPerNode = 5
	) => {
	  // update the manipulate position for center gravity of the new nodes
	  manipulatePosition = { x: centerNodeModel.x, y: centerNodeModel.y };

	  // the neighborSubGraph does not include the centerNodeModel. the elements are all generated new nodes and edges
	  const neighborSubGraph = generateNeighbors(
	    centerNodeModel,
	    step,
	    maxNeighborNumPerNode
	  );
	  // update the origin data
	  originData.nodes = originData.nodes.concat(neighborSubGraph.nodes);
	  originData.edges = originData.edges.concat(neighborSubGraph.edges);
	  // update the origin nodeMap
	  neighborSubGraph.nodes.forEach((node) => {
	    nodeMap[node.id] = node;
	  });
	  // update the clusteredData
	  const clusterId = centerNodeModel.clusterId;
	  clusteredData.clusters.forEach((cluster) => {
	    if (cluster.id !== clusterId) return;
	    cluster.nodes = cluster.nodes.concat(neighborSubGraph.nodes);
	    cluster.sumTot += neighborSubGraph.edges.length;
	  });
	  // update the count
	  aggregatedNodeMap[clusterId].count += neighborSubGraph.nodes.length;

	  currentData.nodes = currentData.nodes.concat(neighborSubGraph.nodes);
	  currentData.edges = currentData.edges.concat(neighborSubGraph.edges);
	  return currentData;
	};

	// このコードは、与えられた中心ノードから一定のステップ数で到達可能なノードとエッジ（つまり、ネットワークの一部）を生成するJavaScript関数です。この関数は再帰的に呼び出され、各ステップで新たな隣接ノードとエッジを生成します。
	// 以下に各部分の詳細を説明します：
	// 関数のパラメータ:
	// centerNodeModel : 中心ノードのモデル。このノードから隣接ノードが生成されます。
	// step : 隣接ノードを生成するステップ数。この値が0以下になると、再帰が終了します。
	// maxNeighborNumPerNode : 各ノードごとの最大隣接ノード数。デフォルトは5です。
	// ノードとエッジの生成:
	// 関数はまず、新たな隣接ノードとエッジの配列を空で初期化します。
	// 次に、中心ノードからランダムな数（最大 maxNeighborNumPerNode ）の隣接ノードを生成します。各隣接ノードは、中心ノードと同じクラスタIDと色セットを持ちます。
	// 同時に、中心ノードと新たな隣接ノードをつなぐエッジも生成します。エッジの方向はランダムに決定されます。
	// 再帰的な隣接ノードとエッジの生成:
	// 関数は次に、各新たな隣接ノードに対して自身を再帰的に呼び出します。このとき、ステップ数を1減らします。
	// この再帰呼び出しにより、新たな隣接ノードとエッジのセットが生成され、元のノードとエッジの配列に追加されます。
	// 結果の返却:
	// 最終的に、関数は生成したノードとエッジの配列を含むオブジェクトを返します。
	//
	// この関数は、ネットワークの一部を動的に生成するために使用できます。例えば、ユーザがネットワークの特定のノードをクリックしたときに、そのノードの近傍を表示するために使用することができます。
	const generateNeighbors = (
	  centerNodeModel,
	  step,
	  maxNeighborNumPerNode = 5
	) => {
	  if (step <= 0) return undefined;
	  let nodes = [],
	    edges = [];
	  const clusterId = centerNodeModel.clusterId;
	  const centerId = centerNodeModel.id;
	  const neighborNum = Math.ceil(Math.random() * maxNeighborNumPerNode);
	  for (let i = 0; i < neighborNum; i++) {
	    const neighborNode = {
	      id: uniqueId("node"),
	      clusterId,
	      level: 0,
	      colorSet: centerNodeModel.colorSet,
	    };
	    nodes.push(neighborNode);
	    const dire = Math.random() > 0.5;
	    const source = dire ? centerId : neighborNode.id;
	    const target = dire ? neighborNode.id : centerId;
	    const neighborEdge = {
	      id: uniqueId("edge"),
	      source,
	      target,
	      label: `${source}-${target}`,
	    };
	    edges.push(neighborEdge);
	    const subNeighbors = generateNeighbors(
	      neighborNode,
	      step - 1,
	      maxNeighborNumPerNode
	    );
	    if (subNeighbors) {
	      nodes = nodes.concat(subNeighbors.nodes);
	      edges = edges.concat(subNeighbors.edges);
	    }
	  }
	  return { nodes, edges };
	};

	// この`getExtractNodeMixedGraph`関数は、グラフの未処理データ（`currentUnproccessedData`）に特定のノード（`extractNodeData`）と、そのノードに関連するエッジを追加する目的で作成されています。
	// 1. **ノードの追加**: 指定されたノード（`extractNodeData`）を`currentUnproccessedData`のノードリストに追加します。
	// 2. **関連エッジの抽出**: `originData`からのエッジをループして、抽出ノードと関連するエッジを探します。エッジは、そのソースかターゲットが抽出ノードのIDと一致する場合に関連しているとみなされます。
	// 3. **仮想エッジの追加**: ターゲットノード（またはソースノード）が属しているクラスタが展開されていない場合、抽出ノードからそのクラスタに向かって仮想エッジを作成します。これは`currentUnproccessedData`のエッジリストに追加されます。
	// 4. **元のエッジの追加**: ターゲットノード（またはソースノード）が属しているクラスタがすでに展開されている場合、元のエッジは`currentUnproccessedData`に直接追加されます。
	// 最後に、更新された`currentUnproccessedData`（新たに抽出したノードとその関連エッジを含む）を返します。
	// この関数は、特定のノードのコンテキストでのグラフの部分的なビューを作成するのに役立ちます。関数が正しく動作しているかどうかを確認するには、適切なテストケースを実行して、期待されるノードとエッジが正しく抽出および追加されるかを確認することが必要です。
	const getExtractNodeMixedGraph = (
	  //このコードは、ノードとエッジ（ネットワークの接続）を含むグラフデータを処理するJavaScriptの関数です。具体的には、特定のノード（ extractNodeData ）とその関連エッジを抽出し、それらを現在の未処理データ（ currentUnproccessedData ）に追加します。
	  // extractNodeData : 抽出するノードのデータ。このノードのIDは、関連するエッジを見つけるために使用されます。
	  // originData : 元のグラフデータ。このデータから関連するエッジが抽出されます。
	  // nodeMap : ノードIDとそのクラスタIDをマッピングするオブジェクト。
	  // aggregatedNodeMap : クラスタIDとその詳細（拡張されているかどうかなど）をマッピングするオブジェクト。
	  // currentUnproccessedData : 現在の未処理データ。この関数では、新たに抽出したノードとエッジがここに追加されます。
	  //
	  // 主要なステップ：
	  // 関数はまず、抽出するノードを currentUnproccessedData に追加します。
	  // 次に、 originData のすべてのエッジをループし、抽出するノードと関連するエッジを見つけます。エッジは、抽出するノードがソースかターゲットである場合に関連しています。
	  // 関連するエッジが見つかった場合、そのエッジのターゲット（またはソース）が属するクラスタが既に拡張されているかどうかを確認します。拡張されていない場合、新しい仮想エッジが作成され、 currentUnproccessedData に追加されます。この仮想エッジは、抽出するノードとクラスタ間の接続を表します。
	  // クラスタが既に拡張されている場合、元のエッジが currentUnproccessedData に直接追加されます。
	  // 最終的に、この関数は更新された currentUnproccessedData を返します。これには、新たに抽出したノードとその関連エッジが含まれます。
	  extractNodeData,
	  originData,
	  nodeMap,
	  aggregatedNodeMap,
	  currentUnproccessedData
	) => {
	  const extractNodeId = extractNodeData.id;
	  // const extractNodeClusterId = extractNodeData.clusterId;
	  // push to the current rendering data
	  currentUnproccessedData.nodes.push(extractNodeData);
	  // update the count of aggregatedNodeMap, when to revert?
	  // aggregatedNodeMap[extractNodeClusterId].count --;

	  // extract the related edges
	  originData.edges.forEach((edge) => {
	    if (edge.source === extractNodeId) {
	      const targetClusterId = nodeMap[edge.target].clusterId;
	      if (!aggregatedNodeMap[targetClusterId].expanded) {
		// did not expand, create an virtual edge fromt he extract node to the cluster
		currentUnproccessedData.edges.push({
		  id: uniqueId("edge"),
		  source: extractNodeId,
		  target: targetClusterId,
		});
	      } else {
		// if the cluster is already expanded, push the origin edge
		currentUnproccessedData.edges.push(edge);
	      }
	    } else if (edge.target === extractNodeId) {
	      const sourceClusterId = nodeMap[edge.source].clusterId;
	      if (!aggregatedNodeMap[sourceClusterId].expanded) {
		// did not expand, create an virtual edge fromt he extract node to the cluster
		currentUnproccessedData.edges.push({
		  id: uniqueId("edge"),
		  target: extractNodeId,
		  source: sourceClusterId,
		});
	      } else {
		// if the cluster is already expanded, push the origin edge
		currentUnproccessedData.edges.push(edge);
	      }
	    }
	  });
	  return currentUnproccessedData;
	};

	// このexamAncestors関数は、指定されたモデルの先祖（祖先）を調査し、それがexpandedArrayの中に存在するかどうかをチェックします。keepTagsは、特定の祖先ノードが保持されるべきかどうかを示すブール値の配列です。
	// 引数として与えられたlengthの回数だけループを実行します。このlengthは、調査する祖先の最大数を意味する可能性があります。
	// ループの中で、各expandedNode（展開されたノード）がモデルの直接の親（parentId）であるかどうかをチェックします。
	// もし直接の親であれば、対応するkeepTagsのインデックスをtrueに設定します。これは、その祖先ノードが保持されるべきであることを意味します。
	// その後、関数は再帰的に自分自身を呼び出し、さらに上の祖先を調査します。
	// この関数は、特定のノードの祖先が展開されているかどうかを追跡するのに役立ちます。たとえば、ツリーまたはグラフのビューで特定のノードを強調表示する場合や、特定のノードに関連する情報だけをユーザーに表示する場合などにこの関数を使用することができます。
	// 関数の動作を正確に理解するためには、関数がどのようなコンテキストで使用されるのか、またどのようなデータ構造とともに使用されるのかを知ることが重要です。
	const examAncestors = (model, expandedArray, length, keepTags) => {
	  for (let i = 0; i < length; i++) {
	    const expandedNode = expandedArray[i];
	    if (!keepTags[i] && model.parentId === expandedNode.id) {
	      keepTags[i] = true; // 需要被保留
	      examAncestors(expandedNode, expandedArray, length, keepTags);
	      break;
	    }
	  }
	};

	// manageExpandCollapseArray関数は、グラフの展開や折りたたみの管理を行うためのJavaScript関数です。具体的には、ノードの展開や折りたたみを制御するための配列expandArrayとcollapseArrayの更新を行います。
	// 指定されたmodelの位置に基づいて、manipulatePositionを更新します。
	// nodeNumberがNODE_LIMITを超えている場合、expandArrayの中で不要なノードを削除します。不要なノードとは、modelの祖先でないノードのことを指します。
	// expandArrayの中の不要なノードを特定するためにexamAncestors関数を使用し、どのノードが保持されるべきかを示すkeepTags配列を更新します。
	// 必要なノードのみを保持するためにexpandArrayを更新します。特定の条件に基づいて、不要なノードをcollapseArrayに追加します。
	// 最後に、指定されたmodelを表す現在のノードをexpandArrayに追加します。
	// この関数の出力として、更新されたexpandArrayとcollapseArrayが返されます。
	// この関数は、大量のノードを持つグラフを効果的に表示・管理するためのツールとして役立つでしょう。ユーザーが特定のノードをクリックして展開すると、関連するノードやエッジが表示され、非関連のノードが折りたたまれる可能性があります。
	const manageExpandCollapseArray = (
	  nodeNumber,
	  model,
	  collapseArray,
	  expandArray
	) => {
	  manipulatePosition = { x: model.x, y: model.y };

	  // 维护 expandArray，若当前画布节点数高于上限，移出 expandedArray 中非 model 祖先的节点)
	  if (nodeNumber > NODE_LIMIT) {
	    // 若 keepTags[i] 为 true，则 expandedArray 的第 i 个节点需要被保留
	    const keepTags = {};
	    const expandLen = expandArray.length;
	    // 检查 X 的所有祖先并标记 keepTags
	    examAncestors(model, expandArray, expandLen, keepTags);
	    // 寻找 expandedArray 中第一个 keepTags 不为 true 的点
	    let shiftNodeIdx = -1;
	    for (let i = 0; i < expandLen; i++) {
	      if (!keepTags[i]) {
		shiftNodeIdx = i;
		break;
	      }
	    }
	    // 如果有符合条件的节点，将其从 expandedArray 中移除
	    if (shiftNodeIdx !== -1) {
	      let foundNode = expandArray[shiftNodeIdx];
	      if (foundNode.level === 2) {
		let foundLevel1 = false;
		// 找到 expandedArray 中 parentId = foundNode.id 且 level = 1 的第一个节点
		for (let i = 0; i < expandLen; i++) {
		  const eNode = expandArray[i];
		  if (eNode.parentId === foundNode.id && eNode.level === 1) {
		    foundLevel1 = true;
		    foundNode = eNode;
		    expandArray.splice(i, 1);
		    break;
		  }
		}
		// 若未找到，则 foundNode 不变, 直接删去 foundNode
		if (!foundLevel1) expandArray.splice(shiftNodeIdx, 1);
	      } else {
		// 直接删去 foundNode
		expandArray.splice(shiftNodeIdx, 1);
	      }
	      // const removedNode = expandedArray.splice(shiftNodeIdx, 1); // splice returns an array
	      const idSplits = foundNode.id.split("-");
	      let collapseNodeId;
	      // 去掉最后一个后缀
	      for (let i = 0; i < idSplits.length - 1; i++) {
		const str = idSplits[i];
		if (collapseNodeId) collapseNodeId = `${collapseNodeId}-${str}`;
		else collapseNodeId = str;
	      }
	      const collapseNode = {
		id: collapseNodeId,
		parentId: foundNode.id,
		level: foundNode.level - 1,
	      };
	      collapseArray.push(collapseNode);
	    }
	  }

	  const currentNode = {
	    id: model.id,
	    level: model.level,
	    parentId: model.parentId,
	  };

	  // 加入当前需要展开的节点
	  expandArray.push(currentNode);

	  graph.get("canvas").setCursor("default");
	  return { expandArray, collapseArray };
	};

	// cacheNodePositions関数は、与えられたノードの配列（おそらくグラフツールキットからのオブジェクト）からそれらのノードの位置とレベルをキャッシュするためのJavaScript関数です。
	// 入力：nodes - グラフのノードの配列。各ノードはおそらく.getModel()メソッドを持っており、それによりノードのデータ（id, x, yなど）を取得できます。
	// 出力：positionMap - ノードのIDをキーとして、そのノードの位置（x, y）とレベルを値として持つオブジェクト。
	// 関数の動作：
	// 空のpositionMapオブジェクトを作成します。
	// 与えられたnodes配列をループし、各ノードのデータモデルを取得します。
	// ノードのIDをキーとして、そのノードのx, y位置とレベルをpositionMapに追加します。
	// 最終的に、positionMapを返します。
	// この関数の使用目的は、グラフの状態変化やアニメーションの前後でノードの位置を追跡・保存することにあるでしょう。後で、これらのキャッシュされた位置を使用して、グラフのレンダリングを最適化したり、アニメーション効果を追加したりすることができます。
	const cacheNodePositions = (nodes) => {
	  const positionMap = {};
	  const nodeLength = nodes.length;
	  for (let i = 0; i < nodeLength; i++) {
	    const node = nodes[i].getModel();
	    positionMap[node.id] = {
	      x: node.x,
	      y: node.y,
	      level: node.level,
	    };
	  }
	  return positionMap;
	};

	// layout.instance.stop();: layoutオブジェクトが持つinstanceのstopメソッドを呼び出します。これは、現在動作しているレイアウトの処理を停止することを意味します。
	// この関数の目的は、何らかの理由でグラフのレイアウト処理を停止する必要がある場面で使用されると思われます。例えば、ユーザーが手動でグラフの配置を変更したい場合や、新しいデータがロードされたときなどに、自動レイアウトの処理を中断するためにこの関数を呼び出すことができます。
	const stopLayout = () => {
	  layout.instance.stop();
	};

	// この関数「bindListener」は、グラフ上のさまざまなイベントに対応してリスナーをバインドすることを目的としています。具体的な説明を以下に示します。
	// 引数: graph - グラフのインスタンス。このグラフにリスナーをバインドします。
	// キーダウンイベント: ユーザーがキーを押したときのイベント。Shiftキーが押されたかどうかを検出します。
	// キーアップイベント: ユーザーがキーを放したときのイベント。Shiftキーが放されたかどうかを検出します。
	// ノードのマウスエンターイベント: マウスがノードに入ると、ノードのラベルを一時的に変更し、ホバーの状態を設定します。
	// ノードのマウスリーブイベント: マウスがノードを離れると、ラベルを元に戻し、ホバーの状態を解除します。
	// エッジのマウスエンター/リーブイベント: エッジにマウスが入るまたは離れると、同様にラベルを変更し、関連するノードも前面に移動します。
	// ノードのクリックイベント: ノードをクリックすると、関連するエッジが強調表示されます。Shiftキーが押されている場合、異なる動作が発生します。
	// エッジのクリックイベント: エッジをクリックすると、クリックしたエッジが強調表示されます。
	// キャンバスのクリックイベント: グラフの背景部分をクリックすると、すべての強調表示状態がキャンセルされます。
	// この関数は、特定のユーザーの操作に対応してグラフの動作を変更するために使用されます。例えば、ノードやエッジにマウスをホバーすると、その要素に関する情報が強調表示されるなど、インタラクティブなユーザーエクスペリエンスを提供します。
	const bindListener = (graph) => {
	  graph.on("keydown", (evt) => {
	    const code = evt.key;
	    if (!code) {
	      return;
	    }
	    if (code.toLowerCase() === "shift") {
	      shiftKeydown = true;
	    } else {
	      shiftKeydown = false;
	    }
	  });
	  graph.on("keyup", (evt) => {
	    const code = evt.key;
	    if (!code) {
	      return;
	    }
	    if (code.toLowerCase() === "shift") {
	      shiftKeydown = false;
	    }
	  });
	  graph.on("node:mouseenter", (evt) => {
	    const { item } = evt;
	    const model = item.getModel();
	    const currentLabel = model.label;
	    model.oriFontSize = model.labelCfg.style.fontSize;
	    item.update({
	      label: model.oriLabel,
	    });
	    model.oriLabel = currentLabel;
	    graph.setItemState(item, "hover", true);
	    item.toFront();
	  });

	  graph.on("node:mouseleave", (evt) => {
	    const { item } = evt;
	    const model = item.getModel();
	    const currentLabel = model.label;
	    item.update({
	      label: model.oriLabel,
	    });
	    model.oriLabel = currentLabel;
	    graph.setItemState(item, "hover", false);
	  });

	  graph.on("edge:mouseenter", (evt) => {
	    const { item } = evt;
	    const model = item.getModel();
	    const currentLabel = model.label;
	    item.update({
	      label: model.oriLabel,
	    });
	    model.oriLabel = currentLabel;
	    item.toFront();
	    item.getSource().toFront();
	    item.getTarget().toFront();
	  });

	  graph.on("edge:mouseleave", (evt) => {
	    const { item } = evt;
	    const model = item.getModel();
	    const currentLabel = model.label;
	    item.update({
	      label: model.oriLabel,
	    });
	    model.oriLabel = currentLabel;
	  });
	  // click node to show the detail drawer
	  graph.on("node:click", (evt) => {
	    stopLayout();
	    if (!shiftKeydown) clearFocusItemState(graph);
	    else clearFocusEdgeState(graph);
	    const { item } = evt;

	    // highlight the clicked node, it is down by click-select
	    graph.setItemState(item, "focus", true);

	    if (!shiftKeydown) {
	      // 将相关边也高亮
	      const relatedEdges = item.getEdges();
	      relatedEdges.forEach((edge) => {
		graph.setItemState(edge, "focus", true);
	      });
	    }
	  });

	  // click edge to show the detail of integrated edge drawer
	  graph.on("edge:click", (evt) => {
	    stopLayout();
	    if (!shiftKeydown) clearFocusItemState(graph);
	    const { item } = evt;
	    // highlight the clicked edge
	    graph.setItemState(item, "focus", true);
	  });

	  // click canvas to cancel all the focus state
	  graph.on("canvas:click", (evt) => {
	    clearFocusItemState(graph);
	    console.log(
	      graph.getGroup(),
	      graph.getGroup().getBBox(),
	      graph.getGroup().getCanvasBBox()
	    );
	  });
	};

	fetch("https://gw.alipayobjects.com/os/antvdemo/assets/data/relations.json")
	  .then((res) => res.json())
	  // HTML要素の作成とスタイリング: コードの最初の部分では、HTML要素を作成し、それらにスタイルを適用しています。具体的には、リンクを含むdiv要素を作成し、それをコンテナに追加しています。
	  // データの前処理: データはクラスタリングアルゴリズム（ここではLouvain法）を用いて前処理されます。これにより、ノードとエッジの集合が生成されます。
	  // コンテキストメニューの作成: G6のMenuプラグインを使用して、各ノードやエッジ、またはキャンバス自体に対するコンテキストメニュー（右クリックメニュー）を作成しています。これにより、ユーザーは特定のノードやエッジを隠したり、クラスタを展開したり、隣接ノードを探したりすることができます。
	  // グラフの作成とレンダリング: G6のGraphクラスを使用して、グラフを作成し、前処理されたデータを用いてレンダリングします。また、グラフのレイアウトは力学モデル（Force Layout）を使用しています。
	  // イベントリスナーのバインド: 最後に、特定のイベント（例えば、ノードのドラッグやズームなど）に対するリスナーをバインドしています。
	  // このコードは、大規模なグラフデータを効率的に視覚化し、ユーザーが直感的にデータを探索できるようにするためのものです。
	  .then((data) => {
	    const descriptionDiv = document.createElement("div");
	    descriptionDiv.innerHTML = `<a href='/en/largegraph' target='_blanck'>Click【HERE】To Full Demo</a>
	      <br/>
	      <a href='/zh/largegraph' target='_blanck'>点击【这里】进入完整 Demo</a>`;
	    descriptionDiv.style.textAlign = "right";
	    descriptionDiv.style.color = "#fff";
	    descriptionDiv.style.position = "absolute";
	    descriptionDiv.style.right = "32px";
	    descriptionDiv.style.marginTop = "8px";
	    container.appendChild(descriptionDiv);

	    container.style.backgroundColor = "#2b2f33";

	    CANVAS_WIDTH = container.scrollWidth;
	    CANVAS_HEIGHT = (container.scrollHeight || 500) - 30;

	    nodeMap = {};
	    const clusteredData = louvain(data, false, "weight");
	    const aggregatedData = { nodes: [], edges: [] };
	    clusteredData.clusters.forEach((cluster, i) => {
	      cluster.nodes.forEach((node) => {
		node.level = 0;
		node.label = node.id;
		node.type = "";
		node.colorSet = colorSets[i];
		nodeMap[node.id] = node;
	      });
	      const cnode = {
		id: cluster.id,
		type: "aggregated-node",
		count: cluster.nodes.length,
		level: 1,
		label: cluster.id,
		colorSet: colorSets[i],
		idx: i,
	      };
	      aggregatedNodeMap[cluster.id] = cnode;
	      aggregatedData.nodes.push(cnode);
	    });
	    clusteredData.clusterEdges.forEach((clusterEdge) => {
	      const cedge = {
		...clusterEdge,
		size: Math.log(clusterEdge.count),
		label: "",
		id: uniqueId("edge"),
	      };
	      if (cedge.source === cedge.target) {
		cedge.type = "loop";
		cedge.loopCfg = {
		  dist: 20,
		};
	      } else cedge.type = "line";
	      aggregatedData.edges.push(cedge);
	    });

	    data.edges.forEach((edge) => {
	      edge.label = `${edge.source}-${edge.target}`;
	      edge.id = uniqueId("edge");
	    });

	    currentUnproccessedData = aggregatedData;

	    const { edges: processedEdges } = processNodesEdges(
	      currentUnproccessedData.nodes,
	      currentUnproccessedData.edges,
	      CANVAS_WIDTH,
	      CANVAS_HEIGHT,
	      largeGraphMode,
	      true,
	      true
	    );

	    const contextMenu = new G6.Menu({
	      shouldBegin(evt) {
		if (evt.target && evt.target.isCanvas && evt.target.isCanvas())
		  return true;
		if (evt.item) return true;
		return false;
	      },
	      getContent(evt) {
		const { item } = evt;
		if (evt.target && evt.target.isCanvas && evt.target.isCanvas()) {
		  return `<ul>
		  <li id='show'>Show all Hidden Items</li>
		  <li id='collapseAll'>Collapse all Clusters</li>
		</ul>`;
		} else if (!item) return;
		const itemType = item.getType();
		const model = item.getModel();
		if (itemType && model) {
		  if (itemType === "node") {
		    if (model.level !== 0) {
		      return `<ul>
		      <li id='expand'>Expand the Cluster</li>
		      <li id='hide'>Hide the Node</li>
		    </ul>`;
		    } else {
		      return `<ul>
		      <li id='collapse'>Collapse the Cluster</li>
		      <li id='neighbor-1'>Find 1-degree Neighbors</li>
		      <li id='neighbor-2'>Find 2-degree Neighbors</li>
		      <li id='neighbor-3'>Find 3-degree Neighbors</li>
		      <li id='hide'>Hide the Node</li>
		    </ul>`;
		    }
		  } else {
		    return `<ul>
		    <li id='hide'>Hide the Edge</li>
		  </ul>`;
		  }
		}
	      },
	      handleMenuClick: (target, item) => {
		const model = item && item.getModel();
		const liIdStrs = target.id.split("-");
		let mixedGraphData;
		switch (liIdStrs[0]) {
		  case "hide":
		    graph.hideItem(item);
		    hiddenItemIds.push(model.id);
		    break;
		  case "expand":
		    const newArray = manageExpandCollapseArray(
		      graph.getNodes().length,
		      model,
		      collapseArray,
		      expandArray
		    );
		    expandArray = newArray.expandArray;
		    collapseArray = newArray.collapseArray;
		    mixedGraphData = getMixedGraph(
		      clusteredData,
		      data,
		      nodeMap,
		      aggregatedNodeMap,
		      expandArray,
		      collapseArray
		    );
		    break;
		  case "collapse":
		    const aggregatedNode = aggregatedNodeMap[model.clusterId];
		    manipulatePosition = { x: aggregatedNode.x, y: aggregatedNode.y };
		    collapseArray.push(aggregatedNode);
		    for (let i = 0; i < expandArray.length; i++) {
		      if (expandArray[i].id === model.clusterId) {
			expandArray.splice(i, 1);
			break;
		      }
		    }
		    mixedGraphData = getMixedGraph(
		      clusteredData,
		      data,
		      nodeMap,
		      aggregatedNodeMap,
		      expandArray,
		      collapseArray
		    );
		    break;
		  case "collapseAll":
		    expandArray = [];
		    collapseArray = [];
		    mixedGraphData = getMixedGraph(
		      clusteredData,
		      data,
		      nodeMap,
		      aggregatedNodeMap,
		      expandArray,
		      collapseArray
		    );
		    break;
		  case "neighbor":
		    const expandNeighborSteps = parseInt(liIdStrs[1]);
		    mixedGraphData = getNeighborMixedGraph(
		      model,
		      expandNeighborSteps,
		      data,
		      clusteredData,
		      currentUnproccessedData,
		      nodeMap,
		      aggregatedNodeMap,
		      10
		    );
		    break;
		  case "show":
		    showItems(graph);
		    break;
		  default:
		    break;
		}
		if (mixedGraphData) {
		  cachePositions = cacheNodePositions(graph.getNodes());
		  currentUnproccessedData = mixedGraphData;
		  handleRefreshGraph(
		    graph,
		    currentUnproccessedData,
		    CANVAS_WIDTH,
		    CANVAS_HEIGHT,
		    largeGraphMode,
		    true,
		    false
		  );
		}
	      },
	      // offsetX and offsetY include the padding of the parent container
	      // 需要加上父级容器的 padding-left 16 与自身偏移量 10
	      offsetX: 16 + 10,
	      // 需要加上父级容器的 padding-top 24 、画布兄弟元素高度、与自身偏移量 10
	      offsetY: 0,
	      // the types of items that allow the menu show up
	      // 在哪些类型的元素上响应
	      itemTypes: ["node", "edge", "canvas"],
	    });

	    graph = new G6.Graph({
	      container: "container",
	      width: CANVAS_WIDTH,
	      height: CANVAS_HEIGHT,
	      linkCenter: true,
	      minZoom: 0.1,
	      groupByTypes: false,
	      modes: {
		default: [
		  {
		    type: "drag-canvas",
		    enableOptimize: true,
		  },
		  {
		    type: "zoom-canvas",
		    enableOptimize: true,
		    optimizeZoom: 0.01,
		  },
		  "drag-node",
		  "shortcuts-call",
		],
		lassoSelect: [
		  {
		    type: "zoom-canvas",
		    enableOptimize: true,
		    optimizeZoom: 0.01,
		  },
		  {
		    type: "lasso-select",
		    selectedState: "focus",
		    trigger: "drag",
		  },
		],
		fisheyeMode: [],
	      },
	      defaultNode: {
		type: "aggregated-node",
		size: DEFAULTNODESIZE,
	      },
	      plugins: [contextMenu],
	    });

	    graph.get("canvas").set("localRefresh", false);

	    const layoutConfig = getForceLayoutConfig(graph, largeGraphMode);
	    layoutConfig.center = [CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2];
	    layout.instance = new G6.Layout["gForce"](layoutConfig);
	    layout.instance.init({
	      nodes: currentUnproccessedData.nodes,
	      edges: processedEdges,
	    });
	    layout.instance.execute();

	    bindListener(graph);
	    graph.data({ nodes: aggregatedData.nodes, edges: processedEdges });
	    graph.render();
	  });

	// if (!graph || graph.get("destroyed")) return;
	// この行は、 graph オブジェクトが存在しない、または graph オブジェクトの destroyed プロパティが true である場合、関数の実行を中止します。これは、グラフが既に破壊されているか、存在しない場合に、後続のコードがエラーを引き起こすのを防ぐためのものです。
	//
	// const container = document.getElementById("container");
	// この行は、HTMLドキュメントからIDが"container"の要素を取得し、それを container という定数に格納します。この"container"は、グラフが描画されるDOM要素を指している可能性があります。
	//
	// if (!container) return;
	// この行は、"container"要素が存在しない場合、関数の実行を中止します。これは、"container"要素が見つからない場合に、後続のコードがエラーを引き起こすのを防ぐためのものです。
	//
	// graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
	// この行は、"container"要素のスクロール可能な幅( scrollWidth)と高さ( scrollHeight)（30ピクセルを引いた値）を使用して、 graph オブジェクトの changeSize メソッドを呼び出します。これにより、グラフのサイズが"container"要素のサイズに合わせて調整されます。
	//
	// 全体として、このコードはグラフのサイズを特定のDOM要素（この場合は"container"）のサイズに合わせて動的に変更するためのものと言えます。ただし、具体的な動作は graph オブジェクトの実装や、"container"要素の具体的な状況に依存します。V32
	//
	if (typeof window !== "undefined")
	  window.onresize = () => {
	    if (!graph || graph.get("destroyed")) return;
	    const container = document.getElementById("container");
	    if (!container) return;
	    graph.changeSize(container.scrollWidth, container.scrollHeight - 30);
	  };
};