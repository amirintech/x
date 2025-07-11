import { useState, useEffect, useRef } from 'react'
import { useScrollDirection } from './useScrollDirection'
import { useWindowSize } from './useWindowSize'

export function useNavbarScroll() {
  const { width } = useWindowSize()
  const scrollDirection = useScrollDirection({ threshold: 5 })
  const [isNavbarVisible, setIsNavbarVisible] = useState(true)
  const isSmallScreenRef = useRef(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)

  useEffect(() => {
    // Check if we're on a small screen (smaller than sm breakpoint)
    const smallScreen = width < 640 // sm breakpoint in Tailwind
    isSmallScreenRef.current = smallScreen
    setIsSmallScreen(smallScreen)
  }, [width])

  useEffect(() => {
    // Only apply scroll behavior on small screens
    if (!isSmallScreenRef.current) {
      setIsNavbarVisible(true)
      return
    }

    if (scrollDirection === 'down') {
      setIsNavbarVisible(false)
    } else if (scrollDirection === 'up') {
      setIsNavbarVisible(true)
    }
  }, [scrollDirection])

  return {
    isNavbarVisible,
    isSmallScreen,
    scrollDirection,
  }
}
