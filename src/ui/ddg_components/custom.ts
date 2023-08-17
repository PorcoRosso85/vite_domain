// すべてのノードは親ノードか子ノードあるいはその両方である
// 親か子かは、lsifのエッジ情報.reference/definitionにて定義されている
// 親ノードのことをderと言い、子ノードのことをdeeという、親はdependerであり子dependeeに依存し成立する
// derとdeeは直列である、同世代のノード同士は並列である
// lsifのedgeデータに直列と並列のデータがあるはず　＝＞　直列のためのreferenceエッジ、並列のためのfile?/group?/エッジ
// その情報はノード＝頂点自身は持っておらず、エッジ情報がノードに与える情報である
// hull機能はderが持つdeeとのエリアを定義するもので、derを表示するエリアであり、deeはderのhullエリアに表示される
// derノードとdeeノードはくっついている
// フォーカスして、展開した機能が中心になるようにUXを
// スクロールの挙動は、現在表示されている画面を中心にズームする
// 親サークルから子サークルが生まれ、親サークル全体にフォーカス
// derやdeeにかかわらずノードを1クリックすると、ノードの詳細情報が表示される、この時の表示はwebcomponent"TODO: 命名"で行われる
// derを2クリックするとderが持つ1次下層のdeeを右側に表示する、このときdeeもderのhullエリアに囲まれているはずである
// このことは、複数の親サークルが依存している子サークルがあっても無理やりエッジ描写で繋げなくていいことを意味する
// ズームアウトして全体を見たい時のために、並列（同じ世代にいる）ノード同士のカラーの重複を避けるため、いくつかあるカラー候補の中からランダムにhullエリアのカラーが選択される、ただし直列の上位世代のカラーに従うことを優先する
// deeをすでに表示しているderを2クリックすると、deeを隠す、その挙動はexpland clusterの例を参考にする
// ノード上でない画面の1クリックは___
// ノード上でない画面の2クリックは全der, deeが画面に収まるように表示
// ノード上でない画面のドラッグは画面エリア表示の移動
// ノード上でない画面のドロップは画面エリア表示の移動の終了
// ノード上でない画面のctrl
// ノード上でない画面のshift
// ノードやエッジをマウスオーバーで上記tooltip機能を実行しつつ、ハイライトする
// 上記ハイライトのアルゴリズム候補1. アクティブリレーション、あるいは２．フィルタ対象をハイライトする機能を別途追加する
// アクティブリレーション参考：https://g6.antv.antgroup.com/en/examples/interaction/highlight#activateRelations
// derがdeeを表示するときの参考：https://g6.antv.antgroup.com/en/examples/net/forceDirected#forceBubbles
// 複数のノード・エッジ選択は、選択モードへの切り替えとドラッグドロップによる範囲指定による
// 入力モードを用意する（全体配置↑、ノード追加、エッジ追加
// deeはderの右に表示する、並列ノードは設計・機能が発生する順番が遅いほうが下に表示する
// ノードサイズはどれぐらい多くのノードに直列依存しているか、つまりdeeがたくさんあるかで決まる
// hullは表示されてるノードにのみオーバーレイする
// 複数のderを持つdeeが表示されたときにこのdeeのderのhullエリアが視認性を悪くするが、劣後とする
// ズームアップしてもフォントサイズは変えない、フォントサイズ変更は別途方法を用意する
// ノード自体は重ならない
// ノードクリックでサイドバーあるいはオーバーレイ画面の表示、webcomponent名は""
// tooltipはg6組み込みのmodeを使用せず、graph.on('node:mouseenter', (evt) => {})で、ツールチップ用に作成したwebcomponentを利用する, graph.on('node:mouseleave', () => {})も忘れずに

import { LSIFEntry } from 'domain/entities/lsifData';
import { initializeLsifData } from 'application/services/initializeLsifData';
import G6 from '@antv/g6'

const graph = new G6.Graph({
    container: 'graph-container',
    width: 800,
    height: 600,
    layout: {
      type: 'force',
      preventOverlap: true
    },
    defaultNode: {
      type: 'metaData-vertex'
    },
    defaultEdge: {
      type: 'moniker-edge'
    }
  });
  

const lsifEntries: LSIFEntry[] = [...];  // あなたのデータ
const data = initializeLsifData(lsifEntries);

graph.data(data);
graph.render();
