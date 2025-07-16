import { ReactNode } from 'react'

import Navbar from '../../components/shared/navbar'
import Sidebar from '../../components/shared/sidebar'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='flex justify-center'>
      <div className='flex w-full max-w-7xl justify-center'>
        {/* Navbar (Left Sidebar) */}
        <Navbar />

        {/* Main Content */}
        <main className='w-full max-w-[590px] flex-1 sm:border-x'>{children}</main>

        {/* Sidebar (Right) */}
        <div className='sticky top-0 hidden shrink-0 self-start p-3 pt-0 lg:block lg:w-[330px] xl:w-[360px]'>
          <Sidebar />
        </div>
      </div>
    </div>
  )
}

export default Layout
