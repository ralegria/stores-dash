<template>
  <main>
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
          <n-form-item label="Email" path="email">
            <n-input
              v-model:value="form.email"
              placeholder="Enter your email"
            />
          </n-form-item>

          <n-form-item label="Password" path="password">
            <n-input
              v-model:value="form.password"
              type="password"
              placeholder="Enter your password"
            />
          </n-form-item>

          <n-form-item>
            <n-button
              type="primary"
              class="create-account-btn"
              native-type="submit"
              >Create account</n-button
            >
          </n-form-item>
        </n-form>
      </div>
    </div>
    <div class="right-side">
      <img class="bg-signup" src="/images/bg/singup.jpg" />
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from "vue";

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

function handleSubmit() {
  console.log("Creating account with:", form.value);
  // Add your API call or logic here
}
</script>

<style lang="scss" scoped>
main {
  display: grid;
  grid-template-columns: 5fr 5fr;
  height: 93vh;

  .left-side {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 100px 80px;

    header {
      display: flex;
      flex-direction: column;
      align-items: start;

      gap: 64px;

      .info {
        display: flex;
        flex-direction: column;
        gap: 8px;
      }
    }

    .create-account-btn {
      background: $primary-main;
      color: $neutral100;

      font-family: "Inter", sans-serif;
      font-size: 16px;
      font-style: normal;
      font-weight: 600;
      line-height: 150%;

      width: 100%;
      padding: 16px 0;
      height: fit-content;
    }
  }

  .right-side {
    padding: 24px;
    height: 100%;
    .bg-signup {
      width: 100%;
      height: 100%;
      object-fit: cover;
      border-radius: 4px;
      background: linear-gradient(0deg, #bac887 0%, #bac887 100%);
    }
  }

  // Responsive styles
  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    height: auto;

    .left-side {
      padding: 48px 24px;
      height: auto;
    }

    .right-side {
      display: none;
    }
  }

  @media (max-width: 600px) {
    .left-side {
      padding: 24px 8px;
      gap: 16px;

      header {
        gap: 32px;

        .info {
          gap: 4px;
        }
      }

      .create-account-btn {
        font-size: 14px;
        padding: 12px 0;
      }
    }
  }
}
</style>
