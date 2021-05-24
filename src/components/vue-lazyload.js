
import _ from 'lodash'
const scrollParent = (el) => {
    let parent = el.parentNode
    while(parent){
        if(/scroll/.test(getComputedStyle(parent)['overflow'])){
            return parent
        }
        parent = parent.parentNode
    }
    return parent
}

const render = (listener, status) => {
    let el = listener.el;
    let src = ''
    switch(status){
        case 'loading':
            src = listener.options.loading
            break
        case 'loaded':
            src = listener.src
            break
        case 'error':
            src = listener.options.error
            break
        default:
            break
    }
    el.setAttribute('src',src)
}
const loadImg = (src, resolve, reject) => {
    let img = new Image();
    img.src = src
    img.onload = resolve
    img.onerror = reject
}
const lazy = (Vue) => {
    class ReactiveListener{
        constructor({el,  src, options}){
            this.el = el
            this.src = src
            this.state = {loading:false}
            this.options = options
        }
        checkInView(){
            //当前元素距离屏幕的位置
            let {top} =  this.el.getBoundingClientRect()
            return top < window.innerHeight * this.options.preload
        }
        load(){
            // 先显示loading图片,再去加载真实图片，图片成功显示成功内容，失败显示失败内容
            render(this, 'loading')
            loadImg(this.src,()=> {
                this.state.loading =true
                render(this, 'loaded')
            },() => {
                this.state.loading =true
                render(this, 'error')
            })
        }
    }
    return class LazyClass {
        constructor(options){
            this.options = options
            this.bindHandler = false
            this.listeners = []
        }
        add(el, bindings){
            
           
            Vue.nextTick( () => {
               let ele = scrollParent(el)

                // 1.监控el是否需要显示
                let listener = new ReactiveListener({
                    el,
                    src:bindings.value,
                    options:this.options
                })
                this.listeners.push(listener)
               if(!this.bindHandler){
                   //降低频率用节流 防抖是指触发一次
                    // 2.绑定滚动事件
                   let lazyHandler =  _.throttle(this.lazyLoadHandler.bind(this),500)
                   ele.addEventListener('scroll',lazyHandler,{
                       passive:true
                   })
                   this.bindHandler = true
                }
                this.lazyLoadHandler() //初始化当前需要展示的
            } )
        }
        lazyLoadHandler(){
            //看一下那些需要加载
            // 1.在可视区域内 2.该元素没有被加载

            this.listeners.forEach(listener => {
                if(listener.state.loading) return
                //如果自己在可视区域内 自己就加载
                listener.checkInView() && listener.load()
            })
        }
        unbind(){

        }
    }
}

const VueLazyLoad = {
    install(Vue, options){
        const LazyClass = lazy(Vue)

        const lazyInstance = new LazyClass(options)
        Vue.directive('lazy',{
            bind:lazyInstance.add.bind(lazyInstance),
            unbind:lazyInstance.unbind.bind(lazyInstance)
        })
    }
}


export default VueLazyLoad