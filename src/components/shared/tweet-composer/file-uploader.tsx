'use client'

import { CloudUploadIcon, XIcon } from 'lucide-react'
import Image from 'next/image'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type Props = {
  file: File | null
  onFilesChange: (files: File | null) => void
  isDisabled: boolean
}

const FileUploader = ({ file, onFilesChange, isDisabled }: Props) => {
  if (file && file.type.startsWith('image/')) {
    return (
      <div className='group relative h-96 w-full'>
        <Image
          src={URL.createObjectURL(file)}
          alt='tweet media'
          fill
          className='rounded-lg object-cover'
        />
        <Button
          role='button'
          variant='ghost'
          size='icon'
          className='absolute top-2 right-2 z-10 flex items-center justify-center rounded-full bg-rose-700/10 text-rose-500 hover:bg-rose-500 hover:text-white'
          onClick={() => onFilesChange(null)}
          disabled={isDisabled}
        >
          <XIcon />
        </Button>
      </div>
    )
  }

  return (
    <label
      className={cn(
        'flex h-96 w-full flex-col items-center justify-center gap-y-4 rounded-lg border border-dashed border-gray-300 p-4',
        isDisabled && 'opacity-50',
      )}
    >
      <input
        type='file'
        className='hidden appearance-none'
        onChange={(e) => onFilesChange(e.target.files?.[0] || null)}
        disabled={isDisabled}
        accept='image/*'
      />
      <CloudUploadIcon className='text-accent size-20' />
      <span className='text-sm text-gray-500'>Upload an image</span>
    </label>
  )
}

export default FileUploader
