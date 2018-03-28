<template>
  <div id="app">
    <img src="./assets/logo.png">
    <p> Copyright&nbsp;&copy;&nbsp;{{author}} - 2016 All rights reserved</p>
    <input placeholder="请输入内容" v-model="inputTxt">
    <button @click="setAuthor">修改</button>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <div>{{ count }}</div>
    <button value="click" @click="increment">click</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
       inputTxt:""
    }
  },
    methods: {
    increment () {
      this.$store.commit('increment')
      console.log(this.$store.state.count) // -> 1
    },
    setAuthor:function(){
      this.$store.commit('newAuthor',this.inputTxt)
    }
  },
  computed:{
    count(){
      return this.$store.state.count
    },
    author(){
      return this.$store.state.author
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
