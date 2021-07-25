import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'bootstrap/dist/css/bootstrap.css'

let app = createApp(App);
app.use(store);
app.use(router);

store.dispatch('cart/load');
store.dispatch('products/load').then(() => {
    app.mount('#app');

});