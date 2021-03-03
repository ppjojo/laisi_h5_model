import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/myGroupList'
  },
  {
    name: 'myGroupList',
    component: () => import('./view/myGroupList'),
    meta: {
      title: '我的小组'
    }
  },
  {
    name: 'groupIndex',
    component: () => import('./view/groupIndex'),
    meta: {
      title: '小组'
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
