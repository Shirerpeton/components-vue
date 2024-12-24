<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core';
import { ref, computed, useTemplateRef, Ref, ComputedRef } from 'vue';
import ChevronUpIcon from './ChevronUpIcon.vue';
import ChevronDownIcon from './ChevronDownIcon.vue';

interface DropdownProps {
    options: DropdownOption[],
    selectedId: string | null
}
interface DropdownEvents {
    select: [id: string]
}
const props = defineProps<DropdownProps>();
const emit = defineEmits<DropdownEvents>();
const isOpen: Ref<boolean> = ref(false);

const containerTemplateRef = useTemplateRef('container');
const handleOptionClick = (optionId: string): void => {
    emit('select', optionId);
    isOpen.value = false;
}
const label: ComputedRef<string> = computed(() =>
    props.options.find(option => option.id === props.selectedId)?.title ?? '');
onClickOutside(containerTemplateRef, () => isOpen.value && (isOpen.value = false));
</script>
<script lang='ts'>
export interface DropdownOption {
    id: string,
    title: string
};
</script>

<template>
    <div
        ref='container'
        class='relative cursor-pointer select-none'>
        <button
            class='border border-gray-300 flex items-center rounded-md
                min-w-40 max-w-40 min-h-8 px-2 py-1'
            @click='isOpen = !isOpen'>
            <span class='truncate'>{{ label }}</span>
            <ChevronUpIcon
                v-if='isOpen'
                class='ml-auto min-w-8 max-w-8' />
            <ChevronDownIcon
                v-else
                class='ml-auto min-w-8 max-w-8' />
        </button>
        <div
            :class='{ "hidden": !isOpen }'
            class='border border-gray-300 flex flex-col p-1 gap-1 rounded-md
                absolute w-full'>
            <button
                v-for='option in options'
                :key='option.id'
                :class='{
                    "bg-gray-200 text-black": option.id === selectedId
                }'
                class='px-2 py-1 rounded-md hover:bg-gray-300'
                @click='handleOptionClick(option.id)'>
                {{ option.title }}
            </button>
        </div>
    </div>
</template>
