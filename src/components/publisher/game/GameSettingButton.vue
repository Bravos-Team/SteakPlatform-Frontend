<template>
  <dropdown-menu>
    <dropdown-menu-trigger as-child>
      <button class="cursor-pointer hover:rotate-45 transition-all duration-300 ease-in-out">
        <settings class="w-5 h-5" />
      </button>
    </dropdown-menu-trigger>
    <dropdown-menu-content align="end" side="top">
      <dropdown-menu-group>
        <dropdown-menu-item as-child>
          <Dialog>
            <dialog-trigger as-child>
              <button class="w-full text-left cursor-pointer font-bold">
                {{
                  $t(
                    'title.subPagesCompo.sidebar.publisher.game_management.actions.draft.delete_project.title',
                  )
                }}
              </button>
            </dialog-trigger>
            <dialog-content>
              <dialog-header>
                <dialog-title>
                  {{
                    $t(
                      'title.subPagesCompo.sidebar.publisher.game_management.actions.draft.delete_project.title',
                    )
                  }}
                </dialog-title>
                <dialog-description class="text-wrap">
                  {{
                    $t(
                      'title.subPagesCompo.sidebar.publisher.game_management.actions.draft.delete_project.description',
                    )
                  }}
                </dialog-description>
                <dialog-footer>
                  <div>
                    <button
                      class="w-20 bg-white/90 transition-all duration-300 hover:bg-white cursor-pointer text-red-500 rounded-sm font-bold"
                    >
                      {{ $t('title.pages.game_details.form.text_editor.mediabar.actions.delete') }}
                    </button>
                  </div>
                </dialog-footer>
              </dialog-header>
            </dialog-content>
          </Dialog>
        </dropdown-menu-item>
      </dropdown-menu-group>
    </dropdown-menu-content>
  </dropdown-menu>
</template>

<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Settings } from 'lucide-vue-next'
import { mutateDeleteDraftGameVersion } from '@/hooks/publisher/game/usePublisherGameManage'
import { useDebounceFn } from '@vueuse/core'

const props = defineProps<{
  gameId: string
}>()
const { mutateAsync: mutateDeleteDraftGame, isPending: isDeleteDraftGamePending } =
  mutateDeleteDraftGameVersion()

const handleDeleteDraftGame = useDebounceFn(async () => {
  try {
  } catch (err: any) {
    console.log(err)
  }
}, 500)
</script>
