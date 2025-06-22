import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from './config';

const FOOD_COLLECTION = 'foodItems';

// Get all food items
export const getAllFoodItems = async () => {
  try {
    console.log('Fetching food items from Firebase...');
    
    // First, try to get all documents without filters to test connection
    const querySnapshot = await getDocs(collection(db, FOOD_COLLECTION));
    console.log('Raw query result:', querySnapshot);
    
    const foodItems = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      console.log('Document data:', data);
      foodItems.push({
        id: doc.id,
        ...data,
        datePosted: data.datePosted?.toDate?.() || data.datePosted
      });
    });
    
    console.log('Processed food items:', foodItems);
    return foodItems;
  } catch (error) {
    console.error('Error getting food items:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    // Provide more specific error messages
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check Firebase security rules.');
    } else if (error.code === 'unavailable') {
      throw new Error('Firebase service unavailable. Please check your internet connection.');
    } else if (error.code === 'not-found') {
      throw new Error('Collection not found. Please check if the collection exists.');
    } else {
      throw new Error(`Failed to load food items: ${error.message}`);
    }
  }
};

// Get all food items (for admin - including claimed items)
export const getAllFoodItemsForAdmin = async () => {
  try {
    console.log('Fetching all food items for admin...');
    
    const q = query(
      collection(db, FOOD_COLLECTION),
      orderBy('datePosted', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const foodItems = [];
    querySnapshot.forEach((doc) => {
      foodItems.push({
        id: doc.id,
        ...doc.data(),
        datePosted: doc.data().datePosted?.toDate?.() || doc.data().datePosted
      });
    });
    
    console.log('Admin food items:', foodItems);
    return foodItems;
  } catch (error) {
    console.error('Error getting food items for admin:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Please check Firebase security rules.');
    } else {
      throw new Error(`Failed to load food listings: ${error.message}`);
    }
  }
};

// Add new food item
export const addFoodItem = async (foodData) => {
  try {
    console.log('Adding food item:', foodData);
    
    const docRef = await addDoc(collection(db, FOOD_COLLECTION), {
      ...foodData,
      datePosted: serverTimestamp(),
      status: 'available',
      createdAt: serverTimestamp()
    });
    
    console.log('Food item added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Error adding food item:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Cannot add food items. Please check Firebase security rules.');
    } else {
      throw new Error(`Failed to add food item: ${error.message}`);
    }
  }
};

// Update food item
export const updateFoodItem = async (id, foodData) => {
  try {
    console.log('Updating food item:', id, foodData);
    
    const foodRef = doc(db, FOOD_COLLECTION, id);
    await updateDoc(foodRef, {
      ...foodData,
      updatedAt: serverTimestamp()
    });
    
    console.log('Food item updated successfully');
  } catch (error) {
    console.error('Error updating food item:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Cannot update food items. Please check Firebase security rules.');
    } else {
      throw new Error(`Failed to update food item: ${error.message}`);
    }
  }
};

// Delete food item
export const deleteFoodItem = async (id) => {
  try {
    console.log('Deleting food item:', id);
    
    const foodRef = doc(db, FOOD_COLLECTION, id);
    await deleteDoc(foodRef);
    
    console.log('Food item deleted successfully');
  } catch (error) {
    console.error('Error deleting food item:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Cannot delete food items. Please check Firebase security rules.');
    } else {
      throw new Error(`Failed to delete food item: ${error.message}`);
    }
  }
};

// Claim food item
export const claimFoodItem = async (id) => {
  try {
    console.log('Claiming food item:', id);
    
    const foodRef = doc(db, FOOD_COLLECTION, id);
    await updateDoc(foodRef, {
      status: 'claimed',
      claimedAt: serverTimestamp()
    });
    
    console.log('Food item claimed successfully');
  } catch (error) {
    console.error('Error claiming food item:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    if (error.code === 'permission-denied') {
      throw new Error('Access denied. Cannot claim food items. Please check Firebase security rules.');
    } else {
      throw new Error(`Failed to claim food item: ${error.message}`);
    }
  }
};

// Get food items by dietary preference
export const getFoodItemsByDietary = async (dietary) => {
  try {
    const q = query(
      collection(db, FOOD_COLLECTION),
      where('dietary', '==', dietary),
      where('status', '==', 'available'),
      orderBy('datePosted', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const foodItems = [];
    querySnapshot.forEach((doc) => {
      foodItems.push({
        id: doc.id,
        ...doc.data(),
        datePosted: doc.data().datePosted?.toDate?.() || doc.data().datePosted
      });
    });
    return foodItems;
  } catch (error) {
    console.error('Error getting food items by dietary:', error);
    throw error;
  }
};

// Get food items by freshness
export const getFoodItemsByFreshness = async (freshness) => {
  try {
    const q = query(
      collection(db, FOOD_COLLECTION),
      where('freshness', '==', freshness),
      where('status', '==', 'available'),
      orderBy('datePosted', 'desc')
    );
    const querySnapshot = await getDocs(q);
    const foodItems = [];
    querySnapshot.forEach((doc) => {
      foodItems.push({
        id: doc.id,
        ...doc.data(),
        datePosted: doc.data().datePosted?.toDate?.() || doc.data().datePosted
      });
    });
    return foodItems;
  } catch (error) {
    console.error('Error getting food items by freshness:', error);
    throw error;
  }
}; 