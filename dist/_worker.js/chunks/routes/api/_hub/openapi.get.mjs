import{e as o,u as t,c as s}from"../../../_/nitro.mjs";import{r as a}from"../../../_/auth.mjs";import"node:async_hooks";const e=o((async o=>{await a(o);const e=t().hub;if(!e.openapi)throw s({statusCode:422,message:"OpenAPI not configured"});return $fetch(e.openAPIRoute).catch((()=>({})))}));export{e as default};
//# sourceMappingURL=openapi.get.mjs.map
