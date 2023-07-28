import{z as o,A as m,eo as C,C as b,J as M,a as g,v as F,s as E,q,aP as R}from"./index-39c80a15.js";import{a as I}from"./BitmapContainer-5b8bb41c.js";import{f as U,d as V}from"./LayerView-8f446ed1.js";import{v as W}from"./ExportStrategy-354ce367.js";import{a as L}from"./RefreshableLayerView-e0a9123b.js";import{l as z}from"./ExportWMSImageParameters-7695fe1f.js";import"./WGLContainer-930f047e.js";import"./definitions-e2008785.js";import"./VertexArrayObject-22fa0a19.js";import"./Texture-f4eddc92.js";import"./enums-b14466b3.js";import"./VertexElementDescriptor-2925c6af.js";import"./color-88d8e0fc.js";import"./enums-f1a6a48a.js";import"./number-e491b09e.js";import"./ProgramTemplate-abd7435c.js";import"./GeometryUtils-3872ff86.js";import"./alignmentUtils-ae955d28.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./Container-d4545f50.js";import"./earcut-797dde7a.js";import"./featureConversionUtils-40fe2ccd.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./OptimizedGeometry-196224d4.js";import"./Bitmap-54bd5389.js";const A=e=>{let t=class extends e{initialize(){this.exportImageParameters=new z({layer:this.layer})}destroy(){this.exportImageParameters=M(this.exportImageParameters)}get exportImageVersion(){var r;return(r=this.exportImageParameters)==null||r.commitProperty("version"),this.commitProperty("timeExtent"),(this._get("exportImageVersion")||0)+1}fetchPopupFeatures(r){const{layer:a}=this;if(!r)return Promise.reject(new g("wmslayerview:fetchPopupFeatures","Nothing to fetch without area",{layer:a}));const{popupEnabled:p}=a;if(!p)return Promise.reject(new g("wmslayerview:fetchPopupFeatures","popupEnabled should be true",{popupEnabled:p}));const u=this.createFetchPopupFeaturesQuery(r);if(!u)return Promise.resolve([]);const{extent:i,width:s,height:n,x:d,y:c}=u;if(!(i&&s&&n))throw new g("wmslayerview:fetchPopupFeatures","WMSLayer does not support fetching features.",{extent:i,width:s,height:n});return a.fetchFeatureInfo(i,s,n,d,c)}};return o([m()],t.prototype,"exportImageParameters",void 0),o([m({readOnly:!0})],t.prototype,"exportImageVersion",null),o([m()],t.prototype,"layer",void 0),o([m(C)],t.prototype,"timeExtent",void 0),t=o([b("esri.layers.mixins.WMSLayerView")],t),t};let h=class extends A(L(U(V))){constructor(){super(...arguments),this.bitmapContainer=new I}supportsSpatialReference(e){return this.layer.serviceSupportsSpatialReference(e)}update(e){this.strategy.update(e).catch(t=>{F(t)||E.getLogger(this).error(t)})}attach(){const{layer:e}=this,{imageMaxHeight:t,imageMaxWidth:r}=e;this.bitmapContainer=new I,this.container.addChild(this.bitmapContainer),this.strategy=new W({container:this.bitmapContainer,fetchSource:this.fetchImage.bind(this),requestUpdate:this.requestUpdate.bind(this),imageMaxHeight:t,imageMaxWidth:r,imageRotationSupported:!1,imageNormalizationSupported:!1,hidpi:!1}),this.addAttachHandles(q(()=>this.exportImageVersion,()=>this.requestUpdate()))}detach(){this.strategy=M(this.strategy),this.container.removeAllChildren()}moveStart(){}viewChange(){}moveEnd(){this.requestUpdate()}createFetchPopupFeaturesQuery(e){const{view:t,bitmapContainer:r}=this,{x:a,y:p}=e,{spatialReference:u}=t;let i,s=0,n=0;if(r.children.some($=>{const{width:x,height:f,resolution:w,x:l,y}=$,v=l+w*x,P=y-w*f;return a>=l&&a<=v&&p<=y&&p>=P&&(i=new R({xmin:l,ymin:P,xmax:v,ymax:y,spatialReference:u}),s=x,n=f,!0)}),!i)return null;const d=i.width/s,c=Math.round((a-i.xmin)/d),S=Math.round((i.ymax-p)/d);return{extent:i,width:s,height:n,x:c,y:S}}async doRefresh(){this.requestUpdate()}isUpdating(){return this.strategy.updating||this.updateRequested}fetchImage(e,t,r,a){return this.layer.fetchImageBitmap(e,t,r,{timeExtent:this.timeExtent,...a})}};o([m()],h.prototype,"strategy",void 0),o([m()],h.prototype,"updating",void 0),h=o([b("esri.views.2d.layers.WMSLayerView2D")],h);const ut=h;export{ut as default};