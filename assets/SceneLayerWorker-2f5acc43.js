import{am as v,eE as K,a8 as D}from"./index-4b712bf9.js";import{p as Q,m as W,y as X}from"./MeshLocalVertexSpace-316e584e.js";import{m as Z}from"./MeshGeoreferencedRelativeVertexSpace-a33e55c1.js";import{n as ee,s as te}from"./vec32-6afcaf83.js";import"./sphere-ae209b09.js";import"./ByteSizeUnit-d4757d40.js";import"./mat3f64-221ce671.js";import"./mat4f64-1413b4a7.js";import"./quatf64-3363c48e.js";var R,$;(function(e){e[e.None=0]="None",e[e.Int16=1]="Int16",e[e.Int32=2]="Int32"})(R||(R={})),function(e){e[e.Replace=0]="Replace",e[e.Outside=1]="Outside",e[e.Inside=2]="Inside",e[e.Finished=3]="Finished"}($||($={}));function ne(){return T||(T=new Promise(e=>v(()=>import("./i3s-1cdb584f.js"),["./i3s-1cdb584f.js","./index-4b712bf9.js","./index-68e4a9fa.css"],import.meta.url).then(t=>t.i).then(({default:t})=>{const o=t({locateFile:oe,onRuntimeInitialized:()=>e(o)});delete o.then})).catch(e=>{throw e})),T}function oe(e){return K(`esri/libs/i3s/${e}`)}let T;var B,_,j,k,H;(function(e){e[e.Unmodified=0]="Unmodified",e[e.Culled=1]="Culled",e[e.NotChecked=2]="NotChecked"})(B||(B={})),function(e){e[e.Unmodified=0]="Unmodified",e[e.PotentiallyModified=1]="PotentiallyModified",e[e.Culled=2]="Culled",e[e.Unknown=3]="Unknown",e[e.NotChecked=4]="NotChecked"}(_||(_={}));(function(e){e[e.Unknown=0]="Unknown",e[e.Uncached=1]="Uncached",e[e.Cached=2]="Cached"})(j||(j={})),function(e){e[e.None=0]="None",e[e.MaxScreenThreshold=1]="MaxScreenThreshold",e[e.ScreenSpaceRelative=2]="ScreenSpaceRelative",e[e.RemovedFeatureDiameter=3]="RemovedFeatureDiameter",e[e.DistanceRangeFromDefaultCamera=4]="DistanceRangeFromDefaultCamera"}(k||(k={})),function(e){e[e.Hole=0]="Hole",e[e.Leaf=1]="Leaf"}(H||(H={}));async function he(e){await A();const t=[e.geometryBuffer];return{result:Y(e,t),transferList:t}}async function pe(e){var f;await A();const t=[e.geometryBuffer],{geometryBuffer:o}=e,a=o.byteLength,s=r._malloc(a),u=new Uint8Array(r.HEAPU8.buffer,s,a);u.set(new Uint8Array(o));const i=r.dracoDecompressPointCloudData(s,u.byteLength);if(r._free(s),i.error.length>0)throw new Error(`i3s.wasm: ${i.error}`);const d=((f=i.featureIds)==null?void 0:f.length)>0?i.featureIds.slice():null,m=i.positions.slice();return d&&t.push(d.buffer),t.push(m.buffer),{result:{positions:m,featureIds:d},transferList:t}}async function be(e){await A(),ie(e);const t={buffer:e.buffer};return{result:t,transferList:[t.buffer]}}async function ge(e){await A(),re(e)}async function Ee(e){await A(),r.setLegacySchema(e.context,e.jsonSchema)}async function _e(e){const{localMatrix:t,origin:o,positions:a,vertexSpace:s,local:u}=e,i=D.fromJSON(e.inSpatialReference),d=D.fromJSON(e.outSpatialReference),m={georeferenced:Q,georeferencedRelative:Z,local:W}[s.type].fromJSON(s);let f;if(m.type==="georeferenced"){const{projectBuffer:l,initializeProjection:g}=await v(()=>import("./index-4b712bf9.js").then(c=>c.mM),["./index-4b712bf9.js","./index-68e4a9fa.css"],import.meta.url);await g(i,d),f=new Float64Array(a.length),l(a,i,0,f,d,0,f.length/3)}else{const{project:l}=await v(()=>import("./georeference-2fa52659.js").then(g=>g.c),["./georeference-2fa52659.js","./index-4b712bf9.js","./index-68e4a9fa.css","./mat3f64-221ce671.js","./mat4f64-1413b4a7.js","./spatialReferenceEllipsoidUtils-ba988948.js","./MeshLocalVertexSpace-316e584e.js","./MeshGeoreferencedRelativeVertexSpace-a33e55c1.js","./quat-fad84a56.js","./quatf64-3363c48e.js","./vec32-6afcaf83.js","./BufferView-37980e06.js"],import.meta.url);f=X(l({positions:a,transform:t?{localMatrix:t}:void 0,vertexSpace:m,inSpatialReference:i,outSpatialReference:d,local:u}))}const S=f.length,[P,w,L]=o;for(let l=0;l<S;l+=3)f[l]-=P,f[l+1]-=w,f[l+2]-=L;return{result:{projected:f,original:a},transferList:[f.buffer,a.buffer]}}async function we({normalMatrix:e,normals:t}){const o=new Float32Array(t.length);return ee(o,t,e),te(o,o),{result:{transformed:o,original:t},transferList:[o.buffer,t.buffer]}}function Ae(e){V(e)}let I,r;function re(e){const t=e.modifications,o=r._malloc(8*t.length),a=new Float64Array(r.HEAPU8.buffer,o,t.length);for(let s=0;s<t.length;++s)a[s]=t[s];r.setModifications(e.context,o,t.length,e.isGeodetic),r._free(o)}function Y(e,t){if(!r)return null;const{context:o,localOrigin:a,globalTrafo:s,mbs:u,obb:i,elevationOffset:d,geometryBuffer:m,geometryDescriptor:f,indexToVertexProjector:S,vertexToRenderProjector:P}=e,w=r._malloc(m.byteLength),L=33,l=r._malloc(L*Float64Array.BYTES_PER_ELEMENT),g=new Uint8Array(r.HEAPU8.buffer,w,m.byteLength);g.set(new Uint8Array(m));const c=new Float64Array(r.HEAPU8.buffer,l,L);E(c,a);let y=c.byteOffset+3*c.BYTES_PER_ELEMENT,h=new Float64Array(c.buffer,y);E(h,s),y+=16*c.BYTES_PER_ELEMENT,h=new Float64Array(c.buffer,y),E(h,u),y+=4*c.BYTES_PER_ELEMENT,i!=null&&(h=new Float64Array(c.buffer,y),E(h,i.center),y+=3*c.BYTES_PER_ELEMENT,h=new Float64Array(c.buffer,y),E(h,i.halfSize),y+=3*c.BYTES_PER_ELEMENT,h=new Float64Array(c.buffer,y),E(h,i.quaternion));const F=f,z={isDraco:!1,isLegacy:!1,color:e.layouts.some(p=>p.some(b=>b.name==="color")),normal:e.needNormals&&e.layouts.some(p=>p.some(b=>b.name==="normalCompressed")),uv0:e.layouts.some(p=>p.some(b=>b.name==="uv0")),uvRegion:e.layouts.some(p=>p.some(b=>b.name==="uvRegion")),featureIndex:F.featureIndex},n=r.process(o,!!e.obb,w,g.byteLength,F,z,l,d,S,P,e.normalReferenceFrame);if(r._free(l),r._free(w),n.error.length>0)throw new Error(`i3s.wasm: ${n.error}`);if(n.discarded)return null;const U=n.componentOffsets.length>0?n.componentOffsets.slice():null,M=n.featureIds.length>0?n.featureIds.slice():null,J=n.anchorIds.length>0?Array.from(n.anchorIds):null,G=n.anchors.length>0?Array.from(n.anchors):null,O=n.interleavedVertedData.slice().buffer,x=n.indicesType===R.Int16?new Uint16Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/2).slice():new Uint32Array(n.indices.buffer,n.indices.byteOffset,n.indices.byteLength/4).slice(),N=n.positions.slice(),C=n.positionIndicesType===R.Int16?new Uint16Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/2).slice():new Uint32Array(n.positionIndices.buffer,n.positionIndices.byteOffset,n.positionIndices.byteLength/4).slice(),q={layout:e.layouts[0],interleavedVertexData:O,indices:x,hasColors:n.hasColors,hasModifications:n.hasModifications,positionData:{data:N,indices:C}};return M&&t.push(M.buffer),U&&t.push(U.buffer),t.push(O),t.push(x.buffer),t.push(N.buffer),t.push(C.buffer),{componentOffsets:U,featureIds:M,anchorIds:J,anchors:G,transformedGeometry:q,obb:n.obb}}function Le(e){return e===0?_.Unmodified:e===1?_.PotentiallyModified:e===2?_.Culled:_.Unknown}function ie(e){const{context:t,buffer:o}=e,a=r._malloc(o.byteLength),s=o.byteLength/Float64Array.BYTES_PER_ELEMENT,u=new Float64Array(r.HEAPU8.buffer,a,s),i=new Float64Array(o);u.set(i),r.filterOBBs(t,a,s),i.set(u),r._free(a)}function V(e){r&&(r.destroy(e),r=null)}function E(e,t){for(let o=0;o<t.length;++o)e[o]=t[o]}function A(){return r?Promise.resolve():(I||(I=ne().then(e=>{r=e,I=null})),I)}const Ie={transform:Y,destroy:V};export{Ae as destroyContext,pe as dracoDecompressPointCloudData,be as filterObbsForModifications,ie as filterObbsForModificationsSync,A as initialize,Le as interpretObbModificationResults,he as process,_e as project,Ee as setLegacySchema,ge as setModifications,re as setModificationsSync,Ie as test,we as transformNormals};
