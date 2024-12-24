<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core';
import { ref, computed, Ref, ComputedRef, useTemplateRef } from 'vue';

interface MultiDropdownProps {
    options: MultiDropdownOption[],
    selected: string[],
    disabled?: boolean,
    placeholder?: string,
    direction?: 'top' | 'bottom'
}
interface MultiDropdownEvents {
    select: [id: string]
    deselect: [id: string]
}

const { options, selected, placeholder = '', disabled = false, direction = 'bottom' } = defineProps<MultiDropdownProps>();
const emit = defineEmits<MultiDropdownEvents>();

const container = useTemplateRef('container');
const label: ComputedRef<string | null> = computed(() =>
    selected
        .map(id => options.find(option => option.id === id)?.title)
        .filter(title => !!title)
        .join(', '));
const isOpen: Ref<boolean> = ref(false);
const handleOptionClick = (optionId: string, select: boolean): void => {
    if(disabled) {
        return;
    }
    if(select) {
        emit('select', optionId);
    } else {
        emit('deselect', optionId);
    }
}
onClickOutside(container, () => isOpen.value && (isOpen.value = false));
</script>

<script lang='ts'>
export interface MultiDropdownOption {
    id: string,
    title: string
};
</script>

<template>
    <div
        ref='container'
        class='relative cursor-pointer select-none'>
        <div
            :class='{
                "text-gray-600": disabled || !label,
            }'
            class='border border-gray-300 flex rounded-md
                min-w-32 max-w-40 min-h-8 px-2 py-1'
            @click='isOpen = !isOpen'>
            <span class='truncate'>{{ label || placeholder }}</span>
            <span class='ml-auto'>{{ isOpen ? "▲" : "▼" }}</span>
        </div>
        <div
            :class='{ "hidden": !isOpen, "bottom-8": direction === "top" }'
            class='border border-gray-300 flex flex-col p-1 gap-1 rounded-md
                absolute w-full'>
            <span
                v-for='option in options'
                :key='option.id'
                :class='{
                    "bg-gray-200 text-black": selected.includes(option.id),
                    "text-gray-300": !selected.includes(option.id) && disabled,
                    "hover:bg-gray-300": !disabled
                }'
                class='px-2 py-1 rounded-md'
                @click='handleOptionClick(option.id, !selected.includes(option.id))'>
                {{ option.title }}
            </span>
        </div>
    </div>
</template>
