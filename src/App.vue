<script setup lang='ts'>
import { ref, Ref } from 'vue';
import DropdownComponent, { DropdownOption } from './components/DropdownComponent.vue';

const selected: Ref<string[]> = ref([]);

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

const selectHandler = (id: string) => selected.value.push(id);
const deselectHandler = (id: string) => {
    selected.value = selected.value.filter(selectedId => selectedId !== id);
}

</script>

<template>
    <div class='w-full h-full flex justify-center items-center'>
        <DropdownComponent
            :options
            :selected
            placeholder='Clarify...'
            @select='selectHandler'
            @deselect='deselectHandler' />
    </div>
</template>
