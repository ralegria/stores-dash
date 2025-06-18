import { ref } from 'vue';

export const useAuth = () => {
  const token = ref(null);
  const isAuthenticated = ref(false);
  const isLoading = ref(false);
  const error = ref(null);
  
  // Initialize on client side only
  if (process.client) {
    token.value = localStorage.getItem('token');
    isAuthenticated.value = !!token.value;
  }
  
  const login = async (credentials) => {
    const config = useRuntimeConfig();
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch(`${config.public.apiBase}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      token.value = data.token;
      localStorage.setItem('token', token.value);
      isAuthenticated.value = true;
      
      return { success: true };
    } catch (e) {
      error.value = e.message || 'Authentication failed';
      return { success: false, error: error.value };
    } finally {
      isLoading.value = false;
    }
  };
  
  const logout = () => {
    token.value = null;
    isAuthenticated.value = false;
    if (process.client) {
      localStorage.removeItem('token');
    }
  };
  
  return {
    token,
    isAuthenticated,
    isLoading,
    error,
    login,
    logout
  };
};