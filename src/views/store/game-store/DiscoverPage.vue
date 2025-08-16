<template>
    <div class="flex flex-col gap-y-2">
        <div class="min-w-full min-h-screen grid grid-cols-12">
            <div class="tablet:col-span-9 col-span-12 laptop:col-span-10 flex flex-col gap-y-2">
                <CommonFilterSelectBox :common-filter-option="commonFilterOption"
                    @common-filter-change="(value) => commonFilterOption = value" />
            </div>
            <div class="laptop:col-span-2 tablet:col-span-3 hidden tablet:block ">
                <FilterOptionsBar v-model:search-value-on-change="searchValue" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import CommonFilterSelectBox from '@/components/store/discover/CommonFilterSelectBox.vue';
import FilterOptionsBar from '@/components/store/discover/FilterOptionsBar.vue';
import { ref, watch } from 'vue';
import { toast } from 'vue-sonner';
import { useQueryDiscoverGameFiltered } from '@/hooks/store/game/useGameStore';
const { data: filteredGames, isLoading: isLoadingFilteredGames } = useQueryDiscoverGameFiltered();
const commonFilterOption = ref('all');
const searchValue = ref('')

watch(commonFilterOption, (newValue) => {
    toast.info('Common filter changed to: ' + newValue);
});

watch(searchValue, () => {
    toast.info('Search value changed to: ' + searchValue.value);
}, { deep: true })
</script>