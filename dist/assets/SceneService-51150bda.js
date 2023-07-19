import{ad as v,a as y,cJ as U,j as L,au as k,hk as K,s as V,z as c,A as u,cr as q,a8 as _,bb as f,aP as R,hq as M,ct as C,cX as F,C as z,k as J,h1 as D,d as B,ht as Z,hu as G,hv as H,as as N,x as X,c as E}from"./index-b5294fcf.js";import{i as T}from"./originUtils-1469eeaf.js";import{getSiblingOfSameTypeI as Q}from"./resourceUtils-fc7b6978.js";async function W(a,s,e,t,o,r){let i=null;if(e!=null){const n=`${a}/nodepages/`,h=n+Math.floor(e.rootIndex/e.nodesPerPage);try{return{type:"page",rootPage:(await v(h,{query:{f:"json",token:t},responseType:"json",signal:r})).data,rootIndex:e.rootIndex,pageSize:e.nodesPerPage,lodMetric:e.lodSelectionMetricType,urlPrefix:n}}catch(d){o!=null&&o.warn("#fetchIndexInfo()","Failed to load root node page. Falling back to node documents.",h,d),i=d}}if(!s)return null;const l=`${a}/nodes/`,p=l+(s&&s.split("/").pop());try{return{type:"node",rootNode:(await v(p,{query:{f:"json",token:t},responseType:"json",signal:r})).data,urlPrefix:l}}catch(n){throw new y("sceneservice:root-node-missing","Root node missing.",{pageError:i,nodeError:n,url:p})}}let Y=null;function ee(){return Y}async function $(a,s,e){if(!s||!s.resources)return;const t=s.portalItem===a.portalItem?new Set(a.paths):new Set;a.paths.length=0,a.portalItem=s.portalItem;const o=new Set(s.resources.toKeep.map(n=>n.resource.path)),r=new Set,i=[];o.forEach(n=>{t.delete(n),a.paths.push(n)});for(const n of s.resources.toUpdate)if(t.delete(n.resource.path),o.has(n.resource.path)||r.has(n.resource.path)){const{resource:h,content:d,finish:x,error:b}=n,S=Q(h,U());a.paths.push(S.path),i.push(j({resource:S,content:d,compress:n.compress,finish:x,error:b},e))}else a.paths.push(n.resource.path),i.push(te(n,e)),r.add(n.resource.path);for(const n of s.resources.toAdd)i.push(j(n,e)),a.paths.push(n.resource.path);if(t.forEach(n=>{if(s.portalItem){const h=s.portalItem.resourceFromPath(n);i.push(h.portalItem.removeResource(h).catch(()=>{}))}}),i.length===0)return;const l=await L(i);k(e);const p=l.filter(n=>"error"in n).map(n=>n.error);if(p.length>0)throw new y("save:resources","Failed to save one or more resources",{errors:p})}async function j(a,s){var o,r;const e={...s??{},compress:a.compress},t=await K(a.resource.portalItem.addResource(a.resource,a.content,e));if(t.ok!==!0)throw(o=a.error)==null||o.call(a,t.error),t.error;(r=a.finish)==null||r.call(a,a.resource)}async function te(a,s){var t,o;const e=await K(a.resource.update(a.content,s));if(e.ok!==!0)throw(t=a.error)==null||t.call(a,e.error),e.error;(o=a.finish)==null||o.call(a,a.resource)}const P="esri.layers.mixins.SceneService",m=V.getLogger(P),se=a=>{let s=class extends a{constructor(){super(...arguments),this.spatialReference=null,this.fullExtent=null,this.heightModelInfo=null,this.minScale=0,this.maxScale=0,this.version={major:Number.NaN,minor:Number.NaN,versionString:""},this.copyright=null,this.sublayerTitleMode="item-title",this.title=null,this.layerId=null,this.indexInfo=null,this._debouncedSaveOperations=J(async(e,t,o)=>{switch(e){case I.SAVE:return this._save(t);case I.SAVE_AS:return this._saveAs(o,t)}})}readSpatialReference(e,t){return this._readSpatialReference(t)}_readSpatialReference(e){if(e.spatialReference!=null)return _.fromJSON(e.spatialReference);{const t=e.store,o=t.indexCRS||t.geographicCRS,r=o&&parseInt(o.substring(o.lastIndexOf("/")+1,o.length),10);return r!=null?new _(r):null}}readFullExtent(e,t,o){if(e!=null&&typeof e=="object"){const l=e.spatialReference==null?{...e,spatialReference:this._readSpatialReference(t)}:e;return R.fromJSON(l,o)}const r=t.store,i=this._readSpatialReference(t);return i==null||r==null||r.extent==null||!Array.isArray(r.extent)||r.extent.some(l=>l<A)?null:new R({xmin:r.extent[0],ymin:r.extent[1],xmax:r.extent[2],ymax:r.extent[3],spatialReference:i})}parseVersionString(e){const t={major:Number.NaN,minor:Number.NaN,versionString:e},o=e.split(".");return o.length>=2&&(t.major=parseInt(o[0],10),t.minor=parseInt(o[1],10)),t}readVersion(e,t){const o=t.store,r=o.version!=null?o.version.toString():"";return this.parseVersionString(r)}readTitlePortalItem(e){return this.sublayerTitleMode!=="item-title"?void 0:e}readTitleService(e,t){const o=this.portalItem&&this.portalItem.title;if(this.sublayerTitleMode==="item-title")return D(this.url,t.name);let r=t.name;if(!r&&this.url){const i=B(this.url);i!=null&&(r=i.title)}return this.sublayerTitleMode==="item-title-and-service-name"&&o&&(r=o+" - "+r),Z(r)}set url(e){const t=G({layer:this,url:e,nonStandardUrlAllowed:!1,logger:m});this._set("url",t.url),t.layerId!=null&&this._set("layerId",t.layerId)}writeUrl(e,t,o,r){H(this,e,"layers",t,r)}get parsedUrl(){const e=this._get("url"),t=N(e);return this.layerId!=null&&(t.path=`${t.path}/layers/${this.layerId}`),t}async _fetchIndexAndUpdateExtent(e,t){this.indexInfo=W(this.parsedUrl.path,this.rootNode,e,this.apiKey,m,t),this.fullExtent==null||this.fullExtent.hasZ||this._updateExtent(await this.indexInfo)}_updateExtent(e){var t,o,r;if((e==null?void 0:e.type)==="page"){const i=e.rootIndex%e.pageSize,l=(o=(t=e.rootPage)==null?void 0:t.nodes)==null?void 0:o[i];if(l==null||l.obb==null||l.obb.center==null||l.obb.halfSize==null)throw new y("sceneservice:invalid-node-page","Invalid node page.");if(l.obb.center[0]<A||this.fullExtent==null||this.fullExtent.hasZ)return;const p=l.obb.halfSize,n=l.obb.center[2],h=Math.sqrt(p[0]*p[0]+p[1]*p[1]+p[2]*p[2]);this.fullExtent.zmin=n-h,this.fullExtent.zmax=n+h}else if((e==null?void 0:e.type)==="node"){const i=(r=e.rootNode)==null?void 0:r.mbs;if(!Array.isArray(i)||i.length!==4||i[0]<A)return;const l=i[2],p=i[3],{fullExtent:n}=this;n&&(n.zmin=l-p,n.zmax=l+p)}}async _fetchService(e){if(this.url==null)throw new y("sceneservice:url-not-set","Scene service can not be loaded without valid portal item or url");if(this.layerId==null&&/SceneServer\/*$/i.test(this.url)){const t=await this._fetchFirstLayerId(e);t!=null&&(this.layerId=t)}return this._fetchServiceLayer(e)}async _fetchFirstLayerId(e){const t=await v(this.url,{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});if(t.data&&Array.isArray(t.data.layers)&&t.data.layers.length>0)return t.data.layers[0].id}async _fetchServiceLayer(e){var i;const t=await v(((i=this.parsedUrl)==null?void 0:i.path)??"",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e});t.ssl&&(this.url=this.url.replace(/^http:/i,"https:"));let o=!1;if(t.data.layerType&&t.data.layerType==="Voxel"&&(o=!0),o)return this._fetchVoxelServiceLayer();const r=t.data;this.read(r,this._getServiceContext()),this.validateLayer(r)}async _fetchVoxelServiceLayer(e){var o;const t=(await v(((o=this.parsedUrl)==null?void 0:o.path)+"/layer",{query:{f:"json",token:this.apiKey},responseType:"json",signal:e})).data;this.read(t,this._getServiceContext()),this.validateLayer(t)}_getServiceContext(){var e;return{origin:"service",portalItem:this.portalItem,portal:(e=this.portalItem)==null?void 0:e.portal,url:this.parsedUrl}}async _ensureLoadBeforeSave(){await this.load(),"beforeSave"in this&&typeof this.beforeSave=="function"&&await this.beforeSave()}validateLayer(e){}_updateTypeKeywords(e,t,o){e.typeKeywords||(e.typeKeywords=[]);const r=t.getTypeKeywords();for(const i of r)e.typeKeywords.push(i);e.typeKeywords&&(e.typeKeywords=e.typeKeywords.filter((i,l,p)=>p.indexOf(i)===l),o===g.newItem&&(e.typeKeywords=e.typeKeywords.filter(i=>i!=="Hosted Service")))}async _saveAs(e,t){var n;const o={...O,...t};let r=X.from(e);r||(m.error("_saveAs(): requires a portal item parameter"),await Promise.reject(new y("sceneservice:portal-item-required","_saveAs() requires a portal item to save to"))),r.id&&(r=r.clone(),r.id=null);const i=r.portal||E.getDefault();await this._ensureLoadBeforeSave(),r.type=w,r.portal=i;const l={origin:"portal-item",url:null,messages:[],portal:i,portalItem:r,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},p={layers:[this.write({},l)]};return await Promise.all(l.resources.pendingOperations??[]),await this._validateAgainstJSONSchema(p,l,o),r.url=this.url,r.title||(r.title=this.title),this._updateTypeKeywords(r,o,g.newItem),await i.signIn(),await((n=i.user)==null?void 0:n.addItem({item:r,folder:o&&o.folder,data:p})),await $(this.resourceReferences,l,null),this.portalItem=r,T(l),l.portalItem=r,r}async _save(e){const t={...O,...e};if(!this.portalItem)throw m.error("_save(): requires the .portalItem property to be set"),new y("sceneservice:portal-item-not-set","Portal item to save to has not been set on this SceneService");if(this.portalItem.type!==w)throw m.error("_save(): Non-matching portal item type. Got "+this.portalItem.type+", expected "+w),new y("sceneservice:portal-item-wrong-type",`Portal item needs to have type "${w}"`);await this._ensureLoadBeforeSave();const o={origin:"portal-item",url:this.portalItem.itemUrl&&N(this.portalItem.itemUrl),messages:[],portal:this.portalItem.portal||E.getDefault(),portalItem:this.portalItem,writtenProperties:[],blockedRelativeUrls:[],resources:{toAdd:[],toUpdate:[],toKeep:[],pendingOperations:[]}},r={layers:[this.write({},o)]};return await Promise.all(o.resources.pendingOperations??[]),await this._validateAgainstJSONSchema(r,o,t),this.portalItem.url=this.url,this.portalItem.title||(this.portalItem.title=this.title),this._updateTypeKeywords(this.portalItem,t,g.existingItem),await this.portalItem.update({data:r}),await $(this.resourceReferences,o,null),T(o),this.portalItem}async _validateAgainstJSONSchema(e,t,o){var n,h;let r=((n=t.messages)==null?void 0:n.filter(d=>d.type==="error").map(d=>new y(d.name,d.message,d.details)))??[];(h=o==null?void 0:o.validationOptions)!=null&&h.ignoreUnsupported&&(r=r.filter(d=>d.name!=="layer:unsupported"&&d.name!=="symbol:unsupported"&&d.name!=="symbol-layer:unsupported"&&d.name!=="property:unsupported"&&d.name!=="url:unsupported"&&d.name!=="scenemodification:unsupported"));const i=o==null?void 0:o.validationOptions,l=i==null?void 0:i.enabled,p=ee();if(l&&p){const d=(await p()).validate(e,o.portalItemLayerType);if(d.length>0){const x=`Layer item did not validate:
${d.join(`
`)}`;if(m.error(`_validateAgainstJSONSchema(): ${x}`),i.failPolicy==="throw"){const b=d.map(S=>new y("sceneservice:schema-validation",S)).concat(r);throw new y("sceneservice-validate:error","Failed to save layer item due to schema validation, see `details.errors`.",{combined:b})}}}if(r.length>0)throw new y("sceneservice:save","Failed to save SceneService due to unsupported or invalid content. See 'details.errors' for more detailed information",{errors:r})}};return c([u(q)],s.prototype,"id",void 0),c([u({type:_})],s.prototype,"spatialReference",void 0),c([f("spatialReference",["spatialReference","store.indexCRS","store.geographicCRS"])],s.prototype,"readSpatialReference",null),c([u({type:R})],s.prototype,"fullExtent",void 0),c([f("fullExtent",["fullExtent","store.extent","spatialReference","store.indexCRS","store.geographicCRS"])],s.prototype,"readFullExtent",null),c([u({readOnly:!0,type:M})],s.prototype,"heightModelInfo",void 0),c([u({type:Number,json:{name:"layerDefinition.minScale",write:!0,origins:{service:{read:{source:"minScale"},write:!1}}}})],s.prototype,"minScale",void 0),c([u({type:Number,json:{name:"layerDefinition.maxScale",write:!0,origins:{service:{read:{source:"maxScale"},write:!1}}}})],s.prototype,"maxScale",void 0),c([u({readOnly:!0})],s.prototype,"version",void 0),c([f("version",["store.version"])],s.prototype,"readVersion",null),c([u({type:String,json:{read:{source:"copyrightText"}}})],s.prototype,"copyright",void 0),c([u({type:String,json:{read:!1}})],s.prototype,"sublayerTitleMode",void 0),c([u({type:String})],s.prototype,"title",void 0),c([f("portal-item","title")],s.prototype,"readTitlePortalItem",null),c([f("service","title",["name"])],s.prototype,"readTitleService",null),c([u({type:Number,json:{origins:{service:{read:{source:"id"}},"portal-item":{write:{target:"id",isRequired:!0,ignoreOrigin:!0},read:!1}}}})],s.prototype,"layerId",void 0),c([u(C)],s.prototype,"url",null),c([F("url")],s.prototype,"writeUrl",null),c([u()],s.prototype,"parsedUrl",null),c([u({readOnly:!0})],s.prototype,"store",void 0),c([u({type:String,readOnly:!0,json:{read:{source:"store.rootNode"}}})],s.prototype,"rootNode",void 0),s=c([z(P)],s),s},A=-1e38;var g;(function(a){a[a.existingItem=0]="existingItem",a[a.newItem=1]="newItem"})(g||(g={}));const w="Scene Service",O={getTypeKeywords:()=>[],portalItemLayerType:"unknown",validationOptions:{enabled:!0,ignoreUnsupported:!1,failPolicy:"throw"}};var I;(function(a){a[a.SAVE=0]="SAVE",a[a.SAVE_AS=1]="SAVE_AS"})(I||(I={}));export{I as K,se as N,W as r};
