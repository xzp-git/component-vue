import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false



Vue.prototype.$dispatch = function(componentName, name){
  let parent = this.$parent
  while(parent){
    if(componentName == parent.$options.name){
      break
    }else{
      parent = parent.$parent
    }
  }
  if (parent) {
    if (name) {
      parent.$emit(name)    
    }
  }
  return parent
}

Vue.prototype.$broadcast = function(componentName, name){
  let children = this.$children

  let arr = []
  function find(children) {
    children.forEach(child => {
      if (child.$options.name == componentName) {
        arr.push(child)
        if (name) {
          child.$emit(name)
        }
      }
      if (child.$children) {
        find(child.$children)
      }
    })
  }
  find(children)
  return arr
}

new Vue({
  render: h => h(App),
}).$mount('#app')