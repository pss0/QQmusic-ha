<template>
  <div id="app" ref="wrapper">
    <div>
      <div class="wrap" v-for="(v,i) of list" :key='i'>
      <img :src="v.picUrl">
      <div class="wp" @click='gosonglist(i)'>
        <p v-for='(val,index) in v.songList' :key='index'>{{index+1}}  {{val.songname}}-<span>{{val.singername}}</span></p>
      </div>
    </div>
    <loading v-if="isshow"></loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loading from '../loading'
import BScroll from 'better-scroll'
export default {
  name: 'paihang',
  components:{loading},
  data(){
    return {
      list:[],
      isshow:true,
      scroll:{}
    }
  },
  methods:{
    gosonglist(i){
      console.log(this.list[i].id)
      this.$router.push({
        path:'/listdetail',
        query:{
          idss:this.list[i].id,
          title:this.list[i].topTitle
        }
      })
    }
  },
  created(){
    axios.get('/mobile/v8/fcg-bin/fcg_myqq_toplist.fcg?g_tk=994995197&uin=1371720415&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1546907201238').then(res=>{
     this.list = res.data.data.topList
    //  console.log(res.data.data.topList)
      this.isshow = false
      this.scroll = new BScroll(this.$refs.wrapper, {click:true})
    })
  },
   mounted(){
    
  }
}
</script>

<style scoped>
#app {
  width:100%;
  height: 87vh;
  overflow: hidden;
  margin-top: 1.705rem;
  background: #242416;
  font-size: .325rem;
  color: aliceblue;
}
.wrap{
  width: 92%;
  height: 2.6rem;
  background: #363636;
  margin: 0 auto;
  margin-bottom: .3rem;
  display: flex;
}
.wrap img{
  width: 2.6rem;
}
.wp{
  margin-left: .3rem;
  line-height: .7rem;
  margin-top: .2rem;
}
.wp p{
  width: 3.8rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #6a6a6a;
  /* background:red; */
}
</style>
