import{e as o,u as t,a}from"../../../_/nitro.mjs";import{r as s}from"../../../_/auth.mjs";import"node:async_hooks";const e=o((async o=>{await s(o);const e=t().hub;if(!e.openapi)throw a({statusCode:422,message:"OpenAPI not configured"});return $fetch(e.openAPIRoute).catch((()=>({})))}));export{e as default};
//# sourceMappingURL=openapi.get.mjs.map
