<template>
    <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
        <v-card title="競標系統" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">

        </v-card>
        <router-link to="/" class="text-caption text-grey">點此前往競標頁面</router-link>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted } from 'vue';

async function startup() {

}
onMounted(startup)

</script>