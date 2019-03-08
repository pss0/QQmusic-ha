<template>
  <div id="app">
    <div class="inp">
      <input type="text" placeholder="搜索歌曲、歌手" @keyup="enter" @blur="shiqu" @focus="getjian" v-model="inputVal" ref="inpv">
      <img src="/static/img/images/search_03.png" class="sear">
      <span class="kong" v-show="iskong" @click='valkong'>×</span>
    </div>
    <div class="remen" v-if="isshow">
      <p class="rtop">热门搜索</p>
      <!-- 热门搜索 -->
      <div class="list">
        <a class="red" :href="httpc">{{inner}}</a>
        <span v-for="(v,i) in list" v-if="inc>=i" :key="i" @click="soso">{{v.k}}</span>
      </div>
      <p class="lisi" v-show="isshow">搜索历史
        <span @click='empty'>清空</span>
      </p>
      <!-- 搜索历史 -->
      <div class="searchH" v-if="isshow" ref="kongh">
        <p v-for="(g,z) in searchhistory" :key="z" ref="removes">
          <span @click="soso">{{g}}</span>
          <i @click.stop="remove(z)">×</i>
        </p>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div v-if="!isshow" class="bs" ref="wrapper" @scroll="jiant">
      <div ref="kongs">
        <p v-for="(item,index) in lists" :key="index" @click='goplay(index,item)'><img src="/static/img/images/yin_03.png"><span>{{item.songname}} - {{item.singer[0].name}} . {{item.albumname}}</span></p>
      </div>
    </div>
    <loading v-if="isloading"></loading>
    <play :currentLyric='currentLyric' @xiayi='xiayi' :dates='dates' :urls='urls' v-if="isplay"></play>
  </div>
