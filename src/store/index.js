import Vue from "vue";
import Vuex from "@/vuex"


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

    }
})