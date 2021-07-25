<template>
	<div>
		<div class="alert alert-success">
			<h1>{{ product["title"] }}</h1>
			<router-link :to="{ name: 'products' }">Back to products</router-link>
			<hr>
			<h2>Price: {{ product["price"] }}</h2>
				id = {{ id }}
 		</div>
	</div>
</template>

<script>
    import { mapGetters } from 'vuex'


	export default {
		data: () => ({
			id: 0,
            product: {}
		}),
        computed: {
            ...mapGetters('cart', { currentProduct: 'product' })
        },
		mounted() {
			console.log(this.$route);
			this.id = this.$route['params'].id;
            this.product = this.currentProduct(this.id);
		}
	}
</script>