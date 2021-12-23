import Layout from '@/layout'
var videoCourse = {
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
}

export { videoCourse };