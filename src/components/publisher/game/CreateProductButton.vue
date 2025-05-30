<template>
  <Form :validation-schema="formSchema" v-slot="{ handleSubmit, values }">
    <Dialog>
      <DialogTrigger as-child>
        <button
          class="flex bg-[#343437]/70 hover:bg-[#343437]/90 cursor-pointer items-center rounded-md px-2 py-2 h-9/12 gap-x-1"
        >
          <Plus class="w-5 h-5" />
          Create Product
        </button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Input your product name</DialogTitle>
        </DialogHeader>

        <form id="productNameForm" @submit.prevent="handleSubmit(onSubmit)">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input placeholder="Product Name..." v-bind="componentField" />
              </FormControl>
              <FormDescription>This is your game name in public games store</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button type="submit" form="productNameForm">Create Product</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
import { Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { toast } from 'vue-sonner'
import { h } from 'vue'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'

const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(1, { message: 'Product name is required' }),
  }),
)

type ProductNameType = {
  name: string
}

const onSubmit = (values: ProductNameType) => {
  toast(h('span', { class: 'text-white text-lg' }, `"${values.name}" has been created`), {
    description: h('div', { class: 'text-white' }, new Date().toLocaleString()),
    action: {
      label: 'Undo',
      onClick: () => console.log('Undo'),
    },
  })
}
</script>
