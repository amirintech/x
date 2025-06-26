# FileUploader Component

A modern, customizable file uploader component built with UploadThing, React, and TypeScript. Features drag-and-drop functionality, file preview, progress indicators, and comprehensive error handling.

## Features

- 🎯 **Drag & Drop Support** - Intuitive drag-and-drop interface
- 📁 **File Preview** - Visual preview of uploaded files
- 📊 **Progress Tracking** - Real-time upload progress indicators
- 🎨 **Customizable UI** - Modern design with dark mode support
- 🔒 **File Validation** - Type and size validation
- ⚡ **UploadThing Integration** - Built on UploadThing for reliable file uploads
- 📱 **Responsive Design** - Works on all device sizes
- 🎭 **TypeScript Support** - Full type safety
- 🚀 **Upload-Then-Tweet Flow** - Files upload automatically when tweet button is pressed

## Installation

The component is already integrated into your project. Make sure you have the required dependencies:

```bash
bun add @uploadthing/react uploadthing
```

## Basic Usage

```tsx
import FileUploader from '@/components/shared/tweet-composer/file-uploader'

function MyComponent() {
  const handleUploadComplete = (urls: string[]) => {
    console.log('Upload completed:', urls)
    // Handle the uploaded file URLs
  }

  const handleUploadError = (error: Error) => {
    console.error('Upload failed:', error)
    // Handle upload errors
  }

  return (
    <FileUploader
      onUploadComplete={handleUploadComplete}
      onUploadError={handleUploadError}
      maxFiles={4}
      maxSize={4 * 1024 * 1024} // 4MB
      acceptedFileTypes={['image/*']}
    />
  )
}
```

## Props

| Prop                | Type                       | Default           | Description                                 |
| ------------------- | -------------------------- | ----------------- | ------------------------------------------- |
| `onUploadComplete`  | `(urls: string[]) => void` | -                 | Callback when upload completes successfully |
| `onUploadError`     | `(error: Error) => void`   | -                 | Callback when upload fails                  |
| `onUploadStart`     | `() => void`               | -                 | Callback when upload starts                 |
| `maxFiles`          | `number`                   | `4`               | Maximum number of files to upload           |
| `maxSize`           | `number`                   | `4 * 1024 * 1024` | Maximum file size in bytes (4MB)            |
| `acceptedFileTypes` | `string[]`                 | `['image/*']`     | Array of accepted MIME types                |
| `className`         | `string`                   | -                 | Additional CSS classes                      |
| `autoUpload`        | `boolean`                  | `true`            | Whether to upload files immediately         |
| `triggerUpload`     | `boolean`                  | `false`           | External trigger for manual upload          |
| `onUploadTriggered` | `() => void`               | -                 | Callback when upload is triggered           |

## Upload-Then-Tweet Flow

The FileUploader is integrated with the tweet composer to implement an efficient upload-then-tweet flow:

### How it Works:

1. **File Selection**: User selects files (they are queued, not uploaded yet)
2. **Tweet Button Pressed**: When user clicks "Tweet", files are uploaded first
3. **Upload Progress**: Real-time progress tracking during upload
4. **Tweet Creation**: After successful upload, tweet is created with file URLs
5. **Success Notification**: User gets confirmation of successful upload and tweet

### Benefits:

- ✅ **Efficient**: Files are only uploaded when user commits to posting
- ✅ **User-Friendly**: Clear progress indication and error handling
- ✅ **Reliable**: Tweet only created after successful file upload
- ✅ **Cost-Effective**: No wasted uploads for abandoned tweets

## Configuration

### UploadThing Setup

The component uses UploadThing for file uploads. Make sure your UploadThing configuration is set up correctly:

1. **API Route** (`src/app/api/uploadthing/route.ts`):

```tsx
import { createRouteHandler } from 'uploadthing/next'
import { ourFileRouter } from './core'

export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
})
```

2. **Core Configuration** (`src/app/api/uploadthing/core.ts`):

```tsx
import { createUploadthing, type FileRouter } from 'uploadthing/next'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async ({ req }) => {
      // Add your authentication logic here
      return { userId: 'user-id' }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete:', file.url)
      return { uploadedBy: metadata.userId }
    }),
} satisfies FileRouter
```

3. **Client Configuration** (`src/lib/uploadthing.ts`):

```tsx
import { generateReactHelpers } from '@uploadthing/react'
import type { OurFileRouter } from '@/app/api/uploadthing/core'

export const { useUploadThing, uploadFiles } = generateReactHelpers<OurFileRouter>()
```

## Examples

### Basic Image Uploader (Auto Upload)

```tsx
<FileUploader
  onUploadComplete={(urls) => setImages(urls)}
  onUploadError={(error) => toast.error('Upload failed')}
  maxFiles={4}
  maxSize={4 * 1024 * 1024}
  acceptedFileTypes={['image/*']}
  autoUpload={true}
/>
```

### Manual Upload (Upload-Then-Tweet)

```tsx
<FileUploader
  onUploadComplete={(urls) => createTweet(urls)}
  onUploadError={(error) => console.error(error)}
  maxFiles={4}
  maxSize={4 * 1024 * 1024}
  acceptedFileTypes={['image/*']}
  autoUpload={false}
  triggerUpload={triggerUpload}
  onUploadTriggered={() => setTriggerUpload(false)}
/>
```

### Single File Uploader

```tsx
<FileUploader
  onUploadComplete={(urls) => setDocument(urls[0])}
  onUploadError={(error) => console.error(error)}
  maxFiles={1}
  maxSize={10 * 1024 * 1024} // 10MB
  acceptedFileTypes={['application/pdf', 'image/*']}
/>
```

### Custom Styled Uploader

```tsx
<FileUploader
  onUploadComplete={handleUpload}
  onUploadError={handleError}
  maxFiles={3}
  maxSize={5 * 1024 * 1024}
  acceptedFileTypes={['image/*', 'video/*']}
  className='rounded-xl border-2 border-blue-200 p-4'
/>
```

## Integration with Tweet Composer

The FileUploader is integrated into the tweet composer with the following features:

- **Toggle Uploader**: Click media icon to show/hide file uploader
- **File Queue**: Files are queued until tweet button is pressed
- **Progress Tracking**: Real-time upload progress with visual indicators
- **Error Handling**: Comprehensive error handling with user feedback
- **Automatic Tweet Creation**: Tweet is created automatically after successful upload

## Demo Page

Visit `/demo-upload` to see the FileUploader in action with different configurations and examples.

## Styling

The component uses Tailwind CSS and supports:

- Light and dark mode
- Custom className prop for additional styling
- Responsive design
- Hover and focus states
- Loading animations

## Error Handling

The component handles various error scenarios:

- File type validation
- File size validation
- Upload failures
- Network errors

All errors are passed to the `onUploadError` callback for custom handling.

## Browser Support

- Modern browsers with ES6+ support
- Drag and drop API support
- File API support

## Contributing

To modify the FileUploader component:

1. Edit `src/components/shared/tweet-composer/file-uploader.tsx`
2. Update the UploadThing configuration if needed
3. Test with different file types and sizes
4. Update this documentation

## License

This component is part of your project and follows the same license terms.
