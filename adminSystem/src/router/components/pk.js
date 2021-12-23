import Layout from '@/layout'
var pk = {
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
}

export { pk };