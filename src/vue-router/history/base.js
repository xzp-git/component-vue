

function createRoute(record,location) { //创建路由
    
    const matched = []
    if (record) {  //不停地去父亲查找
        while (record) {
            matched.unshift(record)
            record = record.parent
        }
    } 

    return {
        ...location,
        matched
    }
}
function runQueue(queue,iterator,cb){

    function step(index) {

        if (index >= queue.length) {
            return cb()
        }
        let hook = queue[index]
        iterator(hook, ()=>step(index+1))
    }
    step(0)
}

// 路由公共的方法公用
export default class History{
    constructor(router){
        this.router = router

        // 保存路径的的变化
        // 当前没有匹配到记录
        this.current = createRoute(null,{
            path:'/'
        })
    }
    listen(cb){
        this.cb = cb
    }

    transitionTo(path,cb){

        // 前端路由的实现原理离不开hash  history
        let record = this.router.match(path)  //匹配后
        let route = createRoute(record,{
            path
        })
        //1.保证跳转的路径和档期啊你路径一致
        // 2.匹配的记录的个数  和 当前的匹配个数一致 说明是相同的路由
        if (path === this.current.path && route.matched.length === this.current.matched.length ) {
            return
        }

        let queue = this.router.beforeHooks

        const iterator = (hook,next) => {
            hook(route,current,next)
        }
        //在跳转前 我需要先走对应的钩子
        runQueue(queue,iterator,() => {
            this.updateRoute(route)
             cb && cb() //默认第一次是hanschange


            //  后置钩子
        })

        
        //路径变化需要渲染视图
        // 我们需要将 current 属性 变成 
        
        // 我们可以在 router-view组件中使用current 属性 如果路径变化就可以更新router-view了
        
    }


    updateRoute(route){
        //修改current _route实现跳转的
        this.current = route//不光要改变current 还要改变_route
        this.cb && this.cb(route)
    }
}