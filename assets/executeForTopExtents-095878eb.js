import{d7 as i,aP as a}from"./index-39c80a15.js";import{f as e}from"./utils-d8fb712d.js";import{p as n}from"./queryTopFeatures-b01f6329.js";import"./normalizeUtils-94e94d57.js";import"./normalizeUtilsCommon-edbdf520.js";import"./query-b49a2a08.js";import"./pbfQueryUtils-91d32f5f.js";import"./pbf-4a74d45c.js";import"./OptimizedGeometry-196224d4.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";async function F(o,r,m){const p=e(o),t=await n(p,i.from(r),{...m});return{count:t.data.count,extent:a.fromJSON(t.data.extent)}}export{F as executeForTopExtents};
