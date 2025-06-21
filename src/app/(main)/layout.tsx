import { ReactNode } from 'react'

import Navbar from './_components/navbar'
import TweetComposer from '@/components/shared/tweet-composer'
import Sidebar from './_components/sidebar'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex items-center justify-center'>
      <div className='flex w-full max-w-7xl min-w-fit px-4'>
        {/* Navbar (Left Sidebar) */}
        <div className='sticky top-0 hidden shrink-0 self-start p-3 sm:block sm:w-[60px] lg:w-[70px] xl:w-[240px]'>
          <Navbar />
        </div>

        {/* Main Content */}
        <main className='w-full max-w-[590px] flex-1 border-x'>
          <TweetComposer />
          <section>{children}</section>
        </main>

        {/* Sidebar (Right) */}
        <div className='sticky top-0 hidden shrink-0 self-start p-3 pt-0 lg:block lg:w-[320px] xl:w-[410px]'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Layout
