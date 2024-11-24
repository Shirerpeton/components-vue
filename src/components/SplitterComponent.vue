<script setup lang='ts'>
import { useDraggable, useElementSize, useStorage, RemovableRef, UseDraggableOptions } from '@vueuse/core';
import { computed, onMounted, useTemplateRef, watch, watchEffect } from 'vue';

enum SplitterType {
    row = 'row',
    column = 'col'
}

interface SplitterProps {
    id: string,
    type: string,
    initialSplit?: number
};

const { id, type, initialSplit = 0.5 } = defineProps<SplitterProps>();

const handleRef = useTemplateRef<HTMLDivElement>('handleRef');
const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const { width: containerWidth, height: containerHeight } = useElementSize(containerRef);
const draggableOptions = computed(() => ({
    axis: type === SplitterType.row ? 'x' : 'y',
    containerElement: containerRef,
    preventDefault: true
}));
const { x, y, style } = useDraggable(handleRef, draggableOptions.value as UseDraggableOptions);
const firstElementStyle = computed(() =>
    type === SplitterType.row ?
        { width: `${x.value}px` } :
        { height: `${y.value}px` }
);
const secondElementStyle = computed(() =>
    type === SplitterType.row ?
        { width: `${containerWidth.value - x.value - 16}px` } :
        { height: `${containerHeight.value - y.value - 16}px` }
);
const storageSplit: RemovableRef<number | null> = useStorage(`splitter-${id}`, null);
const resetSplit = (): void => {
    if(storageSplit.value === null) {
        return;
    }
    if(type === SplitterType.row) {
        x.value = (containerWidth.value - 16) * storageSplit.value;
    } else {
        y.value = (containerHeight.value - 16) * storageSplit.value;
    }
};
watch([containerHeight, containerWidth], resetSplit);
watchEffect(() => {
    if(containerWidth.value === 0 ||
        containerHeight.value === 0 ||
        x.value < 0 ||
        y.value < 0) {
        return;
    }
    if(type === SplitterType.row) {
        storageSplit.value = x.value / (containerWidth.value - 16);
    } else {
        storageSplit.value = y.value / (containerHeight.value - 16);
    }
});
onMounted(() => {
    if(storageSplit.value) {
        resetSplit();
        return;
    }
    if(type === SplitterType.row) {
        x.value = (containerWidth.value - 16) * initialSplit;
        storageSplit.value = x.value / (containerWidth.value - 16);
    } else {
        y.value = (containerHeight.value - 16) * initialSplit;
        storageSplit.value = y.value / (containerHeight.value - 16);
    }
});
</script>

<template>
    <div
        ref='containerRef'
        :class='type === SplitterType.row ? "flex-row" : "flex-col"'
        class='flex relative gap-4'>
        <div
            class='overflow-hidden'
            :style='firstElementStyle'>
            <slot name='first' />
        </div>
        <div
            ref='handleRef'
            :style='style'
            :class='type === SplitterType.row ? "h-full w-4 cursor-col-resize" : "w-full h-4 cursor-row-resize"'
            class='absolute flex flex-row justify-center items-center rounded-md hover:bg-gray-100'>
            <span
                :class='type === SplitterType.row ? "h-8 w-1" : "h-1 w-8"'
                class='bg-gray-600 rounded-full' />
        </div>
        <div
            class='flex-grow overflow-hidden'
            :style='secondElementStyle'>
            <slot name='second' />
        </div>
    </div>
</template>
