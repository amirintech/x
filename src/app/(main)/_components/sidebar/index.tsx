import React from 'react'
import Search from './search'
import SubscribeCTA from './subscribe-cta'
import TrendList from './trend-list'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside>
      <Search />
      <div className='space-y-3'>
        <SubscribeCTA />
        <TrendList />
        <TrendList />
      </div>
    </aside>
  )
}

export default Sidebar
