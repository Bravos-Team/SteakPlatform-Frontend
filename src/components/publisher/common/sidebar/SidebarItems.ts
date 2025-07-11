import {
  LayoutDashboard,
  BadgeInfo,
  SquareDashedKanban,
  ChartNoAxesGantt,
  HardDriveUpload,
  LogOut,
  Gamepad2,
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

  // projects: [
  //   {
  //     name: 'Design Engineering',
  //     url: '#',
  //     icon: Frame,
  //   },
  //   {
  //     name: 'Sales & Marketing',
  //     url: '#',
  //     icon: PieChart,
  //   },
  //   {
  //     name: 'Travel',
  //     url: '#',
  //     icon: Map,
  //   },
  // ],
})

export const userData = {
  data: {
    name: 'godrey',
    email: 'doanchanphong0610@gmail.com',
    avatar: 'https://ccdn.steak.io.vn/assets-guts-profile-pic.png',
  },
}

export const navItemsData = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: 'Overview',
        name: 'PublisherDashboard',
        icon: ChartNoAxesGantt,
      },
      // {
      //   title: 'Game Manage',
      //   name: 'PublisherGameManagement',
      //   icon: Gamepad2,
      //   subItems: [
      //     {
      //       title: 'Game Overview',
      //       name: 'PublisherGameManagementOverview',
      //       icon: SquareDashedKanban,
      //     },
      //     {
      //       title: 'Game Pending',
      //       name: 'PublisherGameManagementPending',
      //       icon: HardDriveUpload,
      //     },
      //   ],
      // },
    ],
  },
  {
    title: 'Game Manage',
    name: 'PublisherGameManagement',
    icon: Gamepad2,
    items: [
      {
        title: 'Game Overview',
        name: 'PublisherGameManagementOverview',
        icon: SquareDashedKanban,
      },
      {
        title: 'Game Pending',
        name: 'PublisherGameManagementPending',
        icon: HardDriveUpload,
      },
    ],
  },
  {
    title: 'Support',
    name: 'SupportCenter',
    icon: BadgeInfo,
  },
  {
    title: 'Logout',
    name: 'PublisherAuthLogin',
    icon: LogOut,
  },
]
