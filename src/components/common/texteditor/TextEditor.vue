<template>
  <tooltip-provider>
    <div
      class="flex flex-col @container border-2 rounded-sm overflow-hidden w-full col-span-2 p-2 bg-linear-120 from-violet-200/10 to-violet-400/10"
      v-if="editor"
    >
      <div class="flex gap-x-3 w-full justify-between">
        <div
          class="flex tablet:flex-row flex-col gap-x-3 w-full justify-center mobile:items-end tablet:justify-end"
        >
          <!-- START CHARS COUNTS -->
          <div
            :class="{
              'character-count': true,
              'character-count--warning': editor.storage.characterCount.characters() === charsLimit,
            }"
          >
            <svg height="20" width="20" viewBox="0 0 20 20">
              <circle r="10" cx="10" cy="10" fill="gray" />
              <circle
                r="5"
                cx="10"
                cy="10"
                fill="white"
                stroke="greenyellow"
                stroke-width="10"
                :stroke-dasharray="`${(percentage / 100) * 31.4} 31.4`"
                transform="rotate(-90) translate(-20)"
              />
              <circle r="6" cx="10" cy="10" fill="#2B2A34" />
            </svg>

            {{ editor.storage.characterCount.characters() }} / {{ charsLimit }}
            {{ $t('title.pages.game_details.form.text_editor.char_limited.char') }}
            <br />
            {{ editor.storage.characterCount.words() }}
            {{ $t('title.pages.game_details.form.text_editor.char_limited.words') }}
          </div>
          <!-- END CHARS COUNTS -->

          <div class="flex gap-x-3 w-full h-full justify-end">
            <!-- START INVERT COLOR -->
            <div class="flex gap-x-3 items-center shrink-0">
              <div class="flex gap-x-1 items-center shrink-0">
                <span> {{ $t('title.pages.game_details.form.text_editor.invert_color') }}</span>
                <Switch @update:model-value="invertDarkMode = $event" />
              </div>
            </div>
            <!-- END INVERT COLOR -->

            <!-- START TEXTEDITOR HELPS -->
            <Helps />
            <!-- END TEXTEDITOR HELPS -->
          </div>
        </div>
      </div>
      <div class="w-full items-center flex flex-col">
        <section
          id="buttons"
          class="flex flex-wrap gap-x-3 gap-y-1 w-full bg-transparent rounded-t-sm py-1"
        >
          <!-- START MARKS DOWN -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START TOGGLE BOLD -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleBold().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('bold') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <bold
                      :class="editor.isActive('bold') ? '-skew-x-6' : ''"
                      class="text-white cursor-pointer"
                    />
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.bold') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE BOLD -->

              <!-- START HIGHTLER -->
              <div class="flex gap-x-2 justify-between items-center w-full">
                <Popover>
                  <tooltip>
                    <tooltip-trigger as-child>
                      <popover-trigger :is-hide-icon="true" class="border-0 !bg-none" as-child>
                        <button class="p-1 rounded-full hover:bg-white/20 cursor-pointer">
                          <highlighter class="text-white cursor-pointer" />
                        </button>
                      </popover-trigger>
                      <popover-content
                        side="top"
                        class="flex flex-col w-full justify-center gap-y-1"
                      >
                        <!-- START COLOR PICKER -->
                        <label
                          class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                        >
                          <span>
                            {{ $t('title.pages.game_details.form.text_editor.color_picker') }}</span
                          >
                          <input
                            type="color"
                            class="cursor-crosshair"
                            v-model="highlighterColorHex"
                          />
                        </label>
                        <!-- END COLOR PIKCER -->

                        <!-- START ADD HIGHLIGHT -->
                        <button
                          @click="
                            editor
                              .chain()
                              .focus()
                              .toggleHighlight({ color: highlighterColorHex })
                              .run()
                          "
                          :class="
                            editor.isActive('highlight', { color: highlighterColorHex })
                              ? 'bg-white/20'
                              : ''
                          "
                          class="w-full px-3 py-1 rounded-sm font-medium bg-white/5 hover:bg-white/10 cursor-pointer"
                        >
                          {{ $t('title.pages.game_details.form.text_editor.highlight') }}
                        </button>
                        <!-- END ADD HIGHLIGHT -->
                      </popover-content>
                    </tooltip-trigger>
                    <tooltip-content>
                      {{ $t('title.pages.game_details.form.text_editor.toggle_highlight') }}
                    </tooltip-content>
                  </tooltip>
                </Popover>
              </div>
              <!-- END HIGHTLER -->

              <!-- START TOGGLE ITALIC -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleItalic().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('italic') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <italic class="text-white cursor-pointer" />
                  </button>
                </tooltip-trigger>
                <tooltip-content :color="1">
                  {{ $t('title.pages.game_details.form.text_editor.italic') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE ITALIC -->

              <!-- START LINK EMBBED -->
              <div clVdass="flex gap-x-2 justify-between items-center w-full">
                <!-- START ENTER URL -->
                <Popover>
                  <tooltip>
                    <tooltip-trigger as-child>
                      <popover-trigger>
                        <button class="p-1 rounded-full hover:bg-white/20 cursor-pointer">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                          >
                            <path
                              fill="none"
                              stroke="currentColor"
                              stroke-dasharray="28"
                              stroke-dashoffset="28"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              stroke-width="2"
                              d="M13 6l2 -2c1 -1 3 -1 4 0l1 1c1 1 1 3 0 4l-5 5c-1 1 -3 1 -4 0M11 18l-2 2c-1 1 -3 1 -4 0l-1 -1c-1 -1 -1 -3 0 -4l5 -5c1 -1 3 -1 4 0"
                            >
                              <animate
                                fill="freeze"
                                attributeName="stroke-dashoffset"
                                dur="0.6s"
                                values="28;0"
                              />
                            </path>
                          </svg>
                        </button>
                      </popover-trigger>
                      <popover-content side="top" class="w-full">
                        <div class="flex flex-col gap-y-1">
                          <!-- START SET LINK TO TEXT -->
                          <div class="flex gap-x-2 w-full items-center">
                            <div class="flex flex-col gap-y-1">
                              <input
                                type="text"
                                v-model="setLinkToText"
                                class="w-full border rounded-sm px-3 h-[2rem] !outline-none ring-2 ring-gray-300/20 focus:ring-gray-300/50"
                                :placeholder="
                                  $t('title.pages.game_details.form.text_editor.embed_link_des')
                                "
                              />
                              <span v-if="errorLinkToTextMessage" class="text-red-500">{{
                                errorLinkToTextMessage
                              }}</span>
                            </div>

                            <button
                              class="bg-white/10 px-2 py-2 h-full rounded-sm cursor-pointer"
                              @click="hanldeSetLinkToText"
                            >
                              {{ $t('title.pages.game_details.form.text_editor.embed') }}
                            </button>
                          </div>
                          <!-- END SET LINK TO TEXT -->

                          <!-- START UNSET LINK TO TEXT -->
                          <button
                            @click="editor.chain().focus().unsetLink().run()"
                            :class="
                              !editor.isActive('link') ? 'cursor-not-allowed' : 'cursor-pointer'
                            "
                            class="w-full text-center flex items-center justify-center px-2 py-1 gap-x-1 hover:bg-white/10 bg-white/3 rounded-sm"
                          >
                            <Unlink class="size-5" />Unset link to text
                          </button>
                          <!-- END UNSET LINK TO TEXT -->
                        </div>
                      </popover-content>
                    </tooltip-trigger>
                    <tooltip-content>
                      {{ $t('title.pages.game_details.form.text_editor.embed_link_to_text') }}
                    </tooltip-content>
                  </tooltip>
                </Popover>
                <!-- END ENTER URL -->
              </div>
              <!-- END LINK EMBBED -->

              <!-- START TOGGLE STRIKE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleStrike().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('strike') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M10 19h4v-3h-4zM5 4v3h5v3h4V7h5V4zM3 14h18v-2H3z"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.strike') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE STRIKE -->

              <!-- START TOGGLE SUBSCRIPT -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleSubscript().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('subscript') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M2.22 4.22a.75.75 0 0 1 1.06 0L6 6.94l2.72-2.72a.75.75 0 0 1 1.06 1.06L7.06 8l2.72 2.72a.75.75 0 1 1-1.06 1.06L6 9.06l-2.72 2.72a.75.75 0 0 1-1.06-1.06L4.94 8L2.22 5.28a.75.75 0 0 1 0-1.06m10.407 6.782H11V10h1.627c.362 0 .71.144.967.402a1.392 1.392 0 0 1-.17 2.11l-.675.486h1.232V14H11v-.974l1.847-1.33a.385.385 0 0 0 .047-.583a.38.38 0 0 0-.267-.111"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.subscript') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE SUBSCRIPT -->

              <!-- START TOGGLE SUPERSCRIPT -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleSuperscript().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('superscript') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="m4 19l8-8m0 8l-8-8m16 1h-4c0-1.5.442-2 1.5-2.5S20 8.334 20 7.002c0-.472-.17-.93-.484-1.29a2.105 2.105 0 0 0-2.617-.436c-.42.239-.738.614-.899 1.06"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.superscript') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE SUPERSCRIPT -->

              <!-- START TOGGLE UNDERLINE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleUnderline().run()"
                    :class="{ 'bg-white/10 italic ': editor.isActive('underline') }"
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 5v5a5 5 0 0 0 10 0V5M5 19h14"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.underline') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE UNDERLINE -->
            </div>
          </div>
          <!-- END MARKS DOWN -->

          <!-- START BLOCK QUOTES -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.blockquote') }}
                </tooltip-content>
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.add_blockquote') }}
                </tooltip-content>
              </tooltip>
              <!-- END ADD BLOCKQUOTE -->
            </div>
          </div>
          <!-- END BLOCK QUOTES -->

          <!-- START BULLET LIST -->
          <div class="border-y-1 flex flex-col items-center justify-center py-1 border-gray-100/20">
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.list') }}
                </tooltip-content>
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.add_list') }}
                </tooltip-content>
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.up_level_block_list') }}
                </tooltip-content>
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
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.down_level_block_list') }}
                </tooltip-content>
              </tooltip>
              <!-- END DOWN LEVEL BLOCK LIST (LIFT) -->
            </div>
          </div>
          <!-- END BULLET LIST -->

          <!-- START BREAK LINE -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().setHardBreak().run()"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <wrap-text class="text-white" />
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.break_block_list_line') }}
                </tooltip-content>
              </tooltip>
            </div>
          </div>
          <!-- END BREAK LINE -->

          <!-- START HEADING -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <Popover>
                <tooltip>
                  <tooltip-trigger as-child>
                    <popover-trigger :is-hide-icon="true" class="border-0 !bg-none" as-child>
                      <button class="p-1 rounded-full hover:bg-white/20 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="white"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          class="lucide lucide-heading-icon lucide-heading"
                        >
                          <path d="M6 12h12" />
                          <path d="M6 20V4" />
                          <path d="M18 20V4" />
                        </svg>
                      </button>
                    </popover-trigger>
                    <popover-content side="top" class="flex flex-col w-full justify-center gap-y-1">
                      <!-- START HEADING 1 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                        :class="editor.isActive('heading', { level: 1 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading1 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }} 1</span
                        >
                      </button>
                      <!-- END HEADING 1 -->

                      <!-- START HEADING 2 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                        :class="editor.isActive('heading', { level: 2 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading2 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }}
                          2</span
                        >
                      </button>
                      <!-- END HEADING 2 -->

                      <!-- START HEADING 3 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                        :class="editor.isActive('heading', { level: 3 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading3 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }} 3</span
                        >
                      </button>
                      <!-- END HEADING 3 -->

                      <!-- START HEADING 4 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                        :class="editor.isActive('heading', { level: 4 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading4 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }} 4</span
                        >
                      </button>
                      <!-- END HEADING 4 -->

                      <!-- START HEADING 5 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                        :class="editor.isActive('heading', { level: 5 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading5 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }} 5</span
                        >
                      </button>
                      <!-- END HEADING 5 -->

                      <!-- START HEADING 6 -->
                      <button
                        @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                        :class="editor.isActive('heading', { level: 6 }) ? 'bg-white/20' : ''"
                        class="cursor-pointer p-1 rounded-sm hover:bg-white/20 flex items-center gap-x-1"
                      >
                        <heading6 class="text-white size-5" />
                        <span class="text-sm font-medium">
                          {{ $t('title.pages.game_details.form.text_editor.heading') }} 6</span
                        >
                      </button>
                      <!-- END HEADING 6 -->
                    </popover-content>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ $t('title.pages.game_details.form.text_editor.heading') }}
                  </tooltip-content>
                </tooltip>
              </Popover>
            </div>
          </div>
          <!-- END HEADING -->

          <!-- START DASHED LINE -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().setHorizontalRule().run()"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <Minus class="text-white" />
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.add_dashed_line') }}
                </tooltip-content>
              </tooltip>
            </div>
          </div>
          <!-- END DASHED LINE -->

          <!-- START ADD IMAGE -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <Popover>
                <tooltip>
                  <tooltip-trigger as-child>
                    <popover-trigger>
                      <button class="p-1 rounded-full hover:bg-white/20 cursor-pointer">
                        <FileImage class="text-white" />
                      </button>
                    </popover-trigger>
                    <popover-content side="top" class="w-full">
                      <div class="flex gap-x-2 w-full items-center">
                        <div class="flex flex-col gap-y-1">
                          <input
                            type="text"
                            v-model="imageUrl"
                            class="w-full border rounded-sm px-3 h-[2rem] !outline-none ring-2 ring-gray-300/20 focus:ring-gray-300/50"
                            :placeholder="
                              $t('title.pages.game_details.form.text_editor.embed_image_url')
                            "
                          />
                        </div>

                        <button
                          class="bg-white/10 px-2 py-2 h-full rounded-sm cursor-pointer"
                          @click="addImage"
                        >
                          {{ $t('title.pages.game_details.form.text_editor.embed') }}
                        </button>
                      </div>
                    </popover-content>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ $t('title.pages.game_details.form.text_editor.add_image') }}
                  </tooltip-content>
                </tooltip>
              </Popover>
            </div>
          </div>
          <!-- END ADD IMAGE -->

          <!-- START TABLE -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START ADD TABLE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="
                      editor
                        .chain()
                        .focus()
                        .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
                        .run()
                    "
                    class="p-1 rounded-full hover:bg-white/20"
                  >
                    <sheet class="text-white cursor-pointer" />
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.add_table') }}
                </tooltip-content>
              </tooltip>
              <!-- END ADD TABLE -->

              <!-- START ADD COLUMN -->
              <Popover>
                <tooltip>
                  <tooltip-trigger as-child>
                    <popover-trigger as-child>
                      <button class="p-1 rounded-full hover:bg-white/20">
                        <between-vertical-start class="text-white cursor-pointer" />
                      </button>
                    </popover-trigger>
                    <popover-content class="flex flex-col gap-y-1 w-full" side="top">
                      <button
                        @click="editor.chain().focus().addColumnBefore().run()"
                        class="w-full px-3 py-1 rounded-sm font-medium bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        {{ $t('title.pages.game_details.form.text_editor.add_before') }}
                      </button>
                      <button
                        @click="editor.chain().focus().addColumnAfter().run()"
                        class="w-full px-3 py-1 font-medium rounded-sm bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        {{ $t('title.pages.game_details.form.text_editor.add_after') }}
                      </button>
                    </popover-content>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ $t('title.pages.game_details.form.text_editor.add_column') }}
                  </tooltip-content>
                </tooltip>
              </Popover>
              <!-- END ADD TABLE -->

              <!-- START DELETE COLUMN -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().deleteColumn().run()"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1m10 6l4 4m-4 0l4-4"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.delete_column') }}
                </tooltip-content>
              </tooltip>
              <!-- END ADD TABLE -->

              <!-- START ADD ROW -->
              <Popover>
                <tooltip>
                  <tooltip-trigger as-child>
                    <popover-trigger as-child>
                      <button class="p-1 rounded-full hover:bg-white/20">
                        <between-vertical-start class="text-white cursor-pointer" />
                      </button>
                    </popover-trigger>
                    <popover-content class="flex flex-col gap-y-1 w-full" side="top">
                      <button
                        @click="editor.chain().focus().addRowBefore().run()"
                        class="w-full px-3 py-1 rounded-sm font-medium bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        {{ $t('title.pages.game_details.form.text_editor.add_before') }}
                      </button>
                      <button
                        @click="editor.chain().focus().addRowAfter().run()"
                        class="w-full px-3 py-1 font-medium rounded-sm bg-white/5 hover:bg-white/10 cursor-pointer"
                      >
                        {{ $t('title.pages.game_details.form.text_editor.add_after') }}
                      </button>
                    </popover-content>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ $t('title.pages.game_details.form.text_editor.add_row') }}
                  </tooltip-content>
                </tooltip>
              </Popover>
              <!-- END ADD ROW -->

              <!-- START DELETE ROW -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().deleteRow().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="none"
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 6v4a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1M10 16l4 4m-4 0l4-4"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.delete_row') }}</tooltip-content
                >
              </tooltip>
              <!-- END DELETE ROW -->

              <!-- START DELETE TABLE -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().deleteTable().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="m15.46 15.88l1.42-1.42L19 16.59l2.12-2.13l1.42 1.42L20.41 18l2.13 2.12l-1.42 1.42L19 19.41l-2.12 2.13l-1.42-1.42L17.59 18zM4 3h14a2 2 0 0 1 2 2v7.08a6 6 0 0 0-4.32.92H12v4h1.08c-.11.68-.11 1.35 0 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m0 4v4h6V7zm8 0v4h6V7zm-8 6v4h6v-4z"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.delete_table') }}
                </tooltip-content>
              </tooltip>
              <!-- END DELETE TABLE -->

              <!-- START MERGE CELLS -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().mergeOrSplit().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                    >
                      <path
                        id="oouiTableMergeCells0"
                        fill="currentColor"
                        d="M9 10L4 6v3H0v2h4v3zm-7 3H0v5h8v-2H2zM0 2v5h2V4h6V2z"
                      />
                      <use href="#oouiTableMergeCells0" transform="matrix(-1 0 0 1 20 0)" />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.merge_or_split_cells') }}
                </tooltip-content>
              </tooltip>
              <!-- END MERGE CELLS -->

              <!-- START SPLIT CELL -->
              <!-- <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().splitCell().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 48 48"
                    >
                      <g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="4">
                        <path
                          d="M4 14V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v38a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-9m40 0v9a1 1 0 0 1-1 1H29a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v9M28 24l16 .013m-40 0L20 24"
                        />
                        <path
                          stroke-linejoin="round"
                          d="m39.228 28.778l1.59-1.591l3.183-3.182l-3.182-3.182l-1.592-1.591M8.755 28.786l-1.59-1.59l-3.183-3.183l3.182-3.182l1.591-1.59"
                        />
                      </g>
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content> Split cell </tooltip-content>
              </tooltip> -->
              <!-- END SPLIT CELL -->

              <!-- START TOGGLE HEADER COLUMN -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleHeaderColumn().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 2048 2048"
                    >
                      <path
                        fill="currentColor"
                        d="M0 128h2048v1664H0zm768 1024h512V768H768zm512 128H768v384h512zM640 768H128v384h512zm768 0v384h512V768zM128 1280v384h512v-384zm1280 384h512v-384h-512z"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.header_column') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE HEADER COLUMN -->

              <!-- START TOGGLE HEADER ROW -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleHeaderRow().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M18 2H6a2 2 0 0 0-2 2v16c0 1.11.89 2 2 2h12c1.11 0 2-.89 2-2V4a2 2 0 0 0-2-2m0 18H6v-4h12zm0-12H6V4h12z"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.header_row') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE HEADER ROW -->

              <!-- START TOGGLE HEADER CELL -->
              <tooltip>
                <tooltip-trigger as-child>
                  <button
                    @click="editor.chain().focus().toggleHeaderCell().run()"
                    :class="!editor.can().deleteRow() ? 'cursor-pointer' : ' cursor-not-allowed'"
                    class="p-1 rounded-full hover:bg-white/20 cursor-pointer"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        d="M2 4.5A2.5 2.5 0 0 1 4.5 2h7A2.5 2.5 0 0 1 14 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-7A2.5 2.5 0 0 1 2 11.5zM6 13h4v-2H6zm-1-2H3v.5A1.5 1.5 0 0 0 4.5 13H5zm0-5H3v4h2zm1-1h4V3H6zM5 3h-.5A1.5 1.5 0 0 0 3 4.5V5h2zm8 3h-2v4h2zm0 5h-2v2h.5a1.5 1.5 0 0 0 1.5-1.5zm0-6v-.5A1.5 1.5 0 0 0 11.5 3H11v2z"
                      />
                    </svg>
                  </button>
                </tooltip-trigger>
                <tooltip-content>
                  {{ $t('title.pages.game_details.form.text_editor.header_cell') }}
                </tooltip-content>
              </tooltip>
              <!-- END TOGGLE HEADER CELL -->
            </div>
          </div>
          <!-- END TABLE -->

          <!-- START YOUTUBE EMBBED -->
          <div class="border-y-1 border-gray-100/20 flex justify-center items-center py-1">
            <div class="flex gap-x-2 justify-between items-center w-full">
              <!-- START ENTER URL -->
              <Popover>
                <tooltip>
                  <tooltip-trigger as-child>
                    <popover-trigger>
                      <button class="p-1 rounded-full hover:bg-white/20 cursor-pointer">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="m10 15l5.19-3L10 9zm11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73"
                          />
                        </svg>
                      </button>
                    </popover-trigger>
                    <popover-content side="top" class="w-full">
                      <div class="flex gap-x-2 w-full items-center">
                        <div class="flex flex-col gap-y-1">
                          <input
                            type="text"
                            v-model="youtubeVideo.url"
                            class="w-full border rounded-sm px-3 h-[2rem] !outline-none ring-2 ring-gray-300/20 focus:ring-gray-300/50"
                            :placeholder="
                              $t('title.pages.game_details.form.text_editor.embed_youtube_url')
                            "
                          />
                        </div>

                        <button
                          class="bg-white/10 px-2 py-2 h-full rounded-sm cursor-pointer"
                          @click="addYoutubeVideo"
                        >
                          {{ $t('title.pages.game_details.form.text_editor.embed') }}
                        </button>
                      </div>
                    </popover-content>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ $t('title.pages.game_details.form.text_editor.embed_youtube_video') }}
                  </tooltip-content>
                </tooltip>
              </Popover>
              <!-- END ENTER URL -->

              <!-- START WIDTH -->
              <div class="flex gap-x-1 items-center justify-center">
                <tooltip>
                  <tooltip-trigger as-child>
                    <div class="relative w-[60px] cursor-pointer">
                      <input
                        type="text"
                        v-model="youtubeVideo.width"
                        class="w-full h-[28px] px-2 pr-6 rounded-sm border border-gray-400/30 bg-transparent text-white placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-gray-300/50 outline-none"
                        placeholder="640"
                      />
                      <span
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none"
                        >x</span
                      >
                    </div>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ youtubeVideo.width + ' width' }}
                  </tooltip-content>
                </tooltip>

                <Tooltip>
                  <tooltip-trigger as-child>
                    <div class="relative w-[60px] cursor-pointer">
                      <input
                        type="text"
                        v-model="youtubeVideo.height"
                        class="w-full h-[28px] px-2 pr-6 rounded-sm border border-gray-400/30 bg-transparent text-white placeholder:text-gray-400 text-sm focus:ring-2 focus:ring-gray-300/50 outline-none"
                        placeholder="480"
                      />
                      <span
                        class="absolute right-2 top-1/2 -translate-y-1/2 text-white text-sm pointer-events-none"
                        >y</span
                      >
                    </div>
                  </tooltip-trigger>
                  <tooltip-content>
                    {{ youtubeVideo.height + ' height' }}
                  </tooltip-content>
                </Tooltip>
              </div>
              <!-- END WIDTH -->
            </div>
          </div>
          <!-- END YOUTUBE EMBBED -->
        </section>
      </div>

      <section
        id="text-editor"
        :class="{
          'invert-100': invertDarkMode,
          invert: invertDarkMode,
        }"
        class="w-full flex col-span-2 min-h-[10rem] overflow-hidden rounded-sm border"
      >
        <EditorContent v-model="texts" class="!min-w-full p-3 bg-black" :editor="editor" />
      </section>
    </div>
  </tooltip-provider>
