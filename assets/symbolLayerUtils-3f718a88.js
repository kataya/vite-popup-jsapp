import{bk as v,a as n,ad as y,am as b,bl as c,b4 as p,bm as w,aI as l}from"./index-265d95a6.js";let s=f();function f(){return new v(50)}function T(){s=f()}async function x(r,o){var i,t;if((i=r.resource)!=null&&i.href)return _(r.resource.href).then(e=>[e.width,e.height]);if((t=r.resource)!=null&&t.primitive)return o!=null?[o,o]:[256,256];throw new n("symbol3d:invalid-symbol-layer","symbol layers of type Icon must have either an href or a primitive resource")}function _(r){return y(r,{responseType:"image"}).then(o=>o.data)}async function B(r,o=null){var t;if(!r.isPrimitive){const e=r.resource.href;if(!e)throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const a=s.get(e);if(a!==void 0)return a;const{fetch:h}=await b(()=>import("./objectResourceUtils-957e2db5.js").then(d=>d.o),["assets/objectResourceUtils-957e2db5.js","assets/index-265d95a6.js","assets/index-68e4a9fa.css","assets/mat3f64-221ce671.js","assets/mat4f64-1413b4a7.js","assets/BufferView-0af6c2cb.js","assets/vec32-e7e0b010.js","assets/DefaultMaterial_COLOR_GAMMA-31b951a6.js","assets/enums-b14466b3.js","assets/quat-35c60454.js","assets/quatf64-3363c48e.js","assets/resourceUtils-1d112ccb.js","assets/basicInterfaces-4ab7cc6a.js","assets/Indices-c715a60a.js","assets/byteSizeEstimations-7cf1c05d.js","assets/NestedMap-1b5db22e.js","assets/requestImageUtils-a29e243d.js","assets/sphere-486ecf96.js","assets/ByteSizeUnit-d4757d40.js","assets/lineSegment-81740760.js","assets/VertexAttribute-9f2e53ec.js","assets/Texture-3f02b4cb.js","assets/InterleavedLayout-d48ac9ec.js","assets/types-1305598a.js","assets/OrderIndependentTransparency-309a1bc3.js","assets/vec3f32-ad1dc57f.js","assets/doublePrecisionUtils-e3c3d0d8.js","assets/symbolColorUtils-1c486fa9.js","assets/VertexElementDescriptor-2925c6af.js","assets/VertexArrayObject-9851830e.js"]),m=await h(e,{disableTextures:!0}),u=c(m.referenceBoundingBox,l());return s.put(e,u),u}if(!((t=r.resource)!=null&&t.primitive))throw new n("symbol:invalid-resource","The symbol does not have a valid resource");const i=p(w(r.resource.primitive));if(o!=null)for(let e=0;e<i.length;e++)i[e]*=o;return c(i,l())}export{T as clearBoundingBoxCache,x as computeIconLayerResourceSize,B as computeObjectLayerResourceSize};
