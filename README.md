# 🚖 Ride Management System - Frontend

A production-grade, fully responsive, and role-based full-stack application for a Ride Booking Platform (similar to Uber or Pathao) built with React.js, Redux Toolkit, and RTK Query.

## 🎯 Project Overview

This frontend application provides distinct user experiences for **Riders**, **Drivers**, and **Admins**, ensuring a consistent, polished, and intuitive UI/UX across all devices. The application interacts with a Node.js/Express backend API to deliver a complete ride booking solution.

## ✨ Features

### 🌐 Public Landing Pages
- **Home**: Hero banner, how-it-works overview, service highlights, testimonials, call-to-action, and special offers
- **About Us**: Company background, mission, and team profiles
- **Features**: Detailed breakdown of capabilities for each user role
- **Contact**: Validated inquiry form with simulated submission
- **FAQ**: Searchable list of common questions

### 🔐 Authentication & Authorization
- JWT-based login and registration with role selection
- Role-based landing pages upon login
- Account status handling (blocked/suspended users)
- Persistent authentication state
- Logout functionality

### 🚗 Rider Features
- **Ride Request Form**: Pickup/destination fields, fare estimation, payment method selection
- **Live Ride Tracking**: Real-time ride updates with driver details
- **Ride History**: Paginated list with search and filters
- **Ride Details**: Map route, timestamps, driver info, and status timeline
- **Profile Management**: Edit personal information and change password
- **Emergency SOS Button**: Quick access to emergency contacts and location sharing

### 🚘 Driver Features
- **Availability Control**: Online/Offline toggle
- **Incoming Requests**: Accept or reject rider offers
- **Active Ride Management**: Update ride statuses
- **Earnings Dashboard**: Visual breakdown with charts
- **Ride History**: Paginated and filterable past ride records
- **Profile Management**: Vehicle details, contact info, and password updates

### 👨‍💼 Admin Features
- **User Management**: Search, filter, block/unblock users, approve/suspend drivers
- **Ride Oversight**: View all rides with advanced filtering
- **Analytics Dashboard**: Data visualizations for platform performance
- **Profile Management**: Update personal profile and password

## 🛠 Tech Stack

### Frontend
- **Framework**: React 18 with TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React Icons
- **Charts**: Recharts
- **Notifications**: React Hot Toast
- **Build Tool**: Vite

### Backend Integration
- **API**: Node.js/Express with MongoDB
- **Authentication**: JWT + bcrypt
- **Live API**: https://ridemanagementapi.vercel.app/

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Ride-Management-Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
src/
├── components/
│   ├── auth/           # Authentication components
│   ├── layout/         # Layout components (Navbar, Footer)
│   └── ui/            # Reusable UI components
├── hooks/
│   └── redux.ts       # Custom Redux hooks
├── pages/
│   ├── auth/          # Authentication pages
│   ├── rider/         # Rider dashboard and components
│   ├── driver/        # Driver dashboard and components
│   ├── admin/         # Admin dashboard and components
│   └── public/        # Public landing pages
├── store/
│   ├── api.ts         # RTK Query API configuration
│   └── slices/        # Redux slices
├── types/
│   └── index.ts       # TypeScript interfaces
├── App.tsx            # Main application component
└── main.tsx          # Application entry point
```

## 🎨 Design System

### Color Palette
- **Primary**: Teal (`#14b8a6`)
- **Secondary**: Slate (`#64748b`)
- **Success**: Green (`#10b981`)
- **Warning**: Yellow (`#f59e0b`)
- **Error**: Red (`#ef4444`)

### Typography
- **Font Family**: Inter (Google Fonts)
- **Responsive Design**: Mobile-first approach

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=https://ridemanagementapi.vercel.app
```

### Tailwind Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Custom animations
- Responsive breakpoints
- Custom fonts

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile**: 320px - 768px
- **Tablet**: 768px - 1024px
- **Desktop**: 1024px+

## 🔐 Security Features

- JWT token-based authentication
- Role-based access control
- Form validation and sanitization
- Secure password handling
- Protected routes

## 🚨 Emergency Features

### SOS Button
- Floating emergency button during active rides
- Quick access to emergency contacts
- Live location sharing
- Direct call to emergency services
- Visual feedback and confirmation

## 📊 Data Visualization

The application includes comprehensive charts and analytics:
- **Bar Charts**: Weekly earnings, peak hours performance
- **Pie Charts**: Payment method breakdown, ride status distribution
- **Line Charts**: User growth trends
- **Area Charts**: Revenue trends

## 🧪 Testing

### Manual Testing Checklist
- [ ] Authentication flow (login/register)
- [ ] Role-based navigation
- [ ] Responsive design on all devices
- [ ] Form validation
- [ ] API integration
- [ ] Error handling
- [ ] Loading states

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - Build Command: `npm run build`
   - Output Directory: `dist`
3. Deploy

### Netlify
1. Connect your repository
2. Set build command: `npm run build`
3. Set publish directory: `dist`

## 📈 Performance Optimizations

- **Lazy Loading**: Components and routes
- **Skeleton Loaders**: Better perceived performance
- **Image Optimization**: WebP format support
- **Code Splitting**: Automatic with Vite
- **Caching**: RTK Query caching strategies

## 🔄 API Integration

The application integrates with the backend API through RTK Query:

### Endpoints
- **Authentication**: `/auth/login`, `/auth/register`
- **Users**: `/users/profile`, `/users/update`
- **Drivers**: `/drivers`, `/drivers/status`
- **Rides**: `/rides`, `/rides/create`, `/rides/status`
- **Analytics**: `/analytics`

### Error Handling
- Global error handling with toast notifications
- Form validation with real-time feedback
- Network error recovery
- Loading states for better UX

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the FAQ section

## 🔮 Future Enhancements

- [ ] Real-time map integration (Google Maps/Leaflet)
- [ ] Push notifications
- [ ] Google/Facebook authentication
- [ ] Advanced search and filtering
- [ ] Unit and integration tests
- [ ] PWA capabilities
- [ ] Multi-language support

---

**Built with ❤️ using React, Redux Toolkit, and RTK Query**
