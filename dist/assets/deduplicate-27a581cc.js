import{bu as O}from"./index-b5294fcf.js";import{i as R,t as L}from"./Indices-641a847e.js";function F(f,n,e){const l=Array.isArray(f),r=l?f.length/n:f.byteLength/(4*n),s=l?f:new Uint32Array(f,0,r*n),u=(e==null?void 0:e.minReduction)??0,y=(e==null?void 0:e.originalIndices)||null,q=y?y.length:0,c=(e==null?void 0:e.componentOffsets)||null;let b=0;if(c)for(let t=0;t<c.length-1;t++){const a=c[t+1]-c[t];a>b&&(b=a)}else b=r;const m=Math.floor(1.1*b)+1;(h==null||h.length<2*m)&&(h=new Uint32Array(O(2*m)));for(let t=0;t<2*m;t++)h[t]=0;let i=0;const w=!!c&&!!y,U=w?q:r;let A=R(r);const p=new Uint32Array(q),$=1.96;let C=u!==0?Math.ceil(4*$*$/(u*u)*u*(1-u)):U,d=1,I=c?c[1]:U;for(let t=0;t<U;t++){if(t===C){const o=1-i/t;if(o+$*Math.sqrt(o*(1-o)/t)<u)return null;C*=2}if(t===I){for(let o=0;o<2*m;o++)h[o]=0;if(y)for(let o=c[d-1];o<c[d];o++)p[o]=A[y[o]];I=c[++d]}const a=w?y[t]:t,j=a*n,k=B(s,j,n);let g=k%m,x=i;for(;h[2*g+1]!==0;){if(h[2*g]===k){const o=h[2*g+1]-1;if(v(s,j,o*n,n)){x=A[o];break}}g++,g>=m&&(g-=m)}x===i&&(h[2*g]=k,h[2*g+1]=a+1,i++),A[a]=x}if(u!==0&&1-i/r<u)return null;if(w){for(let t=c[d-1];t<p.length;t++)p[t]=A[y[t]];A=L(p)}const M=l?new Array(i):new Uint32Array(i*n);i=0;for(let t=0;t<U;t++)A[t]===i&&(z(s,(w?y[t]:t)*n,M,i*n,n),i++);if(y&&!w){const t=new Uint32Array(q);for(let a=0;a<t.length;a++)t[a]=A[y[a]];A=L(t)}return{buffer:Array.isArray(M)?M:M.buffer,indices:A,uniqueCount:i}}function v(f,n,e,l){for(let r=0;r<l;r++)if(f[n+r]!==f[e+r])return!1;return!0}function z(f,n,e,l,r){for(let s=0;s<r;s++)e[l+s]=f[n+s]}function B(f,n,e){let l=0;for(let r=0;r<e;r++)l=f[n+r]+l|0,l=l+(l<<11)+(l>>>2)|0;return l>>>0}let h=null;export{F as e};
