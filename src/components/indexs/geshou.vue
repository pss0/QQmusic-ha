<template>
  <div id="app">
    <div class="hahaa" ref="wrapper">
      <div>
        <div v-for="(v,i) in list" :key="i" class="ge" @click='gosingerdetail(v)'>
          <img :src="v.singer_pic" onerror="javascript:this.src='/static/img/timg.jpg'">
          <p>{{v.singer_name}}</p>
        </div>
      </div>
    </div>
    <loading v-if="isshow"></loading>
    <div class="leftList">
      <p v-for="(val,index) in lists" :key="index" @click='clickH($event,val.id)' :class="sssds==val.id?'curs':''">{{val.name}}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import loading from "../loading";
import BScroll from "better-scroll";
// import leftlist from './leftlist'
export default {
  name: "geshou",
  components: { loading },
  data() {
    return {
      list: [],
      isshow: true,
      lists: [],
      sssds:-100
    };
  },
  methods: {
    clickH: function(evt,i) {
      this.sssds = i;
      this.isshow = true
      var what = localStorage.getItem('alp'+i)
      if(what){
        this.list = JSON.parse(what)
        this.isshow = false
        return
      }else{
        axios.get('/getdata/cgi-bin/musicu.fcg?-=getUCGI8943168903863707&g_tk=994995197&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A10000%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A'+i+'%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D').then(res=>{
          this.list = res.data.singerList.data.singerlist;
          this.isshow = false;
          localStorage.setItem('alp'+i,JSON.stringify(res.data.singerList.data.singerlist))
        })
      }
    },
    gosingerdetail(i){
      // console.log(this.list[i])
      this.$router.push({
        path:'/singerdetail',
        query:{
          title:i.singer_name,
          banner:i.singer_pic,
          id:i.singer_mid
        }
      })
    }
  },
  created() {
    axios
      .get(
        "/getdata/cgi-bin/musicu.fcg?-=getUCGI3034940189824975&g_tk=994995197&loginUin=1371720415&hostUin=0&format=json&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq.json&needNewCode=0&data=%7B%22comm%22%3A%7B%22ct%22%3A24%2C%22cv%22%3A10000%7D%2C%22singerList%22%3A%7B%22module%22%3A%22Music.SingerListServer%22%2C%22method%22%3A%22get_singer_list%22%2C%22param%22%3A%7B%22area%22%3A-100%2C%22sex%22%3A-100%2C%22genre%22%3A-100%2C%22index%22%3A-100%2C%22sin%22%3A0%2C%22cur_page%22%3A1%7D%7D%7D"
      )
      .then(res => {
        // console.log(res)
        this.list = res.data.singerList.data.singerlist;
        this.lists = res.data.singerList.data.tags.index;
        // console.log(res.data.singerList.data.singerlist)
        this.isshow = false;
         this.scroll = new BScroll(this.$refs.wrapper, { click: true });
      });
  },
  mounted() {
  }
};
</script>

<style scoped>
#app {
  width: 100%;
  height: 100vh;
  margin-top: 1.705rem;
  background: #242416;
  font-size: 0.325rem;
  color: aliceblue;
}
.hahaa {
  width: 100%;
  height: 99vh;
  overflow: hidden;
  /* padding-top: 1.7rem; */
  /* margin-top: 1.705rem; */
  /* background: red; */
}
.ge {
  width: 92%;
  height: 1.6rem;
  /* background: red; */
  margin: 0 auto;
  margin-bottom: 0.2rem;
  display: flex;
  align-items: center;
}
.ge img {
  width: 1.2rem;
  border-radius: 50%;
}
.ge p {
  margin-left: 0.4rem;
}
.leftList {
  width: .3rem;
  height: 3rem;
  /* background: red; */
  line-height: 0.4rem;
  position: fixed !important;
  top: 1.8rem;
  right: 0.1rem;
  z-index: 1000;
  color: #69696a;
}
.leftList p{
  height: .36rem;
  overflow: hidden;
}
.curs{
  color: #a99026;
}
</style>
