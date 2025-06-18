<template>
  <main>
    <AppLoading :is-loading="auth.isLoading.value" />
    <div class="left-side">
      <header>
        <img src="/logo.svg" alt="Eddy logo" class="logo" />
        <div class="info">
          <h1>Sign In</h1>
          <p>Welcome back! We're thrilled to have you return.</p>
        </div>
      </header>
      <div>
        <n-form @submit.prevent="handleSubmit" :model="form" :rules="rules">
          <n-form-item label="Email" path="email">
            <n-input
              v-model:value="form.email"
              placeholder="Enter your email"
            />
          </n-form-item>

          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="form.password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="Enter your password"
            >
              <template #suffix>
                <n-button text @click="showPassword = !showPassword">
                  <n-icon>
                    <eye-outline v-if="!showPassword" />
                    <eye-off-outline v-else />
                  </n-icon>
                </n-button>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item>
            <n-button type="primary" class="continue-btn" @click="handleSubmit">
              Sign In
            </n-button>
          </n-form-item>
        </n-form>
        <p class="auth-link">
          Don't have an account? <NuxtLink to="/sign-up">Sign up</NuxtLink>
        </p>
      </div>
    </div>
    <div class="right-side">
      <div class="bg-signin"></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";

const router = useRouter();
const showPassword = ref(false);

// Use the auth composable
const auth = useAuth();

const form = ref({
  email: "",
  password: "",
});

const rules = {
  email: [
    {
      required: true,
      message: "Email is required",
      trigger: ["blur", "input"],
    },
    { type: "email", message: "Invalid email", trigger: "blur" },
  ],
  password: [
    {
      required: true,
      message: "Password is required",
      trigger: ["blur", "input"],
    },
    {
      min: 6,
      message: "Password must be at least 6 characters",
      trigger: "blur",
    },
  ],
};

async function handleSubmit() {
  console.log("Sign in form submitted", form.value);

  try {
    auth.isLoading.value = true;
    const config = useRuntimeConfig();

    const response = await fetch(`${config.public.apiBase}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);
    router.push("/dashboard");
  } catch (error) {
    console.error("Login error:", error);
    alert(error.message || "An error occurred during sign in");
  } finally {
    auth.isLoading.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/auth.scss" as *;
</style>
