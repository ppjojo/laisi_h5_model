import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

import { device } from './components/device' //设备管理
import { factory } from './components/factory' //工厂
import { community } from './components/community' //社区
import { dataSearch } from './components/dataSearch' //数据查询
import { pointLottery } from './components/pointLottery' //逗币相关
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

    {
        path: '/skip',
        component: Layout,
        redirect: '/skip/skipList',
        permission: 'skip',
        hidden: true,
        meta: {
            title: '跳绳活动',
            icon: 'menu_skip'
        },
        children: [{
            path: 'skipList',
            permission: 'skip:skipList',
            hidden: true,
            component: () =>
                import ('@/views/skip/skipList'),
            meta: {
                title: 'PK赛',
                icon: 'menu_skip'
            }
        }]
    },
    {
        path: '/videoCourse',
        component: Layout,
        redirect: '/videoCourse/courseList',
        permission: 'videoCourse',
        hidden: true,
        meta: {
            title: '视频课程和音乐',
            icon: 'menu_course'
        },
        children: [{
                path: 'courseList',
                permission: 'videoCourse:courseList',
                hidden: true,
                component: () =>
                    import ('@/views/videoCourse/courseList'),
                meta: {
                    title: '训练课程',
                    icon: 'videoCourse_course'
                }
            },

            {
                path: 'catalog',
                permission: 'videoCourse:catalog',
                hidden: true,
                component: () =>
                    import ('@/views/videoCourse/catalog'),
                meta: {
                    title: '课程分类',
                    icon: 'videoCourse_catalog'
                }
            },
            // {
            //   path: 'hotCourse',
            //   permission: 'videoCourse:hotCourse',
            //   hidden: true,
            //   component: () => import('@/views/videoCourse/hotCourse'),
            //   meta: {
            //     title: '热门区',
            //     icon: 'videoCourse_hotCourse'
            //   }
            // },
            {
                path: 'musicList',
                permission: 'videoCourse:musicList',
                hidden: true,
                component: () =>
                    import ('@/views/videoCourse/musicList'),
                meta: {
                    title: '音乐管理',
                    icon: 'videoCourse_music'
                }
            }
        ]
    },
    device,
    pointLottery,
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

    {
        path: '/upgrade',
        component: Layout,
        redirect: '/upgrade/firmware',
        permission: 'upgrade',
        hidden: true,
        meta: {
            title: '升级资源',
            icon: 'menu_upgrade'
        },
        children: [{
                path: 'firmware',
                permission: 'upgrade:firmware',
                hidden: true,
                component: () =>
                    import ('@/views/upgrade/firmware'),
                meta: {
                    title: '固件管理',
                    icon: 'upgrade_firmware'
                }
            },
            {
                path: 'resource',
                permission: 'upgrade:resource',
                hidden: true,
                component: () =>
                    import ('@/views/upgrade/resource'),
                meta: {
                    title: '资源管理',
                    icon: 'upgrade_resource'
                }
            }
        ]
    },


    {
        path: '/ad',
        component: Layout,
        redirect: '/ad/banner',
        permission: 'ad',
        hidden: true,
        meta: {
            title: '广告配置',
            icon: 'menu_ad'
        },
        children: [{
                path: 'banner',
                permission: 'ad:banner',
                hidden: true,
                component: () =>
                    import ('@/views/ad/banner'),
                meta: {
                    title: 'banner',
                    icon: 'ad_banner'
                }
            },
            {
                path: 'adSDK',
                permission: 'ad:adSDK',
                hidden: true,
                component: () =>
                    import ('@/views/ad/adSDK'),
                meta: {
                    title: '广告SDK',
                    icon: 'ad_adSDK'
                }
            }
        ]
    },
    {
        path: '/feedback',
        component: Layout,
        redirect: '/feedback/feedbackList',
        permission: 'feedback',
        hidden: true,
        meta: {
            title: '意见反馈',
            icon: 'menu_feedback'
        },
        children: [{
            path: 'feedbackList',
            permission: 'feedback:feedbackList',
            hidden: true,
            component: () =>
                import ('@/views/feedback/feedbackList'),
            meta: {
                title: '意见反馈',
                icon: 'feedback_feedbackList'
            }
        }, ]
    },

    {
        path: '/baisuo',
        component: Layout,
        redirect: '/baisuo/user',
        permission: 'baisuo',
        hidden: true,
        meta: {
            title: '百索系统',
            icon: 'menu_baisuo'
        },
        children: [{
                path: 'user',
                permission: 'baisuo:user',
                hidden: true,
                component: () =>
                    import ('@/views/baisuo/user'),
                meta: {
                    title: '用户管理',
                    icon: 'baisuo_user'
                }
            },
            {
                path: 'customer',
                permission: 'baisuo:customer',
                hidden: true,
                component: () =>
                    import ('@/views/baisuo/customer'),
                meta: {
                    title: '客户管理',
                    icon: 'baisuo_customer'
                }
            },
            {
                path: 'template',
                permission: 'baisuo:template',
                hidden: true,
                component: () =>
                    import ('@/views/baisuo/template'),
                meta: {
                    title: '模板管理',
                    icon: 'baisuo_template'
                }
            },
            {
                path: 'ropeSkipping',
                permission: 'baisuo:ropeSkipping',
                hidden: true,
                component: () =>
                    import ('@/views/baisuo/ropeSkipping'),
                meta: {
                    title: '跳绳管理',
                    icon: 'baisuo_ropeSkipping'
                }
            },
            {
                path: 'hub',
                permission: 'baisuo:hub',
                hidden: true,
                component: () =>
                    import ('@/views/baisuo/hub'),
                meta: {
                    title: 'Hub管理',
                    icon: 'baisuo_hub'
                }
            },

        ]
    },
    {
        path: '/clockDial',
        component: Layout,
        redirect: '/clockDial/dialResource',
        permission: 'clockDial',
        hidden: true,
        meta: {
            title: '表盘管理',
            icon: 'menu_clockDial'
        },
        children: [{
                path: 'dialResource',
                permission: 'clockDial:dialResource',
                hidden: true,
                component: () =>
                    import ('@/views/clockDial/dialResource'),
                meta: {
                    title: '表盘资源',
                    icon: 'clockDial_dialResource'
                }
            },
            {
                path: 'dialinterface',
                permission: 'clockDial:dialinterface',
                hidden: true,
                component: () =>
                    import ('@/views/clockDial/dialinterface'),
                meta: {
                    title: '表盘界面',
                    icon: 'clockDial_dialinterface'
                }
            },
        ]
    },

    {
        path: '/systemNotification',
        component: Layout,
        redirect: '/systemNotification/systemNotification',
        permission: 'systemNotification',
        hidden: true,
        meta: {
            title: '系统通知',
            icon: 'menu_systemNotification'
        },
        children: [{
                path: 'systemNotification',
                permission: 'systemNotification:systemNotification',
                hidden: true,
                component: () =>
                    import ('@/views/systemNotification/systemNotification'),
                meta: {
                    title: '系统通知',
                    icon: 'systemNotification_systemNotification'
                }
            },

        ]
    },



    {
        path: '/summerCamp',
        component: Layout,
        redirect: '/summerCamp/school',
        permission: 'summerCamp',
        hidden: true,
        meta: {
            title: '夏令营',
            icon: 'menu_summerCamp'
        },
        children: [{
                path: 'camp',
                permission: 'summerCamp:camp',
                hidden: true,
                component: () =>
                    import ('@/views/summerCamp/camp'),
                meta: {
                    title: '绳彩飞扬',
                    icon: 'summerCamp_school'
                }
            },
            // {
            //   path: 'school',
            //   permission: 'summerCamp:school',
            //   hidden: true,
            //   component: () => import('@/views/summerCamp/school'),
            //   meta: { title: '夏令营学校', icon: 'summerCamp_school' }
            // },
        ]
    },

    {
        path: '/salesDept',
        component: Layout,
        redirect: '/salesDept/salesDashboard',
        permission: 'salesDept',
        hidden: true,
        meta: {
            title: '销售部报表',
            icon: 'menu_salesDept'
        },
        children: [{
                path: 'salesDashboard',
                permission: 'salesDept:salesDashboard',
                hidden: true,
                component: () =>
                    import ('@/views/salesDept/salesDashboard'),
                meta: {
                    title: '销售看板',
                    icon: 'salesDept_salesDashboard'
                }
            },
            {
                path: 'salesDataEntry',
                permission: 'salesDept:salesDataEntry',
                hidden: true,
                component: () =>
                    import ('@/views/salesDept/salesDataEntry'),
                meta: {
                    title: '销售数据录入',
                    icon: 'salesDept_salesDataEntry'
                }
            }
        ]
    },

    {
        path: '/coursedisplay',
        component: Layout,
        redirect: '/coursedisplay/course',
        permission: 'coursedisplay',
        hidden: true,
        meta: {
            title: '课程展示',
            icon: 'menu_upgrade'
        },
        children: [{
                path: 'course',
                permission: 'coursedisplay:course',
                hidden: true,
                component: () =>
                    import ('@/views/coursedisplay/course'),
                meta: {
                    title: '查看课程',
                    icon: 'upgrade_firmware'
                }
            },
            {
                path: 'action',
                permission: 'coursedisplay:action',
                hidden: true,
                component: () =>
                    import ('@/views/coursedisplay/action'),
                meta: {
                    title: '查看动作',
                    icon: 'upgrade_resource'
                }
            },
            {
                path: 'attribute',
                permission: 'coursedisplay:attribute',
                hidden: true,
                component: () =>
                    import ('@/views/coursedisplay/attribute'),
                meta: {
                    title: '导入分类',
                    icon: 'upgrade_resource'
                }
            }
        ]
    },
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