// Calcite Components
// Sample : https://github.com/Esri/calcite-components-examples/tree/master/vite
import { setAssetPath } from '@esri/calcite-components/dist/components';
import "@esri/calcite-components/dist/components/calcite-shell";
import "@esri/calcite-components/dist/components/calcite-shell-panel";
import "@esri/calcite-components/dist/components/calcite-action-bar";
import "@esri/calcite-components/dist/components/calcite-action";
import "@esri/calcite-components/dist/components/calcite-panel";
import "@esri/calcite-components/dist/components/calcite-button";
import "@esri/calcite-components/dist/components/calcite-label";
import "@esri/calcite-components/dist/components/calcite-icon";
import "@esri/calcite-components/dist/components/calcite-checkbox";
import "@esri/calcite-components/dist/components/calcite-select";
import "@esri/calcite-components/dist/components/calcite-option-group";
import "@esri/calcite-components/dist/components/calcite-option";
import "@esri/calcite-components/dist/components/calcite-pick-list";
import "@esri/calcite-components/dist/components/calcite-pick-list-item";

import '@esri/calcite-components/dist/calcite/calcite.css';
setAssetPath(location.href);

// JS API
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Basemap from "@arcgis/core/Basemap";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import BasemapGallery from "@arcgis/core/widgets/BasemapGallery";
import Expand from "@arcgis/core/widgets/Expand";
import Legend from "@arcgis/core/widgets/Legend";
import "./style.css";

// import module
import { CHIKAKOJI_LAYER, CITY_LAYER , BASEMAPS } from "./config.js";
import { CreateChikakojiSimpleRenderer } from "./renderer.js";
import { CityPopupTemplate, ChikakojiPopupTemplate } from "./popupTemplate.js";
import { CreateLocalBasemapsSource } from "./localBasemapsSource.js";
import { ZoomToLayer, CreateDefinitionExpression } from "./util.js"

// 地価公示レイヤーのシンボル設定
//const renderer = CreateChikakojiSimpleRenderer();

// FeatureLayer：公示地価(国土数値情報 調査時点:令和4年1月1日)： Living Atlas
const chikakojiLyr = new FeatureLayer({
    url: CHIKAKOJI_LAYER.url,
    id: "chikakoji",
    //上で作成したレンダラーを適用する
    //renderer: renderer,
    // 2021にデータを変更したことに伴いレイヤーが愛知県のみとなるようフィルタ定義を追加
    // 2022.3.28更新の令和4年版に対応（国土数値情報の製品仕様書第3.1版）
    definitionExpression: "L01_022 LIKE '23%'" // 行政区域コード L01_021 => L01_022 に
});

// FeatureLayer：全国市区町村界データ 2021： Living Atlas
const cityareaLyr = new FeatureLayer({
    url: CITY_LAYER.url,
    id: "cityarea",
    opacity: 0.5,
    minScale: 5000000,//1500000,　パフォーマンスが向上しているのでスケール変更
    maxScale: 50000,
    visible: false,
    // 上記と同様にこちらも愛知県のみになるようフィルタ定義を追加
    definitionExpression: "JCODE LIKE '23%'"
});

// Map の作成と レイヤーの追加
const basemap = new Basemap({
    portalItem: {
        id: BASEMAPS.ja_street_vector_id //"street-vector"の日本語版
    }
});

const map = new Map({
    basemap: basemap,
    layers: [chikakojiLyr]
});
map.add(cityareaLyr, 0);

const view = new MapView({
  container: "viewDiv",
  map: map,
});

// 背景地図の切替
const localSource = CreateLocalBasemapsSource();
const basemapGallery = new BasemapGallery({
    view: view,
    source: localSource,
});
const bgExpand = new Expand({
    view: view,
    content: basemapGallery,
    autoCollapse: true
});
view.ui.add(bgExpand, "bottom-right");

// 凡例
const legend = new Legend({
    view: view,
    layerInfos: [
      {
        layer: chikakojiLyr,
        title: "地価公示"
      }
    ]
});
const legendExpand = new Expand({
    view: view,
    content: legend,
    autoCollapse: true,
});
view.ui.add(legendExpand, "bottom-right");

let chikakojiLyrView; 
view.when(() => {

    view.popup.dockEnabled = true; // popup のドッキングをデフォルトで有効化 //API 4.27 だと有効にならない。。。

    chikakojiLyr.when(() => {
        cityareaLyr.queryExtent().then((response) => {
            view.goTo(response.extent, {"duration":1000}).catch((error) => { console.error(error)}); 
            // 市区町村のselectを更新
            updateCitySelect(cityareaLyr);
         });
    })
    // ハイライト表示用
    view.whenLayerView(chikakojiLyr).then(layerView => {
        chikakojiLyrView = layerView;
    });
})

