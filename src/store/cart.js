import { makeRequest } from "@/api/server";
import store from ".";

export default {
	namespaced: true,
	state: {
		products: [],
		token: null
	},
	getters: {
		all: (state) => state.products,
		length: (state) => state.products.filter(p => p.count > 0 || p.count === undefined).length,
		total: (state, getters, rootState, rootGetters) => (products) => rootGetters['products/getTotalPrice'](products),
		has: (state) => (id) => state.products.some(p => p.id.toString() === id.toString()),
		item: (state, getters, rootState, rootGetters) => (id) => rootGetters['products/getTotalPrice'](products),
		product: (state, getters, rootState, rootGetters) => (id) => rootGetters['products/findProductById'](id),
		detailedList: (state, getters, rootState, rootGetters) => (products) => rootGetters['products/getDetailedProducts'](products),
		cartProduct: (state) => (id) => state.products.find(p => p.id.toString() === id.toString())
	},
	mutations: {
		add(state, id) {
			state.products.push({ id: id, cnt: 1 });
		},
		remove(state, id) {
			state.products = state.products.filter(p => p.id !== id);
		},
		setCount(state, data) {
			state.products.find(p => p.id === data.id).cnt = data.count;
		},
		setCart(state, { token, cart }) {
			state.token = token;
			state.products = cart;
			console.log(cart);
		}
	},
	actions: {
		async Add({ state, getters, commit }, id) {
			if (!getters.has(id)) {
				let url = `/cart/add.php?token=${state.token}&id=${id}`;
				let res = await makeRequest(url);
				if (res) {
					commit('add', id);
				}
			}
		},
		async Remove({ state, getters, commit }, id) {
			if (getters.has(id)) {
				let url = `/cart/remove.php?token=${state.token}&id=${id}`;
				let res = await makeRequest(url);
				if (res) {
					commit('remove', id);
				}
			}
		},
		async Increase({ state, getters, commit }, id) {
			if (getters.has(id)) {
				console.log("CALLED");
				let product = getters.product(id);
				let cartProduct = getters.cartProduct(id);

				if (cartProduct.cnt + 1 <= product['rest']) {
					let changeurl = `/cart/change.php?token=${state.token}&id=${id}&cnt=${cartProduct.cnt + 1}`;
					let res = await makeRequest(changeurl);
					if (res)
						commit('setCount', { id: id, count: cartProduct.cnt + 1 });
					
						this.dispatch('cart/load');
				}
			}
		},
		async Decrease({ state, getters, commit }, id) {
			if (getters.has(id)) {
				let product = getters.product(id);
				let cartProduct = getters.cartProduct(id);

				if (cartProduct.cnt - 1 >= 1) {
					let changeurl = `/cart/change.php?token=${state.token}&id=${id}&cnt=${cartProduct.cnt - 1}`;
					let res = await makeRequest(changeurl);
					if (res)
						commit('setCount', { id: id, count: cartProduct.cnt - 1 });
					this.dispatch('cart/load');
				}
			}
		},
		SetCount(store, id, count) {
			if (store.getters.has(id)) {
				let product = store.getters.product(id);

				if (product['rest'] > count && count >= 0)
					store.commit('setCount', { id: id, count: count });
			}
		},
		async load(store) {
			let oldToken = localStorage.getItem('CART_TOKEN');
			let { needUpdate, token, cart } = await makeRequest(`/cart/load.php?token=${oldToken}`);

			if (needUpdate)
				localStorage.setItem('CART_TOKEN', token);

			console.log(store.getters.all);
			console.log(`TOKEN = ${token}`);

			store.commit('setCart', { cart, token });
		}
	}
};
