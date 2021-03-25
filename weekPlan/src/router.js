import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/model'
  },
  {
    name: 'model',
    component: () => import('./view/model'),
    meta: {
      title: '我的',
      index:0
    }
  },
  {
    name: 'specialHeader',
    component: () => import('./view/specialHeader'),
    meta: {
      title: '特别的头部',
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
