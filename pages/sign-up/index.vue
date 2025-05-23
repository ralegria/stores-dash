<template>
  <div class="auth-container">
    <h1>Crear cuenta</h1>
    <form @submit.prevent="handleSignUp" class="auth-form">
      <div class="form-group">
        <label for="firstName">Nombre</label>
        <input 
          id="firstName"
          v-model="formData.first_name"
          type="text"
          required
          placeholder="Tu nombre"
        />
      </div>
      
      <div class="form-group">
        <label for="lastName">Apellido</label>
        <input 
          id="lastName"
          v-model="formData.last_name"
          type="text"
          required
          placeholder="Tu apellido"
        />
      </div>

      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input 
          id="email"
          v-model="formData.email"
          type="email"
          required
          placeholder="tu@email.com"
        />
      </div>

      <div class="form-group">
        <label for="password">Contraseña</label>
        <input 
          id="password"
          v-model="formData.password"
          type="password"
          required
          placeholder="********"
        />
      </div>

      <button type="submit" class="submit-btn">Crear cuenta</button>

      <p class="auth-link">
        ¿Ya tienes una cuenta? <NuxtLink to="/sign-in">Inicia sesión</NuxtLink>
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: ''
})

const handleSignUp = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/auth/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData.value)
    })

    if (!response.ok) {
      throw new Error('Error en el registro')
    }

    const data = await response.json()
    // Redirect to sign in page after successful registration
    navigateTo('/sign-in')
  } catch (error) {
    console.error('Error:', error)
    // Here you would typically show an error message to the user
  }
}
</script>

<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.submit-btn {
  background-color: #4CAF50;
  color: white;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

.submit-btn:hover {
  background-color: #45a049;
}

.auth-link {
  text-align: center;
  margin-top: 1rem;
}

.auth-link a {
  color: #4CAF50;
  text-decoration: none;
}

.auth-link a:hover {
  text-decoration: underline;
}
</style>