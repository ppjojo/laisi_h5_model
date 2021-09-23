import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/clockoverview'
  },
  {
    name: 'index',
    component: () => import('./view/index'),
    meta: {
      title: '运动日历',
      index:0
    }
  },
  {
    name: 'clockoverview',
    component: () => import('./view/clockoverview'),
    meta: {
      title: '打卡总览',
      index:1
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
  next();
});

export {
  router
};
