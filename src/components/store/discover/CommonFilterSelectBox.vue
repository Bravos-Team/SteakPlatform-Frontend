<template>

    <div class="flex justify-start items-center gap-x-2">
        <span class="text-white/60">Show:</span>
        <Select :model-value="commonFilterOption"
            @update:model-value="(value) => $emit('common-filter-change', value as string)">
            <select-trigger class=" !ring-0 !bg-transparent !border-0 cursor-pointer">
                <select-value placeholder="Select filter" />
            </select-trigger>
            <select-content>
                <select-group>
                    <select-label class="text-white/30">Filter</select-label>
                    <select-item class="cursor-pointer" v-for="option in options" :key="option.value"
                        :value="option.value">{{ option.label
                        }}</select-item>
                </select-group>
            </select-content>
        </Select>
        <span class="text-white capitalize"></span>
    </div>
</template>


<script setup lang="ts">
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { ref } from "vue";

const props = defineProps<{
    commonFilterOption: string;
}>();
const emit = defineEmits<{
    (e: 'common-filter-change', value: string): void;
}>()

const handleCommonFilterChange = (value: string) => {
    emit('common-filter-change', value)
}

const options = [
    { value: "all", label: "All" },
    { value: "coming", label: "Coming Soon" },
    { value: "newest", label: "Newest" },
]
</script>