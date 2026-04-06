# ProSathi - Professional Dashboard

A modern, responsive React dashboard application built with Vite, featuring a comprehensive design system, dark mode support, and advanced UI components.

## 🚀 Features

### 🎨 Design System

- **Comprehensive Color Palette**: Extended brand colors with semantic colors (success, warning, error, info)
- **Typography Scale**: Professional typography with Inter font family
- **Component Library**: Reusable button, card, input, and badge components
- **Shadow System**: Layered shadow system for depth and hierarchy
- **Animation System**: Smooth transitions and micro-interactions

### 🌙 Dark Mode

- **Theme Toggle**: Seamless switching between light and dark modes
- **System Preference Detection**: Automatically detects user's system preference
- **Persistent Settings**: Theme preference saved in localStorage
- **Complete Coverage**: All components support dark mode

### 📱 Responsive Design

- **Mobile-First**: Optimized for mobile devices
- **Bottom Navigation**: Native mobile navigation experience
- **Adaptive Layout**: Sidebar transforms to overlay on mobile
- **Touch-Friendly**: Proper touch targets and gestures

### 🔍 Advanced Features

- **Global Search**: Command+K to open search modal
- **Breadcrumb Navigation**: Clear navigation hierarchy
- **Keyboard Shortcuts**: Power user keyboard navigation
- **Toast Notifications**: Enhanced notification system with dark mode
- **Loading States**: Skeleton loaders and progress indicators

### 📊 Data Visualization

- **Interactive Charts**: Enhanced Recharts with dark mode support
- **Responsive Charts**: Charts adapt to container size
- **Custom Tooltips**: Styled tooltips matching design system

### ♿ Accessibility

- **WCAG Compliance**: Meets accessibility standards
- **Keyboard Navigation**: Full keyboard support
- **Screen Reader Support**: Proper ARIA labels and semantic HTML
- **Focus Management**: Clear focus indicators

## 🛠️ Tech Stack

- **Frontend**: React 18 with Vite
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Charts**: Recharts
- **Routing**: React Router
- **State Management**: React Context
- **Notifications**: React Toastify
- **Build Tool**: Vite

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <repository-url>
cd prosathi
```

2. Install dependencies

```bash
npm install
```

3. Start the development server

```bash
npm run dev
```

4. Open [http://localhost:5174](http://localhost:5174) in your browser

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── AuthButton.jsx   # User authentication button
│   ├── Breadcrumb.jsx   # Navigation breadcrumbs
│   ├── Layout.jsx       # Main layout components
│   ├── MobileNav.jsx    # Mobile bottom navigation
│   ├── SearchModal.jsx  # Global search modal
│   ├── SkeletonLoader.jsx # Loading state components
│   ├── ThemeToggle.jsx  # Dark mode toggle
│   └── ToastNotification.jsx # Notification system
├── context/            # React context providers
│   ├── AuthContext.jsx # Authentication state
│   └── ThemeContext.jsx # Theme management
├── data/              # Mock data files
├── pages/             # Page components
│   ├── Analytics.jsx  # Analytics dashboard
│   ├── Dashboard.jsx  # Main dashboard
│   ├── Login.jsx      # Authentication page
│   └── ...
├── utils/             # Utility functions
├── App.jsx            # Main app component
├── main.jsx           # App entry point
└── index.css          # Global styles and design system
```

## 🎨 Design System

### Color Palette

The application uses a comprehensive color system:

```css
/* Brand Colors */
--brand-navy: #1a237e to #e8eaf6 (50 shades) --brand-orange: #e65100 to #fff3e0
  (50 shades) /* Semantic Colors */ --success: Green variants --warning: Orange
  variants --error: Red variants --info: Blue variants /* Neutral Colors */
  --gray: #fafafa to #212121 (9 shades);
```

### Typography

- **Font Family**: Inter (Google Fonts)
- **Scale**: 6 font sizes from xs to 5xl
- **Weights**: 300, 400, 500, 600, 700, 800

### Components

#### Buttons

```jsx
<button className="btn btn-primary">Primary</button>
<button className="btn btn-secondary">Secondary</button>
<button className="btn btn-ghost">Ghost</button>
```

#### Cards

```jsx
<div className="card">
  <h3>Card Title</h3>
  <p>Card content</p>
</div>
```

#### Badges

```jsx
<span className="badge badge-success">Success</span>
<span className="badge badge-warning">Warning</span>
<span className="badge badge-error">Error</span>
```

## 🌙 Dark Mode Implementation

Dark mode is implemented using:

1. **CSS Custom Properties**: Dynamic color switching
2. **React Context**: Theme state management
3. **localStorage**: Persistence across sessions
4. **System Preference**: Automatic detection

### Usage

```jsx
import { useTheme } from "./context/ThemeContext";

function MyComponent() {
  const { theme, toggleTheme, isDark } = useTheme();

  return (
    <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"} Mode</button>
  );
}
```

## 📱 Mobile Optimization

### Bottom Navigation

- 5 main navigation items
- Touch-friendly 44px minimum targets
- Active state indicators
- Smooth transitions

### Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🔍 Search Functionality

### Global Search

- **Shortcut**: `Ctrl+K` (Windows/Linux) or `Cmd+K` (Mac)
- **Modal Interface**: Overlay search experience
- **Real-time Results**: Instant filtering
- **Navigation**: Direct links to pages and features

### Search Data Structure

```javascript
const searchData = [
  { title: "Dashboard", path: "/dashboard", type: "page" },
  { title: "Analytics", path: "/analytics", type: "page" },
  // ... more items
];
```

## ♿ Accessibility Features

### Keyboard Navigation

- **Tab Order**: Logical tab sequence
- **Focus Indicators**: Visible focus rings
- **Escape Key**: Close modals and menus
- **Enter/Space**: Activate buttons and links

### Screen Reader Support

- **ARIA Labels**: Descriptive labels for interactive elements
- **Semantic HTML**: Proper heading hierarchy
- **Live Regions**: Dynamic content announcements

### Color Contrast

- **WCAG AA Compliance**: 4.5:1 contrast ratio
- **Focus States**: High contrast focus indicators
- **Error States**: Clear error messaging

## 📊 Charts and Data Visualization

### Chart Components

- **Line Charts**: Trend visualization
- **Bar Charts**: Comparison data
- **Responsive**: Automatic sizing
- **Interactive**: Hover tooltips

### Dark Mode Charts

- **Theme-aware Colors**: Automatic color switching
- **Grid Lines**: Subtle grid styling
- **Tooltips**: Styled popup information

## 🔧 Development

### Code Style

- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Component Structure**: Consistent file organization

### Performance

- **Vite**: Fast development and building
- **Code Splitting**: Optimized bundle sizes
- **Lazy Loading**: Component-based code splitting

## 📝 Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Lucide](https://lucide.dev/) - Icon library
- [Recharts](https://recharts.org/) - Chart library
