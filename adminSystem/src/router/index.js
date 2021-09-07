import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // {
  //   path: '/salesDept/salesDashboard',
  //   hidden: true,
  //   component: () => import('@/views/salesDept/salesDashboard'),
  // },
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
      component: () => import('@/views/default'),
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
      component: () => import('@/views/laisiServe/Oauth'),
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
      component: () => import('@/views/dashboard/index'),
      meta: {
        title: '主页',
        icon: 'menu_dashboard'
      }
    }]
  },
  {
    path: '/dataReport',
    component: Layout,
    redirect: '/dataReport/userDataReport',
    permission: 'dataReport',
    hidden: true,
    meta: {
      title: '数据报表',
      icon: 'menu_dataReport'
    },
    children: [{
        path: 'userDataReport',
        permission: 'dataReport:userDataReport',
        hidden: true,
        component: () => import('@/views/dataReport/userDataReport'),
        meta: {
          title: '用户数据报表',
          icon: 'dataReport_userDataReport'
        }
      },
      {
        path: 'deviceReport',
        permission: 'dataReport:deviceReport',
        hidden: true,
        component: () => import('@/views/dataReport/deviceReport'),
        meta: {
          title: ' 绑定设备报表',
          icon: 'dataReport_deviceReport'
        }
      },
      {
        path: 'overseasDeviceReport',
        permission: 'dataReport:overseasDeviceReport',
        hidden: true,
        component: () => import('@/views/dataReport/overseasDeviceReport'),
        meta: {
          title: '其他区设备报表明细',
          icon: 'dataReport_overseasDeviceReport'
        }
      },
      {
        path: 'eurDeviceReport',
        permission: 'dataReport:eurDeviceReport',
        hidden: true,
        component: () => import('@/views/dataReport/eurDeviceReport'),
        meta: {
          title: ' 欧洲设备报表明细',
          icon: 'dataReport_eurDeviceReport'
        }
      },
      {
        path: 'allDeviceReport',
        permission: 'dataReport:allDeviceReport',
        hidden: true,
        component: () => import('@/views/dataReport/allDeviceReport'),
        meta: {
          title: ' 海外设备总报表',
          icon: 'dataReport_allDeviceReport'
        }
      },
    ]
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
      component: () => import('@/views/skip/skipList'),
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
        component: () => import('@/views/videoCourse/courseList'),
        meta: {
          title: '训练课程',
          icon: 'videoCourse_course'
        }
      },
      {
        path: 'catalog',
        permission: 'videoCourse:catalog',
        hidden: true,
        component: () => import('@/views/videoCourse/catalog'),
        meta: {
          title: '课程分类',
          icon: 'videoCourse_catalog'
        }
      },
      {
        path: 'hotCourse',
        permission: 'videoCourse:hotCourse',
        hidden: true,
        component: () => import('@/views/videoCourse/hotCourse'),
        meta: {
          title: '热门区',
          icon: 'videoCourse_hotCourse'
        }
      },
      {
        path: 'musicList',
        permission: 'videoCourse:musicList',
        hidden: true,
        component: () => import('@/views/videoCourse/musicList'),
        meta: {
          title: '音乐管理',
          icon: 'videoCourse_music'
        }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    redirect: '/device/productCategory',
    permission: 'device',
    hidden: true,
    meta: {
      title: '设备管理',
      icon: 'menu_device'
    },
    children: [{
        path: 'productCategory',
        permission: 'device:productCategory',
        hidden: true,
        component: () => import('@/views/device/productCategory'),
        meta: {
          title: '产品分类',
          icon: 'device_productCategory'
        }
      },
      {
        path: 'productList',
        permission: 'device:productList',
        hidden: true,
        component: () => import('@/views/device/productList'),
        meta: {
          title: '产品分类',
          icon: 'device_productCategory'
        }
      },
      {
        path: 'productCard',
        permission: 'device:productCard',
        hidden: true,
        component: () => import('@/views/device/productCard'),
        meta: {
          title: '产品卡片标题',
          icon: 'device_productCard'
        }
      },

      {
        path: 'deviceNickname',
        permission: 'device:deviceNickname',
        hidden: true,
        component: () => import('@/views/device/deviceNickname'),
        meta: {
          title: '设备昵称',
          icon: 'device_deviceNickname'
        }
      },
      {
        path: 'deviceSupportAppVersion',
        permission: 'device:deviceSupportAppVersion',
        hidden: true,
        component: () => import('@/views/device/deviceSupportAppVersion'),
        meta: {
          title: '设备的APP版本配置',
          icon: 'device_deviceSupportAppVersion'
        }
      },
      {
        path: 'deviceBlacklist',
        permission: 'device:deviceBlacklist',
        hidden: true,
        component: () => import('@/views/device/deviceBlacklist'),
        meta: {
          title: '设备黑名单',
          icon: 'device_deviceBlacklist'
        }
      },
      {
        path: 'appLanguage',
        permission: 'device:appLanguage',
        hidden: true,
        component: () => import('@/views/device/appLanguage'),
        meta: {
          title: 'APP语言',
          icon: 'device_appLanguage'
        }
      },
      {
        path: 'watchSportType',
        permission: 'device:watchSportType',
        hidden: true,
        component: () => import('@/views/device/watchSportType'),
        meta: {
          title: '手表运动状态',
          icon: 'device_deviceBlacklist'
        }
      },
    ]
  },
  {
    path: '/firmware',
    component: Layout,
    redirect: '/firmware/fota',
    permission: 'firmware',
    hidden: true,
    meta: {
      title: '固件升级',
      icon: 'menu_firmware'
    },
    children: [{
        path: 'fota',
        permission: 'firmware:fota',
        hidden: true,
        component: () => import('@/views/firmware/fota'),
        meta: {
          title: 'Fota配置',
          icon: 'firmware_fota'
        }
      },
      {
        path: 'bodyFat',
        permission: 'firmware:bodyFat',
        hidden: true,
        component: () => import('@/views/firmware/bodyFat'),
        meta: {
          title: '体脂秤固件',
          icon: 'firmware_bodyFat'
        }
      },
      {
        path: 'whiteList',
        permission: 'firmware:whiteList',
        hidden: true,
        component: () => import('@/views/firmware/whiteList'),
        meta: {
          title: '白名单',
          icon: 'firmware_whiteList'
        }
      },
      {
        path: 'whiteListJob',
        permission: 'firmware:whiteListJob',
        hidden: true,
        component: () => import('@/views/firmware/whiteListJob'),
        meta: {
          title: '白名单更新规则',
          icon: 'firmware_whiteListJob'
        }
      },
    ]
  },
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
        component: () => import('@/views/upgrade/firmware'),
        meta: {
          title: '固件管理',
          icon: 'upgrade_firmware'
        }
      },
      {
        path: 'resource',
        permission: 'upgrade:resource',
        hidden: true,
        component: () => import('@/views/upgrade/resource'),
        meta: {
          title: '资源管理',
          icon: 'upgrade_resource'
        }
      }
    ]
  },
  {
    path: '/software',
    component: Layout,
    redirect: '/software/firmware',
    permission: 'software',
    hidden: true,
    meta: {
      title: '软件升级',
      icon: 'menu_software'
    },
    children: [{
        path: 'publicChannels',
        permission: 'software:publicChannels',
        hidden: true,
        component: () => import('@/views/software/publicChannels'),
        meta: {
          title: '公共渠道',
          icon: 'software_publicChannels'
        }
      },
      {
        path: 'appList',
        permission: 'software:appList',
        hidden: true,
        component: () => import('@/views/software/appList'),
        meta: {
          title: 'APP管理',
          icon: 'software_appList'
        }
      },
      {
        path: 'version',
        permission: 'software:version',
        hidden: true,
        component: () => import('@/views/software/version'),
        meta: {
          title: '版本管理',
          icon: 'software_version'
        }
      },
    ]
  },
  {
    path: '/helpCenter',
    component: Layout,
    redirect: '/helpCenter/problemList',
    permission: 'helpCenter',
    hidden: true,
    meta: {
      title: '帮助中心',
      icon: 'menu_helpCenter'
    },
    children: [
      {
        path: 'bigQuestion',
        permission: 'helpCenter:bigQuestion',
        hidden: true,
        component: () => import('@/views/helpCenter/bigQuestion'),
        meta: {
          title: '问题大类',
          icon: 'helpCenter_guideList'
        }
      },
      {
        path: 'problemList',
        permission: 'helpCenter:problemList',
        hidden: true,
        component: () => import('@/views/helpCenter/problemList'),
        meta: {
          title: '常见问题',
          icon: 'helpCenter_problemList'
        }
      },
      {
        path: 'devicetype',
        permission: 'helpCenter:devicetype',
        hidden: true,
        component: () => import('@/views/helpCenter/devicetype'),
        meta: {
          title: '设备分类',
          icon: 'helpCenter_guideList'
        }
      },
      {
        path: 'guideList',
        permission: 'helpCenter:guideList',
        hidden: true,
        component: () => import('@/views/helpCenter/guideList'),
        meta: {
          title: '操作指南',
          icon: 'helpCenter_guideList'
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
        component: () => import('@/views/ad/banner'),
        meta: {
          title: 'banner',
          icon: 'ad_banner'
        }
      },
      {
        path: 'adSDK',
        permission: 'ad:adSDK',
        hidden: true,
        component: () => import('@/views/ad/adSDK'),
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
      component: () => import('@/views/feedback/feedbackList'),
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
        component: () => import('@/views/baisuo/user'),
        meta: {
          title: '用户管理',
          icon: 'baisuo_user'
        }
      },
      {
        path: 'customer',
        permission: 'baisuo:customer',
        hidden: true,
        component: () => import('@/views/baisuo/customer'),
        meta: {
          title: '客户管理',
          icon: 'baisuo_customer'
        }
      },
      {
        path: 'template',
        permission: 'baisuo:template',
        hidden: true,
        component: () => import('@/views/baisuo/template'),
        meta: {
          title: '模板管理',
          icon: 'baisuo_template'
        }
      },
      {
        path: 'ropeSkipping',
        permission: 'baisuo:ropeSkipping',
        hidden: true,
        component: () => import('@/views/baisuo/ropeSkipping'),
        meta: {
          title: '跳绳管理',
          icon: 'baisuo_ropeSkipping'
        }
      },
      {
        path: 'hub',
        permission: 'baisuo:hub',
        hidden: true,
        component: () => import('@/views/baisuo/hub'),
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
        component: () => import('@/views/clockDial/dialResource'),
        meta: {
          title: '表盘资源',
          icon: 'clockDial_dialResource'
        }
      },
      {
        path: 'dialinterface',
        permission: 'clockDial:dialinterface',
        hidden: true,
        component: () => import('@/views/clockDial/dialinterface'),
        meta: {
          title: '表盘界面',
          icon: 'clockDial_dialinterface'
        }
      },
    ]
  },
  {
    path: '/factoryTesting',
    component: Layout,
    redirect: '/factoryTesting/factory',
    permission: 'factoryTesting',
    hidden: true,
    meta: {
      title: '工厂测试',
      icon: 'menu_factoryTesting'
    },
    children: [{
        path: 'factory',
        permission: 'factoryTesting:factory',
        hidden: true,
        component: () => import('@/views/factoryTesting/factory'),
        meta: {
          title: '工厂管理',
        }
      },
      {
        path: 'project',
        permission: 'factoryTesting:project',
        hidden: true,
        component: () => import('@/views/factoryTesting/project'),
        meta: {
          title: '项目管理'
        }
      },
      {
        path: 'testType',
        permission: 'factoryTesting:testType',
        hidden: true,
        component: () => import('@/views/factoryTesting/testType'),
        meta: {
          title: '测试类型管理'
        }
      },
      {
        path: 'station',
        permission: 'factoryTesting:station',
        hidden: true,
        component: () => import('@/views/factoryTesting/station'),
        meta: {
          title: '站位管理'
        }
      },
      {
        path: 'stationConfiguration',
        permission: 'factoryTesting:stationConfiguration',
        hidden: true,
        component: () => import('@/views/factoryTesting/stationConfiguration'),
        meta: {
          title: '站位管理'
        }
      },
      {
        path: 'testItem',
        permission: 'factoryTesting:testItem',
        hidden: true,
        component: () => import('@/views/factoryTesting/testItem'),
        meta: {
          title: '测试项'
        }
      },
      {
        path: 'testItemConfiguration',
        permission: 'factoryTesting:testItemConfiguration',
        hidden: true,
        component: () => import('@/views/factoryTesting/testItemConfiguration'),
        meta: {
          title: '测试项配置'
        }
      },
      {
        path: 'testResult',
        permission: 'factoryTesting:testResult',
        hidden: true,
        component: () => import('@/views/factoryTesting/testResult'),
        meta: {
          title: '测试结果'
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
        component: () => import('@/views/systemNotification/systemNotification'),
        meta: {
          title: '系统通知',
          icon: 'systemNotification_systemNotification'
        }
      },

    ]
  }, {
    path: '/community',
    component: Layout,
    redirect: '/community/dynamicDatabase',
    permission: 'community',
    hidden: true,
    meta: {
      title: '社区管理',
      icon: 'menu_community'
    },
    children: [{
        path: 'dynamicDatabase',
        permission: 'community:dynamicDatabase',
        hidden: true,
        component: () => import('@/views/community/dynamicDatabase'),
        meta: {
          title: '动态统计',
          icon: 'community_dynamicDatabase'
        }
      },
      {
        path: 'dynamicM',
        permission: 'community:dynamicM',
        hidden: true,
        component: () => import('@/views/community/dynamicM'),
        meta: {
          title: '动态管理',
          icon: 'community_dynamicM'
        }
      },
      {
        path: 'topic',
        permission: 'community:topic',
        hidden: true,
        component: () => import('@/views/community/topic'),
        meta: {
          title: '热门话题',
          icon: 'community_topic'
        }
      },
      {
        path: 'talent',
        permission: 'community:talent',
        hidden: true,
        component: () => import('@/views/community/talent'),
        meta: {
          title: '达人管理',
          icon: 'community_talent'
        }
      },
      {
        path: 'report',
        permission: 'community:report',
        hidden: true,
        component: () => import('@/views/community/report'),
        meta: {
          title: '举报管理',
          icon: 'community_report'
        }
      },
      {
        path: 'asyncApproval',
        permission: 'community:asyncApproval',
        hidden: true,
        component: () => import('@/views/community/asyncApproval'),
        meta: {
          title: '举报管理',
          icon: 'community_report'
        }
      },
    ]
  }, {
    path: '/afterSale',
    component: Layout,
    redirect: '/afterSale/dataPerfection',
    permission: 'afterSale',
    hidden: true,
    meta: {
      title: '售后服务',
      icon: 'menu_afterSale'
    },
    children: [{
        path: 'dataPerfection',
        permission: 'afterSale:dataPerfection',
        hidden: true,
        component: () => import('@/views/afterSale/dataPerfection'),
        meta: {
          title: '数据完善',
          icon: 'afterSale_dataPerfection'
        }
      },
      {
        path: 'club',
        permission: 'afterSale:club',
        hidden: true,
        component: () => import('@/views/afterSale/club'),
        meta: {
          title: '俱乐部',
          icon: 'afterSale_club'
        }
      },
      {
        path: 'goods',
        permission: 'afterSale:goods',
        hidden: true,
        component: () => import('@/views/afterSale/goods'),
        meta: {
          title: '发现页商品',
          icon: 'afterSale_goods'
        }
      },
      {
        path: 'customerSN',
        permission: 'afterSale:customerSN',
        hidden: true,
        component: () => import('@/views/afterSale/customerSN'),
        meta: {
          title: '客户SN和MAC',
          icon: 'operate_customerSN'
        }
      },
    ]
  }, {
    path: '/dataSearch',
    component: Layout,
    redirect: '/dataSearch:skipData',
    permission: 'dataSearch',
    hidden: true,
    meta: {
      title: '数据查询',
      icon: 'menu_dataSearch'
    },
    children: [{
        path: 'skipData',
        permission: 'dataSearch:skipData',
        hidden: true,
        component: () => import('@/views/dataSearch/skipData'),
        meta: {
          title: '跳绳查询',
          icon: 'dataSearch_skipData'
        }
      },
      {
        path: 'wristBall',
        permission: 'dataSearch:wristBall',
        hidden: true,
        component: () => import('@/views/dataSearch/wristBall'),
        meta: {
          title: '腕力球查询',
          icon: 'dataSearch_wristBall'
        }
      },
      {
        path: 'userData',
        permission: 'dataSearch:userData',
        hidden: true,
        component: () => import('@/views/dataSearch/userData'),
        meta: {
          title: '用户数据',
          icon: 'dataSearch_userData'
        }
      },
      {
        path: 'bindData',
        permission: 'dataSearch:bindData',
        hidden: true,
        component: () => import('@/views/dataSearch/bindData'),
        meta: {
          title: ' 绑定数据',
          icon: 'dataSearch_bindData'
        }
      },
      {
        path: 'uploadDtatus',
        permission: 'dataSearch:uploadDtatus',
        hidden: true,
        component: () => import('@/views/dataSearch/uploadDtatus'),
        meta: {
          title: '上报状态',
          icon: 'dataSearch_uploadDtatus'
        }
      },
      {
        path: 'pageCard',
        permission: 'dataSearch:pageCard',
        hidden: true,
        component: () => import('@/views/dataSearch/pageCard'),
        meta: {
          title: ' 首页卡片',
          icon: 'dataSearch_pageCard'
        }
      },

      {
        path: 'watch',
        permission: 'dataSearch:watch',
        hidden: true,
        redirect: '/dataSearch/watch/sportWatchSearch',
        component: () => import('@/views/dataSearch/watch/watchIndex'),
        meta: {
          title: '手表查询',
          icon: 'dataSearch_watch'
        },
        children: [{
            path: 'sportWatchSearch',
            permission: 'dataSearch:watch:sportWatchSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/sportWatchSearch'),
            meta: {
              title: '年月日步数'
            }
          },
          {
            path: 'runWatchSearch',
            permission: 'dataSearch:watch:runWatchSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/runWatchSearch'),
            meta: {
              title: '年月日运动'
            }
          },
          {
            path: 'runHistorySearch',
            permission: 'dataSearch:watch:runHistorySearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/runHistorySearch'),
            meta: {
              title: '历史查询'
            }
          },
          {
            path: 'runListInfo',
            permission: 'dataSearch:watch:runListInfo',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/runListInfo'),
            meta: {
              title: '运动详情查询'
            }
          },
          {
            path: 'oxygenSearch',
            permission: 'dataSearch:watch:oxygenSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/oxygenSearch'),
            meta: {
              title: '年月日血氧查询'
            }
          },
          {
            path: 'calorySearch',
            permission: 'dataSearch:watch:calorySearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/calorySearch'),
            meta: {
              title: '年月日卡路里查询'
            }
          },
          {
            path: 'heartrateSearch',
            permission: 'dataSearch:watch:heartrateSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/watch/heartrateSearch'),
            meta: {
              title: '年月日心率查询'
            }
          },
        ]
      },
      {
        path: 'backgroundWatch',
        permission: 'dataSearch:backgroundWatch',
        hidden: true,
        redirect: '/dataSearch/backgroundWatch/backgroundRunSearch',
        component: () => import('@/views/dataSearch/backgroundWatch/backgroundWatchindex'),
        meta: {
          title: '服务端手表数据',
          icon: 'dataSearch_watch'
        },
        children: [{
            path: 'backgroundRunSearch',
            permission: 'dataSearch:backgroundWatch:backgroundRunSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundRunSearch'),
            meta: {
              title: '手表跑步'
            }
          },
          {
            path: 'backgroundSleepSearch',
            permission: 'dataSearch:backgroundWatch:backgroundSleepSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundSleepSearch'),
            meta: {
              title: '手表睡眠'
            }
          },
          {
            path: 'backgroundStepSearch',
            permission: 'dataSearch:backgroundWatch:backgroundStepSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundStepSearch'),
            meta: {
              title: '手表步数'
            }
          },
          {
            path: 'backgroundHeartSearch',
            permission: 'dataSearch:backgroundWatch:backgroundHeartSearch',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundHeartSearch'),
            meta: {
              title: '手表心率'
            }
          },
          {
            path: 'backgroundBD',
            permission: 'dataSearch:backgroundWatch:backgroundBD',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundBD'),
            meta: {
              title: '手表血压'
            }
          },
          {
            path: 'backgroundOxygen',
            permission: 'dataSearch:backgroundWatch:backgroundOxygen',
            hidden: true,
            component: () => import('@/views/dataSearch/backgroundWatch/backgroundOxygen'),
            meta: {
              title: '手表血氧'
            }
          },
        ]
      },
    ]
  }, {
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
        component: () => import('@/views/summerCamp/camp'),
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
  }, {
    path: '/operateReport',
    component: Layout,
    redirect: '/operateReport/clubReport',
    permission: 'operateReport',
    hidden: true,
    meta: {
      title: '运营报表',
      icon: 'menu_operateReport'
    },
    children: [{
        path: 'overView',
        permission: 'operateReport:overView',
        hidden: true,
        component: () => import('@/views/operateReport/overView'),
        meta: {
          title: '运营总览',
          icon: 'operateReport_courseInfoReport'
        }
      },
      {
        path: 'clubReport',
        permission: 'operateReport:clubReport',
        hidden: true,
        component: () => import('@/views/operateReport/clubReport'),
        meta: {
          title: '俱乐部报表',
          icon: 'operateReport_clubReport'
        }
      },
      {
        path: 'courseReport',
        permission: 'operateReport:courseReport',
        hidden: true,
        component: () => import('@/views/operateReport/courseReport'),
        meta: {
          title: '课程参与人数',
          icon: 'operateReport_courseReport'
        },
      },
      {
        path: 'weekPlanOverview',
        permission: 'operateReport:weekPlanOverview',
        hidden: true,
        component: () => import('@/views/operateReport/weekPlanOverview'),
        meta: {
          title: '七日训练计划',
          icon: 'operateReport_courseInfoReport'
        },
      },
      {
        path: 'courseInfoReport',
        permission: 'operateReport:courseInfoReport',
        hidden: true,
        component: () => import('@/views/operateReport/courseInfoReport'),
        meta: {
          title: '课程总览',
          icon: 'operateReport_courseInfoReport'
        },
      },
      {
        path: 'communityReport',
        permission: 'operateReport:communityReport',
        hidden: true,
        component: () => import('@/views/operateReport/communityReport'),
        meta: {
          title: '社区报表',
          icon: 'operateReport_communityReport'
        }
      },
      {
        path: 'DBReport',
        permission: 'operateReport:DBReport',
        hidden: true,
        redirect: '/views/operateReport/DBReport/dailyAdd',
        component: () => import('@/views/operateReport/DBReport/DBIndex'),
        meta: {
          title: '逗币报表',
          icon: 'operateReport_communityReport'
        },
        children: [{
          path: 'dailyAdd',
          permission: 'operateReport:DBReport:dailyAdd',
          hidden: true,
          component: () => import('@/views/operateReport/DBReport/dailyAdd'),
          meta: {
            title: '每日新增',
            icon: 'operateReport_courseInfoReport'
          }
        }, ]
      },
      {
        path: 'myTeamReport',
        permission: 'operateReport:myTeamReport',
        hidden: true,
        redirect: '/views/operateReport/myTeamReport/dailyAlive',
        component: () => import('@/views/operateReport/myTeamReport/index'),
        meta: {
          title: '我的小组',
          icon: 'operateReport_courseInfoReport'
        },
        children: [{
          path: 'dailyAlive',
          permission: 'operateReport:myTeamReport:dailyAlive',
          hidden: true,
          component: () => import('@/views/operateReport/myTeamReport/dailyAlive'),
          meta: {
            title: '小组报表',
            icon: 'operateReport_courseInfoReport'
          }
        }, ]
      },
    ]
  }, {
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
        component: () => import('@/views/salesDept/salesDashboard'),
        meta: {
          title: '销售看板',
          icon: 'salesDept_salesDashboard'
        }
      },
      {
        path: 'salesDataEntry',
        permission: 'salesDept:salesDataEntry',
        hidden: true,
        component: () => import('@/views/salesDept/salesDataEntry'),
        meta: {
          title: '销售数据录入',
          icon: 'salesDept_salesDataEntry'
        }
      }
    ]
  }, {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    permission: 'permission',
    hidden: true,
    meta: {
      title: '权限管理',
      icon: 'menu_permission'
    },
    children: [{
        path: 'user',
        permission: 'permission:user',
        hidden: true,
        component: () => import('@/views/permission/user'),
        meta: {
          title: '用户管理',
          icon: 'permission_user'
        }
      },
      {
        path: 'department',
        permission: 'permission:department',
        hidden: true,
        component: () => import('@/views/permission/department'),
        meta: {
          title: '部门管理',
          icon: 'permission_department'
        }
      },
      {
        path: 'role',
        permission: 'permission:role',
        hidden: true,
        component: () => import('@/views/permission/role'),
        meta: {
          title: '角色管理',
          icon: 'permission_role'
        }
      },
      {
        path: 'menu',
        permission: 'permission:menu',
        hidden: true,
        component: () => import('@/views/permission/menu'),
        meta: {
          title: '菜单管理',
          icon: 'permission_menu',
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
        component: () => import('@/views/coursedisplay/course'),
        meta: {
          title: '查看课程',
          icon: 'upgrade_firmware'
        }
      },
      {
        path: 'action',
        permission: 'coursedisplay:action',
        hidden: true,
        component: () => import('@/views/coursedisplay/action'),
        meta: {
          title: '查看动作',
          icon: 'upgrade_resource'
        }
      },
      {
        path: 'attribute',
        permission: 'coursedisplay:attribute',
        hidden: true,
        component: () => import('@/views/coursedisplay/attribute'),
        meta: {
          title: '导入分类',
          icon: 'upgrade_resource'
        }
      }
    ]
  },
  {
    path: '/officialWebsite',
    component: Layout,
    redirect: '/officialWebsite/index/index',
    permission: 'officialWebsite',
    hidden: true,
    meta: {
      title: '官网后台',
      icon: 'menu_operate'
    },
    children: [{
        path: 'index',
        permission: 'officialWebsite:index',
        hidden: true,
        redirect: '/officialWebsite/index/index',
        component: () => import('@/views/officialWebsite/index/index'),
        meta: {
          title: '首页'
        },
        children: [{
            path: 'bannerList',
            permission: 'officialWebsite:index:bannerList',
            hidden: true,
            component: () => import('@/views/officialWebsite/index/bannerList'),
            meta: {
              title: 'banner图更换'
            }
          },
          {
            path: 'adpic',
            permission: 'officialWebsite:index:adpic',
            hidden: true,
            component: () => import('@/views/officialWebsite/index/adpic'),
            meta: {
              title: '小图更换'
            }
          },
          {
            path: 'news',
            permission: 'officialWebsite:index:news',
            hidden: true,
            component: () => import('@/views/officialWebsite/index/news'),
            meta: {
              title: '新闻与活动'
            }
          }
        ]
      },
      {
        path: 'aboutus',
        permission: 'officialWebsite:aboutus',
        hidden: true,
        redirect: '/officialWebsite/aboutus/index',
        component: () => import('@/views/officialWebsite/aboutus/index'),
        meta: {
          title: '关于铼锶'
        },
        children: [{
            path: 'bannerList',
            permission: 'officialWebsite:aboutus:bannerList',
            hidden: true,
            component: () => import('@/views/officialWebsite/aboutus/bannerList'),
            meta: {
              title: 'banner图更换'
            }
          },
          {
            path: 'aboutLS',
            permission: 'officialWebsite:aboutus:aboutLS',
            hidden: true,
            component: () => import('@/views/officialWebsite/aboutus/aboutLS'),
            meta: {
              title: '关于我们'
            }
          },
          {
            path: 'brand',
            permission: 'officialWebsite:aboutus:brand',
            hidden: true,
            component: () => import('@/views/officialWebsite/aboutus/brand'),
            meta: {
              title: '品牌介绍'
            }
          },
          {
            path: 'memorabilia',
            permission: 'officialWebsite:aboutus:memorabilia',
            hidden: true,
            component: () => import('@/views/officialWebsite/aboutus/memorabilia'),
            meta: {
              title: '大事记'
            }
          },
        ]
      },
      {
        path: 'businesscooperation',
        permission: 'officialWebsite:businesscooperation',
        hidden: true,
        redirect: '/officialWebsite/businesscooperation/index',
        component: () => import('@/views/officialWebsite/businesscooperation/index'),
        meta: {
          title: '商务合作'
        },
        children: [{
            path: 'bannerList',
            permission: 'officialWebsite:businesscooperation:bannerList',
            hidden: true,
            component: () => import('@/views/officialWebsite/businesscooperation/bannerList'),
            meta: {
              title: 'banner图更换'
            }
          },
          {
            path: 'cooperativepartner',
            permission: 'officialWebsite:businesscooperation:cooperativepartner',
            hidden: true,
            component: () => import('@/views/officialWebsite/businesscooperation/cooperativepartner'),
            meta: {
              title: '我的合作伙伴'
            }
          }
        ]
      },
      {
        path: 'outdoorSport',
        permission: 'officialWebsite:outdoorSport',
        hidden: true,
        redirect: '/officialWebsite/outdoorSport/index',
        component: () => import('@/views/officialWebsite/outdoorSport/index'),
        meta: {
          title: '户外运动系列'
        },
        children: [{
            path: 'bannerList',
            permission: 'officialWebsite:outdoorSport:bannerList',
            hidden: true,
            component: () => import('@/views/officialWebsite/outdoorSport/bannerList'),
            meta: {
              title: 'banner图更换'
            }
          },
          {
            path: 'adpic',
            permission: 'officialWebsite:outdoorSport:adpic',
            hidden: true,
            component: () => import('@/views/officialWebsite/outdoorSport/adpic'),
            meta: {
              title: '产品更换'
            }
          }
        ]
      },
      {
        path: 'smartWear',
        permission: 'officialWebsite:smartWear',
        hidden: true,
        redirect: '/officialWebsite/smartWear/index',
        component: () => import('@/views/officialWebsite/smartWear/index'),
        meta: {
          title: '智能穿戴系列'
        },
        children: [{
            path: 'bannerList',
            permission: 'officialWebsite:smartWear:bannerList',
            hidden: true,
            component: () => import('@/views/officialWebsite/smartWear/bannerList'),
            meta: {
              title: 'banner图更换'
            }
          },
          {
            path: 'adpic',
            permission: 'officialWebsite:smartWear:adpic',
            hidden: true,
            component: () => import('@/views/officialWebsite/smartWear/adpic'),
            meta: {
              title: '产品更换'
            }
          }
        ]
      },
      {
        path: 'paiHealth',
        permission: 'officialWebsite:paiHealth',
        hidden: true,
        redirect: '/officialWebsite/paiHealth/index',
        component: () => import('@/views/officialWebsite/paiHealth/index'),
        meta: {
          title: '派健康'
        },
        children: [{
          path: 'bannerList',
          permission: 'officialWebsite:paiHealth:bannerList',
          hidden: true,
          component: () => import('@/views/officialWebsite/paiHealth/bannerList'),
          meta: {
            title: 'banner图更换'
          }
        }, ]
      },
      {
        path: 'Solution',
        permission: 'officialWebsite:Solution',
        hidden: true,
        redirect: '/officialWebsite/Solution/index',
        component: () => import('@/views/officialWebsite/Solution/index'),
        meta: {
          title: '行业解决方案'
        },
        children: [{
          path: 'bannerList',
          permission: 'officialWebsite:Solution:bannerList',
          hidden: true,
          component: () => import('@/views/officialWebsite/Solution/bannerList'),
          meta: {
            title: 'banner图更换'
          }
        }, ]
      },
    ]
  }, {
    path: '/operate',
    component: Layout,
    redirect: '/operate/pointLottery',
    permission: 'operate',
    hidden: true,
    meta: {
      title: '运营活动',
      icon: 'menu_operate'
    },
    children: [{
        path: 'shareConfig',
        permission: 'operate:shareConfig',
        hidden: true,
        component: () => import('@/views/operate/shareConfig/shareConfig'),
        meta: {
          title: '分享模板',
          icon: 'operate_shareConfig'
        }
      },
      {
        path: 'withdrawal',
        permission: 'operate:withdrawal',
        hidden: true,
        component: () => import('@/views/operate/withdrawal'),
        meta: {
          title: '提现审核',
          icon: 'operate_withdrawal'
        }
      },
      {
        path: 'onlinePK',
        permission: 'operate:onlinePK',
        hidden: true,
        redirect: '/operate/onlinePK/onLinePKList',
        component: () => import('@/views/operate/onlinePK/onlinePKIndex'),
        meta: {
          title: '在线Pk赛',
          icon: 'operate_onlinePK'
        },
        children: [{
            path: 'onlinePKList',
            permission: 'operate:onlinePK:onlinePKList',
            hidden: true,
            component: () => import('@/views/operate/onlinePK/onlinePKList'),
            meta: {
              title: '在线Pk赛',
              icon: 'menu_onlinePKList'
            }
          },
          {
            path: 'robot',
            permission: 'operate:onlinePK:robot',
            hidden: true,
            component: () => import('@/views/operate/onlinePK/robot'),
            meta: {
              title: '机器人管理',
              icon: 'menu_robot'
            }
          }
        ]
      },
      {
        path: 'officialActivities',
        permission: 'operate:officialActivities',
        hidden: true,
        component: () => import('@/views/operate/officialActivities'),
        meta: {
          title: '首页官方活动',
          icon: 'operate_officialActivities'
        }
      },
      {
        path: 'payControl',
        permission: 'operate:payControl',
        hidden: true,
        component: () => import('@/views/operate/payControl'),
        meta: {
          title: '支付控制管理',
          icon: 'operate_payControl'
        }
      },
      {
        path: 'pointLottery',
        permission: 'operate:pointLottery',
        hidden: true,
        redirect: '/operate/pointLottery/awardSet',
        component: () => import('@/views/operate/pointLottery/pointLotteryIndex'),
        meta: {
          title: '逗币活动',
          icon: 'operate_pointLottery'
        },
        children: [

          {
            path: 'coinsReport',
            permission: 'operate:pointLottery:coinsReport',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/coinsReport'),
            meta: {
              title: '逗币领取统计',
              icon: 'operate_coinsReport'
            }
          },
          {
            path: 'awardSet',
            permission: 'operate:pointLottery:awardSet',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/awardSet'),
            meta: {
              title: '商品设置',
              icon: 'operate_awardSet'
            }
          },
          {
            path: 'exchangeSet',
            permission: 'operate:pointLottery:exchangeSet',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/exchangeSet'),
            meta: {
              title: '兑换商品设置',
              icon: 'operate_exchangeSet'
            }
          },
          {
            path: 'userCoins',
            permission: 'operate:pointLottery:userCoins',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/userCoins'),
            meta: {
              title: '逗币查询',
              icon: 'operate_userCoins'
            }
          },
          {
            path: 'awardPool',
            permission: 'operate:pointLottery:awardPool',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/awardPool'),
            meta: {
              title: '奖池设置',
              icon: 'operate_awardPool'
            }
          },
          {
            path: 'blindboxSet',
            permission: 'operate:pointLottery:blindboxSet',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/blindboxSet'),
            meta: {
              title: '盲盒设置',
              icon: 'operate_blindboxSet'
            }
          },
          {
            path: 'orderManage',
            permission: 'operate:pointLottery:orderManage',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/orderManage'),
            meta: {
              title: '订单管理',
              icon: 'operate_orderManage'
            }
          },
          {
            path: 'redbagManage',
            permission: 'operate:pointLottery:redbagManage',
            hidden: true,
            component: () => import('@/views/operate/pointLottery/redbagManage'),
            meta: {
              title: '红包打款',
              icon: 'operate_redbagManage'
            }
          },

        ]
      },
      {
        path: 'redbagGame',
        permission: 'operate:redbagGame',
        hidden: true,
        component: () => import('@/views/operate/redbagGame/redbagGame'),
        meta: {
          title: '红包挑战赛',
          icon: 'operate_redbag'
        }
      },
      {
        path: 'redBagExport',
        permission: 'operate:redBagExport',
        hidden: true,
        component: () => import('@/views/operate/redBagExport'),
        meta: {
          title: '红包统计',
          icon: 'operate_redbag'
        },
      },
      {
        path: 'activityConfig',
        permission: 'operate:activityConfig',
        hidden: true,
        component: () => import('@/views/operate/activityConfig'),
        meta: {
          title: '活动显示配置',
          icon: 'operate_activityConfig'
        }
      },
      {
        path: 'growthPoints',
        permission: 'operate:growthPoints',
        hidden: true,
        redirect: '/operate/growthPoints/growthValue',
        component: () => import('@/views/operate/growthPoints/growthPointsIndex'),
        meta: {
          title: '成长值和逗币',
          icon: 'menu_growthPoints'
        },
        children: [{
            path: 'growthValue',
            permission: 'operate:growthPoints:growthValue',
            hidden: true,
            component: () => import('@/views/operate/growthPoints/growthValue'),
            meta: {
              title: '成长值统计'
            }
          },
          {
            path: 'growth',
            permission: 'operate:growthPoints:growth',
            hidden: true,
            component: () => import('@/views/operate/growthPoints/growth'),
            meta: {
              title: '成长值管理'
            }
          },
          {
            path: 'point',
            permission: 'operate:growthPoints:point',
            hidden: true,
            component: () => import('@/views/operate/growthPoints/point'),
            meta: {
              title: '逗币任务'
            }
          },
          {
            path: 'taskStastic',
            permission: 'operate:growthPoints:taskStastic',
            hidden: true,
            component: () => import('@/views/operate/growthPoints/taskStastic'),
            meta: {
              title: '逗比任务统计'
            }
          },
        ]
      },
      {
        path: 'annualReport',
        permission: 'operate:annualReport',
        hidden: true,
        redirect: '/operate/annualReport/2020',
        component: () => import('@/views/operate/annualReport/reportIndex'),
        meta: {
          title: '年度报告',
          icon: 'menu_annualReport'
        },
        children: [{
          path: '2020',
          permission: 'operate:annualReport:2020',
          hidden: true,
          component: () => import('@/views/operate/annualReport/2020'),
          meta: {
            title: '2020年度报告',
            icon: 'menu_annualReport'
          }
        }]
      },

    ]
  }, {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true,
    meta: {
      title: '401',
    }
  },
  // 404 page must be placed at the end !!!
  {
    path: '*',
    component: () => import('@/views/error-page/404'),
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
