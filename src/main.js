import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

createApp(App).use(router).mount('#app')


document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('submit').addEventListener('click', function () {
        let fieldValue = document.getElementById('fieldValues').value;
        let value = document.getElementById('value').value;
        console.log(fieldValue);
        firebase.firestore().collection('buildings').where(fieldValue, "==", value).get().then(function (result) {
            result.forEach(function (d) {
                let dom = document.createElement('p');
                document.body.appendChild(dom);
                dom.innerHTML = JSON.stringify(d.data(), null, '<br>&nbsp;');
            })
        })
    })


    console.log(Math.random());
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.firestore().doc('/foo/bar').get().then(() => { });
    // firebase.functions().httpsCallable('yourFunction')().then(() => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    // firebase.analytics(); // call to activate
    // firebase.analytics().logEvent('tutorial_completed');
    // firebase.performance(); // call to activate
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    firebase.firestore().collection('buildings').where("currentName", "==", "鲁迅墓").get().then(function (result) {
        result.forEach((d) => {
            d.data().designations[0].get().then((doc) => {
                console.log("sub", doc.data());
            })
            console.log(d.data());
        })
    });
    // 需要一个ID，也许需要用google sheet里面的
    // 接下来要看的
    // 3. security rules ()
    // 4. auth
    // 5. elastic search
    // 6. timestamp, 最后一次edit的user 
    // 7. user list

    // 1. year
    // 2. designation
    // 


    // SDK code of Firebase
    try {
        let app = firebase.app();
        let features = [
            'auth',
            'database',
            'firestore',
            'functions',
            'messaging',
            'storage',
            'analytics',
            'remoteConfig',
            'performance',
        ].filter(feature => typeof app[feature] === 'function');
        console.log(`Firebase SDK loaded with ${features.join(', ')}`);
    } catch (e) {
        console.error(e);
    }
});