</template>

<script setup lang="ts">
import { Editor, EditorContent } from '@tiptap/vue-3'
import { onBeforeUnmount, watch, type HTMLAttributes } from 'vue'
import Helps from '@/components/common/texteditor/Helps.vue'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from '@tiptap/extension-image'
import Highlight from '@tiptap/extension-highlight'
import Subscript from '@tiptap/extension-subscript'
import Superscript from '@tiptap/extension-superscript'
import Heading from '@tiptap/extension-heading'
import {
  TextQuote,
  Unlink,
  Highlighter,
  Italic,
  Bold,
  Plus,
  List,
  WrapText,
  ListPlus,
  ListStart,
  Sheet,
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading6,
  Minus,
  BetweenVerticalStart,
  FileImage,
} from 'lucide-vue-next'
import Youtube from '@tiptap/extension-youtube'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import StarterKit from '@tiptap/starter-kit'
import { Switch } from '@/components/ui/switch'
import { ref, onUnmounted, onMounted, nextTick, computed } from 'vue'
import { CharacterCount } from '@tiptap/extensions'
import { TableKit } from '@tiptap/extension-table'
import Link from '@tiptap/extension-link'
import { TextStyle, Color } from '@tiptap/extension-text-style'
import { TextStyleKit } from '@tiptap/extension-text-style'
import Underline from '@tiptap/extension-underline'
import DOMPurify from 'dompurify'

