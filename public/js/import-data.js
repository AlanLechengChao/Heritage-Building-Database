class Buildings {
    constructor(currentName,englishName,address) {
        this.address = address;
        this.currentName = currentName;
        this.englishName = englishName;
        this.coordinates = [NaN, NaN];
        this.designation = [];
    }
}





document.addEventListener('DOMContentLoaded', function () {
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
    // 1. 如何批量导入数据
    // 2. github/collaboration deploy
    // 3. security rules ()
    // 4. auth
    // 5. elastic search
    // 6. timestamp
    firebase.firestore().collection('buildings').add({
        address: "国和路346号",
        currentName: "江湾体育场",
        englishName: "Jiangwan Stadium",
        coordinates: [NaN, NaN],
        designation: []
    }).then(function() {
        console.log("successly written");
    })

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