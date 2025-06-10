<template>
  <popover>
    <popover-trigger as-child>
      <button
        class="w-full border-2 gap-x-1 items-center px-3 border-double rounded-sm flex text-left font-normal bg-white/10 cursor-pointer"
        :clas="cn(!value && 'text-muted-foreground')"
      >
        <calendar-icon class="mr-2 size-4" />
        {{
          value ? dateFormatter.format(value.toDate(getLocalTimeZone())) : 'Pick your release date'
        }}
      </button>
    </popover-trigger>
    <popover-content
      side="bottom"
      class="flex w-auto flex-col gap-y-1 outline-0 ring-0 border-0 overflow-hidden p-2"
    >
      <Select
        @update:model-value="
          (v: any) => {
            if (!v) return
            value = today(getLocalTimeZone()).add({ days: Number(v) })
          }
        "
      >
        <select-trigger class="w-full flex">
          <select-value placeholder="Pick your release date" class="w-full flex"> </select-value>
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
import { DateFormatter, type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { CalendarIcon } from 'lucide-vue-next'
import { ref, h, watch } from 'vue'
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

watch(
  () => value.value,
  (newVal) => {
    if (newVal) {
      toast(
        h(
          'pre',
          { class: 'text-white text-sm z-999 flex text-wrap' },
          h('code', `"This game will be released on (${newVal})"`),
        ),
        {
          class: 'z-[9999] max-w-[20rem]',
        },
      )
    }
  },
)
</script>
