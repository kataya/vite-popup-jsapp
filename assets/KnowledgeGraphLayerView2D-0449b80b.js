import{V as i,N as n,z as a,A as s,O as l,C as o}from"./index-265d95a6.js";import{f as h,d}from"./LayerView-b48bfd41.js";import"./Container-5a0dea1a.js";import"./definitions-0abb8136.js";import"./enums-b14466b3.js";import"./Texture-3f02b4cb.js";let t=class extends h(d){constructor(e){super(e),this.layerViews=new i}set layerViews(e){this._set("layerViews",n(e,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((e,r)=>e+r.updatingProgress,0)/this.layerViews.length}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(e){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((e,r)=>this.container.addChildAt(e.container,r))}};a([s({cast:l})],t.prototype,"layerViews",null),a([s({readOnly:!0})],t.prototype,"updatingProgress",null),t=a([o("esri.views.2d.layers.KnowledgeGraphLayerView2D")],t);const m=t;export{m as default};