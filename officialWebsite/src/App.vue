<template>
  <div id="app">
	  <TopMenu></TopMenu>
	  <BottomMenu class="web-bottom"></BottomMenu>
  </div>
</template>

<script>
import TopMenu from './components/TopMenu.vue'
import BottomMenu from './components/BottomMenu.vue'
export default {
  name: 'app',
  components: {
    TopMenu,BottomMenu
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
  min-height: 100vh;
  /* margin-top: 60px; */
}
.web-bottom{
	position: absolute;
	bottom: 0;
	width: 100%;
}
</style>
