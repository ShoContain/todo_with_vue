<template>
  <div id="app" class="container">
    <img src="./assets/logo.png" class="logo">
    <TodoList />
  </div>
</template>

<script>
import TodoList from "./components/TodoList";

export default {
  name: 'App',
  components: {
    TodoList
  }
}
</script>

<style>
*{
  box-sizing: border-box;
}
.container{
  max-width: 680px;
  margin: 0 auto;
}
.logo{
  margin: 20px auto;
  display: block;
  height: 50px;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
  font-size: 24px;
}
</style>
