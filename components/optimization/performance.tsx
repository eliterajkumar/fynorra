"use client";

import React, { useEffect } from 'react';

export function PerformanceOptimizer() {
  useEffect(() => {
    // Preload critical assets
    const criticalAssets = [
      '/logo.jpeg',
      '/placeholder-logo.png',
    ];

    criticalAssets.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = asset;
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const fontLinks = document.querySelectorAll('link[rel="preload"][as="font"]');
    fontLinks.forEach(link => {
      link.setAttribute('crossorigin', '');
    });

    // Optimize images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      if (!img.loading) {
        img.loading = 'lazy';
      }
    });

    // Add intersection observer for lazy loading
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target as HTMLImageElement;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
              observer.unobserve(img);
            }
          }
        });
      });

      const lazyImages = document.querySelectorAll('img[data-src]');
      lazyImages.forEach(img => imageObserver.observe(img));
    }

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
    preconnectToExternalDomains();
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