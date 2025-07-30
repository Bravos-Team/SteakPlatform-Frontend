<template>
  <Form :validation-schema="formSchema" v-slot="{ handleSubmit, values }">
    <Dialog :open="showDialog" @update:open="showDialog = $event">
      <button
        @click="showDialog = true"
        class="flex bg-[#343437]/70 min-w-full tablet:w-fit hover:bg-[#343437]/90 cursor-pointer items-center rounded-md px-2 py-2 h-9/12 gap-x-1"
      >
        <Plus class="w-5 h-5" />
        {{ $t('title.pages.game_management.noti.create') }}
      </button>
      <DialogContent :hide-close-button="true" class="[&_[data-dialog-close]]:hidden">
        <dialog-close as-child>
          <button
            @click="handleCloseDialog"
            class="absolute right-2 top-2 cursor-pointer hover:bg-white/10 p-1 rounded-sm"
          >
            <X class="w-4 h-4" />
          </button>
        </dialog-close>
        <DialogHeader>
          <DialogTitle>Input your product name</DialogTitle>
        </DialogHeader>

        <form id="productNameForm" @submit.prevent="handleSubmit(onSubmit)">
          <FormField v-slot="{ componentField }" name="name">
            <FormItem>
              <FormLabel>Product Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Product Name..."
                  autofocus
                  tabindex="0"
                  v-bind="componentField"
                />
              </FormControl>
              <FormDescription>This is your game name in public games store</FormDescription>
              <FormMessage />
            </FormItem>
          </FormField>
        </form>

        <DialogFooter>
          <Button
            v-if="isPublisherCreateProjectPending"
            tabindex="1"
            form="productNameForm"
            class="w-30 cursor-not-allowed"
          >
            <LoaderCircle class="animate-spin" />
          </Button>
          <Button v-else type="submit" tabindex="1" form="productNameForm" class="w-30">
            <span> Create Product</span>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </Form>
</template>

<script setup lang="ts">
import { LoaderCircle, Plus } from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { usePublisherCreatePersonalProject } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import { X } from 'lucide-vue-next'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
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
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
// import { LoaderCircle } from 'lucide-vue-next'
import { onMounted, Ref, ref } from 'vue'
import { useQueryClient } from '@tanstack/vue-query'
import { PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS } from '@/hooks/constants/publisher/project/publisherPersonalProjectConstant'
import { PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS } from '@/types/publisher/project/PublisherPersonalProjectType'

const { isPending: isPublisherCreateProjectPending, mutateAsync: mutateAsyncPublisherProject } =
  usePublisherCreatePersonalProject()

const showDialog = ref(false)
const handleCloseDialog = () => (showDialog.value = false)
const formSchema = toTypedSchema(
  z.object({
    name: z.string().min(6, { message: 'Product name must be at least 6 characters long' }),
  }),
)

const props = defineProps<{
  filters: PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS
}>()
const queryClient = useQueryClient()
const filtersRef = ref<PUBLISHER_PERSONAL_PROJECT_TYPE_FILTERS>({ ...props.filters })
const onSubmit = async (values: { name: string }) => {
  try {
    const response = await mutateAsyncPublisherProject(values.name.toString(), {
      onSuccess: async () =>
        await queryClient.invalidateQueries({
          queryKey: PUBLISHER_PERSONAL_PROJECT_QUERY_KEYS.LIST(filtersRef),
        }),
    })
    showDialog.value = false
    if (response.status === 200) {
      toastSuccessNotificationPopup(
        'Create Product Success',
        `Product "${values.name}" created successfully!`,
      )
    }
  } catch (error: any) {
    toastErrorNotificationPopup('Create Product Error', `${error?.response?.data?.detail}.`)
  }
}
</script>
