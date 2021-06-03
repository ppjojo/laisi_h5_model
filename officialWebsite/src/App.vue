<template>
  <div id="app" >
	  <TopMenu class="web-top"></TopMenu>
	  <router-view class="web-mid"></router-view>
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
  },
  data(){
	  return{
		  
	  }
  },
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
}
.web-mid{
	min-height: 500px;
}
.web-top{
	position: fixed;
  top: 0;
  width:100%;
  z-index: 9;
}
.web-bottom{
	/* position: absolute;
	bottom: 0;
	width: 100%; */
}
</style>
