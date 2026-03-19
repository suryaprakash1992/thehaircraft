export const environment = {
  production: true,
  firebase: {
    // TODO: Configure Firebase project in Firebase Console (https://console.firebase.google.com)
    // TODO: Enable Google Sign-In: Auth → Sign-in method → Google
    // TODO: Enable Facebook Login: Auth → Sign-in method → Facebook
    // TODO: Create authorized domains in Auth → Settings → Authorized domains
    // TODO: Create Firestore database: Firestore Database → Create database
    // TODO: Set Firestore rules to allow authenticated users
    apiKey: (window as any).__env?.apiKey || "", // This is specific to your registered app and needs to be retrieved from the Firebase console.
    authDomain: (window as any).__env?.authDomain || '',
    projectId: (window as any).__env?.projectId || '',
    storageBucket: (window as any).__env?.storageBucket || '',
    messagingSenderId: (window as any).__env?.messagingSenderId || '',
    appId: (window as any).__env?.appId || '', // This is specific to your registered app and needs to be retrieved from the Firebase console.
    measurementId: (window as any).__env?.measurementId || '' // This is present if Google Analytics is enabled for your app.
  },
  razorpayKey: ''
};
