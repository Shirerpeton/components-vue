<script setup lang='ts'>
import SplitterComponent from './components/SplitterComponent.vue';
</script>

<template>
    <div class='w-full h-full flex justify-center items-center'>
        <SplitterComponent
            id='0'
            class='w-full h-full'
            type='row'
            :initial-split='0.4'>
            <template #first>
                <SplitterComponent
                    id='1'
                    class='w-full h-full'
                    type='col'>
                    <template #first>
                        <div
                            class='w-full h-full flex justify-center items-center
                                border border-gray-300 rounded-md'>
                            <span>first</span>
                        </div>
                    </template>
                    <template #second>
                        <div
                            class='w-full h-full flex justify-center items-center
                                border border-gray-300 rounded-md'>
                            <span>second</span>
                        </div>
                    </template>
                </SplitterComponent>
            </template>
            <template #second>
                <SplitterComponent
                    id='2'
                    class='w-full h-full'
                    type='row'
                    :initial-split='0.5'>
                    <template #first>
                        <div
                            class='w-full h-full min-w-0 flex justify-center items-center
                                border border-gray-300 rounded-md'>
                            <span>third</span>
                        </div>
                    </template>
                    <template #second>
                        <div
                            class='w-full h-full min-w-0 flex justify-center items-center
                                border border-gray-300 rounded-md'>
                            <span>fourth</span>
                        </div>
                    </template>
                </SplitterComponent>
            </template>
        </SplitterComponent>
    </div>
</template>
