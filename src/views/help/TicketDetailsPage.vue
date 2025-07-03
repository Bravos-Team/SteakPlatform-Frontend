<template>
  <tooltip-provider>
    <tickets-request-managements-header />
    <div class="py-3 desktop-xl:px-[20rem]">
      <div class="bg-[#72757e]/10 relative">
        <div class="w-full h-[2.5rem] bg-[#141414]/60 flex justify-between px-3">
          <div class="flex items-center gap-2">
            <button @click="previousPage" class="group cursor-pointer">
              <Undo class="group-hover:-translate-y-[2px] transition-all duration-200" />
            </button>
            <span class="text-sm text-gray-300">Why my game image isn't showing</span>
            <span class="text-xs text-gray-500">Game Submission ID: 729172873012031</span>
            <span class="text-xs text-gray-500">Ticket ID: 1234567890123</span>
          </div>
          <div class="flex gap-x-2 items-center">
            <span
              v-if="isClosed"
              class="px-3 py-1 border-2 border-dashed border-white/50 rounded-full text-sm font-black bg-green-400/50 text-white"
              >Open</span
            >

            <span
              v-else
              class="px-3 py-1 border-2 border-dashed border-white/50 rounded-full text-sm font-black bg-red-400/50 text-white"
              >Closed</span
            >
            <tooltip v-if="isClosed">
              <tooltip-trigger as-child>
                <button
                  @click="isClosed = !isClosed"
                  class="cursor-pointer group px-1 bg-white/10 hover:bg-white/30 rounded-full py-1"
                >
                  <LockOpen />
                </button>
              </tooltip-trigger>
              <tooltip-content> Click to close this ticket </tooltip-content>
            </tooltip>

            <tooltip v-else>
              <tooltip-trigger as-child>
                <button
                  class="cursor-pointer group px-1 bg-red-500/10 hover:bg-red-500/30 rounded-full py-1"
                >
                  <Lock />
                </button>
              </tooltip-trigger>
              <tooltip-content> This ticket is closed </tooltip-content>
            </tooltip>
          </div>
        </div>
        <!-- REPLIES -->
        <div class="h-[45rem] overflow-auto no-scrollbar p-3">
          <div v-for="reply in repliesData" :key="reply.id" class="flex mb-4">
            <div
              :class="
                reply.from.role === 'submitter'
                  ? 'ml-auto bg-blue-200/80'
                  : 'mr-auto bg-gray-100/80'
              "
              class="rounded-sm p-3 max-w-md"
            >
              <div class="text-sm text-gray-800 whitespace-pre-line">{{ reply.content }}</div>
              <div v-if="reply.attachments.length" class="mt-2">
                <img
                  v-if="!reply.attachments.toString().endsWith('.mp4')"
                  v-for="img in reply.attachments"
                  :key="img"
                  :src="img"
                  class="w-full h-auto rounded-xs"
                />
                <video
                  v-else
                  v-for="video in reply.attachments"
                  :key="video"
                  :src="video"
                  autoplay
                ></video>
              </div>
              <div class="text-xs text-gray-500 mt-1 text-right">{{ reply.repliedAt }}</div>
            </div>
          </div>
          <div class="h-[3rem] w-full"></div>
        </div>
        <!-- END REPLIES -->

        <!-- REPLY FORM -->
        <label
          for="reply"
          class="absolute bottom-0 h-[3rem] bg-[#2a2a30] w-full px-6 flex items-center gap-2"
        >
          <input
            type="text"
            v-model="reply"
            class="w-full h-full outline-0 ring-0"
            name="reply"
            placeholder="Nhập tin nhan"
            id="reply"
          />
          <button
            @click="submitSendReply"
            class="!size-6 group cursor-pointer m-0 p-0 flex items-center"
          >
            <SendHorizontal
              class="group-hover:text-sky-200 transition-all duration-200 group-hover:scale-110"
            />
          </button>
        </label>
        <!-- END REPLY FORM -->
      </div>
    </div>
  </tooltip-provider>
</template>

<script lang="ts" setup>
import TicketsRequestManagementsHeader from '@/components/help/tickets/TicketsRequestManagementsHeader.vue'
import { Lock, LockOpen, SendHorizontal, Undo } from 'lucide-vue-next'
import { Tooltip, TooltipProvider, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { ref } from 'vue'

const reply = ref('')

const repliesData = ref([
  {
    id: 1234567890120,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'submitter',
      id: 123812812,
    },
    content: 'Vì hình ảnh game của tôi bị xóa đi?',
    attachments: ['https://ccdn.steak.io.vn/anVtcC1zY2FyZQ%3D%3D.jpeg'],
    repliedAt: '14-12-2005',
  },
  {
    id: 1234567890120,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'reviewer',
      id: 123812812,
    },
    content: 'Đã chỉnh sửa vì hình ảnh mang tính chất nhạy cảm.',
    attachments: [],
    repliedAt: '16-12-2005',
  },
  {
    id: 1234567890121,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'submitter',
      id: 9271823612,
    },
    content: 'Mình thấy ảnh đó không quá nhạy cảm, có thể cho phép được không?',
    attachments: [],
    repliedAt: '17-12-2005',
  },
  {
    id: 1234567890122,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'reviewer',
      id: 123812812,
    },
    content:
      'Ảnh chứa yếu tố gợi dục không phù hợp với đối tượng người chơi 13+. Vui lòng thay thế.',
    attachments: [],
    repliedAt: '17-12-2005',
  },
  {
    id: 1234567890123,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'submitter',
      id: 9271823612,
    },
    content: 'Mình đã thay hình ảnh khác, nhờ bên bạn kiểm tra lại giúp.',
    attachments: ['https://ccdn.steak.io.vn/ChabReview.mp4'],
    repliedAt: '18-12-2005',
  },
  {
    id: 1234567890124,
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'reviewer',
      id: 123812812,
    },
    content: 'Hình ảnh mới đã đạt yêu cầu. Ticket này sẽ được đóng.',
    attachments: [],
    repliedAt: '19-12-2005',
  },
])
const previousPage = () => {
  window.history.back()
}
const isClosed = ref(true)

const submitSendReply = () => {
  if (reply.value.trim() === '') return
  repliesData.value.push({
    id: Date.now(),
    gameSubmissionId: 729172873012031,
    ticketId: 1234567890123,
    from: {
      role: 'submitter',
      id: 9271823612,
    },
    content: reply.value,
    attachments: [],
    repliedAt: new Date().toLocaleDateString(),
  })
  reply.value = ''
}
</script>
