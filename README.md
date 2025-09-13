# RideShare Pro - Ride Booking & Management Platform

RideShare Pro is a comprehensive ride-sharing platform that connects passengers with drivers while providing administrative oversight. Built with modern web technologies, it offers a seamless experience for riders, drivers, and administrators.

### Live Link:
https://ride-management-frontend-snowy.vercel.app/

## 🚀 Key Features

### 👤 Rider Experience
- **Ride Request**: Easily request rides by specifying pickup and destination locations
- **Real-time Tracking**: Track ride status from request to completion
- **Fare Estimation**: Get fare estimates before confirming rides
- **Multiple Payment Options**: Choose from cash, card, or mobile payment methods
- **Ride History**: Access complete history of past rides

### 🚗 Driver Dashboard
- **Availability Toggle**: Go online/offline to receive ride requests
- **Ride Management**: Accept incoming ride requests and update ride status
- **Earnings Tracking**: Monitor total earnings and daily income
- **Driver Status Updates**: Mark rides as picked up, in transit, or completed
- **Quick Actions**: Efficient workflow for managing active rides

### 👨‍💼 Admin Panel
- **User Management**: Approve/block drivers, manage all user accounts
- **Ride Oversight**: Monitor all rides, view detailed information
- **Analytics Dashboard**: View key metrics including revenue, active rides, and user statistics
- **Pending Actions**: Quick access to driver approvals and user issues
- **Comprehensive Reporting**: Detailed insights into platform performance

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly across mobile, tablet, and desktop
- **Dark/Light Mode**: Theme switching capability with persistent preferences
- **Interactive Components**: Modern UI elements with smooth animations
- **Real-time Updates**: Live status updates without page refresh
- **Intuitive Navigation**: Role-based dashboards with clear information hierarchy

## 🛠️ Technology Stack

### Frontend
- **Core Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit with RTK Query for API integration
- **Routing**: React Router v6 for client-side navigation
- **UI Components**: Radix UI primitives with custom styling
- **Styling**: Tailwind CSS for utility-first CSS framework
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React icon library
- **Notifications**: Sonner for beautiful toast notifications
- **Build Tool**: Vite for fast development and optimized builds

### Backend
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based authentication with secure token handling
- **API Design**: RESTful API architecture
- **Error Handling**: Comprehensive error handling and logging

### Development & Deployment
- **Package Management**: npm
- **Type Checking**: TypeScript for static type checking
- **Code Quality**: ESLint and Prettier for code formatting
- **Environment Config**: dotenv for environment variable management
- **Deployment**: Vercel-ready configuration

## 📁 Project Structure

```
src/
├── assets/           # Images, icons, and static assets
├── components/       # Reusable UI components
│   ├── layout/       # Layout components (Navbar, Footer, etc.)
│   ├── modules/      # Feature-specific components
│   └── ui/           # Base UI components
├── config/           # Configuration files
├── constants/        # Application constants
├── context/          # React context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility libraries and helpers
├── pages/            # Page components organized by role
│   ├── Admin/        # Admin-specific pages
│   ├── driver/       # Driver-specific pages
│   ├── rider/        # Rider-specific pages
│   └── shared/       # Common pages (Login, Register, etc.)
├── providers/        # React providers
├── redux/            # Redux store, slices, and API integrations
├── routes/           # Application routing configuration
├── types/            # TypeScript type definitions
└── utils/            # Utility functions
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager
- MongoDB database (local or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Navigate to the frontend directory:
   ```bash
   cd Assignment 6/Ride-Management-Frontend
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Create a `.env` file in the root directory with the following variables:
   ```env
   VITE_BASE_URL=http://localhost:3000
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open your browser and navigate to `http://localhost:5174`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Create production build
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality checks

## 📱 User Roles & Access

### Rider
- Request new rides with location details
- View ride history and current ride status
- Manage payment preferences

### Driver
- Toggle availability status
- Accept or reject ride requests
- Update ride status (picked up, in transit, completed)
- View earnings dashboard
- *Note: Drivers must be approved by admin before accepting rides*

### Admin
- Full access to all platform features
- User account management (approve/block/suspend)
- Ride monitoring and intervention capabilities
- Analytics and reporting dashboard
- System configuration and settings

## 🔐 Authentication Flow

1. Users register with email and password
2. Email verification process (if implemented)
3. JWT tokens for secure session management
4. Role-based access control for different user types
5. Token refresh mechanism for persistent sessions

## 🌐 API Integration

The frontend communicates with the backend API through RTK Query endpoints, providing:
- Automatic caching and refetching
- Optimistic updates
- Error handling and retry logic
- Request polling for real-time updates

## 🎨 UI/UX Features

- **Modern Design**: Clean, intuitive interface with visual hierarchy
- **Responsive Layout**: Adapts to all screen sizes
- **Theme Support**: Light and dark mode with system preference detection
- **Interactive Elements**: Animated transitions and hover effects
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Loading States**: Skeleton loaders and progress indicators
- **Error Handling**: User-friendly error messages and recovery options

## 🚧 Development Guidelines

- Follow established component structure and naming conventions
- Use TypeScript for type safety
- Implement proper error handling in all async operations
- Write reusable components in the `components/` directory
- Maintain consistent styling with Tailwind CSS utility classes
- Use Redux Toolkit for global state management
- Follow RESTful API design principles

## 📤 Deployment

The application is configured for deployment on Vercel:

1. Push code to GitHub/GitLab
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push to main branch

For manual deployment:
1. Run `npm run build` to create production build
2. Serve the `dist/` folder using any static file server

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## 📄 License

This project is proprietary and intended for educational purposes as part of the Programming Hero curriculum.

## 🙋 Support

For issues and feature requests, please contact the development team or open an issue in the repository.