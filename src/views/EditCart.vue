<template>
<div class="cart-product-cover">
    <div v-for="product in detailedProducts" :key="product.id">
        <div v-if="inCart(product.id)" :class="inCart(product.id) ? 'cart-product' : ''">
            <cart-product
                :id="product.id"
                :title="product.title"
                :price="product.price"
                :rest="product.rest"
                :cnt="cartProductById(product.id).cnt"
            ></cart-product>
        </div>
    </div>    
</div>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import CartProduct from '@/views/CartProduct'

    export default {
        components: {
            CartProduct
        },
        data: () => ({
            detailedProducts: []
        }),
        computed: {
            ...mapGetters('cart', { cartProducts: 'all', detailed: 'detailedList', inCart: 'has' })
        },
        methods: {
            ...mapActions('cart', { Increase: 'Increase', Decrease: 'Decrease', SetCount: 'SetCount', Remove: 'Remove'}),
            cartProductById(id) {
                return this.cartProducts.find(p => p.id === id);
            }
        },
        mounted() {
            console.log(this.detailed(this.cartProducts));
            this.detailedProducts = this.detailed(this.cartProducts);
        }
    }  
</script>
<style>
    .cart-product-cover{ 
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
    }
    
    .cart-product {
        padding: 50px;
        margin-bottom: 30px;
        border: 1px solid black;
        border-radius: 12px;
    }
</style>