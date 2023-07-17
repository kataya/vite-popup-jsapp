import{J as p,K as o,V as a,R as m,z as s,A as g,C as l}from"./index-265d95a6.js";import{f as c,d as n}from"./LayerView-b48bfd41.js";import{i as d}from"./GraphicContainer-38aa82e8.js";import{o as u}from"./GraphicsView2D-680b2df1.js";import"./Container-5a0dea1a.js";import"./definitions-0abb8136.js";import"./enums-b14466b3.js";import"./Texture-3f02b4cb.js";import"./color-bffba9b0.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./number-e491b09e.js";import"./BaseGraphicContainer-7957946e.js";import"./FeatureContainer-306b3f90.js";import"./AttributeStoreView-6611ee6a.js";import"./TiledDisplayObject-4293864a.js";import"./WGLContainer-5dfb94d4.js";import"./VertexArrayObject-9851830e.js";import"./ProgramTemplate-18eb9382.js";import"./GeometryUtils-c39202f7.js";import"./alignmentUtils-ae955d28.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-35787411.js";import"./featureConversionUtils-29c96bed.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./OptimizedGeometry-196224d4.js";import"./visualVariablesUtils-4b714ff3.js";import"./cimAnalyzer-15540f61.js";import"./fontUtils-7be7c04f.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-988a01ab.js";import"./floatRGBA-b5b048d3.js";import"./ExpandedCIM-243688b3.js";import"./util-0ae724ae.js";import"./TileContainer-f3eebad9.js";import"./vec3f32-ad1dc57f.js";import"./normalizeUtils-fa2d9b4e.js";import"./normalizeUtilsCommon-e45bdd02.js";import"./utils-f9651684.js";import"./normalizeUtilsSync-3e322612.js";import"./projectionSupport-6ad2c038.js";import"./json-48e3ea08.js";import"./Matcher-f1f166e0.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-9b8c203b.js";import"./ComputedAttributeStorage-1cacd9fe.js";import"./arcadeTimeUtils-d8695c40.js";import"./executionError-c92d3b85.js";const w={remove(){},pause(){},resume(){}};let e=class extends c(n){constructor(){super(...arguments),this._highlightIds=new Map}attach(){this.graphicsView=new u({requestUpdateCallback:()=>this.requestUpdate(),view:this.view,graphics:this.layer.graphics,container:new d(this.view.featuresTilingScheme)}),this._updateHighlight(),this.container.addChild(this.graphicsView.container),this.addAttachHandles(this.layer.on("graphic-update",this.graphicsView.graphicUpdateHandler))}detach(){this.container.removeAllChildren(),this.graphicsView=p(this.graphicsView)}async hitTest(i){return this.graphicsView?this.graphicsView.hitTest(i).map(t=>({type:"graphic",graphic:t,mapPoint:i,layer:this.layer})):null}async fetchPopupFeatures(i){return this.graphicsView?this.graphicsView.hitTest(i).filter(t=>!!t.popupTemplate):[]}queryGraphics(){return Promise.resolve(this.graphicsView.graphics)}update(i){this.graphicsView.processUpdate(i)}moveStart(){}viewChange(){this.graphicsView.viewChange()}moveEnd(){}isUpdating(){return!this.graphicsView||this.graphicsView.updating}highlight(i){let t;typeof i=="number"?t=[i]:i instanceof o?t=[i.uid]:Array.isArray(i)&&i.length>0?t=typeof i[0]=="number"?i:i.map(h=>h&&h.uid):a.isCollection(i)&&i.length>0&&(t=i.map(h=>h&&h.uid).toArray());const r=t==null?void 0:t.filter(m);return r!=null&&r.length?(this._addHighlight(r),{remove:()=>this._removeHighlight(r)}):w}_addHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const r=this._highlightIds.get(t);this._highlightIds.set(t,r+1)}else this._highlightIds.set(t,1);this._updateHighlight()}_removeHighlight(i){for(const t of i)if(this._highlightIds.has(t)){const r=this._highlightIds.get(t)-1;r===0?this._highlightIds.delete(t):this._highlightIds.set(t,r)}this._updateHighlight()}_updateHighlight(){var i;(i=this.graphicsView)==null||i.setHighlight(Array.from(this._highlightIds.keys()))}};s([g()],e.prototype,"graphicsView",void 0),e=s([l("esri.views.2d.layers.GraphicsLayerView2D")],e);const ui=e;export{ui as default};
