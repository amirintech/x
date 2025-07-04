'use client'

import { useMemo } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { GoHomeFill, GoHome, GoBell, GoBellFill, GoPerson, GoPersonFill } from 'react-icons/go'
import {
  IoSearchOutline,
  IoSearch,
  IoMailOutline,
  IoMail,
  IoRose,
  IoRoseOutline,
  IoLogOutOutline,
} from 'react-icons/io5'
import { FaFeatherPointed } from 'react-icons/fa6'

import Logo from './logo'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useNavbarScroll } from '@/hooks/useNavbarScroll'
import { SignOutButton, useUser } from '@clerk/nextjs'

const Navbar = () => {
  const currentUser = useUser()
  const pathname = usePathname()
  const { isNavbarVisible } = useNavbarScroll()
  const iconSize = 26
  const routes = useMemo(
    () => [
      {
        label: 'Home',
        href: '/',
        icon: pathname === '/' ? <GoHomeFill size={iconSize} /> : <GoHome size={iconSize} />,
      },
      {
        label: 'Explore',
        href: '/explore',
        icon: pathname === '/explore' ? <IoSearch size={iconSize} /> : <IoSearchOutline size={iconSize} />,
      },
      {
        label: 'Notifications',
        href: '/notifications',
        icon: pathname === '/notifications' ? <GoBellFill size={iconSize} /> : <GoBell size={iconSize} />,
      },
      {
        label: 'Messages',
        href: '/messages',
        icon: pathname === '/messages' ? <IoMail size={iconSize} /> : <IoMailOutline size={iconSize} />,
      },
      {
        label: 'Grok',
        href: '/grok',
        icon: pathname === '/grok' ? <IoRose size={iconSize} /> : <IoRoseOutline size={iconSize} />,
        desktopOnly: true,
      },
      {
        label: 'Profile',
        href: currentUser.isSignedIn ? `/profile/${currentUser.user.username}` : '',
        icon: pathname === '/profile' ? <GoPersonFill size={iconSize} /> : <GoPerson size={iconSize} />,
      },
      {
        label: 'Logout',
        href: '#',
        icon: (
          <SignOutButton>
            <IoLogOutOutline size={iconSize} />
          </SignOutButton>
        ),
        desktopOnly: true,
      },
    ],
    [pathname],
  )

  return (
    <div
      className={cn(
        'bg-background fixed bottom-0 left-0 z-50 w-full shrink-0 border-t px-2 py-0.5 sm:sticky sm:top-0 sm:w-[60px] sm:self-start sm:border-none sm:p-3 lg:w-[70px] xl:w-[240px]',
        'transition-transform duration-300 ease-in-out',
        // On small screens, translate down when hidden, otherwise show normally
        'sm:translate-y-0',
        isNavbarVisible ? 'translate-y-0' : 'translate-y-full',
      )}
    >
      <nav className='flex h-fit w-full items-center justify-between gap-2 sm:h-full sm:flex-col sm:justify-start xl:items-start'>
        <Link
          href='/'
          className='mb-3 hidden sm:block xl:pl-2.5'
        >
          <Logo />
        </Link>
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'hover:bg-foreground/10 flex size-fit items-center justify-center rounded-full p-3 xl:w-fit xl:justify-start xl:gap-3 xl:pr-6',
              route.desktopOnly && 'hidden sm:flex',
            )}
          >
            {route.icon}
            <span className={cn('sr-only text-lg font-medium xl:not-sr-only', pathname === route.href && 'font-bold')}>
              {route.label}
            </span>
          </Link>
        ))}

        <Button
          size='lg'
          className='mt-3 hidden !size-12 w-full items-center justify-center p-0 text-lg sm:flex xl:h-12 xl:!w-full'
        >
          <>
            <FaFeatherPointed size={20} />
            <span className='hidden xl:block'>Tweet</span>
          </>
        </Button>
      </nav>
    </div>
  )
}

export default Navbar
