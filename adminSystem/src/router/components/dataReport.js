import Layout from '@/layout'
var dataReport = {
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
            component: () =>
                import ('@/views/dataReport/userDataReport'),
            meta: {
                title: '用户数据报表',
                icon: 'dataReport_userDataReport'
            }
        },
        {
            path: 'deviceReport',
            permission: 'dataReport:deviceReport',
            hidden: true,
            component: () =>
                import ('@/views/dataReport/deviceReport'),
            meta: {
                title: ' 绑定设备报表',
                icon: 'dataReport_deviceReport'
            }
        },
        {
            path: 'overseasDeviceReport',
            permission: 'dataReport:overseasDeviceReport',
            hidden: true,
            component: () =>
                import ('@/views/dataReport/overseasDeviceReport'),
            meta: {
                title: '其他区设备报表明细',
                icon: 'dataReport_overseasDeviceReport'
            }
        },
        {
            path: 'eurDeviceReport',
            permission: 'dataReport:eurDeviceReport',
            hidden: true,
            component: () =>
                import ('@/views/dataReport/eurDeviceReport'),
            meta: {
                title: ' 欧洲设备报表明细',
                icon: 'dataReport_eurDeviceReport'
            }
        },
        {
            path: 'allDeviceReport',
            permission: 'dataReport:allDeviceReport',
            hidden: true,
            component: () =>
                import ('@/views/dataReport/allDeviceReport'),
            meta: {
                title: ' 海外设备总报表',
                icon: 'dataReport_allDeviceReport'
            }
        },
    ]
}
export { dataReport };