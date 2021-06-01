import Vue from "vue";
import Vuex from "@/vuex"
// import Vuex from "vuex"
// import logger from "vuex/dist/logger";


Vue.use(Vuex)

function logger() {
    
    return function (store) {
        let prevState = JSON.stringify(store.state)
        store.subscribe((mutation, state) => { //所有的更新操作都基于mutation (状态变化都会通过mutations)
            //如果手动的更新 此subscribe是不会执行  commit()
            console.log('prevState',prevState);
            console.log('mutation',mutation);
            console.log('currentState',JSON.stringify(state));

            prevState = JSON.stringify(state)
        })
    }
}

function persists() {
    return function (store) {
        let localState = JSON.parse(localStorage.getItem('VUEX:STATE'))
       if (localState) {
           store.replaceState(localState)
       }
        store.subscribe((mutation, state) => {
            // 状态一变化 旧村localStorage
            //防抖
            localStorage.setItem('VUEX:STATE',JSON.stringify(state))
            
        })
    }
}

export default new Vuex.Store({
    plugins:[
        persists(), //每次状态变化都可以存入到localStorage
        logger()
    ],
    state:{
        name:'zf',
        age:12
    },
    mutations:{
        changeAge(state, payload){
            state.age += payload
        }
    },
    actions:{
        changeAge({commit}, payload){
            setTimeout(() => {
                commit('changeAge', payload)
            }, 1000);
        }
    },
    getters:{
        myAge(state){
            return state.age + 10
        }
    },
    strict:true,//如果不是在mutation中操作的状态会发生警告
    modules:{ 
        a:{
            // 解决父模块和子模块命名冲突的问题，没有命名空间 默认getters都会被定义在父模块上
            // mutations会被合并在一起,最终一起调用,有了命名空间就没有这个问题了
            namespaced:true,
            state:{
                name:'t1',
                age:10
            },
            getters:{
                myAge(state){
                    return state.age +199
                }
            },
            mutations:{
                changeAge(state,payload){
                     state.age += payload 
                }
            },
            actions:{
                changeAge({commit}, payload){
                    setTimeout(() => {
                        commit('changeAge', payload)
                    }, 1000);
                }
            },
            modules:{
                c:{
                    namespaced:true,
                    state:{
                        name:'t3',
                        age:20
                    },
                    getters:{
                        myAge(state){
                            return state.age +66
                        }
                    },
                    mutations:{
                        changeAge(state,payload){
                             state.age += payload 
                        }
                    },
                    actions:{
                        changeAge({commit}, payload){
                            setTimeout(() => {
                                commit('changeAge', payload)
                            }, 1000);
                        }
                    },
                }
            }
        },
    }
})