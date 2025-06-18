<template>
  <div class="dashboard">
    <h1>Dashboard</h1>
    <p>Welcome to your dashboard!</p>
    <n-button @click="handleLogout" type="primary">Logout</n-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();
const auth = useAuth();

const handleLogout = () => {
  auth.logout();
  router.push('/sign-in');
};
</script>

<style scoped lang="scss">
.dashboard {
  padding: 2rem;
  
  h1 {
    margin-bottom: 1rem;
  }
  
  p {
    margin-bottom: 2rem;
  }
}
</style>