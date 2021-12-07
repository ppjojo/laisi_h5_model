import Layout from '@/layout'
var community = {
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
            component: () =>
                import ('@/views/community/dynamicDatabase'),
            meta: {
                title: '动态统计',
                icon: 'community_dynamicDatabase'
            }
        },
        {
            path: 'dynamicM',
            permission: 'community:dynamicM',
            hidden: true,
            component: () =>
                import ('@/views/community/dynamicM'),
            meta: {
                title: '动态管理',
                icon: 'community_dynamicM'
            }
        },
        {
            path: 'topic',
            permission: 'community:topic',
            hidden: true,
            component: () =>
                import ('@/views/community/topic'),
            meta: {
                title: '热门话题',
                icon: 'community_topic'
            }
        },
        {
            path: 'talent',
            permission: 'community:talent',
            hidden: true,
            component: () =>
                import ('@/views/community/talent'),
            meta: {
                title: '达人管理',
                icon: 'community_talent'
            }
        },
        {
            path: 'report',
            permission: 'community:report',
            hidden: true,
            component: () =>
                import ('@/views/community/report'),
            meta: {
                title: '举报管理',
                icon: 'community_report'
            }
        },
        {
            path: 'asyncApproval',
            permission: 'community:asyncApproval',
            hidden: true,
            component: () =>
                import ('@/views/community/asyncApproval'),
            meta: {
                title: '社区审核',
                icon: 'community_report'
            }
        },
    ]
}
export { community };