const texts = ref('')
const invertDarkMode = ref(false)
const imageUrl = ref('')
const youtubeVideo = ref({
  url: '',
  width: 640,
  height: 480,
})
const setLinkToText = ref('')

const highlighterColorHex = ref('#ffc078')
const errorLinkToTextMessage = ref('')
const charsLimit = ref(10000)

const customHeading = Heading.extend({
  renderHTML({ node, HTMLAttributes }) {
    const level = node.attrs.level
    const classes: Record<number, string> = {
      1: 'text-3xl font-bold prose-h1',
      2: 'text-2xl font-semibold prose-h2',
      3: 'text-xl font-medium prose-h3',
      4: 'text-lg prose-h4',
      5: 'text-base prose-h5',
      6: 'text-sm prose-h6',
    }
    return ['h' + level, { ...HTMLAttributes, class: classes[level] }, 0]
  },
})

const emitLongDescriptionsData = defineModel<string>('emitLongDescriptionsData')

const editor = new Editor({
  extensions: [
    StarterKit.configure({
      heading: false,
      blockquote: {
        HTMLAttributes: {
          class: 'border-l-3 prose-blockquote border-black dark:border-white px-2',
        },
      },
      bulletList: {
        HTMLAttributes: {
          class: 'pl-4  mr-4 ml-2 prose-ul:my-5',
        },
      },
      listItem: {
        HTMLAttributes: {
          class: 'list-disc marker:text-sky-400 prose-li:my-3 *:marker:text-white prose-li',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'list-none pl-4 my-5 mr-4 ml-2',
        },
      },
      horizontalRule: {
        HTMLAttributes: {
          class: ' border-t-[1px] cursor-pointer !my-[1rem] w-full !p-0 border-gray-200',
        },
      },
    }),
    customHeading,
    Image.configure({
      inline: true,
      allowBase64: true,
      HTMLAttributes: {
        class: 'inline-block align-middle mx-1 !invert-0',
      },
    }),
    TableKit.configure({
      table: { resizable: true },
      tableHeader: {
        HTMLAttributes: {
          class: 'border bg-green-200/70 text-xl px-3 py-0 table-fixed text-white border-white',
        },
      },
      tableRow: {
        HTMLAttributes: {
          class: 'border px-3 py-0 table-fixed text-white border-white',
        },
      },
      tableCell: {
        HTMLAttributes: {
          class: 'border  px-3 py-0 table-fixed text-white border-white',
        },
      },
    }),
    Youtube.configure({
      controls: false,
      nocookie: true,
    }),
    Highlight.configure({
      multicolor: true,
      HTMLAttributes: {
        class: '!text-white',
      },
    }),
    Link.configure({
      openOnClick: true,
      defaultProtocol: 'https',
    }),
    Subscript,
    Superscript,
    CharacterCount.configure({
      limit: charsLimit.value,
    }),
    TextStyleKit,
    Underline,
  ],
  editorProps: {
    attributes: {
      class: 'h-full outline-0 !text-white  min-w-full',
    },
  },
  content: emitLongDescriptionsData.value
    ? emitLongDescriptionsData.value
    : `
<p>Hello World!</p>
  `,
})

