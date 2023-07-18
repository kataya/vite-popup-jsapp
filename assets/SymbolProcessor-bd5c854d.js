import{v as D,z as F,C as R,dZ as K,ga as w,au as b,a8 as $,d_ as v,W as E}from"./index-4b712bf9.js";import{a as P}from"./cimAnalyzer-9d4f2bda.js";import{p as L}from"./visualVariablesUtils-962918e9.js";import{S as A}from"./color-b7de25a6.js";import{x as O,o as x,a as U,E as z,n as B}from"./Matcher-8275c134.js";import{p as W}from"./BaseProcessor-efeb4dec.js";import"./fontUtils-06f0d4b5.js";import"./BidiEngine-9a40f2f4.js";import"./OptimizedGeometry-196224d4.js";import"./GeometryUtils-984e8446.js";import"./enums-f1a6a48a.js";import"./alignmentUtils-ae955d28.js";import"./definitions-f717827e.js";import"./number-e491b09e.js";import"./Rect-ea14f53a.js";import"./quantizationUtils-b587b411.js";import"./floatRGBA-d3873d8b.js";import"./enums-b14466b3.js";import"./VertexElementDescriptor-2925c6af.js";import"./tileUtils-c2f19f52.js";import"./TurboLine-8654830d.js";import"./GeometryUtils-61915c2a.js";import"./earcut-fa6784ee.js";import"./ExpandedCIM-396dda9a.js";class Z{constructor(e){this._remoteClient=e,this._resourceMap=new Map,this._inFlightResourceMap=new Map,this.geometryEngine=null,this.geometryEnginePromise=null}destroy(){}async fetchResource(e,s){const r=this._resourceMap,i=r.get(e);if(i)return i;let a=this._inFlightResourceMap.get(e);if(a)return a;try{a=this._remoteClient.invoke("tileRenderer.fetchResource",{url:e},{...s}),this._inFlightResourceMap.set(e,a),a.then(n=>(this._inFlightResourceMap.delete(e),r.set(e,n),n))}catch(n){return D(n)?null:{width:0,height:0}}return a}getResource(e){return this._resourceMap.get(e)??null}loadFont(e){return Promise.resolve(null)}}function T(t,e){return(!t.minScale||t.minScale>=e)&&(!t.maxScale||t.maxScale<=e)}function k(t){const e=t.message,s={message:{data:{},tileKey:e.tileKey,tileKeyOrigin:e.tileKeyOrigin,version:e.version},transferList:new Array};for(const r in e.data){const i=r,a=e.data[i];if(s.message.data[i]=null,a!=null){const n=a.stride,o=a.indices.slice(0),l=a.vertices.slice(0),c=a.records.slice(0),h={stride:n,indices:o,vertices:l,records:c,metrics:v(a.metrics,f=>f.slice(0))};s.transferList.push(o,l,c),s.message.data[i]=h}}return s}let S=class extends W{constructor(){super(...arguments),this.type="symbol",this._matchers={feature:null,aggregate:null},this._bufferData=new Map,this._bufferIds=new Map}initialize(){this.handles.add([this.tileStore.on("update",this.onTileUpdate.bind(this))]),this._resourceManagerProxy=new Z(this.remoteClient)}destroy(){this._resourceManagerProxy.destroy()}get supportsTileUpdates(){return!0}forEachBufferId(t){this._bufferIds.forEach(e=>{e.forEach(t)})}async update(t,e){var i;const s=e.schema.processors[0];if(s.type!=="symbol")return;const r=K(this._schema,s);(w(r,"mesh")||w(r,"target"))&&(t.mesh=!0,(i=t.why)==null||i.mesh.push("Symbology changed"),this._schema=s,this._factory=this._createFactory(s),this._factory.update(s,this.tileStore.tileScheme.tileInfo))}onTileMessage(t,e,s,r){return b(r),this._onTileData(t,e,s,r)}onTileClear(t,e){const s={clear:!0,end:e};return this._bufferData.delete(t.key.id),this._bufferIds.delete(t.key.id),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:t.id,data:s})}onTileError(t,e,s){const r=s.signal,i={tileKey:t.id,error:e};return this.remoteClient.invoke("tileRenderer.onTileError",i,{signal:r})}onTileUpdate(t){for(const e of t.removed)this._bufferData.has(e.key.id)&&this._bufferData.delete(e.key.id),this._bufferIds.has(e.key.id)&&this._bufferIds.delete(e.key.id);for(const e of t.added)this._bufferData.forEach(s=>{for(const r of s)r.message.tileKey===e.id&&this._updateTileMesh("append",e,k(r),[],!1,!1,null)})}_addBufferData(t,e){var s;this._bufferData.has(t)||this._bufferData.set(t,[]),(s=this._bufferData.get(t))==null||s.push(k(e))}_createFactory(t){const{geometryType:e,objectIdField:s,fields:r}=this.service,i=(c,h)=>this.remoteClient.invoke("tileRenderer.getMaterialItems",c,h),a={geometryType:e,fields:r,spatialReference:$.fromJSON(this.spatialReference)},n=new O(i,this.tileStore.tileScheme.tileInfo),{matcher:o,aggregateMatcher:l}=t.mesh;return this._store=n,this._matchers.feature=x(o,n,a,this._resourceManagerProxy),this._matchers.aggregate=v(l,c=>x(c,n,a,this._resourceManagerProxy)),new U(e,s,n)}async _onTileData(t,e,s,r){var f;b(r);const{type:i,addOrUpdate:a,remove:n,clear:o,end:l}=e,c=!!this._schema.mesh.sortKey;if(!a){const u={type:i,addOrUpdate:null,remove:n,clear:o,end:l,sort:c};return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:t.id,data:u},r)}const h=this._processFeatures(t,a,s,r,(f=e.status)==null?void 0:f.version);try{const u=await h;if(u==null){const d={type:i,addOrUpdate:null,remove:n,clear:o,end:l,sort:c};return this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:t.id,data:d},r)}const m=[];for(const d of u){let g=!1;const p=d.message.bufferIds,y=t.key.id,M=d.message.tileKey;if(y!==M&&p!=null){if(!this.tileStore.get(M)){this._addBufferData(y,d),m.push(d);continue}let _=this._bufferIds.get(M);_||(_=new Set,this._bufferIds.set(M,_));const C=Array.from(p);for(const I of C){if(_.has(I)){g=!0;break}_.add(I)}}g||(this._addBufferData(y,d),m.push(d))}await Promise.all(m.map(d=>{const g=t.key.id===d.message.tileKey,p=g?e.remove:[],y=g&&e.end;return this._updateTileMesh(i,t,d,p,y,!!e.clear,r.signal)}))}catch(u){this._handleError(t,u,r)}}async _updateTileMesh(t,e,s,r,i,a,n){const o=t,l=s.message.tileKey,c=!!this._schema.mesh.sortKey;l!==e.key.id&&(i=!1);const h={type:o,addOrUpdate:v(s,u=>u.message),remove:r,clear:a,end:i,sort:c},f={transferList:v(s,u=>u.transferList)||[],signal:n};return b(f),this.remoteClient.invoke("tileRenderer.onTileData",{tileKey:l,data:h},f)}async _processFeatures(t,e,s,r,i){if(e==null||!e.hasFeatures)return null;const a={transform:t.transform,hasZ:!1,hasM:!1},n=this._factory,o={viewingMode:"",scale:t.scale},l=await this._matchers.feature,c=await this._matchers.aggregate;b(r);const h=this._getLabelInfos(t,e);return await n.analyze(e.getCursor(),this._resourceManagerProxy,l,c,a,o),b(r),this._writeFeatureSet(t,e,a,h,n,s,i)}_writeFeatureSet(t,e,s,r,i,a,n){const o=e.getSize(),l=this._schema.mesh.matcher.symbologyType,c=new z(t.key.id,{features:o,records:o,metrics:0},l,a,l!==A.HEATMAP,n),h={viewingMode:"",scale:t.scale},f=e.getCursor();for(;f.next();)try{const m=f.getDisplayId(),d=r!=null?r.get(m):null;i.writeCursor(c,f,s,h,t.level,d,this._resourceManagerProxy)}catch{}const u=t.tileInfoView.tileInfo.isWrappable;return c.serialize(u)}_handleError(t,e,s){if(!D(e)){const r={tileKey:t.id,error:e.message};return this.remoteClient.invoke("tileRenderer.onTileError",r,{signal:s.signal})}return Promise.resolve()}_getLabelingSchemaForScale(t){const e=this._schema.mesh.labels;if(e==null)return null;if(e.type==="subtype"){const r={type:"subtype",classes:{}};let i=!1;for(const a in e.classes){const n=e.classes[a].filter(o=>T(o,t.scale));i=i||!!n.length,r.classes[a]=n}return i?r:null}const s=e.classes.filter(r=>T(r,t.scale));return s.length?{type:"simple",classes:s}:null}_getLabels(t,e){if(e.type==="subtype"){const s=this.service.subtypeField,r=E(s,"Expected to find subtype Field"),i=t.readAttribute(r);return i==null?[]:e.classes[i]??[]}return e.classes}_getLabelInfos(t,e){const s=this._getLabelingSchemaForScale(t);if(s==null)return null;const r=new Map,i=e.getCursor();for(;i.next();){const a=i.getDisplayId(),n=[],o=L(a),l=o&&i.readAttribute("cluster_count")!==1?"aggregate":"feature",c=this._getLabels(i,s);for(const h of c){if(h.target!==l)continue;const f=i.getStorage(),u=o&&l==="feature"?f.getComputedStringAtIndex(i.readAttribute("referenceId"),h.fieldIndex):f.getComputedStringAtIndex(a,h.fieldIndex);if(!u)continue;const m=P(u.toString()),d=m[0],g=m[1];this._store.getMosaicItem(h.symbol,B(d)).then(p=>{n[h.index]={glyphs:p.glyphMosaicItems??[],rtl:g,index:h.index}})}r.set(a,n)}return r}};S=F([R("esri.views.2d.layers.features.processors.SymbolProcessor")],S);const me=S;export{me as default};