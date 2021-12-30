import {
    createApp
} from 'vue'
import router from './router'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import {
    library
} from '@fortawesome/fontawesome-svg-core'
import {
    fas
} from '@fortawesome/free-solid-svg-icons';
import {
    fab
} from '@fortawesome/free-brands-svg-icons';
import {
    FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
    dom
} from '@fortawesome/fontawesome-svg-core'


library.add(fas, fab)
dom.watch()

const app = createApp(App).component('font-awesome-icon', FontAwesomeIcon)
app.use(router)
    .use(ElementPlus, {
        locale: zhCn,
    })
    .mount('#app')