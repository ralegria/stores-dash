export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server side to avoid hydration issues
  if (process.server) return;
  
  // Use the auth composable
  const { isAuthenticated } = useAuth();
  
  const publicRoutes = ['/sign-in', '/sign-up'];
  const isPublicRoute = publicRoutes.includes(to.path);
  
  // If user is not authenticated and trying to access protected route
  if (!isAuthenticated.value && !isPublicRoute) {
    return navigateTo('/sign-in');
  }
  
  // If user is authenticated and trying to access auth routes
  if (isAuthenticated.value && isPublicRoute) {
    return navigateTo('/dashboard');
  }
  
  // If user is accessing root, redirect based on auth status
  if (to.path === '/') {
    return navigateTo(isAuthenticated.value ? '/dashboard' : '/sign-in');
  }
});