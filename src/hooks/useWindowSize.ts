import { useState, useEffect, useRef } from 'react'

interface WindowSize {
  width: number
  height: number
}

export function useWindowSize(): WindowSize {
  const windowSizeRef = useRef<WindowSize>({
    width: typeof window !== 'undefined' ? window.innerWidth : 0,
    height: typeof window !== 'undefined' ? window.innerHeight : 0,
  })

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return

    function handleResize() {
      const newSize = {
        width: window.innerWidth,
        height: window.innerHeight,
      }
      windowSizeRef.current = newSize
    }

    // Set initial size
    handleResize()

    // Add event listener
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return windowSizeRef.current
}
