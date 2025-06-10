<template>
  <tooltip-provider>
    <div
      class="flex flex-col @container border-2 rounded-sm overflow-hidden w-full col-span-2"
      v-if="editor"
    >
      <div class="flex justify-between w-full items-center px-3">
        <section
          id="buttons"
          class="flex gap-x-3 gap-y-1 w-full bg-transparent rounded-t-sm p-3 overflow-hidden"
        >
          <!-- START BLOCK QUOTES -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center pb-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START TOGGLE BLOCKQUOTE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleBlockquote().run()"
                    :class="{ 'bg-white/10': editor.isActive('blockquote') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <text-quote class="text-white cursor-pointer" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Toggle Blockquote </tooltip-content>
              </tooltip>
              <!-- END TOGGLE BLOCKQUOTE -->

              <!-- START ADD BLOCKQUOTE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().setBlockquote().run()"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <div class="relative">
                      <text-quote class="text-white cursor-pointer" />
                      <plus size="17" class="absolute -top-1 -right-2 stroke-3" />
                    </div>
                  </button>
                </tooltip-trigger>
                <tooltip-content> Add Blockquote </tooltip-content>
              </tooltip>
              <!-- END ADD BLOCKQUOTE -->
            </div>
          </div>
          <!-- END BLOCK QUOTES -->

          <!-- START BULLET LIST -->
          <div class="border-y-1 flex flex-col items-center justify-center border-gray-100/20">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START TOGGLE LIST -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleBulletList().run()"
                    :class="{ 'bg-white/10': editor.isActive('bulletList') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <List class="text-white cursor-pointer" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Toggle List </tooltip-content>
              </tooltip>
              <!-- END TOGGLE LISt -->

              <!-- START ADD BLOCK LIST (SPLIT) -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().splitListItem('listItem').run()"
                    :class="
                      editor.can().splitListItem('listItem') == false
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    "
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <list-plus class="text-white" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Add Block List </tooltip-content>
              </tooltip>
              <!-- END ADD BLOCK LIST (SPLIT) -->

              <!-- START UP LEVEL BLOCK LIST (SHINK) -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().sinkListItem('listItem').run()"
                    :class="
                      !editor.can().sinkListItem('listItem')
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    "
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <list-start class="text-white rotate-180" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Up level Block List </tooltip-content>
              </tooltip>
              <!-- END UP LEVEL BLOCK LIST (SHINK) -->

              <!-- START DOWN LEVEL BLOCK LIST (LIFT) -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().liftListItem('listItem').run()"
                    class="p-1 rounded-full hover:bg-white/20"
                    :class="
                      !editor.can().liftListItem('listItem')
                        ? 'cursor-not-allowed'
                        : 'cursor-pointer'
                    "
                  >
                    <list-start class="text-white scale-x-[-1] rotate-180" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Up level Block List </tooltip-content>
              </tooltip>
              <!-- END DOWN LEVEL BLOCK LIST (LIFT) -->
            </div>
          </div>
          <!-- END BULLET LIST -->

          <!-- START DETAILS -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center pb-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START SET DETAILS -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().setHardBreak().run()"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <wrap-text class="text-white" />
                  </button>
                </tooltip-trigger>
                <tooltip-content> Break Line </tooltip-content>
              </tooltip>
              <!-- END SET DETAILS -->
            </div>
          </div>
          <!-- END DETAILS -->
        </section>

        <div class="flex gap-x-3 w-full justify-end">
          <div class="flex gap-x-1 items-center shrink-0">
            <span>Invert color</span>
            <Switch @update:model-value="invertDarkMode = $event" />
          </div>
          <!-- START TEXTEDITOR HELPS -->
          <Helps />
          <!-- END TEXTEDITOR HELPS -->
        </div>
      </div>
      <section
        id="text-editor"
        :class="{
          'invert-100': invertDarkMode,
          invert: invertDarkMode,
        }"
        class="w-full flex col-span-2 min-h-[10rem] overflow-hidden rounded-b-sm border border-t-0"
      >
        <EditorContent class="!w-full p-3 bg-black text-white" :editor="editor" />
      </section>
    </div>
  </tooltip-provider>
</template>

<script setup>
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount } from 'vue'
import Helps from '@/components/common/texteditor/Helps.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { TextQuote, Plus, List, WrapText, ListPlus, ListStart, ArrowBigUp } from 'lucide-vue-next'
import StarterKit from '@tiptap/starter-kit'
import { Switch } from '@/components/ui/switch'
import HardBreak from '@tiptap/extension-hard-break'
import { ref } from 'vue'

const invertDarkMode = ref(false)

const editor = new Editor({
  extensions: [
    StarterKit.configure(
      {
        HTMLAttributes: {
          class: 'min-h-[20rem]',
        },
        document: {
          HTMLAttributes: {},
        },
        blockquote: {
          HTMLAttributes: {
            class: 'border-l-3 border-black dark:border-white px-2',
          },
        },
        bulletList: {
          HTMLAttributes: {
            class: 'pl-4 my-5 mr-4 ml-2',
          },
        },
        listItem: {
          HTMLAttributes: {
            class: 'list-disc marker:text-sky-400 *:marker:text-white',
          },
        },
        orderedList: {
          HTMLAttributes: {
            class: 'list-none pl-4 my-5 mr-4 ml-2',
          },
        },
      },
      HardBreak.configure({
        keepMarks: true,
      }),
    ),
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl  focus:outline-none h-full ',
    },
  },
  content: `
  <p>
      Enter your own game descriptions!
          </p>
          <p>Steak Corporation</p>
  `,
})

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.tiptap {
  height: 1000px;
}
</style>
