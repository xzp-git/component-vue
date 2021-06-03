<template>



        <el-menu-item  v-if="!data.children">{{data.title}}</el-menu-item>
        <el-submenu v-else>
        <template #title>{{data.title}}</template>
        <template v-for="d in data.children">
            <resub :data="d" :key="d.title"></resub>
        </template>
        </el-submenu>


</template>

<script>
import ElMenu from "@/components/el-menu.vue";
import ElMenuItem from "@/components/el-menu-item.vue";
import ElSubmenu from "@/components/el-submenu.vue";

export default {
  name:'resub',
  props: {
    data: {},
  },
  components: {
    ElMenu,
    ElMenuItem,
    ElSubmenu,
  },
};
</script>

<style>
</style>