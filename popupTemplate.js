// JS API
import PopupTemplate from "@arcgis/core/PopupTemplate";

// Chart.js
import Chart from "chart.js/auto";

import { CHIKAKOJI_FIELDS } from "./config.js";

// 
// 市区町村用 PopupTemplate
// 
const CityPopupTemplate = {
    title: "全国市区町村界",
    content: [
        {
            type: "text",
            text: "自治体コード: {JCODE}" + "</br>" + "都道府県名: {KEN}" + "</br>" +"市区町村名: {SEIREI}{SIKUCHOSON}"
        }
    ]
}

// 
// 公示地価用の PopupTemplate で使う関数定義
// 
// 変動率の計算
function calChange(year_val, last_year_val){
    return (year_val - last_year_val)/last_year_val;
}

// 平均変動率を幾何平均で計算(以下を参考にしてオーバフローしないようにlogを使って計算)
// https://www.geeksforgeeks.org/geometric-mean-two-methods/?ref=gcse
// n年間の平均変動率
function geometricMean(arr , n){
    var sum = 0;
    for (var i = 0; i < n; i++)
        sum = sum + Math.log(arr[i]);
        sum = sum / n;
    return Math.exp(sum);
}

// Chart.js で横棒グラフを作成
function createHorizontalBarChart(diff1, diff2, diff3, diff4, diff5, diff6, diff7, diff8, diff9, geoMean5, geoMean){
    
    const canvas = document.createElement("canvas");

    const data = {
                labels: [
                    'H26～H27','H27～H28','H28～H29','H29～H30','H30～R01',
                    'R01～R02','R02～R03','R03～R04','R04～R05', //'5年平均', '10年平均'
                ],
                datasets:[{
                    data: [diff1, diff2, diff3, diff4, diff5, diff6, diff7, diff8, diff9], //, geoMean5, geoMean],
                    backgroundColor: [ 
                        (diff1 < 0 ? "red" : "green"),
                        (diff2 < 0 ? "red" : "green"),
                        (diff3 < 0 ? "red" : "green"),
                        (diff4 < 0 ? "red" : "green"),
                        (diff5 < 0 ? "red" : "green"),
                        (diff6 < 0 ? "red" : "green"),
                        (diff7 < 0 ? "red" : "green"),
                        (diff8 < 0 ? "red" : "green"),
                        (diff9 < 0 ? "red" : "green"),
                        //(geoMean5 < 0 ? "red" : "green"),
                        //(geoMean < 0 ? "red" : "green")                 
                    ]
                }]
    };
    
    // 横棒グラフを作成
    const myChart = new Chart(canvas.getContext("2d"),{
        type: 'bar', 
        data: data,
        options: {
            responsive: false, //canvasサイズの自動設定を使わない
            plugins: {
                legend:{ // グラフ凡例を非表示に設定
                    display: false
                }
            },
            indexAxis: 'y', //Chart.js 3.x系では横棒グラフの場合に設定
            scales: {
                x: {
                    suggestedMin: -1,
                    suggestedMax: 1,
                }
            }
        }
    });

    return canvas;
    
}

