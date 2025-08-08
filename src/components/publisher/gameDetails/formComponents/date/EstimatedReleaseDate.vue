<template>
  <popover>
    <popover-trigger as-child>
      <button
        class="w-full border-2 gap-x-1 items-center px-3 border-double rounded-sm flex text-left font-normal bg-white/10 cursor-pointer"
        :class="cn(!value && 'text-muted-foreground')">
        <calendar-icon class="mr-2 size-4" />
        {{ displayDateText }}
      </button>
    </popover-trigger>
    <popover-content side="bottom" class="flex w-auto flex-col gap-y-1 outline-0 ring-0 border-0 overflow-hidden p-2">
      <Select @update:model-value="
        (v: any) => {
          if (!v) return
          value = today(getLocalTimeZone()).add({ days: Number(v) })
        }
      ">
        <select-trigger class="w-full flex">
          <select-value :placeholder="emitEstimatedReleaseDate ? '' : 'Pick your release date'"
            class="w-full flex"></select-value>
        </select-trigger>
        <select-content side="right">
          <select-item :value="item.value.toString()" v-for="item in items" :key="item.value">{{
            item.label
          }}</select-item>
        </select-content>
      </Select>
      <Calendar v-model="value" />
    </popover-content>
  </popover>
</template>

<script setup lang="ts">
import {
  DateFormatter,
  type DateValue,
  parseDate,
  getLocalTimeZone,
  today,
} from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref, h, watch, onMounted, computed } from 'vue'
import { toast } from 'vue-sonner'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { toastErrorNotificationPopup } from '@/composables/toast/toastNotificationPopup'

const dateFormatter = new DateFormatter('vi-VN', {
  dateStyle: 'long',
})

const items = [
  { value: 0, label: 'Today' },
  { value: 1, label: 'Tomorrow' },
  { value: 3, label: 'In 3 days' },
  { value: 7, label: 'In a week' },
]

const value = ref<DateValue | undefined | DateValue[]>()
const emitEstimatedReleaseDate = defineModel<string | number>('emitEstimatedReleaseDate')
const displayDateText = ref<string | number>('Please select a release date')

watch(
  () => value.value,
  (newVal) => {
    if (newVal) {
      if (newVal.toDate(getLocalTimeZone()).getTime() < new Date().getTime()) {
        toast.error('Release date cannot be in the past.')
        return
      }
      const isoDate = newVal.toString() // => YYYY-MM-DD (ISO)
      const longDate = newVal.toDate(getLocalTimeZone()).getTime()
      const formatted = dateFormatter.format(newVal.toDate(getLocalTimeZone()))

      displayDateText.value = isoDate
      emitEstimatedReleaseDate.value = longDate.toString()

      toast(
        h(
          'pre',
          { class: 'text-white text-sm z-999 flex text-wrap' },
          h('code', `"Game sẽ phát hành ngày ${formatted} (ISO: ${isoDate})"`),
        ),
        {
          class: 'z-[9999] max-w-[20rem]',
        },
      )
    }
  },
)

onMounted(() => {
  if (emitEstimatedReleaseDate.value) {
    displayDateText.value = new Date(emitEstimatedReleaseDate.value).toISOString().split('T')[0]
  }
})
</script>
