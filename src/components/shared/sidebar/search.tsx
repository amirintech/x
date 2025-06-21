import { Input } from '@/components/ui/input'
import { SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Search = (props: Props) => {
  return (
    <div className='bg-background sticky top-0 flex h-14 items-center justify-center'>
      <div className='relative w-full'>
        <SearchIcon
          size={18}
          className='text-muted-foreground absolute top-1/2 left-3 -translate-y-1/2'
        />
        <Input
          placeholder='Search'
          className='focus-visible:ring-accent/20 focus-visible:border-accent h-12 rounded-full pl-8 shadow-none'
        />
      </div>
    </div>
  )
}

export default Search
