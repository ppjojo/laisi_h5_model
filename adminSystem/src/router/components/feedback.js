import Layout from '@/layout'
var feedback = {
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
}

export { feedback };