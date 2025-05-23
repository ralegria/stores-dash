<template>
  <div>
    <header class="main-header">
      <span class="logo">Stores</span>
      <nav>
        <NuxtLink to="/sign-in">Sign in</NuxtLink>
        <NuxtLink to="/sign-up" class="signup">Create a Store</NuxtLink>
      </nav>
    </header>
    <slot />
    <footer>
      <p>&copy; 2025 Stores. Powered by HappyCode</p>
    </footer>
  </div>
</template>

<style></style>
