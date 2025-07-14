import {
  LayoutDashboard,
  Users,
  BookOpen,
  Settings,
  LogOut,
  Bell,
  BarChart3,
  ShoppingCart,
  FileText,
  HelpCircle,
  Banknote,
} from 'lucide-vue-next'

export const adminNavItems = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: 'Overview',
        name: 'AdminDashboard',
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: 'User Management',
    icon: Users,
    items: [
      {
        title: 'All Users',
        name: 'AdminUsers',
        icon: Users,
      },
      {
        title: 'Create User',
        name: 'AdminUserCreate',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Publisher Management',
    icon: BookOpen,
    items: [
      {
        title: 'All Publishers',
        name: 'AdminPublishers',
        icon: BookOpen,
      },
      {
        title: 'Create Publisher',
        name: 'AdminPublisherCreate',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Products',
    icon: ShoppingCart,
    items: [
      {
        title: 'All Products',
        name: 'AdminProducts',
        icon: ShoppingCart,
      },
      {
        title: 'Create Product',
        name: 'AdminProductCreate',
        icon: FileText,
      },
    ],
  },
  {
    title: 'Reports',
    icon: BarChart3,
    items: [
      {
        title: 'Overview',
        name: 'AdminReports',
        icon: BarChart3,
      },
      {
        title: 'Sales Reports',
        name: 'AdminSalesReports',
        icon: Banknote,
      },
      {
        title: 'User Reports',
        name: 'AdminUserReports',
        icon: Users,
      },
    ],
  },
  {
    title: 'Notifications',
    name: 'AdminNotifications',
    icon: Bell,
  },
  {
    title: 'Settings',
    icon: Settings,
    items: [
      {
        title: 'General',
        name: 'AdminSettings',
        icon: Settings,
      },
      {
        title: 'Profile',
        name: 'AdminProfile',
        icon: Users,
      },
      {
        title: 'Security',
        name: 'AdminSecurity',
        icon: HelpCircle,
      },
    ],
  },
  {
    title: 'Logout',
    name: 'AdminLogin',
    icon: LogOut,
  },
]
