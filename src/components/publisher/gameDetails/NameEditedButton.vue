<template>
  <tooltip-provider>
    <tooltip>
      <Form :validation-schema="formSchema" v-slot="{ handleSubmit, values }">
        <Dialog :open="showDialog" @update:open="showDialog = $event">
          <tooltip-trigger as-child>
            <button
              @click="showDialog = !showDialog"
              class="cursor-pointer w-12 h-10 rounded-sm hover:bg-white/20 flex justify-center items-center"
            >
              <pen-line class="w-5 h-5" />
            </button>
          </tooltip-trigger>
          <tooltip-content :class="'bg-[#ffffff]/20 backdrop-blur-xl text-white'" :arrow="false">
            <span>Edit name</span>
          </tooltip-content>
          <dialog-content>
            <dialog-header>
              <dialog-title class="flex justify-center text-2xl">Edit your game name</dialog-title>
            </dialog-header>
            <form id="updateProductNameForm" @submit.prevent="handleSubmit(onSubmitUpdateName)">
              <form-field v-slot="{ componentField }" name="name">
                <form-item>
                  <form-label>Product Name</form-label>
                  <form-control>
                    <Input
                      placeholder="Product Name..."
                      :default-value="gameName"
                      v-bind="componentField"
                    />
                  </form-control>
                  <form-description>Changes your product name</form-description>
                  <form-message />
                </form-item>
              </form-field>
            </form>
            <dialog-footer>
              <Button
                variant="default"
                class="cursor-pointer min-w-32"
                form="updateProductNameForm"
              >
                <LoaderCircle v-if="isUpdateProjectGamePending" class="animate-spin" />
                <span v-else> Update Name</span>
              </Button>
            </dialog-footer>

            <dialog-description class="hidden"> </dialog-description>
          </dialog-content>
        </Dialog>
      </Form>
    </tooltip>
  </tooltip-provider>
</template>

<script setup lang="ts">
import { Input } from '@/components/ui/input'

import { Button } from '@/components/ui/button'
import { z } from 'zod'
import { toTypedSchema } from '@vee-validate/zod'
import { LoaderCircle, PenLine } from 'lucide-vue-next'
import {
  Dialog,
  DialogDescription,
  DialogTitle,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ref } from 'vue'
import { usePublisherUpdateProjectName } from '@/hooks/publisher/project/usePublisherPersonalProjects'
import {
  toastErrorNotificationPopup,
  toastSuccessNotificationPopup,
} from '@/composables/toast/toastNotificationPopup'
const { isPending: isUpdateProjectGamePending, mutateAsync: mutateAsyncUpdateProjectGame } =
  usePublisherUpdateProjectName()
const showDialog = ref(false)
const updateNameSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'Product name is required and must be at least 3 characters' }),
})
const formSchema = toTypedSchema(updateNameSchema)
type updateType = z.infer<typeof updateNameSchema>

const props = defineProps<{
  gameName: string
  gameId: bigint
}>()

const onSubmitUpdateName = async (name: updateType) => {
  try {
    const response = await mutateAsyncUpdateProjectGame({ id: props.gameId, name: name.name })
    if (response.status === 200) {
      showDialog.value = false
      toastSuccessNotificationPopup(
        'Game name updated successfully',
        `Your game name has been updated to: ${name.name}`,
      )
    } else {
      toastErrorNotificationPopup(
        'Failed to update game name',
        `Error: ${response.data.message || 'Unknown error'}`,
      )
    }
  } catch (error: any) {
    if (error.response && error.response.data) {
      return toastErrorNotificationPopup('Error updating game name', `Error: ${error?.message}`)
    }
    return toastErrorNotificationPopup(
      'Failed to update game name',
      'An unexpected error occurred while updating the game name.',
    )
  }
}
</script>
