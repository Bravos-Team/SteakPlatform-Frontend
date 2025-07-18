<template>
  <tooltip-provider>
    <tooltip>
      <tooltip-trigger>
        <Popover>
          <popover-trigger>
            <circle-help class="w-5 h-5 cursor-pointer" />
          </popover-trigger>
          <popover-content
            class="w-[23rem] laptop:w-[80rem]"
            align="end"
            side="top"
            :collisionPadding="{ top: 30, left: 30 }"
          >
            <div class="flex flex-col w-full">
              <!-- START HEADER COMMANDS -->
              <div
                class="grid grid-cols-2 laptop:grid-cols-4 py-1 gap-x-20 bg-white/10 rounded-sm laptop:w-full w-full"
              >
                <span class="text-center text-lg font-black">Command</span>
                <span class="text-center text-lg font-black laptop:block hidden"
                  >Windows/Linux</span
                >
                <span class="text-end font-black text-l laptop:block hidden">macOS</span>

                <span class="text-center font-black text-l">Tips</span>
              </div>
              <!-- END HEADER COMMANDS -->

              <!-- START TUTORIALS-->
              <scroll-area class="h-[20rem] w-full">
                <div
                  v-for="node in nodesTutorial"
                  :key="node.id"
                  class="flex justify-between laptop:justify-around gap-x-15 text-sm w-full border-b-1 mt-5 pb-1"
                >
                  <!-- START TITLE -->
                  <span
                    class="text-sm text-center basis-34 laptop:basis-64 flex items-center justify-center"
                    >{{ node.title }}</span
                  >
                  <!-- END TITLE -->

                  <!-- START INPUTS-->
                  <div
                    v-if="node.inputs"
                    class="hidden laptop:grid laptop:grid-cols-2 gap-x-5 py-1 basis-200 last:border-b-0 pb-3"
                  >
                    <span
                      class="flex gap-x-2 justify-center w-full"
                      v-for="(inputsOs, index) in node.inputs"
                      :key="index"
                    >
                      <template v-for="(input, indexInput) in inputsOs">
                        <div class="flex gap-x-1 items-center" v-if="typeof input !== 'string'">
                          <div class="px-2 py-1 border rounded-sm bg-white/10">
                            <component :is="input" class="size-4 border rounded-sm bg-white/10" />
                          </div>
                        </div>
                        <span v-else class="border rounded-sm px-2 bg-white/10">{{ input }} </span>
                        <div v-if="inputsOs.length === 4">
                          <span v-if="indexInput === inputsOs.length - 3">,</span>
                          <span
                            v-if="
                              indexInput != inputsOs.length - 1 && indexInput != inputsOs.length - 3
                            "
                            >+</span
                          >
                        </div>
                        <div v-else>
                          <span v-if="indexInput < inputsOs.length - 1">+</span>
                        </div>
                      </template>
                    </span>
                  </div>
                  <div
                    v-else
                    class="justify-center hidden items-center laptop:grid grid-cols-2 basis-190 h-full pb-3"
                  >
                    <span class="w-full font-medium text-center align-middle h-full"> none </span>

                    <span class="w-full font-medium text-center"> none </span>
                  </div>
                  <!-- END INPUTS-->

                  <!-- START SHORT_KEYS -->
                  <div
                    class="flex gap-x-1 items-center basis-34 justify-center"
                    v-if="node.short_key"
                  >
                    <span
                      class="text-sm text-center flex items-center me-1 w-full justify-center"
                      v-for="(key, keyIndex) in node.short_key?.keys"
                    >
                      <tooltip>
                        <tooltip-trigger as-child>
                          <span class="border px-2 rounded-sm bg-white/10">
                            {{ key }}
                          </span>
                        </tooltip-trigger>
                        <tooltip-content class="w-[27rem] text-center">
                          <span
                            class="font-medium w-full text-center text-pretty"
                            v-html="node.short_key?.descriptions"
                          ></span>
                        </tooltip-content>
                      </tooltip>
                      <span v-if="keyIndex < node.short_key.keys.length - 1">,</span>
                    </span>
                  </div>
                  <div v-else class="flex justify-center items-center basis-34">
                    <span class="w-full font-medium text-center"> none </span>
                  </div>
                  <!-- END SHORT_KEYS-->
                </div>
              </scroll-area>
              <!-- END TUTORIALS-->
            </div>
          </popover-content>
        </Popover>
      </tooltip-trigger>
      <TooltipContent :color="1">
        <span class="font-medium"> {{ $t('navigation.help') }}</span>
      </TooltipContent>
    </tooltip>
  </tooltip-provider>
