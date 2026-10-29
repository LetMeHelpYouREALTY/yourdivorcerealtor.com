'use client';

import { Suspense, useEffect, useRef, useState } from 'react';
import { CalendlyLink } from '@/components/calendly/CalendlyLink';
import { SectionHeader } from '@/components/layouts/SectionHeader';
import { useRealScoutScriptReady } from '@/hooks/useRealScoutScriptReady';

/**
 * RealScout Single Family Home Listings Widget
 * Optimized with lazy loading and error handling
 */
function RealScoutFamilyHomesWidget() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const scriptReady = useRealScoutScriptReady(isVisible);
  // Error state reserved for future widget load error detection
  const hasError = false;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }, // Start loading earlier for listings
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  if (hasError) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-8 text-center">
        <p className="mb-4 text-red-800">
          Unable to load property listings. Please
          {' '}
          <CalendlyLink className="font-semibold underline">
            schedule a call
          </CalendlyLink>
          {' '}
          to view available family homes.
        </p>
      </div>
    );
  }

  if (!isVisible || !scriptReady) {
    return (
      <div
        ref={containerRef}
        className="space-y-4"
        role="status"
        aria-live="polite"
      >
        <span className="sr-only">Loading family home listings</span>
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="h-64 animate-pulse rounded-lg bg-gray-200"
          />
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {/* @ts-expect-error - Custom element from RealScout */}
      <realscout-office-listings
        agent-encoded-id="QWdlbnQtMjI1MDUw"
        sort-order="NEWEST"
        listing-status="For Sale"
        property-types=",SFR"
        price-min="400000"
        price-max="1100000"
      />
    </div>
  );
}

export function RealScoutFamilyHomes() {
  return (
    <section className="bg-gray-50 py-16 sm:py-20 lg:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Family Homes for Your New Beginning"
          description="Need a home after divorce? Browse single-family homes in Las Vegas that give your children stability and space."
        />
        <Suspense
          fallback={(
            <div className="space-y-4" role="status" aria-live="polite">
              <span className="sr-only">Loading family home listings</span>
              {[1, 2, 3].map(i => (
                <div
                  key={i}
                  className="h-64 animate-pulse rounded-lg bg-gray-200"
                />
              ))}
            </div>
          )}
        >
          <RealScoutFamilyHomesWidget />
        </Suspense>
      </div>
    </section>
  );
}
