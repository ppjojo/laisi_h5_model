import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import { device } from './components/device' //设备管理
import { factory } from './components/factory' //工厂
import { community } from './components/community' //社区
import { dataSearch } from './components/dataSearch' //数据查询
import { operate } from './components/operate' //运维相关
import { dataReport } from './components/dataReport' //数据报表
import { firmware } from './components/firmware' //固件升级
import { operateReport } from './components/operateReport' //运维报表
import { officialWebsite } from './components/officialWebsite' //官网
import { intelligent } from './components/intelligent' //智能训练
import { software } from './components/software' //软件升级
import { helpCenter } from './components/helpCenter' //帮助中心
import { afterSale } from './components/afterSale' //售后服务
import { permission } from './components/permission' //权限管理
import { competitionActivity } from './components/competitionActivity' //赛事活动
import { videoCourse } from './components/videoCourse' //老课程
import { baisuo } from './components/baisuo' //百索系统
import { pk } from './components/pk' //pk赛
import { ad } from './components/ad' //ad广告
import { feedback } from './components/feedback' //意见反馈
import { coursedisplay } from './components/coursedisplay' //动作库
import { salesDept } from './components/salesDept' //销售报表
import { clockDial } from './components/clockDial' //表盘管理
import { upgrade } from './components/upgrade' //升级资源
import { systemNotification } from './components/systemNotification' //系统通知
import { summerCamp } from './components/summerCamp' //夏令营


/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const constantRoutes = [{
        path: '/login',
        component: () =>
            import ('@/views/login/index'),
        hidden: true
    },
    {
        path: '/',
        component: Layout,
        redirect: '/default',
        hidden: false,
        meta: {
            title: '欢迎页',
            icon: 'laisiServe'
        },
        children: [{
            path: 'default',
            name: 'default',
            hidden: false,
            component: () =>
                import ('@/views/default'),
            meta: {
                title: '欢迎页',
                icon: 'welcome'
            }
        }]
    },
    {
        path: '/laisiServe',
        component: Layout,
        redirect: '/Oauth',
        hidden: false,
        permission: 'laisiServe',
        meta: {
            title: '铼锶服务',
            icon: 'laisiServe'
        },
        children: [{
            permission: 'laisiServe:Oauth',
            path: 'Oauth',
            name: 'Oauth',
            hidden: false,
            component: () =>
                import ('@/views/laisiServe/Oauth'),
            meta: {
                title: 'Oauth'
            }
        }]
    },
    {
        path: '/dashboard',
        component: Layout,
        hidden: true,
        permission: 'dashboard',
        redirect: '/dashboard/dashboard',
        children: [{
            permission: 'dashboard:dashboard',
            path: 'dashboard',
            name: 'Dashboard',
            hidden: true,
            component: () =>
                import ('@/views/dashboard/index'),
            meta: {
                title: '主页',
                icon: 'menu_dashboard'
            }
        }]
    },
    device,
    factory,
    community,
    dataSearch,
    operate,
    dataReport,
    firmware,
    operateReport,
    officialWebsite,
    intelligent,
    software,
    helpCenter,
    afterSale,
    permission,
    competitionActivity,
    videoCourse,
    baisuo,
    pk,
    ad,
    feedback,
    coursedisplay,
    salesDept,
    clockDial,
    upgrade,
    systemNotification,
    summerCamp,
    {
        path: '/401',
        component: () =>
            import ('@/views/error-page/401'),
        hidden: true,
        meta: {
            title: '401',
        }
    },
    // 404 page must be placed at the end !!!
    {
        path: '*',
        component: () =>
            import ('@/views/error-page/404'),
        hidden: true,
        meta: {
            title: '404',
        }
    }

]

const createRouter = (arr) => new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({
        y: 0
    }),
    routes: arr || constantRoutes
})

const router = createRouter()

function resetRouter(arr) {
    const newRouter = createRouter(arr)
    router.matcher = newRouter.matcher // reset router
}

export {
    router,
    resetRouter,
    constantRoutes
}