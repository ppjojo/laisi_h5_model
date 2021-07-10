import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const routes = [

	{
		path: '/',
		component: () => import('@/views/index'),
		redirect: '/index',
		meta:{
			color:"#fff"
		}

	},
	{
		path: '/index',
		component: () => import('@/views/index'),
		meta:{
			color:"#fff"
		}

	},
	{
		path: '/outdoorSport',
		component: () => import('@/views/outdoorSport'),
		meta:{
			color:"#fff"
		}
	},
	{
		path: '/smartWear',
		component: () => import('@/views/smartWear'),
		meta:{
			color:"#000"
		}
	},
	{
		path: '/paiactive',
		component: () => import('@/views/paiactive'),
		meta:{
			color:"#fff"
		}
	},
	{
		path: '/joinUs',
		component: () => import('@/views/joinUs'),
		meta:{
			color:"#fff"
		}
	},
	{
		path: '/aboutus',
		component: () => import('@/views/aboutus'),
		meta:{
			color:"#000"
		}
	},
	{
		path: '/newsList',
		component: () => import('@/views/newsList'),
		meta:{
			color:"#000"
		}
	},
	{
		path: '/productDetail',
		component: () => import('@/views/productDetail'),
		meta:{
			color:"#fff"
		}
	},
	{
		path: '/solution',
		component: () => import('@/views/solution'),
	}, 
	{
		path: '/business',
		component: () => import('@/views/business'),
		meta:{
			color:"#fff"
		}
	},
	{
		path: '/privacy',
		component: () => import('@/views/privacy'),
		meta:{
			color:"#000"
		}
	},
	{
		path: '/permission',
		component: () => import('@/views/permission'),
		meta:{
			color:"#000"
		}
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