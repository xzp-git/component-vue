import RouterLink from "./components/link";
import RouterView from "./components/view";

export let Vue
function install(_Vue) {
    Vue = _Vue

    Vue.mixin({
        beforeCreate() {
            // 所有人都拿根上的——router
            if (this.$options.router) {
                // 根组件
                this._router = this.$options.router
                this._routerRoot = this //表示根组件上有一个唯一的标识叫_routerRoot指向了自己
                // 初始化路由的逻辑 只初始化一次

                this._router.init(this) //整个应用的根


                Vue.util.defineReactive(this, '_route', this._router.history.current)

            } else {
                // 子组件
                this._routerRoot = this.$parent && this.$parent._routerRoot
            }
        } 
    })

    //给所有的组件增加$router 和 $route 属性
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot._router
        }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot._route
        }
    })

    Vue.component('router-link', RouterLink)
    Vue.component('router-view', RouterView)
}
export default install