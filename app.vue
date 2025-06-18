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

<script setup>
import { darkTheme } from "naive-ui";
</script>
