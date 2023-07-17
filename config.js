// basemap の portal id を定義
// For use without an API key のみを定義
// https://developers.arcgis.com/javascript/latest/api-reference/esri-Map.html#basemap
const BASEMAPS = Object.freeze({
    ja_street_vector_id : "accf3eff22254ed69e23afeb094a4881", //"street-vector"の日本語版
    ja_street_night_vector_id : "ee3092a72f464186b6a192e82819d438", //"streets-night-vector"の日本語版
    ja_topo_vector_id : "9e74c6647b6e41538fb3b2a4b7e90784", //"topo-vector"
    ja_canvasgray_vector_id : "fb73573b374c47078fdf5a4498a7566a", //"canvasgray-vector"の日本語版
});

const CHIKAKOJI_FIELDS = Object.freeze({
    field_stdcode: "L01_001", //標準地コード
    field_id: "L01_002", //一連番号
    field_citycode: "L01_022", //行政区域コード
    field_tochi_address: "L01_024", //地番
    field_genkyo: "L01_027", //利用現況
    field_yr_h26: "L01_092", //H26調査価格
    field_yr_h27: "L01_093",
    field_yr_h28: "L01_094",
    field_yr_h29: "L01_095",
    field_yr_h30: "L01_096", //H30調査価格
    field_yr_r01: "L01_097", //R1調査価格
    field_yr_r02: "L01_098",
    field_yr_r03: "L01_099",
    field_yr_r04: "L01_100",
    field_yr_r05: "L01_101", //R5調査価格
});

const CHIKAKOJI_LAYER = Object.freeze({
    url: "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/LandPrice/FeatureServer/0", // 公示地価(国土数値情報 令和5年 - 調査時点:令和5年1月1日)
});

const CITY_LAYER =  Object.freeze({
    url: "https://services.arcgis.com/wlVTGRSYTzAbjjiC/arcgis/rest/services/municipalityboundaries2021/FeatureServer",
});

export {
    CHIKAKOJI_LAYER, CITY_LAYER, 
    BASEMAPS, 
    CHIKAKOJI_FIELDS,
}