<template>
  <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
    <v-card title="競標籌碼" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">
      <v-form @submit.prevent="submitBidding" validate-on="input" v-model="formValid">
        <v-card-text>
          {{ text ? text : '當競標時間結束時，出價最高者將可得到點數。' }}
        </v-card-text>
        <v-card-text class="pb-0">

          <v-text-field :loading="loading" :disabled="loading" v-model="name" append-inner-icon="mdi-account"
            :rules="[required]" label="名稱" placeholder="請填寫下標的名稱" variant="solo-filled" flat></v-text-field>
          <v-text-field :loading="loading" :disabled="loading" v-model="bidding" append-inner-icon="mdi-currency-usd"
            :rules="[isNumber]" :step="500" label="競標金額" type="number" variant="solo-filled" flat></v-text-field>
          <DisplayRes :res="res"></DisplayRes>

        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn type="submit" block flat :loading="loading" :disabled="!formValid">送出</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <v-card title="紀錄" subtitle="上次的競標資訊會記錄在這邊" style="max-width: 100%; width: 500px;" class="mb-4" v-if="index">
      <v-card-text>

        <v-table density="compact">
          <tbody>
            <tr>
              <td>
                編號
              </td>
              <td>{{ index }}</td>
            </tr>
            <tr>
              <td>驗證碼</td>
              <td>{{ verificationCode }}</td>
            </tr>
            <tr>
              <td>下標金額</td>
              <td> {{ bidded }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-card-text>
    </v-card>
    <!-- <router-link to="admin" class="text-caption text-grey">點此前往管理員頁面</router-link> -->
  </v-container>
</template>

<script lang="ts" setup>
import { post_api, fetch_api } from '@/utils';
import { ref } from 'vue';
import { SubmitEventPromise } from 'vuetify';
import { required, isNumber } from '@/utils';
import { onMounted } from 'vue';

import DisplayRes from '@/components/DisplayRes.vue';

const text = ref()

const loading = ref(false)
const formValid = ref(false)

const name = ref()
const bidding = ref(1000)

const res = ref()

const index = ref()
const verificationCode = ref()
const bidded = ref()

async function submitBidding(event: SubmitEventPromise) {
  loading.value = true;
  const results = await event
  if (results.valid) {
    res.value = await post_api('/bidding', {
      name: name.value,
      bidding: Number(bidding.value)
    })
    if (res.value.type == 'success') {
      localStorage.setItem('index', res.value.data.index)
      localStorage.setItem('verificationCode', res.value.data.verificationCode)
      localStorage.setItem('bidded', bidding.value.toString())
      await checkStorage()
    }
    // let res = await post_api("/login", {
    //   email: email.value,
    //   password: password.value,
    // });
    // addSnackbar(res);
    // if (res.status == "success") {
    //   await login(res.data);
    //   let redirect_path = route.query.redirect;
    //   if (redirect_path) {
    //     await router.push(redirect_path.toString());
    //   } else {
    //     await router.push("/");
    //   }
    // }
  }
  loading.value = false;
}

async function checkStorage() {
  index.value = localStorage.getItem('index')
  verificationCode.value = localStorage.getItem('verificationCode')
  bidded.value = localStorage.getItem('bidded')
}

async function load() {
  await checkStorage()
  text.value = (await fetch_api('/text')).data
}

onMounted(load)



</script>
