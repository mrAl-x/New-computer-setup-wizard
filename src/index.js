import Vue from 'vue';
import VueClipboard from 'vue-clipboard2';
import App from './App.vue';

Vue.config.productionTip = false;
VueClipboard.config.autoSetContainer = true;

Vue.use(VueClipboard);

new Vue({
  el: '#app',
  render: h => h(App),
});
