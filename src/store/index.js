import Vue from "vue";
import Vuex from "@/vuex"


Vue.use(Vuex)


export default new Vuex.Store({
    state:{
        name:'zf',
        age:12
    },
    mutations:{

    },
    actions:{

    },
    getters:{
        myAge(state){
            return state.age + 10
        }
    },
    modules:{

    }
})