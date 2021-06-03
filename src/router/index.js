import Vue from "vue";
// import VueRouter from "@/vue-router";
import VueRouter from "vue-router";
import Home from "../views/Home.vue"
import About from "../views/About.vue"

Vue.use(VueRouter)

const routes = [
    {
        path:'/',
        name:'Home',
        component:Home
    },
    {
        path:'/about',
        name:'About',
        component:About,
        children:[
            {
                path:'a',
                component:{
                    render:(h) => <h1>about a</h1>
                }
            },
            {
                path:'b',
                component:{
                    render:(h) => <h1>about b</h1>
                }
            }
        ]
    }
]

const router = new VueRouter({
    mode:'history', 
    routes
})

router.beforeEach((to,from,next) => { //全局钩子  路由钩子 组件钩子 
    console.log(to,from,1);
    next()
})


router.beforeEach((to,from,next) => {
    console.log(to,from,2);
    next()
})



export default router