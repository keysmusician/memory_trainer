(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const i of r)if(i.type==="childList")for(const a of i.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function n(r){const i={};return r.integrity&&(i.integrity=r.integrity),r.referrerPolicy&&(i.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?i.credentials="include":r.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function o(r){if(r.ep)return;r.ep=!0;const i=n(r);fetch(r.href,i)}})();const He=(t,e)=>t===e,$=Symbol("solid-proxy"),ie=Symbol("solid-track"),Q={equals:He};let be=Me;const P=1,Z=2,Se={owned:null,cleanups:null,context:null,owner:null};var m=null;let re=null,f=null,_=null,k=null,ee=0;function W(t,e){const n=f,o=m,r=t.length===0,i=r?Se:{owned:null,cleanups:null,context:null,owner:e===void 0?o:e},a=r?t:()=>t(()=>A(()=>ne(i)));m=i,f=null;try{return N(a,!0)}finally{f=n,m=o}}function T(t,e){e=e?Object.assign({},Q,e):Q;const n={value:t,observers:null,observerSlots:null,comparator:e.equals||void 0},o=r=>(typeof r=="function"&&(r=r(n.value)),ve(n,r));return[Ce.bind(n),o]}function L(t,e,n){const o=te(t,e,!1,P);V(o)}function de(t,e,n){be=Ye;const o=te(t,e,!1,P);(!n||!n.render)&&(o.user=!0),k?k.push(o):V(o)}function Ge(t,e){let n;const o=te(()=>{n?n():A(t),n=void 0},void 0,!1,0);return o.user=!0,r=>{n=r,V(o)}}function x(t,e,n){n=n?Object.assign({},Q,n):Q;const o=te(t,e,!0,0);return o.observers=null,o.observerSlots=null,o.comparator=n.equals||void 0,V(o),Ce.bind(o)}function Ue(t){return N(t,!1)}function A(t){if(f===null)return t();const e=f;f=null;try{return t()}finally{f=e}}function je(t){de(()=>A(t))}function We(t){return m===null||(m.cleanups===null?m.cleanups=[t]:m.cleanups.push(t)),t}function Ae(){return f}function Qe(t){const e=x(t),n=x(()=>ae(e()));return n.toArray=()=>{const o=n();return Array.isArray(o)?o:o!=null?[o]:[]},n}function Ce(){if(this.sources&&this.state)if(this.state===P)V(this);else{const t=_;_=null,N(()=>Y(this),!1),_=t}if(f){const t=this.observers?this.observers.length:0;f.sources?(f.sources.push(this),f.sourceSlots.push(t)):(f.sources=[this],f.sourceSlots=[t]),this.observers?(this.observers.push(f),this.observerSlots.push(f.sources.length-1)):(this.observers=[f],this.observerSlots=[f.sources.length-1])}return this.value}function ve(t,e,n){let o=t.value;return(!t.comparator||!t.comparator(o,e))&&(t.value=e,t.observers&&t.observers.length&&N(()=>{for(let r=0;r<t.observers.length;r+=1){const i=t.observers[r],a=re&&re.running;a&&re.disposed.has(i),(a?!i.tState:!i.state)&&(i.pure?_.push(i):k.push(i),i.observers&&ke(i)),a||(i.state=P)}if(_.length>1e6)throw _=[],new Error},!1)),e}function V(t){if(!t.fn)return;ne(t);const e=m,n=f,o=ee;f=m=t,Ze(t,t.value,o),f=n,m=e}function Ze(t,e,n){let o;try{o=t.fn(e)}catch(r){return t.pure&&(t.state=P,t.owned&&t.owned.forEach(ne),t.owned=null),t.updatedAt=n+1,Te(r)}(!t.updatedAt||t.updatedAt<=n)&&(t.updatedAt!=null&&"observers"in t?ve(t,o):t.value=o,t.updatedAt=n)}function te(t,e,n,o=P,r){const i={fn:t,state:o,updatedAt:null,owned:null,sources:null,sourceSlots:null,cleanups:null,value:e,owner:m,context:null,pure:n};return m===null||m!==Se&&(m.owned?m.owned.push(i):m.owned=[i]),i}function J(t){if(t.state===0)return;if(t.state===Z)return Y(t);if(t.suspense&&A(t.suspense.inFallback))return t.suspense.effects.push(t);const e=[t];for(;(t=t.owner)&&(!t.updatedAt||t.updatedAt<ee);)t.state&&e.push(t);for(let n=e.length-1;n>=0;n--)if(t=e[n],t.state===P)V(t);else if(t.state===Z){const o=_;_=null,N(()=>Y(t,e[0]),!1),_=o}}function N(t,e){if(_)return t();let n=!1;e||(_=[]),k?n=!0:k=[],ee++;try{const o=t();return Je(n),o}catch(o){n||(k=null),_=null,Te(o)}}function Je(t){if(_&&(Me(_),_=null),t)return;const e=k;k=null,e.length&&N(()=>be(e),!1)}function Me(t){for(let e=0;e<t.length;e++)J(t[e])}function Ye(t){let e,n=0;for(e=0;e<t.length;e++){const o=t[e];o.user?t[n++]=o:J(o)}for(e=0;e<n;e++)J(t[e])}function Y(t,e){t.state=0;for(let n=0;n<t.sources.length;n+=1){const o=t.sources[n];if(o.sources){const r=o.state;r===P?o!==e&&(!o.updatedAt||o.updatedAt<ee)&&J(o):r===Z&&Y(o,e)}}}function ke(t){for(let e=0;e<t.observers.length;e+=1){const n=t.observers[e];n.state||(n.state=Z,n.pure?_.push(n):k.push(n),n.observers&&ke(n))}}function ne(t){let e;if(t.sources)for(;t.sources.length;){const n=t.sources.pop(),o=t.sourceSlots.pop(),r=n.observers;if(r&&r.length){const i=r.pop(),a=n.observerSlots.pop();o<r.length&&(i.sourceSlots[a]=o,r[o]=i,n.observerSlots[o]=a)}}if(t.owned){for(e=t.owned.length-1;e>=0;e--)ne(t.owned[e]);t.owned=null}if(t.cleanups){for(e=t.cleanups.length-1;e>=0;e--)t.cleanups[e]();t.cleanups=null}t.state=0,t.context=null}function Te(t){throw t}function ae(t){if(typeof t=="function"&&!t.length)return ae(t());if(Array.isArray(t)){const e=[];for(let n=0;n<t.length;n++){const o=ae(t[n]);Array.isArray(o)?e.push.apply(e,o):e.push(o)}return e}return t}const Xe=Symbol("fallback");function pe(t){for(let e=0;e<t.length;e++)t[e]()}function ye(t,e,n={}){let o=[],r=[],i=[],a=0,s=e.length>1?[]:null;return We(()=>pe(i)),()=>{let u=t()||[],c,l;return u[ie],A(()=>{let d=u.length,w,F,R,H,G,C,v,M,B;if(d===0)a!==0&&(pe(i),i=[],o=[],r=[],a=0,s&&(s=[])),n.fallback&&(o=[Xe],r[0]=W(ze=>(i[0]=ze,n.fallback())),a=1);else if(a===0){for(r=new Array(d),l=0;l<d;l++)o[l]=u[l],r[l]=W(h);a=d}else{for(R=new Array(d),H=new Array(d),s&&(G=new Array(d)),C=0,v=Math.min(a,d);C<v&&o[C]===u[C];C++);for(v=a-1,M=d-1;v>=C&&M>=C&&o[v]===u[M];v--,M--)R[M]=r[v],H[M]=i[v],s&&(G[M]=s[v]);for(w=new Map,F=new Array(M+1),l=M;l>=C;l--)B=u[l],c=w.get(B),F[l]=c===void 0?-1:c,w.set(B,l);for(c=C;c<=v;c++)B=o[c],l=w.get(B),l!==void 0&&l!==-1?(R[l]=r[c],H[l]=i[c],s&&(G[l]=s[c]),l=F[l],w.set(B,l)):i[c]();for(l=C;l<d;l++)l in R?(r[l]=R[l],i[l]=H[l],s&&(s[l]=G[l],s[l](l))):r[l]=W(h);r=r.slice(0,a=d),o=u.slice(0)}return r});function h(d){if(i[l]=d,s){const[w,F]=T(l);return s[l]=F,e(u[l],w)}return e(u[l])}}}function g(t,e){return A(()=>t(e||{}))}const Pe=t=>`Stale read from <${t}>.`;function oe(t){const e="fallback"in t&&{fallback:()=>t.fallback};return x(ye(()=>t.each,t.children,e||void 0))}function Ke(t){const e=t.keyed,n=x(()=>t.when,void 0,{equals:(o,r)=>e?o===r:!o==!r});return x(()=>{const o=n();if(o){const r=t.children;return typeof r=="function"&&r.length>0?A(()=>r(e?o:()=>{if(!A(n))throw Pe("Show");return t.when})):r}return t.fallback},void 0,void 0)}function et(t){let e=!1;const n=(i,a)=>i[0]===a[0]&&(e?i[1]===a[1]:!i[1]==!a[1])&&i[2]===a[2],o=Qe(()=>t.children),r=x(()=>{let i=o();Array.isArray(i)||(i=[i]);for(let a=0;a<i.length;a++){const s=i[a].when;if(s)return e=!!i[a].keyed,[a,s,i[a]]}return[-1]},void 0,{equals:n});return x(()=>{const[i,a,s]=r();if(i<0)return t.fallback;const u=s.children;return typeof u=="function"&&u.length>0?A(()=>u(e?a:()=>{if(A(r)[0]!==i)throw Pe("Match");return s.when})):u},void 0,void 0)}function ge(t){return t}function tt(t,e,n){let o=n.length,r=e.length,i=o,a=0,s=0,u=e[r-1].nextSibling,c=null;for(;a<r||s<i;){if(e[a]===n[s]){a++,s++;continue}for(;e[r-1]===n[i-1];)r--,i--;if(r===a){const l=i<o?s?n[s-1].nextSibling:n[i-s]:u;for(;s<i;)t.insertBefore(n[s++],l)}else if(i===s)for(;a<r;)(!c||!c.has(e[a]))&&e[a].remove(),a++;else if(e[a]===n[i-1]&&n[s]===e[r-1]){const l=e[--r].nextSibling;t.insertBefore(n[s++],e[a++].nextSibling),t.insertBefore(n[--i],l),e[r]=n[i]}else{if(!c){c=new Map;let h=s;for(;h<i;)c.set(n[h],h++)}const l=c.get(e[a]);if(l!=null)if(s<l&&l<i){let h=a,d=1,w;for(;++h<r&&h<i&&!((w=c.get(e[h]))==null||w!==l+d);)d++;if(d>l-s){const F=e[a];for(;s<l;)t.insertBefore(n[s++],F)}else t.replaceChild(n[s++],e[a++])}else a++;else e[a++].remove()}}}const me="_$DX_DELEGATE";function nt(t,e,n,o={}){let r;return W(i=>{r=i,e===document?t():b(e,t(),e.firstChild?null:void 0,n)},o.owner),()=>{r(),e.textContent=""}}function p(t,e,n){let o;const r=()=>{const a=document.createElement("template");return a.innerHTML=t,n?a.content.firstChild.firstChild:a.content.firstChild},i=e?()=>(o||(o=r())).cloneNode(!0):()=>A(()=>document.importNode(o||(o=r()),!0));return i.cloneNode=i,i}function q(t,e=window.document){const n=e[me]||(e[me]=new Set);for(let o=0,r=t.length;o<r;o++){const i=t[o];n.has(i)||(n.add(i),e.addEventListener(i,it))}}function I(t,e,n){n==null?t.removeAttribute(e):t.setAttribute(e,n)}function S(t,e){e==null?t.removeAttribute("class"):t.className=e}function ot(t,e,n){if(!e)return n?I(t,"style"):e;const o=t.style;if(typeof e=="string")return o.cssText=e;typeof n=="string"&&(o.cssText=n=void 0),n||(n={}),e||(e={});let r,i;for(i in n)e[i]==null&&o.removeProperty(i),delete n[i];for(i in e)r=e[i],r!==n[i]&&(o.setProperty(i,r),n[i]=r);return n}function rt(t,e,n){return A(()=>t(e,n))}function b(t,e,n,o){if(n!==void 0&&!o&&(o=[]),typeof e!="function")return X(t,e,o,n);L(r=>X(t,e(),r,n),o)}function it(t){const e=`$$${t.type}`;let n=t.composedPath&&t.composedPath()[0]||t.target;for(t.target!==n&&Object.defineProperty(t,"target",{configurable:!0,value:n}),Object.defineProperty(t,"currentTarget",{configurable:!0,get(){return n||document}});n;){const o=n[e];if(o&&!n.disabled){const r=n[`${e}Data`];if(r!==void 0?o.call(n,r,t):o.call(n,t),t.cancelBubble)return}n=n._$host||n.parentNode||n.host}}function X(t,e,n,o,r){for(;typeof n=="function";)n=n();if(e===n)return n;const i=typeof e,a=o!==void 0;if(t=a&&n[0]&&n[0].parentNode||t,i==="string"||i==="number")if(i==="number"&&(e=e.toString()),a){let s=n[0];s&&s.nodeType===3?s.data=e:s=document.createTextNode(e),n=D(t,n,o,s)}else n!==""&&typeof n=="string"?n=t.firstChild.data=e:n=t.textContent=e;else if(e==null||i==="boolean")n=D(t,n,o);else{if(i==="function")return L(()=>{let s=e();for(;typeof s=="function";)s=s();n=X(t,s,n,o)}),()=>n;if(Array.isArray(e)){const s=[],u=n&&Array.isArray(n);if(se(s,e,n,r))return L(()=>n=X(t,s,n,o,!0)),()=>n;if(s.length===0){if(n=D(t,n,o),a)return n}else u?n.length===0?_e(t,s,o):tt(t,n,s):(n&&D(t),_e(t,s));n=s}else if(e.nodeType){if(Array.isArray(n)){if(a)return n=D(t,n,o,e);D(t,n,null,e)}else n==null||n===""||!t.firstChild?t.appendChild(e):t.replaceChild(e,t.firstChild);n=e}else console.warn("Unrecognized value. Skipped inserting",e)}return n}function se(t,e,n,o){let r=!1;for(let i=0,a=e.length;i<a;i++){let s=e[i],u=n&&n[i],c;if(!(s==null||s===!0||s===!1))if((c=typeof s)=="object"&&s.nodeType)t.push(s);else if(Array.isArray(s))r=se(t,s,u)||r;else if(c==="function")if(o){for(;typeof s=="function";)s=s();r=se(t,Array.isArray(s)?s:[s],Array.isArray(u)?u:[u])||r}else t.push(s),r=!0;else{const l=String(s);u&&u.nodeType===3&&u.data===l?t.push(u):t.push(document.createTextNode(l))}}return r}function _e(t,e,n=null){for(let o=0,r=e.length;o<r;o++)t.insertBefore(e[o],n)}function D(t,e,n,o){if(n===void 0)return t.textContent="";const r=o||document.createTextNode("");if(e.length){let i=!1;for(let a=e.length-1;a>=0;a--){const s=e[a];if(r!==s){const u=s.parentNode===t;!i&&!a?u?t.replaceChild(r,s):t.insertBefore(r,n):u&&s.remove()}else i=!0}}else t.insertBefore(r,n);return[r]}const le=Symbol("store-raw"),O=Symbol("store-node");function Fe(t){let e=t[$];if(!e&&(Object.defineProperty(t,$,{value:e=new Proxy(t,lt)}),!Array.isArray(t))){const n=Object.keys(t),o=Object.getOwnPropertyDescriptors(t);for(let r=0,i=n.length;r<i;r++){const a=n[r];o[a].get&&Object.defineProperty(t,a,{enumerable:o[a].enumerable,get:o[a].get.bind(e)})}}return e}function y(t){let e;return t!=null&&typeof t=="object"&&(t[$]||!(e=Object.getPrototypeOf(t))||e===Object.prototype||Array.isArray(t))}function z(t,e=new Set){let n,o,r,i;if(n=t!=null&&t[le])return n;if(!y(t)||e.has(t))return t;if(Array.isArray(t)){Object.isFrozen(t)?t=t.slice(0):e.add(t);for(let a=0,s=t.length;a<s;a++)r=t[a],(o=z(r,e))!==r&&(t[a]=o)}else{Object.isFrozen(t)?t=Object.assign({},t):e.add(t);const a=Object.keys(t),s=Object.getOwnPropertyDescriptors(t);for(let u=0,c=a.length;u<c;u++)i=a[u],!s[i].get&&(r=t[i],(o=z(r,e))!==r&&(t[i]=o))}return t}function fe(t){let e=t[O];return e||Object.defineProperty(t,O,{value:e=Object.create(null)}),e}function ue(t,e,n){return t[e]||(t[e]=Le(n))}function at(t,e){const n=Reflect.getOwnPropertyDescriptor(t,e);return!n||n.get||!n.configurable||e===$||e===O||(delete n.value,delete n.writable,n.get=()=>t[$][e]),n}function $e(t){if(Ae()){const e=fe(t);(e._||(e._=Le()))()}}function st(t){return $e(t),Reflect.ownKeys(t)}function Le(t){const[e,n]=T(t,{equals:!1,internal:!0});return e.$=n,e}const lt={get(t,e,n){if(e===le)return t;if(e===$)return n;if(e===ie)return $e(t),n;const o=fe(t),r=o[e];let i=r?r():t[e];if(e===O||e==="__proto__")return i;if(!r){const a=Object.getOwnPropertyDescriptor(t,e);Ae()&&(typeof i!="function"||t.hasOwnProperty(e))&&!(a&&a.get)&&(i=ue(o,e,i)())}return y(i)?Fe(i):i},has(t,e){return e===le||e===$||e===ie||e===O||e==="__proto__"?!0:(this.get(t,e,t),e in t)},set(){return!0},deleteProperty(){return!0},ownKeys:st,getOwnPropertyDescriptor:at};function K(t,e,n,o=!1){if(!o&&t[e]===n)return;const r=t[e],i=t.length;n===void 0?delete t[e]:t[e]=n;let a=fe(t),s;if((s=ue(a,e,r))&&s.$(()=>n),Array.isArray(t)&&t.length!==i){for(let u=t.length;u<i;u++)(s=a[u])&&s.$();(s=ue(a,"length",i))&&s.$(t.length)}(s=a._)&&s.$()}function xe(t,e){const n=Object.keys(e);for(let o=0;o<n.length;o+=1){const r=n[o];K(t,r,e[r])}}function ut(t,e){if(typeof e=="function"&&(e=e(t)),e=z(e),Array.isArray(e)){if(t===e)return;let n=0,o=e.length;for(;n<o;n++){const r=e[n];t[n]!==r&&K(t,n,r)}K(t,"length",o)}else xe(t,e)}function E(t,e,n=[]){let o,r=t;if(e.length>1){o=e.shift();const a=typeof o,s=Array.isArray(t);if(Array.isArray(o)){for(let u=0;u<o.length;u++)E(t,[o[u]].concat(e),n);return}else if(s&&a==="function"){for(let u=0;u<t.length;u++)o(t[u],u)&&E(t,[u].concat(e),n);return}else if(s&&a==="object"){const{from:u=0,to:c=t.length-1,by:l=1}=o;for(let h=u;h<=c;h+=l)E(t,[h].concat(e),n);return}else if(e.length>1){E(t[o],e,[o].concat(n));return}r=t[o],n=[o].concat(n)}let i=e[0];typeof i=="function"&&(i=i(r,n),i===r)||o===void 0&&i==null||(i=z(i),o===void 0||y(r)&&y(i)&&!Array.isArray(i)?xe(r,i):K(t,o,i))}function ct(...[t,e]){const n=z(t||{}),o=Array.isArray(n),r=Fe(n);function i(...a){Ue(()=>{o&&a.length===1?ut(n,a[0]):E(n,a)})}return[r,i]}const dt={ad:"Andorra",ae:"United Arab Emirates",af:"Afghanistan",ag:"Antigua and Barbuda",al:"Albania",am:"Armenia",ao:"Angola",ar:"Argentina",at:"Austria",au:"Australia",aw:"Aruba",az:"Azerbaijan",ba:"Bosnia and Herzegovina",bb:"Barbados",bd:"Bangladesh",be:"Belgium",bf:"Burkina Faso",bg:"Bulgaria",bh:"Bahrain",bi:"Burundi",bj:"Benin",bm:"Bermuda",bn:"Brunei",bo:"Bolivia",br:"Brazil",bs:"Bahamas",bt:"Bhutan",bw:"Botswana",by:"Belarus",bz:"Belize",ca:"Canada",cd:"DR Congo",cf:"Central African Republic",cg:"Republic of the Congo",ch:"Switzerland",ci:"Ivory Coast (Côte d'Ivoire)",cl:"Chile",cm:"Cameroon",cn:"China",co:"Colombia",cr:"Costa Rica",cu:"Cuba",cv:"Cape Verde",cy:"Cyprus",cz:"Czechia",de:"Germany",dj:"Djibouti",dk:"Denmark",dm:"Dominica",do:"Dominican Republic",dz:"Algeria",ec:"Ecuador",ee:"Estonia",eg:"Egypt",er:"Eritrea",es:"Spain",et:"Ethiopia",fi:"Finland",fj:"Fiji",fm:"Micronesia",fr:"France",ga:"Gabon",gb:"United Kingdom","gb-eng":"England",gd:"Grenada",ge:"Georgia",gf:"French Guiana",gh:"Ghana",gl:"Greenland",gm:"Gambia",gn:"Guinea",gq:"Equatorial Guinea",gr:"Greece",gt:"Guatemala",gw:"Guinea-Bissau",gy:"Guyana",hn:"Honduras",hr:"Croatia",ht:"Haiti",hu:"Hungary",id:"Indonesia",ie:"Ireland",il:"Israel",in:"India",iq:"Iraq",ir:"Iran",is:"Iceland",it:"Italy",jm:"Jamaica",jo:"Jordan",jp:"Japan",ke:"Kenya",kg:"Kyrgyzstan",kh:"Cambodia",ki:"Kiribati",km:"Comoros",kn:"Saint Kitts and Nevis",kp:"North Korea",kr:"South Korea",kw:"Kuwait",kz:"Kazakhstan",la:"Laos",lb:"Lebanon",lc:"Saint Lucia",li:"Liechtenstein",lk:"Sri Lanka",lr:"Liberia",ls:"Lesotho",lt:"Lithuania",lu:"Luxembourg",lv:"Latvia",ly:"Libya",ma:"Morocco",mc:"Monaco",md:"Moldova",me:"Montenegro",mf:"Saint Martin",mg:"Madagascar",mh:"Marshall Islands",mk:"North Macedonia",ml:"Mali",mm:"Myanmar",mn:"Mongolia",mr:"Mauritania",mt:"Malta",mu:"Mauritius",mv:"Maldives",mw:"Malawi",mx:"Mexico",my:"Malaysia",mz:"Mozambique",na:"Namibia",ne:"Niger",ng:"Nigeria",ni:"Nicaragua",nl:"Netherlands",no:"Norway",np:"Nepal",nr:"Nauru",nz:"New Zealand",om:"Oman",pa:"Panama",pe:"Peru",pg:"Papua New Guinea",ph:"Philippines",pk:"Pakistan",pl:"Poland",pt:"Portugal",pw:"Palau",py:"Paraguay",qa:"Qatar",ro:"Romania",rs:"Serbia",ru:"Russia",rw:"Rwanda",sa:"Saudi Arabia",sb:"Solomon Islands",sc:"Seychelles",sd:"Sudan",se:"Sweden",sg:"Singapore",si:"Slovenia",sk:"Slovakia",sl:"Sierra Leone",sm:"San Marino",sn:"Senegal",so:"Somalia",sr:"Suriname",ss:"South Sudan",st:"Sao Tome and Principe (São Tomé and Príncipe)",sv:"El Salvador",sy:"Syria",sz:"Eswatini (Swaziland)",td:"Chad",tg:"Togo",th:"Thailand",tj:"Tajikistan",tk:"Tokelau",tl:"Timor-Leste",tm:"Turkmenistan",tn:"Tunisia",to:"Tonga",tr:"Turkey",tt:"Trinidad and Tobago",tv:"Tuvalu",tw:"Taiwan",tz:"Tanzania",ua:"Ukraine",ug:"Uganda",us:"United States",uy:"Uruguay",uz:"Uzbekistan",va:"Vatican City (Holy See)",vc:"Saint Vincent and the Grenadines",ve:"Venezuela",vn:"Vietnam",vu:"Vanuatu",ws:"Samoa",xk:"Kosovo",ye:"Yemen",za:"South Africa",zm:"Zambia",zw:"Zimbabwe"},Be=240,De=new Map(Object.entries(dt).map(([t,e])=>[`https://flagcdn.com/h${Be}/${t}.jpg`,e]));class he{#t=!1;#e;question_count;static complete;constructor(e){if(e<1||e%1)throw"Question count must be an integer greater than 0.";this.question_count=e,this.#e=0}get current_question(){return this.#e===null&&this.next_question(),this.#e}get is_complete(){return this.#t}next_question(){return this.current_question+1===this.question_count?(this.#t=!0,he.complete):(this.#e+=1,this.#e)}register(e){return!0}}function ft(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}}class U extends he{#t;#e=[];#n=3;unasked_questions;focus_questions;comfortable_questions;stats;constructor(e){super(e);const n=[...Array(e).keys()];ft(n),this.unasked_questions=n,this.focus_questions=[],this.comfortable_questions=[];const o={count:0,correct:0,streak:1,weight:1};this.stats=n.map(r=>Object.create(o)),this.#t=null}get is_complete(){for(const e of this.stats)if(e.streak<this.#n)return!1;return!0}get current_question(){return this.#t===null?this.next_question():this.#t}get focus_stats(){return new Map(this.focus_questions.map(e=>[e,this.stats[e]]))}#o(){this.stats.forEach((e,n)=>{if(console.log(n,e),e.count>0){const o=e.count>0?e.correct/e.count:0;console.log(`${n}: ${o*100}%: ${JSON.stringify(e)}`)}})}next_question(){const e=this.focus_questions.length,n=e/(e+.5);let o;if(Math.random()<n||this.unasked_questions.length===0&&this.comfortable_questions.length===0){const r=Math.floor(Math.random()*this.focus_questions.length);o=this.focus_questions.splice(r,1)[0],this.#e.push(this.#t),this.#e=this.focus_questions}else if(this.unasked_questions.length>0)o=this.unasked_questions.pop(),this.#t!==null&&this.#e.push(this.#t),this.#e=this.unasked_questions;else{const r=Math.floor(Math.random()*this.comfortable_questions.length);o=this.comfortable_questions.splice(r,1)[0],this.#e.push(this.#t),this.#e=this.comfortable_questions}return this.stats[o].count+=1,this.#t=o,o}register(e){const n=this.stats[this.current_question];return this.#e=this.focus_questions,e?(n.correct+=1,n.streak+=1,n.streak>=2&&(this.#e=this.comfortable_questions)):n.streak=0,n.weight=n.streak*n.correct,e}}const Ve="_standard_text_vm530_14",ht="_title_vm530_19 _standard_text_vm530_14",pt="_large_text_vm530_25 _standard_text_vm530_14",gt="_enormous_text_vm530_30 _standard_text_vm530_14",mt="_content_box_vm530_35";const _t="_start_button_vm530_57 _base_button_vm530_50 _standard_border_vm530_45 _standard_text_vm530_14",wt="_quit_button_vm530_66 _base_button_vm530_50 _standard_border_vm530_45 _standard_text_vm530_14",bt="_quiz_list_item_vm530_80 _standard_border_vm530_45 _standard_text_vm530_14";const St="_column_layout_vm530_106",At="_training_buttons_vm530_113 _row_layout_vm530_101",Ct="_image_renderer_vm530_120",vt="_verdict_vm530_124 _standard_text_vm530_14";const Mt=p("<p>Loading..."),kt=p("<img>"),Tt=function(t){const[e,n]=T(!1);return de(()=>n(!t.question)),[g(Ke,{get when(){return!e()},get children(){return Mt()}}),(()=>{const o=kt();return o.addEventListener("load",r=>n(!0,r)),I(o,"height",Be),L(r=>{const i=t.question,a=Ct,s=e()?"visible":"hidden";return i!==r._v$&&I(o,"src",r._v$=i),a!==r._v$2&&S(o,r._v$2=a),s!==r._v$3&&((r._v$3=s)!=null?o.style.setProperty("visibility",s):o.style.removeProperty("visibility")),r},{_v$:void 0,_v$2:void 0,_v$3:void 0}),o})()]};function ce(t,e){const n=o=>o.toLowerCase().replaceAll(" ","");return n(t)===n(e)}function Pt(t,e){return ce(t,e)}function Ft(t,e){return t===e}const Ne=["A#","B#","C#","D#","E#","F#","G#","A","B","C","D","E","F","G","Ab","Bb","Cb","Db","Eb","Fb","Gb"],$t=new Map(Ne.flatMap(t=>{const e="treble",n="bass",o=t[1]||"";return[[[e,`${t}/5`,o],t],[[e,`${t}/4`,o],t],[[n,`${t}/3`,o],t],[[n,`${t}/2`,o],t]]}).concat([[["bass","C/4","#"],"C#"],[["bass","C/4",""],"C"],[["bass","C/4","b"],"Cb"]])),Lt=p("<div>");class xt{constructor(e){const n=window.Vex.Flow.Renderer,o=new n(e,n.Backends.SVG);o.resize(208,350);const r=o.getContext();r.scale(2,2),this.render_context=r}render([e,n,o]){const r=document.querySelectorAll(".vf-stavenote, .vf-stave");for(const w of r)w.remove();const{Accidental:i,Formatter:a,Stave:s,StaveNote:u,Voice:c}=window.Vex.Flow,l=new s(...Object.values({left:1,top:25,width:101}));l.addClef(e),l.setContext(this.render_context).draw();const h=new u({clef:e,keys:[n],duration:"w"});o!==""&&h.addModifier(new i(o));const d=[new c({num_beats:4,beat_value:4}).addTickables([h])];new a().joinVoices(d).format(d,200);for(const w of d)w.draw(this.render_context,l)}}const Bt=function(t){const e=Lt(),n=new xt(e);return de(()=>n.render(t.question)),e},qe=new Map([["Alabama","Montgomery"],["Alaska","Juneau"],["Arizona","Phoenix"],["Arkansas","Little Rock"],["California","Sacramento"],["Colorado","Denver"],["Connecticut","Hartford"],["Delaware","Dover"],["Florida","Tallahassee"],["Georgia","Atlanta"],["Hawaii","Honolulu"],["Idaho","Boise"],["Illinois","Springfield"],["Indiana","Indianapolis"],["Iowa","Des Moines"],["Kansas","Topeka"],["Kentucky","Frankfort"],["Louisiana","Baton Rouge"],["Maine","Augusta"],["Maryland","Annapolis"],["Massachusetts","Boston"],["Michigan","Lansing"],["Minnesota","Saint Paul"],["Mississippi","Jackson"],["Missouri","Jefferson City"],["Montana","Helena"],["Nebraska","Lincoln"],["Nevada","Carson City"],["New Hampshire","Concord"],["New Jersey","Trenton"],["New Mexico","Santa Fe"],["New York","Albany"],["North Carolina","Raleigh"],["North Dakota","Bismarck"],["Ohio","Columbus"],["Oklahoma","Oklahoma City"],["Oregon","Salem"],["Pennsylvania","Harrisburg"],["Rhode Island","Providence"],["South Carolina","Columbia"],["South Dakota","Pierre"],["Tennessee","Nashville"],["Texas","Austin"],["Utah","Salt Lake City"],["Vermont","Montpelier"],["Virginia","Richmond"],["Washington","Olympia"],["West Virginia","Charleston"],["Wisconsin","Madison"],["Wyoming","Cheyenne"]]),Dt=p("<div><p>What's the capital of:</p><h2>"),Vt=t=>(()=>{const e=Dt(),n=e.firstChild,o=n.nextSibling;return S(n,Ve),S(o,pt),b(o,()=>t.question+"?"),e})(),Re=new Map([["あ","a"],["い","i"],["う","u"],["え","e"],["お","o"],["か","ka"],["き","ki"],["く","ku"],["け","ke"],["こ","ko"],["さ","sa"],["し","shi"],["す","su"],["せ","se"],["そ","so"],["た","ta"],["ち","chi"],["つ","tsu"],["て","te"],["と","to"],["な","na"],["に","ni"],["ぬ","nu"],["ね","ne"],["の","no"],["は","ha"],["ひ","hi"],["ふ","fu"],["へ","he"],["ほ","ho"],["ま","ma"],["み","mi"],["む","mu"],["め","me"],["も","mo"],["や","ya"],["ゆ","yu"],["よ","yo"],["ら","ra"],["り","ri"],["る","ru"],["れ","re"],["ろ","ro"],["わ","wa"],["ゐ","wi"],["ゑ","we"],["を","wo"],["ん","n"]]),Nt=p("<div>"),qt=p("<button>/<!>/");function Rt(t){const e={display:"grid",gridTemplateColumns:"repeat(5, 1fr)",gridTemplateRows:"repeat(5, 1fr)","grid-gap":"0.5em"};return(()=>{const n=Nt();return ot(n,e),b(n,g(oe,{get each(){return Array.from(Re.values())},children:(o,r)=>(()=>{const i=qt(),a=i.firstChild,s=a.nextSibling;return s.nextSibling,i.$$click=t.set_response,i.$$clickData=o,i.style.setProperty("padding","0.25em"),b(i,o,s),L(()=>`${r()%5+1}`!=null?i.style.setProperty("grid-column",`${r()%5+1}`):i.style.removeProperty("grid-column")),i})()})),n})()}q(["click"]);const Et=p("<div><p>How do you pronounce:</p><h2>"),It=function(t){return(()=>{const e=Et(),n=e.firstChild,o=n.nextSibling;return S(n,Ve),S(o,gt),b(o,()=>t.question),e})()};var Ee={};(function(t){Object.defineProperty(t,"__esModule",{value:!0}),function(e){e.Unidentified="Unidentified",e.Alt="Alt",e.AltGraph="AltGraph",e.CapsLock="CapsLock",e.Control="Control",e.Fn="Fn",e.FnLock="FnLock",e.Hyper="Hyper",e.Meta="Meta",e.NumLock="NumLock",e.ScrollLock="ScrollLock",e.Shift="Shift",e.Super="Super",e.Symbol="Symbol",e.SymbolLock="SymbolLock",e.Enter="Enter",e.Tab="Tab",e.ArrowDown="ArrowDown",e.ArrowLeft="ArrowLeft",e.ArrowRight="ArrowRight",e.ArrowUp="ArrowUp",e.End="End",e.Home="Home",e.PageDown="PageDown",e.PageUp="PageUp",e.Backspace="Backspace",e.Clear="Clear",e.Copy="Copy",e.CrSel="CrSel",e.Cut="Cut",e.Delete="Delete",e.EraseEof="EraseEof",e.ExSel="ExSel",e.Insert="Insert",e.Paste="Paste",e.Redo="Redo",e.Undo="Undo",e.Accept="Accept",e.Again="Again",e.Attn="Attn",e.Cancel="Cancel",e.ContextMenu="ContextMenu",e.Escape="Escape",e.Execute="Execute",e.Find="Find",e.Finish="Finish",e.Help="Help",e.Pause="Pause",e.Play="Play",e.Props="Props",e.Select="Select",e.ZoomIn="ZoomIn",e.ZoomOut="ZoomOut",e.BrightnessDown="BrightnessDown",e.BrightnessUp="BrightnessUp",e.Eject="Eject",e.LogOff="LogOff",e.Power="Power",e.PowerOff="PowerOff",e.PrintScreen="PrintScreen",e.Hibernate="Hibernate",e.Standby="Standby",e.WakeUp="WakeUp",e.AllCandidates="AllCandidates",e.Alphanumeric="Alphanumeric",e.CodeInput="CodeInput",e.Compose="Compose",e.Convert="Convert",e.Dead="Dead",e.FinalMode="FinalMode",e.GroupFirst="GroupFirst",e.GroupLast="GroupLast",e.GroupNext="GroupNext",e.GroupPrevious="GroupPrevious",e.ModeChange="ModeChange",e.NextCandidate="NextCandidate",e.NonConvert="NonConvert",e.PreviousCandidate="PreviousCandidate",e.Process="Process",e.SingleCandidate="SingleCandidate",e.HangulMode="HangulMode",e.HanjaMode="HanjaMode",e.JunjaMode="JunjaMode",e.Eisu="Eisu",e.Hankaku="Hankaku",e.Hiragana="Hiragana",e.HiraganaKatakana="HiraganaKatakana",e.KanaMode="KanaMode",e.KanjiMode="KanjiMode",e.Katakana="Katakana",e.Romaji="Romaji",e.Zenkaku="Zenkaku",e.ZenkakuHanaku="ZenkakuHanaku",e.F1="F1",e.F2="F2",e.F3="F3",e.F4="F4",e.F5="F5",e.F6="F6",e.F7="F7",e.F8="F8",e.F9="F9",e.F10="F10",e.F11="F11",e.F12="F12",e.F13="F13",e.F14="F14",e.F15="F15",e.F16="F16",e.F17="F17",e.F18="F18",e.F19="F19",e.F20="F20",e.Soft1="Soft1",e.Soft2="Soft2",e.Soft3="Soft3",e.Soft4="Soft4",e.AppSwitch="AppSwitch",e.Call="Call",e.Camera="Camera",e.CameraFocus="CameraFocus",e.EndCall="EndCall",e.GoBack="GoBack",e.GoHome="GoHome",e.HeadsetHook="HeadsetHook",e.LastNumberRedial="LastNumberRedial",e.Notification="Notification",e.MannerMode="MannerMode",e.VoiceDial="VoiceDial",e.ChannelDown="ChannelDown",e.ChannelUp="ChannelUp",e.MediaFastForward="MediaFastForward",e.MediaPause="MediaPause",e.MediaPlay="MediaPlay",e.MediaPlayPause="MediaPlayPause",e.MediaRecord="MediaRecord",e.MediaRewind="MediaRewind",e.MediaStop="MediaStop",e.MediaTrackNext="MediaTrackNext",e.MediaTrackPrevious="MediaTrackPrevious",e.AudioBalanceLeft="AudioBalanceLeft",e.AudioBalanceRight="AudioBalanceRight",e.AudioBassDown="AudioBassDown",e.AudioBassBoostDown="AudioBassBoostDown",e.AudioBassBoostToggle="AudioBassBoostToggle",e.AudioBassBoostUp="AudioBassBoostUp",e.AudioBassUp="AudioBassUp",e.AudioFaderFront="AudioFaderFront",e.AudioFaderRear="AudioFaderRear",e.AudioSurroundModeNext="AudioSurroundModeNext",e.AudioTrebleDown="AudioTrebleDown",e.AudioTrebleUp="AudioTrebleUp",e.AudioVolumeDown="AudioVolumeDown",e.AudioVolumeMute="AudioVolumeMute",e.AudioVolumeUp="AudioVolumeUp",e.MicrophoneToggle="MicrophoneToggle",e.MicrophoneVolumeDown="MicrophoneVolumeDown",e.MicrophoneVolumeMute="MicrophoneVolumeMute",e.MicrophoneVolumeUp="MicrophoneVolumeUp",e.TV="TV",e.TV3DMode="TV3DMode",e.TVAntennaCable="TVAntennaCable",e.TVAudioDescription="TVAudioDescription",e.TVAudioDescriptionMixDown="TVAudioDescriptionMixDown",e.TVAudioDescriptionMixUp="TVAudioDescriptionMixUp",e.TVContentsMenu="TVContentsMenu",e.TVDataService="TVDataService",e.TVInput="TVInput",e.TVInputComponent1="TVInputComponent1",e.TVInputComponent2="TVInputComponent2",e.TVInputComposite1="TVInputComposite1",e.TVInputComposite2="TVInputComposite2",e.TVInputHDMI1="TVInputHDMI1",e.TVInputHDMI2="TVInputHDMI2",e.TVInputHDMI3="TVInputHDMI3",e.TVInputHDMI4="TVInputHDMI4",e.TVInputVGA1="TVInputVGA1",e.TVMediaContext="TVMediaContext",e.TVNetwork="TVNetwork",e.TVNumberEntry="TVNumberEntry",e.TVPower="TVPower",e.TVRadioService="TVRadioService",e.TVSatellite="TVSatellite",e.TVSatelliteBS="TVSatelliteBS",e.TVSatelliteCS="TVSatelliteCS",e.TVSatelliteToggle="TVSatelliteToggle",e.TVTerrestrialAnalog="TVTerrestrialAnalog",e.TVTerrestrialDigital="TVTerrestrialDigital",e.TVTimer="TVTimer",e.AVRInput="AVRInput",e.AVRPower="AVRPower",e.ColorF0Red="ColorF0Red",e.ColorF1Green="ColorF1Green",e.ColorF2Yellow="ColorF2Yellow",e.ColorF3Blue="ColorF3Blue",e.ColorF4Grey="ColorF4Grey",e.ColorF5Brown="ColorF5Brown",e.ClosedCaptionToggle="ClosedCaptionToggle",e.Dimmer="Dimmer",e.DisplaySwap="DisplaySwap",e.DVR="DVR",e.Exit="Exit",e.FavoriteClear0="FavoriteClear0",e.FavoriteClear1="FavoriteClear1",e.FavoriteClear2="FavoriteClear2",e.FavoriteClear3="FavoriteClear3",e.FavoriteRecall0="FavoriteRecall0",e.FavoriteRecall1="FavoriteRecall1",e.FavoriteRecall2="FavoriteRecall2",e.FavoriteRecall3="FavoriteRecall3",e.FavoriteStore0="FavoriteStore0",e.FavoriteStore1="FavoriteStore1",e.FavoriteStore2="FavoriteStore2",e.FavoriteStore3="FavoriteStore3",e.Guide="Guide",e.GuideNextDay="GuideNextDay",e.GuidePreviousDay="GuidePreviousDay",e.Info="Info",e.InstantReplay="InstantReplay",e.Link="Link",e.ListProgram="ListProgram",e.LiveContent="LiveContent",e.Lock="Lock",e.MediaApps="MediaApps",e.MediaAudioTrack="MediaAudioTrack",e.MediaLast="MediaLast",e.MediaSkipBackward="MediaSkipBackward",e.MediaSkipForward="MediaSkipForward",e.MediaStepBackward="MediaStepBackward",e.MediaStepForward="MediaStepForward",e.MediaTopMenu="MediaTopMenu",e.NavigateIn="NavigateIn",e.NavigateNext="NavigateNext",e.NavigateOut="NavigateOut",e.NavigatePrevious="NavigatePrevious",e.NextFavoriteChannel="NextFavoriteChannel",e.NextUserProfile="NextUserProfile",e.OnDemand="OnDemand",e.Pairing="Pairing",e.PinPDown="PinPDown",e.PinPMove="PinPMove",e.PinPToggle="PinPToggle",e.PinPUp="PinPUp",e.PlaySpeedDown="PlaySpeedDown",e.PlaySpeedReset="PlaySpeedReset",e.PlaySpeedUp="PlaySpeedUp",e.RandomToggle="RandomToggle",e.RcLowBattery="RcLowBattery",e.RecordSpeedNext="RecordSpeedNext",e.RfBypass="RfBypass",e.ScanChannelsToggle="ScanChannelsToggle",e.ScreenModeNext="ScreenModeNext",e.Settings="Settings",e.SplitScreenToggle="SplitScreenToggle",e.STBInput="STBInput",e.STBPower="STBPower",e.Subtitle="Subtitle",e.Teletext="Teletext",e.VideoModeNext="VideoModeNext",e.Wink="Wink",e.ZoomToggle="ZoomToggle",e.SpeechCorrectionList="SpeechCorrectionList",e.SpeechInputToggle="SpeechInputToggle",e.Close="Close",e.New="New",e.Open="Open",e.Print="Print",e.Save="Save",e.SpellCheck="SpellCheck",e.MailForward="MailForward",e.MailReply="MailReply",e.MailSend="MailSend",e.LaunchCalculator="LaunchCalculator",e.LaunchCalendar="LaunchCalendar",e.LaunchContacts="LaunchContacts",e.LaunchMail="LaunchMail",e.LaunchMediaPlayer="LaunchMediaPlayer",e.LaunchMusicPlayer="LaunchMusicPlayer",e.LaunchMyComputer="LaunchMyComputer",e.LaunchPhone="LaunchPhone",e.LaunchScreenSaver="LaunchScreenSaver",e.LaunchSpreadsheet="LaunchSpreadsheet",e.LaunchWebBrowser="LaunchWebBrowser",e.LaunchWebCam="LaunchWebCam",e.LaunchWordProcessor="LaunchWordProcessor",e.LaunchApplication1="LaunchApplication1",e.LaunchApplication2="LaunchApplication2",e.LaunchApplication3="LaunchApplication3",e.LaunchApplication4="LaunchApplication4",e.LaunchApplication5="LaunchApplication5",e.LaunchApplication6="LaunchApplication6",e.LaunchApplication7="LaunchApplication7",e.LaunchApplication8="LaunchApplication8",e.LaunchApplication9="LaunchApplication9",e.LaunchApplication10="LaunchApplication10",e.LaunchApplication11="LaunchApplication11",e.LaunchApplication12="LaunchApplication12",e.LaunchApplication13="LaunchApplication13",e.LaunchApplication14="LaunchApplication14",e.LaunchApplication15="LaunchApplication15",e.LaunchApplication16="LaunchApplication16",e.BrowserBack="BrowserBack",e.BrowserFavorites="BrowserFavorites",e.BrowserForward="BrowserForward",e.BrowserHome="BrowserHome",e.BrowserRefresh="BrowserRefresh",e.BrowserSearch="BrowserSearch",e.BrowserStop="BrowserStop",e.Decimal="Decimal",e.Key11="Key11",e.Key12="Key12",e.Multiply="Multiply",e.Add="Add",e.Divide="Divide",e.Subtract="Subtract",e.Separator="Separator"}(t.Key||(t.Key={}))})(Ee);const Ot=p('<div><select title="Please select your answer here."></select><button title="Click here to submit your answer.">Submit'),zt=p("<option>");function Ie(t){const[e,n]=T();return(()=>{const o=Ot(),r=o.firstChild,i=r.nextSibling;return r.$$keydown=a=>{a.key===Ee.Key.Enter&&t.set_response(e())},r.addEventListener("change",a=>n(a.currentTarget.value)),rt(a=>je(()=>a?.focus()),r),b(r,g(oe,{get each(){return t.items},children:a=>(()=>{const s=zt();return s.value=a,b(s,a),s})()})),i.$$click=()=>t.set_response(e()),o})()}q(["keydown","click"]);function Ht(t){return g(Ie,{get items(){return Array.from(De.values()).sort()},get set_response(){return t.set_response}})}function Gt(t){return g(Ie,{get items(){return Array.from(qe.values()).sort()},get set_response(){return t.set_response}})}const Ut=p("<div>"),jt=p("<button>");function Wt(t){return(()=>{const e=Ut();return e.style.setProperty("display","grid"),b(e,g(oe,{each:Ne,children:(n,o)=>(()=>{const r=jt();return r.$$click=t.set_response,r.$$clickData=n,r.style.setProperty("font-size","1.5em"),r.style.setProperty("padding","0.25em"),b(r,n),L(()=>`${o()%7+1}`!=null?r.style.setProperty("grid-column",`${o()%7+1}`):r.style.removeProperty("grid-column")),r})()})),e})()}q(["click"]);function j(t){return function({grade:n,regrades:o,answer:r}){if(n)return t.innerText="Correct!",!1;switch(o){case 0:return t.innerText=`Hint: ${r[0]}`,!0;default:return t.innerText=`The correct answer was: ${r}`,!1}}}const Oe=[{name:"Country flags",answer_key:De,evaluate:ce,response_fetcher:Ht,on_grade:j,renderer:Tt,training_algorithm:U},{name:"Music notation",answer_key:$t,evaluate:Pt,response_fetcher:Wt,on_grade:j,renderer:Bt,training_algorithm:U},{name:"U.S. State capitals",answer_key:qe,evaluate:ce,response_fetcher:Gt,on_grade:j,renderer:Vt,training_algorithm:U},{name:"Hiragana",answer_key:Re,evaluate:Ft,response_fetcher:Rt,on_grade:j,renderer:It,training_algorithm:U}],Qt=Oe[0],Zt=p("<div>"),Jt=p('<div tabindex="-1"><label></label><input type="radio" name="quiz">'),Yt=p("<form><button>Start"),[Xt,yt]=T(0);function Kt(t){const e=([n,o])=>{t.setQuiz(n),yt(o)};return(()=>{const n=Zt();return S(n,St),b(n,g(oe,{each:Oe,children:(o,r)=>{const i=String(r());return(()=>{const a=Jt(),s=a.firstChild,u=s.nextSibling;return a.$$click=e,a.$$clickData=[o,r],S(a,bt),I(s,"for",i),b(s,()=>o.name),I(u,"id",i),u.style.setProperty("float","right"),L(()=>u.checked=r()===Xt()),a})()}})),n})()}function en(t){function e(){t.setScreenName("Train")}return[g(Kt,{get setQuiz(){return t.setQuiz}}),(()=>{const n=Yt(),o=n.firstChild;return o.$$click=e,S(o,_t),n})()]}q(["click"]);class tn{answers;evaluate;questions;set_question;on_grade;fetch_response;trainer;constructor({answer_key:e,evaluate:n,fetch_response:o,on_grade:r,set_question:i,training_algorithm:a}){const s=[...e.keys()],u=[...e.values()];this.questions=s,this.answers=u,this.trainer=new a(s.length),this.on_grade=r||(()=>!1),this.set_question=i,this.fetch_response=o,this.evaluate=n}get answer(){return this.answers[this.trainer.current_question]}get question(){return this.questions[this.trainer.current_question]}async train(){for(;!this.trainer.is_complete;){this.set_question(this.question);let e;{let n=!1,o=0;do{let r=await this.fetch_response();e=this.evaluate(r,this.answer),n=this.on_grade({grade:e,regrades:o,question:this.question,answer:this.answer}),o++}while(n)}this.trainer.register(e),this.trainer.next_question()}}}const we=p("<div>"),nn=p('<form action="" id="answer_form"><div><button type="button">Quit');function on(t){const[e,n]=T(),[o,r]=T();document.createElement("div");const i=(()=>{const c=we();return S(c,vt),c})();async function a(){return new Promise(c=>{Ge(()=>{c(e()),n(void 0)})(()=>e())})}const s=t.quiz.on_grade?t.quiz.on_grade(i):void 0,u={...t.quiz,set_question:r,fetch_response:a,on_grade:s};return new tn(u).train().then(()=>t.setScreen("Score")),[i,(()=>{const c=we();return b(c,g(t.quiz.renderer,{get question(){return o()}})),c})(),(()=>{const c=nn(),l=c.firstChild,h=l.firstChild;return c.addEventListener("submit",d=>d.preventDefault()),c.style.setProperty("display","flex"),c.style.setProperty("flex-direction","column"),c.style.setProperty("align-items","center"),b(c,g(t.quiz.response_fetcher,{set_response:n}),l),S(l,At),h.$$click=()=>t.setScreen("Start"),S(h,wt),c})()]}q(["click"]);const rn=p("<h2>Complete!"),an=p("<button>Restart");function sn(t){return[rn(),(()=>{const e=an();return e.$$click=()=>t.setScreen("Start"),e})()]}q(["click"]);const ln=p("<h1>Memory Trainer"),un=p('<section id="memory_trainer">');function cn(){const[t,e]=ct({...Qt}),[n,o]=T("Start");return[(()=>{const r=ln();return S(r,ht),r})(),(()=>{const r=un();return S(r,mt),b(r,g(et,{get fallback(){return g(en,{setScreenName:o,setQuiz:e})},get children(){return[g(ge,{get when(){return n()==="Train"},get children(){return g(on,{setScreen:o,quiz:t})}}),g(ge,{get when(){return n()==="Score"},get children(){return g(sn,{setScreen:o})}})]}})),r})()]}const dn=document.getElementById("memory_trainer_app_root");nt(()=>g(cn,{}),dn);