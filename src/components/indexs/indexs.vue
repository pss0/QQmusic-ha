<template>
  <div id="app" class="bscroll" ref="bscroll">
    <indexheader></indexheader>
    <router-view></router-view>
  </div>
</template>

<script>
import indexheader from './indexHeader'
// import indexswiper from './indexswiper'
// import BScroll from 'better-scroll'
export default {
  name: 'indexs',
  data (){
    return {
      color:'tuijian',
      aBScroll:{},
    }
  },
  components:{indexheader}, 
  methods:{
  },
  // mounted(){
  //   this.$nextTick(() => {
  //       let bscrollDom = this.$refs.bscroll;
  //       this.aBScroll = new BScroll(bscrollDom,{click: true})
  //   })
  // }
}
</script>

<style scoped>
#app {
  width:100%;
  height: 100vh;
  background: #242416;
  font-size: .325rem;
  color: white;
}
.bscroll{
    width: 100%;
    /* height: 5vH; */
    /* overflow: hidden; */
}
.cur{
  color: #aa9549;
  font-weight: bold;
  border-bottom: 1px solid #aa9549;
}
</style>
