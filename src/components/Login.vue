<template>
    
    <v-form @submit.prevent="submitLogin" validate-on="input" v-model="formValid">
        <v-card-text>
          請先登入。
        </v-card-text>
        <v-card-text class="pb-0">

          <v-text-field :loading="loading" :disabled="loading" v-model="username" append-inner-icon="mdi-account" :rules="[required]" label="使用者名稱"
            variant="solo-filled" flat></v-text-field>
          <v-text-field :loading="loading" :disabled="loading" v-model="password" append-inner-icon="mdi-lock" :rules="[required]"  label="密碼"
            type="password" variant="solo-filled" flat></v-text-field>
            <DisplayRes :res="res"></DisplayRes>
        </v-card-text>
        <v-card-actions class="px-4 pb-4">
          <v-btn type="submit" block flat :loading="loading" :disabled="!formValid">送出</v-btn>
        </v-card-actions>
      </v-form>
    
</template>
<script setup lang="ts">
import { SubmitEventPromise } from 'vuetify';
import { required,  post_api } from '@/utils';
import DisplayRes from './DisplayRes.vue';
import { ref } from 'vue';

const loading = ref(false)
const formValid = ref(false)

const username = ref()
const password = ref()
const res = ref()

const emits = defineEmits(['auth'])

async function submitLogin(event: SubmitEventPromise) {
  loading.value = true;
  const results = await event
  if (results.valid) {
    res.value = await post_api('/login', {
        username: username,
        password: password
    })
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