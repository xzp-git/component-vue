import { Vue } from "./install";

class Store{
    constructor(options){
        console.log(options);
        // 用户组件中使用的$store = this
        let {state, mutions, actions, module, strict, getters} = options
    //    这个状态在页面渲染时需要收集对应的渲染watcher 这样才能更新视图
        this._vm = new Vue({
            data:{ //$符号开头的数据不会被挂在实例上 会挂在_data上减少了一次代理
                $$state:state
            }
        })
    }
    // 类的属性访问器
    get state () {
        // 依赖于vue的响应式原理
        return this._vm._data.$$state
    }
}


export default Store