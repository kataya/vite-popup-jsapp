import{z as m,C as d,q as u,D as y,T as h,U as b}from"./index-b5294fcf.js";import c from"./FeatureLayerView2D-b04bf1ea.js";import"./definitions-305a353a.js";import"./LayerView-e76b6b17.js";import"./Container-ef090880.js";import"./enums-b14466b3.js";import"./Texture-7c6b4bbf.js";import"./AttributeStoreView-21d291ac.js";import"./TiledDisplayObject-cf4abe8c.js";import"./color-1ed244aa.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./number-e491b09e.js";import"./WGLContainer-00dc1d8a.js";import"./VertexArrayObject-f85bb9b6.js";import"./ProgramTemplate-906e5771.js";import"./GeometryUtils-2b0eb7fc.js";import"./alignmentUtils-ae955d28.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-bb0930c0.js";import"./featureConversionUtils-5120ab23.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./OptimizedGeometry-196224d4.js";import"./visualVariablesUtils-c594d4af.js";import"./cimAnalyzer-eb6dc955.js";import"./fontUtils-3e81ad04.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-9f242f43.js";import"./floatRGBA-8a0ea084.js";import"./ExpandedCIM-9912f302.js";import"./util-a2c3f1aa.js";import"./BitmapTileContainer-339f08aa.js";import"./Bitmap-b03cb9c0.js";import"./TileContainer-de92f0bc.js";import"./CircularArray-ef508845.js";import"./BufferPool-70ba17b1.js";import"./FeatureContainer-2bc734e2.js";import"./popupUtils-3ba7f5e7.js";import"./RefreshableLayerView-c47dbb36.js";function g(i,e){return!i.visible||i.minScale!==0&&e>i.minScale||i.maxScale!==0&&e<i.maxScale}let n=class extends c{initialize(){this.addHandles([u(()=>this.view.scale,()=>this._update(),y)],"constructor")}isUpdating(){var p;const i=this.layer.sublayers.some(l=>l.renderer!=null),e=this._commandsQueue.updating,s=this._updatingRequiredFieldsPromise!=null,t=!this._proxy||!this._proxy.isReady,r=this._pipelineIsUpdating,o=this.tileRenderer==null||((p=this.tileRenderer)==null?void 0:p.updating),a=i&&(e||s||t||r||o);return h("esri-2d-log-updating")&&console.log(`Updating FLV2D: ${a}
  -> hasRenderer ${i}
  -> hasPendingCommand ${e}
  -> updatingRequiredFields ${s}
  -> updatingProxy ${t}
  -> updatingPipeline ${r}
  -> updatingTileRenderer ${o}
`),a}_injectOverrides(i){let e=super._injectOverrides(i);const s=this.view.scale,t=this.layer.sublayers.filter(o=>g(o,s)).map(o=>o.subtypeCode);if(!t.length)return e;e=e??new b().toJSON();const r=`NOT ${this.layer.subtypeField} IN (${t.join(",")})`;return e.where=e.where?`(${e.where}) AND (${r})`:r,e}_setLayersForFeature(i){const e=this.layer.fieldsIndex.get(this.layer.subtypeField),s=i.attributes[e.name],t=this.layer.sublayers.find(r=>r.subtypeCode===s);i.layer=i.sourceLayer=t}_createSchemaConfig(){const i={subtypeField:this.layer.subtypeField,sublayers:Array.from(this.layer.sublayers).map(r=>({featureReduction:null,geometryType:this.layer.geometryType,labelingInfo:r.labelingInfo,labelsVisible:r.labelsVisible,renderer:r.renderer,subtypeCode:r.subtypeCode,orderBy:null}))},e=this.layer.sublayers.map(r=>r.subtypeCode).join(","),s=this.layer.sublayers.length?`${this.layer.subtypeField} IN (${e})`:"1=2";let t=this.layer.definitionExpression?this.layer.definitionExpression+" AND ":"";return t+=s,{...super._createSchemaConfig(),...i,definitionExpression:t}}};n=m([d("esri.views.2d.layers.SubtypeGroupLayerView2D")],n);const ae=n;export{ae as default};