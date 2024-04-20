import { createRouter, createWebHistory } from 'vue-router'
import {useAuthStore} from "@/stores/auth";
import {lang} from "@/locales/messages";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/auth',
            component: () => import('@/layouts/Auth.vue'),
            meta: {
                requiresAuth: false
            },
            children: [
                {
                    name: 'SignIn',
                    path: 'login',
                    meta: {
                        title: lang('SignIn')
                    },
                    component: () => import('@/views/authentication/Login.vue')
                }]
        },
        {
            path: '/',
            meta: {
                requiresAuth: true
            },
            component: () => import('@/layouts/Default.vue'),
            children: [
                {
                    path: '/',
                    name: 'Orders',
                    component: () => import('../views/orders/List.vue')
                },
                {
                    path: '/orders/create',
                    name: 'OrdersCreate',
                    component: () => import('../views/orders/Create.vue')
                },
                {
                    path: '/orders/:id',
                    name: 'OrdersView',
                    component: () => import('../views/orders/View.vue')
                },
                {
                    path: '/orders/edit/:id',
                    name: 'OrdersEdit',
                    component: () => import('../views/orders/Edit.vue')
                },
                {
                    path: '/orders/invoice/:id',
                    name: 'OrdersInvoice',
                    component: () => import('../views/orders/Invoice.vue')
                }
            ]
        }
    ]
})

router.beforeEach(async (to, from, next) => {
    // redirect to login page if not logged in and trying to access a restricted page
    const publicPages = ['/auth/login'];
    const authRequired = !publicPages.includes(to.path);
    const auth: any = useAuthStore();

    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (authRequired && !auth.token) {
            auth.returnUrl = to.fullPath;
            return next({name: 'SignIn'});
        } else next();
    } else {
        next();
    }
});
export default router
