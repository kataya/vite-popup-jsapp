import{z as a,A as l,C as V,ba as k,eT as d,eU as w,aN as A,eV as $,eW as y,eX as h,eY as p,ah as g,eZ as z,ag as c,aI as E}from"./index-265d95a6.js";import{c as I}from"./normalizeUtilsSync-3e322612.js";import{e as u}from"./mat3f64-221ce671.js";let n=class extends k{constructor(o){super(o)}get bounds(){const o=this.coords;return o==null||o.extent==null?null:d(o.extent)}get coords(){var t;const o=(t=this.element.georeference)==null?void 0:t.coords;return w(o,this.spatialReference).geometry}get normalizedCoords(){return A.fromJSON(I(this.coords))}get normalizedBounds(){const o=this.normalizedCoords!=null?this.normalizedCoords.extent:null;return o!=null?d(o):null}};a([l()],n.prototype,"spatialReference",void 0),a([l()],n.prototype,"element",void 0),a([l()],n.prototype,"bounds",null),a([l()],n.prototype,"coords",null),a([l()],n.prototype,"normalizedCoords",null),a([l()],n.prototype,"normalizedBounds",null),n=a([V("esri.layers.support.MediaElementView")],n);const r=E(),s=u(),i=u(),m=u();function U(e,o,t){return $(r,o[0],o[1],1),y(r,r,h(s,t)),r[2]===0?p(e,r[0],r[1]):p(e,r[0]/r[2],r[1]/r[2])}function W(e,o,t){return f(i,o[0],o[1],o[2],o[3],o[4],o[5],o[6],o[7]),f(m,t[0],t[1],t[2],t[3],t[4],t[5],t[6],t[7]),g(e,z(i,i),m),e[8]!==0&&(e[0]/=e[8],e[1]/=e[8],e[2]/=e[8],e[3]/=e[8],e[4]/=e[8],e[5]/=e[8],e[6]/=e[8],e[7]/=e[8],e[8]/=e[8]),e}function f(e,o,t,x,C,b,j,v,B){c(e,o,x,b,t,C,j,1,1,1),$(r,v,B,1),z(s,e);const[N,R,S]=y(r,r,h(s,s));return c(s,N,0,0,0,R,0,0,0,S),g(e,s,e)}export{U as h,n as i,W as j};
