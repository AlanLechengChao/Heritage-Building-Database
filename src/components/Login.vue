<template>
    <section id="firebaseui-auth-container"></section>
</template>

<script>

export default {
    name: "Login",
    data() {
        return {};
    },
    mounted() {
        let ui = firebaseui.auth.AuthUI.getInstance();
        if (!ui) {
            ui = new firebaseui.auth.AuthUI(firebase.auth());
        }
        var uiConfig = {
            signInSuccessUrl: "/", // This redirect can be achived by route using callback.
            signInFlow: "popup",
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.EmailAuthProvider.PROVIDER_ID
            ]
        };
        ui.start("#firebaseui-auth-container", uiConfig);
    }
};
</script>