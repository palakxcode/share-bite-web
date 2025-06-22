import { db } from './config';
import { collection, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';

export const testFirebaseConnection = async () => {
  console.log('Testing Firebase connection...');
  
  try {
    // Test 1: Check if we can access the database
    console.log('1. Testing database access...');
    const testCollection = collection(db, 'test');
    console.log('✓ Database access successful');
    
    // Test 2: Try to read from foodItems collection
    console.log('2. Testing foodItems collection read...');
    const foodCollection = collection(db, 'foodItems');
    const foodSnapshot = await getDocs(foodCollection);
    console.log(`✓ FoodItems collection read successful. Found ${foodSnapshot.size} documents.`);
    
    // Test 3: Try to write a test document
    console.log('3. Testing write access...');
    const testDoc = await addDoc(collection(db, 'test'), {
      message: 'Firebase connection test',
      timestamp: serverTimestamp()
    });
    console.log(`✓ Write access successful. Document ID: ${testDoc.id}`);
    
    console.log('🎉 All Firebase tests passed!');
    return {
      success: true,
      message: 'Firebase connection is working properly',
      foodItemsCount: foodSnapshot.size
    };
    
  } catch (error) {
    console.error('❌ Firebase test failed:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    let errorMessage = 'Unknown error';
    
    switch (error.code) {
      case 'permission-denied':
        errorMessage = 'Permission denied. Check Firebase security rules.';
        break;
      case 'unavailable':
        errorMessage = 'Firebase service unavailable. Check internet connection.';
        break;
      case 'not-found':
        errorMessage = 'Collection not found. Check if Firestore is properly set up.';
        break;
      case 'invalid-argument':
        errorMessage = 'Invalid configuration. Check Firebase config.';
        break;
      default:
        errorMessage = `Firebase error: ${error.message}`;
    }
    
    return {
      success: false,
      message: errorMessage,
      error: error
    };
  }
};

// Function to run the test from browser console
window.testFirebase = testFirebaseConnection; 