import{d as h,g as k,i as u,o,c as _,b as c,w as n,a as d,k as g,A as i,z as N,b_ as p,by as m,b$ as C,n as E,bH as T,_ as V}from"./index-Hn1QL0FG.js";const x=[{label:"目录",value:1},{label:"菜单",value:2},{label:"页面级",value:3}],A=[{label:"否",value:0},{label:"是",value:1}],D=[{label:"用户",value:0},{label:"脚本",value:1}],B=a=>!!["{}","[]","null",void 0].includes(JSON.stringify(a));function H(a,t){const e={};return!a||typeof a!="object"||Object.keys(a).forEach(l=>{const s=a[l];(!B(s)&&s!==""&&s!==-9||t&&t.includes(l))&&(e[l]=s)}),e}const F=a=>{var t;return(t=x.find(e=>e.value===a))==null?void 0:t.label},R={key:0},w={key:1},z={class:"mr-10"},I=["title"],O=h({__name:"ResourceNode",props:{data:{}},setup(a){const t=a,e=k(()=>t.data);return(l,s)=>{const v=u("Tickets"),r=E,f=u("Folder"),y=u("Flag"),b=T;return o(),_("div",{class:C(["fs-14",{hidden:!!e.value.route_hidden}])},[c(b,{placement:"top"},{content:n(()=>[d("div",null,[g(i(N(F)(e.value.type))+" ",1),e.value.route_hidden?(o(),_("span",R,"(已隐藏)")):p("",!0),e.value.node_name?(o(),_("span",w,"("+i(e.value.node_name)+")",1)):p("",!0)])]),default:n(()=>[d("span",z,[e.value.type===1?(o(),m(r,{key:0,class:"color--warning"},{default:n(()=>[c(v)]),_:1})):e.value.type===2?(o(),m(r,{key:1,class:"color--success"},{default:n(()=>[c(f)]),_:1})):e.value.type===3?(o(),m(r,{key:2,class:"color--danger"},{default:n(()=>[c(y)]),_:1})):p("",!0)])]),_:1}),d("span",{title:e.value.node_name},i(e.value.name),9,I)],2)}}}),J=V(O,[["__scopeId","data-v-8c172949"]]);export{J as R,D as a,A as b,H as p,x as r};