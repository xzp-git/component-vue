<template>
  <div id="app">
    <!-- <clickOutSide></clickOutSide> -->
    <!-- <vueLazyLoad></vueLazyLoad> -->
    <Form></Form>
  </div>
</template>

<script>
// import clickOutSide from "@/components/click-outside";
// import vueLazyLoad from "@/components/vue-lazyload.vue";
import Form from "@/components/form.vue";

export default {
  name: 'App',
  components:{
    // clickOutSide,
    // vueLazyLoad,
    Form,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
