<template>
  <div class="box">
      <ul>
          <li v-for="(i, index) in list" :key="index">
              <img v-lazy="i">
          </li>
      </ul>
  </div>
</template>

<script>
import axios from "axios";
import Vue from "vue";
import logo from "@/assets/logo.png";
import VueLazyLoad from "./vue-lazyload.js";
Vue.use(VueLazyLoad,{
    loading:logo,
    preload:1.2//在我们屏幕中1.2的位置先加载，其它的等待加载
})
export default {
    // created(){//服务端渲染支持created 

    // },
    data(){
        return{
            list:[]
        }
    },
    async mounted(){
       let {data:imgs} = await axios.get('http://localhost:3000/api/list')
       this.list = imgs
    }
}
</script>

<style>
* {
    list-style: none;
}
.box {
    width: 400px;
    height: 900px;
    overflow: scroll;
}
img{
    width: 100px;
    height: 150px;
}
</style>