import{c0 as m,c1 as p,b$ as g,c2 as y,c3 as w,c4 as f,am as _}from"./index-265d95a6.js";class b{constructor(){this.code=null,this.description=null}}class I{constructor(n){this.error=new b,this.globalId=null,this.objectId=null,this.success=!1,this.uniqueId=null,this.error.description=n}}function d(e){return new I(e)}class v{constructor(n){this.globalId=null,this.success=!0,this.objectId=this.uniqueId=n}}function V(e){return new v(e)}const a=new Set;function $(e,n,i,h=!1,u){a.clear();for(const s in i){const t=e.get(s);if(!t)continue;const l=i[s],r=q(t,l);if(r!==l&&u&&u.push({name:"invalid-value-type",message:"attribute value was converted to match the field type",details:{field:t,originalValue:l,sanitizedValue:r}}),a.add(t.name),t&&(h||t.editable)){const c=m(t,r);if(c)return d(p(c,t,r));n[t.name]=r}}for(const s of(e==null?void 0:e.requiredFields)??[])if(!a.has(s.name))return d(`missing required field "${s.name}"`);return null}function q(e,n){let i=n;return typeof n=="string"&&g(e)?i=parseFloat(n):n!=null&&y(e)&&typeof n!="string"&&(i=String(n)),w(i)}let o;function j(e,n){if(!e||!f(n))return e;if("rings"in e||"paths"in e){if(o==null)throw new TypeError("geometry engine not loaded");return o.simplify(n,e)}return e}async function P(){return o==null&&(o=await _(()=>import("./geometryEngineJSON-7d4b0103.js"),["assets/geometryEngineJSON-7d4b0103.js","assets/geometryEngineBase-4d06fea2.js","assets/index-265d95a6.js","assets/index-68e4a9fa.css","assets/geometryEngineJSON-c1687ade.js","assets/json-48e3ea08.js"])),o}async function F(e,n){!f(e)||n!=="esriGeometryPolygon"&&n!=="esriGeometryPolyline"||await P()}export{V as c,$ as d,j as h,d as u,F as y};