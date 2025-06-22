# ShareBite - Surplus Food Sharing Platform

A modern React web application that connects organizations with surplus food to people who can use it, helping reduce food waste and support communities. Now powered by **Firebase Firestore** for real-time data management.

## 🌟 Features

### User Interface
- **Browse Food Listings**: View available surplus food with detailed information
- **Search & Filter**: Find food by dietary preferences, freshness, and location
- **Interactive Map**: See food locations on an interactive map with distance information
- **Claim Food**: Easy checkout process to claim available food items
- **Real-time Updates**: See when food was posted and its current status
- **Live Data**: All data is stored in Firebase Firestore for real-time updates

### Admin Interface
- **Add Food Listings**: Comprehensive form to add new surplus food items
- **Manage Listings**: Edit, delete, and track the status of food listings
- **Organization Management**: Manage multiple organizations and their food offerings
- **Location Services**: Specify exact locations for food pickup
- **Sample Data**: Quick setup with sample food data for testing
- **Real-time Database**: All changes are immediately reflected across the platform

### Authentication
- **User Registration**: Sign up as either a food seeker or organization admin
- **Secure Login**: Role-based access control
- **Session Management**: Persistent login sessions

## 🎨 Design Features

- **Modern UI**: Clean, responsive design with gradient backgrounds
- **Mobile-First**: Fully responsive design that works on all devices
- **Interactive Elements**: Hover effects, smooth transitions, and loading states
- **Accessibility**: Proper contrast ratios and keyboard navigation
- **Professional Theme**: Consistent color scheme and typography

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager
- Firebase project (already configured)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sharebite-web
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Demo Credentials

**Admin Account:**
- Email: `admin@sharebite.com`
- Password: `admin123`

**User Account:**
- Email: `user@sharebite.com`
- Password: `user123`

## 📱 Usage

### For Users
1. **Login/Signup**: Create an account or use demo credentials
2. **Browse Food**: View available food items in list or map view
3. **Search & Filter**: Use filters to find specific types of food
4. **Claim Food**: Click "Claim Food" to reserve items for pickup
5. **Get Directions**: Use the map to find pickup locations

### For Admins
1. **Login**: Use admin credentials to access the admin panel
2. **Add Sample Data**: Click "Add Sample Data" to populate with test data
3. **Add Listings**: Click "Add New Listing" to create food listings
4. **Manage Items**: Edit or delete existing listings as needed
5. **Track Status**: Monitor which items have been claimed

## 🛠️ Technology Stack

- **Frontend**: React 18 with Hooks
- **Backend**: Firebase Firestore (NoSQL database)
- **Authentication**: Firebase Auth (ready for integration)
- **Routing**: React Router DOM
- **Maps**: React Leaflet with OpenStreetMap
- **Icons**: React Icons
- **Styling**: Custom CSS with modern design principles
- **State Management**: React Context API
- **Real-time Data**: Firebase Firestore listeners

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/
│   │   ├── Login.js
│   │   ├── Signup.js
│   │   └── Auth.css
│   ├── user/
│   │   ├── UserDashboard.js
│   │   ├── FoodCard.js
│   │   ├── MapView.js
│   │   ├── UserDashboard.css
│   │   ├── FoodCard.css
│   │   └── MapView.css
│   └── admin/
│       ├── AdminDashboard.js
│       ├── AddFoodForm.js
│       ├── AdminDashboard.css
│       └── AddFoodForm.css
├── firebase/
│   ├── config.js
│   ├── foodService.js
│   └── sampleData.js
├── context/
│   └── AuthContext.js
├── App.js
├── App.css
├── index.js
└── index.css
```

## 🔥 Firebase Integration

### Firestore Collections
- **foodItems**: Stores all food listing data
  - Document fields: name, organization, description, quantity, location, coordinates, freshness, dietary, allergens, image, status, datePosted, createdAt, updatedAt

### Firebase Services Used
- **Firestore**: Real-time database for food data
- **Auth**: User authentication (ready for integration)
- **Storage**: Image storage (ready for integration)

### Data Operations
- **CRUD Operations**: Create, Read, Update, Delete food items
- **Real-time Updates**: Changes reflect immediately across all users
- **Querying**: Filter by dietary preferences, freshness, and status
- **Timestamps**: Automatic server timestamps for all operations

## 🎯 Key Features Explained

### Food Information Display
- **Freshness Indicators**: Color-coded badges (Fresh, Frozen, Preserved)
- **Dietary Information**: Vegetarian, Vegan, Mixed options
- **Allergen Warnings**: Clear display of potential allergens
- **Quantity & Location**: Detailed pickup information
- **Time Stamps**: When food was posted and availability status

### Map Integration
- **Interactive Markers**: Click to view food details
- **Location Services**: Real coordinates for accurate directions
- **Responsive Design**: Works on mobile and desktop
- **Custom Popups**: Rich information display on map

### Form Validation
- **Real-time Validation**: Immediate feedback on form errors
- **Required Fields**: Clear indication of mandatory information
- **Image Upload**: Support for food images with preview
- **Allergen Selection**: Checkbox interface for allergen information

### Real-time Features
- **Live Updates**: Food items appear/disappear in real-time
- **Status Tracking**: Claim status updates immediately
- **Search & Filter**: Instant filtering of available items
- **Error Handling**: Graceful error handling with retry options

## 🔧 Customization

### Colors
The application uses a consistent color palette:
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Deep Purple)
- Success: `#10b981` (Green)
- Warning: `#f59e0b` (Orange)
- Error: `#e53e3e` (Red)

### Styling
All components use modern CSS with:
- Flexbox and Grid layouts
- CSS custom properties
- Smooth transitions and animations
- Mobile-responsive breakpoints

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Options
- **Netlify**: Drag and drop the `build` folder
- **Vercel**: Connect your GitHub repository
- **AWS S3**: Upload the `build` folder to S3
- **Heroku**: Add buildpack and deploy

### Firebase Deployment
The Firebase configuration is already set up. To deploy:
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init`
4. Deploy: `firebase deploy`

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Firebase**: For powerful backend services
- **Unsplash**: For beautiful food images
- **OpenStreetMap**: For map tiles and location services
- **React Community**: For excellent documentation and tools
- **Design Inspiration**: Modern web design principles and best practices

## 📞 Support

For support or questions, please open an issue in the GitHub repository or contact the development team.

---

**ShareBite** - Making food sharing simple, sustainable, and accessible for everyone. Now with real-time data powered by Firebase! 🔥 