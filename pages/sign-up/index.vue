<template>
  <main>
    <AppLoading :is-loading="loading" />
    <div class="left-side">
      <header>
        <img src="/logo.svg" alt="Eddy logo" class="logo" />
        <div class="info">
          <h1>Create an account</h1>
          <p>Start now for free. No credit card required.</p>
        </div>
      </header>
      <div>
        <n-form @submit.prevent="handleSubmit" :model="form" :rules="rules">
          <n-form-item label="First Name" path="first_name">
            <n-input
              v-model="form.first_name"
              placeholder="Enter your first name"
            />
          </n-form-item>

          <n-form-item label="Last Name" path="last_name">
            <n-input
              v-model="form.last_name"
              placeholder="Enter your last name"
            />
          </n-form-item>

          <n-form-item label="Email" path="email">
            <n-input
              v-model="form.email"
              placeholder="Enter your email"
            />
          </n-form-item>

          <n-form-item label="Password" path="password">
            <div class="password-input">
              <n-input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
                @update:value="checkPasswordStrength"
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
              <div class="password-strength">
                <n-progress
                  type="line"
                  show-indicator="false"
                  :percentage="passwordStrength"
                  :color="passwordStrengthColor"
                  :height="8"
                />
                <span class="password-strength-text">
                  <b :style="{ color: passwordStrengthColor }"
                    >Password strength: {{ passwordStrengthText }}.</b
                  >
                  <i v-if="passwordStrengthText !== 'Strong'">
                    Try lengthening it or adding numbers or symbols.
                  </i>
                </span>
              </div>
            </div>
          </n-form-item>

          <n-form-item>
            <n-button
              type="primary"
              class="continue-btn"
              @click="handleSubmit"
              :loading="loading"
            >
              Create Account
            </n-button>
          </n-form-item>
        </n-form>
        <p class="auth-link">
          Already have an account? <NuxtLink to="/sign-in">Sign in</NuxtLink>
        </p>
      </div>
    </div>
    <div class="right-side">
      <div class="bg-signup"></div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { EyeOutline, EyeOffOutline } from "@vicons/ionicons5";

const router = useRouter();
const auth = useAuth();
const loading = ref(false);
const showPassword = ref(false);
const passwordStrength = ref(0);

const form = ref({
  first_name: "",
  last_name: "",
  email: "",
  password: "",
});

const passwordStrengthColor = computed(() => {
  if (passwordStrength.value < 30) return "#ff4d4f";
  if (passwordStrength.value < 60) return "#faad14";
  return "#52c41a";
});

const passwordStrengthText = computed(() => {
  if (passwordStrength.value < 30) return "Weak";
  if (passwordStrength.value < 60) return "Medium";
  return "Strong";
});

const checkPasswordStrength = (password: string) => {
  let strength = 0;

  // Length check
  if (password.length >= 8) strength += 20;

  // Contains number
  if (/\d/.test(password)) strength += 20;

  // Contains lowercase
  if (/[a-z]/.test(password)) strength += 20;

  // Contains uppercase
  if (/[A-Z]/.test(password)) strength += 20;

  // Contains special char
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 20;

  passwordStrength.value = strength;
};

const rules = {
  first_name: [
    {
      required: true,
      message: "First name is required",
      trigger: ["blur", "input"],
    },
  ],
  last_name: [
    {
      required: true,
      message: "Last name is required",
      trigger: ["blur", "input"],
    },
  ],
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

const config = useRuntimeConfig();

async function handleSubmit() {
  console.log("Sign up form submitted", form.value);

  try {
    loading.value = true;
    const response = await fetch(`${config.public.apiBase}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form.value),
    });

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    alert("Account created successfully!");
    router.push("/sign-in");
  } catch (error) {
    console.error("Registration error:", error);
    alert(error.message || "An error occurred during registration");
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
@use "@/assets/styles/auth.scss" as *;

.password-input {
  display: flex;
  flex-direction: column;
  gap: 8px;

  width: 100%;

  .password-strength {
    display: flex;
    flex-direction: column;
    align-items: start;
    gap: 8px;
  }
}

.password-strength-text {
  color: $white;
  font-size: 0.8rem;
  display: block;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;

  a {
    color: $primary-main;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