function landpriceChange(feature) {
    const div = document.createElement("div");
    // 上昇/下降の矢印をSVGで定義
    const upArrow =
      '<svg width="16" height="16" ><polygon points="14.14 7.07 7.07 0 0 7.07 4.07 7.07 4.07 16 10.07 16 10.07 7.07 14.14 7.07" style="fill:green"/></svg>';
    const downArrow =
      '<svg width="16" height="16"><polygon points="0 8.93 7.07 16 14.14 8.93 10.07 8.93 10.07 0 4.07 0 4.07 8.93 0 8.93" style="fill:red"/></svg>';
    
    // グラフィックの属性(Object)
    const attr = feature.graphic.attributes;

    // 住所
    const address = attr[CHIKAKOJI_FIELDS.field_tochi_address]; //地番
    const stdcode = attr[CHIKAKOJI_FIELDS.field_stdcode]; //標準地コード
    const seqid = attr[CHIKAKOJI_FIELDS.field_id]; //一連番号
    const citycode = attr[CHIKAKOJI_FIELDS.field_citycode]; //行政区域コード
    const genkyo = attr[CHIKAKOJI_FIELDS.field_genkyo]; // 利用現況

    // 5年間の平均変動率の計算 / 10年間の平均変動率
    //const yearH30 = feature.graphic.attributes.L01_096;
    const yearH26 = attr[CHIKAKOJI_FIELDS.field_yr_h26];
    const yearH27 = attr[CHIKAKOJI_FIELDS.field_yr_h27];
    const yearH28 = attr[CHIKAKOJI_FIELDS.field_yr_h28];
    const yearH29 = attr[CHIKAKOJI_FIELDS.field_yr_h29];
    const yearH30 = attr[CHIKAKOJI_FIELDS.field_yr_h30];

    const yearR1 = attr[CHIKAKOJI_FIELDS.field_yr_r01];
    const yearR2 = attr[CHIKAKOJI_FIELDS.field_yr_r02];
    const yearR3 = attr[CHIKAKOJI_FIELDS.field_yr_r03];
    const yearR4 = attr[CHIKAKOJI_FIELDS.field_yr_r04];
    const yearR5 = attr[CHIKAKOJI_FIELDS.field_yr_r05];
    
    let diff1 = calChange(yearH27, yearH26) + 1;
    let diff2 = calChange(yearH28, yearH27) + 1;
    let diff3 = calChange(yearH29, yearH28) + 1;
    let diff4 = calChange(yearH30, yearH29) + 1;
    let diff5 = calChange(yearR1, yearH30) + 1;
    let diff6 = calChange(yearR2, yearR1) + 1;
    let diff7 = calChange(yearR3, yearR2) + 1;
    let diff8 = calChange(yearR4, yearR3) + 1;
    let diff9 = calChange(yearR5, yearR4) + 1;

    let arr = [];
    let arr2 = [];
    // NaN か Infinity でない場合計算対象
    if (isFinite(diff1)) {arr.push(diff1)};
    if (isFinite(diff2)) {arr.push(diff2)};
    if (isFinite(diff3)) {arr.push(diff3)};
    if (isFinite(diff4)) {arr.push(diff4)};
    if (isFinite(diff5)) {arr.push(diff5)};
    if (isFinite(diff6)) {arr.push(diff6)};
    if (isFinite(diff7)) {arr.push(diff7)};
    if (isFinite(diff8)) {arr.push(diff8)};
    if (isFinite(diff9)) {arr.push(diff9)};

    if (isFinite(diff6)) {arr2.push(diff6)};
    if (isFinite(diff7)) {arr2.push(diff7)};
    if (isFinite(diff8)) {arr2.push(diff8)};
    if (isFinite(diff9)) {arr2.push(diff9)};

    const n = arr.length;
    let geoMean = geometricMean(arr, n);
    
    const nn = arr2.length;
    let geoMean5 = geometricMean(arr2, nn);

    // % に変更
    diff1 = (diff1 - 1) * 100;
    diff2 = (diff2 - 1) * 100;
    diff3 = (diff3 - 1) * 100;
    diff4 = (diff4 - 1) * 100;
    diff5 = (diff5 - 1) * 100;
    diff6 = (diff6 - 1) * 100;
    diff7 = (diff7 - 1) * 100;
    diff8 = (diff8 - 1) * 100;
    diff9 = (diff9 - 1) * 100;

    geoMean = (geoMean - 1) * 100;
    geoMean5 = (geoMean5 - 1) * 100; 

    const arrow = geoMean >= 0 ? upArrow : downArrow;
    const arrow5 = geoMean5 >= 0 ? upArrow : downArrow;

    div.innerHTML = "地番:" + (address ? address : "") + "</br>" + // 2022.3.31 変更 "住居表示:" + (address ? address : "") + "</br>" + 
            "公示価格(円/m2): " + (yearR5 ? yearR5.toLocaleString() : "") + "</br>" + 
            "標準地コード: " + (stdcode ? stdcode : "") + " 一連番号: " + (seqid ? seqid : "") + " 行政区域コード: " + (citycode ? citycode : "") + "</br>" + 
            "利用現況: " + (genkyo ? genkyo : "") + "</br>" + 
            "<ul>" + 
            "<li>平成26年価格(円/m2): " + (yearH26 ? yearH26.toLocaleString() : "") + "</li>" + 
            "<li>平成27年価格(円/m2): " + (yearH27 ? yearH27.toLocaleString() : "") + " 変動率: " + (isFinite(diff1) ? diff1.toFixed(2) : "---") + "%</li>" + 
            "<li>平成28年価格(円/m2): " + (yearH28 ? yearH28.toLocaleString() : "") + " 変動率: " + (isFinite(diff2) ? diff2.toFixed(2) : "---") + "%</li>" + 
            "<li>平成29年価格(円/m2): " + (yearH29 ? yearH29.toLocaleString() : "") + " 変動率: " + (isFinite(diff3) ? diff3.toFixed(2) : "---") + "%</li>" + 
            "<li>平成30年価格(円/m2): " + (yearH30 ? yearH30.toLocaleString() : "") + " 変動率: " + (isFinite(diff4) ? diff4.toFixed(2) : "---") + "%</li>" + 
            "<li>令和01年価格(円/m2): " + (yearR1 ? yearR1.toLocaleString() : "") + " 変動率: " + (isFinite(diff5) ? diff5.toFixed(2) : "---") + "%</li>" + 
            "<li>令和02年価格(円/m2): " + (yearR2 ? yearR2.toLocaleString() : "") + " 変動率: " + (isFinite(diff6) ? diff6.toFixed(2) : "---") + "%</li>" + 
            "<li>令和03年価格(円/m2): " + (yearR3 ? yearR3.toLocaleString() : "")  + " 変動率: " + (isFinite(diff7) ? diff7.toFixed(2) : "---") + "%</li>" + 
            "<li>令和04年価格(円/m2): " + (yearR4 ? yearR4.toLocaleString() : "")  + " 変動率: " + (isFinite(diff8) ? diff8.toFixed(2) : "---") + "%</li>" + 
            "<li>令和05年価格(円/m2): " + (yearR5 ? yearR5.toLocaleString() : "") + " 変動率: " + (isFinite(diff9) ? diff9.toFixed(2) : "---") + "%</li>" + 
            "<li>" + (n + 1) + "年間の平均変動率: " + arrow + 
            "<span style='color: " +
            (geoMean < 0 ? "red" : "green") + ";'>" + 
            "<b>" + geoMean.toFixed(2) + "</b>" +
            "</span></li>" + 
            "<li>近" + (nn + 1) + "年間の平均変動率: " + arrow + 
            "<span style='color: " +
            (geoMean5 < 0 ? "red" : "green") + ";'>" + 
            "<b>" + geoMean5.toFixed(2) + "</b>" +
            "</span></li>" + 
            "</ul>";
            
    // チャート作成して追加
    const chartCanvas = createHorizontalBarChart(diff1, diff2, diff3, diff4, diff5 ,diff6 ,diff7 ,diff8 ,diff9 ,geoMean5, geoMean);
    div.appendChild(chartCanvas);

    return div;
}

// 
// 公示地価の PopupTemplate
// 
const ChikakojiPopupTemplate = {
    title: "公示地価: {L01_001}", //標準地コード // Popup のタイトルを設定
    outFields: ["*"],
    content: landpriceChange,
    fieldInfos: [
        {
            fieldName: CHIKAKOJI_FIELDS.field_stdcode,
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_id,
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_citycode,
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_genkyo,
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_h26,
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_h27,
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_h28,
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_h29,
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_h30,
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_r01, // R1
            label: "令和元年価格(円/m2)",
            format: {
                digitSeparator: true, // 数値の3桁区切りを有効にする
                places: 0 // 整数で表示する
            }
       },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_r02, // R2
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_r03, // R3
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_r04, // R4
            format: {
                digitSeparator: true,
                places: 0
            }
        },
        {
            fieldName: CHIKAKOJI_FIELDS.field_yr_r05, // R5
            format: {
                digitSeparator: true,
                places: 0
            }
        }
    ]
}

// 必要なものだけ Export
export {
    CityPopupTemplate, ChikakojiPopupTemplate
}