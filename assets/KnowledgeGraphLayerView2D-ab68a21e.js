import{V as i,N as n,z as a,A as s,O as l,C as o}from"./index-b5294fcf.js";import{f as h,d}from"./LayerView-e76b6b17.js";import"./Container-ef090880.js";import"./definitions-305a353a.js";import"./enums-b14466b3.js";import"./Texture-7c6b4bbf.js";let t=class extends h(d){constructor(e){super(e),this.layerViews=new i}set layerViews(e){this._set("layerViews",n(e,this._get("layerViews")))}get updatingProgress(){return this.layerViews.length===0?1:this.layerViews.reduce((e,r)=>e+r.updatingProgress,0)/this.layerViews.length}attach(){this._updateStageChildren(),this.addAttachHandles(this.layerViews.on("after-changes",()=>this._updateStageChildren()))}detach(){this.container.removeAllChildren()}update(e){}moveStart(){}viewChange(){}moveEnd(){}_updateStageChildren(){this.container.removeAllChildren(),this.layerViews.forEach((e,r)=>this.container.addChildAt(e.container,r))}};a([s({cast:l})],t.prototype,"layerViews",null),a([s({readOnly:!0})],t.prototype,"updatingProgress",null),t=a([o("esri.views.2d.layers.KnowledgeGraphLayerView2D")],t);const m=t;export{m as default};