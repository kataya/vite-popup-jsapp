import{iR as T,iS as F,iT as K,iU as N,c8 as A,aI as P,bP as Y,ca as g,cd as M,cc as $,iV as f,iF as v,iW as U,bE as B,hD as X,c9 as W,s as k,ig as Z,bQ as R,iX as G,h_ as H,cb as J,bS as tt,iY as x,eV as E,ib as et,id as it}from"./index-265d95a6.js";import{E as st}from"./ByteSizeUnit-d4757d40.js";import{n as rt}from"./mat3f64-221ce671.js";import{n as nt}from"./mat4f64-1413b4a7.js";import{n as ot}from"./quatf64-3363c48e.js";class ct{constructor(e){this._allocator=e,this._items=[],this._itemsPtr=0,this._grow()}get(){return this._itemsPtr===0&&T(()=>this._reset()),this._itemsPtr===this._items.length&&this._grow(),this._items[this._itemsPtr++]}_reset(){const e=Math.min(3*Math.max(8,this._itemsPtr),this._itemsPtr+3*C);this._items.length=Math.min(e,this._items.length),this._itemsPtr=0}_grow(){for(let e=0;e<Math.max(8,Math.min(this._items.length,C));e++)this._items.push(this._allocator())}}const C=1024;let l=class u{constructor(e,i,s){this._itemByteSize=e,this._itemCreate=i,this._buffers=new Array,this._items=new Array,this._itemsPtr=0,this._itemsPerBuffer=Math.ceil(s/this._itemByteSize)}get(){this._itemsPtr===0&&T(()=>this._reset());const e=Math.floor(this._itemsPtr/this._itemsPerBuffer);for(;this._buffers.length<=e;){const i=new ArrayBuffer(this._itemsPerBuffer*this._itemByteSize);for(let s=0;s<this._itemsPerBuffer;++s)this._items.push(this._itemCreate(i,s*this._itemByteSize));this._buffers.push(i)}return this._items[this._itemsPtr++]}_reset(){const e=2*(Math.floor(this._itemsPtr/this._itemsPerBuffer)+1);for(;this._buffers.length>e;)this._buffers.pop(),this._items.length=this._buffers.length*this._itemsPerBuffer;this._itemsPtr=0}static createVec2f64(e=m){return new u(16,F,e)}static createVec3f64(e=m){return new u(24,K,e)}static createVec4f64(e=m){return new u(32,N,e)}static createMat3f64(e=m){return new u(72,rt,e)}static createMat4f64(e=m){return new u(128,nt,e)}static createQuatf64(e=m){return new u(32,ot,e)}get test(){return{size:this._buffers.length*this._itemsPerBuffer*this._itemByteSize}}};const m=4*st.KILOBYTES;l.createVec2f64();const h=l.createVec3f64();l.createVec4f64();l.createMat3f64();const at=l.createMat4f64();l.createQuatf64();var _;(function(t){t[t.X=0]="X",t[t.Y=1]="Y",t[t.Z=2]="Z"})(_||(_={}));function ut(t){return t?O(A(t.origin),A(t.direction)):O(P(),P())}function O(t,e){return{origin:t,direction:e}}function vt(t,e){const i=ht.get();return i.origin=t,i.direction=e,i}function ft(t,e,i){const s=Y(t.direction,g(i,e,t.origin));return M(i,t.origin,$(i,t.direction,s)),i}const ht=new ct(()=>ut());function mt(t,e){const i=Y(t,e)/(f(t)*f(e));return-v(i)}const _t=d();function d(){return U()}function q(t,e=d()){return B(e,t)}function gt(t,e){return X(t[0],t[1],t[2],e)}function lt(t){return t}function pt(t){t[0]=t[1]=t[2]=t[3]=0}function Pt(t,e){return t[0]=t[1]=t[2]=0,t[3]=e,t}function b(t){return t[3]}function $t(t){return t}function dt(t,e,i,s){return X(t,e,i,s)}function Mt(t,e,i){return t!==i&&W(i,t),i[3]=t[3]+e,i}function bt(t,e,i){return k.getLogger("esri.geometry.support.sphere").error("sphere.setExtent is not yet supported"),t===i?i:q(t,i)}function S(t,e,i){if(e==null)return!1;const{origin:s,direction:r}=e,n=St;n[0]=s[0]-t[0],n[1]=s[1]-t[1],n[2]=s[2]-t[2];const o=r[0]*r[0]+r[1]*r[1]+r[2]*r[2];if(o===0)return!1;const c=2*(r[0]*n[0]+r[1]*n[1]+r[2]*n[2]),p=c*c-4*o*(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]-t[3]*t[3]);if(p<0)return!1;const z=Math.sqrt(p);let a=(-c-z)/(2*o);const w=(-c+z)/(2*o);return(a<0||w<a&&w>0)&&(a=w),!(a<0)&&(i&&(i[0]=s[0]+r[0]*a,i[1]=s[1]+r[1]*a,i[2]=s[2]+r[2]*a),!0)}const St=P();function wt(t,e){return S(t,e,null)}function yt(t,e,i){if(S(t,e,i))return i;const s=Q(t,e,h.get());return M(i,e.origin,$(h.get(),e.direction,Z(e.origin,s)/f(e.direction))),i}function Q(t,e,i){const s=h.get(),r=at.get();R(s,e.origin,e.direction);const n=b(t);R(i,s,e.origin),$(i,i,1/f(i)*n);const o=I(t,e.origin),c=mt(e.origin,i);return G(r,c+o,s),H(i,i,r),i}function Bt(t,e,i){return S(t,e,i)?i:(ft(e,t,i),j(t,i,i))}function j(t,e,i){const s=g(h.get(),e,t),r=$(h.get(),s,t[3]/f(s));return M(i,r,t)}function Vt(t,e){const i=g(h.get(),e,t),s=J(i),r=t[3]*t[3];return Math.sqrt(Math.abs(s-r))}function I(t,e){const i=g(h.get(),e,t),s=f(i),r=b(t),n=r+Math.abs(r-s);return v(r/n)}const y=P();function L(t,e,i,s){const r=g(y,e,t);switch(i){case _.X:{const n=x(r,y)[2];return E(s,-Math.sin(n),Math.cos(n),0)}case _.Y:{const n=x(r,y),o=n[1],c=n[2],p=Math.sin(o);return E(s,-p*Math.cos(c),-p*Math.sin(c),Math.cos(o))}case _.Z:return tt(s,r);default:return}}function D(t,e){const i=g(V,e,t);return f(i)-t[3]}function zt(t,e,i,s){const r=D(t,e),n=L(t,e,_.Z,V),o=$(V,n,i-r);return M(s,e,o)}function At(t,e){const i=et(t,e),s=b(t);return i<=s*s}function Rt(t,e,i=d()){const s=Z(t,e),r=t[3],n=e[3];return s+n<r?(B(i,t),i):s+r<n?(B(i,e),i):(it(i,t,e,(s+n-r)/(2*s)),i[3]=(s+r+n)/2,i)}const V=P(),xt=d();Object.freeze(Object.defineProperty({__proto__:null,NullSphere:_t,altitudeAt:D,angleToSilhouette:I,axisAt:L,clear:pt,closestPoint:Bt,closestPointOnSilhouette:Q,containsPoint:At,copy:q,create:d,distanceToSilhouette:Vt,elevate:Mt,fromCenterAndRadius:gt,fromRadius:Pt,fromValues:dt,getCenter:$t,getRadius:b,intersectRay:S,intersectRayClosestSilhouette:yt,intersectsRay:wt,projectPoint:j,setAltitudeAt:zt,setExtent:bt,tmpSphere:xt,union:Rt,wrap:lt},Symbol.toStringTag,{value:"Module"}));export{At as Q,wt as V,d as _,h as c,ut as d,b as k,vt as p,q,ct as s,$t as z};
