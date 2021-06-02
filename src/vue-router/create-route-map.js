export function createRouteMap(routes,oldPathMap) {
    //  如果有oldPathMap我需要将routes格式化后 放到oldPathMap
    

    // 如果没有传递 需要生成一个映射表
    let pathMap = oldPathMap || {}

    routes.forEach(route => {
        adRouteRecord(route,pathMap)
    })

    return {
        pathMap
    }

}

function adRouteRecord(route,pathMap,parent) {
    
    let path = parent?`${parent.path}/${route.path}` : route.path
    // 将记录和路径关联起来
    let record = { //路径会匹配到这个记录里面可以自定义属性
        path,
        component:route.component,
        props:route.props || {},
        parent
    }
    pathMap[path] = record
    route.children && route.children.forEach(childRoute => {
        adRouteRecord(childRoute,pathMap,record) //循环儿子的时候将父路径也同时穿进去 为的是崽子路由添加的时候可以拿到父路径
    })
    
}