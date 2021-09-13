import Vue from 'vue';
import Router from 'vue-router';
import {
  getQueryString,
} from '@u/tool'

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/competitionList'
  },
  {
    name: 'competitionList',
    component: () => import('./view/competitionList'),
    meta: {
      title: '赛事列表',
      index:1
    }
  },
  {
    name: 'competitionDetail',
    component: () => import('./view/competitionDetail'),
    meta: {
      title: '赛事详情',
      index:3
    }
  },
  {
    name: 'rule',
    component: () => import('./view/rule'),
    meta: {
      title: '赛事规则',
      index:4
    }
  },
  {
    name: 'teamDetail',
    component: () => import('./view/teamDetail'),
    meta: {
      title: '比赛详情',
      index:4
    }
  },
  {
    name: 'createCompetition',
    component: () => import('./view/createCompetition'),
    meta: {
      title: '创建PK赛',
      index:2
    }
  },
 
  
];

// add route path
routes.forEach(route => {
  route.path = route.path || '/' + (route.name || '');
});

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const title = to.meta && to.meta.title;
  if (title) {
    document.title = title;
  }
 
  to.query.type=(getQueryString('type')||"skipping").toLowerCase()// skipping 跳绳   steps 跑步  wristball 腕力球 wheel 健腹轮
  next();
});

export {
  router
};
