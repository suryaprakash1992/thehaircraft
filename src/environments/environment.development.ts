export const environment = {
  production: false,
  firebase: {
    // TODO: Configure Firebase project in Firebase Console (https://console.firebase.google.com)
    // TODO: Enable Google Sign-In: Auth → Sign-in method → Google (get OAuth client ID)
    // TODO: Enable Facebook Login: Auth → Sign-in method → Facebook (get App ID and App Secret)
    // TODO: Add localhost to Firebase authorized domains
    // TODO: Create Firestore database with development rules
    // TODO: Firestore Rules:
    // rules_version = '2';
    // service cloud.firestore {
    //   match /databases/{database}/documents {
    //     match /users/{userId} {
    //       allow write: if request.auth.uid == userId;
    //       allow read: if request.auth.uid == userId;
    //     }
    //   }
    // }
    apiKey: 'YOUR_FIREBASE_API_KEY',
    authDomain: 'your-project.firebaseapp.com',
    projectId: 'your-project-id',
    storageBucket: 'your-project.appspot.com',
    messagingSenderId: '1234567890',
    appId: '1:1234567890:web:abcdef123456',
    measurementId: 'G-XXXXXXXXXX'
  },
  razorpayKey: 'rzp_test_thehaircraft'
};
