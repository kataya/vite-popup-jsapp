import{s as y,L as d,hF as L,hG as P,hH as z,hI as H,eq as B,hJ as I}from"./index-b5294fcf.js";import{u as D,E as v,a as R,T as g,b as O,R as G,o as V}from"./Texture-7c6b4bbf.js";import{A as a,F as S,V as E,C as A,X as u,B as f,G as C,U as X,t as w,n as x,M as T}from"./enums-b14466b3.js";const _=y.getLogger("esri.views.webgl.BufferObject");let W=class m{static createIndex(t,e,i){return new m(t,a.ELEMENT_ARRAY_BUFFER,e,i)}static createVertex(t,e,i){return new m(t,a.ARRAY_BUFFER,e,i)}static createUniform(t,e,i){if(t.type!==d.WEBGL2)throw new Error("Uniform buffers are supported in WebGL2 only!");return new m(t,a.UNIFORM_BUFFER,e,i)}static createPixelPack(t,e=S.STREAM_READ,i){if(t.type!==d.WEBGL2)throw new Error("Pixel pack buffers are supported in WebGL2 only!");const r=new m(t,a.PIXEL_PACK_BUFFER,e);return i&&r.setSize(i),r}static createPixelUnpack(t,e=S.STREAM_DRAW,i){if(t.type!==d.WEBGL2)throw new Error("Pixel unpack buffers are supported in WebGL2 only!");return new m(t,a.PIXEL_UNPACK_BUFFER,e,i)}constructor(t,e,i,r){this._context=t,this.bufferType=e,this.usage=i,this._glName=null,this._size=-1,this._indexType=void 0,t.instanceCounter.increment(E.BufferObject,this),this._glName=this._context.gl.createBuffer(),D(this._context.gl),r&&this.setData(r)}get glName(){return this._glName}get size(){return this._size}get indexType(){return this._indexType}get byteLength(){return this.bufferType===a.ELEMENT_ARRAY_BUFFER?this._indexType===A.UNSIGNED_INT?4*this._size:2*this._size:this._size}get _isVAOAware(){return this.bufferType===a.ELEMENT_ARRAY_BUFFER||this.bufferType===a.ARRAY_BUFFER}dispose(){var t;(t=this._context)!=null&&t.gl?(this._glName&&(this._context.gl.deleteBuffer(this._glName),this._glName=null),this._context.instanceCounter.decrement(E.BufferObject,this),this._context=L(this._context)):this._glName&&_.warn("Leaked WebGL buffer object")}setSize(t,e=null){if(t<=0&&_.error("Buffer size needs to be positive!"),this.bufferType===a.ELEMENT_ARRAY_BUFFER&&e!=null)switch(this._indexType=e,e){case A.UNSIGNED_SHORT:t*=2;break;case A.UNSIGNED_INT:t*=4}this._setBufferData(t)}setData(t){if(!t)return;let e=t.byteLength;this.bufferType===a.ELEMENT_ARRAY_BUFFER&&(P(t)&&(e/=2,this._indexType=A.UNSIGNED_SHORT),z(t)&&(e/=4,this._indexType=A.UNSIGNED_INT)),this._setBufferData(e,t)}_setBufferData(t,e=null){this._size=t;const i=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const r=this._context.gl;e!=null?r.bufferData(this.bufferType,e,this.usage):r.bufferData(this.bufferType,t,this.usage),D(r),this._isVAOAware&&this._context.bindVAO(i)}setSubData(t,e,i,r){if(!t)return;(e<0||e*t.BYTES_PER_ELEMENT>=this.byteLength)&&_.error("offset is out of range!"),i>=r&&_.error("end must be bigger than start!"),(e+(r-i))*t.BYTES_PER_ELEMENT>this.byteLength&&_.error("An attempt to write beyond the end of the buffer!");const n=this._context.getBoundVAO();this._isVAOAware&&this._context.bindVAO(null),this._context.bindBuffer(this);const h=this._context.gl;if(this._context.type===d.WEBGL2)h.bufferSubData(this.bufferType,e*t.BYTES_PER_ELEMENT,t,i,r-i);else{const o=i===0&&r===t.length?t:t.subarray(i,r);h.bufferSubData(this.bufferType,e*t.BYTES_PER_ELEMENT,o)}D(h),this._isVAOAware&&this._context.bindVAO(n)}getSubData(t,e=0,i,r){if(this._context.type!==d.WEBGL2)return void _.error("Get buffer subdata is supported in WebGL2 only!");if(i<0||r<0)return void _.error("Problem getting subdata: offset and length were less than zero!");const n=j(t)?t.BYTES_PER_ELEMENT:1;if(n*((i??0)+(r??0))>t.byteLength)return void _.error("Problem getting subdata: offset and length exceeded destination size!");e+n*(r??0)>this.byteLength&&_.warn("Potential problem getting subdata: requested data exceeds buffer size!");const h=this._context.gl;this._context.bindBuffer(this,a.COPY_READ_BUFFER),h.getBufferSubData(a.COPY_READ_BUFFER,e,t,i,r),this._context.unbindBuffer(a.COPY_READ_BUFFER)}async getSubDataAsync(t,e=0,i,r){this._context.type===d.WEBGL2?(await this._context.clientWaitAsync(),this.getSubData(t,e,i,r)):_.error("Get buffer subdata is supported in WebGL2 only!")}};function j(s){return H(s)}class tt{constructor(t,e,i=e){this.internalFormat=t,this.width=e,this.height=i,this.multisampled=!1,this.samples=1}}function $(s){return s.width<=0||s.height<=0||s.internalFormat==null?0:s.width*s.height*v(s.internalFormat)}class Y{constructor(t,e){this._context=t,this._descriptor=e,this.type=R.RenderBuffer,this._context.instanceCounter.increment(E.Renderbuffer,this);const i=this._context.gl;this.glName=i.createRenderbuffer(),this._context.bindRenderbuffer(this);const{width:r,height:n,internalFormat:h,multisampled:o}=e;if(o){if(this._context.type!==d.WEBGL2)throw new Error("Multisampled renderbuffers are not supported in WebGL1!");i.renderbufferStorageMultisample(i.RENDERBUFFER,this.samples,h,r,n)}else i.renderbufferStorage(i.RENDERBUFFER,h,r,n)}get descriptor(){return this._descriptor}get samples(){const t=this._descriptor.samples,e=this._context.parameters.maxSamples;return t?Math.min(t,e):e}get gpuMemoryUsage(){return $(this._descriptor)}resize(t,e){const i=this._descriptor;if(i.width===t&&i.height===e)return;i.width=t,i.height=e;const r=this._context.gl;this._context.bindRenderbuffer(this),i.multisampled?r.renderbufferStorageMultisample(r.RENDERBUFFER,this.samples,i.internalFormat,i.width,i.height):r.renderbufferStorage(r.RENDERBUFFER,i.internalFormat,i.width,i.height)}dispose(){this._context&&(this._context.gl.deleteRenderbuffer(this.glName),this._context.instanceCounter.decrement(E.Renderbuffer,this),this._context=L(this._context))}}const k=y.getLogger("esri.views.webgl.FramebufferObject");class b{constructor(t,e,i=null){this._context=t,this._glName=null,this._colorAttachments=new Map,this._depthBuffer=null,this._stencilBuffer=null,this._depthStencilTexture=null,this._initialized=!1,t.instanceCounter.increment(E.FramebufferObject,this);const r=F(e)?e:new g(this._context,e);if(this._colorAttachments.set(u.COLOR_ATTACHMENT0,r),this._validateTextureDescriptor(r.descriptor),this._validateColorAttachmentPoint(u.COLOR_ATTACHMENT0),i!=null)if(K(i))this._context.capabilities.depthTexture||console.error("Setting the depth/stencil texture as an attachment requires WEBGL_depth_texture or WebGL2"),this._depthStencilTexture=F(i)?i:new g(this._context,i),this._validateTextureDescriptor(this._depthStencilTexture.descriptor);else{const n=q(i)?i:new Y(this._context,i),h=n.descriptor;h.internalFormat===f.STENCIL_INDEX8?this._stencilBuffer=n:this._depthBuffer=n,this._validateRenderBufferDescriptor(h)}}dispose(){var e,i;if(this._colorAttachments.size===0&&!this._glName)return;const t=this._context.getBoundFramebufferObject();this._colorAttachments.forEach((r,n)=>{var h;return(h=this.detachColorTexture(n))==null?void 0:h.dispose()}),(e=this.detachDepthStencilBuffer())==null||e.dispose(),(i=this.detachDepthStencilTexture())==null||i.dispose(),this._glName&&(this._context.gl.deleteFramebuffer(this._glName),this._glName=null),this._context.bindFramebuffer(t),this._context.instanceCounter.decrement(E.FramebufferObject,this)}get glName(){return this._glName}get colorTexture(){return this._colorAttachments.get(u.COLOR_ATTACHMENT0)}get depthStencilAttachment(){return this._depthStencilTexture||this._depthBuffer||this._stencilBuffer}get depthStencilTexture(){return this._depthStencilTexture}get width(){var e;const t=this._colorAttachments.get(u.COLOR_ATTACHMENT0);return((e=t==null?void 0:t.descriptor)==null?void 0:e.width)??0}get height(){var e;const t=this._colorAttachments.get(u.COLOR_ATTACHMENT0);return((e=t==null?void 0:t.descriptor)==null?void 0:e.height)??0}get gpuMemoryUsage(){var t;return[...this._colorAttachments].reduce((e,[i,r])=>e+r.gpuMemoryUsage,((t=this.depthStencilAttachment)==null?void 0:t.gpuMemoryUsage)??0)}getColorTexture(t){const e=this._colorAttachments.get(t);return e&&F(e)?e:null}attachColorTexture(t,e=u.COLOR_ATTACHMENT0){var r;if(!t)return;this._validateColorAttachmentPoint(e);const i=t.descriptor;this._validateTextureDescriptor(i),(r=this.detachColorTexture(e))==null||r.dispose(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,e)),this._colorAttachments.set(e,t)}detachColorTexture(t=u.COLOR_ATTACHMENT0){const e=this._colorAttachments.get(t);if(e)return this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t)),this._colorAttachments.delete(t),e}setColorTextureTarget(t,e=u.COLOR_ATTACHMENT0){const i=this._colorAttachments.get(e);i&&this._framebufferTexture2D(i.glName,e,t)}attachDepthStencil(t){if(t)switch(t.type){case R.Texture:return this._attachDepthStencilTexture(t);case R.RenderBuffer:return this._attachDepthStencilBuffer(t)}}_attachDepthStencilTexture(t){var i;if(t==null)return;const e=t.descriptor;e.pixelFormat!==C.DEPTH_STENCIL&&e.pixelFormat!==C.DEPTH24_STENCIL8&&console.error("Depth/Stencil texture must have a pixel type of DEPTH_STENCIL!"),e.dataType!==X.UNSIGNED_INT_24_8&&console.error("Depth/Stencil texture must have data type of UNSIGNED_INT_24_8!"),this._context.capabilities.depthTexture||console.error("Extension WEBGL_depth_texture isn't supported therefore it is no possible to set the depth/stencil texture!"),this._validateTextureDescriptor(e),this._disposeDepthStencilAttachments(),this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(t.glName,w)),(i=this._depthStencilTexture)==null||i.dispose(),this._depthStencilTexture=t}detachDepthStencilTexture(){const t=this._depthStencilTexture;return t&&this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,w)),this._depthStencilTexture=null,t}_attachDepthStencilBuffer(t){var i;if(t==null)return;const e=t.descriptor;if(e.internalFormat!==f.DEPTH_STENCIL&&e.internalFormat!==f.DEPTH_COMPONENT16&&console.error("Depth/Stencil buffer must have correct internalFormat"),this._validateRenderBufferDescriptor(e),this._disposeDepthStencilAttachments(),this._initialized){this._context.bindFramebuffer(this);const r=this._context.gl,n=this._getGLAttachmentPoint(e);r.framebufferRenderbuffer(x.FRAMEBUFFER,n,r.RENDERBUFFER,t.glName)}(i=this._depthBuffer)==null||i.dispose(),this._depthBuffer=t}detachDepthStencilBuffer(){const t=this._depthBuffer;if(t&&this._initialized){this._context.bindFramebuffer(this);const e=this._context.gl,i=this._getGLAttachmentPoint(t.descriptor);e.framebufferRenderbuffer(x.FRAMEBUFFER,i,e.RENDERBUFFER,null),t.dispose()}return this._depthBuffer=null,t}copyToTexture(t,e,i,r,n,h,o){(t<0||e<0||n<0||h<0)&&console.error("Offsets cannot be negative!"),(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!");const c=o.descriptor;o.descriptor.target!==T.TEXTURE_2D&&console.error("Texture target must be TEXTURE_2D!"),((c==null?void 0:c.width)==null||(c==null?void 0:c.height)==null||t+i>this.width||e+r>this.height||n+i>c.width||h+r>c.height)&&console.error("Bad dimensions, the current input values will attempt to read or copy out of bounds!");const l=this._context,U=l.bindTexture(o,g.TEXTURE_UNIT_FOR_UPDATES);l.setActiveTexture(g.TEXTURE_UNIT_FOR_UPDATES),l.bindFramebuffer(this),l.gl.copyTexSubImage2D(T.TEXTURE_2D,0,n,h,t,e,i,r),l.bindTexture(U,g.TEXTURE_UNIT_FOR_UPDATES)}readPixels(t,e,i,r,n,h,o){(i<=0||r<=0)&&console.error("Copy width and height must be greater than zero!"),o||console.error("Target memory is not initialized!"),this._context.bindFramebuffer(this),this._context.gl.readPixels(t,e,i,r,n,h,o)}async readPixelsAsync(t,e,i,r,n,h,o){if(this._context.type!==d.WEBGL2)return O()&&console.warn("Attempting to read pixels using pixel buffer object without WebGL2"),void this.readPixels(t,e,i,r,n,h,o);const c=this._context.gl,l=W.createPixelPack(this._context,S.STREAM_READ,o.byteLength);this._context.bindBuffer(l),this._context.bindFramebuffer(this),c.readPixels(t,e,i,r,n,h,0),this._context.unbindBuffer(a.PIXEL_PACK_BUFFER),await l.getSubDataAsync(o),l.dispose()}resize(t,e){var r,n,h;if(this.width===t&&this.height===e)return;const i={width:t,height:e};N(i,this._context.parameters.maxTextureSize),this._colorAttachments.forEach(o=>o.resize(i.width,i.height)),(r=this._depthStencilTexture)==null||r.resize(i.width,i.height),this._initialized&&(N(i,this._context.parameters.maxRenderbufferSize),(n=this._depthBuffer)==null||n.resize(i.width,i.height),(h=this._stencilBuffer)==null||h.resize(i.width,i.height),this._context.getBoundFramebufferObject()===this&&this._context.bindFramebuffer(null),this._initialized=!1)}initializeAndBind(t=x.FRAMEBUFFER){const e=this._context.gl;if(this._initialized)return void e.bindFramebuffer(t,this.glName);this._glName&&e.deleteFramebuffer(this._glName);const i=e.createFramebuffer();e.bindFramebuffer(t,i),this._colorAttachments.forEach((n,h)=>this._framebufferTexture2D(n.glName,h,M(n),t));const r=this._depthBuffer||this._stencilBuffer;if(r){const n=this._getGLAttachmentPoint(r.descriptor);e.framebufferRenderbuffer(t,n,e.RENDERBUFFER,r.glName)}else this._depthStencilTexture&&this._framebufferTexture2D(this._depthStencilTexture.glName,e.DEPTH_STENCIL_ATTACHMENT,M(this._depthStencilTexture),t);O()&&e.checkFramebufferStatus(t)!==e.FRAMEBUFFER_COMPLETE&&console.error("Framebuffer is incomplete!"),this._glName=i,this._initialized=!0}_framebufferTexture2D(t,e=u.COLOR_ATTACHMENT0,i=T.TEXTURE_2D,r=x.FRAMEBUFFER,n=0){this._context.gl.framebufferTexture2D(r,e,i,t,n)}_disposeDepthStencilAttachments(){const t=this._context.gl;if(this._depthBuffer){if(this._initialized){this._context.bindFramebuffer(this);const e=this._getGLAttachmentPoint(this._depthBuffer.descriptor);t.framebufferRenderbuffer(x.FRAMEBUFFER,e,t.RENDERBUFFER,null)}this._depthBuffer=B(this._depthBuffer)}this._stencilBuffer&&(this._initialized&&(this._context.bindFramebuffer(this),t.framebufferRenderbuffer(x.FRAMEBUFFER,t.STENCIL_ATTACHMENT,t.RENDERBUFFER,null)),this._stencilBuffer=B(this._stencilBuffer)),this._depthStencilTexture&&(this._initialized&&(this._context.bindFramebuffer(this),this._framebufferTexture2D(null,t.DEPTH_STENCIL_ATTACHMENT)),this._depthStencilTexture=B(this._depthStencilTexture))}_validateTextureDescriptor(t){t.target!==T.TEXTURE_2D&&t.target!==T.TEXTURE_CUBE_MAP&&console.error("Texture type must be TEXTURE_2D or TEXTURE_CUBE_MAP!"),N(t,this._context.parameters.maxTextureSize),this._validateBufferDimensions(t)}_validateRenderBufferDescriptor(t){N(t,this._context.parameters.maxRenderbufferSize),this._validateBufferDimensions(t)}_validateBufferDimensions(t){t.width<=0&&(t.width=this.width),t.height<=0&&(t.height=this.height),this.width>0&&this.height>0&&(this.width===t.width&&this.height===t.height||console.error("Attachment size must match framebuffer size!"))}_getGLAttachmentPoint(t){switch(t.internalFormat){case f.DEPTH_COMPONENT16:case f.DEPTH_COMPONENT24:case f.DEPTH_COMPONENT32F:return this._context.gl.DEPTH_ATTACHMENT;case f.DEPTH24_STENCIL8:case f.DEPTH32F_STENCIL8:case f.DEPTH_STENCIL:return this._context.gl.DEPTH_STENCIL_ATTACHMENT;case f.STENCIL_INDEX8:return this._context.gl.STENCIL_ATTACHMENT}}_validateColorAttachmentPoint(t){if(b._MAX_COLOR_ATTACHMENTS===-1){const i=this._context.capabilities.drawBuffers;if(i){const r=this._context.gl;b._MAX_COLOR_ATTACHMENTS=r.getParameter(i.MAX_COLOR_ATTACHMENTS)}else b._MAX_COLOR_ATTACHMENTS=1}const e=t-u.COLOR_ATTACHMENT0;e+1>b._MAX_COLOR_ATTACHMENTS&&y.getLogger("esri.views.webgl.FrameBufferObject").error("esri.FrameBufferObject",`illegal attachment point for color attachment: ${e+1}. Implementation supports up to ${b._MAX_COLOR_ATTACHMENTS} color attachments`)}}function F(s){return s!=null&&"type"in s&&s.type===R.Texture}function q(s){return s!=null&&"type"in s&&s.type===R.RenderBuffer}function K(s){return F(s)||s!=null&&"pixelFormat"in s}function N(s,t){const e=Math.max(s.width,s.height);if(e>t){k.warn(`Resizing FBO attachment size ${s.width}x${s.height} to device limit ${t}`);const i=t/e;return s.width=Math.round(s.width*i),s.height=Math.round(s.height*i),!1}return!0}function M(s){return s.descriptor.target===T.TEXTURE_CUBE_MAP?T.TEXTURE_CUBE_MAP_POSITIVE_X:T.TEXTURE_2D}b._MAX_COLOR_ATTACHMENTS=-1;const p=y.getLogger("esri.views.webgl.VertexArrayObject");let et=class{constructor(s,t,e,i,r=null){this._context=s,this._locations=t,this._layout=e,this._buffers=i,this._indexBuffer=r,this._glName=null,this._initialized=!1,s.instanceCounter.increment(E.VertexArrayObject,this)}get glName(){return this._glName}get context(){return this._context}get vertexBuffers(){return this._buffers}get indexBuffer(){return this._indexBuffer}get byteSize(){return Object.keys(this._buffers).reduce((s,t)=>s+this._buffers[t].byteLength,this._indexBuffer!=null?this._indexBuffer.byteLength:0)}get layout(){return this._layout}get locations(){return this._locations}get memoryEstimate(){return this.byteSize+(Object.keys(this._buffers).length+(this._indexBuffer?1:0))*I}dispose(){var s;if(this._context){this._context.getBoundVAO()===this&&this._context.bindVAO(null);for(const t in this._buffers)(s=this._buffers[t])==null||s.dispose(),delete this._buffers[t];this._indexBuffer=B(this._indexBuffer),this.disposeVAOOnly()}else(this._glName||Object.getOwnPropertyNames(this._buffers).length>0)&&p.warn("Leaked WebGL VAO")}disposeVAOOnly(){var s,t;this._glName&&(((t=(s=this._context)==null?void 0:s.capabilities)==null?void 0:t.vao).deleteVertexArray(this._glName),this._glName=null),this._context.instanceCounter.decrement(E.VertexArrayObject,this),this._context=L(this._context)}initialize(){if(this._initialized)return;const s=this._context.capabilities.vao;if(s){const t=s.createVertexArray();s.bindVertexArray(t),this._bindLayout(),s.bindVertexArray(null),this._glName=t}this._initialized=!0}bind(){this.initialize();const s=this._context.capabilities.vao;s?s.bindVertexArray(this.glName):(this._context.bindVAO(null),this._bindLayout())}_bindLayout(){const{_buffers:s,_layout:t,_indexBuffer:e}=this;s||p.error("Vertex buffer dictionary is empty!");const i=this._context.gl;for(const r in s){const n=s[r];n||p.error("Vertex buffer is uninitialized!");const h=t[r];h||p.error("Vertex element descriptor is empty!"),G(this._context,this._locations,n,h)}e!=null&&(this._context.capabilities.vao?i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.glName):this._context.bindBuffer(e))}unbind(){this.initialize();const s=this._context.capabilities.vao;s?s.bindVertexArray(null):this._unbindLayout()}_unbindLayout(){const{_buffers:s,_layout:t}=this;s||p.error("Vertex buffer dictionary is empty!");for(const e in s){const i=s[e];i||p.error("Vertex buffer is uninitialized!");const r=t[e];V(this._context,this._locations,i,r)}this._indexBuffer!=null&&this._context.unbindBuffer(this._indexBuffer.bufferType)}};export{W as c,tt as i,Y as n,et as u,b as x};
