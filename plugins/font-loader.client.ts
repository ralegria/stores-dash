export default defineNuxtPlugin(() => {
  if (process.client) {
    // Add font loading optimization
    if ('fonts' in document) {
      // Use the Font Loading API if available
      Promise.all([
        (document as any).fonts.load('400 1em Inter'),
        (document as any).fonts.load('600 1em Inter')
      ]).then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    } else {
      // Fallback for browsers that don't support the Font Loading API
      document.documentElement.classList.add('fonts-loaded');
    }
  }
});