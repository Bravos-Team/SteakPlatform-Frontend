<template>
  <edit-game-details-skeleton v-if="isGameByIdPending" />
  <div v-else class="px-2 py-4 flex flex-col gap-y-3 @container text-amber-">
    <div v-if="gameById?.data" class="h-full flex flex-col laptop:flex-row gap-2">
      <name-and-game-background-edit :is-update-game-opening="true" :game-details="gameById?.data.details" />
      <update-game-opening-details :game-informations="{ ...gameById.data.details, price: gameById.data.game.price }"
        :game-details="{ ...gameById.data.details, price: gameById.data.game.price }" />
    </div>

    <card v-if="gameById?.data.game" class="bg-[var(--bg-card-base)]/50">
      <CardHeader>
        <CardTitle class="text-2xl font-bold">
          Games genres and tags

        </CardTitle>
        <CardContent class="grid grid-cols-1 tablet:grid-cols-2 gap-x-4">
          <!-- TAGS -->
          <div class="flex flex-col gap-y-2">
            <span>Tags:</span>
            <div>
              <Combobox v-model:model-value="gameTags" v-model:open="openTagsPicker" :ignore-filter="true">
                <combobox-anchor as-child>
                  <label for="tags">
                    <tags-input @click="openTagsPicker = true" v-model="gameTags"
                      class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer">
                      <div class="flex gap-2 items-center flex-wrap">
                        <tags-input-item v-for="tag in gameTags" :key="tag" :value="tag" class="px-2 text-pretty">
                          <tags-input-item-text class="!text-pretty " />
                          <tags-input-item-delete @click="handleDeleteTag(tag)" />
                        </tags-input-item>
                      </div>

                      <combobox-input v-model="searchTags" as-child>
                        <tags-input-input id="tags" :placeholder="'Choose Tags'"
                          class="tablet:min-w-[10rem] laptop:min-w-[15rem] p-0 border-none focus-visible:ring-0 h-auto"
                          @keydown.enter.prevent />
                      </combobox-input>
                    </tags-input>
                  </label>

                  <combobox-list align="end" side="top" class="w-[--reka-popper-anchor-width]">
                    <combobox-empty v-if="!isGameTagsFetching" />
                    <div v-if="isGameTagsFetching"
                      class="min-w-[7rem] animate-pulse bg-white/10 h-8 flex items-center justify-center">
                      <LoaderCircle class="animate-spin" />
                    </div>
                    <combobox-group v-else>
                      <scroll-area :class="{
                        'h-[20rem]': filteredTags.length > 6,
                        'h-[10rem]': filteredTags.length <= 6,
                      }">
                        <combobox-item v-for="(tag, index) in filteredTags" :key="index" :value="tag" @select.prevent="
                          (event: any) => {
                            if (typeof event.detail.value.name === 'string') {
                              searchTags = ''
                              gameTags = [...(gameTags || []), event.detail.value.name]
                              tagsAssigned = [...(tagsAssigned || []), event.detail.value.id]
                            }

                            if (filteredTags.length === 0) {
                              openTagsPicker = false
                            }
                          }
                        ">
                          {{ tag.name }}
                        </combobox-item>
                      </scroll-area>
                    </combobox-group>
                  </combobox-list>
                </combobox-anchor>
              </Combobox>
            </div>
          </div>
          <!-- END TAGS -->

          <!-- GENRES -->
          <div class="flex flex-col gap-y-2">
            <span>Genres:</span>
            <div>
              <Combobox v-model:model-value="gameGenres" v-model:open="openGenresPicker" :ignore-filter="true">
                <combobox-anchor as-child>
                  <label for="tags">
                    <tags-input @click="openGenresPicker = true" v-model="gameGenres"
                      class="px-2 gap-2 w-full flex flex-col items-start bg-black/70 hover:bg-black/20 transition-colors duration-300 cursor-pointer">
                      <div class="flex gap-2 items-center flex-wrap">
                        <tags-input-item v-for="genre in gameGenres" :key="genre" :value="genre"
                          class="px-2 text-pretty">
                          <tags-input-item-text class="!text-pretty " />
                          <tags-input-item-delete @click="handleDeleteGenre(genre)" />
                        </tags-input-item>
                      </div>

                      <combobox-input v-model="searchGenres" as-child>
                        <tags-input-input id="tags" :placeholder="'Choose Genres'"
                          class="tablet:min-w-[10rem] laptop:min-w-[15rem] p-0 border-none focus-visible:ring-0 h-auto"
                          @keydown.enter.prevent />
                      </combobox-input>
                    </tags-input>
                  </label>

                  <combobox-list align="end" side="top" class="w-[--reka-popper-anchor-width]">
                    <combobox-empty v-if="!isGameGenresFetching" />
                    <div v-if="isGameGenresFetching"
                      class="min-w-[7rem] animate-pulse bg-white/10 h-8 flex items-center justify-center">
                      <LoaderCircle class="animate-spin" />
                    </div>
                    <combobox-group v-else>
                      <scroll-area :class="{
                        'h-[20rem]': filteredGenres.length > 6,
                        'h-[10rem]': filteredGenres.length <= 6,
                      }">
                        <combobox-item v-for="(genre, index) in filteredGenres" :key="index" :value="genre"
                          @select.prevent="
                            (event: any) => {
                              if (typeof event.detail.value.name === 'string') {
                                searchGenres = ''
                                gameGenres = [...(gameGenres || []), event.detail.value.name]
                                genresAssigned = [...(genresAssigned || []), event.detail.value.id]
                              }

                              if (filteredGenres.length === 0) {
                                openGenresPicker = false
                              }
                            }
                          ">
                          {{ genre.name }}
                        </combobox-item>
                      </scroll-area>
                    </combobox-group>
                  </combobox-list>
                </combobox-anchor>
              </Combobox>
            </div>
          </div>
          <!-- END GENRES -->
        </CardContent>
        <CardFooter class="flex justify-end gap-x-2">
          <Button variant="default" :loading="updateState.isUpdatingTags" @click="handleUpdateTags"
            class="btn btn-secondary opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer">Update
            Tags</Button>
          <Button variant="default" :loading="updateState.isUpdatingGenres" @click="handleUpdateGenres"
            class="btn btn-secondary opacity-80 hover:opacity-100 transition-all duration-200 cursor-pointer">Update
            Genres</Button>
        </CardFooter>
      </CardHeader>
    </card>

    <!-- PREVIEW -->
    <div class="w-full @container">
      <card class="bg-[var(--bg-card-base)]/50 lg:px-[4rem] @container">
        <game-details-preview v-if="gameById?.data"
          :game-details="{ ...gameById.data.details, price: gameById.data.game.price }" />
        <skeleton-preview-form v-else />
      </card>
    </div>
    <!-- END PREVIEW -->
  </div>
