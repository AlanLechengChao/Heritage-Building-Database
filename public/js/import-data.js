document.addEventListener('DOMContentLoaded', function () {
    
    // document.getElementById("setDesignation").addEventListener("click", function(){
    //     designations.forEach(function (d) {
    //         firebase.firestore().collection('designations').doc(`${d.year}-${d.level}-${d.type}`).set(d).then(function() {
    //             console.log(d.designation + " set");
    //         })
    //     })
    // })

    // document.getElementById("reader").addEventListener('change', function (event) {
    //     var reader = new FileReader(); // File reader to read the file 

    //     // This event listener will happen when the reader has read the file
    //     reader.addEventListener('load', function () {
    //         var result = JSON.parse(reader.result); // Parse the result into an object 
    //         console.log(result);
    //         result.forEach(function(building) {
    //             firebase.firestore().collection('buildings').add(building).then(function() {
    //                 console.log("set");
    //             });
    //         })
    //     });

    //     reader.readAsText(event.target.files[0]);
        
    // })
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
                console.log("sub",doc.data());
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