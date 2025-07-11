import { useState, useEffect, useRef } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  threshold?: number
  initialDirection?: ScrollDirection
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollDirection {
  const { threshold = 10, initialDirection = null } = options

  const scrollDirectionRef = useRef<ScrollDirection>(initialDirection)
  const lastScrollY = useRef<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    function handleScroll() {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY.current

      // Only update direction if scroll difference exceeds threshold
      if (Math.abs(scrollDifference) > threshold) {
        const newDirection: ScrollDirection = scrollDifference > 0 ? 'down' : 'up'
        scrollDirectionRef.current = newDirection
        lastScrollY.current = currentScrollY
      }
    }

    // Set initial scroll position
    lastScrollY.current = window.scrollY

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [threshold])

  return scrollDirectionRef.current
}
