import History from "./base";

function ensureHash() {
    if (!window.location.hash) {
        window.location.hash = '/'
    }
}
function getHash() {
    return window.location.hash.slice(1)
}
export default class Hash extends History {
    constructor(router) {
        super(router)
        //hash路由初始化的时候要加一个 /#/
        ensureHash()
        this.router.matcher
    }
    getCurrentLocation() {


        return getHash()
    }

    setUpListener() {
        window.addEventListener('hashchange', () => {
            //hash值变化 再去切换组件
            this.transitionTo(getHash())
        })
    }
    pushState(location){
        window.location.hash = location
    }
}