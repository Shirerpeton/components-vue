<script setup lang='ts'>
import { ref, Ref } from 'vue';
import DropdownComponent from './components/DropdownComponent.vue';

const options: Ref<Option[]> = ref([
    {
        id: '0',
        name: 'first option',
        selected: false
    },
    {
        id: '1',
        name: 'second option',
        selected: false
    },
    {
        id: '2',
        name: 'third option',
        selected: false
    }
]);
</script>

<template>
    <div class='w-full h-full flex justify-center items-center'>
        <DropdownComponent
            v-model='options' />
    </div>
</template>
