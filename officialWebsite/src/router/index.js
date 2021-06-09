import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [

	{
		path: '/',
		component: () => import('@/views/index'),
		redirect: '/index',

	},
	{
		path: '/index',
		component: () => import('@/views/index'),

	},
	{
		path: '/outdoorSport',
		component: () => import('@/views/outdoorSport'),
	},
	{
		path: '/smartWear',
		component: () => import('@/views/smartWear'),
	},
	{
		path: '/paiactive',
		component: () => import('@/views/paiactive'),
	},
	{
		path: '/joinUs',
		component: () => import('@/views/joinUs'),
	},
	{
		path: '/aboutus',
		component: () => import('@/views/aboutus'),
	},
	{
		path: '/newsList',
		component: () => import('@/views/newsList'),
	},
	{
		path: '/productDetail',
		component: () => import('@/views/productDetail'),
	},
	{
		path: '/solution',
		component: () => import('@/views/solution'),
	}, 
	{
		path: '/business',
		component: () => import('@/views/business'),
	},





	// 404 page must be placed at the end !!!
	// {
	// 	path: '*',
	// 	redirect: '/404',
	// 	hidden: true
	// }
]

const router = new Router({
	routes: routes
})


const VueRouterPush = Router.prototype.push
Router.prototype.push = function push(to) {
	return VueRouterPush.call(this, to).catch(err => err)
}




export default router