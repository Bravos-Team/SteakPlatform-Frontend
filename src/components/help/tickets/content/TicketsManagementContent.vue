<template>
  <tooltip-provider>
    <div class="desktop-xl:px-[5rem] desktop-xl:py-[2rem] flex gap-y-5 flex-col">
      <!-- TITLE -->
      <div class="flex flex-col">
        <div class="flex gap-x-2">
          <chart-no-axes-gantt class="size-10 m-0 p-0" />
          <span class="text-4xl font-bold flex gap-x-2 m-0 p-0"> Tickets Management</span>
        </div>
        <span class="font-light text-sm"
          >Track ticket, create ticket, and stay focused — all in one minimal board
        </span>
      </div>
      <!-- END TITLE -->
      <TicketsFilterButtons />
      <tickets-management-articles />
    </div>
  </tooltip-provider>
</template>

<script lang="ts" setup>
import { TooltipProvider } from '@/components/ui/tooltip'
import { ChartNoAxesGantt } from 'lucide-vue-next'
import TicketsFilterButtons from '@/components/help/tickets/content/TicketsFilterButtons.vue'
import TicketsManagementArticles from '@/components/help/tickets/content/TicketsManagementArticles.vue'
</script>
