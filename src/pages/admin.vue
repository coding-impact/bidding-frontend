<template>
    <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
        <v-card title="管理員介面" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">

            <template v-if="isAuth">
                <v-card-text class="text-start">
                    <DisplayRes :res="res"></DisplayRes>
                    <v-list-subheader>目前設定</v-list-subheader>
                    <div class="pa-4" v-if="setting != undefined">
                        <v-switch :loading="loading" v-model="setting.enable" inset density="compact" hide-details label="開放競標"></v-switch>
                        <div class="d-flex justify-center text-center align-center py-2">
                            <div>
                                現在是第 {{ setting.epoch }} 次競標
                            </div>
                            <v-dialog width="300">
                                <template v-slot:activator="{props}">
                                    <v-btn v-bind="props" variant="text" class="ml-4"> 點此進入下一輪</v-btn>
                                        
                                    
                                </template>
                                <template v-slot:default="{ isActive }">
                                    <div>
                                        <v-card title="你確定要進入下一輪嗎？" text="這將會重置目前的編號，隱藏">
                                            <v-card-actions>
                                                <v-spacer>
                                                </v-spacer>
                                                <v-btn color="error" @click="isActive.value = false">取消</v-btn>
                                                <v-btn color="success" @click="nextEpoch();isActive.value = false">確定</v-btn>
                                            </v-card-actions>
                                        </v-card>        
                                    </div>
                                </template>
                                
                            </v-dialog>

                        </div>
                        <v-textarea :loading="loading" v-model="setting.text" density="compact" auto-grow hide-details
                            variant="solo-filled" flat label="目前顯示文字">

                        </v-textarea>
                        <v-expand-transition>
                            <v-btn variant="text" block @click="uploadSetting" :loading="loading"
                                v-if="JSON.stringify(oldSetting) != JSON.stringify(setting)">上傳新設定</v-btn>
                        </v-expand-transition>
                    </div>


                    <v-list-subheader>目前下標情況</v-list-subheader>
                    <div class="justify-center">
                        <v-data-table-virtual :headers="headers" :items="bidList" height="400" item-value="name"
                            :loading="bidList == undefined">
                            <template v-slot:loading>
                                <div>
                                    正在載入...
                                </div>
                            </template>
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
                <Login @auth="afterLogin"></Login>
            </template>
        </v-card>
        <router-link to="/" class="text-caption text-grey">點此前往競標頁面</router-link>
    </v-container>
</template>
<script lang="ts" setup>
import { onMounted, ref } from 'vue';
import DisplayRes from '@/components/DisplayRes.vue'

import { fetch_api, post_api } from '../utils.ts';
import Login from '@/components/Login.vue';

const isAuth = ref(false)
const setting = ref()
const oldSetting = ref()
const loading = ref(false)

const res = ref()

const headers = [
    { title: '姓名', align: 'start', key: 'name' },
    { title: '編號', align: 'center', key: 'index' },
    { title: '下標金額', align: 'end', key: 'bidding' },
    { title: '驗證碼', align: 'center', key: 'verificationCode' },
]
const bidList = ref()
// const bidList = ref([
// { name: '王小明', bidding: 123, index: 1, verificationCode: 'F8S13r' },
// { name: '王小ㄑ', bidding: 11233, index: 2, verificationCode: 'F8S13r' },
// { name: 'asdf;jhasdf', bidding: 1233123, index: 3, verificationCode: 'F8S13r' }
// ])

async function afterLogin() {
    if (isAuth.value == false) {
        await startup()
    }
}


async function startup() {
    const res = await fetch_api('/setting')
    if (res && res.type == 'success') {
        isAuth.value = true;
        setting.value = res.data
        bidList.value = (await fetch_api('/listBid')).data
        oldSetting.value = JSON.parse(JSON.stringify(setting.value))
    }
}
onMounted(startup)

async function uploadSetting() {
    loading.value = true
    res.value = await post_api('/setting', setting.value);
    await startup()
    loading.value =false
}


async function nextEpoch () {
    setting.value.epoch = setting.value.epoch + 1
    setting.value.index = 1;
    setting.value.enable = false;
    await uploadSetting()
}


</script>

<style lang="css">
.v-data-table__td {
    padding: 0 8px !important;
}

td {
    padding: 0 8px !important;
}
</style>