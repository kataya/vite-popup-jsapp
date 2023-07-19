import{m as w,n as y,y as I,r as v,q as V,t as H,v as n,w as g,s as T,z as o,A as m,C as q}from"./index-b5294fcf.js";import"./Rasterizer-3cb23f31.js";import"./Container-ef090880.js";import"./BufferPool-70ba17b1.js";import"./color-1ed244aa.js";import"./WGLContainer-00dc1d8a.js";import"./enums-b14466b3.js";import"./Texture-7c6b4bbf.js";import"./ProgramTemplate-906e5771.js";import"./definitions-305a353a.js";import"./GeometryUtils-2b0eb7fc.js";import"./VertexArrayObject-f85bb9b6.js";import"./number-e491b09e.js";import"./StyleDefinition-29c49b98.js";import"./enums-fb086c25.js";import"./MagnifierPrograms-87091871.js";import"./OrderIndependentTransparency-309a1bc3.js";import"./floatRGBA-8a0ea084.js";import"./testSVGPremultipliedAlpha-246d8c93.js";import{o as U}from"./GraphicsView2D-5f0f88c0.js";import"./AttributeStoreView-21d291ac.js";import"./earcut-bb0930c0.js";import"./featureConversionUtils-5120ab23.js";import"./vec3f32-ad1dc57f.js";import"./normalizeUtils-5848a2ff.js";import{t as C,o as f,n as d}from"./imageUtils-4ccc0177.js";import{f as Q,d as S}from"./LayerView-e76b6b17.js";import{n as b}from"./HighlightGraphicContainer-c65cf8a0.js";import{a as k}from"./RefreshableLayerView-c47dbb36.js";import{S as F,U as R,r as z}from"./drapedUtils-b6a557e3.js";import"./cimAnalyzer-eb6dc955.js";import"./fontUtils-3e81ad04.js";import"./BidiEngine-9a40f2f4.js";import"./OptimizedGeometry-196224d4.js";import"./GeometryUtils-984e8446.js";import"./enums-f1a6a48a.js";import"./alignmentUtils-ae955d28.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-9f242f43.js";import"./rasterizingUtils-25ce97b3.js";import"./VertexElementDescriptor-2925c6af.js";import"./config-1337d16e.js";import"./pbf-d1aba3bf.js";import"./imageutils-9f6f7a55.js";import"./Matcher-88922989.js";import"./visualVariablesUtils-c594d4af.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-789ebccf.js";import"./ExpandedCIM-9912f302.js";import"./CircularArray-ef508845.js";import"./throttle-7bf02de9.js";import"./ComputedAttributeStorage-a0945451.js";import"./OptimizedFeature-4701473b.js";import"./arcadeTimeUtils-3eca6093.js";import"./executionError-c92d3b85.js";import"./projectionSupport-47626cba.js";import"./json-48e3ea08.js";import"./basicInterfaces-4ab7cc6a.js";import"./normalizeUtilsSync-68c15b74.js";import"./normalizeUtilsCommon-b4f7f90e.js";import"./TiledDisplayObject-cf4abe8c.js";import"./util-a2c3f1aa.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./utils-d4673196.js";import"./BitmapTileContainer-339f08aa.js";import"./Bitmap-b03cb9c0.js";import"./TileContainer-de92f0bc.js";import"./BaseGraphicContainer-e16f9a28.js";import"./FeatureContainer-2bc734e2.js";import"./scaleUtils-5096052b.js";import"./popupUtils-3ba7f5e7.js";const G=[0,0];let s=class extends k(C(Q(S))){constructor(){super(...arguments),this._fetchQueue=null,this._highlightGraphics=new w,this._highlightView=null,this._popupHighlightHelper=null,this._tileStrategy=null,this.layer=null}get resampling(){return!("resampling"in this.layer)||this.layer.resampling!==!1}get tilemapCache(){return"tilemapCache"in this.layer?this.layer.tilemapCache:null}update(t){var e;this._fetchQueue.pause(),this._fetchQueue.state=t.state,this._tileStrategy.update(t),this._fetchQueue.resume(),(e=this._highlightView)==null||e.processUpdate(t)}attach(){const t="tileServers"in this.layer?this.layer.tileServers:null,e=this.tilemapCache;if(this._tileInfoView=new y(this.layer.tileInfo,this.layer.fullExtent,e==null?void 0:e.effectiveMinLOD,e==null?void 0:e.effectiveMaxLOD),this._fetchQueue=new I({tileInfoView:this._tileInfoView,concurrency:t&&10*t.length||10,process:(i,r)=>this.fetchTile(i,r)}),this._tileStrategy=new v({cachePolicy:"keep",resampling:this.resampling,acquireTile:i=>this.acquireTile(i),releaseTile:i=>this.releaseTile(i),tileInfoView:this._tileInfoView}),F(this,this.layer)){const i=this._highlightView=new U({view:this.view,graphics:this._highlightGraphics,requestUpdateCallback:()=>this.requestUpdate(),container:new b(this.view.featuresTilingScheme),defaultPointSymbolEnabled:!1});this.container.addChild(this._highlightView.container),this._popupHighlightHelper=new R({createFetchPopupFeaturesQueryGeometry:(r,h)=>z(r,h,this.view),highlightGraphics:this._highlightGraphics,highlightGraphicUpdated:(r,h)=>{i.graphicUpdateHandler({graphic:r,property:h})},layerView:this,updatingHandles:this.updatingHandles})}this.requestUpdate(),this.addAttachHandles(V(()=>this.resampling,()=>{this.doRefresh()})),super.attach()}detach(){var t;super.detach(),this._tileStrategy.destroy(),this._fetchQueue.clear(),this.container.removeAllChildren(),(t=this._popupHighlightHelper)==null||t.destroy(),this._fetchQueue=this._tileStrategy=this._tileInfoView=this._popupHighlightHelper=null}async fetchPopupFeatures(t,e){return this._popupHighlightHelper?this._popupHighlightHelper.fetchPopupFeatures(t,e):[]}highlight(t){return this._popupHighlightHelper?this._popupHighlightHelper.highlight(t):{remove(){}}}moveStart(){this.requestUpdate()}viewChange(){this.requestUpdate()}moveEnd(){this.requestUpdate()}supportsSpatialReference(t){var e;return H((e=this.layer.tileInfo)==null?void 0:e.spatialReference,t)}async doRefresh(){!this.attached||this.updateRequested||this.suspended||(this._fetchQueue.reset(),this._tileStrategy.refresh(t=>this._enqueueTileFetch(t)))}isUpdating(){var t;return((t=this._fetchQueue)==null?void 0:t.updating)??!1}acquireTile(t){const e=this._bitmapView.createTile(t),i=e.bitmap;return[i.x,i.y]=this._tileInfoView.getTileCoords(G,e.key),i.resolution=this._tileInfoView.getTileResolution(e.key),[i.width,i.height]=this._tileInfoView.tileInfo.size,this._enqueueTileFetch(e),this._bitmapView.addChild(e),this.requestUpdate(),e}releaseTile(t){this._fetchQueue.abort(t.key.id),this._bitmapView.removeChild(t),t.once("detach",()=>t.destroy()),this.requestUpdate()}async fetchTile(t,e={}){const i=this.tilemapCache,{signal:r,resamplingLevel:h=0}=e;if(!i)try{return await this._fetchImage(t,r)}catch(a){if(!n(a)&&!this.resampling)return f(this._tileInfoView.tileInfo.size);if(h<3){const u=this._tileInfoView.getTileParentId(t.id);if(u){const c=new g(u),_=await this.fetchTile(c,{...e,resamplingLevel:h+1});return d(this._tileInfoView,_,c,t)}}throw a}const p=new g(0,0,0,0);let l;try{if(await i.fetchAvailabilityUpsample(t.level,t.row,t.col,p,{signal:r}),p.level!==t.level&&!this.resampling)return f(this._tileInfoView.tileInfo.size);l=await this._fetchImage(p,r)}catch(a){if(n(a))throw a;l=await this._fetchImage(t,r)}return this.resampling?d(this._tileInfoView,l,p,t):l}async _enqueueTileFetch(t){if(!this._fetchQueue.has(t.key.id)){try{const e=await this._fetchQueue.push(t.key);t.bitmap.source=e,t.bitmap.width=this._tileInfoView.tileInfo.size[0],t.bitmap.height=this._tileInfoView.tileInfo.size[1],t.requestRender(),t.once("attach",()=>this.requestUpdate())}catch(e){n(e)||T.getLogger(this).error(e)}this.requestUpdate()}}async _fetchImage(t,e){return this.layer.fetchImageBitmapTile(t.level,t.row,t.col,{signal:e})}};o([m()],s.prototype,"_fetchQueue",void 0),o([m()],s.prototype,"resampling",null),o([m()],s.prototype,"tilemapCache",null),s=o([q("esri.views.2d.layers.TileLayerView2D")],s);const Zt=s;export{Zt as default};
