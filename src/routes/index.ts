import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
 
// 2. 配置路由
const routes: Array<RouteRecordRaw> = [
  {
    path: "/board",
    component: () => import("@/views/board.vue"),
  },
];
// 1.返回一个 router 实列，为函数，里面有配置项（对象） history
const router = createRouter({
  history: createWebHistory(),
  routes,
});
 

router.beforeEach((to,from,next)=>{
  if(to.path === "/"){
    next({path:"/board"})
  }else{
    next()
  }
})
// 3导出路由   然后去 main.ts 注册 router.ts
export default router