import Vue from "vue";
import Vuex from "@/vuex"
// import Vuex from "vuex"


Vue.use(Vuex)


export default new Vuex.Store({
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
            console.log("getters!!!!!!!!");
            return state.age + 10
        }
    },
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
        b:{
            namespaced:true,
            state:{
                name:'t2',
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
})