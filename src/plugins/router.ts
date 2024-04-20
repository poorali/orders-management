import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
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
})
export default router
