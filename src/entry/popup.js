import { createApp } from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import ElementPlus from 'element-plus'
import App from '../view/popup.vue'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(VueAxios, axios)
app.use(ElementPlus)
app.mount('#app')
