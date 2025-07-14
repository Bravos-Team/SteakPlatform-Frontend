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
    name: 'Admin',
    email: 'admin@gmail.com',
    avatar: 'https://ccdn.steak.io.vn/assets-guts-profile-pic.png',
  },
}

// Data for sidebar items
export const navItemsData = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    items: [
      {
        title: 'Overview',
        name: 'AdminDashboard',
        icon: ChartNoAxesGantt,
      },
    ],
  },
  {
    title: 'Users',
    icon: User,
    items: [
      {
        title: 'Overview',
        name: 'AdminUsers',
        icon: ChartNoAxesGantt,
      },
    ],
  },
  {
    title: 'Games',
    icon: Gamepad2,
    items: [
      {
        title: 'Overview',
        name: 'AdminGames',
        icon: ChartNoAxesGantt,
      },
    ],
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
  {
    title: 'Logout',
    name: 'AdminLogin',
    icon: LogOut,
  },
]