const addImage = () => {
  if (imageUrl.value) editor.chain().focus().setImage({ src: imageUrl.value }).run()
}

const addYoutubeVideo = () => {
  if (youtubeVideo.value)
    editor
      .chain()
      .focus()
      .setYoutubeVideo({
        src: youtubeVideo.value.url,
        width: parseInt(youtubeVideo.value.width),
        height: parseInt(youtubeVideo.value.height),
      })
      .run()
}

const hanldeSetLinkToText = () => {
  const { from, to } = editor.state.selection
  if (from === to) {
    errorLinkToTextMessage.value = 'Please select a text to set link.'
    return
  }

  if (editor.getAttributes('link').href) setLinkToText.value = editor.getAttributes('link').href

  if (!setLinkToText.value) {
    editor.chain().focus().extendMarkRange('link').unsetLink().run()
    // errorLinkToTextMessage.value = 'Please select a text to set link.'
    return
  }

  try {
    new URL(setLinkToText.value)
    editor.chain().focus().extendMarkRange('link').setLink({ href: setLinkToText.value }).run()
  } catch {
    errorLinkToTextMessage.value = 'Please, enter valid URL (Ex: https://example.com).'
  }
}

const percentage = computed(() => {
  return Math.round((100 / charsLimit.value) * editor.storage.characterCount.characters())
})

