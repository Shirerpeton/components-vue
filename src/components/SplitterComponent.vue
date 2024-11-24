<script setup lang='ts'>
import { useDraggable, useElementSize, useStorage, RemovableRef, UseDraggableOptions, useWindowSize } from '@vueuse/core';
import { computed, nextTick, onMounted, useTemplateRef, watch, watchEffect } from 'vue';

interface SplitterProps {
    id: string,
    type: 'row' | 'col',
    initialSplit?: number
};

const props = defineProps<SplitterProps>();

const handleRef = useTemplateRef<HTMLDivElement>('handleRef');
const containerRef = useTemplateRef<HTMLDivElement>('containerRef');
const { width: containerWidth, height: containerHeight } = useElementSize(containerRef);
const draggableOptions = computed(() => ({
    axis: props.type === 'row' ? 'x' : 'y',
    containerElement: containerRef,
    preventDefault: true
}));
const { x, y, style } = useDraggable(handleRef, draggableOptions.value as UseDraggableOptions);
const firstElementStyle = computed(() => props.type === 'row' ?
    { 'width': `${x.value}px` } :
    { 'height': `${y.value}px` }
);
const secondElementStyle = computed(() => props.type === 'row' ?
    { width: `${containerWidth.value - x.value - 16}px` } :
    { height: `${containerHeight.value - y.value - 16}px` }
);
const storageSplit: RemovableRef<number | null> = useStorage(`splitter-${props.id}`, null);
const resetSplit = () => {
    if(storageSplit.value === null) {
        return;
    }
    if(props.type === 'row') {
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
    if(props.type === 'row') {
        storageSplit.value = x.value / (containerWidth.value - 16);
    } else {
        storageSplit.value = y.value / (containerHeight.value - 16);
    }
});
onMounted(() => {
    if(props.type === 'row') {
        if(storageSplit.value === null) {
            if(props.initialSplit) {
                x.value = (containerWidth.value - 16) * props.initialSplit;
            } else {
                x.value = (containerWidth.value - 16) / 2;
            }
        } else {
            x.value = (containerWidth.value - 16) * storageSplit.value;
        }
    } else {
        if(storageSplit.value === null) {
            if(props.initialSplit) {
                y.value = (containerHeight.value - 16) * props.initialSplit;
            } else {
                y.value = (containerHeight.value - 16) / 2;
            }
        } else {
            y.value = (containerHeight.value - 16) * storageSplit.value;
        }
    }
});
</script>

<template>
    <div
        ref='containerRef'
        :class='type === "row" ? "flex-row" : "flex-col"'
        class='flex relative gap-4'>
        <div
            class='overflow-hidden'
            :style='firstElementStyle'>
            <slot name='first' />
        </div>
        <div
            ref='handleRef'
            :style='style'
            :class='type === "row" ? "h-full w-4 cursor-col-resize" : "w-full h-4 cursor-row-resize"'
            class='absolute flex flex-row justify-center items-center rounded-md hover:bg-gray-100'>
            <span
                :class='type === "row" ? "h-8 w-1" : "h-1 w-8"'
                class='bg-gray-600 rounded-full' />
        </div>
        <div
            class='flex-grow overflow-hidden'
            :style='secondElementStyle'>
            <slot name='second' />
        </div>
    </div>
</template>
