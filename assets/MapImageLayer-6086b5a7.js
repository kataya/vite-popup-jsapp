import{cj as w,cL as $,cn as I,cM as O,cl as T,cm as E,co as M,ck as R,cN as P,cO as L,b9 as j,cp as N,cE as b,cP as g,cQ as v,cR as F,cS as q,ad as f,aP as J,cT as U,cU as k,cV as A,a as S,v as _,z as i,A as n,cW as x,bb as V,cX as z,ct as C,C as W,aq as B,cY as D}from"./index-265d95a6.js";import{i as G}from"./scaleUtils-1d5ce1a7.js";import{E as H,f as K,Y}from"./SublayersOwner-d30e5fb4.js";import"./QueryTask-e2afd763.js";import"./utils-f9651684.js";import"./executeForIds-e9cd3bf9.js";import"./query-68cc343c.js";import"./normalizeUtils-fa2d9b4e.js";import"./normalizeUtilsCommon-e45bdd02.js";import"./pbfQueryUtils-c0a2fe3e.js";import"./pbf-5c23e26f.js";import"./OptimizedGeometry-196224d4.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";import"./executeQueryJSON-37cfadc5.js";import"./executeQueryPBF-d7f15def.js";import"./featureConversionUtils-29c96bed.js";let s=class extends w($(I(H(K(O(T(E(M(R(P(L(j(B))))))))))))){constructor(...e){super(...e),this.dateFieldsTimeReference=null,this.datesInUnknownTimezone=!1,this.dpi=96,this.gdbVersion=null,this.imageFormat="png24",this.imageMaxHeight=2048,this.imageMaxWidth=2048,this.imageTransparency=!0,this.isReference=null,this.labelsVisible=!1,this.operationalLayerType="ArcGISMapServiceLayer",this.preferredTimeReference=null,this.sourceJSON=null,this.sublayers=null,this.type="map-image",this.url=null}normalizeCtorArgs(e,a){return typeof e=="string"?{url:e,...a}:e}load(e){const a=e!=null?e.signal:null;return this.addResolvingPromise(this.loadFromPortal({supportedTypes:["Map Service"]},e).catch(N).then(()=>this._fetchService(a))),Promise.resolve(this)}readImageFormat(e,a){const l=a.supportedImageFormatTypes;return l&&l.includes("PNG32")?"png32":"png24"}writeSublayers(e,a,l,t){var h;if(!this.loaded||!e)return;const o=e.slice().reverse().flatten(({sublayers:r})=>r&&r.toArray().reverse()).toArray();let p=!1;if(this.capabilities&&this.capabilities.operations.supportsExportMap&&((h=this.capabilities.exportMap)!=null&&h.supportsDynamicLayers)){const r=b(t.origin);if(r===g.PORTAL_ITEM){const m=this.createSublayersForOrigin("service").sublayers;p=v(o,m,g.SERVICE)}else if(r>g.PORTAL_ITEM){const m=this.createSublayersForOrigin("portal-item");p=v(o,m.sublayers,b(m.origin))}}const c=[],d={writeSublayerStructure:p,...t};let y=p;o.forEach(r=>{const m=r.write({},d);c.push(m),y=y||r.originOf("visible")==="user"}),c.some(r=>Object.keys(r).length>1)&&(a.layers=c),y&&(a.visibleLayers=o.filter(r=>r.visible).map(r=>r.id))}createExportImageParameters(e,a,l,t){const o=t&&t.pixelRatio||1;e&&this.version>=10&&(e=e.clone().shiftCentralMeridian());const p=new F({layer:this,floors:t==null?void 0:t.floors,scale:G({extent:e,width:a})*o}),c=p.toJSON();p.destroy();const d=!t||!t.rotation||this.version<10.3?{}:{rotation:-t.rotation},y=e&&e.spatialReference,h=y.wkid||JSON.stringify(y.toJSON());c.dpi*=o;const r={};if(t!=null&&t.timeExtent){const{start:m,end:u}=t.timeExtent.toJSON();r.time=m&&u&&m===u?""+m:`${m??"null"},${u??"null"}`}else this.timeInfo&&!this.timeInfo.hasLiveData&&(r.time="null,null");return{bbox:e&&e.xmin+","+e.ymin+","+e.xmax+","+e.ymax,bboxSR:h,imageSR:h,size:a+","+l,...c,...d,...r}}async fetchImage(e,a,l,t){const{data:o}=await this._fetchImage("image",e,a,l,t);return o}async fetchImageBitmap(e,a,l,t){const{data:o,url:p}=await this._fetchImage("blob",e,a,l,t);return q(o,p,t==null?void 0:t.signal)}async fetchRecomputedExtents(e={}){const a={...e,query:{returnUpdates:!0,f:"json",...this.customParameters,token:this.apiKey}},{data:l}=await f(this.url,a),{extent:t,fullExtent:o,timeExtent:p}=l,c=t||o;return{fullExtent:c&&J.fromJSON(c),timeExtent:p&&U.fromJSON({start:p[0],end:p[1]})}}loadAll(){return k(this,e=>{e(this.allSublayers)})}serviceSupportsSpatialReference(e){return A(this,e)}async _fetchImage(e,a,l,t,o){var d,y,h;const p={responseType:e,signal:(o==null?void 0:o.signal)??null,query:{...this.parsedUrl.query,...this.createExportImageParameters(a,l,t,o),f:"image",...this.refreshParameters,...this.customParameters,token:this.apiKey}},c=this.parsedUrl.path+"/export";if(((d=p.query)==null?void 0:d.dynamicLayers)!=null&&!((h=(y=this.capabilities)==null?void 0:y.exportMap)!=null&&h.supportsDynamicLayers))throw new S("mapimagelayer:dynamiclayer-not-supported",`service ${this.url} doesn't support dynamic layers, which is required to be able to change the sublayer's order, rendering, labeling or source.`,{query:p.query});try{const{data:r}=await f(c,p);return{data:r,url:c}}catch(r){throw _(r)?r:new S("mapimagelayer:image-fetch-error",`Unable to load image: ${c}`,{error:r})}}async _fetchService(e){if(this.sourceJSON)return void this.read(this.sourceJSON,{origin:"service",url:this.parsedUrl});const{data:a,ssl:l}=await f(this.parsedUrl.path,{query:{f:"json",...this.parsedUrl.query,...this.customParameters,token:this.apiKey},signal:e});l&&(this.url=this.url.replace(/^http:/i,"https:")),this.sourceJSON=a,this.read(a,{origin:"service",url:this.parsedUrl})}};i([n({type:x})],s.prototype,"dateFieldsTimeReference",void 0),i([n({type:Boolean})],s.prototype,"datesInUnknownTimezone",void 0),i([n()],s.prototype,"dpi",void 0),i([n()],s.prototype,"gdbVersion",void 0),i([n()],s.prototype,"imageFormat",void 0),i([V("imageFormat",["supportedImageFormatTypes"])],s.prototype,"readImageFormat",null),i([n({json:{origins:{service:{read:{source:"maxImageHeight"}}}}})],s.prototype,"imageMaxHeight",void 0),i([n({json:{origins:{service:{read:{source:"maxImageWidth"}}}}})],s.prototype,"imageMaxWidth",void 0),i([n()],s.prototype,"imageTransparency",void 0),i([n({type:Boolean,json:{read:!1,write:{enabled:!0,overridePolicy:()=>({enabled:!1})}}})],s.prototype,"isReference",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"labelsVisible",void 0),i([n({type:["ArcGISMapServiceLayer"]})],s.prototype,"operationalLayerType",void 0),i([n({json:{read:!1,write:!1}})],s.prototype,"popupEnabled",void 0),i([n({type:x})],s.prototype,"preferredTimeReference",void 0),i([n()],s.prototype,"sourceJSON",void 0),i([n({json:{write:{ignoreOrigin:!0}}})],s.prototype,"sublayers",void 0),i([z("sublayers",{layers:{type:[Y]},visibleLayers:{type:[D]}})],s.prototype,"writeSublayers",null),i([n({type:["show","hide","hide-children"]})],s.prototype,"listMode",void 0),i([n({json:{read:!1},readOnly:!0,value:"map-image"})],s.prototype,"type",void 0),i([n(C)],s.prototype,"url",void 0),s=i([W("esri.layers.MapImageLayer")],s);const de=s;export{de as default};