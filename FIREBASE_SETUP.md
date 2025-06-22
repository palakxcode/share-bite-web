# Firebase Setup Guide for ShareBite

## 1. Firebase Console Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project (or create a new one)
3. In the left sidebar, click on "Firestore Database"
4. Click "Create database"
5. Choose "Start in test mode" for development (we'll update security rules later)
6. Select a location closest to your users

## 2. Security Rules Configuration

After creating the database, go to the "Rules" tab and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read access to all food items
    match /foodItems/{document} {
      allow read: if true;
      allow write: if true; // For development - change this later
    }
    
    // Allow read/write access to user profiles (if you add them later)
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

**Important**: These rules allow full access for development. For production, you should implement proper authentication and authorization.

## 3. Collection Setup

The app will automatically create the `foodItems` collection when you add the first food item. However, you can manually create it:

1. In Firestore Database, click "Start collection"
2. Collection ID: `foodItems`
3. Document ID: Auto-ID
4. Add a test document with these fields:
   - `name` (string): "Test Food"
   - `description` (string): "Test description"
   - `location` (string): "Test Location"
   - `dietary` (string): "Vegetarian"
   - `freshness` (string): "Fresh"
   - `status` (string): "available"
   - `datePosted` (timestamp): Current time

## 4. Troubleshooting Common Issues

### "Failed to load food" Error

This usually means one of these issues:

1. **Security Rules**: Make sure your Firestore security rules allow read access
2. **Collection doesn't exist**: The `foodItems` collection needs to exist
3. **Network issues**: Check your internet connection
4. **Firebase config**: Verify your Firebase config in `src/firebase/config.js`

### Check Firebase Connection

Open your browser's developer console (F12) and look for:
- Firebase connection logs
- Error messages with specific error codes
- Network requests to Firebase

### Common Error Codes

- `permission-denied`: Security rules are blocking access
- `unavailable`: Firebase service is down or network issue
- `not-found`: Collection or document doesn't exist
- `invalid-argument`: Wrong data format

## 5. Testing the Connection

1. Start your React app: `npm start`
2. Open browser console (F12)
3. Navigate to the user dashboard
4. Look for console logs showing Firebase connection attempts
5. If you see "Fetching food items from Firebase..." but no data, the collection is empty

## 6. Adding Sample Data

Use the "Add Sample Data" button in the admin dashboard, or manually add documents to the `foodItems` collection with this structure:

```javascript
{
  name: "Fresh Bread",
  description: "Homemade whole wheat bread",
  location: "Downtown Bakery",
  dietary: "Vegetarian",
  freshness: "Fresh",
  status: "available",
  datePosted: [timestamp],
  latitude: 40.7128,
  longitude: -74.0060
}
```

## 7. Production Security Rules

For production, update your security rules to:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /foodItems/{document} {
      allow read: if true; // Anyone can read food items
      allow create: if request.auth != null; // Only authenticated users can create
      allow update, delete: if request.auth != null && 
        (resource.data.createdBy == request.auth.uid || 
         request.auth.token.admin == true); // Only creator or admin can modify
    }
  }
}
```

## 8. Environment Variables (Optional)

For better security, move your Firebase config to environment variables:

1. Create a `.env` file in your project root:
```
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_auth_domain
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_storage_bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

2. Update `src/firebase/config.js`:
```javascript
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};
```

## 9. Next Steps

1. Set up Firebase Authentication for user login/signup
2. Add image upload functionality with Firebase Storage
3. Implement real-time updates with Firestore listeners
4. Add user profiles and food item ownership
5. Set up proper security rules for production

## Support

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your Firebase project settings
3. Ensure your Firebase config matches your project
4. Test with the sample data button in the admin dashboard 