<template>
  <div id="app" >
    <transition :name="transitionName">
      <router-view />
    </transition>
  </div>
</template>
<script>

    export default {
        name: 'app',
        data(){
            return {
                transitionName:'',
               
            }
        },
        methods: {
            
        },
        watch: {//使用watch 监听$router的变化
            $route(to, from) {
               if(to.meta.index > 0){
                   if(from.meta.index==1){
                     this.transitionName = 'slide-left';
                   }
                   if(from.meta.index){//如果是分享的页面直接打开不需要效果
                     if( to.meta.index < from.meta.index){
                        this.transitionName = 'slide-right';
                    }else{
                        this.transitionName = 'slide-left';
                    }
                   }
                    
                }else if(to.meta.index == 1 && from.meta.index > 0){
                    this.transitionName = 'slide-right';
                }
            }
        }
    }
</script>

<style>
  .slide-right-enter-active,
  .slide-right-leave-active,
  .slide-left-enter-active,
  .slide-left-leave-active {
    will-change: transform;
    transition: all .3s;
    position: absolute;
    width: 100%;
    left: 0;
  }

  .slide-right-enter {
    transform: translateX(-100%);
  }

  .slide-right-leave-active {
    transform: translateX(100%);
  }

  .slide-left-enter {
    transform: translateX(100%);
  }

  .slide-left-leave-active {
    transform: translateX(-100%);
  }
</style>