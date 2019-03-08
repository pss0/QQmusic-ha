 <template>
  <div id="app">
    <div class="banner">
      <img :src="bannersrc">
      <div class="top">
        <img src="/static/img/return.png" @click="retu">
        <p class="title">{{title}}</p>
      </div>
      <p class="click" v-if="isall">
        <span>随机播放全部</span>
      </p>
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
          <p>{{v.songname}}</p>
          <p>{{v.albumdesc}}</p>
        </div>
      </div>
      <songlistplay :currentLyric='currentLyric' @xiayi='xiayi' :dates='dates' :urls='urls' v-if="isplay"></songlistplay>
    </div>
    <loading v-if="isshow"></loading>  
  </div>
</template>

<script>
import axios from "axios";
import BScroll from "better-scroll";
import loading from "../loading";
import songlistplay from "../songlistplay";
let Base64 = require('js-base64').Base64;
import geci from 'lyric-parser'
export default {
  name: "songlistdetail",
  data() {
    return {
      bannersrc: "",
      title: "",
      list: "",
      scroll: {},
      isshow: true,
      indexs: null,
      isall: true,
      isplay: false,
      currentindex:0,
      dates:{},
      urls:'',
      currentLyric:{}
    };
  },
  components: { loading,songlistplay },
  methods: {
    retu: function() {
      this.$router.push("/tuijian");
    },
    bofang(i, v) {
        console.log(v)
       this.isplay = true;
      this.indexs = i;
      this.dates = v;
      this.getlyric()
      this.getsong()
    },
    getlyric() {
      axios
        .get(
          "/mobile/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1547542073184&songmid=" +
            this.list[this.indexs].songmid +
            "&g_tk=827187934&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0"
        )
        .then(res => {
          this.lyric = Base64.decode(res.data.lyric);
          this.currentLyric = new geci(this.lyric, this.handleLyric);
        this.currentLyric = this.currentLyric.lines
        });
    },
    xiayi(res){
      // console.log(res)
      if(res == '1'){
        // this.currentindex++
        this.indexs++
        this.dates = this.list[this.indexs]
        this.getsong()
        
      }
      if(res == '李振豪'){
        this.indexs--
        this.dates = this.list[this.indexs]
        this.getsong()
      }
    },
    getsong(){
      axios
        .get(
          "/getdata/cgi-bin/musicu.fcg?-=getplaysongvkey9592700474141493&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22songmid%22%3A%5B%22" +
          this.list[this.indexs].songmid +
          "%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D"
        )
        .then(res => {
          // console.log(res)
          this.urls =res.data.req.data.sip[0] + res.data.req_0.data.midurlinfo[0].purl;
        //   console.log(this.urls)
        });
    },
  },
  created() {
    var sf = this.$route.query.id;
    axios
      .get(
        "/pc/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg?type=1&json=1&utf8=1&onlysong=0&disstid=" +
          sf +
          "&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&ct=24&needNewCode=0"
      )
      .then(res => {
        // console.log(res.data.cdlist[0].songlist[i].albummid)
        this.list = res.data.cdlist[0].songlist;
        // console.log(res.data.cdlist[0].songlist)
        this.bannersrc = res.data.cdlist[0].logo;
        this.title = res.data.cdlist[0].dissname;
        this.scroll = new BScroll(this.$refs.wrapper, { click: true });
        this.isshow = false;
      });
  }
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
}
.active {
  color: aqua;
  border-left: 5px solid blue;
}
.banner img {
  width: 100%;
  height: 5rem;
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
  margin-left: 0.8rem;
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
  top: 4.2rem;
  left: 2.66rem;
  font-size: 0.3rem;
}
.songlist {
  overflow: hidden;
  width: 100%;
  height: 8.5rem;
  /* background: red; */
  margin-top: 5rem;
}
.li {
  width: 100%;
  height: 1.5rem;
  /* background: red; */
  text-indent: 0.3rem;
  line-height: 0.3rem;
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
}
.bofang {
  width: 100%;
  height: 1.45rem;
  background: red;
  position: fixed;
  top: 3.55rem;
  left: 0;
  transition: all 1s;
  opacity: 0;
}
</style>
