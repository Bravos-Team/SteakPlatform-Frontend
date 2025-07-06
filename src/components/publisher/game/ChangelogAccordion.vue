<template>
  <Accordion type="single" class="w-full" collapsible :default-value="defaultValue">
    <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
      <AccordionTrigger class="text-white font-bold capitalize">{{ item.title }}</AccordionTrigger>
      <AccordionContent>
        {{ item.content }}
      </AccordionContent>
    </AccordionItem>
  </Accordion>
</template>
<script setup lang="ts">
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const defaultValue = ''

const accordionItems = [
  {
    value: 'item-1',
    title: 'Is Trinh Van Thuat Gay?',
    content: 'Yes. he is!.',
  },
  {
    value: 'item-2',
    title: 'Is Quoc Bao has a fat ass?',
    content: 'Yes. he is, he has a 900 pound ass.',
  },
  {
    value: 'item-3',
    title: 'Is Chan Phong Pretty Handsome?',
    content: 'Yes! he is.',
  },
]
</script>
