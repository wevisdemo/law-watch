function b(){}const J=t=>t;function gt(t,e){for(const n in e)t[n]=e[n];return t}function it(t){return t()}function et(){return Object.create(null)}function S(t){t.forEach(it)}function K(t){return typeof t=="function"}function Wt(t,e){return t!=t?e==e:t!==e||t&&typeof t=="object"||typeof t=="function"}let R;function Gt(t,e){return R||(R=document.createElement("a")),R.href=e,t===R.href}function xt(t){return Object.keys(t).length===0}function $t(t,...e){if(t==null)return b;const n=t.subscribe(...e);return n.unsubscribe?()=>n.unsubscribe():n}function Jt(t,e,n){t.$$.on_destroy.push($t(e,n))}function Kt(t,e,n,i){if(t){const s=st(t,e,n,i);return t[0](s)}}function st(t,e,n,i){return t[1]&&i?gt(n.ctx.slice(),t[1](i(e))):n.ctx}function Qt(t,e,n,i){if(t[2]&&i){const s=t[2](i(n));if(e.dirty===void 0)return s;if(typeof s=="object"){const c=[],r=Math.max(e.dirty.length,s.length);for(let l=0;l<r;l+=1)c[l]=e.dirty[l]|s[l];return c}return e.dirty|s}return e.dirty}function Ut(t,e,n,i,s,c){if(s){const r=st(e,n,i,c);t.p(r,s)}}function Vt(t){if(t.ctx.length>32){const e=[],n=t.ctx.length/32;for(let i=0;i<n;i++)e[i]=-1;return e}return-1}function Xt(t){const e={};for(const n in t)n[0]!=="$"&&(e[n]=t[n]);return e}function Yt(t,e){const n={};e=new Set(e);for(const i in t)!e.has(i)&&i[0]!=="$"&&(n[i]=t[i]);return n}function Zt(t){return t==null?"":t}function te(t,e,n){return t.set(n),e}const rt=typeof window<"u";let Q=rt?()=>window.performance.now():()=>Date.now(),U=rt?t=>requestAnimationFrame(t):b;const E=new Set;function ot(t){E.forEach(e=>{e.c(t)||(E.delete(e),e.f())}),E.size!==0&&U(ot)}function V(t){let e;return E.size===0&&U(ot),{promise:new Promise(n=>{E.add(e={c:t,f:n})}),abort(){E.delete(e)}}}let F=!1;function wt(){F=!0}function bt(){F=!1}function vt(t,e,n,i){for(;t<e;){const s=t+(e-t>>1);n(s)<=i?t=s+1:e=s}return t}function kt(t){if(t.hydrate_init)return;t.hydrate_init=!0;let e=t.childNodes;if(t.nodeName==="HEAD"){const o=[];for(let a=0;a<e.length;a++){const f=e[a];f.claim_order!==void 0&&o.push(f)}e=o}const n=new Int32Array(e.length+1),i=new Int32Array(e.length);n[0]=-1;let s=0;for(let o=0;o<e.length;o++){const a=e[o].claim_order,f=(s>0&&e[n[s]].claim_order<=a?s+1:vt(1,s,_=>e[n[_]].claim_order,a))-1;i[o]=n[f]+1;const u=f+1;n[u]=o,s=Math.max(u,s)}const c=[],r=[];let l=e.length-1;for(let o=n[s]+1;o!=0;o=i[o-1]){for(c.push(e[o-1]);l>=o;l--)r.push(e[l]);l--}for(;l>=0;l--)r.push(e[l]);c.reverse(),r.sort((o,a)=>o.claim_order-a.claim_order);for(let o=0,a=0;o<r.length;o++){for(;a<c.length&&r[o].claim_order>=c[a].claim_order;)a++;const f=a<c.length?c[a]:null;t.insertBefore(r[o],f)}}function Et(t,e){t.appendChild(e)}function ct(t){if(!t)return document;const e=t.getRootNode?t.getRootNode():t.ownerDocument;return e&&e.host?e:t.ownerDocument}function St(t){const e=at("style");return Ct(ct(t),e),e.sheet}function Ct(t,e){return Et(t.head||t,e),e.sheet}function Nt(t,e){if(F){for(kt(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;e!==t.actual_end_child?(e.claim_order!==void 0||e.parentNode!==t)&&t.insertBefore(e,t.actual_end_child):t.actual_end_child=e.nextSibling}else(e.parentNode!==t||e.nextSibling!==null)&&t.appendChild(e)}function ee(t,e,n){F&&!n?Nt(t,e):(e.parentNode!==t||e.nextSibling!=n)&&t.insertBefore(e,n||null)}function lt(t){t.parentNode.removeChild(t)}function ne(t,e){for(let n=0;n<t.length;n+=1)t[n]&&t[n].d(e)}function at(t){return document.createElement(t)}function At(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function X(t){return document.createTextNode(t)}function ie(){return X(" ")}function se(){return X("")}function re(t,e,n,i){return t.addEventListener(e,n,i),()=>t.removeEventListener(e,n,i)}function jt(t,e,n){n==null?t.removeAttribute(e):t.getAttribute(e)!==n&&t.setAttribute(e,n)}function oe(t,e){const n=Object.getOwnPropertyDescriptors(t.__proto__);for(const i in e)e[i]==null?t.removeAttribute(i):i==="style"?t.style.cssText=e[i]:i==="__value"?t.value=t[i]=e[i]:n[i]&&n[i].set?t[i]=e[i]:jt(t,i,e[i])}function ce(t,e,n){const i=new Set;for(let s=0;s<t.length;s+=1)t[s].checked&&i.add(t[s].__value);return n||i.delete(e),Array.from(i)}function Mt(t){return Array.from(t.childNodes)}function Ot(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function ut(t,e,n,i,s=!1){Ot(t);const c=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s||(t.claim_info.last_index=r),l}}for(let r=t.claim_info.last_index-1;r>=0;r--){const l=t[r];if(e(l)){const o=n(l);return o===void 0?t.splice(r,1):t[r]=o,s?o===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,l}}return i()})();return c.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,c}function ft(t,e,n,i){return ut(t,s=>s.nodeName===e,s=>{const c=[];for(let r=0;r<s.attributes.length;r++){const l=s.attributes[r];n[l.name]||c.push(l.name)}c.forEach(r=>s.removeAttribute(r))},()=>i(e))}function le(t,e,n){return ft(t,e,n,at)}function ae(t,e,n){return ft(t,e,n,At)}function Rt(t,e){return ut(t,n=>n.nodeType===3,n=>{const i=""+e;if(n.data.startsWith(i)){if(n.data.length!==i.length)return n.splitText(i.length)}else n.data=i},()=>X(e),!0)}function ue(t){return Rt(t," ")}function fe(t,e){e=""+e,t.wholeText!==e&&(t.data=e)}function _e(t,e){t.value=e==null?"":e}function de(t,e,n,i){n===null?t.style.removeProperty(e):t.style.setProperty(e,n,i?"important":"")}function he(t,e,n){t.classList[n?"add":"remove"](e)}function Bt(t,e,{bubbles:n=!1,cancelable:i=!1}={}){const s=document.createEvent("CustomEvent");return s.initCustomEvent(t,n,i,e),s}const T=new Map;let q=0;function Dt(t){let e=5381,n=t.length;for(;n--;)e=(e<<5)-e^t.charCodeAt(n);return e>>>0}function Pt(t,e){const n={stylesheet:St(e),rules:{}};return T.set(t,n),n}function Y(t,e,n,i,s,c,r,l=0){const o=16.666/i;let a=`{
`;for(let m=0;m<=1;m+=o){const g=e+(n-e)*c(m);a+=m*100+`%{${r(g,1-g)}}
`}const f=a+`100% {${r(n,1-n)}}
}`,u=`__svelte_${Dt(f)}_${l}`,_=ct(t),{stylesheet:d,rules:h}=T.get(_)||Pt(_,t);h[u]||(h[u]=!0,d.insertRule(`@keyframes ${u} ${f}`,d.cssRules.length));const y=t.style.animation||"";return t.style.animation=`${y?`${y}, `:""}${u} ${i}ms linear ${s}ms 1 both`,q+=1,u}function L(t,e){const n=(t.style.animation||"").split(", "),i=n.filter(e?c=>c.indexOf(e)<0:c=>c.indexOf("__svelte")===-1),s=n.length-i.length;s&&(t.style.animation=i.join(", "),q-=s,q||Tt())}function Tt(){U(()=>{q||(T.forEach(t=>{const{ownerNode:e}=t.stylesheet;e&&lt(e)}),T.clear())})}function me(t,e,n,i){if(!e)return b;const s=t.getBoundingClientRect();if(e.left===s.left&&e.right===s.right&&e.top===s.top&&e.bottom===s.bottom)return b;const{delay:c=0,duration:r=300,easing:l=J,start:o=Q()+c,end:a=o+r,tick:f=b,css:u}=n(t,{from:e,to:s},i);let _=!0,d=!1,h;function y(){u&&(h=Y(t,0,1,r,c,l,u)),c||(d=!0)}function m(){u&&L(t,h),_=!1}return V(g=>{if(!d&&g>=o&&(d=!0),d&&g>=a&&(f(1,0),m()),!_)return!1;if(d){const w=g-o,v=0+1*l(w/r);f(v,1-v)}return!0}),y(),f(0,1),m}function pe(t){const e=getComputedStyle(t);if(e.position!=="absolute"&&e.position!=="fixed"){const{width:n,height:i}=e,s=t.getBoundingClientRect();t.style.position="absolute",t.style.width=n,t.style.height=i,qt(t,s)}}function qt(t,e){const n=t.getBoundingClientRect();if(e.left!==n.left||e.top!==n.top){const i=getComputedStyle(t),s=i.transform==="none"?"":i.transform;t.style.transform=`${s} translate(${e.left-n.left}px, ${e.top-n.top}px)`}}let j;function A(t){j=t}function Z(){if(!j)throw new Error("Function called outside component initialization");return j}function ye(t){Z().$$.on_mount.push(t)}function ge(t){Z().$$.after_update.push(t)}function xe(t){Z().$$.on_destroy.push(t)}function $e(t,e){const n=t.$$.callbacks[e.type];n&&n.slice().forEach(i=>i.call(this,e))}const N=[],nt=[],D=[],W=[],_t=Promise.resolve();let G=!1;function dt(){G||(G=!0,_t.then(ht))}function we(){return dt(),_t}function M(t){D.push(t)}function be(t){W.push(t)}const I=new Set;let B=0;function ht(){const t=j;do{for(;B<N.length;){const e=N[B];B++,A(e),Lt(e.$$)}for(A(null),N.length=0,B=0;nt.length;)nt.pop()();for(let e=0;e<D.length;e+=1){const n=D[e];I.has(n)||(I.add(n),n())}D.length=0}while(N.length);for(;W.length;)W.pop()();G=!1,I.clear(),A(t)}function Lt(t){if(t.fragment!==null){t.update(),S(t.before_update);const e=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,e),t.after_update.forEach(M)}}let C;function mt(){return C||(C=Promise.resolve(),C.then(()=>{C=null})),C}function z(t,e,n){t.dispatchEvent(Bt(`${e?"intro":"outro"}${n}`))}const P=new Set;let k;function ve(){k={r:0,c:[],p:k}}function ke(){k.r||S(k.c),k=k.p}function pt(t,e){t&&t.i&&(P.delete(t),t.i(e))}function Ee(t,e,n,i){if(t&&t.o){if(P.has(t))return;P.add(t),k.c.push(()=>{P.delete(t),i&&(n&&t.d(1),i())}),t.o(e)}else i&&i()}const yt={duration:0};function Se(t,e,n){let i=e(t,n),s=!1,c,r,l=0;function o(){c&&L(t,c)}function a(){const{delay:u=0,duration:_=300,easing:d=J,tick:h=b,css:y}=i||yt;y&&(c=Y(t,0,1,_,u,d,y,l++)),h(0,1);const m=Q()+u,g=m+_;r&&r.abort(),s=!0,M(()=>z(t,!0,"start")),r=V(w=>{if(s){if(w>=g)return h(1,0),z(t,!0,"end"),o(),s=!1;if(w>=m){const v=d((w-m)/_);h(v,1-v)}}return s})}let f=!1;return{start(){f||(f=!0,L(t),K(i)?(i=i(),mt().then(a)):a())},invalidate(){f=!1},end(){s&&(o(),s=!1)}}}function Ce(t,e,n){let i=e(t,n),s=!0,c;const r=k;r.r+=1;function l(){const{delay:o=0,duration:a=300,easing:f=J,tick:u=b,css:_}=i||yt;_&&(c=Y(t,1,0,a,o,f,_));const d=Q()+o,h=d+a;M(()=>z(t,!1,"start")),V(y=>{if(s){if(y>=h)return u(0,1),z(t,!1,"end"),--r.r||S(r.c),!1;if(y>=d){const m=f((y-d)/a);u(1-m,m)}}return s})}return K(i)?mt().then(()=>{i=i(),l()}):l(),{end(o){o&&i.tick&&i.tick(1,0),s&&(c&&L(t,c),s=!1)}}}function zt(t,e){t.d(1),e.delete(t.key)}function Ne(t,e){t.f(),zt(t,e)}function Ae(t,e,n,i,s,c,r,l,o,a,f,u){let _=t.length,d=c.length,h=_;const y={};for(;h--;)y[t[h].key]=h;const m=[],g=new Map,w=new Map;for(h=d;h--;){const p=u(s,c,h),x=n(p);let $=r.get(x);$?i&&$.p(p,e):($=a(x,p),$.c()),g.set(x,m[h]=$),x in y&&w.set(x,Math.abs(h-y[x]))}const v=new Set,tt=new Set;function H(p){pt(p,1),p.m(l,f),r.set(p.key,p),f=p.first,d--}for(;_&&d;){const p=m[d-1],x=t[_-1],$=p.key,O=x.key;p===x?(f=p.first,_--,d--):g.has(O)?!r.has($)||v.has($)?H(p):tt.has(O)?_--:w.get($)>w.get(O)?(tt.add($),H(p)):(v.add(O),_--):(o(x,r),_--)}for(;_--;){const p=t[_];g.has(p.key)||o(p,r)}for(;d;)H(m[d-1]);return m}function je(t,e){const n={},i={},s={$$scope:1};let c=t.length;for(;c--;){const r=t[c],l=e[c];if(l){for(const o in r)o in l||(i[o]=1);for(const o in l)s[o]||(n[o]=l[o],s[o]=1);t[c]=l}else for(const o in r)s[o]=1}for(const r in i)r in n||(n[r]=void 0);return n}function Me(t,e,n){const i=t.$$.props[e];i!==void 0&&(t.$$.bound[i]=n,n(t.$$.ctx[i]))}function Oe(t){t&&t.c()}function Re(t,e){t&&t.l(e)}function Ft(t,e,n,i){const{fragment:s,on_mount:c,on_destroy:r,after_update:l}=t.$$;s&&s.m(e,n),i||M(()=>{const o=c.map(it).filter(K);r?r.push(...o):S(o),t.$$.on_mount=[]}),l.forEach(M)}function Ht(t,e){const n=t.$$;n.fragment!==null&&(S(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function It(t,e){t.$$.dirty[0]===-1&&(N.push(t),dt(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function Be(t,e,n,i,s,c,r,l=[-1]){const o=j;A(t);const a=t.$$={fragment:null,ctx:null,props:c,update:b,not_equal:s,bound:et(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(o?o.$$.context:[])),callbacks:et(),dirty:l,skip_bound:!1,root:e.target||o.$$.root};r&&r(a.root);let f=!1;if(a.ctx=n?n(t,e.props||{},(u,_,...d)=>{const h=d.length?d[0]:_;return a.ctx&&s(a.ctx[u],a.ctx[u]=h)&&(!a.skip_bound&&a.bound[u]&&a.bound[u](h),f&&It(t,u)),_}):[],a.update(),f=!0,S(a.before_update),a.fragment=i?i(a.ctx):!1,e.target){if(e.hydrate){wt();const u=Mt(e.target);a.fragment&&a.fragment.l(u),u.forEach(lt)}else a.fragment&&a.fragment.c();e.intro&&pt(t.$$.fragment),Ft(t,e.target,e.anchor,e.customElement),bt(),ht()}A(o)}class De{$destroy(){Ht(this,1),this.$destroy=b}$on(e,n){const i=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return i.push(n),()=>{const s=i.indexOf(n);s!==-1&&i.splice(s,1)}}$set(e){this.$$set&&!xt(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}export{Ne as $,b as A,$t as B,S as C,K as D,Kt as E,At as F,ae as G,Nt as H,Ut as I,Vt as J,Qt as K,Gt as L,re as M,he as N,Jt as O,xe as P,nt as Q,gt as R,De as S,oe as T,je as U,Yt as V,Xt as W,ne as X,_e as Y,Zt as Z,Ae as _,ie as a,pe as a0,me as a1,zt as a2,ce as a3,Me as a4,be as a5,te as a6,M as a7,Se as a8,Ce as a9,$e as aa,ee as b,ue as c,ke as d,se as e,pt as f,ve as g,lt as h,Be as i,ge as j,at as k,le as l,Mt as m,jt as n,ye as o,de as p,X as q,Rt as r,Wt as s,Ee as t,fe as u,Oe as v,Re as w,Ft as x,Ht as y,we as z};
