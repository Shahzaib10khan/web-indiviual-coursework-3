import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap';
import './assets/style.css';

new Vue({
  render: h => h(App),
}).$mount('#app')