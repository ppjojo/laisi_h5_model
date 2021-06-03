import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
 
export const constantRoutes = [

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

	// 404 page must be placed at the end !!!
	// {
	// 	path: '*',
	// 	redirect: '/404',
	// 	hidden: true
	// }
]

const createRouter = () => new Router({
	// mode: 'history', // require service support
	scrollBehavior: () => ({
		y: 0
	}),
	routes: constantRoutes
})

const router = createRouter()



export default router