// レイヤーの表示/非表示 切替
const chikakojiToggle = document.getElementById("chikakojiLyr");
const cityareaToggle = document.getElementById("cityareaLyr");
chikakojiToggle.addEventListener("calciteCheckboxChange", () => {
    chikakojiLyr.visible = !(chikakojiLyr.visible);
});
cityareaToggle.addEventListener("calciteCheckboxChange", () => {
    cityareaLyr.visible = !(cityareaLyr.visible);
});

// 操作パネルの制御
const resultPanel = document.getElementById("controlsDiv");
const toggleButton = document.getElementById("toggle-button");
view.ui.add(toggleButton, "top-left");
toggleButton.addEventListener("click", () => {
    if (resultPanel.clientWidth == 390) {
        resultPanel.style.width = "0px";
        toggleButton.icon = "chevrons-right";
        toggleButton.title = "パネルを展開";
    } else {
        resultPanel.style.width = "390px";
        toggleButton.icon = "chevrons-left";
        toggleButton.title = "パネルを畳む";
    }
});


// Gihub-pages に deploy したとき Expand widget が何故か出てこないので
// 都道府県の切替は操作パネルの制御と同じようにする
/*
const prefExpand = new Expand({
    view: view,
    content: document.getElementById("prefcontrolsDiv"),
    expandIconClass: "esri-icon-swap",
});
view.ui.add(prefExpand, "bottom-left");
prefExpand.watch("expanded", (expanded) => {
    if (expanded) {
        document.querySelector(".prefControl").hidden = false;
    } else {
        document.querySelector(".prefControl").hidden = true;
    }
 });
*/
const prefPanel = document.getElementById("prefcontrolsDiv");
const toggleButton2 = document.getElementById("toggle-button2");
view.ui.add(toggleButton2, "bottom-left");
toggleButton2.addEventListener("click", () => {
    if (prefPanel.clientWidth == 200) {
        prefPanel.style.width = "0px";
        document.querySelector(".prefControl").hidden = true;
        toggleButton2.icon = "chevron-right";
        toggleButton2.title = "都道府県の切替パネルを展開";
    }
    else {
        prefPanel.style.width = "200px";
        document.querySelector(".prefControl").hidden = false;
        toggleButton2.icon = "chevron-left";
        toggleButton2.title = "都道府県の切替パネルを畳む";
    }
});


// ポップアップの設定
cityareaLyr.popupTemplate = CityPopupTemplate;
chikakojiLyr.popupTemplate = ChikakojiPopupTemplate;

// クエリ
// 実行/クリアボタン定義
const queryButton = document.getElementById("queryButton");
queryButton.addEventListener("click", doQuery);

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", doClear);

// クリアの実行
function doClear() {
    // 地価公示とクエリ結果の削除とUIの初期化
    view.graphics.removeAll();
    document.getElementById("resultText").innerHTML = "";
    document.getElementById("controlsDiv").style.height = "30%";
    document.getElementById("resultsList").innerHTML = "";
    document.getElementById("resultsListDiv").style.display = "none";
    // popup を閉じる
    view.closePopup();
}

// クエリの実行
async function doQuery() {

    // 前回のクエリ結果を削除
    doClear();

    // input 要素に入力された文字列を取得
    //const str = document.getElementById("attrTxt").value;
    let citycode;
    if (document.getElementById("citySelect").selectedOption === undefined || 
                    document.getElementById("citySelect").selectedOption.value === "") {
        citycode = document.getElementById("citySelect").firstChild.value;
    }
    else {
        citycode = document.getElementById("citySelect").selectedOption.value;
    }
    //console.log(citycode);

    // 市区町村のクエリ パラメーターの作成
    const queryParams = cityareaLyr.createQuery();
    queryParams.where = "JCODE = " + citycode;
    queryParams.returnGeometry = true;
    queryParams.outSpatialReference = view.spatialReference;

    // クエリの実行
    await cityareaLyr.queryFeatures(queryParams)
        .then(showCityArea)
        .then(queryChikakoji)
        .then(showChikakoji)
        .catch(showErr);
}

// 市区町村の表示
function showCityArea(results) {
    // 結果フィーチャ数が 0 以上のとき
    if (results.features.length > 0) {
        // 結果フィーチャからグラフィックを作成
        const graphics = results.features.map(feature => {
            const graphic = feature.clone();
            graphic.symbol = {
                type: "simple-fill",
                style: "none",
                outline: {
                    color: "#00ffff",
                    width: "5px"
                }
            };
            return graphic;
        });

        // グラフィックをviewに追加して表示
        view.graphics.addMany(graphics);

        // グラフィックへズーム
        view.goTo(graphics);

        // 空間検索で使用するためのフィーチャを返す
        return results.features;

    }
}

