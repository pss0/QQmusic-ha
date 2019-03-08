import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import index from '@/components/indexs/indexs'
// import tuijian from '@/components/indexs/tuijian'
// import paihang from '@/components/indexs/paihang'
// import geshou from '@/components/indexs/geshou'
// import sosuo from '@/components/indexs/sosuo'


Vue.use(Router)
const sosuo = resolve => require(['@/components/indexs/sosuo.vue'],resolve);
const paihang = resolve => require(['@/components/indexs/paihang.vue'],resolve);
const tuijian = resolve => require(['@/components/indexs/tuijian.vue'],resolve);
const geshou = resolve => require(['@/components/indexs/geshou.vue'],resolve);
const songlistdetail = resolve => require(['@/components/songlistdetail/songlistdetail.vue'],resolve);
const singerdetail = resolve => require(['@/components/singerdatail/singerdetail.vue'],resolve);
const listdetail = resolve => require(['@/components/listdetail/listdetail.vue'],resolve);
const PersonalCenter = resolve => require(['@/components/PersonalCenter/PersonalCenter.vue'],resolve)

export default new Router({
  linkActiveClass:'cur',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index,
      children:[
        {
          path: '/',
          // component: tuijian,
          redirect:'/tuijian'
        },
        {
          path: '/tuijian',
          component: tuijian,
          // redirect:'/tuijian'
        },
        {
          path: '/paihang',
          component: paihang,
        },
        {
          path: '/geshou',
          component: geshou,
        },
        {
          path: '/sosuo',
          component: sosuo,
        },
        
      ],
    },
    {
      path: '/songlistdetail',
      name: 'songlistdetail',
      component: songlistdetail,
    },
    {
      path: '/listdetail',
      name: 'listdetail',
      component: listdetail,
    },
    {
      path: '/singerdetail',
      name: 'singerdetail',
      component: singerdetail,
    },
    {
      path: '/PersonalCenter',
      name: 'PersonalCenter',
      component: PersonalCenter,
    },
  ]
})
