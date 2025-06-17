<template>
  <div>
    <header v-if="!isAuthPage" class="main-header">
      <span class="logo">
        <img src="/logo.svg" alt="Eddy logo" />
      </span>
      <nav>
        <NuxtLink to="/sign-in">Sign in</NuxtLink>
        <NuxtLink to="/sign-up" class="signup">Create a Store</NuxtLink>
      </nav>
    </header>
    <slot />
    <footer v-if="!isAuthPage">
      <p>&copy; 2025 Stores. Powered by HappyCode</p>
    </footer>
  </div>
</template>

<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
const isAuthPage = route.path === "/" || route.path === "/sign-up";
</script>

<style></style>
