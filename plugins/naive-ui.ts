import { defineNuxtPlugin } from "#app";
import * as naive from "naive-ui";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(naive);
});
