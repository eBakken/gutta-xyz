import Vue from 'vue'
import App from './App.vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import GmapCluster from 'vue2-google-maps/dist/components/cluster'

Vue.config.productionTip = false
Vue.component('GmapCluster', GmapCluster)
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.GOOGLE_MAPS_KEY,
    libraries: 'places',
  }
})

new Vue({
  render: h => h(App),
}).$mount('#app')
