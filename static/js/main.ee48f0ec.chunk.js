(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{100:function(e,t,n){"use strict";n.r(t);var a,r=n(0),i=n.n(r),c=n(12),o=n.n(c),s=n(44),u=n(45),l=n(51),p=n(46),d=n(53),m=n(106),f=n(107),h=n(109),b=n(8),g={isOpenListModal:!1,setIsOpenListModal:function(e,t){e.isOpenListModal=t}},v=n(18),w=n.n(v),y=n(24),O=n(47),E=n.n(O).a.create({baseURL:"/training-reading-and-listening"}),j=[{link:"https://www.youtube.com/watch?time_continue=0&v=5VE9nihee7o",subtitle:"[DownSub.com] Hillary Clinton_ The Vox Conversation.srt"},{link:"https://youtu.be/quJdL9ggETI",subtitle:"[DownSub.com] Margaret Gould Stewart_ How giant websites design for you (and a billion others, too).srt"},{link:"https://youtu.be/H2QxFM9y0tY",subtitle:"[DownSub.com] The disarming case to act right now on climate change _ Greta Thunberg.srt"},{link:"https://youtu.be/pj8n78AuN3w",subtitle:"[DownSub.com] YouTube's Rules Don't Apply to Everyone.srt"},{link:"https://www.youtube.com/watch?v=PjTc-EiwHqc",subtitle:"[DownSub.com] Who I'm Voting for President re_ Casey Neistat.srt"},{link:"https://youtu.be/jAhjPd4uNFY",subtitle:"[DownSub.com] Genetic Engineering Will Change Everything Forever \u2013 CRISPR.srt"},{link:"https://youtu.be/DHg5j9cTb2k?t=32",subtitle:"[DownSub.com] Genetic Engineering Will Change Everything Forever \u2013 CRISPR.srt"}];function k(e){var t=e.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/);return String(t[1])}!function(e){e.YOUTUBE="youtube",e.AUDIO="audio"}(a||(a={}));var I={items:[],isFetching:!0,add:function(e,t){e.items.push(t)},delete:function(e,t){var n=e.items.findIndex(function(e){return e.id===t});e.items.splice(n,1)},setItems:function(e,t){e.items=t},setFetching:function(e,t){e.isFetching=t},fetch:Object(b.d)(function(){var e=Object(y.a)(w.a.mark(function e(t){var n,r,i,c,o,s,u;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.setFetching(!0),!(n=localStorage.getItem("app_items"))){e.next=7;break}return r=JSON.parse(n),t.setItems(r),t.setFetching(!1),e.abrupt("return");case 7:i=[],c=0;case 9:if(!(c<j.length)){e.next=19;break}return o=j[c],e.next=13,E.get("/".concat(o.subtitle));case 13:s=e.sent,u={id:c,plainSubtitles:s.data,source:a.YOUTUBE,url:k(o.link)},i.push(u);case 16:c++,e.next=9;break;case 19:t.setItems(i),t.syncWithLocalstorage(null),t.setFetching(!1);case 22:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),syncWithLocalstorage:function(e){localStorage.setItem("app_items",JSON.stringify(e.items))},listeners:Object(b.c)(function(e){e(I.delete,function(e){e.syncWithLocalstorage(null)})})},S={app:g,tasks:I},L=n(21),x=n(32),T=new Promise(function(e){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),window.onYouTubeIframeAPIReady=function(){return e(window.YT)}}),M=function(e){var t=e.id,n=e.videoId,a=e.events,r=e.playerVars;return new Promise(function(){var e=Object(y.a)(w.a.mark(function e(i,c){var o,s,u;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,T;case 2:return o=e.sent,s=Object(x.a)({},a,{onReady:function(e){i(u),a.onReady&&a.onReady(e)}}),u=new o.Player(t,{videoId:n,height:"390",width:"640",playerVars:r,events:s}),e.abrupt("return",u);case 6:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}())},C=0;var _=function(e){var t,n=Object(r.useState)(null),a=Object(L.a)(n,2),c=a[0],o=a[1],s=Object(r.useState)(-1),u=Object(L.a)(s,2),l=u[0],p=u[1],d=Object(r.useMemo)(function(){return function(e){var t=++C;return String(e)+t}("unq-yt-id-")},[]),m=!(!(t=e)||0===t.length)&&i.a.createElement("div",{id:d});return Object(r.useEffect)(function(){if(console.log("effect"),e){var t={id:d,videoId:e,events:{},playerVars:{}};return c?c.cueVideoById(e):function(){n.apply(this,arguments)}(),function(){console.log("return")}}function n(){return(n=Object(y.a)(w.a.mark(function e(){var n;return w.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M(Object(x.a)({},t,{events:{onStateChange:function(){p(n.getPlayerState())}}}));case 2:return n=e.sent,e.abrupt("return",o(n));case 4:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}},[e]),[m,c,l]},F=n(108),R=n(103);var P=function(e){Object(b.e)(function(e){return{setIsOpenListModal:e.app.setIsOpenListModal}}).setIsOpenListModal;var t=Object(b.f)(function(e){return e.tasks}),n=e.match.params.id;if(!n)return i.a.createElement(F.a,{to:"/play/id"});var a=t.items.map(function(e){return i.a.createElement("li",{key:e.url},i.a.createElement(R.a,{to:"/play/".concat(e.url)},e.url))}),r=_(n),c=Object(L.a)(r,1)[0],o=_("jAhjPd4uNFY"),s=Object(L.a)(o,1)[0];return i.a.createElement("div",null,c,i.a.createElement("hr",null),i.a.createElement("ul",null,a),i.a.createElement("hr",null),s)},D=n(52),N=n(104),A=n(105),Y=n(26),V=n(50),B=n.n(V);function H(e){var t=Object(b.f)(function(e){return e.tasks}),n=Object(b.f)(function(e){return e.app.isOpenListModal}),a=Object(b.e)(function(e){return{onFetch:e.tasks.fetch,onDelete:e.tasks.delete,setIsOpenListModal:e.app.setIsOpenListModal}}),c=a.onFetch,o=a.onDelete,s=a.setIsOpenListModal;function u(){return t.items.map(function(e,t){var n="https://i.ytimg.com/vi/".concat(e.url,"/hqdefault.jpg"),a="https://youtu.be/".concat(e.url);return i.a.createElement("tr",{onClick:function(){return e.id,void console.log("handleTableRowClick")},key:t},i.a.createElement("td",{style:{width:120,textAlign:"center"}},i.a.createElement("a",{href:a,target:"_blank"},i.a.createElement("img",{className:B.a.image,src:n,alt:""}))),i.a.createElement("td",null,i.a.createElement("h4",null,"Task # ",e.id)),i.a.createElement("td",{style:{width:80,textAlign:"center",verticalAlign:"middle"}},i.a.createElement(D.a,{intent:"danger",icon:"delete",onClick:function(t){return function(e,t){o(t),e.stopPropagation()}(t,e.id)}})))})}return Object(r.useEffect)(function(){c()},[]),i.a.createElement("div",null,i.a.createElement(A.a,{style:{width:"70%"},icon:"info-sign",title:"List",isOpen:n,onClose:function(){return s(!1)},usePortal:!0,className:Y.a.OVERLAY_SCROLL_CONTAINER},i.a.createElement("div",{style:{overflow:"scroll",height:"70vh"}},i.a.createElement(N.a,{style:{width:"100%"},interactive:!0,bordered:!0},i.a.createElement("tbody",null,u())))))}n(98),n(99);function U(e){var t=Object(b.e)(function(e){return{setIsOpenListModal:e.app.setIsOpenListModal}}).setIsOpenListModal;return console.log("props = ",e),Object(r.useEffect)(function(){t(!0)},[]),i.a.createElement("div",null,i.a.createElement("h1",null,"Home page!"))}h.a.onlyShowFocusOnTabs();var W=Object(b.b)(S),J=function(e){function t(){return Object(s.a)(this,t),Object(l.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return i.a.createElement(b.a,{store:W},i.a.createElement(m.a,{basename:"/training-reading-and-listening"},i.a.createElement("div",null,i.a.createElement(f.a,{exact:!0,path:"/",component:U}),i.a.createElement(f.a,{path:"/play/:id",component:P}),i.a.createElement(f.a,{exact:!0,path:"/play",component:P}))),i.a.createElement(H,null))}}]),t}(r.Component);o.a.render(i.a.createElement(J,null),document.getElementById("root"))},50:function(e,t,n){e.exports={image:"Tasks_image__3yXbi"}},62:function(e,t,n){e.exports=n(100)},99:function(e,t,n){}},[[62,1,2]]]);
//# sourceMappingURL=main.ee48f0ec.chunk.js.map