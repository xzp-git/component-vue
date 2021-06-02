export default{
    functional:true,
    render(h,{parent, data}){

        //内部current变成成了响应式的
        // 真正用的是$route
        let route = parent.$route //获取到current对象

        //data 里增加标识
        let depth = 0;
        while (parent) {//1.组件 $vnode 时组建的占位符
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++
            }
            parent = parent.$parent
        }
        let record = route.matched[depth]
         if (!record) { //两个router-view  /about    /about/a
             return h() //表示空 什么都不渲染
         }
        //  依次的将matched的结果赋予给每个 router-view
        data.routerView = true  //表示自己是一个 router-view 组件
        return h(record.component, data)
    }
}