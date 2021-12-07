import Layout from '@/layout'
var intelligent = {
    path: '/intelligent',
    component: Layout,
    redirect: '/intelligent/course',
    permission: 'intelligent',
    hidden: true,
    meta: {
        title: '智能训练',
        icon: 'menu_upgrade'
    },
    children: [{
            path: 'course',
            permission: 'intelligent:course',
            hidden: true,
            component: () =>
                import ('@/views/intelligent/course'),
            meta: {
                title: '查看课程',
                icon: 'upgrade_firmware'
            }
        },
        {
            path: 'defaultcourse',
            permission: 'intelligent:defaultcourse',
            hidden: true,
            component: () =>
                import ('@/views/intelligent/defaultcourse'),
            meta: {
                title: '默认课程',
                icon: 'upgrade_firmware'
            }
        },
        {
            path: 'action',
            permission: 'intelligent:action',
            hidden: true,
            component: () =>
                import ('@/views/intelligent/action'),
            meta: {
                title: '查看动作',
                icon: 'upgrade_resource'
            }
        },
        {
            path: 'food',
            permission: 'intelligent:food',
            hidden: true,
            component: () =>
                import ('@/views/intelligent/food'),
            meta: {
                title: '添加食物',
                icon: 'upgrade_resource'
            }
        },
        {
            path: 'foodType',
            permission: 'intelligent:foodType',
            hidden: true,
            component: () =>
                import ('@/views/intelligent/foodType'),
            meta: {
                title: '食物分类',
                icon: 'upgrade_resource'
            }
        },
    ]
}

export { intelligent };