(this.webpackJsonptodolistt=this.webpackJsonptodolistt||[]).push([[0],{105:function(e,t,n){},112:function(e,t,n){"use strict";n.r(t);var i=n(0),a=n(38),c=n.n(a);n(105),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var r=n(18),o=n(15),s=n(3),l=n(11),d=(n(61),n(161)),j=n(168),u=n(2),b=function(e){var t=e.addNewItem,n=Object(i.useState)(!1),a=Object(l.a)(n,2),c=a[0],r=a[1],o=Object(i.useState)(""),s=Object(l.a)(o,2),b=s[0],O=s[1];return Object(u.jsxs)("div",{children:[Object(u.jsx)(d.a,{size:"small",id:"outlined-basic",label:"New task",variant:"outlined",className:c?"error":"",value:b,onChange:function(e){r(!1),O(e.currentTarget.value)},onKeyPress:function(e){b.trim()?13===e.charCode&&(t(b),O("")):r(!0)},error:c,helperText:c?"title is required":""}),Object(u.jsx)(j.a,{size:"large",variant:"contained",onClick:function(){b.trim()?t(b):r(!0),O("")},children:"+"})]})},O=n(163),f=n(169),x=n(173),h=n(160),m=n(68),v=n.n(m),p=n(78),T=n.n(p),k=n(79),w=n.n(k),I=function(e){var t=e.setNewTodolistTitle,n=e.setNewTaskTitle,i=e.deleteTodolist,a=e.todolistId,c=e.title,o=e.tasks,s=e.deleteTask,l=e.filterTasks,d=e.addNewTask,m=e.setIsDone,p=e.filter,k=o.map((function(e){return Object(u.jsxs)("li",{className:e.isDone?"is-done":"",children:[Object(u.jsx)(O.a,Object(r.a)(Object(r.a)({checked:e.isDone,onChange:function(){return t=e.id,void m(t,a);var t}},{inputProps:{"aria-label":"Checkbox demo"}}),{},{icon:Object(u.jsx)(T.a,{}),checkedIcon:Object(u.jsx)(w.a,{})})),Object(u.jsx)(D,{setNewItemTitleHandler:function(t){return function(e,t,i){n(e,t,i)}(t,a,e.id)},title:e.title}),Object(u.jsx)(f.a,{"aria-label":"delete",size:"small",children:Object(u.jsx)(v.a,{onClick:function(){return s(e.id,a)},fontSize:"inherit"})})]},e.id)}));return Object(u.jsxs)(x.a,{style:{padding:"20px"},elevation:2,children:[Object(u.jsxs)("h3",{style:{textAlign:"center"},children:[Object(u.jsx)(D,{setNewItemTitleHandler:function(e){return t(e,a)},title:c}),Object(u.jsx)(h.a,{title:"Delete",children:Object(u.jsx)(f.a,{"aria-label":"delete",size:"small",children:Object(u.jsx)(v.a,{onClick:function(){return i(a)},fontSize:"inherit"})})})]}),Object(u.jsx)(b,{addNewItem:function(e){d(e,a)}}),Object(u.jsx)("ul",{children:k}),Object(u.jsxs)("div",{children:[Object(u.jsx)(j.a,{size:"small",variant:"all"===p?"contained":"outlined",onClick:function(){return l("all",a)},children:"All"}),Object(u.jsx)(j.a,{size:"small",variant:"active"===p?"contained":"outlined",onClick:function(){return l("active",a)},children:"Active"}),Object(u.jsx)(j.a,{size:"small",variant:"completed"===p?"contained":"outlined",onClick:function(){return l("completed",a)},children:"Completed"})]})]})},D=function(e){var t=e.title,n=e.setNewItemTitleHandler,a=Object(i.useState)(!1),c=Object(l.a)(a,2),r=c[0],o=c[1],s=Object(i.useState)(t),j=Object(l.a)(s,2),b=j[0],O=j[1];return Object(u.jsxs)("span",{children:[r&&Object(u.jsx)(d.a,{multiline:!0,variant:"standard",onChange:function(e){var t=e.currentTarget.value;O(t),n(t)},value:b,autoFocus:!0,onBlur:function(){return o(!1)}}),r||Object(u.jsx)("span",{style:{wordWrap:"break-word"},onDoubleClick:function(){return o(!0)},children:b})]})},C=n(164),g=n(174),S=n(165),N=n(166),y=n(167),A=n(176),z=n(80),E=n.n(z),H=n(81),K=n.n(H),W=n(82),L=n.n(W),B=n(83),M=n.n(B),R=n(170),G=n(171),J=n(172),P=n(84),V=n.n(P);var q=function(){var e,t=Object(C.a)(),n=Object(C.a)(),a=Object(i.useState)((e={},Object(s.a)(e,t,[{id:Object(C.a)(),title:"HTML",isDone:!0},{id:Object(C.a)(),title:"CSS",isDone:!1},{id:Object(C.a)(),title:"JS",isDone:!1}]),Object(s.a)(e,n,[{id:Object(C.a)(),title:"React",isDone:!0},{id:Object(C.a)(),title:"Material UI",isDone:!1},{id:Object(C.a)(),title:"Redux",isDone:!1}]),e)),c=Object(l.a)(a,2),d=c[0],O=c[1],x=Object(i.useState)([{id:t,title:"What to learn",filter:"all"},{id:n,title:"What to buy",filter:"all"}]),h=Object(l.a)(x,2),m=h[0],v=h[1],p=function(e,t){O(function(e,t){switch(t.type){case"REMOVE-TASK":var n=e[t.todolistId].filter((function(e){return e.id!==t.taskId}));return Object(r.a)(Object(r.a)({},e),{},Object(s.a)({},t.todolistId,n));case"ADD-TASK":var i={id:Object(C.a)(),title:t.newTaskTitle,isDone:!1};return Object(r.a)(Object(r.a)({},e),{},Object(s.a)({},t.todolistId,[i].concat(Object(o.a)(e[t.todolistId]))));case"CHECKBOX-CHANGE":var a=e[t.todolistId].find((function(e){return e.id===t.taskId}));return a&&(a.isDone=!a.isDone),Object(r.a)({},e);case"CHANGE-TASK-TITLE":var c=e[t.todolistId].find((function(e){return e.id===t.taskId}));return c&&(c.title=t.newTaskTitle),Object(r.a)({},e);default:throw new Error("I don't understand this action type")}}(d,function(e,t){return{type:"REMOVE-TASK",todolistId:e,taskId:t}}(t,e)))},T=function(e,t){var n=m.find((function(e){return e.id===t}));n&&(n.filter=e),v(Object(o.a)(m))},k=function(e,t){var n={id:Object(C.a)(),title:e,isDone:!1};d[t]=[n].concat(Object(o.a)(d[t])),O(Object(r.a)({},d))},w=function(e,t){var n=d[t].find((function(t){return t.id===e}));n&&(n.isDone=!n.isDone),O(Object(r.a)({},d))},D=function(e){v(m.filter((function(t){return t.id!==e})))},z=function(e,t,n){if(n!==t){var i=d[t].find((function(e){return e.id===n}));i&&(i.title=e),O(Object(r.a)({},d))}},H=function(e,t){var n=m.find((function(e){return e.id===t}));n&&(n.title=e),v(Object(o.a)(m))},W=[{icon:Object(u.jsx)(E.a,{}),name:"Copy"},{icon:Object(u.jsx)(K.a,{}),name:"Save"},{icon:Object(u.jsx)(L.a,{}),name:"Print"},{icon:Object(u.jsx)(M.a,{}),name:"Share"}];return Object(u.jsxs)("div",{className:"App",children:[Object(u.jsx)(R.a,{position:"static",children:Object(u.jsxs)(G.a,{children:[Object(u.jsx)(f.a,{size:"large",edge:"start",color:"inherit","aria-label":"menu",sx:{mr:2},children:Object(u.jsx)(V.a,{})}),Object(u.jsx)(J.a,{variant:"h6",component:"div",sx:{flexGrow:1},children:"*TODOLIST*"}),Object(u.jsx)(j.a,{color:"inherit",children:"Login"})]})}),Object(u.jsxs)(g.a,{fixed:!0,children:[Object(u.jsx)(S.a,{container:!0,style:{padding:"20px",justifyContent:"center"},children:Object(u.jsx)(b,{addNewItem:function(e){var t=Object(C.a)(),n={id:t,title:e,filter:"all"};v([].concat(Object(o.a)(m),[n])),O(Object(r.a)(Object(r.a)({},d),{},Object(s.a)({},t,[])))}})}),Object(u.jsx)(S.a,{container:!0,spacing:3,style:{justifyContent:"center"},children:m.map((function(e){var t=d[e.id];return"active"===e.filter&&(t=d[e.id].filter((function(e){return!1===e.isDone}))),"completed"===e.filter&&(t=d[e.id].filter((function(e){return!0===e.isDone}))),Object(u.jsx)(S.a,{item:!0,maxWidth:"400px",children:Object(u.jsx)(I,{setNewTodolistTitle:H,setNewTaskTitle:z,deleteTodolist:D,todolistId:e.id,filter:e.filter,title:e.title,tasks:t,deleteTask:p,filterTasks:T,addNewTask:k,setIsDone:w})},e.id)}))})]}),Object(u.jsx)(N.a,{ariaLabel:"SpeedDial basic example",sx:{position:"absolute",bottom:16,right:16},icon:Object(u.jsx)(y.a,{}),children:W.map((function(e){return Object(u.jsx)(A.a,{icon:e.icon,tooltipTitle:e.name},e.name)}))})]})};c.a.render(Object(u.jsx)(q,{}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},61:function(e,t,n){}},[[112,1,2]]]);
//# sourceMappingURL=main.f23e7623.chunk.js.map