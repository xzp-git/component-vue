export let Vue

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate(){
            let options = this.$options
            if (options.store) {
                this.$store = options.store
            }else{
                // 先保证他是一个子组件，并且父亲上有$store
                if (this.$parent && this.$parent.$store) {
                    this.$store = this.$parent.$store
                }
            }
        }
    })
}


export default install