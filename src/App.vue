<template>
  <div id="app">
   <h1> {{$store.state.name}}</h1>
   <h1> {{$store.state.age}}</h1>
   <h1> {{$store.getters.myAge}}</h1>
    <h1> {{$store.getters.myAge}}</h1>
   <button type="button" @click="fn">++++</button>
   <button type="button" @click="$store.commit('changeAge',10)">mutation</button>
    <button type="button" @click="$store.dispatch('changeAge',10)">dispatch</button>
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
