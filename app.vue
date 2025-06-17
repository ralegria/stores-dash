<template>
  <n-config-provider :theme="darkTheme">
    <NuxtLayout>
      <main>
        <NuxtPage />
      </main>
    </NuxtLayout>
  </n-config-provider>
</template>

<style scoped></style>

<script>
import { defineComponent } from "vue";
import { darkTheme } from "naive-ui";

export default defineComponent({
  setup() {
    return {
      darkTheme,
    };
  },
});
</script>
