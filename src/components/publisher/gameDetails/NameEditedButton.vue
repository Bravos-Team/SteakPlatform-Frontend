<template>
  <tooltip-provider>
    <tooltip>
      <Form
        v-if="gameName"
        :validate-on-mount="false"
        :initial-touched="{ name: false }"
        :keep-values="true"
        :validation-schema="formSchema"
        v-slot="{ handleSubmit, values }"
      >
        <Dialog :open="showDialog" @update:open="showDialog = $event">
          <tooltip-trigger as-child>
            <button
              @click="showDialog = !showDialog"
              class="cursor-pointer w-12 h-10 rounded-sm bg-black/40 transition-colors duration-300 hover:bg-black/20 flex justify-center items-center"
            >
              <pen-line class="w-5 h-5" />
            </button>
          </tooltip-trigger>
          <tooltip-content
            :color="1"
            :class="' bg-[#101014]/20 backdrop-blur-xl text-white'"
            :arrow="false"
          >
            <span> {{ $t('title.pages.game_details.actions.update_name') }}</span>
          </tooltip-content>
          <dialog-content>
            <dialog-header>
              <dialog-title class="flex justify-center text-2xl">
                <span> {{ $t('title.pages.game_details.dialog.title') }}</span>
              </dialog-title>
            </dialog-header>
            <form id="updateProductNameForm" @submit.prevent="handleSubmit(onSubmitUpdateName)">
              <form-field v-slot="{ componentField }" name="name">
                <form-item>
                  <form-label>
                    <span>
                      {{ $t('title.pages.game_details.dialog.name') }}
                    </span>
                  </form-label>
                  <form-control>
                    <Input
                      placeholder="Product Name..."
                      :default-value="gameName"
                      v-bind="componentField"
                    />
                  </form-control>
                  <form-description>
                    {{ $t('title.pages.game_details.dialog.description') }}
                  </form-description>
                  <form-message />
                </form-item>
              </form-field>
            </form>
            <dialog-footer>
              <Button
                v-if="isUpdateProjectGamePending"
                variant="default"
                class="min-w-32 cursor-not-allowed"
              >
                <LoaderCircle class="animate-spin" />
              </Button>
              <tooltip v-else>
                <tooltip-trigger>
                  <Button
                    variant="default"
                    :class="cn(isGameNameValid ? '' : 'cursor-not-allowed')"
                    class="min-w-32"
                    form="updateProductNameForm"
                  >
                    <span> {{ $t('title.pages.game_details.dialog.button') }}</span>
                  </Button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.dialog.error.update_name') }}
                </tooltip-content>
              </tooltip>
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
import { cn } from '@/lib/utils'
import i18n from '@/i18n'
const { isPending: isUpdateProjectGamePending, mutateAsync: mutateAsyncUpdateProjectGame } =
  usePublisherUpdateProjectName()
const showDialog = ref(false)
const updateNameSchema = z.object({
  name: z
    .string()
    .min(6, i18n.global.t('title.pages.game_details.dialog.error.update_name'))
    .max(50, i18n.global.t('title.pages.game_details.dialog.error.update_name_max_length')),
})
const formSchema = toTypedSchema(updateNameSchema)
type updateType = z.infer<typeof updateNameSchema>

const props = defineProps<{
  gameName: string
  gameId: bigint
}>()

const isGameNameValid = ref<boolean>(true)

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
