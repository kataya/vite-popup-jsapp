import{f as e}from"./utils-d8fb712d.js";import{y as f}from"./queryTopFeatures-b01f6329.js";import{d7 as s,E as n}from"./index-39c80a15.js";import"./normalizeUtils-94e94d57.js";import"./normalizeUtilsCommon-edbdf520.js";import"./query-b49a2a08.js";import"./pbfQueryUtils-91d32f5f.js";import"./pbf-4a74d45c.js";import"./OptimizedGeometry-196224d4.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";async function O(r,o,t,m){const i=e(r),p={...m},{data:a}=await f(i,s.from(o),t,p);return n.fromJSON(a)}export{O as executeTopFeaturesQuery};
