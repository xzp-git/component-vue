export default{
    //functional:true,//函数式组件，会导致render函数中没有this了
    // 正常组件是一个类 this._init() 如果是函数式组件就是一个普通函数
    props:{
        to:{
            type:String,
            required:true
        }
    },
    render(){

        const click = () => {
            this.$router.push(this.to)
        } 
        return <a onClick={click}>{this.$slots.default}</a>
    }
}