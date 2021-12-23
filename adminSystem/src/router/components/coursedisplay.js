import Layout from '@/layout'
var coursedisplay = {
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
}

export { coursedisplay };