// 空間検索して地価公示を取得
async function queryChikakoji(features) {
    // 地価公示の空間検索用のクエリ パラメータを作成
    const queryParams = chikakojiLyr.createQuery();
    // queryParams.geometry = features[0].geometry;
    // 複数の市区町村界フィーチャがある場合にも対応するようにfor 文を使っている
    for (let cnt = 0; cnt < features.length; cnt++) {
        if (cnt == 0) {
            queryParams.geometry = features[cnt].geometry;
        } else {
            for (let num1 = 0; num1 < features[cnt].geometry.rings.length; num1++) {
                const points = [];
                for (let num2 = 0; num2 < features[cnt].geometry.rings[num1].length; num2++) {
                    points.push(features[cnt].geometry.getPoint(num1, num2));
                }
                queryParams.geometry.addRing(points);
            }
        }
    }
    queryParams.spatialRelationship = "contains";
    queryParams.where = "1 = 1";
    queryParams.returnGeometry = true;

    // クエリの実行
    return chikakojiLyr.queryFeatures(queryParams);
}

// クエリの結果を表示
let graphics = null;
function showChikakoji(results) {
    // 結果フィーチャ数が 0 以上のとき
    if (results.features.length > 0) {
        // 結果フィーチャからグラフィックを作成
        graphics = results.features.map(feature => {
            const graphic = feature.clone();
            graphic.symbol = {
                type: "simple-marker",
                //color: "#ffb700", //"#00ff80",
                size: "12px"
            };
            return graphic;
        });
        // グラフィックを表示
        view.graphics.addMany(graphics);
        // グラフィックへズーム
        //view.goTo(graphics);

        // フィーチャ数の表示
        const count = results.features.length;
        document.getElementById("resultText").innerHTML = "地価公示地点" + count + "箇所";

        // 取得した結果を"calcite-pick-list-item"のアイテムとしてリスト表示
        document.getElementById("resultsList").innerHTML = "";
        graphics.forEach((result, index) => {
            const attributes = result.attributes;
            const item = document.createElement("calcite-pick-list-item");
            item.setAttribute("label", attributes.L01_002 + " | " +　attributes.L01_024);
            item.setAttribute("value", index);

            const usage = `利用状況: ${attributes.L01_027}`;
            item.setAttribute("description", usage);
            item.addEventListener("click", resultClickHandler);
            document.getElementById("resultsList").appendChild(item);
        });

        document.getElementById("resultsListDiv").style.display = "block";
        document.getElementById("controlsDiv").style.height = "76%";
    }
}

let highlightSelect;
// 結果リスト用のクリック処理
function resultClickHandler(event) {
    const target = event.target;
    const resultId = target.getAttribute("value");

    // クリックした住所に該当するグラフィックを取得
    const result =
        resultId && graphics && graphics[parseInt(resultId, 10)];

    if (result) {
        // 対象のポイントのポップアップを表示
        view.popup.open({
        features: [result],
        location: result.geometry
        });
        // 対象のポイントへ移動
        view.goTo(result);
    }

    // ハイライト表示
    if (highlightSelect){
        highlightSelect.remove();
    }
    highlightSelect = chikakojiLyrView.highlight(result);
}

// エラーの表示
function showErr(err) {
    console.log("err:", err);
    // 前回のクエリ結果を削除
    doClear();
}

const pref = document.getElementById("prefSelect");
pref.addEventListener("calciteSelectChange", (event) => {
    let prefcode = event.target.value;
    let {chikaExp, cityExp} = CreateDefinitionExpression(prefcode);
    chikakojiLyr.definitionExpression = chikaExp;
    cityareaLyr.definitionExpression = cityExp;
    ZoomToLayer(chikakojiLyr, view);
    updateCitySelect(cityareaLyr);
});

function updateCitySelect(featureLayer) {
    // クエリ結果を削除
    doClear();
    
    // 前の市区町村名をクリア（子要素をすべて削除）
    // 参考:  https://developer.mozilla.org/ja/docs/Web/API/Node/removeChild
    const cityElem = document.getElementById("citySelect");
    while (cityElem.firstChild) {
        cityElem.removeChild(cityElem.firstChild);
    }
    // 都道府県切り替え時、前に選択した市区町村コードが残っているみたいなので
    if (cityElem.selectedOption) {
        cityElem.selectedOption.value = "";
    }
    
    // クエリして市区町村名をcalcite-option に設定する
    const queryParams = featureLayer.createQuery();
    queryParams.outFields = ["*"];
    queryParams.where = featureLayer.definitionExpression || "1=1";
    queryParams.orderByFields = ["JCODE"];
    featureLayer.queryFeatures(queryParams).then((results) => {
        const graphics = results.features;
        graphics.forEach((graphic, index) => {
            const attributes = graphic.attributes;
            const item = document.createElement("calcite-option");
            item.setAttribute("label", attributes.JCODE + " : " + attributes.SEIREI + attributes.SIKUCHOSON);
            item.setAttribute("value", attributes.JCODE);
            //document.getElementById("citySelect").appendChild(item);
            cityElem.appendChild(item);
        });
    });
    
}