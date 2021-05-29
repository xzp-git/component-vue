<template>
  <div id="app">
   <h1> {{$store.state.name}}</h1>
   <h1> {{$store.state.age}}</h1>
   <button type="button" @click="fn">++++</button>
  </div>
</template>

<script>


export default {
name:'app',
methods:{
  fn(){
    this.$store.state.age++
    console.log(this.$store.state.age);
  }
}
}
</script>

<style>

</style>
