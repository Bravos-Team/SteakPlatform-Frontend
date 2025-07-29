<template>
  <div class="w-full overflow-x-auto">
    <table class="table w-full border-spacing-y-0 border-separate overflow-x-auto">
      <caption class="caption-bottom text-white/50 font-light text-sm py-3">
        Ticket Management Table: I don't know what to say...
      </caption>
      <thead>
        <tr class="w-full">
          <th class="w-3/12">
            <div class="flex items-center gap-x-2 text-gray-400">
              <TableOfContents class="size-4" />
              <span>Tickets content</span>
            </div>
          </th>
          <th class="w-1/12">
            <div class="flex items-center gap-x-2 text-gray-400 justify-center">
              <CircleDashed class="size-4" />
              <span>Status</span>
            </div>
          </th>
          <th class="w-1/12">
            <div class="flex items-center gap-x-2 text-gray-400 justify-center">
              <ChartBarStacked class="size-4" />
              <span>Category</span>
            </div>
          </th>
          <th class="w-2/12">
            <div class="flex items-center gap-x-2 text-gray-400 justify-center">
              <NotepadText class="size-4" />
              <span>Descriptions</span>
            </div>
          </th>
          <th class="w-2/12">
            <div class="flex items-center gap-x-2 text-gray-400 justify-center">
              <CalendarArrowUp class="size-4" />
              <span>Create At</span>
            </div>
          </th>
          <th class="w-2/12">
            <div class="flex items-center gap-x-2 text-gray-400 justify-center">
              <TableOfContents class="size-4" />
              <span>Actions</span>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        <tooltip v-for="ticket in ticketList" :key="ticket.id" :to="{ name: 'Login' }">
          <tooltip-trigger as-child>
            <tr
              @click="redirectToTicketDetails(ticket.id)"
              class="w-full h-[3rem] cursor-pointer hover:bg-white/10"
            >
              <!-- TITLE CONTENT -->
              <td class="w-3/12 py-5 px-2 border-b-1 font-medium">{{ ticket.content }}</td>
              <!-- END TITLE CONTENT -->

              <!-- STATUS -->
              <td class="w-1/12 border-b-1">
                <div
                  class="rounded-xs py-1 w-25 mx-auto text-center font-black"
                  :class="{
                    'bg-[#FFA500]/90': ticket.status.id === 1,
                    'bg-[#00BFFF]/90': ticket.status.id === 2,
                    'bg-[#32CD32]/90': ticket.status.id === 3,
                    'bg-[#808080]/90': ticket.status.id === 4,
                  }"
                >
                  {{ ticket.status.name }}
                </div>
              </td>
              <!-- END STATUS -->

              <!-- CATEGORY -->
              <td class="w-1/12 border-b-1 text-center">{{ ticket.category }}</td>
              <!-- END CATEGORY -->

              <!-- DESCRIPTION -->
              <td class="w-2/12 border-b-1">
                <span class="truncate min-w-0 w-[400px] line-clamp-1">
                  {{ ticket.description }}</span
                >
              </td>
              <!-- END DESCRIPTION -->

              <!-- CREATE AT -->
              <td class="w-2/12 border-b-1 text-center">{{ ticket.createdAt }}</td>
              <!-- END CREATE AT -->

              <!-- ACTIONS -->
              <td class="w-2/12 border-b-1 px-2">
                <div class="w-full flex gap-x-2 justify-end">
                  <button
                    v-for="action in ticket.actions"
                    class="border rounded-xs px-3 py-1 bg-gray-300/10"
                    :key="action"
                  >
                    {{ action }}
                  </button>
                </div>
              </td>
              <!-- END ACTIONS -->
            </tr>
          </tooltip-trigger>
          <tooltip-content> Click here to see detail </tooltip-content>
        </tooltip>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useRouter } from 'vue-router'

const router = useRouter()
const redirectToTicketDetails = async (params: number) => {
  await router.push({ name: 'TicketDetails', params: { id: params } })
}
const ticketList = ref([
  {
    id: 1,
    content: 'Login issue on mobile app',
    status: {
      id: 1,
      name: 'Open',
    },
    category: 'Bug',
    description: 'User cannot log in with correct credentials on iOS',
    createdAt: '2025-07-01 09:12',
    actions: ['Edit', 'Close'],
  },
  {
    id: 2,
    content: 'Feature request: Dark mode',
    status: {
      id: 2,
      name: 'Pending',
    },
    category: 'Feature',
    description: 'Requesting dark theme for better night usability',
    createdAt: '2025-06-28 15:47',
    actions: ['Approve'],
  },
  {
    id: 3,
    content: 'Payment failed during checkout',
    status: {
      id: 3,
      name: 'Resolved',
    },
    category: 'Bug',
    description: 'Stripe integration returns 500 error',
    createdAt: '2025-06-25 18:03',
    actions: ['Reopen'],
  },
  {
    id: 4,
    content: 'Spelling mistake in welcome email',
    status: {
      id: 4,
      name: 'Closed',
    },
    category: 'UI/UX',
    description: 'Typo in "Welcome to our platform" email',
    createdAt: '2025-06-20 10:30',
    actions: ['Closed'],
  },
])

import {
  CalendarArrowUp,
  ChartBarStacked,
  CircleDashed,
  NotepadText,
  TableOfContents,
} from 'lucide-vue-next'
</script>