</template>

<script setup lang="ts">
import { CircleHelp, Command } from 'lucide-vue-next'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
const nodesTutorial = [
  {
    id: 1,
    title: 'Toggle Blockquote',
    inputs: {
      win_linux: ['Control', 'Shift', 'B'],
      macOs: [Command, 'Shift', 'B'],
    },
    short_key: {
      keys: ['>'],
      descriptions: `Type <span class='border px-2 rounded-sm bg-gray-900/10'>></span>  at the beginning of a new line and it will magically transform to a blockquote.`,
    },
  },

  {
    id: 2,
    title: 'Bullet List',
    inputs: {
      win_linux: ['Control', 'Shift', '8'],
      macOs: [Command, 'Shift', '8'],
    },
    short_key: {
      keys: ['<ul>', '*', '-', '+'],
      descriptions: `Type<span class='border px-2 rounded-sm bg-gray-900/10'>*</span> , <span class='border px-2 rounded-sm bg-gray-900/10'>-</span> or <span class='border px-2 rounded-sm bg-gray-900/10'>+</span> at the beginning of a new line and it will magically transform to a bullet list.
      `,
    },
  },

  {
    id: 3,
    title: 'Break Line',
    inputs: {
      win_linux: ['Shift', 'Enter', 'Control', 'Enter'],
      macOs: ['Shift', 'Enter', Command, 'Enter'],
    },
  },

  {
    id: 4,
    title: 'Heading{level}',
    inputs: {
      win_linux: ['Control', 'Alt', '{ level: number }'],
      macOs: [Command, 'Alt', '{ level: number }'],
    },

    short_key: {
      keys: ['##'],
      descriptions: `Type <span class='border px-2 rounded-sm bg-gray-900/10'>#</span>,
<span class='border px-2 rounded-sm bg-gray-900/10'>##</span>,
<span class='border px-2 rounded-sm bg-gray-900/10'>###</span>,
<span class='border px-2 rounded-sm bg-gray-900/10'>####</span>,
<span class='border px-2 rounded-sm bg-gray-900/10'>#####</span> or
<span class='border px-2 rounded-sm bg-gray-900/10'>######</span> at the beginning of a new line and it will magically transform to a heading.`,
    },
  },

  {
    id: 5,
    title: 'Dashed Line',
    short_key: {
      keys: ['---', '___{enter}'],
      descriptions: `
  Type
  <span class='border px-2 rounded-sm bg-gray-900/10'>---</span> or
  <span class='border px-2 rounded-sm bg-gray-900/10'>___&nbsp;</span>
  at the beginning of a new line and it will magically transform to a horizontal rule.
`,
    },
  },

  {
    id: 6,
    title: 'Bold',
    inputs: {
      win_linux: ['Control', 'B'],
      macOs: [Command, 'B'],
    },
    short_key: {
      keys: ['**_**', '__{text}__'],
      descriptions: `
Type **two asterisks** or __two underlines__ and it will magically transform to bold text while you type.
      `,
    },
  },

  {
    id: 7,
    title: 'Highlight',
    inputs: {
      win_linux: ['Control', 'Shift', 'H'],
      macOs: [Command, 'Shift', 'H'],
    },
    short_key: {
      keys: ['=={text}=='],
      descriptions: `
Type ==two equal signs== and it will magically transform to highlighted text while you type.
      `,
    },
  },

  {
    id: 8,
    title: 'Italic',
    inputs: {
      win_linux: ['Control', 'I'],
      macOs: [Command, 'I'],
    },
    short_key: {
      keys: ['*{text}*', '_{text}_'],
      descriptions: `
Type *one asterisk* or _one underline_ and it will magically transform to italic text while you type.
      `,
    },
  },

  {
    id: 9,
    title: 'Strike',
    inputs: {
      win_linux: ['Control', 'Shift', 'S'],
      macOs: [Command, 'Shift', 'S'],
    },
    short_key: {
      keys: ['~~{text}~~'],
      descriptions: `
Type ~~ text between tildes ~~ and it will be magically striked through while you type.
      `,
    },
  },

  {
    id: 10,
    title: 'Subscript',
    inputs: {
      win_linux: ['Control', ','],
      macOs: [Command, ','],
    },
  },

  {
    id: 11,
    title: 'Superscript',
    inputs: {
      win_linux: ['Control', '.'],
      macOs: [Command, '.'],
    },
  },
]
</script>
