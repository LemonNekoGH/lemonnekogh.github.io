(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{504:function(t,e,r){"use strict";r.r(e);r(8),r(6),r(10),r(14),r(7),r(15);var n=r(2),c=r(1),o=r(0),d=r.n(o),l=r(70);function v(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(object);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,r)}return e}function O(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?v(Object(source),!0).forEach((function(e){Object(n.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):v(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var f=c.a.extend({props:{data:{type:Object,required:!0}},computed:O(O({},Object(l.d)(["tagColorMap"])),{},{createTime:function(){return d()(this.data.createTime).format("YYYY 年 MM 月 D 日 HH:mm:ss")}})}),_=r(81),y=r(106),j=r.n(y),h=r(496),m=r(495),w=r(552),C=r(507),component=Object(_.a)(f,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-card",{staticClass:"tag-cloud",attrs:{outlined:"",href:t.data.path,nuxt:!0,rounded:"lg"}},[r("v-card-title",[t._v(t._s(t.data.title))]),t._v(" "),r("v-card-subtitle",[r("div",{staticClass:"card-subtitle-tags"},[r("div",[t._v(t._s(t.createTime))])])]),t._v(" "),r("v-divider"),t._v(" "),r("v-card-text",[t._v("\n    "+t._s(t.data.description)+"\n  ")]),t._v(" "),r("v-divider"),t._v(" "),r("v-card-text",[r("div",{staticClass:"tags"},[r("div",{staticClass:"tag-container"},[r("v-chip",{attrs:{nuxt:!0,label:"",outlined:"",to:"/category/"+t.data.category,color:"primary"}},[t._v("\n          "+t._s(t.data.category)+"\n        ")])],1),t._v(" "),t._l(t.data.tags,(function(e){return r("div",{key:e,staticClass:"tag-container"},[r("v-chip",{attrs:{nuxt:!0,label:"",outlined:"",to:"/tag/"+e,color:t.tagColorMap[e]}},[t._v("\n          "+t._s(e)+"\n        ")])],1)}))],2)])],1)}),[],!1,null,null,null);e.default=component.exports;j()(component,{VCard:h.a,VCardSubtitle:m.a,VCardText:m.b,VCardTitle:m.c,VChip:w.a,VDivider:C.a})}}]);