import{s as m,e1 as y,am as h,e2 as v,a as p,e3 as w,e4 as b,b$ as x,e5 as _,e6 as $}from"./index-4b712bf9.js";const d=m.getLogger("esri.layers.support.labelFormatUtils"),g={type:"simple",evaluate:()=>null},E={getAttribute:(a,n)=>a.field(n)};async function A(a,n,r){if(!a||!a.symbol||!n)return g;const s=a.where,l=y(a),i=s?await h(()=>import("./WhereClause-5d457370.js").then(e=>e.W),["./WhereClause-5d457370.js","./index-4b712bf9.js","./index-68e4a9fa.css","./executionError-c92d3b85.js"],import.meta.url):null;let o;if(l.type==="arcade"){const e=await v(l.expression,r,n);if(e==null)return g;o={type:"arcade",evaluate(u){try{const t=e.evaluate({$feature:"attributes"in u?e.repurposeFeature(u):u},e.services);if(t!=null)return t.toString()}catch(t){d.error(new p("arcade-expression-error","Encountered an error when evaluating label expression for feature",{error:t,feature:u,expression:l}))}return null},needsHydrationToEvaluate:()=>$(l.expression)==null}}else o={type:"simple",evaluate:e=>l.expression.replaceAll(/{[^}]*}/g,u=>{const t=u.slice(1,-1),c=n.get(t);if(!c)return u;let f=null;return"attributes"in e?e&&e.attributes&&(f=e.attributes[c.name]):f=e.field(c.name),f==null?"":F(f,c)})};if(s){let e;try{e=i.WhereClause.create(s,n)}catch(t){return d.error(new p("bad-where-clause","Encountered an error when evaluating where clause, ignoring",{where:s,error:t})),g}const u=o.evaluate;o.evaluate=t=>{const c="attributes"in t?void 0:E;try{if(e.testFeature(t,c))return u(t)}catch(f){d.error(new p("bad-where-clause","Encountered an error when evaluating where clause for feature",{where:s,feature:t,error:f}))}return null}}return o}function F(a,n){if(a==null)return"";const r=n.domain;if(r){if(r.type==="codedValue"||r.type==="coded-value"){const l=a;for(const i of r.codedValues)if(i.code===l)return i.name}else if(r.type==="range"){const l=+a,i="range"in r?r.range[0]:r.minValue,o="range"in r?r.range[1]:r.maxValue;if(i<=l&&l<=o)return r.name}}let s=a;return n.type==="date"||n.type==="esriFieldTypeDate"?s=w(s,b("short-date")):x(n)&&(s=_(+s)),s||""}export{A as createLabelFunction,F as formatField};
