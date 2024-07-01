<template>
    <v-alert density="compact" :modelValue="res" variant="outlined" class="text-start " closable v-if="res"
        :type="res.type">
        <div>{{ res.message }}</div>
    </v-alert>


</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
    res: Object as PropType<any>
})
</script>
<style></style>
