export const environment = {
  production: true,
  firebase: {
    // TODO: Configure Firebase project in Firebase Console (https://console.firebase.google.com)
    // TODO: Enable Google Sign-In: Auth → Sign-in method → Google
    // TODO: Enable Facebook Login: Auth → Sign-in method → Facebook
    // TODO: Create authorized domains in Auth → Settings → Authorized domains
    // TODO: Create Firestore database: Firestore Database → Create database
    // TODO: Set Firestore rules to allow authenticated users
    apiKey: 'AIzaSyAKZfnA6-t9wMLB1LGgh9FrFmABApDX3Sw', // This is specific to your registered app and needs to be retrieved from the Firebase console.
    authDomain: 'the-haircraft.firebaseapp.com',
    projectId: 'the-haircraft',
    storageBucket: 'the-haircraft.appspot.com',
    messagingSenderId: '360134247068',
    appId: '1:360134247068:web:c30ff714c88b2a5898e359', // This is specific to your registered app and needs to be retrieved from the Firebase console.
    measurementId: 'G-XXXXXXXXXX' // This is present if Google Analytics is enabled for your app.
  },
  razorpayKey: 'rzp_test_thehaircraft'
};
