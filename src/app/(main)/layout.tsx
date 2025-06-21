import { ReactNode } from 'react'

import Navbar from './_components/navbar'

type Props = {
  children: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <div className='grid h-screen w-full max-w-7xl grid-cols-1 grid-rows-[1fr_auto] sm:mx-auto sm:w-full sm:grid-cols-[60px_auto] sm:grid-rows-1 lg:grid-cols-[70px_600px_320px] lg:grid-rows-1 xl:grid-cols-[240px_600px_410px] xl:grid-rows-1'>
      {/* Navbar */}
      <div className='order-1 border-t sm:-order-1 sm:border-none'>
        <Navbar />
      </div>

      {/* Main */}
      <main className='w-full sm:border-x'>{children}</main>

      {/* Sidebar */}
      <div className='hidden lg:block'>
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis dignissimos earum vitae nihil temporibus quaerat
        aspernatur corrupti debitis asperiores. Ea sed distinctio dolores laudantium quibusdam, possimus nemo iure
        officiis? Eius.
      </div>
    </div>
  )
}

export default Layout
