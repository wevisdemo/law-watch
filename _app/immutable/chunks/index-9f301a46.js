function b(){}const lt=t=>t;function ut(t,e){for(const n in e)t[n]=e[n];return t}function U(t){return t()}function K(){return Object.create(null)}function C(t){t.forEach(U)}function at(t){return typeof t=="function"}function zt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let M;function Ft(t,e){return M||(M=document.createElement("a")),M.href=e,t===M.href}function ft(t){return Object.keys(t).length===0}function _t(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Ht(t,e,n){t.$$.on_destroy.push(_t(e,n))}function It(t,e,n,i){if(t){const s=V(t,e,n,i);return t[0](s)}}function V(t,e,n,i){return t[1]&&i?ut(n.ctx.slice(),t[1](i(e))):n.ctx}function Wt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const l=[],r=Math.max(e.dirty.length,s.length);for(let c=0;c<r;c+=1)l[c]=e.dirty[c]|s[c];return l}return e.dirty|s}return e.dirty}function Gt(t,e,n,i,s,l){if(s){const r=V(e,n,i,l);t.p(r,s)}}function Jt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Kt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Qt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Ut(t){return t==null?"":t}function Vt(t,e,n){return t.set(n),e}const X=typeof window<"u";let dt=X?()=>window.performance.now():()=>Date.now(),I=X?t=>requestAnimationFrame(t):b;const v=new Set;function Y(t){v.forEach(e=>{e.c(t)||(v.delete(e),e.f())}),v.size!==0&&I(Y)}function ht(t){let e;return v.size===0&&I(Y),{promise:new Promise(n=>{v.add(e={c:t,f:n})}),abort(){v.delete(e)}}}let T=!1;function mt(){T=!0}function pt(){T=!1}function yt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function gt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let u=0;u<e.length;u++){const f=e[u];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const u=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=u?s+1:yt(1,s,_=>e[n[_]].claim_order,u))-1;i[o]=n[f]+1;const a=f+1;n[a]=o,s=Math.max(a,s)}const l=[],r=[];let c=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(l.push(e[o-1]);c>=o;c--)r.push(e[c]);c--}for(;c>=0;c--)r.push(e[c]);l.reverse(),r.sort((o,u)=>o.claim_order-u.claim_order);for(let o=0,u=0;o<r.length;o++){for(;u<l.length&&r[o].claim_order>=l[u].claim_order;)u++;const f=u<l.length?l[u]:null;t.insertBefore(r[o],f)}}function wt(t,e){t.appendChild(e)}function Z(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function xt(t){const e=et("style");return $t(Z(t),e),e.sheet}function $t(t,e){return wt(t.head||t,e),e.sheet}function bt(t,e){if(T){for(gt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function Xt(t,e,n){T&&!n?bt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function tt(t){t.parentNode.removeChild(t)}function Yt(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function et(t){return document.createElement(t)}function vt(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function W(t){return document.createTextNode(t)}function Zt(){return W(" ")}function te(){return W("")}function ee(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function kt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function ne(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:kt(t,i,e[i])}function ie(t,e,n){const i=new Set;for(let s=0;s<t.length;s+=1)t[s].checked&&i.add(t[s].__value);return n||i.delete(e),Array.from(i)}function St(t){return Array.from(t.childNodes)}function Et(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function nt(t,e,n,i,s=!1){Et(t);const l=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),c}}for(let r=t.claim_info.last_index-1;r>=0;r--){const c=t[r];if(e(c)){const o=n(c);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,c}}return i()})();return l.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,l}function it(t,e,n,i){return nt(t,s=>s.nodeName===e,s=>{const l=[];for(let r=0;r<s.attributes.length;r++){const c=s.attributes[r];n[c.name]||l.push(c.name)}l.forEach(r=>s.removeAttribute(r))},()=>i(e))}function se(t,e,n){return it(t,e,n,et)}function re(t,e,n){return it(t,e,n,vt)}function Nt(t,e){return nt(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>W(e),!0)}function oe(t){return Nt(t," ")}function ce(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function le(t,e){t.value=e==null?"":e}function ue(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function ae(t,e,n){t.classList[n?"add":"remove"](e)}const D=new Map;let P=0;function At(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Ct(t,e){const n={stylesheet:xt(e),rules:{}};return D.set(t,n),n}function jt(t,e,n,i,s,l,r,c=0){const o=16.666/i;let u=`{
`;for(let p=0;p<=1;p+=o){const y=e+(n-e)*l(p);u+=p*100+`%{${r(y,1-y)}}
`}const f=u+`100% {${r(n,1-n)}}
}`,a=`__svelte_${At(f)}_${c}`,_=Z(t),{stylesheet:d,rules:m}=D.get(_)||Ct(_,t);m[a]||(m[a]=!0,d.insertRule(`@keyframes ${a} ${f}`,d.cssRules.length));const x=t.style.animation||"";return t.style.animation=`${x?`${x}, `:""}${a} ${i}ms linear ${s}ms 1 both`,P+=1,a}function Mt(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?l=>l.indexOf(e)<0:l=>l.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),P-=s,P||Ot())}function Ot(){I(()=>{P||(D.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&tt(e)}),D.clear())})}function fe(t,e,n,i){if(!e)return b;const s=t.getBoundingClientRect();if(e.left===s.left&&e.right===s.right&&e.top===s.top&&e.bottom===s.bottom)return b;const{delay:l=0,duration:r=300,easing:c=lt,start:o=dt()+l,end:u=o+r,tick:f=b,css:a}=n(t,{from:e,to:s},i);let _=!0,d=!1,m;function x(){a&&(m=jt(t,0,1,r,l,c,a)),l||(d=!0)}function p(){a&&Mt(t,m),_=!1}return ht(y=>{if(!d&&y>=o&&(d=!0),d&&y>=u&&(f(1,0),p()),!_)return!1;if(d){const k=y-o,S=0+1*c(k/r);f(S,1-S)}return!0}),x(),f(0,1),p}function _e(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,Rt(t,s)}}function Rt(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),s=i.transform==="none"?"":i.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let A;function N(t){A=t}function G(){if(!A)throw new Error("Function called outside component initialization");return A}function de(t){G().$$.on_mount.push(t)}function he(t){G().$$.after_update.push(t)}function me(t){G().$$.on_destroy.push(t)}const E=[],Q=[],R=[],z=[],st=Promise.resolve();let F=!1;function rt(){F||(F=!0,st.then(ot))}function pe(){return rt(),st}function H(t){R.push(t)}function ye(t){z.push(t)}const L=new Set;let O=0;function ot(){const t=A;do{for(;O<E.length;){const e=E[O];O++,N(e),Bt(e.$$)}for(N(null),E.length=0,O=0;Q.length;)Q.pop()();for(let e=0;e<R.length;e+=1){const n=R[e];L.has(n)||(L.add(n),n())}R.length=0}while(E.length);for(;z.length;)z.pop()();F=!1,L.clear(),N(t)}function Bt(t){if(t.fragment!==null){t.update(),C(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(H)}}const B=new Set;let $;function ge(){$={r:0,c:[],p:$}}function we(){$.r||C($.c),$=$.p}function ct(t,e){t&&t.i&&(B.delete(t),t.i(e))}function Dt(t,e,n,i){if(t&&t.o){if(B.has(t))return;B.add(t),$.c.push(()=>{B.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}function Pt(t,e){t.d(1),e.delete(t.key)}function xe(t,e){Dt(t,1,1,()=>{e.delete(t.key)})}function $e(t,e){t.f(),Pt(t,e)}function be(t,e,n,i,s,l,r,c,o,u,f,a){let _=t.length,d=l.length,m=_;const x={};for(;m--;)x[t[m].key]=m;const p=[],y=new Map,k=new Map;for(m=d;m--;){const h=a(s,l,m),g=n(h);let w=r.get(g);w?i&&w.p(h,e):(w=u(g,h),w.c()),y.set(g,p[m]=w),g in x&&k.set(g,Math.abs(m-x[g]))}const S=new Set,J=new Set;function q(h){ct(h,1),h.m(c,f),r.set(h.key,h),f=h.first,d--}for(;_&&d;){const h=p[d-1],g=t[_-1],w=h.key,j=g.key;h===g?(f=h.first,_--,d--):y.has(j)?!r.has(w)||S.has(w)?q(h):J.has(j)?_--:k.get(w)>k.get(j)?(J.add(w),q(h)):(S.add(j),_--):(o(g,r),_--)}for(;_--;){const h=t[_];y.has(h.key)||o(h,r)}for(;d;)q(p[d-1]);return p}function ve(t,e){const n={},i={},s={$$scope:1};let l=t.length;for(;l--;){const r=t[l],c=e[l];if(c){for(const o in r)o in c||(i[o]=1);for(const o in c)s[o]||(n[o]=c[o],s[o]=1);t[l]=c}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function ke(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Se(t){t&&t.c()}function Ee(t,e){t&&t.l(e)}function Tt(t,e,n,i){const{fragment:s,on_mount:l,on_destroy:r,after_update:c}=t.$$;s&&s.m(e,n),i||H(()=>{const o=l.map(U).filter(at);r?r.push(...o):C(o),t.$$.on_mount=[]}),c.forEach(H)}function qt(t,e){const n=t.$$;n.fragment!==null&&(C(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function Lt(t,e){t.$$.dirty[0]===-1&&(E.push(t),rt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Ne(t,e,n,i,s,l,r,c=[-1]){const o=A;N(t);const u=t.$$={fragment:null,ctx:null,props:l,update:b,not_equal:s,bound:K(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:K(),dirty:c,skip_bound:!1,root:e.target||o.$$.root};r&&r(u.root);let f=!1;if(u.ctx=n?n(t,e.props||{},(a,_,...d)=>{const m=d.length?d[0]:_;return u.ctx&&s(u.ctx[a],u.ctx[a]=m)&&(!u.skip_bound&&u.bound[a]&&u.bound[a](m),f&&Lt(t,a)),_}):[],u.update(),f=!0,C(u.before_update),u.fragment=i?i(u.ctx):!1,e.target){if(e.hydrate){mt();const a=St(e.target);u.fragment&&u.fragment.l(a),a.forEach(tt)}else u.fragment&&u.fragment.c();e.intro&&ct(t.$$.fragment),Tt(t,e.target,e.anchor,e.customElement),pt(),ot()}N(o)}class Ae{$destroy(){qt(this,1),this.$destroy=b}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!ft(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{$e as $,b as A,_t as B,C,at as D,It as E,ee as F,Gt as G,Jt as H,Wt as I,vt as J,re as K,bt as L,Ft as M,ae as N,Ht as O,me as P,Q,ut as R,Ae as S,ne as T,ve as U,Qt as V,Kt as W,Yt as X,le as Y,Ut as Z,be as _,Zt as a,_e as a0,fe as a1,Pt as a2,ie as a3,ke as a4,ye as a5,Vt as a6,xe as a7,Xt as b,oe as c,we as d,te as e,ct as f,ge as g,tt as h,Ne as i,he as j,et as k,se as l,St as m,kt as n,de as o,ue as p,W as q,Nt as r,zt as s,Dt as t,ce as u,Se as v,Ee as w,Tt as x,qt as y,pe as z};