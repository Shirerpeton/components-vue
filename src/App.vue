<script setup lang='ts'>
import SplitterComponent from './components/SplitterComponent.vue';
</script>

<template>
    <div class='w-full h-full flex justify-center items-center'>
        <SplitterComponent
            id='0'
            class='w-full h-full'
            type='row'
            :initial-split='0.5'>
            <template #first>
                <div
                    class='w-full h-full flex justify-center items-center
                        border border-gray-300 rounded-md'>
                    <span>first</span>
                </div>
            </template>
            <template #second>
                <div
                    class='w-full h-full min-w-0 flex justify-center items-center
                        border border-gray-300 rounded-md'>
                    <span>second</span>
                </div>
            </template>
        </SplitterComponent>
    </div>
</template>
