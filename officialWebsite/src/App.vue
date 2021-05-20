<template>
  <div id="app" :style="{'background-image':'url('+bgc+')'}">
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
		  bgc:require('./assets/img/banner.png')
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
  background-repeat: no-repeat;
  background-size: contain;
  background-position: top;
  position: relative;
  /* margin-top: 60px; */
}
.web-mid{
	min-height: 500px;
}
.web-top{
	margin-bottom: 800px;
}
.web-bottom{
	/* position: absolute;
	bottom: 0;
	width: 100%; */
}
</style>
