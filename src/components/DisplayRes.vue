<template>
    <v-alert density="compact" :modelValue="res" variant="outlined" class="text-start" closable v-if="res" :type="res.type" :text="res.message"></v-alert>
        
    
</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
    res: Object as PropType<any>
})
 </script>
