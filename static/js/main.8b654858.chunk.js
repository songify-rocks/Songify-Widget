(this["webpackJsonpsongify-widget"]=this["webpackJsonpsongify-widget"]||[]).push([[0],{103:function(e,t,a){},105:function(e,t,a){},106:function(e,t,a){},179:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(9),s=a.n(o),i=(a(103),a(75),a(31)),c=a(32),l=a(34),d=a(33),u=a(71),p=a.n(u),A=a(43),g=a.n(A),h=a(72),m=(a(105),function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){n.fetchSong(),n.fetchCover(),setInterval(n.fetchSong,n.props.ratelimit)},n.fetchSong=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""===n.props.uuid||null==n.props.uuid){e.next=7;break}return e.next=3,fetch("https://songify.rocks/getsong.php?id=".concat(n.props.uuid)).then((function(e){return e.text()}));case 3:t=e.sent,n.fetchCover(),t!==n.state.currentSong&&n.setState({currentSong:t}),n.checkSize();case 7:case"end":return e.stop()}}),e)}))),n.fetchCover=Object(h.a)(g.a.mark((function e(){var t;return g.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://songify.rocks/getcover.php?id=".concat(n.props.uuid)).then((function(e){return e.text()}));case 2:t=e.sent,n.props.logoHandler(t);case 4:case"end":return e.stop()}}),e)}))),n.checkSize=function(){var e=document.createElement("canvas").getContext("2d");e.font="26px Quicksand";var t=e.measureText(n.state.currentSong).width,a=document.getElementById("song"),r=t/n.props.speed;a.style.width="".concat(t+1,"px"),a.style.animation="marquee ".concat(r,"s linear infinite ").concat(n.props.direction)},n.state={currentSong:""},n}return Object(c.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{className:"song",id:"song"},this.state.currentSong)}}]),a}(n.Component)),v=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).componentDidMount=function(){n.updateLogo("")},n.updateLogo=function(e){"true"===n.props.cover||!0===n.props.cover?n.setState({logo:e}):n.setState({logo:p.a})},n.state={logo:p.a},n}return Object(c.a)(a,[{key:"render",value:function(){var e=0===this.props.transparency?"transparent":"rgba(34, 34, 34, ".concat(this.props.transparency||1,")");return r.a.createElement("div",{className:"App",style:{borderRadius:parseInt(this.props.corners),backgroundColor:e}},"left"===this.props.position&&r.a.createElement(E,{logo:this.state.logo}),r.a.createElement("div",{className:"title",style:{left:"right"===this.props.position?20:55}},"Now Playing:"),r.a.createElement("div",{className:"nowplaying"},r.a.createElement(m,{uuid:this.props.id,ratelimit:this.props.limit,direction:this.props.dir,speed:this.props.speed,position:this.props.position,logoHandler:this.updateLogo})),r.a.createElement("div",{className:"poweredby"},"powered by songify"),"right"===this.props.position&&r.a.createElement(E,{logo:this.state.logo}))}}]),a}(n.Component);function E(e){return r.a.createElement("div",{className:"logo"},r.a.createElement("img",{src:e.logo,alt:"logo"}))}var y=a(21),f=a(51),w=(a(106),a(44)),b=a(45),C=a(37),D=(a(174),a(175),a(95)),x=a.n(D),M=b.a.Handle,N=function(e){Object(l.a)(a,e);var t=Object(d.a)(a);function a(e){var n;return Object(i.a)(this,a),(n=t.call(this,e)).handleBorder=function(e){var t=e.value,a=e.dragging,o=e.index,s=Object(f.a)(e,["value","dragging","index"]);return t!==n.state.borderRadius&&(n.setState({borderRadius:t}),n.updateLink(n.state.uuid,n.state.scrollDirection,n.state.speed,n.state.transparency,n.state.iconPosition,t,n.state.useCover)),r.a.createElement(C.a,{prefixCls:"rc-slider-tooltip",overlay:t,visible:a,placement:"top",key:o},r.a.createElement(M,Object.assign({value:t},s)))},n.componentDidMount=function(){null!=n.props.id&&(n.setState({uuidUrl:"https://songify.rocks/getsong.php?".concat(n.props.id),uuid:n.props.id}),n.updateLink(n.props.id,n.state.scrollDirection,n.state.speed,n.state.transparency,n.state.iconPosition,n.state.borderRadius,n.state.useCover))},n.buildBaseUrl=function(){return"".concat(window.location.protocol,"//").concat(window.location.hostname).concat(window.location.pathname)},n.handleTransparency=function(e){var t=e.value,a=e.dragging,o=e.index,s=Object(f.a)(e,["value","dragging","index"]);return t!==n.state.transparency&&(n.setState({transparency:t}),n.updateLink(n.state.uuid,n.state.scrollDirection,n.state.speed,parseFloat(t).toFixed(2),n.state.iconPosition,n.state.borderRadius,n.state.useCover)),r.a.createElement(C.a,{prefixCls:"rc-slider-tooltip",overlay:t,visible:a,placement:"top",key:o},r.a.createElement(M,Object.assign({value:t},s)))},n.handleSpeed=function(e){var t=e.value,a=e.dragging,o=e.index,s=Object(f.a)(e,["value","dragging","index"]);return t!==n.state.speed&&(n.setState({speed:t}),n.updateLink(n.state.uuid,n.state.scrollDirection,t,n.state.transparency,n.state.iconPosition,n.state.borderRadius,n.state.useCover)),r.a.createElement(C.a,{prefixCls:"rc-slider-tooltip",overlay:t,visible:a,placement:"top",key:o},r.a.createElement(M,Object.assign({value:t},s)))},n.copyText=function(){document.getElementById("url").select(),document.execCommand("copy")},n.urlHandler=function(e){var t=e.target.value,a=t.split("?id=")[1];n.setState({uuidUrl:t,uuid:a}),n.updateLink(a,n.state.scrollDirection,n.state.speed,n.state.transparency,n.state.iconPosition,n.state.borderRadius,n.state.useCover)},n.handleIcon=function(e){n.setState({iconPosition:e.target.value}),n.updateLink(n.state.uuid,n.state.scrollDirection,n.state.speed,n.state.transparency,e.target.value,n.state.borderRadius,n.state.useCover)},n.handleScroll=function(e){n.setState({scrollDirection:e.target.value}),n.updateLink(n.state.uuid,e.target.value,n.state.speed,n.state.transparency,n.state.iconPosition,n.state.borderRadius,n.state.useCover)},n.handleCover=function(e){n.setState({useCover:e}),n.updateLink(n.state.uuid,n.state.scrollDirection,n.state.speed,n.state.transparency,n.state.iconPosition,n.state.borderRadius,e)},n.state={uuid:"",speed:20,scrollDirection:"reverse",iconPosition:"left",borderRadius:10,transparency:.6,url:"",uuidUrl:"",useCover:!1},n}return Object(c.a)(a,[{key:"updateLink",value:function(e,t,a,n,r,o,s){console.log(this.buildBaseUrl()),this.setState({url:"".concat(this.buildBaseUrl()).concat(this.props.useParam?"?id=".concat(e,"&"):"/".concat(e,"?"),"dir=").concat(t,"&speed=").concat(a,"&transparency=").concat(n,"&position=").concat(r,"&corners=").concat(o,"&cover=").concat(s)})}},{key:"render",value:function(){return r.a.createElement("div",{className:"Generator"},r.a.createElement("nav",null,r.a.createElement("h2",null,"Songify Widget Generator")),r.a.createElement("div",{style:{marginTop:"8vh"}},r.a.createElement("div",{style:{paddingTop:50}},r.a.createElement(w.Container,{style:{marginTop:50}},r.a.createElement(w.Row,null,r.a.createElement(w.Col,{sm:7},r.a.createElement("div",{className:"setting select"},r.a.createElement("div",null,"Song Upload URL: "),r.a.createElement("input",{value:this.state.uuidUrl,placeholder:"https://songify.rocks/getsong.php?[your-uuid-here]",onChange:this.urlHandler})),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",null,"Rounded Corners:"),r.a.createElement(b.a,{min:0,max:45,defaultValue:10,handle:this.handleBorder,style:{width:332,marginTop:15}})),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",{className:"text"},r.a.createElement("div",null,"Icon position: ")),r.a.createElement("div",{className:"selection"},r.a.createElement("select",{value:this.state.iconDirection,onChange:this.handleIcon},r.a.createElement("option",{value:"left"},"Left"),r.a.createElement("option",{value:"right"},"Right")))),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",{className:"text"},r.a.createElement("div",null,"Scroll Direction: ")),r.a.createElement("div",{className:"selection"},r.a.createElement("select",{value:this.state.scrollDirection,onChange:this.handleScroll},r.a.createElement("option",{value:"reverse"},"Right to Left"),r.a.createElement("option",{value:"normal"},"Left to Right")))),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",null,"Transparency: "),r.a.createElement(b.a,{min:0,max:1,defaultValue:.6,step:.01,style:{width:332,marginTop:15},handle:this.handleTransparency})),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",null,"Scroll Speed: "),r.a.createElement(b.a,{min:10,max:80,defaultValue:20,step:1,style:{width:332,marginTop:15},handle:this.handleSpeed})),r.a.createElement("div",{className:"setting select"},r.a.createElement("div",null,"Use album cover:"),r.a.createElement(x.a,{checked:this.state.useCover,onChange:this.handleCover}))),r.a.createElement(w.Col,{sm:5},r.a.createElement("div",{className:"preview"},r.a.createElement(v,{id:this.state.uuid,transparency:this.state.transparency,limit:3e3,dir:this.state.scrollDirection,speed:this.state.speed,position:this.state.iconPosition,corners:this.state.borderRadius,cover:this.state.useCover})),r.a.createElement("input",{id:"url",className:"link-generator",type:"text",readOnly:!0,value:this.state.url,onClick:this.copyText,placeholder:"https://widget.songify.rocks/"}),r.a.createElement("div",{className:"widthheight"},"width: ",r.a.createElement("code",null,"312 px"),", height: ",r.a.createElement("code",null,"64 px"))))))))}}]),a}(n.Component);var W=function(){var e=Object(y.f)().id,t=function(e){return/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/g.test(e)}(e),a=new URLSearchParams(window.location.search),o=a.get("id");return r.a.createElement(n.Fragment,null,!a.entries().next().done&&(t||window.location.search.split("&").length>1)?r.a.createElement(v,{id:t?e:o,transparency:a.get("transparency"),corners:a.get("corners"),limit:3e3,dir:a.get("dir"),speed:a.get("speed"),position:a.get("position"),cover:a.get("cover")||!1}):r.a.createElement(N,{id:t?e:o,useParam:!t}))},U=a(70);var R=function(){return r.a.createElement(U.a,null,r.a.createElement(y.c,null,r.a.createElement(y.a,{path:"/:id?"},r.a.createElement(W,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(R,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},71:function(e,t){e.exports="data:image/png;base64,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opgsKZk209ni1MT0JH/sPEzX6NWi9xiWyX+Hu/n56T/xSbS/nEg7DhxGEkWA3rf5UKYXcgx1lOSp2TD9wkuju87xW9JmmlvJiWwHSwjBueGP+OHJ1/lm+5e5d+UmajwBhBDE00luxIY5fvMch6/8h8tjNxYKl9Fx4CgCwns78hKACOoYycPAypmYElNazl6B8sG+2FCeR0kk7w98SGf4Ms3BBkK+WjShEZ2OMTAZJpIYJ22Z5a6VI8AhJJHMywud6yhq2r5AXtNHMGUluZYa4kF/q6M3nR66yPWJgRlFLIEglp6iK3IlL/4KBJoQ5QJa9vg7EGR3yhrk9dljwEHgfP7AIClTvDN5nogRnfNNXaNX+Ev3v9QSMEt0VEAarpyfCmU651FnCGIICO/pAHLWxeiBCyx/cRsoc0+gCrM58V4wYNzCkpJNnqZZA9BUOsGJ/vP88swhTg85i6QV1DDwEzSOAjK8tyNn5AWyg5Af1bX9PjktdYnEp1XxsN7G4/Ju7vKuxuv2kDCmuT4xyMn+C5y4+QHD8dFy1reFaAp4DcF+JPHwvo68i8UWvDjqMFA1qhdfrb4RQcJKcyT5P06MX8BzI4UrKUlbJvF0Iq8NsMSABxD8Fkl8tpzNyTmeHwHfQZ0IyUpKiRlJkL4yjowbIJw3ayoM+HvgZ0AEl4vwt992BlkAWw/8GHieWU6D5IEuPeAB4DVgtHCK5spJfhYBfopqTe+joN3uqlcGXmLQEeAggt8AY3NVS+ZzStKPOt/zEnAvBYcnzEiC9KVxZMJYzB6IBVwA9iP4+2xBZsGQOaAaqgu2D9Wu/jQzkmCOTJG+EkUmzcUADaMW+oNodCKxcpeJikDmgII67/M46pTF54EaBSoxR+IKdNqsFNw4cAL4M9CBRQyfIPz8EccPKPcMej3q1MjTwOeARqR0mSNx0ldtiy5MJjCA2i69hUq2I6AS7vmqUn9NEATuRp092IGUbcZwvM64GvXKadNJcDOAaVSQ60UdsD+C2udGAZz43qJAzgKsASEEG6Uht6R7x9rN4alWJE2o7pkfFdENVMIxhtrB96Kqhp3AJQRhwESWB5fR/wE+guNXRwDJNAAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0wMy0yOFQxMToyMDoyNCswMDowMKZ6TY8AAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMDMtMjhUMTE6MjA6MjQrMDA6MDDXJ/UzAAAARnRFWHRzb2Z0d2FyZQBJbWFnZU1hZ2ljayA2LjcuOC05IDIwMTQtMDUtMTIgUTE2IGh0dHA6Ly93d3cuaW1hZ2VtYWdpY2sub3Jn3IbtAAAAABh0RVh0VGh1bWI6OkRvY3VtZW50OjpQYWdlcwAxp/+7LwAAABh0RVh0VGh1bWI6OkltYWdlOjpoZWlnaHQAMTkyDwByhQAAABd0RVh0VGh1bWI6OkltYWdlOjpXaWR0aAAxOTLTrCEIAAAAGXRFWHRUaHVtYjo6TWltZXR5cGUAaW1hZ2UvcG5nP7JWTgAAABd0RVh0VGh1bWI6Ok1UaW1lADE1ODUzOTQ0MjSM6/57AAAAD3RFWHRUaHVtYjo6U2l6ZQAwQkKUoj7sAAAAVnRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8vbW50bG9nL2Zhdmljb25zLzIwMjAtMDMtMjgvNGVmNGFkNzliZTRhNDMwNDRiM2U3OWUxMmZkMjMxMTEuaWNvLnBuZ5tXYwkAAAAASUVORK5CYII="},75:function(e,t,a){},98:function(e,t,a){e.exports=a(179)}},[[98,1,2]]]);
//# sourceMappingURL=main.8b654858.chunk.js.map