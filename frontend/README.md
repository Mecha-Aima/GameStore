# GameStore Frontend

A modern React-based frontend for the GameStore e-commerce platform that provides an intuitive interface for browsing, purchasing, and managing video games.

## 🚀 Technology Stack

- **React 19** - Modern UI library with latest features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Axios** - HTTP client for API communication
- **Context API** - State management solution

## 📁 Project Structure

```
frontend/
├── public/
│   └── game-covers/          # Game cover images
├── src/
│   ├── assets/               # Static assets
│   │   ├── fonts/
│   │   ├── icons/
│   │   ├── images/
│   │   └── logo/
│   ├── components/           # Reusable UI components
│   │   ├── Badges.jsx
│   │   ├── Filter.jsx
│   │   ├── Footer.jsx
│   │   ├── GameCard.jsx
│   │   ├── Header.jsx
│   │   ├── OrderConfirmationModal.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/                # Page components
│   │   ├── AddGame.jsx
│   │   ├── AdminPanel.jsx
│   │   ├── Auth.jsx
│   │   ├── Cart.jsx
│   │   ├── Contact.jsx
│   │   ├── GameList.jsx
│   │   ├── Home.jsx
│   │   ├── OrderSummary.jsx
│   │   └── ProductDetails.jsx
│   ├── App.jsx               # Main application component
│   ├── CartContext.jsx       # Shopping cart state management
│   ├── GamesContext.jsx      # Games data state management
│   ├── UserContext.jsx       # User authentication state
│   └── main.jsx              # Application entry point
├── package.json
├── tailwind.config.js
└── vite.config.js
```

## 📄 Pages Overview

### Public Pages
- **Auth** (`/`, `/auth`) - User authentication (login/register)
- **Home** (`/home`) - Main landing page with featured games
- **GameList** (`/games`) - Browse all available games with filtering
- **ProductDetails** (`/product`) - Detailed view of individual games
- **Cart** (`/cart`) - Shopping cart management
- **Contact** (`/contact`) - Customer support and contact information
- **OrderSummary** (`/ordersummary`) - Order confirmation and details

### Protected Pages (Admin Only)
- **AdminPanel** (`/admin`) - Administrative dashboard for game management
- **AddGame** (`/add-game`) - Form to add new games to the catalog

## 🔄 Frontend Logic Flow

### 1. Application Initialization
- App loads with context providers (User, Games, Cart)
- Authentication state is checked
- Games data is fetched from backend API

### 2. State Management
- **UserContext**: Manages authentication, user data, and admin privileges
- **GamesContext**: Handles game catalog, filtering, and individual game data
- **CartContext**: Manages shopping cart items and quantities

### 3. Authentication Flow
- Users start at the Auth page (`/`)
- Upon successful login, redirected to Home page
- Admin users gain access to protected routes
- ProtectedRoute component guards admin-only pages

### 4. Shopping Experience
- Browse games on Home or GameList pages
- Filter games by genre, price, or other criteria
- View detailed product information
- Add items to cart with quantity selection
- Review cart and proceed to order summary
- Complete purchase with order confirmation

### 5. Admin Functionality
- Access admin panel for game management
- Add new games with cover images
- Monitor inventory and orders
- User management capabilities

## 🛠️ Setup & Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation Steps

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Ensure backend API is running on `http://localhost:3000`
   - Game cover images should be placed in `public/game-covers/`

4. **Start development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 🔧 Configuration

### Tailwind CSS
Custom Tailwind configuration is available in `tailwind.config.js` for design system customization.

### Vite Configuration
Build and development settings can be modified in `vite.config.js`.

### ESLint
Code quality rules are configured in `eslint.config.js` following React best practices.

## 🌐 API Integration

The frontend communicates with the backend API using Axios. Key endpoints include:

- **Games**: `/api/games` - Game catalog and details
- **Authentication**: `/api/auth` - User login/register
- **Cart**: `/api/cart` - Shopping cart operations
- **Orders**: `/api/orders` - Order processing
- **Admin**: `/api/admin` - Administrative functions

## 🔒 Security Features

- **Protected Routes**: Admin-only pages are secured with ProtectedRoute component
- **Authentication**: JWT-based authentication with context management
- **Input Validation**: Form validation and sanitization
- **CORS**: Configured for secure API communication

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Interface**: Clean, intuitive design following current web standards
- **Loading States**: User feedback during data fetching
- **Error Handling**: Graceful error messages and fallbacks
- **Accessibility**: Semantic HTML and keyboard navigation support

## 🤝 Contributing

1. Follow the existing code structure and naming conventions
2. Ensure all new components are properly documented
3. Test responsive design across different screen sizes
4. Run linting before committing changes
5. Update this README when adding new features or pages

## 📝 Notes

- The application expects game cover images to be stored in `public/game-covers/`
- Admin functionality requires backend authentication and authorization
- All monetary values should be handled consistently across components
- Maintain consistent styling using Tailwind utility classes
