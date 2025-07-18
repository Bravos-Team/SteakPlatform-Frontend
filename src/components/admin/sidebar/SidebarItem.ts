import {
  LayoutDashboard,
  BadgeInfo,
  SquareDashedKanban,
  ChartNoAxesGantt,
  HardDriveUpload,
  LogOut,
  Gamepad2,
  User,
} from 'lucide-vue-next'
import { ref } from 'vue'

export const data = ref({
  teams: [
    {
      name: 'Acme Inc',
      icon: LayoutDashboard,
      plan: 'Enterprise',
    },
    {
      name: 'Acme Inc',
      icon: LayoutDashboard,
      plan: 'Enterprise',
    },
  ],
})

// Data profile
export const userData = {
  data: {
    name: 'NoN4m3',
    email: 'admin@gmail.com',
    avatar: 'https://ccdn.steak.io.vn/assets-guts-profile-pic.png',
  },
}

// Data for sidebar items
export const navItemsData = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    route: '/admin/dashboard',
  },
  {
    title: 'Users',
    icon: User,
    route: '/admin/users',
  },
  {
    title: 'Games',
    icon: Gamepad2,
    route: '/admin/games',
  },
  // {
  //   title: 'Settings',
  //   name: 'PublisherSettings',
  //   icon: BadgeInfo,
  // },
  // {
  //   title: 'Login',
  //   name: 'AdminLogin',
  //   icon: LogOut,
  // },
]
