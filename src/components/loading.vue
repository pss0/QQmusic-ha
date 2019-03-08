<template>
  <div id="app">
      <img src="http://img.zcool.cn/community/01069b58ec2faca8012049efebd2d6.gif">
      <!-- <img src="/static/img/loading.gif"> -->
  </div>
</template>

<script>
export default {
  name: 'loading',
  data (){
    return {
      
    }
  },
  components:{},
  methods:{
  }
}
</script>

<style scoped>
#app {
  position: absolute;
  top: 0;
  left: 0;
  width:100%;
  height: 100vh;
  background: #242416;
}
img{
    width:1.5rem;
    height: 1.5remm;
    position: absolute;
    top: 30%;
    left: 50%;
    transform: translate(-50%,-50%)
}
</style>
