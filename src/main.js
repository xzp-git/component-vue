import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

Vue.prototype.$dispatch = function(componentName, name){
  const parent = this.$parent
  while(parent){
    if(componentName == parent.$options.name){
      
    }
  }
}