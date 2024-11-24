<script setup lang='ts'>
import { onClickOutside } from '@vueuse/core';
import { ref, computed, Ref, ComputedRef } from 'vue';

interface DropdownProps {
    direction?: 'top' | 'bottom'
}

const popup = ref(null);
const { direction = 'bottom' } = defineProps<DropdownProps>();
const model = defineModel<Option[]>();
const label: ComputedRef<string> = computed(() =>
    model.value!
        .filter(option => option.selected)
        .map(option => option.name)
        .join(', '));
const isOpen: Ref<boolean> = ref(false);

const toggleOpen = (): boolean => isOpen.value = !isOpen.value;
const selectOption = (option: Option): boolean => option.selected = !option.selected;
onClickOutside(popup, () => isOpen.value && (isOpen.value = false));

</script>

<template>
    <div class='relative cursor-pointer select-none'>
        <div
            class='border border-gray-300 rounded-md truncate
                min-w-32 max-w-40 min-h-8 px-2 py-1'
            @click='toggleOpen'>
            {{ label }}
        </div>
        <div
            ref='popup'
            :class='{"hidden": !isOpen, "bottom-8": direction === "top"}'
            class='border border-gray-300 flex flex-col p-1 gap-1 rounded-md
                absolute w-full'>
            <span
                v-for='option in model'
                :key='option.id'
                :class='{ "bg-gray-200": option.selected }'
                class='hover:bg-gray-300 px-2 py-1 rounded-md'
                @click='selectOption(option)'>
                {{ option.name }}
            </span>
        </div>
    </div>
</template>
