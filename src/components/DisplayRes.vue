<template>
    <v-expand-transition>

        <v-alert density="compact" :modelValue="res" variant="outlined" class="text-start " closable v-if="res"
            :type="res.type">
            <div>{{ res.message }}</div>
        </v-alert>
    </v-expand-transition>


</template>
<script lang="ts" setup>
import { PropType } from 'vue';

defineProps({
    res: Object as PropType<any>
})
</script>
<style></style>
