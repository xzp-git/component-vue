<template>
  <el-menu>
    <template v-for="item in data">
        <resub :data='item' :key="item.title"></resub>
    </template>
    
    <!-- <el-menu-item>菜单2</el-menu-item>
    <el-submenu>
      <template #title>标题3</template>
      <el-menu-item>菜单3-1</el-menu-item>
      <el-menu-item>菜单3-2</el-menu-item>
    </el-submenu> -->
  </el-menu>
</template>

<script>
import resub from "@/components/resub.vue";
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
    resub
  },
};
</script>

<style>
</style>