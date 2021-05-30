<template>
  <div id="app">
   <h1> {{$store.state.name}}</h1>
   <h1> {{$store.state.age}}</h1>
   <h1> {{$store.getters.myAge}}</h1>
    <h1> {{$store.getters.myAge}}</h1>
   <button type="button" @click="fn">++++</button>
   <button type="button" @click="$store.commit('changeAge',10)">mutation</button>
    <button type="button" @click="$store.dispatch('changeAge',10)">dispatch</button>
  <hr>

  t1的年龄 {{this.$store.state.a.name}} {{this.$store.state.a.age}} <br>
  t1的计算属性 {{this.$store.getters['a/myAge']}}
  <button type="button" @click="$store.commit('a/changeAge',10)">T1-mutation</button>
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
