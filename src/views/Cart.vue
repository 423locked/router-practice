<template>
	<div>
		<h1>Cart Component</h1>
		<div v-if="isEmpty" class="alert alert-danger">
			<h2>There are no products currently</h2>	
		</div>
		<div v-else>
			<edit-cart></edit-cart>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import EditCart from '@/views/EditCart'

	export default {
		components: {
			EditCart
		},
		data: () => ({
			
		}),
		computed: {
			...mapGetters('cart', { cartProducts: 'all' }),
			isEmpty() { return this.cartProducts.length === 0; }
		},
		mounted() {
			console.log(this.$route);
		}
	}
</script>