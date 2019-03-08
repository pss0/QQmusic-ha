 <template>
  <div id="app">
    <div class="banner">
        <!-- <img :src="titleimg"> -->
        <div class="top">
            <img src="/static/img/return.png" @click='retu'>
            <p class="title">{{ccz}}</p>
        </div>
        <div class="cca">
            <img :src="title.pic_v12">
            <div>
                <p>{{title.ListName}}</p>
                <p>第{{tian}}天</p>
                <p>{{nian}}更新</p>
            </div>
        </div>
        <p class="click" v-if="isall"><span>随机播放全部</span></p>
    </div>
    <div class="songlist" ref="wrapper">
        <div>
            <div class="li" v-for="(v,i) in list" :class="indexs == i?'active':''" :key='i' @click='bofang(i,v)'>
                <p class="haha" v-if="i >= 3">{{i+1}}</p>
                <img v-if="i == 0" src="/static/img/images/one_03.png">
                <img v-if="i == 1" src="/static/img/images/two_03.png">
                <img v-if="i == 2" src="/static/img/images/san_03.png">
                <div>
                    <p>{{v.data.songname}}</p>
                    <p>{{v.data.singer[0].name}}</p>
                </div>
            </div>
        </div>
    </div>
    <div class="bofang" ref="bio">
        <audio id="audio" :src="audiourl" autoplay></audio>
        <img :src='isbo?"/static/img/icon_播放器_播放.png":"/static/img/icon_播放器_暂停.png"' class="img1" @click='play'>
        <div class="div">
            <p>{{vivi}}</p>
            <p>{{songgeci}}</p>
        </div>
    </div>
    <loading v-if="isshow"></loading>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import loading from '../loading'
export default {
  name: 'listdetail',
  data (){
    return {
        isshow:true,
        title:'',
        nian:'',
        tian:'',
        num:0,
        list:[],
        scroll:{},
        ccz:'',
        indexs:null,
        isall:true,
        audiourl:'',
        vivi:'',
        songgeci:'曲  李振豪',
        isbo:true
    }
  },
  components:{loading}, 
  methods:{
      retu:function(){
        this.$router.push('/paihang')
        // 说唱榜  MV K歌金曲
      },
      bofang(i,v){
        this.vivi=v.data.songname
          this.indexs = i
          this.$refs.bio.style.opacity=1
             this.isall = false
            
        axios.get('/getdata/cgi-bin/musicu.fcg?-=getplaysongvkey8886040214634232&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22songmid%22%3A%5B%22'+v.data.songmid+'%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A24%2C%22cv%22%3A0%7D%7D').then(res=>{
            this.audiourl = res.data.req.data.sip[0]+res.data.req_0.data.midurlinfo[0].purl;
        })
      },
      play(){
        if(this.isbo){
            this.audio.pause()
        }else{
            this.audio.play()
        }
        this.isbo =!this.isbo 
      }
  },
  created(){
     var sf =this.$route.query.idss
     axios.get('/mobile/v8/fcg-bin/fcg_v8_toplist_cp.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&tpl=3&page=detail&type=top&topid='+sf+'&_=1547032726669').then(res=>{
         this.list = res.data.songlist
         console.log(res.data)
         if(this.list.length <= 100){

         }else{
             this.list.length = 100
         }
         this.title = res.data.topinfo
         this.nian = res.data.update_time
         this.tian = res.data.day_of_year
         this.num = res.data.cur_song_num
         this.scroll = new BScroll(this.$refs.wrapper,{click:true})
         this.ccz = this.$route.query.title
         this.isshow = false
     })
  },
  mounted(){
    this.audio = document.getElementById('audio')
  }
}
</script>

<style scoped>
#app {
  width:100%;
  height: 100vh;
  background: #242416;
  font-size: .325rem;
  color: white;
  overflow: hidden;
}
.banner{
    position: relative;
    width: 100%;
    height: 5rem;
    overflow: hidden;
    background: #ccc;
    /* background: blue; */
}
.bofang{
    width: 100%;
    height: 1.25rem;
    background:#aaa;
    position:fixed;
    top: 3.75rem;
    left: 0;
    transition: all 1s;
    display: flex;
    align-items:center;
    opacity: 0;
}
.banner img{
    width: 3rem;
    height: 3rem;
    /* width: 100%;
    height: 5rem;
    position: absolute;
    top: 0;
    left: 0; */
    /* z-index: -1000; */
}
.img1{
    width: 1rem;
    height: 1rem;
    margin-left: .2rem;
}
.div{
    margin-left: .2rem;
    line-height: .5rem;
}
.div p:nth-child(2){
    font-size: .26rem;
    color: #999999;
}
.cca{
    width: 80%;
    height: 3rem;
    /* background: red; */
    /* margin: 0 auto; */
    margin-top: .8rem;
    margin-left: .3rem;
    display: flex;
    text-indent: .2rem;
}
.haha{
    display: block;
    width: .6rem;
    height: 1rem;
    /* background: blue; */
    line-height: 1rem;
    text-align: center;
    margin-left: .3rem;
    margin-top: .3rem;
    color: #7e6818;
    font-weight: bold;
}
.cca p:nth-child(1){
    font-size: .37rem;
    margin-top: .75rem;
}
.cca p:nth-child(2){
    /* font-size: .37rem; */
    margin-top: .2rem;
}
.cca p:nth-child(3){
    /* font-size: .37rem; */
    margin-top: .2rem;
}
.top{
    width:100%;
    height: .7rem;
    position: absolute;
    top:0;
    left: 0;
    /* transform: translate(-1%,-50%); */
    /* text-align: center; */
    /* left: .3rem; */
    color: red;
    /* background: blue; */
    z-index: 1;
    display: flex;
    align-items: center;
}
.top p{
    /* width: 6.5rem; */
    /* background: pink; */
    /* margin-left: .8rem; */
    text-align: center;
    margin: 0 auto;
    font-size: .4rem;
    color: white;
    letter-spacing: .1rem;
}
.active div p:nth-child(2){
    color: aqua !important;
}
.top img{
    width: .5rem;
    height: .5rem;
    margin-top: .1rem;
    margin-left: .1rem;
}
.click{
    width: 2.4rem;
    height: .6rem;
    border:2px solid #d9c245;
    line-height: .6rem;
    border-radius: .4rem;
    text-align: center;
    color: #d9c245;
    position: absolute;
    top: 4.2rem;
    left: 2.66rem;
    font-size: .3rem;
}
.songlist{
    overflow: hidden;
    width: 100%;
    height:8.5rem;
    /* background: red; */
    margin-top: 0rem;
}
.active{
    color: aqua;
}
.li{
    width: 100%;
    height: 1.5rem;
    /* background: red; */
    /* text-indent: .3rem; */
    line-height: .3rem;
    overflow: hidden;
    position: relative;
    /* display: flex;
    align-items: center; */
}
.li div p:nth-child(1){
    margin-top: .1rem;
    margin-bottom: .1rem;
    width: 7.2rem;
    padding: .2rem 0;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    /* background: red; */
}
.li img{
    width: .6rem;
    height: 1rem;
    /* background: blue; */
    /* line-height: 1rem;
    text-align: center; */
    margin-left: .3rem;
    margin-top: .3rem;
    /* color: #7e6818;
    font-weight: bold; */
}
.li div{
    position: absolute;
    top: 0rem;
    left: 1.4rem;
    /* margin-left: .4rem; */
}
.li div p:nth-child(2){
    color: #484847;
}
</style>
