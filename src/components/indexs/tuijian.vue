<template>
  <div id="app" ref="wrapper">
    <div class="haha">
      <swiper class="hei" :options='swiperOption'>
        <swiper-slide v-for='(val,index) in lists' :key='index'>
          <img :src="val.picUrl" class="hahaha">
          <a class="tiao" :href="val.linkUrl"></a>
        </swiper-slide>
      </swiper>
      <p id="p1" v-if='!loading'>热门歌单推荐</p>
      <div class="d1" v-for="(v,i) in list" :key='i' @click='pulldata(i)'>
        <img :src="v.cover">
        <!-- <a :href="v.cover"></a> -->
        <div>
          <p class="now">{{v.title}}</p>
          <p class="p2">播放量  {{v.listen_num}}</p>
        </div>
      </div>
      <loading v-if='loading'></loading>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import loading from '../loading'
import BScroll from 'better-scroll'
export default {
  name: 'tuijian',
  components:{loading},
  data(){
    return {
      list:[],
      lists:[],
      loading:true,
      scroll:{},
      swiperOption:{
        autoplay:{
          delay:3000
        }
      }
    }
  },
  methods:{
    pulldata:function(i){
      console.log(this.list[i].content_id)
      // this.$store.commit('ok',this.list[i].content_id)
      // this.$router.push('/songlistdetail')
      this.$router.push({
        path:'/songlistdetail',
        query:{
          id:this.list[i].content_id
        }
      })
    }
  },
  created(){
    // this.$store.commit('ok',true)
    axios.get('/getdata/cgi-bin/musicu.fcg?-=recom0715082530022535&g_tk=994995197&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%7D%2C%22category%22%3A%7B%22method%22%3A%22get_hot_category%22%2C%22param%22%3A%7B%22qq%22%3A%22%22%7D%2C%22module%22%3A%22music.web_category_svr%22%7D%2C%22recomPlaylist%22%3A%7B%22method%22%3A%22get_hot_recommend%22%2C%22param%22%3A%7B%22async%22%3A1%2C%22cmd%22%3A2%7D%2C%22module%22%3A%22playlist.HotRecommendServer%22%7D%2C%22playlist%22%3A%7B%22method%22%3A%22get_playlist_by_category%22%2C%22param%22%3A%7B%22id%22%3A8%2C%22curPage%22%3A1%2C%22size%22%3A40%2C%22order%22%3A5%2C%22titleid%22%3A8%7D%2C%22module%22%3A%22playlist.PlayListPlazaServer%22%7D%2C%22new_song%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetNewSong%22%2C%22param%22%3A%7B%22type%22%3A0%7D%7D%2C%22new_album%22%3A%7B%22module%22%3A%22music.web_album_library%22%2C%22method%22%3A%22get_album_by_tags%22%2C%22param%22%3A%7B%22area%22%3A7%2C%22company%22%3A-1%2C%22genre%22%3A-1%2C%22type%22%3A-1%2C%22year%22%3A-1%2C%22sort%22%3A2%2C%22get_tags%22%3A1%2C%22sin%22%3A0%2C%22num%22%3A40%2C%22click_albumid%22%3A0%7D%7D%2C%22toplist%22%3A%7B%22module%22%3A%22music.web_toplist_svr%22%2C%22method%22%3A%22get_toplist_index%22%2C%22param%22%3A%7B%7D%7D%2C%22focus%22%3A%7B%22module%22%3A%22QQMusic.MusichallServer%22%2C%22method%22%3A%22GetFocus%22%2C%22param%22%3A%7B%7D%7D%7D').then(res=>{
        this.list = res.data.recomPlaylist.data.v_hot
        this.scroll = new BScroll(this.$refs.wrapper, {click:true})
        this.loading = false
        // console.log(res)
    })
    axios.get('/mobile/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=994995197&uin=1371720415&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1546859659638').then(res=>{
        this.lists = res.data.data.slider
        this.loading = false
        // console.log(res)
    })

  },
  mounted(){
    
  }
}
</script>

<style scoped>
#app {
  width:100%;
  height: 88vh;
  margin-top: 1.705rem;
  background: #242416;
  font-size: .325rem;
  color: aliceblue;
  overflow: hidden;
}
.hahaha{
    width: 100%;
    height: 100%;
}
.hei{
  height: 3rem;
}
.haha{
  /* height: auto; */
  background: #242416;
}
#p1{
  color: #aa9549;
  font-weight: bold;
  text-align: center;
  margin-top: .5rem;
  margin-bottom: .5rem;
}
.tiao{
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
}
.now{
  width: 5.1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.d1{
  width: 90%;
  height: 1.5rem;
  /* background: red; */
  margin: 0 auto;
  display: flex;
  margin-bottom: .3rem;
  position: relative;
  z-index: 1;
}
.d1 a{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  /* background: red; */
}
.d1 img{
  width: 1.5rem;
}
.d1 div{
  margin-left: .5rem;
  line-height: .7rem;
}
.p2{
  color: #5e5e5e;
}
</style>
