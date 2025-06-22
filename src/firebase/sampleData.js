import { addFoodItem } from './foodService';

const sampleFoodData = [
  {
    name: "Fresh Bread & Pastries",
    organization: "Local Bakery",
    description: "Assorted fresh bread, croissants, and pastries from today's batch. Includes whole wheat bread, sourdough, chocolate croissants, and fruit danishes.",
    quantity: "20 items",
    location: "Downtown Bakery, 123 Main St, New York, NY",
    coordinates: [40.7128, -74.0060],
    freshness: "fresh",
    dietary: "vegetarian",
    allergens: ["gluten", "dairy"],
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400"
  },
  {
    name: "Organic Vegetables",
    organization: "Green Market",
    description: "Fresh organic vegetables including carrots, broccoli, spinach, kale, and bell peppers. All locally sourced and pesticide-free.",
    quantity: "15 kg",
    location: "Green Market, 456 Oak Ave, New York, NY",
    coordinates: [40.7589, -73.9851],
    freshness: "fresh",
    dietary: "vegan",
    allergens: [],
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=400"
  },
  {
    name: "Canned Goods",
    organization: "Community Center",
    description: "Various canned goods including beans, tomatoes, soup, and vegetables. All items are within expiration date and properly sealed.",
    quantity: "50 cans",
    location: "Community Center, 789 Pine St, New York, NY",
    coordinates: [40.7505, -73.9934],
    freshness: "preserved",
    dietary: "vegetarian",
    allergens: [],
    image: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400"
  },
  {
    name: "Frozen Meals",
    organization: "Restaurant Chain",
    description: "Prepared frozen meals including pasta dishes, rice bowls, and desserts. All meals are individually packaged and ready to heat.",
    quantity: "30 meals",
    location: "Restaurant Chain, 321 Elm St, New York, NY",
    coordinates: [40.7648, -73.9808],
    freshness: "frozen",
    dietary: "mixed",
    allergens: ["gluten", "dairy", "nuts"],
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400"
  },
  {
    name: "Fresh Fruits",
    organization: "Farmers Market",
    description: "Seasonal fresh fruits including apples, oranges, bananas, and berries. All fruits are ripe and ready to eat.",
    quantity: "25 kg",
    location: "Farmers Market, 555 Market St, New York, NY",
    coordinates: [40.7484, -73.9857],
    freshness: "fresh",
    dietary: "vegan",
    allergens: [],
    image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?w=400"
  },
  {
    name: "Dairy Products",
    organization: "Local Dairy",
    description: "Fresh dairy products including milk, cheese, yogurt, and butter. All products are from local farms and within expiration date.",
    quantity: "40 items",
    location: "Local Dairy, 777 Dairy Ave, New York, NY",
    coordinates: [40.7569, -73.9781],
    freshness: "fresh",
    dietary: "vegetarian",
    allergens: ["dairy"],
    image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400"
  }
];

// Function to add sample data to Firebase
export const addSampleData = async () => {
  try {
    console.log('Adding sample data to Firebase...');
    
    for (const foodItem of sampleFoodData) {
      await addFoodItem(foodItem);
      console.log(`Added: ${foodItem.name}`);
    }
    
    console.log('Sample data added successfully!');
    alert('Sample data has been added to Firebase!');
  } catch (error) {
    console.error('Error adding sample data:', error);
    alert('Failed to add sample data. Please check the console for details.');
  }
};

// Function to check if sample data exists (you can call this to avoid duplicates)
export const checkSampleDataExists = async () => {
  // This is a simple check - in a real app you might want to check by organization name
  // For now, we'll just return false to allow adding sample data
  return false;
}; 