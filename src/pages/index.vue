<template>
  <v-container class="d-flex text-center justify-center align-center h-100 flex-column">
    <v-card title="競標籌碼" subtitle="籌碼至上主義教室" style="max-width: 100%; width: 500px;" class="mb-4">
      <v-form @submit.prevent="submitBidding" validate-on="input" v-model="formValid">
        <v-card-text>
          當競標時間結束時，出價最高者將可得到點數。
        </v-card-text>
        <v-card-text class="pb-0">

          <v-text-field :loading="loading" :disabled="loading" v-model="name" append-inner-icon="mdi-account" :rules="[required]" label="姓名"
            variant="solo-filled" flat></v-text-field>
          <v-text-field :loading="loading" :disabled="loading" v-model="bid" append-inner-icon="mdi-currency-usd" :rules="[isNumber]" :step="500" label="競標金額"
            type="number" variant="solo-filled" flat></v-text-field>
            <DisplayRes :res="res"></DisplayRes>
            
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn type="submit" block flat :loading="loading" :disabled="!formValid">送出</v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
    <router-link to="admin" class="text-caption text-grey">點此前往管理員頁面</router-link>
  </v-container>
</template>

<script lang="ts" setup>
import { fetch_api } from '@/utils';
import { ref } from 'vue';
import { SubmitEventPromise } from 'vuetify';
import { required, isNumber } from '@/utils';
import DisplayRes from '@/components/DisplayRes.vue';



const loading = ref(false)
const formValid = ref(false)

const name = ref()
const bid = ref()

const res = ref()

async function submitBidding(event: SubmitEventPromise) {
  loading.value = true;
  const results = await event
  if (results.valid) {
    res.value = await fetch_api('/test')
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

</script>
