(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,n){},115:function(e,t,n){"use strict";n.r(t);var r,a=n(0),i=n.n(a),c=n(12),o=n.n(c),u=n(49),s=n(50),l=n(61),f=n(51),d=n(63),p=n(28),b=n(13),m=n(119),h=n(3),g={isOpenListModal:!1,setIsOpenListModal:function(e,t){e.isOpenListModal=t},toggleOpenListModal:function(e){e.isOpenListModal=!e.isOpenListModal}},v=n(14),y=n.n(v),w=n(21),O=n(52),E=n.n(O).a.create({baseURL:"/training-reading-and-listening"}),k=[{link:"https://www.youtube.com/watch?v=PjTc-EiwHqc",subtitle:"[DownSub.com] Who I'm Voting for President re_ Casey Neistat.srt"},{link:"https://youtu.be/quJdL9ggETI",subtitle:"[DownSub.com] Margaret Gould Stewart_ How giant websites design for you (and a billion others, too).srt"},{link:"https://youtu.be/H2QxFM9y0tY",subtitle:"[DownSub.com] The disarming case to act right now on climate change _ Greta Thunberg.srt"},{link:"https://youtu.be/pj8n78AuN3w",subtitle:"[DownSub.com] YouTube's Rules Don't Apply to Everyone.srt"},{link:"https://youtu.be/jAhjPd4uNFY",subtitle:"[DownSub.com] Genetic Engineering Will Change Everything Forever \u2013 CRISPR.srt"},{link:"https://youtu.be/DHg5j9cTb2k?t=32",subtitle:"[DownSub.com] Genetic Engineering Will Change Everything Forever \u2013 CRISPR.srt"},{link:"https://www.youtube.com/watch?time_continue=0&v=5VE9nihee7o",subtitle:"[DownSub.com] Hillary Clinton_ The Vox Conversation.srt"}];function j(e){var t=e.match(/^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|attribution_link\?a=.+?watch.+?v(?:%|=)))((\w|-){11})(?:\S+)?$/);return String(t[1])}!function(e){e.YOUTUBE="youtube",e.AUDIO="audio"}(r||(r={}));var S={items:[],isFetching:!0,add:function(e,t){e.items.push(t)},delete:function(e,t){var n=e.items.findIndex(function(e){return e.id===t});e.items.splice(n,1)},setItems:function(e,t){e.items=t},setFetching:function(e,t){e.isFetching=t},fetch:Object(h.e)(function(){var e=Object(w.a)(y.a.mark(function e(t){var n,a,i,c,o,u,s;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(t.setFetching(!0),!(n=localStorage.getItem("app_items"))){e.next=7;break}return a=JSON.parse(n),t.setItems(a),t.setFetching(!1),e.abrupt("return");case 7:i=[],c=0;case 9:if(!(c<k.length)){e.next=19;break}return o=k[c],e.next=13,E.get("/".concat(o.subtitle));case 13:u=e.sent,s={id:c,plainSubtitles:u.data,source:r.YOUTUBE,url:j(o.link)},i.push(s);case 16:c++,e.next=9;break;case 19:t.setItems(i),t.syncWithLocalstorage(null),t.setFetching(!1);case 22:case"end":return e.stop()}},e,this)}));return function(t){return e.apply(this,arguments)}}()),syncWithLocalstorage:function(e){localStorage.setItem("app_items",JSON.stringify(e.items))},listeners:Object(h.c)(function(e){e(S.delete,function(e){e.syncWithLocalstorage(null)})})},I=S,L=n(55),x={subtitles:[],isFetching:!0,setSubtitles:function(e,t){e.subtitles=t},setFetching:function(e,t){e.isFetching=t},fetchSubtitlesFromTasksStore:Object(h.e)(function(){var e=Object(w.a)(y.a.mark(function e(t,n,r){var a,i,c,o;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:if(a=r.getState(),i=Number(n),c=a.getTaskById(i)){e.next=5;break}return e.abrupt("return");case 5:o=L.parse(c.plainSubtitles),t.setSubtitles(o),t.setFetching(!1);case 8:case"end":return e.stop()}},e,this)}));return function(t,n,r){return e.apply(this,arguments)}}())},F=n(22),T={app:g,tasks:I,player:x,getTaskById:Object(h.d)(function(e){return function(t){var n=e.tasks.items.filter(function(e){return e.id===t});return Object(F.a)(n,1)[0]}})},C=n(31),M=new Promise(function(e){var t=document.createElement("script");t.src="https://www.youtube.com/iframe_api";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n),window.onYouTubeIframeAPIReady=function(){return e(window.YT)}}),R=function(e){var t=e.id,n=e.videoId,r=e.events,a=e.playerVars;return new Promise(function(){var e=Object(w.a)(y.a.mark(function e(i,c){var o,u,s,l;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,M;case 2:return o=e.sent,u=null!==document.querySelector("#".concat(t)),s=Object(C.a)({},r,{onReady:function(){i(l)}}),u||console.warn("YouTube hook: div #".concat(t," not found.")),l=new o.Player(t,{videoId:n,height:"390",width:"640",playerVars:a,events:s}),e.abrupt("return",l);case 8:case"end":return e.stop()}},e,this)}));return function(t,n){return e.apply(this,arguments)}}())},D=0;function _(e){return!e||0===e.length}var V=function(e,t){var n=Object(a.useState)(null),r=Object(F.a)(n,2),c=r[0],o=r[1],u=Object(a.useState)(-1),s=Object(F.a)(u,2),l=s[0],f=s[1],d=Object(a.useMemo)(function(){return function(e){var t=++D;return String(e)+t}("unq-yt-id-")},[]),p=!_(e)&&i.a.createElement("div",{id:d});return Object(a.useEffect)(function(){if(!_(e)){var n=t&&t.playerVars||{},r=t&&t.events||{},a={id:d,videoId:e,playerVars:n};return c?c.cueVideoById(e):function(){i.apply(this,arguments)}(),function(){console.log("return")}}function i(){return(i=Object(w.a)(y.a.mark(function e(){var t;return y.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,R(Object(C.a)({},a,{events:Object(C.a)({},r,{onStateChange:function(e){f(t.getPlayerState()),r.onStateChange&&r.onStateChange(e)}})}));case 2:return t=e.sent,r.onReady&&r.onReady({target:t}),e.abrupt("return",o(t));case 5:case"end":return e.stop()}},e,this)}))).apply(this,arguments)}},[e]),{video:p,player:c,state:l}},N=n(56),P=n(62);var A=function(e){var t=e.match.params.id,n=Object(h.f)(function(e){return{setIsOpenListModal:e.app.setIsOpenListModal,onFetchSubtitlesFromTasksStore:e.player.fetchSubtitlesFromTasksStore}}).onFetchSubtitlesFromTasksStore,r=Object(h.g)(function(e){return e.getTaskById(Number(t))},[t]),c=Object(h.g)(function(e){return e.tasks},[t]);if(Object(h.g)(function(e){return e.player},[t]),Object(a.useEffect)(function(){c.isFetching||n(t)},[t,c.isFetching]),!t)return i.a.createElement(b.a,{to:"/"});var o=Object(N.get)(r,"url"),u=V(o,{playerVars:{controls:1,start:1,fs:0,rel:0,showinfo:0,ecver:0,disablekb:1},events:{onReady:function(e){var t=e.target;console.log("player || ",t),t.setVolume(10)}}}),s=u.video,l=u.player,f=c.items.map(function(e){return i.a.createElement("li",{key:e.url},i.a.createElement(p.b,{to:"/play/".concat(e.id)},e.url))});return console.log("Player render"),i.a.createElement("div",null,i.a.createElement(P.a,{onClick:function(){return l.setVolume(70)},text:"set vol"}),i.a.createElement(P.a,{onClick:function(){return l.playVideo()},text:"play"}),i.a.createElement(P.a,{onClick:function(){return l.pauseVideo()},text:"pause"}),i.a.createElement("hr",null),s,i.a.createElement("hr",null),i.a.createElement("ul",null,f))};n(106),n(107);function B(){var e=Object(h.f)(function(e){return{setIsOpenListModal:e.app.setIsOpenListModal}}).setIsOpenListModal;return Object(a.useEffect)(function(){setTimeout(function(){e(!0)},400)},[]),null}var Y=n(117),J=n(118),U=n(29),W=n(59),q=n.n(W),H=function(e){return!e},G=function(){var e=Object(a.useState)(!0),t=Object(F.a)(e,2)[1];return function(){t(H)}},K=function(){var e=G(),t=Object(a.useContext)(b.d);if(console.log("routerContext = ",t),!t)throw new Error("use-react-router may only be used within a react-router context.");return Object(a.useEffect)(function(){return t.history.listen(e)},[t]),t};function z(e){var t=Object(h.g)(function(e){return e.tasks}),n=Object(h.g)(function(e){return e.app.isOpenListModal}),r=K().history,c=Object(h.f)(function(e){return{onFetch:e.tasks.fetch,onDelete:e.tasks.delete,setIsOpenListModal:e.app.setIsOpenListModal}}),o=c.onFetch,u=c.onDelete,s=c.setIsOpenListModal;function l(){return t.items.map(function(e,t){var n="https://i.ytimg.com/vi/".concat(e.url,"/hqdefault.jpg"),a="https://youtu.be/".concat(e.url);return i.a.createElement("tr",{onClick:function(){return t=e.id,r.push("/play/".concat(t)),void console.log("handleTableRowClick");var t},key:t},i.a.createElement("td",{style:{width:120,textAlign:"center"}},i.a.createElement("a",{href:a,target:"_blank"},i.a.createElement("img",{className:q.a.image,src:n,alt:""}))),i.a.createElement("td",null,i.a.createElement("h4",null,"# ",e.id)),i.a.createElement("td",{style:{width:80,textAlign:"center",verticalAlign:"middle"}},i.a.createElement(P.a,{intent:"danger",icon:"delete",onClick:function(t){return function(e,t){u(t),e.stopPropagation()}(t,e.id)}})))})}return Object(a.useEffect)(function(){o()},[]),i.a.createElement(J.a,{style:{width:"70%"},icon:"info-sign",title:"List",isOpen:n,onClose:function(){return s(!1)},usePortal:!0,className:U.a.OVERLAY_SCROLL_CONTAINER},i.a.createElement("div",{style:{overflow:"scroll",height:"70vh"}},i.a.createElement(Y.a,{style:{width:"100%"},interactive:!0,bordered:!0},i.a.createElement("tbody",null,l()))))}var Q=n(60);function X(e,t){var n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],r=Object(a.useRef)(new Set([])),i=Object(a.useRef)({targetKeys:[],callback:function(){},preventDefault:!0});Object(a.useEffect)(function(){i.current={targetKeys:e,callback:t,preventDefault:n}},[].concat(Object(Q.a)(e),[t,n]));var c=Object(a.useCallback)(function(e){r.current.add(e.key),function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];if(e.length!==t.length)return!1;var n=new Set(e);return t.forEach(function(e){n.delete(e)}),0===n.size}(i.current.targetKeys,Array.from(r.current))&&i.current.preventDefault&&(e.preventDefault(),i.current.callback())},[]),o=Object(a.useCallback)(function(e){r.current.delete(e.key)},[]);Object(a.useEffect)(function(){return window.addEventListener("keydown",c),window.addEventListener("keyup",o),function(){window.removeEventListener("keydown",c),window.removeEventListener("keyup",o)}},[c,o])}function $(){var e=Object(h.f)(function(e){return{toggleOpenListModal:e.app.toggleOpenListModal}}).toggleOpenListModal;return X(["Shift","J"],function(){e()}),i.a.createElement(z,null)}m.a.onlyShowFocusOnTabs();var Z=Object(h.b)(T),ee=function(e){function t(){return Object(u.a)(this,t),Object(l.a)(this,Object(f.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(s.a)(t,[{key:"render",value:function(){return i.a.createElement(h.a,{store:Z},i.a.createElement(p.a,{basename:"/training-reading-and-listening"},i.a.createElement("div",null,i.a.createElement(b.b,{exact:!0,path:"/",component:B}),i.a.createElement(b.b,{path:"/play/:id",component:A}),i.a.createElement(b.b,{exact:!0,path:"/play",component:A}),i.a.createElement($,null))))}}]),t}(a.Component);o.a.render(i.a.createElement(ee,null),document.getElementById("root"))},59:function(e,t,n){e.exports={image:"Tasks_image__3yXbi"}},70:function(e,t,n){e.exports=n(115)}},[[70,1,2]]]);
//# sourceMappingURL=main.5bc34c7c.chunk.js.map