'use client'

import axios from 'axios'
import { toast } from 'sonner'
import { useMemo, useState } from 'react'
import { CalendarClockIcon, ImageIcon, MapPinIcon, VoteIcon } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { genUploader } from 'uploadthing/client'

import ComposerAction from './composer-action'
import FileUploader from './file-uploader'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { renameFile } from '@/lib/files'
import { Skeleton } from '@/components/ui/skeleton'

const TweetComposer = () => {
  const [content, setContent] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [showFileUploader, setShowFileUploader] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const actions = useMemo(
    () => [
      {
        label: 'Media',
        icon: <ImageIcon size={18} />,
        onClick: () => setShowFileUploader(!showFileUploader),
      },
      { label: 'Poll', icon: <VoteIcon size={18} />, onClick: () => {} },
      { label: 'Schedule', icon: <CalendarClockIcon size={18} />, onClick: () => {} },
      { label: 'Location', icon: <MapPinIcon size={18} />, onClick: () => {} },
    ],
    [showFileUploader],
  )

  const { user } = useUser()
  if (!user)
    return (
      <div className='min-h-[132px] w-full p-3'>
        <div className='mx-auto flex max-w-[560px] gap-2'>
          {/* avatar */}
          <Skeleton className='!size-10 !rounded-full' />
          <div className='w-full space-y-3'>
            {/* textarea */}
            <Skeleton className='h-16 w-full' />
            <div className='flex items-center justify-between'>
              {/* compose actions */}
              <div className='flex items-center gap-4'>
                <Skeleton className='size-5 rounded' />
                <Skeleton className='size-5 rounded' />
                <Skeleton className='size-5 rounded' />
                <Skeleton className='size-5 rounded' />
              </div>
              {/* tweet button */}
              <Skeleton className='h-8 w-14 rounded-full' />
            </div>
          </div>
        </div>
      </div>
    )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const mediaSrcs: string[] = []
      if (file) {
        const renamedFile = renameFile(file, `${user.id}-${Date.now()}.${file.type.split('/')[1]}`)
        const fileResult = await genUploader().uploadFiles('profileImageUploader', {
          files: [renamedFile],
          onUploadProgress: () => {},
          onUploadBegin: () => {},
        })
        mediaSrcs.push(fileResult[0].ufsUrl)
      }
      await createTweet(mediaSrcs)
    } catch (error) {
      console.error(error)
      toast.error('Failed to create tweet')
    } finally {
      setIsLoading(false)
    }
  }

  const createTweet = async (mediaSrcs: string[]) => {
    setIsLoading(true)
    try {
      await axios.post('/api/tweet', {
        userId: user.id,
        content: content.trim(),
        mediaSrcs,
      })
      setContent('')
      setFile(null)
      setShowFileUploader(false)
      toast.success('Tweet posted successfully!')
    } catch (error) {
      console.error(error)
      toast.error('Failed to create tweet')
    } finally {
      setIsLoading(false)
    }
  }

  const handleFilesChange = (newFile: File | null) => {
    setFile(newFile)
  }

  const isSubmitDisabled = isLoading || (!content.trim() && file === null)

  return (
    <div className='min-h-[132px] w-full p-3'>
      <div className='mx-auto grid max-w-[560px] grid-cols-[auto_1fr] gap-2'>
        <Avatar className='size-10'>
          <AvatarImage src={user.imageUrl || '/images/default-profile.png'} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <form
          onSubmit={handleSubmit}
          className='space-y-3'
        >
          <Textarea
            placeholder='What is happening?'
            className='caret-accent resize-none rounded-none border-none !bg-transparent p-0 !text-xl shadow-none focus-visible:ring-0'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            disabled={isLoading}
          />

          {/* File Uploader */}
          {showFileUploader && (
            <div>
              <FileUploader
                file={file}
                onFilesChange={handleFilesChange}
                isDisabled={isLoading}
              />
            </div>
          )}

          <div className='flex items-center justify-between'>
            {/* compose actions */}
            <div className='flex items-center gap-4'>
              {actions.map((action) => (
                <ComposerAction
                  key={action.label}
                  {...action}
                />
              ))}
            </div>

            {/* tweet button */}
            <Button
              disabled={isSubmitDisabled}
              size='sm'
            >
              {isLoading ? 'Tweeting...' : 'Tweet'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TweetComposer
