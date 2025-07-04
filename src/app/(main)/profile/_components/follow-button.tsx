'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { GetUserOutput } from '@/queries/user'

type Props = {
  user: GetUserOutput
  currentUser: GetUserOutput
}

const FollowButton = ({ user, currentUser }: Props) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleFollow = async () => {
    setIsLoading(true)
    try {
      if (!user.isFollowing) await axios.post('/api/user/follow', { id: user.id })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to follow user')
    } finally {
      setIsLoading(false)
    }
  }

  const handleUnfollow = async () => {
    setIsLoading(true)
    try {
      if (user.isFollowing) await axios.post('/api/user/unfollow', { id: user.id })
      router.refresh()
    } catch (error) {
      console.error(error)
      toast.error('Failed to unfollow user')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {user.isFollowing ? (
        <Button
          variant='destructive'
          className='absolute top-3 right-3'
          onClick={handleUnfollow}
          disabled={isLoading}
        >
          Unfollow
        </Button>
      ) : (
        <Button
          variant='secondary'
          className='absolute top-3 right-3'
          onClick={handleFollow}
          disabled={isLoading}
        >
          Follow
        </Button>
      )}
    </>
  )
}

export default FollowButton
