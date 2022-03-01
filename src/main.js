import { createApp } from 'vue'

/* Element Plus UI kit */ 
import ElementPlus from 'element-plus'
//import 'element-plus/lib/theme-chalk/index.css'
import './theme/index.css'

import App from './App.vue'
import router from './router'

import * as L from 'leaflet'

let app = createApp(App)



export const OverpassFrontend = require('overpass-frontend');

export const overpassFrontend = new OverpassFrontend('//overpass-api.de/api/interpreter');

// request restaurants in the specified bounding box


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



 
// var allBuildings = db.collection('buildings');
// allBuildings.get().then(query => {
//     query.forEach(element => {
//         let data = element.data();
//         let id = element.id;
//         if (typeof data.year == 'object') {
//             let u = data.year.join('\n');
//             db.collection('buildings').doc(id).update({
//                 year: u
//             }).then(() => console.log(u));
//         }
        
//     });
// })





// 接下来要看的
// 3. security rules ()
// 4. auth
// 5. elastic search // .where('', 'contains', '')
// 6. 最后一次edit的user 
// 7. user list



