!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){const r=n(1),o=[{name:"Personal Website",url:"https://airloaf.github.io/"},{name:"LinkedIn",url:"https://www.linkedin.com/in/vikram-singh-ce/"},{name:"GitHub",url:"https://github.com/airloaf"}];addEventListener("fetch",e=>{e.respondWith(async function(e){const t=new r;t.get("/links",e=>function(e){const t=JSON.stringify(o);return new Response(t,{headers:{"content-type":"application/json"}})}()),t.get("/.*",e=>async function(e){response=await fetch("https://static-links-page.signalnerve.workers.dev",{headers:{"content-type":"text/html"}});const t=(new HTMLRewriter).on("div#links",new s(o)).transform(response),n=(new HTMLRewriter).on("div#profile",new i).transform(t),r=(new HTMLRewriter).on("h1#name",new a("Vikram Singh")).transform(n);return(new HTMLRewriter).on("img#avatar",new u("https://avatars2.githubusercontent.com/u/13282682?s=460&u=a5689107f5785c9a98338b7624bfe0cb8bf3c279&v=4")).transform(r)}());return await t.route(e)}(e.request))});class s{constructor(e){this.links=e}async element(e){this.links.forEach(t=>{e.append(`<a href="${t.url}">${t.name}</a>`,{html:!0})})}}class i{async element(e){e.removeAttribute("style")}}class a{constructor(e){this.name=e}async element(e){e.append(this.name)}}class u{constructor(e){this.imageURL=e}async element(e){e.setAttribute("src",this.imageURL)}}},function(e,t){const n=e=>t=>t.method.toLowerCase()===e.toLowerCase(),r=n("connect"),o=n("delete"),s=n("get"),i=n("head"),a=n("options"),u=n("patch"),c=n("post"),l=n("put"),h=n("trace"),d=e=>t=>{const n=new URL(t.url).pathname;return(n.match(e)||[])[0]===n};e.exports=class{constructor(){this.routes=[]}handle(e,t){return this.routes.push({conditions:e,handler:t}),this}connect(e,t){return this.handle([r,d(e)],t)}delete(e,t){return this.handle([o,d(e)],t)}get(e,t){return this.handle([s,d(e)],t)}head(e,t){return this.handle([i,d(e)],t)}options(e,t){return this.handle([a,d(e)],t)}patch(e,t){return this.handle([u,d(e)],t)}post(e,t){return this.handle([c,d(e)],t)}put(e,t){return this.handle([l,d(e)],t)}trace(e,t){return this.handle([h,d(e)],t)}all(e){return this.handle([],e)}route(e){const t=this.resolve(e);return t?t.handler(e):new Response("resource not found",{status:404,statusText:"not found",headers:{"content-type":"text/plain"}})}resolve(e){return this.routes.find(t=>!(t.conditions&&(!Array.isArray(t)||t.conditions.length))||("function"==typeof t.conditions?t.conditions(e):t.conditions.every(t=>t(e))))}}}]);