onBeforeUnmount(() => {
  editor.destroy()
})

onMounted(() => {
  editor.on('blur', () => {
    emitLongDescriptionsData.value = DOMPurify.sanitize(editor.getHTML(), {
      ADD_TAGS: ['iframe'],
      ADD_ATTR: ['allowfullscreen', 'frameborder', 'src', 'width', 'height'],
    })
  })
})
watch(
  () => emitLongDescriptionsData.value,
  async (newValue) => {
    if (newValue) {
      await nextTick()
    } else {
      editor.commands.setContent(
        `<p class="text-gray-500">Please, enter your long description here...</p>`,
      )
    }
  },
  {
    immediate: true,
    deep: true,
  },
)
</script>

<style lang="scss" global>
.tiptap {
  :first-child {
    margin-top: 0;
  }

  // table {
  //   border-collapse: collapse !important;
  //   margin: 0;
  //   overflow: hidden;
  //   table-layout: fixed;
  //   width: 100%;

  //   td,
  //   th {
  //     border: 10px solid var(--gray-3) !important;
  //     box-sizing: border-box;
  //     min-width: 1em;
  //     padding: 6px 8px;
  //     position: relative;
  //     vertical-align: top;

  //     > * {
  //       margin-bottom: 0;
  //     }
  //   }

  //   th {
  //     background-color: var(--gray-1);
  //     font-weight: bold;
  //     text-align: left;
  //   }

  //   .selectedCell:after {
  //     background: var(--gray-2);
  //     content: '';
  //     left: 0;
  //     right: 0;
  //     top: 0;
  //     bottom: 0;
  //     pointer-events: none;
  //     position: absolute;
  //     z-index: 2;
  //   }

  //   .column-resize-handle {
  //     background-color: var(--purple);
  //     bottom: -2px;
  //     pointer-events: none;
  //     position: absolute;
  //     right: -2px;
  //     top: 0;
  //     width: 4px;
  //   }
  // }

  // .tableWrapper {
  //   margin: 1.5rem 0;
  //   overflow-x: auto;
  // }

  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }
}

/* Character count */
.character-count {
  align-items: center;
  color: var(--gray-5);
  display: flex;
  font-size: 0.75rem;
  gap: 0.5rem;
  margin: 1.5rem;

  svg {
    color: var(--purple);
  }

  &--warning,
  &--warning svg {
    color: var(--red) !important;
  }
}
</style>
