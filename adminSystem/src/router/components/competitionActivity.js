import Layout from '@/layout'
var competitionActivity = {
    path: '/competitionActivity',
    component: Layout,
    redirect: '/competitionActivity/school',
    permission: 'competitionActivity',
    hidden: true,
    meta: {
        title: '赛事活动',
        icon: 'competitionActivity'
    },
    children: [{
            path: 'jd',
            permission: 'competitionActivity:jd',
            hidden: true,
            component: () =>
                import ('@/views/competitionActivity/jd/jd'),
            meta: {
                title: '京东赛事相关',
            }
        }, {
            path: 'jingan_camp',
            permission: 'competitionActivity:jingan_camp',
            hidden: true,
            component: () =>
                import ('@/views/competitionActivity/jingan/jingan_camp'),
            meta: {
                title: '静安区冬令营',
            }
        },

        {
            path: 'school',
            permission: 'competitionActivity:school',
            hidden: true,
            component: () =>
                import ('@/views/competitionActivity/school'),
            meta: {
                title: '学校相关',
            }
        },
        {
            path: 'competition',
            permission: 'competitionActivity:competition',
            hidden: true,
            component: () =>
                import ('@/views/competitionActivity/competition'),
            meta: {
                title: '赛事相关',
            }
        },

    ]
}
export { competitionActivity };