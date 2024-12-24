<script setup lang='ts'>
import { ref, Ref } from 'vue';
import DropdownComponent, { DropdownOption } from './components/DropdownComponent.vue';

const selectedId: Ref<string | null> = ref(null);

const options: Ref<DropdownOption[]> = ref([
    {
        id: '0',
        title: 'first option'
    },
    {
        id: '1',
        title: 'second option'
    },
    {
        id: '2',
        title: 'third option'
    }
]);

const selectHandler = (id: string): string => selectedId.value = id;
</script>

<template>
    <div class='w-full h-full flex justify-center items-center'>
        <DropdownComponent
            :options
            :selected-id='selectedId'
            @select='selectHandler' />
    </div>
</template>
