import{d5 as d,d6 as h,ad as p}from"./index-4b712bf9.js";import{t as f}from"./query-b4c1d146.js";import{l}from"./AttachmentInfo-97324305.js";import"./normalizeUtils-c47df0ad.js";import"./normalizeUtilsCommon-1c534942.js";import"./utils-0b5ba673.js";import"./pbfQueryUtils-fca07ead.js";import"./pbf-aa1b8b66.js";import"./OptimizedGeometry-196224d4.js";import"./OptimizedFeature-4701473b.js";import"./OptimizedFeatureSet-1d1ac4b9.js";function y(n){const t=n.toJSON();return t.attachmentTypes&&(t.attachmentTypes=t.attachmentTypes.join(",")),t.keywords&&(t.keywords=t.keywords.join(",")),t.globalIds&&(t.globalIds=t.globalIds.join(",")),t.objectIds&&(t.objectIds=t.objectIds.join(",")),t.size&&(t.size=t.size.join(",")),t}function G(n,t){const o={};for(const a of t){const{parentObjectId:e,parentGlobalId:s,attachmentInfos:c}=a;for(const r of c){const{id:i}=r,u=d(h(`${n.path}/${e}/attachments/${i}`)),m=l.fromJSON(r);m.set({url:u,parentObjectId:e,parentGlobalId:s}),o[e]?o[e].push(m):o[e]=[m]}}return o}function S(n,t,o){let a={query:f({...n.query,f:"json",...y(t)})};return o&&(a={...o,...a,query:{...o.query,...a.query}}),p(n.path+"/queryAttachments",a).then(e=>e.data.attachmentGroups)}async function T(n,t,o){const{objectIds:a}=t,e=[];for(const s of a)e.push(p(n.path+"/"+s+"/attachments",o));return Promise.all(e).then(s=>a.map((c,r)=>({parentObjectId:c,attachmentInfos:s[r].data.attachmentInfos})))}export{S as executeAttachmentQuery,T as fetchAttachments,G as processAttachmentQueryResult};