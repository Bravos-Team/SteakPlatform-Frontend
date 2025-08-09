import DraftCustomIcon from '@/components/common/icons/DraftCustomIcon.vue'
import PermissionCustom from '@/components/common/icons/PermissionCustom.vue'
import PublishedCustomIcon from '@/components/common/icons/PublishedCustomIcon.vue'
import {
  LayoutDashboard,
  BadgeInfo,
  SquareDashedKanban,
  ChartNoAxesGantt,
  LogOut,
  Gamepad2,
  Store,
  UserStar,
  Users,
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
  // DASHBOARD
  {
    title: 'Dashboard',
    i18n: 'dashboard.title',
    icon: LayoutDashboard,
    isActive: true,
    items: [
      {
        title: 'Overview',
        name: 'PublisherDashboard',
        i18n: 'dashboard.items.overview',
        icon: ChartNoAxesGantt,
      },
    ],
  },
  // END DASHBOARD
  // GAME MANAGEMENT
  {
    title: 'Game Manage',
    i18n: 'game_management.title',
    name: 'PublisherGameManagement',
    icon: Gamepad2,
    items: [
      // {
      //   title: 'Game Overview',
      //   i18n: 'game_management.items.overview',
      //   name: 'PublisherGameManagementOverview',
      //   icon: SquareDashedKanban,
      // },
      {
        title: 'Game Draft',
        i18n: 'game_management.items.draft',
        name: 'PublisherGameManagementDraft',
        icon: DraftCustomIcon,
      },
      {
        title: 'Game Published',
        i18n: 'game_management.items.published',
        name: 'PublisherGameAcceptedManagement',
        icon: PublishedCustomIcon,
      },
    ],
  },
  // END GAME MANAGEMENT
  // ACCOUNT MANAGEMENT
  {
    title: 'Account Management',
    i18n: 'accounts_management.title',
    name: 'PublisherAccountManagement',
    icon: UserStar,
    items: [
      {
        title: 'Member Management',
        i18n: 'accounts_management.member',
        name: 'PublisherAccountManagement',
        icon: Users,
      },
      {
        title: 'Permissions',
        i18n: 'permissions.title',
        name: 'PublisherPermissionsManagement',
        icon: PermissionCustom,
      },
    ],
  },
  // END ACCOUNT MANAGEMENT
  // STORE
  {
    title: 'Steak Store',
    name: 'store-home',
    i18n: 'store.title',
    icon: Store,
  },
  // END STORE
  // SUPPORT
  {
    title: 'Support',
    name: 'SupportCenter',
    i18n: 'support.title',
    icon: BadgeInfo,
  },
  // END SUPPORT
  // LOGOUT
  {
    title: 'Logout',
    i18n: 'logout.title',
    name: 'PublisherAuthLogin',
    icon: LogOut,
  },
  // END LOGOUT
]
