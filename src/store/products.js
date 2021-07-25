import { makeRequest } from "@/api/server";

export default {
    namespaced: true,
	state: {
        items: []
	},
	getters: {
        all: (state) => state.items,
        itemsMap(state) {
            let map = {};
            state.items.forEach((p, i) => { map[p.id.toString()] = i; });
            
            return map;
        },
        isExistent: (state) => (id) => state.items.some(p => p.id.toString() === id.toString()),
        getTotalPrice(state) {
			return function(products) {
                let total = 0;
                let allProducts = state.items;
                
                for (let i = 0; i < products.length; i++) {
                    let id = products[i].id;

                    for (let j = 0; j < allProducts.length; j++) {
                        if (allProducts[j].id === id) {
                            if (products[i].cnt === undefined)
                                total += allProducts[j].price * 1;
                            else 
                                total += allProducts[j].price * products[i].cnt;
                        }
                    }
                }

                return total;
			}
		},
        findProductById: (state) => (id) => state.items.find(p => p.id.toString() === id.toString()),
        getDetailedProducts (state) {
            return function (products) {
                let detailed = [];
                let allProducts = state.items;

                for (let i = 0; i < products.length; i++) {
                    let id = products[i].id;
                    let prod = allProducts.find(p => p.id === id);
                    if (prod !== undefined) detailed.push(prod);
                }

                return detailed;
            }
        }
	},
	mutations: {
        setItems(state, items) {
            state.items = items;
        }
	},
	actions: {
        async load(store) {
            let items = await makeRequest('/products/all.php');
            console.log(items);
            store.commit('setItems', items);
        }
	}
};  

function getProducts() {
    return [
        {"id":100,"title":"Ipnone 200","price":12000,"rest":10},
        {"id":101,"title":"Samsung AAZ8","price":22000,"rest":5},
        {"id":103,"title":"Nokia 3310","price":5000,"rest":2},
        {"id":105,"title":"Huawei ZZ","price":15000,"rest":8}
    ];
}