import {
  Sparkles,
  UserRoundCog,
  ShieldCheck,
  CloudUpload,
  CreditCard,
  Gamepad,
  type LucideIcon,
  Store,
  Users2,
} from 'lucide-vue-next'
import { computed } from 'vue'
export type SupportCardContentType = {
  icon: LucideIcon
  name: string
  descriptions: string
  link: string
}
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

export const supportCardContentDatas = computed(() => [
  {
    icon: Sparkles,
    name: t('gettingStarted'),
    descriptions: t('gettingStartedDescriptions'),
    link: '/help/getting-started',
  },
  {
    icon: CreditCard,
    name: 'Payment & Billing',
    descriptions: 'Manage your payment methods and get help with billing issues.',
    link: '/help/payment',
  },
  {
    icon: CloudUpload,
    name: 'Publish Your Game',
    descriptions: 'Steps to upload and distribute your game on our platform.',
    link: '/help/publish',
  },
  {
    icon: ShieldCheck,
    name: 'Account Security',
    descriptions: 'Keep your account safe with our security guidelines and tips.',
    link: '/help/security',
  },
  {
    icon: UserRoundCog,
    name: 'Account Settings',
    descriptions: 'Update your profile, password, and email preferences.',
    link: '/help/account-settings',
  },
  {
    icon: Gamepad,
    name: 'Gameplay Issues',
    descriptions: 'Troubleshoot in-game problems like lag, crashes, or bugs.',
    link: '/help/gameplay-issues',
  },
  {
    icon: Store,
    name: 'Marketplace & Items',
    descriptions: 'Buy, sell, or trade items with other players securely.',
    link: '/help/marketplace',
  },
  {
    icon: Users2,
    name: 'Community Guidelines',
    descriptions: 'Understand what is and isn’t allowed in the community.',
    link: '/help/community-guidelines',
  },
])
