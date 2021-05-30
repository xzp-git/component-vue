import { Vue } from "./install";

import { forEach } from "./util";



class Store{
    constructor(options){
        console.log(options);
        // 用户组件中使用的$store = this
        let {state, mutations, actions, module, strict, getters} = options
        
        this.getters = {} //我再去getters属性的时候 把他代理到计算属性上
 
        const computed = {}
        forEach(getters, (fn, key) => {
            computed[key] = () => {
                return fn(this.state)  //为了保证参数是state
            }
            // 当我们去getters上取值 需要去computed上取值
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key]  //具备了缓存的功能
            })
        })
        this.mutations = {}

        forEach(mutations, (fn, key) => {
            this.mutations[key] = (payload) => {
                // commit('changeAge', 10)
                return fn.call(this, this.state, payload)
            }
        })

        this.actions = {}

        forEach(actions, (fn, key) => {
            this.actions[key] = (payload) => {
                // commit('changeAge', 10)
                return fn.call(this, this, payload)
            }
        })

        

        //    这个状态在页面渲染时需要收集对应的渲染watcher 这样才能更新视图
        this._vm = new Vue({
            data:{ //$符号开头的数据不会被挂在实例上 会挂在_data上减少了一次代理
                $$state:state
            },
            computed
        })

    }
    // 类的属性访问器
    get state () {
        // 依赖于vue的响应式原理
        return this._vm._data.$$state
    }
    commit = (type, payload) => {   
        this.mutations[type](payload)
    }
    dispatch = (type, payload) => {
        this.actions[type](payload)
    }
}


export default Store