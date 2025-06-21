'use client'

import { useTheme } from 'next-themes'
import Image from 'next/image'

const Logo = () => {
  const { theme } = useTheme()
  const src = theme === 'light' ? '/icons/logo-dark.svg' : '/icons/logo-light.svg'

  return (
    <Image
      src={src}
      alt='logo'
      width={30}
      height={30}
    />
  )
}

export default Logo
