<template>
  <div class="hello" ref="box">
    <!-- <p ref='p1'>123</p> -->
    <div ref="xxx" class="xxx" v-show="issuo">
      <div class="top">
        <img src="/static/img/retu.png" alt @click="returnso">
        <p class="songname">{{songname}}</p>
      </div>

      <swiper class="hei">
        <swiper-slide>
          <p class="z">{{singername}}</p>
          <div class="aos">
            <img
              :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+dates.musicData.albummid+'.jpg'"
              :class="isbo?'donghua':'nobo'"
            >
            <p class="SingleLyric">{{danju}}</p>
            <!-- <p class="topp">哈哈</p> -->
          </div>
        </swiper-slide>
        <swiper-slide>
          <div class="ss">
            <div class="ccfind">
              <div class="ccfindfind" ref="wrapper2">
                <ul class="lis999">
                  <li
                    v-for="(item,inde) in currentLyric"
                    :key="inde"
                    :ref="Math.ceil(item.time/1000)"
                  >{{item.txt}}</li>
                </ul>
              </div>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <p class="Dot">··</p>
      <div class="bo">
        <div class="jindu">
          <span>{{currentTimes}}</span>
          <div class="jindus" ref="jid" @touchstart="down" @touchmove="move" @touchend="up">
            <p class="se" ref="se"></p>
            <p class="qiu" ref="qiu"></p>
          </div>
          <span>{{zongshic}}</span>
        </div>
        <div class="bos">
          <img
            :src="issuiji?'/static/img/播放器_首页随机播放32.png':'/static/img/单曲循环.png'"
            @click="danqu"
            alt
          >
          <img src="/static/img/icon_播放器_左.png" @click="lastOne" alt>
          <img
            @click="plays"
            :src="isbo?'/static/img/icon_播放器_播放.png':'/static/img/icon_播放器_暂停.png'"
            alt
          >
          <img src="/static/img/icon_播放器_右.png" alt @click="nextOne">
          <img
            :src="isCollection?'/static/img/收藏1.png':'/static/img/收藏.png'"
            alt
            @click="Collection"
          >
        </div>
      </div>
    </div>
    <div class="zuixiao" v-show="isxiao" @click="da">
      <img :src="'https://y.gtimg.cn/music/photo_new/T002R300x300M000'+imgurl+'.jpg'" class="yuan">
      <div class="lis">
        <p>{{songname}}</p>
        <p>{{danju}}</p>
      </div>
      <audio id="audio" :src="urls" autoplay @timeupdate="wacthaudio"></audio>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <p></p>
      <div>
        <img
          @click.stop="plays"
          :src="isbo?'/static/img/icon_播放器_播放.png':'/static/img/icon_播放器_暂停.png'"
        >
        <img src="/static/img/歌单收录OFF.png">
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "better-scroll";
import axios from "axios";
let Base64 = require("js-base64").Base64;
export default {
  name: "songplay",
  data() {
    return {
      isbo: true,
      issuo: true,
      isxiao: false,
      url: "",
      currentTimes: "",
      zongshic: "",
      audio: null,
      isd: 0,
      isCollection: false,
      touchstates: false,
      current: 0,
      lyric: [],
      issuiji: true,
      scroll: {},
      danju: "",
      collection: []
    };
  },
  props: ["urls", "dates", "currentLyric"],
  created() {},
  mounted() {},
  methods: {
    //   返回上层页面
    returnso() {
      this.issuo = false;
      this.$refs.box.style.height = "1.3rem";
      this.isxiao = true;
    },
    //根据秒数格式化成时分秒
    formatSeconds(value) {
      var second = parseInt(value); // 秒
      var minute = 0; // 分
      var hour = 0; // 时
      if (second > 60) {
        minute = parseInt(second / 60);
        second = parseInt(second % 60);
        if (minute > 60) {
          hour = parseInt(minute / 60);
          minute = parseInt(minute % 60);
        }
      }
      if (second < 10) second = "0" + second;
      if (minute < 10) minute = "0" + minute;

      var result = minute + ":" + second;
      if (hour > 0) result = hour + ":" + result;
      return result;
    },
    // audio   timeUpData
    wacthaudio() {
      this.audio = document.getElementById("audio");
      this.currentTimes = this.formatSeconds(this.audio.currentTime);
      this.zongshic = this.formatSeconds(this.audio.duration);
      // 拖动时不改变音乐的currentTime
      if (!this.touchstates) {
        this.$refs.se.style.width =
          (this.audio.currentTime / this.audio.duration) * 95 + "%";
        this.$refs.qiu.style.left =
          (this.audio.currentTime / this.audio.duration) * 95 + "%";
      }
      // 判断是否播放完
      if (this.currentTimes != "00:00") {
        if (this.audio.currentTime == this.audio.duration) {
          // 是否是随机播放
          if (this.issuiji) {
            setTimeout(() => {
              this.nextOne();
            }, 3000);
          }
        }
      }
      var tc = Math.ceil(this.audio.currentTime);
      // console.log(this.$refs[tc][0])
      if (this.$refs[tc] != "undefined") {
        this.scroll.scrollToElement(this.$refs[tc][0], 1000, 0, -180);
        this.$refs[tc][0].className = "on";
        this.$refs[tc][0].previousSibling.className = "";
      }
      document.querySelectorAll("li")[2].className = "";
      this.danju = document.getElementsByClassName("on")[0].innerHTML;
    },
    // 用户手指按下事件
    down(evt) {
      this.touchstates = true;
      var t = document.getElementsByClassName("jindus")[0];
      var x = evt.touches[0].pageX - t.offsetLeft;
      if (!this.touchstates) {
        this.audio.currentTime =
          (x / this.$refs.jid.offsetWidth) * this.audio.duration;
        this.$refs.se.style.width = this.$refs.qiu.style.left =
          (x / t.offsetWidth) * 95 + "%";
      }
    },
    // 手指按下拖动事件
    move(evt) {
      if (!this.touchstates) return;
      var t = document.getElementsByClassName("jindus")[0];
      var x = evt.touches[0].pageX - t.offsetLeft;
      this.$refs.se.style.width = this.$refs.qiu.style.left =
        (x / t.offsetWidth) * 95 + "%";
      if ((x / this.$refs.jid.offsetWidth) * 95 >= "95") {
        this.$refs.se.style.width = this.$refs.qiu.style.left = 95 + "%";
      } else if (
        this.$refs.se.style.width <= "0%" ||
        this.$refs.qiu.style.left <= "0%"
      ) {
        this.$refs.se.style.width = this.$refs.qiu.style.left = 0 + "%";
      }
      this.current = x;
    },
    // 手指离开屏幕事件
    up(evt) {
      this.touchstates = false;
      this.audio.currentTime =
        (this.current / this.$refs.jid.offsetWidth) * this.audio.duration;
    },
    // 下一首
    nextOne() {
      this.$emit("xiayi", "1");
    },
    // 上一首
    lastOne() {
      this.$emit("xiayi", "李振豪");
      document.querySelectorAll("li").className = "";
    },
    // 点击最小化的播放窗口
    da() {
      this.isxiao = false;
      this.$refs.box.style.height = "100vh";
      this.issuo = true;
      // this.rotate()
    },
    // 暂停播放
    plays() {
      if (this.isbo) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      this.isbo = !this.isbo;
    },
    // 收藏
    Collection() {
      if (this.isCollection) {
        console.log("取消收藏");
      } else {
        var obj = {
          songname: this.songname,
          singername: this.singername,
          imgurl:
            "https://y.gtimg.cn/music/photo_new/T002R300x300M000" +
            this.imgurl +
            ".jpg",
          audiourl: this.urls,
          iscang: true
        };
        var all = localStorage.getItem("Collection");
        all = JSON.parse(all);
        all.push(obj);
        this.collection = all.filter(function(value, index, array) {
          return array.indexOf(value) === index;
        });
        localStorage.setItem("Collection", JSON.stringify(this.collection));
      }
    },
    danqu() {
      this.issuiji = !this.issuiji;
      if (!this.issuiji) {
        console.log("已切换到单曲循环状态");
        this.audio.loop = true;
      } else {
        console.log("已切换到顺序播放状态");
        this.audio.loop = false;
      }
    }
  },
  _initscroll: function() {
    this.scroll = new BScroll(this.$refs.wrapper2, { click: true });
  },
  computed: {
    songname() {
      return this.dates.musicData.songname;
    },
    singername() {
      return this.dates.musicData.singer[0].name;
    },
    imgurl() {
      return this.dates.musicData.albummid;
    }
  },
  watch: {
    currentLyric: function(newdata) {
      // console.log(this.songname)
      this.scroll = new BScroll(this.$refs.wrapper2, { click: true });
      // 判断当前播放的歌曲是否收藏
      // var all = localStorage.getItem("Collection");
      // all = JSON.parse(all);
      // all.forEach((v, i) => {
      //   if (v.songname == this.songname || v.singername == this.singername) {
      //     this.isCollection = v.iscang;
      //     return
      //   } else {
      //     console.log(v.songname,this.songname)
      //     this.isCollection = false;
      //     return
      //   }
      // });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.on {
  color: white !important;
  font-size: 0.36rem;
}
.hello {
  width: 100%;
  height: 100vh;
  color: white;
  z-index: 1000000000000000;
  background: #242416;
  position: fixed;
  bottom: 0;
  left: 0;
  transition: all 0.3s;
}
.SingleLyric {
  text-align: center;
  /* margin-top: rem; */
}
.Dot {
  text-align: center;
  margin-top: 0rem;
  font-size: 1rem;
}
.lis {
  line-height: 0.5rem;
}
.lis p:nth-child(2) {
  font-size: 0.25rem;
}
.zuixiao {
  width: 100%;
  height: 1.3rem;
  background: green;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.zuixiao img {
  width: 0.8rem;
  height: 0.8rem;
}
.ccfindfind {
  height: 100%;
  overflow: hidden;
}
.aos {
  width: 100%;
  height: 8.6rem;
  /* background: red; */
  overflow: hidden;
  /* transform: rotate() */
}
.lis999 {
  color: #999;
}
.ss {
  width: 100%;
  overflow: hidden;
  height: 9.5rem;
  margin-top: 0.3rem;
}
.ccfind {
  height: 100%;
  margin-top: 0.7rem;
}
.yuan {
  border-radius: 50%;
}
.ccfindfind ul {
  line-height: 0.8rem !important;
}
.se {
  width: 0%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: #dfc342;
}
.qiu {
  width: 0.19rem;
  height: 0.19rem;
  background: yellow;
  border: 3px solid #fff;
  border-radius: 50%;
  position: absolute;
  top: -0.1rem;
  left: 0%;
}
.jindu {
  width: 90%;
  height: 0.5rem;
  /* background: red; */
  margin: 0 auto;
  margin-top: 0.2rem;
  display: flex;
  align-items: center;
}
.songname {
  margin: 0;
  text-align: center;
  margin-top: 0.3rem;
  font-size: 0.4rem;
}
.ssfind {
  height: 9.65rem;
  overflow: hidden;
  /* animation:  */
}
.jindus {
  width: 70%;
  height: 0.1rem;
  background: white;
  margin: 0 auto;
  position: relative;
  border-radius: 0.1rem;
}
.aos img {
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  margin-top: 0.6rem;
  margin-left: 0.7rem;
  border: 8px solid #999999;
  /* animation: identifier 5s infinite linear; */
}
.bos {
  width: 90%;
  height: 1rem;
  /* background: red; */
  margin: 0 auto;
  margin-top: 0.2rem;
  display: flex;
  justify-content: space-between;
}
.bos img {
  width: 1rem;
}
.ss ul li {
  text-align: center;
}
.ss ul {
  line-height: 0.5rem;
}
.aos p {
  width: 84%;
  text-align: center;
  position: fixed;
  top: 92%;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 0.05rem;
}
.topp {
  width: 84%;
  text-align: center;
  position: fixed;
  top: 84% !important;
  left: 50%;
  transform: translate(-50%, -50%);
  letter-spacing: 0.05rem;
}
.z {
  width: 100%;
  height: 0.5rem;
  /* background: white; */
  padding-top: 1rem;
  line-height: 0.6rem;
  text-align: center;
}
.donghua {
  animation: identifier 30s infinite linear;
}
.nobo {
  animation-play-state: paused;
  /* animation-fill-mode:forwards; */
}
.ss {
  /* background: pink; */
  margin-top: 0.3rem;
}
.bo {
  width: 100%;
  height: 2.4rem;
  /* background: green; */
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 100;
}
.top {
  width: 100%;
  height: 0.7rem;
  /* background: pink; */
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
}
.top img {
  position: absolute;
  width: 0.6rem;
  height: 0.6rem;
  left: 0.1rem;
  /* margin-top: .1rem; */
}
.top p {
  text-align: center;
  margin: 0 auto;
  font-size: 0.38rem;
}
@keyframes identifier {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
