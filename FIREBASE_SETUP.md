# Firebase Configuration Guide

## Firestore Rules

Apply these rules in Firebase Console → Firestore Database → Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow create: if request.auth.uid == userId;
      allow read: if request.auth.uid == userId;
      allow update: if request.auth.uid == userId;
      allow delete: if false;
    }
  }
}
```

## Firebase Console Setup

### 1. Enable Google Sign-In
- Go to Firebase Console → Authentication
- Click "Sign-in method"
- Enable "Google"
- Use your project's existing Google OAuth credentials
- Add authorized domains

### 2. Enable Facebook Login
- Go to Firebase Console → Authentication
- Click "Sign-in method"
- Enable "Facebook"
- Enter Facebook App ID and App Secret (from Facebook Developers)
- Add authorized domains
- Add redirect URIs to Facebook app

### 3. Update Environment Files
- Replace Firebase config placeholders in `src/environments/environment.ts` and `src/environments/environment.development.ts`
- Get Firebase config from Project Settings in Firebase Console

### 4. Create Firestore Database
- Go to Firebase Console → Firestore Database
- Create database in native mode
- Start in production mode
- Apply the rules above

## User Document Structure

Documents in `/users/{uid}` collection:

```json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "photoUrl": "string | null",
  "provider": "email | google | facebook",
  "createdAt": "timestamp"
}
```

## Implemented Features

- ✅ Google Sign-In with popup
- ✅ Facebook Sign-In with popup
- ✅ Email/password signup
- ✅ Automatic user document creation in Firestore
- ✅ Error handling (popup closed, network, permissions)
- ✅ Loading states
- ✅ User profile data (photo, display name)
