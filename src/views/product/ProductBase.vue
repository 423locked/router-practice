<template>
	<div>
		<product v-if="isIdValid(this.id)"></product>
		<product-error v-else></product-error>
	</div>
</template>

<script>
	import Product from './Product'
	import ProductError from './ProductError'
	import { mapGetters } from 'vuex'

	export default {
		components: {
			Product,
			ProductError
		},
		data: () => ({
			id: 0
		}),
		computed: {
			...mapGetters('products', { isIdValid : 'isExistent'})
		},
		created() {
			console.log(this.$route);
			this.id = this.$route['params'].id;
			console.log(this.id);
		}
	}
</script>