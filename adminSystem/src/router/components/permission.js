import Layout from '@/layout'
var permission = {
    path: '/permission',
    component: Layout,
    redirect: '/permission/user',
    permission: 'permission',
    hidden: true,
    meta: {
        title: '权限管理',
        icon: 'menu_permission'
    },
    children: [{
            path: 'user',
            permission: 'permission:user',
            hidden: true,
            component: () =>
                import ('@/views/permission/user'),
            meta: {
                title: '用户管理',
                icon: 'permission_user'
            }
        },
        {
            path: 'department',
            permission: 'permission:department',
            hidden: true,
            component: () =>
                import ('@/views/permission/department'),
            meta: {
                title: '部门管理',
                icon: 'permission_department'
            }
        },
        {
            path: 'role',
            permission: 'permission:role',
            hidden: true,
            component: () =>
                import ('@/views/permission/role'),
            meta: {
                title: '角色管理',
                icon: 'permission_role'
            }
        },
        {
            path: 'menu',
            permission: 'permission:menu',
            hidden: true,
            component: () =>
                import ('@/views/permission/menu'),
            meta: {
                title: '菜单管理',
                icon: 'permission_menu',
            }
        }
    ]
}
export { permission };