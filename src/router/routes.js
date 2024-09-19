import { requireAuth, redirectIfAuthenticated } from 'boot/authGuard';

const routes = [{
        path: '/',
        component: () =>
            import ('layouts/MainLayout.vue'),
        beforeEnter: requireAuth, // Apply the route guard
        children: [{
            path: '',
            component: () =>
                import ('pages/Index.vue')
        }]
    },
    {
        path: '/history',
        component: () =>
            import ('layouts/MainLayout.vue'),
        beforeEnter: requireAuth, // Apply the route guard
        children: [{
            path: '',
            component: () =>
                import ('pages/History.vue')
        }]
    },
    {
        path: '/login',
        beforeEnter: redirectIfAuthenticated,
        component: () =>
            import ('layouts/AuthLayout.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/Login.vue')
        }]
    },
    {
        path: '/register',
        beforeEnter: redirectIfAuthenticated,
        component: () =>
            import ('layouts/AuthLayout.vue'),
        children: [{
            path: '',
            component: () =>
                import ('pages/Register.vue')
        }]
    },
    {
        path: '*',
        component: () =>
            import ('pages/Error404.vue')
    }
]

export default routes;