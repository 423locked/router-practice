import { createRouter, createWebHistory } from 'vue-router'

import Cart from '@/views/Cart';

import ProductsList from '@/views/ProductsList'
import ProductBase from '@/views/product/ProductBase'
import Product from '@/views/product/Product'
import ProductError from '@/views/product/ProductError'

import Checkout from '@/views/checkout/Base'
import CheckoutStep1 from '@/views/checkout/Step1'
import CheckoutStep2 from '@/views/checkout/Step2'

import Error404 from '@/views/E404'



let routes = [
    {
        name: 'products',
        path: '/',
        component: ProductsList
    },
    {
        name: 'cart',
        path: '/cart',
        component: Cart
    },
    {
        name: 'checkout',
        path: '/checkout',
        component: Checkout,
        children: [
            {
                path: '',
                component: CheckoutStep1
            },
            {
                path: 'step-2',
                component: CheckoutStep2
            }
        ]
    },
    {
        name: 'exactproduct',
        path: '/product/:id',
        component: ProductBase
    },
    {
        name: '404global',
        path: '/:pathMatch(.*)*',
        component: Error404
    }
];

export default createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
});