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
      title: '我的小组',
      index:0,
      keepAlive:true,
    }
  },
  {
    name: 'groupIndex',
    component: () => import('./view/groupIndex'),
    meta: {
      title: '小组主页',
      index:1,
      keepAlive:true,
    }
  },
  {
    name: 'createGroup',
    component: () => import('./view/createGroup'),
    meta: {
      title: '创建小组',
      index:1
    }
  },
 
  {
    name: 'groupSetting',
    component: () => import('./view/groupSetting'),
    meta: {
      title: '小组设置',
      index:2
    }
  },
  {
    name: 'changeNickname',
    component: () => import('./view/changeNickname'),
    meta: {
      title: '修改昵称',
      index:3
    }
  },
  {
    name: 'multChangePage',
    component: () => import('./view/multChangePage'),
    meta: {
      title: '修改页面',
      index:3
    }
  },
  {
    name: 'groupMember',
    component: () => import('./view/groupMember'),
    meta: {
      title: '成员列表',
      index:3
    }
  },
  {
    name: 'inviteList',
    component: () => import('./view/inviteList'),
    meta: {
      title: '邀请好友',
      index:3
    }
  },
  {
    name: 'deviceDetail',
    component: () => import('./view/deviceDetail'),
    meta: {
      title: '数据详情',
      index:2
    }
  },
  {
    name: 'memberDataDetail',
    component: () => import('./view/memberDataDetail'),
    meta: {
      title: '  小组成员数据',
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
