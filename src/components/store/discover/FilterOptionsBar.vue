<template>
    <div class="flex flex-col gap-y-2">
        <span class="font-bold">Filters</span>
        <label for="search" class="flex items-center  bg-black/40 group px-2">
            <Search class=" cursor-pointer text-white/80 size-4" />
            <Input @keyup.enter="(event: any) => searchValue = event.target.value" type="text" id="search"
                placeholder="Search..."
                class="border-0 !bg-transparent px-3 text-white/70 !ring-0 peer py-3 !  outline-0 rounded-xs w-full" />
        </label>
        <div class="flex flex-col ">
            <Collapsible class="py-6 border-b last:border-b-0 flex flex-col justify-between gap-y-10"
                @update:open="(value) => handleCollapsibleOpenStates(value, (filter.key).toLowerCase())"
                v-for="(filter, index) in selectFilterOptions" :key="index">
                <CollapsibleTrigger class="flex  items-center  justify-between w-full cursor-pointer">
                    <span class="text-md font-bold"> {{ filter.title }}</span>
                    <ChevronUp class="transition-transform duration-300 "
                        :class="{ 'rotate-180': collapsOpen[filter.key.toLowerCase()] }" />
                </CollapsibleTrigger>
                <CollapsibleContent class="text-sm text-white/80" v-for="(option, index) in filter.options"
                    :key="index">{{
                        option.label }}</CollapsibleContent>
            </Collapsible>
        </div>
    </div>
</template>


<script setup lang="ts">
import Input from '@/components/ui/input/Input.vue';
import { ChevronUp, Search } from 'lucide-vue-next';
import { useGameGenresQuery, useGameTagsQuery } from '@/hooks/store/game/useGameStore';
import { ref, watch } from 'vue';
import { GAME_GENRES_AND_TAG_TYPE } from '@/types/game/gameDetails/GameDetailsType';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';

const { data: genres } = useGameGenresQuery()
const { data: tags } = useGameTagsQuery()

const searchValue = defineModel<string>('searchValueOnChange', {
    default: '',
    required: false
})


const genresData = ref<any>([])
const tagsData = ref<any>([])
const collapsOpen = ref({
    price: false,
    genres: false,
    tags: false,
    sortBy: false
})
const selectFilterOptions = ref<any>([
    {
        title: 'Price',
        key: 'price',
        options: [
            { value: '0', label: 'Free' },
            { value: '1', label: 'Paid' },
            { value: '5750000', label: 'Under ₫575,000' },
            { value: '11500000', label: 'Under ₫1,150,000' },
            { value: '23000000', label: 'Under ₫2,300,000' },
            { value: '500000', label: '₫500,000 and above' }
        ],
    },
    {
        title: 'Genres',
        key: 'genres',
        options: genresData
    },
    {
        title: 'Tags',
        key: 'tags',
        options: tagsData
    },
    {
        title: 'Sort By',
        key: 'sortBy',
        options: [
            { value: 'popularity', label: 'Most Popular' },
            { value: 'rating', label: 'Highest Rated' },
            { value: 'release_date', label: 'Newest Releases' }
        ]
    }
])

const handleCollapsibleOpenStates = (value: boolean, title: string) => {
    switch (title) {
        case 'sort by':
            collapsOpen.value.sortBy = value
            break
        default: collapsOpen.value[title] = value
    }
}

watch(genres, () => {
    genresData.value = genres.value?.data.map((genre: GAME_GENRES_AND_TAG_TYPE) => ({
        value: genre.id,
        label: genre.name
    }))
})

watch(tags, () => {
    tagsData.value = tags.value?.data.map((tag: GAME_GENRES_AND_TAG_TYPE) => ({
        value: tag.id,
        label: tag.name
    }))
})

</script>