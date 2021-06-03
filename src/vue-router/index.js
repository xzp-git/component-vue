import install, { Vue } from "./install";
import {createMatcher} from "./create-matcher";
import Hash from "./history/hash";
import HTML5History from "./history/h5";


class VueRouter {
    constructor(options = {}) {
        const routes = options.routes
        this.mode = options.mode || 'hash'
        //给我个路径 我就返回给你对应的记录
        // match匹配方法


        //addRoutes 动态添加
        this.matcher = createMatcher(options.routes || {})
        // 根据模式需要初始化不同的路由系统 hash/history 底层实现不一样，但是使用的方式是一样的
        // hash.js => push
        // history.js => push
        // base

        switch (this.mode) {
            case 'hash':
                this.history = new Hash(this)
                break;
        
            case 'history':
                this.history = new HTML5History(this)
                break;
        }

        this.beforeHooks = []
    
    }
    match(location){
       return this.matcher.match(location)
    }
    push(location){
        this.history.transitionTo(location,() => {
            this.history.pushState(location)
            
        })
    }
    beforeEach(fn){
        this.beforeHooks.push(fn)
    }
    init(app) {
        const history = this.history //当前管理路由
        // hash -> hashchange 浏览器支持popState 就优先用popState
        // history -> popState 性能高于hashchange 但是兼容性问题
        
        //页面初始化完毕后 需要先进行一次跳转

        // 跳转到某个路径
        const setUpListener = () => {
            // 此事件的方式也不一致
            history.setUpListener()
        }
        history.transitionTo(history.getCurrentLocation(),setUpListener)   
    
        history.listen((route) => {
            //监听 监听如果current变化了 就重新的给——route赋值
            app._route = route
        })
    
    }


}

VueRouter.install = install










export default VueRouter