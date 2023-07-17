import{z as s,A as n,U as h,C as y,q as m,a as d,ew as _,E as f}from"./index-265d95a6.js";import S from"./FeatureLayerView2D-ef4f293e.js";import{e as v}from"./util-0ae724ae.js";import"./definitions-0abb8136.js";import"./LayerView-b48bfd41.js";import"./Container-5a0dea1a.js";import"./enums-b14466b3.js";import"./Texture-3f02b4cb.js";import"./AttributeStoreView-6611ee6a.js";import"./TiledDisplayObject-4293864a.js";import"./color-bffba9b0.js";import"./enums-f1a6a48a.js";import"./VertexElementDescriptor-2925c6af.js";import"./number-e491b09e.js";import"./WGLContainer-5dfb94d4.js";import"./VertexArrayObject-9851830e.js";import"./ProgramTemplate-18eb9382.js";import"./GeometryUtils-c39202f7.js";import"./alignmentUtils-ae955d28.js";import"./StyleDefinition-29c49b98.js";import"./config-1337d16e.js";import"./earcut-35787411.js";import"./featureConversionUtils-29c96bed.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./OptimizedGeometry-196224d4.js";import"./visualVariablesUtils-4b714ff3.js";import"./cimAnalyzer-15540f61.js";import"./fontUtils-7be7c04f.js";import"./BidiEngine-9a40f2f4.js";import"./GeometryUtils-984e8446.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-988a01ab.js";import"./floatRGBA-b5b048d3.js";import"./ExpandedCIM-243688b3.js";import"./BitmapTileContainer-ef0508c9.js";import"./Bitmap-bc235dab.js";import"./TileContainer-f3eebad9.js";import"./CircularArray-ef508845.js";import"./BufferPool-413281e1.js";import"./FeatureContainer-306b3f90.js";import"./popupUtils-efc7295c.js";import"./RefreshableLayerView-8886f733.js";const g=e=>{let t=class extends e{resume(){this._isUserPaused=!1,this.suspended||this._doResume()}pause(){this._isUserPaused=!0,this.suspended||this._doPause()}constructor(...r){super(...r),this._isUserPaused=!1,this.filter=null}get connectionStatus(){return this._isUserPaused?"paused":this._streamConnectionStatus}_onSuspendedChange(r){r?this._doPause():this._isUserPaused||this._doResume()}};return s([n()],t.prototype,"_isUserPaused",void 0),s([n({readOnly:!0})],t.prototype,"connectionStatus",null),s([n({type:h})],t.prototype,"filter",void 0),t=s([y("esri.layers.mixins.StreamLayerView")],t),t};function c(e,t){if(e==null&&t==null)return null;const r={};return t!=null&&(r.geometry=t.toJSON()),e!=null&&(r.where=e),r}let o=class extends g(S){constructor(){super(...arguments),this.pipelineConnectionStatus="disconnected",this.pipelineErrorString=null,this._enabledEventTypes=new Set}initialize(){this.addHandles([m(()=>this.layer.customParameters,e=>this._proxy.updateCustomParameters(e)),this.layer.on("send-message-to-socket",e=>this._proxy.sendMessageToSocket(e)),this.layer.on("send-message-to-client",e=>this._proxy.sendMessageToClient(e)),m(()=>this.layer.purgeOptions,()=>this._update()),m(()=>this.suspended,this._onSuspendedChange.bind(this))],"constructor")}get connectionError(){return this.pipelineErrorString?new d("stream-controller",this.pipelineErrorString):null}on(e,t){if(Array.isArray(e))return _(e.map(p=>this.on(p,t)));const r=["data-received","message-received"].includes(e);r&&(this._enabledEventTypes.add(e),this._proxy.enableEvent(e,!0));const a=super.on(e,t),i=this;return{remove(){a.remove(),r&&(i._proxy.closed||i.hasEventListener(e)||i._proxy.enableEvent(e,!1))}}}queryLatestObservations(e,t){var r,a,i;if(!((r=this.layer.timeInfo)!=null&&r.endField||(a=this.layer.timeInfo)!=null&&a.startField||(i=this.layer.timeInfo)!=null&&i.trackIdField))throw new d("streamlayer-no-timeField","queryLatestObservation can only be used with services that define a TrackIdField");return this._proxy.queryLatestObservations(this._cleanUpQuery(e),t).then(p=>{const l=f.fromJSON(p);return l.features.forEach(u=>{u.layer=this.layer,u.sourceLayer=this.layer}),l})}detach(){super.detach(),this.pipelineConnectionStatus="disconnected"}get _streamConnectionStatus(){return this.pipelineConnectionStatus}_doPause(){var e;(e=this._proxy)==null||e.pauseStream()}_doResume(){var e;(e=this._proxy)==null||e.resumeStream()}_createClientOptions(){return{...super._createClientOptions(),setProperty:e=>{this.set(e.propertyName,e.value)}}}_createTileRendererHash(e){const t=`${JSON.stringify(this.layer.purgeOptions)}.${JSON.stringify(c(this.layer.definitionExpression,this.layer.geometryDefinition))})`;return super._createTileRendererHash(e)+t}async _createServiceOptions(){const e=this.layer,{objectIdField:t}=e,r=e.fields.map(l=>l.toJSON()),a=v(e.geometryType),i=e.timeInfo&&e.timeInfo.toJSON()||null,p=e.spatialReference?e.spatialReference.toJSON():null;return{type:"stream",isPaused:this._isUserPaused,fields:r,geometryType:a,objectIdField:t,timeInfo:i,source:this.layer.parsedUrl,serviceFilter:c(this.layer.definitionExpression,this.layer.geometryDefinition),purgeOptions:this.layer.purgeOptions.toJSON(),enabledEventTypes:Array.from(this._enabledEventTypes.values()),spatialReference:p,maxReconnectionAttempts:this.layer.maxReconnectionAttempts,maxReconnectionInterval:this.layer.maxReconnectionInterval,updateInterval:this.layer.updateInterval,customParameters:e.customParameters}}};s([n()],o.prototype,"pipelineConnectionStatus",void 0),s([n()],o.prototype,"pipelineErrorString",void 0),s([n({readOnly:!0})],o.prototype,"connectionError",null),s([n({readOnly:!0})],o.prototype,"_streamConnectionStatus",null),o=s([y("esri.views.2d.layers.StreamLayerView2D")],o);const me=o;export{me as default};