</template>
<script>
import axios from "axios";
import BScroll from "better-scroll";
import loading from "../loading";
import play from '../songlistplay'
let Base64 = require('js-base64').Base64;
import geci from 'lyric-parser'
export default {
  name: "sosuo",
  data() {
    return {
      inner: "",
      httpc: "",
      list: [],
      inputVal: "",
      lists: [],
      scroll: {},
      isshow: true,
      loading:true,
      inc: 6,
      searchhistory: [],
      isloading: true,
      iskong:false,
      box:null,
      ye:1,
      c:286,
      bux:true,
      qk:false,
      isplay: false,
      currentindex:0,
      dates:{},
      urls:'',
      currentLyric:{},
      lyric:'',
      // geci:
      // scrolls:{}
    };
  },
  components: { loading ,play},
  methods: {
    // 回车
    enter: function(evt) {
      if (evt.keyCode == 13) {
        this.isloading = true;
        if (this.inputVal == "") {
          alert("搜索内容不能为空");
        } else {
          var all = localStorage.getItem("cntas");
          all = JSON.parse(all);
          if(all) this.qk = true;
          all.unshift(this.inputVal)
          this.searchhistory = all.filter(function (value, index, array) {       
            return array.indexOf(value) === index   
          });
          localStorage.setItem("cntas", JSON.stringify(this.searchhistory));
          axios
            .get(
              "/mobile/soso/fcgi-bin/search_for_qq_cp?g_tk=6381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=" +
                this.inputVal +
                "&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p="+this.ye+"&remoteplace=txt.mqq.all&_=1546958066761"
            )
            .then(res => {
              this.lists = res.data.data.song.list;
              this.isshow = false;
              this.isloading = false;
              console.log(res)
              // this.scroll = new BScroll(this.$refs.wrapper, { click: true });
            });
        }
      }
    },
    // 点击播放
    goplay(i,v){
      this.dates = v
      this.currentindex = i
      this.getlyric()
      this.getsong()
      this.isplay = true
    },
    //获取歌词
    getlyric() {
      axios
        .get(
          "/mobile/lyric/fcgi-bin/fcg_query_lyric_new.fcg?-=MusicJsonCallback_lrc&pcachetime=1547542073184&songmid=" +
            this.lists[this.currentindex].songmid +
            "&g_tk=827187934&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0"
        )
        .then(res => {
          this.lyric = Base64.decode(res.data.lyric);
          this.currentLyric = new geci(this.lyric, this.handleLyric);
        this.currentLyric = this.currentLyric.lines
        });
    },
    // 下一首 上一首
    xiayi(res){
      if(res == '1'){
        this.currentindex++
        this.dates = this.lists[this.currentindex]
        this.getsong()
        this.getlyric()
      }
      if(res == '李振豪'){
        this.currentindex--
        this.dates = this.lists[this.currentindex]
        this.getsong()
        this.getlyric()
      }
    },
    // 获取歌曲的url
    getsong(){
      axios
        .get(
          "/getdata/cgi-bin/musicu.fcg?-=getplaysongvkey9592700474141493&g_tk=5381&loginUin=0&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22req%22%3A%7B%22module%22%3A%22CDN.SrfCdnDispatchServer%22%2C%22method%22%3A%22GetCdnDispatch%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22calltype%22%3A0%2C%22userip%22%3A%22%22%7D%7D%2C%22req_0%22%3A%7B%22module%22%3A%22vkey.GetVkeyServer%22%2C%22method%22%3A%22CgiGetVkey%22%2C%22param%22%3A%7B%22guid%22%3A%227196536004%22%2C%22songmid%22%3A%5B%22" +
          this.lists[this.currentindex].songmid +
          "%22%5D%2C%22songtype%22%3A%5B0%5D%2C%22uin%22%3A%220%22%2C%22loginflag%22%3A1%2C%22platform%22%3A%2220%22%7D%7D%2C%22comm%22%3A%7B%22uin%22%3A0%2C%22format%22%3A%22json%22%2C%22ct%22%3A20%2C%22cv%22%3A0%7D%7D"
        )
        .then(res => {
          // console.log(res)
          this.urls =res.data.req.data.sip[0] + res.data.req_0.data.midurlinfo[0].purl;
        //   console.log(this.urls)
        });
    },
    // inout获取焦点
    getjian(){
      this.isshow = false
      this.lists = []
      // this.bux = false
    },

    // 点击热门搜索 and 搜索历史
    soso: function(evt) {
      this.isloading = true;
      this.inputVal = evt.currentTarget.innerHTML;
      var all = localStorage.getItem("cntas");
      all = JSON.parse(all);
      all.push(this.inputVal);
      this.searchhistory = all.filter(function (value, index, array) {       
        return array.indexOf(value) === index
      });
      localStorage.setItem("cntas", JSON.stringify(this.searchhistory));
      axios
        .get(
          "/mobile/soso/fcgi-bin/search_for_qq_cp?g_tk=6381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w=" +
            this.inputVal +
            "&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p="+this.ye+"&remoteplace=txt.mqq.all&_=1546958066761"
        )
        .then(res => {
          this.lists = res.data.data.song.list;
          this.isshow = false;
          this.isloading = false;
        });
    },
    // 删除一条搜索记录
    remove: function(i) {
      var ccc = localStorage.getItem("cntas");
      ccc = JSON.parse(ccc);
      ccc.splice(i, 1);
      this.$refs.removes[i].remove();
      localStorage.setItem("cntas", JSON.stringify(ccc));
    },
    // 清空input的value
    valkong:function(){
      this.inputVal = ''
      this.isshow = false
    },
    // 清空
    empty:function(){
      // this.searchhistory = []
      this.$refs.kongh.innerHTML = ''
      this.qk = false
      localStorage.setItem("cntas", '[]');
    },
    // 文本框失去焦点
    shiqu(){
      this.isshow = true
      // this.bux = true
    },
    getdata(){
      axios.get('/mobile/soso/fcgi-bin/search_for_qq_cp?g_tk=6381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&w='+
            this.inputVal +
            '&zhidaqu=1&catZhida=1&t=0&flag=1&ie=utf-8&sem=1&aggr=0&perpage=20&n=20&p='+this.ye+'&remoteplace=txt.mqq.all&_=1546958066761').then(res=>{
              console.log(res)
              for(var i=0;i<res.data.data.song.list.length;i++){
                this.lists.push(res.data.data.song.list[i])
                this.isloading = false
              }
            })
    },
   jiant(evt){
   }
  },
  created() {
    axios
      .get(
        "/mobile/splcloud/fcgi-bin/gethotkey.fcg?g_tk=994995197&uin=1371720415&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1546912311833"
      )
      .then(res => {
        this.inner = res.data.data.special_key;
        this.httpc = res.data.data.special_url;
        this.list = res.data.data.hotkey;
        this.isloading = false;
      });
    var all = localStorage.getItem("cntas");
    this.searchhistory = JSON.parse(all);
    console.log(document.documentElement.scrollTop)
  },
  beforeCreate() {
    
  },
  mounted() {
  },
  watch: {
    inputVal: function(sa) {
      if (sa == "") {
        this.isshow = true;
        this.iskong = false
      }else{
        this.iskong = true
      }
    },
    scrolls(h){
      console.log(h)
    }
  }
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vhs;
  /* height: auto; */
  margin-top: 1.705rem;
  background: #242424;
  font-size: 0.325rem;
  color: aliceblue;
  overflow: hidden;
}
.lisi span {
  font-size: 0.3rem;
  font-weight: 300;
  color: yellow;
  margin-left: 4.8rem;
}
.rtop {
  margin-top: 1rem;
}
.inp {
  width: 92%;
  height: 0.7rem;
  /* background: red; */
  margin: 0 auto;
  margin-top: 0.3rem;
  position: fixed;
  top: 1.5rem;
  left: 0.3rem;
  z-index: 10000000000000000000000000;
  /* position: relative; */
}
.sear{
  width: .4rem;
  position: absolute;
  top: .14rem;
  left: .15rem;
}
.kong{
  display: block;
  width: .3rem;
  height: .3rem;
  line-height: .24rem;
  text-align: center;
  background: #000;
  position: absolute;
  border-radius: 50%;
  top: .22rem;
  right: .2rem;
  color: #787878;
  font-weight: bold;
}
.bs div p span{
  display: inline-block;
  width: 6.4rem;
  /* background:red; */
  margin-left: .1rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bs div p{
  width: 100%;
  height: 0.8rem;
  /* border-bottom: 1px solid #ccc; */
  line-height: 0.8rem;
  display: flex;
  align-items: center;
}
.bs div p img{
  width: .4rem;
  display: inline-block;
  /* padding-top: .4rem; */
}
.lisi {
  margin-top: 0.5rem;
  color: #787878;
  font-size: 0.34rem;
}
.rtop {
  color: #787878;
}

.searchH {
  width: 100%;
  height: 4.7rem;
  /* background: red; */
  margin-top: 0.4rem;
  overflow: scroll;
}
.searchH p {
  width: 100%;
  height: 0.7rem;
  line-height: 0.7rem;
  /* border-bottom: .6px solid #ccc; */
  font-weight: 400;
  color: #787878;
  font-size: 0.3rem;
  display: flex;
  position: relative;
}
.searchH p i {
  font-size: 0.4rem;
  /* display: inline-block; */
  position: absolute;
  top: 0;
  right: 0.3rem;
}
.removeimg {
  width: 1rem;
  height: 1rem;
}
.bs {
  width: 90%;
  height: 10.7rem;
  margin: 0 auto;
  overflow: scroll;
  /* background: blue; */
  margin-top: 2.6rem;
  position: fixed;
  top: 0rem;
  left: .4rem;
  /* overflow: hidden; */
  /* margin-top: 1rem; */
}
/* .bs div p {
  height: 0.8rem;
  /* border-bottom: 1px solid #ccc;
  line-height: 0.8rem;
  display: flex;
  align-items:center; 
} */
.inp input {
  width: 92%;
  height: 100%;
  border: none;
  outline: none;
  border-radius: 0.2rem;
  background: #363636;
  color: #686868;
  font-size: 0.3rem;
  padding-left: 0.6rem;
}
.remen {
  width: 92%;
  height: auto;
  /* height: auto;  */
  /* background: red; */
  margin: 0 auto;
  margin-top: 0.9rem;
  position: fixed;
  top: 1.3rem;
  left: 0.3rem;
  /* margin-right: 1rem; */
  /* overflow: hidden; */
}
.list {
  width: 100%;
  /* height: 3.3rem; */
  /* background: green; */
  margin-top: 0.3rem;
  /* overflow: hidden; */
}
.red {
  display: inline-block;
  padding: 0.2rem 0.3rem;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  background: #373737;
  color: #717170;
  margin-right: 0.2rem;
  border: 1px solid red;
}
.list span {
  display: inline-block;
  padding: 0.2rem 0.3rem;
  margin-top: 0.2rem;
  border-radius: 0.2rem;
  background: #373737;
  color: #717170;
  margin-right: 0.3rem;
}
</style>
