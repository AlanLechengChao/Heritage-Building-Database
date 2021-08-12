import { createApp } from 'vue'

/* Element Plus UI kit */ 
import ElementPlus from 'element-plus'
//import 'element-plus/lib/theme-chalk/index.css'
import './theme/index.css'

import App from './App.vue'
import router from './router'

let app = createApp(App)

// define firebase firestore instance in global namespace
// app.config.globalProperties.$db = firebase.initializeApp({
//     apiKey: 'AIzaSyD2nLnhZyAEY5cLnLMkdQ2w6FLQmr3gAls',
//     projectId: 'heritage-buildings-database',
// }).firestore();

export const db = firebase.initializeApp({
    apiKey: 'AIzaSyD2nLnhZyAEY5cLnLMkdQ2w6FLQmr3gAls',
    projectId: 'heritage-buildings-database',
    authDomain: "heritage-buildings-database.web.app", 
}).firestore();

app.use(ElementPlus)

// bind the app to DOM
app.use(router).mount('#app')


// changes for the designation/list structure
// from buildings: ["adsfk", "sfwiavdf"] 
// to {
//      id: "sdfsdalwerilh", => fetch the document and display
//      listed_name:
//      listed_address:
//      other field:
//}











// 接下来要看的
// 3. security rules ()
// 4. auth
// 5. elastic search // .where('', 'contains', '')
// 6. 最后一次edit的user 
// 7. user list



