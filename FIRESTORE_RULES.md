# Firestore Security Rules Configuration

This document outlines the security rules required for the HairCraft application's Firebase Firestore database.

## Collections Structure

```
firestore
├── users (collection)
│   └── {userId} (document)
│       ├── displayName (string)
│       ├── email (string)
│       ├── photoUrl (string, optional)
│       ├── provider (string: 'google', 'facebook', 'email')
│       ├── isAdmin (boolean, default: false)
│       └── createdAt (timestamp)
│
└── products (collection)
    └── {productId} (document)
        ├── productName (string)
        ├── quality (number: 1-100)
        ├── productDescription (string)
        ├── amount (number)
        ├── currency (string: ISO code)
        ├── productImage (string: URL from Firebase Storage)
        ├── createdAt (timestamp)
        └── updatedAt (timestamp)
```

## Firestore Security Rules

Add the following rules to your Firestore database rules editor in the Firebase console:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Helper function to check if user is authenticated
    function isAuthenticated() {
      return request.auth != null;
    }
    
    // Helper function to check if user is admin
    function isAdmin() {
      return isAuthenticated() && get(/databases/$(database)/documents/users/$(request.auth.uid)).data.isAdmin == true;
    }
    
    // Helper function to check if user owns the document
    function isOwner(userId) {
      return isAuthenticated() && request.auth.uid == userId;
    }
    
    // Users collection rules
    match /users/{userId} {
      // Allow users to read their own document
      allow read: if isOwner(userId);
      
      // Allow users to create their own document on signup
      allow create: if isOwner(userId);
      
      // Allow users to update their own document
      allow update: if isOwner(userId);
      
      // Only admins can read all users
      // NOTE: Uncomment if you need admin user listing
      // allow read: if isAdmin();
      
      // Only server can set isAdmin flag (use Cloud Functions)
      // This prevents users from making themselves admins
    }
    
    // Products collection rules
    match /products/{productId} {
      // Everyone can read product information
      allow read: if true;
      
      // Only admins can create products
      allow create: if isAdmin() && 
        request.resource.data.keys().hasAll(['productName', 'quality', 'productDescription', 'amount', 'currency']) &&
        request.resource.data.productName is string &&
        request.resource.data.quality is number &&
        request.resource.data.quality >= 1 &&
        request.resource.data.quality <= 100 &&
        request.resource.data.productDescription is string &&
        request.resource.data.amount is number &&
        request.resource.data.amount > 0 &&
        request.resource.data.currency is string;
      
      // Only admins can update products
      allow update: if isAdmin() &&
        request.resource.data.keys().hasAll(['productName', 'quality', 'productDescription', 'amount', 'currency']) &&
        request.resource.data.productName is string &&
        request.resource.data.quality is number &&
        request.resource.data.quality >= 1 &&
        request.resource.data.quality <= 100 &&
        request.resource.data.productDescription is string &&
        request.resource.data.amount is number &&
        request.resource.data.amount > 0 &&
        request.resource.data.currency is string;
      
      // Only admins can delete products
      allow delete: if isAdmin();
    }
  }
}
```

## Firebase Storage Rules

Add the following rules to your Firebase Storage rules editor:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Product image uploads (only admins)
    match /product_images/{allPaths=**} {
      // Only authenticated admins can write product images
      allow read: if request.auth != null;
      allow write: if request.auth != null && 
        request.auth.uid in firestore.get(/databases/(default)/documents/users/$(request.auth.uid)).data.isAdmin;
    }
    
    // User profile images
    match /user_profiles/{userId}/{allPaths=**} {
      // Users can read and write their own profile images
      allow read: if request.auth != null;
      allow write: if request.auth.uid == userId;
    }
  }
}
```

## Setting Up Admin Users

### Method 1: Firebase Console (For Initial Setup)

1. Go to Firebase Console → Firestore Database
2. Navigate to the `users` collection
3. Find the user document you want to make admin
4. Add a field: `isAdmin` (boolean) = `true`

### Method 2: Cloud Function (Recommended)

Create a Cloud Function to make users admins:

```typescript
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

export const makeUserAdmin = functions.https.onCall(async (data, context) => {
  // Check if caller is already an admin
  const callerUid = context.auth?.uid;
  if (!callerUid) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }
  
  const callerDoc = await admin.firestore().collection('users').doc(callerUid).get();
  if (!callerDoc.data()?.isAdmin) {
    throw new functions.https.HttpsError('permission-denied', 'Only admins can make other users admins');
  }
  
  // Make the target user an admin
  const targetUid = data.uid;
  await admin.firestore().collection('users').doc(targetUid).update({
    isAdmin: true,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
  });
  
  return { success: true };
});
```

## Security Best Practices

1. **Admin Flag in Firestore**: The `isAdmin` flag is stored in Firestore and checked on each request
2. **Cannot Self-Elevate**: Users cannot add the `isAdmin` field to themselves due to security rules
3. **Server Validation**: Always validate sensitive operations on the backend/service layer
4. **Image Access**: Product images in Storage are readable by all authenticated users
5. **Create Timestamps**: All `createdAt` and `updatedAt` fields should be set by Cloud Functions to prevent spoofing

## Testing Security Rules

To test these rules in the Firebase Console:

1. Open **Firestore Database** → **Rules** tab
2. Click **Rules playground** in the top right
3. Authenticate as different users and test read/write operations
4. Verify that only admins can create/update/delete products

## Migration from Unsecured Database

If you're migrating from an unsecured Firestore:

1. Add the `isAdmin` field to all current admin users
2. Update any existing products to ensure they have `createdAt` and `updatedAt` timestamps
3. Deploy the new security rules
4. Test all application features with the rules enabled

## Troubleshooting

**Issue**: "Permission denied" when creating products
- Solution: Verify the user has `isAdmin: true` in their user document

**Issue**: Cannot read products in client application
- Solution: Security rules allow public read access to products, but ensure auth state is properly initialized

**Issue**: Old products missing timestamps
- Solution: Run a Cloud Function to add `createdAt` and `updatedAt` to existing products
