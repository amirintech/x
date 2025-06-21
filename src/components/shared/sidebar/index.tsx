import React from 'react'
import Search from './search'
import SubscribeCTA from './subscribe-cta'
import TrendList from './trend-list'

type Props = {}

const Sidebar = (props: Props) => {
  return (
    <aside className='space-y-3'>
      <Search />
      <SubscribeCTA />
      <TrendList />
    </aside>
  )
}

export default Sidebar
