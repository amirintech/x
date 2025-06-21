import { useState, useEffect } from 'react'

type ScrollDirection = 'up' | 'down' | null

interface UseScrollDirectionOptions {
  threshold?: number
  initialDirection?: ScrollDirection
}

export function useScrollDirection(options: UseScrollDirectionOptions = {}): ScrollDirection {
  const { threshold = 10, initialDirection = null } = options

  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(initialDirection)
  const [lastScrollY, setLastScrollY] = useState<number>(0)

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    function handleScroll() {
      const currentScrollY = window.scrollY
      const scrollDifference = currentScrollY - lastScrollY

      // Only update direction if scroll difference exceeds threshold
      if (Math.abs(scrollDifference) > threshold) {
        const newDirection: ScrollDirection = scrollDifference > 0 ? 'down' : 'up'
        setScrollDirection(newDirection)
        setLastScrollY(currentScrollY)
      }
    }

    // Set initial scroll position
    setLastScrollY(window.scrollY)

    // Add event listener
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Cleanup
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY, threshold])

  return scrollDirection
}
