 <template>
  <div id="app">
    <div class="banner">
      <img :src="imgsrc">
      <div class="top">
        <img src="/static/img/return.png" @click="retu">
        <p class="title">{{title}}</p>
        <!-- <marquee behavior="slide" direction="left" white='6.5rem'><p class="title">{{title}}</p></marquee> -->
      </div>
      <p class="click"> <!--v-if="isall"-->
        <span>随机播放全部</span>
      </p>
      <div class="fang"></div>
    </div>
    <div class="songlist" ref="wrapper">
      <div>
        <div
          class="li"
          v-for="(v,i) in list"
          :key="i"
          :class="indexs == i?'active':''"
          @click="bofang(i,v)"
        >
          <p>{{v.musicData.songname}}</p>
          <p>{{v.musicData.albumdesc ? v.musicData.albumdesc : v.musicData.songname}}</p>
        </div>
        <p class="jiazaig" @click="jiazaiz">加载更多</p>
      </div>
    </div>
    <!-- <div class="bofang" ref="bio"></div> -->
    <loading v-if="loadings"></loading>
    <songplay :currentLyric='currentLyric' @xiayi='xiayi' :dates='dates' :urls='urls' v-if="isaudio"></songplay>
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import loading from "../loading";
import songplay from '../songplay'
let Base64 = require('js-base64').Base64;
import geci from 'lyric-parser'
export default {
  name: "singerdetail",
  data() {
    return {
      title: "",
      imgsrc: "",
      list: [],
      indexs: null,
      scroll: {},
      loadings: true,
      nums: 1,
      isall:true,
      audiourl:[],
      isaudio:false,
      urls:'',
      dates:{},
      currentindex:0,
      lyric:'',
      currentLyric:{},
      gecis:[]
      // gecis:""
    };
  },
  components: { loading,songplay },
  methods: {
    getdata() {
      var t = this.$route.query.id;
      axios
        .get(
          "/pc/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&singermid=" +
            t +
            "&order=listen&begin=0&num=" +
            this.nums * 30 +
            "&songstatus=1"
        )
        .then(res => {
          // console.log(res)
          this.scroll = new BScroll(this.$refs.wrapper,{click:true})
          this.title = this.$route.query.title;   
          this.imgsrc = this.$route.query.banner;
          this.list = res.data.data.list;
          this.loadings = false;
          var right = res.data.data.list
          right.forEach(res=>{
            this.audiourl.push(res.musicData.albummid)
            // console.log(this.audiourl)
          })
        });
    },
    pushzt(res){
      this.isaudio = true
    },
    retu: function() {
      this.$router.push("/geshou");
    },
    bofang(i,v) {
        this.indexs = i;
        this.isall = false
        this.isaudio = true
        this.currentindex = i
        this.dates = this.list[i]
        this.getsong()
        this.getlyric()
    },
    getsong(){
      axios
        .get(
          "/getdata/cgi-bin/musicu.fcg?-=getplaysongvkey9592700474141493&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22songmid%22%3A%5B%22" +
          this.list[this.currentindex].musicData.songmid +
          "%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D"
        )
        .then(res => {
          this.urls =res.data.req.data.sip[0] + res.data.req_0.data.midurlinfo[0].purl;
        });
    },
    getlyric(){
      axios.get('/mobile/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1547542073184&songmid='+this.list[this.currentindex].musicData.songmid+'&g_tk=827187934&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0').then(res=>{
        this.lyric = Base64.decode(res.data.lyric)
        this.currentLyric = new geci(this.lyric,this.handleLyric)
        this.currentLyric = this.currentLyric.lines
      })
    },
    xiayi(res){
      if(res == '1'){
        this.currentindex++
        this.dates = this.list[this.currentindex]
        this.getsong()
        this.getlyric()
        this.indexs++
      }
      if(res == '李振豪'){
        this.currentindex--
        this.dates = this.list[this.currentindex]
        this.getsong()
        this.getlyric()
      }
    },
    jiazaiz(evt) {
      evt.target.innerHTML = "加载中...";
      this.nums++;
      var t = this.$route.query.id;
      axios
        .get(
          "/pc/v8/fcg-bin/fcg_v8_singer_track_cp.fcg?g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&singermid=" +
            t +
            "&order=listen&begin=0&num=" +
            this.nums * 30 +
            "&songstatus=1"
        )
        .then(res => {
          var dd = this.nums * 30 - 30;
          var ddd = res.data.data.list;
          ddd.splice(0, dd);
          ddd.forEach((v, i) => {
            this.list.push(v);
          });
          evt.target.innerHTML = "加载更多";
          if (res.data.data.list == "") {
            evt.target.innerHTML = "你能再拉出一条我吃屎";
            evt.target.style.color = "yellow";
          }
        });
    }
  },
  created() {
    this.getdata();
    // 评论接口
    // axios.get('/mobile/base/fcgi-bin/fcg_global_comment_h5.fcg?g_tk=827187934&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=GB2312&notice=0&platform=yqq.json&needNewCode=0&cid=205360772&reqtype=2&biztype=2&topid=1796874&cmd=8&needmusiccrit=0&pagenum=0&pagesize=25&lasthotcommentid=&domain=qq.com&ct=24&cv=101010').then(res=>{
    //   console.log(res)
    // })
  },
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  background: #242416;
  font-size: 0.325rem;
  color: white;
  overflow: hidden;
  
}
.banner {
  position: relative;
}
.active p:nth-child(2) {
  color: aqua !important;
  width: 100%;
}
.active {
  color: aqua;
  border-left: 5px solid blue;
}
.banner img {
  width: 100%;
  height: 6rem;
  position: absolute;
  top: 0;
  left: 0;
  /* z-index: -1000; */
}
.top {
  width: 100%;
  height: 0.7rem;
  position: absolute;
  top: 0;
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
.top p {
  width: 6.5rem;
  /* background: pink; */
  /* margin-left: .8rem; */
  margin: 0 auto;
  text-align: center;
  color: white;
  letter-spacing: 0.1rem;
  font-size: 0.37rem;
}
.jiazaig {
  text-align: center;
  height: 1rem;
  /* background: red; */
  line-height: 1rem;
}
.top img {
  width: 0.5rem;
  height: 0.5rem;
  margin-top: 0.1rem;
  margin-left: 0.1rem;
}
.click {
  width: 2.4rem;
  height: 0.6rem;
  border: 2px solid #d9c245;
  line-height: 0.6rem;
  border-radius: 0.4rem;
  text-align: center;
  color: #d9c245;
  position: absolute;
  top: 5rem;
  left: 2.66rem;
  font-size: 0.3rem;
}
.songlist {
  overflow: hidden;
  width: 100%;
  height:7.5rem;
  /* background: red; */
  margin-top: 6rem;
}
.li {
  width: 100%;
  height: 1.5rem;
  /* background: red; */
  text-indent: 0.3rem;
  line-height: 0.28rem;
  overflow: hidden;
}
.li p:nth-child(1) {
  margin-top: 0.1rem;
  margin-bottom: 0.1rem;
  width: 7.2rem;
  padding: 0.2rem 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  /* background: red; */
}
.li p:nth-child(2) {
  color: #484847;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bofang{
    width: 100%;
    height: 1.45rem;
    background: red;
    position:fixed;
    top: 4.55rem;
    left: 0;
    transition: all 1s;
    opacity: 0;
}
</style>
