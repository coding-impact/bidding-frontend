<template>
    <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
        <v-card title="管理員介面" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">
            <template v-if="isAuth">

            </template>
            <template v-else>
                <Login @auth="isAuth = true"></Login>
            </template>
        </v-card>
        <router-link to="/" class="text-caption text-grey">點此前往競標頁面</router-link>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import Login from '@/components/Login.vue';

const isAuth = ref(false)

async function startup() {

}
onMounted(startup)




</script>