import Layout from '@/layout'
var summerCamp = {
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
}

export { summerCamp };