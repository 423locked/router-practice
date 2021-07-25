<template>
	<div>
		<h1>Checkout component</h1>
		<router-view></router-view>
	</div>
</template>

<script>
	export default {
		mounted() {
			console.log(this.$route);
		}
	}
</script>