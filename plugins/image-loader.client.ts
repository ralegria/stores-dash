export default defineNuxtPlugin(() => {
  // Lazy load images when they come into view
  if (process.client) {
    window.addEventListener('DOMContentLoaded', () => {
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      
      if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              const lazyImage = entry.target as HTMLImageElement;
              if (lazyImage.dataset.src) {
                lazyImage.src = lazyImage.dataset.src;
                lazyImage.removeAttribute('data-src');
              }
              imageObserver.unobserve(lazyImage);
            }
          });
        });
        
        lazyImages.forEach(image => {
          imageObserver.observe(image);
        });
      } else {
        // Fallback for browsers that don't support IntersectionObserver
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
          if (lazyLoadThrottleTimeout) {
            clearTimeout(lazyLoadThrottleTimeout);
          }
          
          lazyLoadThrottleTimeout = setTimeout(() => {
            const scrollTop = window.pageYOffset;
            lazyImages.forEach(img => {
              const imgElement = img as HTMLImageElement;
              if (imgElement.offsetTop < (window.innerHeight + scrollTop)) {
                if (imgElement.dataset.src) {
                  imgElement.src = imgElement.dataset.src;
                  imgElement.removeAttribute('data-src');
                }
              }
            });
            if (lazyImages.length === 0) {
              document.removeEventListener('scroll', lazyLoad);
              window.removeEventListener('resize', lazyLoad);
              window.removeEventListener('orientationChange', lazyLoad);
            }
          }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
      }
    });
  }
});