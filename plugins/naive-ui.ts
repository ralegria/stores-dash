import { defineNuxtPlugin } from "#app";
import {
  create,
  NButton,
  NForm,
  NFormItem,
  NInput,
  NIcon,
  NConfigProvider,
  NProgress
} from "naive-ui";

// Create a custom naive UI instance with only the components we need
const naive = create({
  components: [
    NButton,
    NForm,
    NFormItem,
    NInput,
    NIcon,
    NConfigProvider,
    NProgress
  ],
});

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(naive);
});
