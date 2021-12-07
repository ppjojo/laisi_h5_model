import Layout from '@/layout'
var pointLottery = {
    path: 'pointLottery',
    permission: 'operate:pointLottery',
    hidden: true,
    redirect: '/operate/pointLottery/awardSet',
    component: () =>
        import ('@/views/operate/pointLottery/pointLotteryIndex'),
    meta: {
        title: '逗币活动',
        icon: 'operate_pointLottery'
    },
    children: [

        {
            path: 'coinsReport',
            permission: 'operate:pointLottery:coinsReport',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/coinsReport'),
            meta: {
                title: '逗币领取统计',
                icon: 'operate_coinsReport'
            }
        },
        {
            path: 'awardSet',
            permission: 'operate:pointLottery:awardSet',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/awardSet'),
            meta: {
                title: '商品设置',
                icon: 'operate_awardSet'
            }
        },
        {
            path: 'exchangeSet',
            permission: 'operate:pointLottery:exchangeSet',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/exchangeSet'),
            meta: {
                title: '兑换商品设置',
                icon: 'operate_exchangeSet'
            }
        },
        {
            path: 'userCoins',
            permission: 'operate:pointLottery:userCoins',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/userCoins'),
            meta: {
                title: '逗币查询',
                icon: 'operate_userCoins'
            }
        },
        {
            path: 'awardPool',
            permission: 'operate:pointLottery:awardPool',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/awardPool'),
            meta: {
                title: '奖池设置',
                icon: 'operate_awardPool'
            }
        },
        {
            path: 'blindboxSet',
            permission: 'operate:pointLottery:blindboxSet',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/blindboxSet'),
            meta: {
                title: '盲盒设置',
                icon: 'operate_blindboxSet'
            }
        },
        {
            path: 'orderManage',
            permission: 'operate:pointLottery:orderManage',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/orderManage'),
            meta: {
                title: '订单管理',
                icon: 'operate_orderManage'
            }
        },
        {
            path: 'redbagManage',
            permission: 'operate:pointLottery:redbagManage',
            hidden: true,
            component: () =>
                import ('@/views/operate/pointLottery/redbagManage'),
            meta: {
                title: '红包打款',
                icon: 'operate_redbagManage'
            }
        },

    ]
}

export { pointLottery };