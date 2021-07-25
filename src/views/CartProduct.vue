<template>
	<h1>ID: {{ id }}</h1>
	<h2>Title: {{ title }}</h2>
	<h2>Amount: {{ cnt }} / Available: {{ rest }} </h2>
	<h2>Price: {{ price }}</h2>
	<h2>Total price for {{ cnt }} products: {{ total }}</h2>
	<div class="some">
		<div>
			<button class="btn btn-warning" @click="Decrease(id)">-1</button>
			<button class="btn btn-success" @click="Increase(id)">+1</button>
		</div>
		<div>
			<button class="btn btn-danger" @click="Remove(id)">Remove</button>
		</div>
	</div>
</template>
<script>
	import { mapActions } from 'vuex'

	export default {
		props: ['id', 'title', 'price', 'rest', 'cnt'],
		data: () => ({

		}),
		computed: {
			total() {  return this.price * this.cnt; },
		},
		methods: {
			...mapActions('cart', { Increase: 'Increase', Decrease: 'Decrease', SetCount: 'SetCount', Remove: 'Remove'})
		}
	}
</script>
<style>
	.some {
		display: flex; 
		flex-direction: row; 
		justify-content: space-around;
		margin: 30px 0 -25px 0;
	}
</style>