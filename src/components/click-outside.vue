<template>
  <div class="box" v-click-outside="hide">
      <input type="text" @focus="show">
      <div v-show="isShow">
          面板
      </div>
  </div>
</template>

<script>
// 指令特点可以服用 核心就是控制dom

// 自定义指令 clickoutside  
// 图片懒加载
// 虚拟滚动
export default {
  name:'clickOutside',
  directives:{
    clickOutside:{
      bind(el, bindings, vnode){
        const handler = (e) => {
          if (!el.contains(e.target)) {
           let fn = vnode.context[bindings.expression]  //hide
           fn()
          }
        }
        el.handler = handler
        // 只要点击的不是box中的内容就隐藏掉
        document.addEventListener('click', handler)
      },
      unbind(){
        document.removeEventListener('click', el.handler)
      }
    }
  },
 data ( ) { //合并时
     return {
         isShow:false
     }
 },
 methods:{
     show(){
         this.isShow = true
     },
     hide(){
         this.isShow = false
     }
 }
}
</script>

<style>
.box{
    display: flex;
    flex-direction: column;
    border: 1px solid red;
}
</style>