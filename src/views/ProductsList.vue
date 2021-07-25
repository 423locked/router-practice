<template>
	<div>
		<h1>Products Component</h1>
		<div class="row">
			<div class="col col-sm-4 mb-3 mt-3"
				v-for="product in products"
				:key="product.id"
			>
				<div class="card">
					<div class="card-body">
						<h3>{{ product.title }}</h3>
						<div>{{ product.price }}</div>
						<br>
						<router-link :to="`/product/${product.id}`">Details</router-link>
						<hr>
						<button v-if="!inCart(product.id)" type="button" class="btn btn-success" @click="addToCart(product.id)">Add to Cart</button>
						<button v-else type="button" class="btn btn-danger" @click="removeFromCart(product.id)">Remove</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from 'vuex'

	export default {
		computed: {
			...mapGetters('products', { products : 'all' }),
			...mapGetters('cart', { inCart: 'has' })
		},
		methods: {
			...mapActions('cart', { addToCart: 'Add', removeFromCart: 'Remove' })
		}
	}
</script>

<style>
	.row{
		padding-left: 15px;
	}
</style>