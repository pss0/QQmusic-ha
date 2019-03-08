<template>
  <div id="app">
    <div class="top">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
      <span class="bg"><img src="/static/img/bg.png" class="img"><span class="sss">Chicken Music</span></span>
      <span></span>
      <span></span>
      <img src="/static/img/as_03.png" @click="gocenter">
    </div>
    <div class="list">
      <router-link to="/tuijian" active-class="cur"><span class="spanwhite" @click='xian(0)'>推荐</span></router-link>
      <router-link to="/geshou" active-class="cur"><span class="spanwhite" @click='xian(1)'>歌手</span></router-link>
      <router-link to="/paihang" active-class="cur"><span class="spanwhite" @click='xian(2)'>排行</span></router-link>
      <router-link to="/sosuo" active-class="cur"><span class="spanwhite" @click='xian(3)'>搜索</span></router-link>
    </div>
    <!-- <leftlist v-if="isx"></leftlist> -->
  </div>
</template>

<script>
import axios from 'axios'
// import leftlist from './leftlist'
export default {
  name: 'indexHeader',
  data (){
    return {
      curen:0,
      isx:true
    }
  },
  components:{},
  methods:{
    xian:function(i){
     
    },
    gocenter(){
      this.$router.push('/PersonalCenter')
    }
  },
  created () {
    
  },
}
</script>

<style scoped>
#app {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.705rem /* 30/16 */;
  /* border-bottom: 1px solid #ccc; */
  color: white;
  z-index: 100000000;
  /* background:blue;  */
}
.top{
  height: .875rem /* 14/16 */;
  /* border-bottom: 1px solid white; */
  display: flex;
  justify-content: space-around;
  align-items: center;
  /* line-height: 1.75rem; */
}
.top img{
  width: .625rem /* 10/16 */;
  height: .625rem /* 10/16 */;
}
.spanwhite{
  color: white;
  padding-bottom: .1rem;
}
.bg{
  overflow: hidden;
  display: flex;
  align-items: center;
}
.cur{
  color: #aa9549 !important;
  font-weight: bold;
  padding-bottom: .1rem;
  border-bottom: 2px solid #aa9549;
}
.cur span{
  color: #aa9549 !important;
}
.sss{
  padding-left: .1375rem /* 7/16 */;
  font-size: .4rem;
  font-weight: bold;
  color: #aa9549;
}
.list{
  height: .8rem;
  /* background: red; */
  display: flex;
  align-items: center;
  justify-content: space-around;
}
</style>
