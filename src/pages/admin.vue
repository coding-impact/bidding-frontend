<template>
    <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
        <v-card title="管理員介面" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">
            <template v-if="isAuth">
                <v-card-text class="text-start">
                    <v-list-subheader>目前設定</v-list-subheader>
                    <div class="pa-4">
                        <v-switch inset density="compact" hide-details label="開放競標"></v-switch>
                        <div class="d-flex justify-center text-center align-center py-2">
                            <div>
                                現在是第 {{ 1 }} 次競標
                            </div>
                            <v-btn variant="text" class="ml-4"> 點此進入下一輪</v-btn>

                        </div>
                        <v-textarea density="compact" auto-grow hide-details variant="solo-filled" flat label="目前顯示文字">

                        </v-textarea>
                    </div>


                    <v-list-subheader>目前下標情況</v-list-subheader>
                    <div class="justify-center">
                        <v-data-table-virtual :headers="headers" :items="virtualBoats" height="400" item-value="name">
                            <template v-slot:headers="{ columns, isSorted, getSortIcon, toggleSort }">
                                <tr>
                                    <template v-for="column in columns" :key="column.key">
                                        <td>
                                            <div class="d-flex">
                                                <span class=" cursor-pointer" style="text-wrap:nowrap;"
                                                    @click="() => toggleSort(column)">{{
                                                        column.title }}</span>
                                                <template v-if="isSorted(column)">
                                                    <v-icon dense :icon="getSortIcon(column)"></v-icon>
                                                </template>
                                                <template v-else>
                                                    <v-icon dense></v-icon>
                                                </template>

                                            </div>
                                        </td>
                                    </template>
                                </tr>
                            </template>
                            <template v-slot:no-data>
                                目前尚無人競標
                            </template>
                        </v-data-table-virtual>
                        <!-- <v-table density="compact">
                            <thead>
                                <tr>
                                    <td>姓名</td>
                                    <td>編號</td>
                                    <td>下注金額</td>
                                    <td>驗證碼</td>
                                </tr>
                            </thead>
                            <tbody>
                                <tr></tr>
                            </tbody>
                        </v-table> -->
                    </div>

                </v-card-text>
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
const headers = [
    { title: '姓名', align: 'start', key: 'name' },
    { title: '編號', align: 'center', key: 'index' },
    { title: '下標金額', align: 'end', key: 'bidding' },
    { title: '驗證碼', align: 'center', key: 'verificationCode' },
]
const virtualBoats = ref([
    { name: '王小明', bidding: 123, index: 1, verificationCode: 'F8S13r' },
    { name: '王小ㄑ', bidding: 11233, index: 2, verificationCode: 'F8S13r' },
    { name: 'asdf;jhasdf', bidding: 1233123, index: 3, verificationCode: 'F8S13r' }
])
async function startup() {
    isAuth.value = true;
}
onMounted(startup)




</script>

<style lang="css">
.v-data-table__td {
    padding: 0 8px !important;
}

td {
    padding: 0 8px !important;
}
</style>