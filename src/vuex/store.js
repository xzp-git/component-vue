import { Vue } from "./install";

import { forEach } from "./util";

import ModuleCollection from "./module-collection";

function getNewState(store,path) {
  return path.reduce((memo,current) => {
          return memo[current]
        },store.state)
}

function installModule(store, rootState, path, module) {


  let ns = store._modules.getNamespaced(path)
  function nsKey(key) {
    return ns + key
  }
  if (path.length > 0) {
    let parent = path.slice(0,-1).reduce((mome, current) => {
      return mome[current] 
    },rootState)
    // 对象新增属性不能导致更新视图

    Vue.set(parent, path[path.length-1], module.state)
    // parent[path[path.length-1]] = module.state
  }
  //需要循环当前模块
  module.forEachGetters((fn,key) => {
    store.wrapperGetters[nsKey(key)] = function () {
      return fn.call(store,getNewState(store,path))
    }
  })
  module.forEachMutations((fn,key) => {
     store.mutations[nsKey(key)] = store.mutations[nsKey(key)] || [] 
     store.mutations[nsKey(key)].push((payload) => {
      fn.call(store,getNewState(store,path), payload)//先调用mutation  在执行subscribe
      store._subscribes.forEach(fn => fn({type:nsKey(key),payload},store.state))

     })
  })
  module.forEachActions((fn,key) => {
    store.actions[nsKey(key)] = store.actions[nsKey(key)] || [] 
    store.actions[nsKey(key)].push((payload) => {
      return fn.call(store,store, payload)
    }) 
  })
  module.forEachChildren((child,key) => {
    installModule(store, rootState, path.concat(key), child)
  })
  
}

function resetVm(store, state) {

  let oldVm = store._vm
  store.getters = {}
  const computed = {}
      forEach(store.wrapperGetters, (fn, key) => {
        computed[key] = () => {
            return fn()  //为了保证参数是state
        }
        // 当我们去getters上取值 需要去computed上取值
        Object.defineProperty(store.getters, key, {
            get: () => store._vm[key]  //具备了缓存的功能
        })
    })
    store._vm = new Vue({
        data:{
          $$state:state
        },
        computed
      })
      if (oldVm) {
        //重新创建实例后，需要将老的实例卸载掉
        Vue.nextTick(() => oldVm.$destroy())
      }
}

class Store{
    constructor(options){
         

      this._modules = new ModuleCollection(options); //对用户的参数进行格式化操作
      this.wrapperGetters = {} //我们需要将模块中的所有的getters，mutations，actions 进行收集
      this.mutations = {}
      this.actions = {}
     this._subscribes = []
     
      // 没有namespace的时候 getters都放在根上，actions，mutations会被合并到数组上
      let state = options.state
      installModule(this, state, [], this._modules.root)
      resetVm(this,state)
      
      if (options.plugins) { //说明用户使用了插件
        options.plugins.forEach(plugin => plugin(this))
      }

    }
    subscribe(fn){
      this._subscribes.push(fn)
    }
    replaceState(newState){  //需要替换的状态
      this._vm._data.$$state = newState //替换最新的

      // 虽然替换了状态，但是mutation getter 中的state在初始化安装的时候已经绑定了 老的状态
    }
    registerModule(path, module){ //最终都转换成数组
      if (typeof path === 'string') {
        path = [path]
      }
      //这个模块使用户写的
      this._modules.register(path,module) //模块的注册

       

      //注册完毕后 安装
      installModule(this, this.state, path,module.newModule)
      
      // vuex内部重新注册的话，会生成实例，虽然重新安装了，只解决了状态的问题到 但是computed就丢失了
      
      resetVm(this,this.state)
    }
    get state () {
      return this._vm._data.$$state
    }

    commit = (type, payload) => {
      this.mutations[type] && this.mutations[type].forEach( fn => fn(payload))
    }

    dispatch = (type, payload) =>{
      this.actions[type] && this.actions[type].forEach( fn => fn(payload))
    }
}


export default Store