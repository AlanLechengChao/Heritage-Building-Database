document.addEventListener("DOMContentLoaded", function () {
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

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      $("#username").text(uid);
    } else {
      // User is signed out
      // ...
      $("#username").text("Not logged in");
    }
  });
  // 需要一个ID，也许需要用google sheet里面的
  // 接下来要看的
  // 1. 如何批量导入数据
  // 2. github/collaboration deploy
  // 3. security rules ()
  // 4. auth
  // 5. elastic search
  // 6. timestamp
  try {
    let app = firebase.app();
    let features = [
      "auth",
      "database",
      "firestore",
      "functions",
      "messaging",
      "storage",
      "analytics",
      "remoteConfig",
      "performance",
    ].filter((feature) => typeof app[feature] === "function");
    console.log(`Firebase SDK loaded with ${features.join(", ")}`);
  } catch (e) {
    console.error(e);
  }
});


$("#submit_button").on('click', function(e){
    const email = $("#input_email").val(); 
    const password = $("#input_password").val(); 
    console.log(email); 
    console.log(password); 
    login(email, password); 
})

function login(email, password) {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Signed in
      console.log("logged in"); 
      // var user = userCredential.user;
      // ...
    })
    .catch((error) => {
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#username").text( errorMessage );
    });
}
