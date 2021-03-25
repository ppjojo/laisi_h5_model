import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

const routes = [
  {
    path: '*',
    redirect: '/index'
  },
  {
    name: 'index',
    component: () => import('./view/index'),
    meta: {
      title: '制定专属计划',
      index:0
    }
  },
  {
    name: 'personalTest',
    component: () => import('./view/personalTest'),
    meta: {
      title: '测评',
      index:1
    }
  },
  {
    name: 'weekPlanRule',
    component: () => import('./view/weekPlanRule'),
    meta: {
      title: '测评规则',
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
  next();
});

export {
  router
};
