
import LocalBasemapsSource from "@arcgis/core/widgets/BasemapGallery/support/LocalBasemapsSource";
import Basemap from "@arcgis/core/Basemap";
import WebTileLayer from "@arcgis/core/layers/WebTileLayer";

import { BASEMAPS } from "./config.js";

const CreateLocalBasemapsSource = function() {

    // 道路地図（vector）
    const streetsVMap = new Basemap(
        {portalItem: {id: BASEMAPS.ja_street_vector_id }}
    );

    // 道路（夜）（streets-night-vector）
    const streetsNVMap = new Basemap(
        {portalItem: {id: BASEMAPS.ja_street_night_vector_id }}
    );

    // 地形図
    const topoVMap = new Basemap(
        {portalItem: {id: BASEMAPS.ja_topo_vector_id }}
    );

    // キャンバス（ライトグレー）
    const canvasLVMap = new Basemap(
        {portalItem: {id: BASEMAPS.ja_canvasgray_vector_id }}
    );

    // 地理院 - 淡色地図
    const paleMap = new Basemap({
        baseLayers:[new WebTileLayer({
            urlTemplate: "https://cyberjapandata.gsi.go.jp/xyz/pale/{z}/{x}/{y}.png",
            copyright: "地理院タイル （https://maps.gsi.go.jp/development/ichiran.html）"
        })],
        title: "地理院タイル - 淡色地図",
        id: "palemap",
        thumbnailUrl: "https://cyberjapandata.gsi.go.jp/xyz/pale/12/3637/1612.png"
    });
    
    // 地理院 - 写真
    const seamlessPhoto = new Basemap({
        baseLayers:[new WebTileLayer({
            urlTemplate: "https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/{z}/{x}/{y}.jpg",
            copyright: "地理院タイル （https://maps.gsi.go.jp/development/ichiran.html）"
        })],
        title: "地理院タイル - 写真",
        id: "seamlessphoto",
        thumbnailUrl:"https://cyberjapandata.gsi.go.jp/xyz/seamlessphoto/16/58274/25716.jpg"
    });
    
    const localSource = new LocalBasemapsSource({
        basemaps: [streetsVMap, streetsNVMap, topoVMap, canvasLVMap, paleMap, seamlessPhoto]
    });

    return localSource;
}

export {
    CreateLocalBasemapsSource
}