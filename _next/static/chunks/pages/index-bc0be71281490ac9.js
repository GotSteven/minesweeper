(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,s,o){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return o(85)}])},85:function(e,s,o){"use strict";o.r(s);var i=o(5893),n=o(7294),a=o(2729),c=o.n(a);let t=()=>{let[e,s]=(0,n.useState)([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]),o=JSON.parse(JSON.stringify(e)),[a,t]=(0,n.useState)([[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]]),d=JSON.parse(JSON.stringify(a)),l=[[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1]],r=0,_=e.some(e=>e.some(e=>0!==e));_&&(r=1);let x=e.some((e,s)=>e.some((e,o)=>1===e&&1===a[s][o]));x&&(r=3,console.log("爆破"));let m=[[-1,0],[-1,-1],[0,-1],[1,-1],[1,0],[1,1],[0,1],[-1,1]],u=(e,s)=>(e=Math.ceil(e),Math.floor(Math.random()*((s=Math.floor(s))-e)+e)),N=(e,s)=>{let o=u(0,9),i=u(0,9);o===e&&i===s?N(e,s):0===d[o][i]?d[o][i]=1:N(e,s)},f=(e,s)=>{let o=0;for(let[i,n]of m)void 0!==a[s+i]&&void 0!==a[s+i][e+n]&&1===a[s+i][e+n]&&o++;if(l[s][e]=o,0===o)for(let[o,i]of m)void 0!==l[s+o]&&void 0!==l[s+o][e+i]&&(-1===l[s+o][e+i]||9===l[s+o][e+i]||10===l[s+o][e+i])&&f(e+i,s+o)},p=(i,n,a)=>{switch(a.preventDefault(),e[n][i]){case 0:o[n][i]=2,l[n][i]=9;break;case 2:o[n][i]=3,l[n][i]=10;break;case 3:o[n][i]=0,l[n][i]=-1}s(o)},v=(i,n)=>{if(r<=1){if(!_){for(let e=0;e<10;e++)N(i,n);t(d)}0===e[n][i]&&(o[n][i]=1,s(o))}};return(()=>{for(let s=0;s<9;s++)for(let o=0;o<9;o++)1===e[s][o]?0===a[s][o]?f(o,s):l[s][o]=11:2===e[s][o]?l[s][o]=9:3===e[s][o]?l[s][o]=10:x&&1===a[s][o]&&(l[s][o]=11)})(),(()=>{let e=0;for(let s=0;s<9;s++)for(let o=0;o<9;o++)(-1===l[o][s]||9===l[o][s]||10===l[o][s])&&e++;10===e&&(r=2,console.log("クリア"))})(),(0,i.jsxs)("div",{className:c().container,children:[(0,i.jsxs)("div",{className:c().header,children:[r<=1&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-330px 0"}}),2===r&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-360px 0"}}),3===r&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-390px 0"}})]}),(0,i.jsx)("div",{className:c().board,children:l.map((e,s)=>e.map((e,o)=>(0,i.jsxs)("div",{className:c().cell,onContextMenu:e=>p(o,s,e),onClick:()=>v(o,s),children:[-1===e&&(0,i.jsx)("div",{className:c().stone}),1===e&&(0,i.jsx)("div",{className:c().icon}),2===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-30px 0"}}),3===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-60px 0"}}),4===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-90px 0"}}),5===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-120px 0"}}),6===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-150px 0"}}),7===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-180px 0"}}),8===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-210px 0"}}),10===e&&(0,i.jsx)("div",{className:c().stone,children:(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-240px 0"}})}),9===e&&(0,i.jsx)("div",{className:c().stone,children:(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-270px 0"}})}),11===e&&(0,i.jsx)("div",{className:c().icon,style:{backgroundPosition:"-300px 0"}})]},"".concat(o,"-").concat(s))))})]})};s.default=t},2729:function(e){e.exports={container:"index_container__gnN1f",main:"index_main__kAcUb",footer:"index_footer__qq_p6",title:"index_title__gEapU",description:"index_description__087sm",code:"index_code__VeCgy",grid:"index_grid__FmmIe",card:"index_card__kAxi6",logo:"index_logo__FcDOZ",header:"index_header__A7Bm0",icon:"index_icon__Noc_h",board:"index_board__2d6xe",cell:"index_cell__3W8ZQ",stone:"index_stone__oeDmm"}}},function(e){e.O(0,[774,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);