import { forEach } from "./util";
import Module from "./module";

class ModuleCollection {
    constructor(options) {
        //对数据进行格式化操作
        this.root = null;
        this.register([], options)
    }
    register(path, rawModule) {
        let newModule = new Module(rawModule)
        rawModule.newModule = newModule
        if (path.length == 0) {
            this.root = newModule
        }else{
            // 找父亲
            let parent = path.slice(0,-1).reduce((memo,current) => {
                return memo.getChild(current)
            },this.root)
            parent.addChild(path[path.length - 1], newModule)
            
        }

        if (rawModule.modules) {
            forEach(rawModule.modules, (module, key) => {
                this.register( path.concat(key), module)
            })
        }

    }
    getNamespaced(path){
        let root = this.root
        let ns = path.reduce((ns,key)=>{
          let module = root.getChild(key)
          root = module
          return module.namespaced? ns + key+'/' : ns
        }, '')
        return ns
    }
}


export default ModuleCollection