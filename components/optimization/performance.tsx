"use client";

import React, { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical resources
    const preloadCriticalResources = () => {
      const criticalResources = [
        '/fynorra-demo.mp4',
        '/video-poster.jpg',
        '/logo.png'
      ];

      criticalResources.forEach(resource => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = resource.endsWith('.mp4') ? 'video' : 'image';
        link.href = resource;
        document.head.appendChild(link);
      });
    };

    // Preconnect to external domains
    const preconnectToExternalDomains = () => {
      const domains = [
        'https://fonts.googleapis.com',
        'https://fonts.gstatic.com',
        'https://api.clerk.dev'
      ];

      domains.forEach(domain => {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        document.head.appendChild(link);
      });
    };

    // Optimize images with lazy loading
    const optimizeImages = () => {
      const images = document.querySelectorAll('img[data-src]');
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            img.src = img.dataset.src || '';
            img.classList.remove('lazy');
            observer.unobserve(img);
          }
        });
      });

      images.forEach(img => imageObserver.observe(img));
    };

    // Optimize videos
    const optimizeVideos = () => {
      const videos = document.querySelectorAll('video');
      videos.forEach(video => {
        // Optimize video loading
        video.addEventListener('loadstart', () => {
          video.style.opacity = '0';
        });
        
        video.addEventListener('canplay', () => {
          video.style.opacity = '1';
          video.style.transition = 'opacity 0.3s ease-in-out';
        });
      });
    };

    // Initialize optimizations
    preloadCriticalResources();
    preconnectToExternalDomains();
    optimizeImages();
    optimizeVideos();

    // Cleanup function
    return () => {
      // Cleanup if needed
    };
  }, []);

  return null; // This component doesn't render anything
}

// Utility function for lazy loading components
export function withLazyLoading<T extends object>(
  Component: React.ComponentType<T>,
  fallback?: React.ReactNode
) {
  const LazyComponent = React.lazy(() => 
    import(`@/components/${Component.name}`).then(module => ({
      default: module[Component.name]
    }))
  );

  return function LazyWrapper(props: T) {
    return (
      <React.Suspense fallback={fallback || <div>Loading...</div>}>
        <LazyComponent {...props} />
      </React.Suspense>
    );
  };
}

// Utility for optimizing images
export function OptimizedImage({ 
  src, 
  alt, 
  className, 
  width, 
  height,
  priority = false 
}: {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}) {
  return (
    <img
      src={priority ? src : undefined}
      data-src={!priority ? src : undefined}
      alt={alt}
      className={`${className || ''} ${!priority ? 'lazy' : ''}`}
      width={width}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
    />
  );
}

// Utility for optimizing videos
export function OptimizedVideo({
  src,
  poster,
  className,
  autoPlay = false,
  muted = false,
  loop = false,
  controls = false
}: {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}) {
  return (
    <video
      className={className}
      poster={poster}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
      playsInline
      preload="metadata"
    >
      <source src={src} type="video/mp4" />
      <source src={src.replace('.mp4', '.webm')} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  );
} 