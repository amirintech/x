import React from 'react'
import { Button } from '@/components/ui/button'

type Props = {}

const SubscribeCTA = (props: Props) => {
  return (
    <div className='space-y-1 rounded-xl border p-3'>
      <h2 className='text-xl font-extrabold'>Subscribe to Premium</h2>
      <p className='text-foreground'>Subscribe to unlock new features and if eligible, receive a share of revenue.</p>
      <Button className='mt-2'>Subscribe</Button>
    </div>
  )
}

export default SubscribeCTA