</template>

<script setup lang="ts">
import { useFilter } from 'reka-ui'
import {
  Combobox,
  ComboboxAnchor,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/components/ui/combobox'
import {
  TagsInput,
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
} from '@/components/ui/tags-input'
import { ScrollArea } from '@/components/ui/scroll-area'
import EditGameDetailsSkeleton from '@/components/publisher/gameDetails/EditGameDetailsSkeleton.vue'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import SkeletonPreviewForm from '@/components/publisher/gameDetails/SkeletonPreviewForm.vue'
import GameDetailsPreview from '@/components/publisher/gameDetails/GameDetailsPreview.vue'
import NameAndGameBackgroundEdit from '@/components/publisher/game/NameAndGameBackgroundEdit.vue'
import UpdateGameOpeningDetails from '@/components/publisher/game/UpdateGameOpeningDetails.vue'
import { useRoute } from 'vue-router'
import { usePublisherGameDetails } from '@/hooks/publisher/game/usePublisherGameManage'
import { useGameTagsQuery, useGameGenresQuery } from '@/hooks/store/game/useGameStore'
import { mutatePublisherUpdateGameDetails } from '@/hooks/publisher/game/usePublisherGameManage'
import { computed, onMounted, ref, watch } from 'vue'
import { GAME_GENRES_AND_TAG_TYPE } from '@/types/game/gameDetails/GameDetailsType'
import { LoaderCircle } from 'lucide-vue-next'
import CardFooter from '@/components/ui/card/CardFooter.vue'
import Button from '@/components/ui/button/Button.vue'
import { useDebounceFn } from '@vueuse/core'
import { toastErrorNotificationPopup, toastSuccessNotificationPopup } from '@/composables/toast/toastNotificationPopup'
import { nextTick } from 'vue'


const route = useRoute()

const { data: gameById, isPending: isGameByIdPending } = usePublisherGameDetails(
  route?.params?.id as unknown as bigint,
)
const { mutateAsync: mutateAsyncUpdateGame } = mutatePublisherUpdateGameDetails()
const { data: genresData, isFetching: isGameGenresFetching } = useGameGenresQuery()
const { data: tagsData, isFetching: isGameTagsFetching } = useGameTagsQuery()

const gameGenres = ref<string[]>([])
const gameTags = ref<string[]>([])
const tagsAssigned = ref<number[]>([])
const genresAssigned = ref<number[]>([])

const openTagsPicker = ref(false)
const openGenresPicker = ref(false)
const searchTags = ref('')
const searchGenres = ref('')

const { contains } = useFilter({ sensitivity: 'base' })
const tagsDataValue = computed(() => tagsData.value?.data || [])
const filteredTags = computed(() => {

  const options = tagsDataValue.value.filter((tag: GAME_GENRES_AND_TAG_TYPE) => !gameTags.value?.includes(tag.name))
  return searchTags.value ? options.filter((option: GAME_GENRES_AND_TAG_TYPE) => contains(option.name, searchTags.value)) : options
})

const genresDataValue = computed(() => genresData.value?.data || [])
const filteredGenres = computed(() => {
  const options = genresDataValue.value.filter((genre: GAME_GENRES_AND_TAG_TYPE) => !gameGenres.value?.includes(genre.name))
  return searchGenres.value ? options.filter((option: GAME_GENRES_AND_TAG_TYPE) => contains(option.name, searchGenres.value)) : options
})


const handleDeleteTag = (tag: string) => {
  gameTags.value = gameTags.value.filter((t) => t !== tag)
  tagsAssigned.value = tagsAssigned.value.filter((id) => id !== tagsData.value?.data?.find((t: GAME_GENRES_AND_TAG_TYPE) => t.name === tag)?.id)
}
const handleDeleteGenre = (genre: string) => {
  gameGenres.value = gameGenres.value.filter((g) => g !== genre)
  genresAssigned.value = genresAssigned.value.filter((id) => id !== genresData.value?.data?.find((g: GAME_GENRES_AND_TAG_TYPE) => g.name === genre)?.id)
}

const updateState = ref({
  isUpdatingTags: false,
  isUpdatingGenres: false,
})

const handleUpdateGenres = useDebounceFn(async () => {
  updateState.value.isUpdatingGenres = true
  try {
    const response = await mutateAsyncUpdateGame({
      genres: genresAssigned.value,
      gameId: route.params.id as string
    })
    if (response.status === 200) {
      openGenresPicker.value = false
      searchGenres.value = ''
      toastSuccessNotificationPopup('Genres updated successfully', 'The genres have been updated successfully.')
    }
  } catch (err: any) {
    console.error('Error updating genres:', err)
    toastErrorNotificationPopup('Error updating genres', 'An error occurred while updating genres.')
  } finally {
    updateState.value.isUpdatingGenres = false
  }
}, 200)
const handleUpdateTags = useDebounceFn(async () => {
  updateState.value.isUpdatingTags = true
  try {
    const response = await mutateAsyncUpdateGame({
      tags: tagsAssigned.value,
      gameId: route.params.id as string
    })
    if (response.status === 200) {
      openTagsPicker.value = false
      searchTags.value = ''
      toastSuccessNotificationPopup('Tags updated successfully', 'The tags have been updated successfully.')
    }
  } catch (err: any) {
    console.error('Error updating tags:', err)
    toastErrorNotificationPopup('Error updating tags', 'An error occurred while updating tags.')
  } finally {
    updateState.value.isUpdatingTags = false
  }
}, 200)

watch(() => gameById.value?.data.game, async () => {
  await nextTick(() => {
    if (gameById.value?.data.game) {
      gameGenres.value = gameById.value.data.game.genres.map((genre: GAME_GENRES_AND_TAG_TYPE) => genre.name)
      gameTags.value = gameById.value.data.game.tags.map((tag: GAME_GENRES_AND_TAG_TYPE) => tag.name)
      tagsAssigned.value = gameById.value.data.game.tags.map((tag: GAME_GENRES_AND_TAG_TYPE) => tag.id)
      genresAssigned.value = gameById.value.data.game.genres.map((genre: GAME_GENRES_AND_TAG_TYPE) => genre.id)
    }
    openTagsPicker.value = false
    openGenresPicker.value = false
    searchTags.value = ''
    searchGenres.value = ''
    updateState.value.isUpdatingTags = false
    updateState.value.isUpdatingGenres = false
  })
}, { deep: true })
</script>
