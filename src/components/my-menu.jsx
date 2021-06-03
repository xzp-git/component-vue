


import ElMenu from "@/components/el-menu.vue";
import ElMenuItem from "@/components/el-menu-item.vue";
import ElSubmenu from "@/components/el-submenu.vue";

export default {
  props: {
    data: {
      type: Array,
    },
  },
  components: {
    ElMenu,
    ElMenuItem,
    ElSubmenu,

  },
  render(){
    let renderChildren = (data) => {
      return data.map(child => (
        
          child.children?
          <el-submenu>
            <div slot="title">{child.title}</div>
            {renderChildren(child.children)}
          </el-submenu>
          :<el-menu-item>{child.title}</el-menu-item>
          
        
      ))
    }
    return <el-menu>
      {renderChildren(this.data)}
    </el-menu>
  }
};

