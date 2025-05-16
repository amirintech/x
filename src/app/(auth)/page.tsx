import Image from 'next/image'
import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'
import { FaApple } from 'react-icons/fa'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Page = () => {
  return (
    <div className='mx-auto h-screen max-w-md px-4 py-6 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-2 lg:place-items-center'>
      {/* logo */}
      <div className='relative size-12 lg:size-96'>
        <Image
          fill
          src='/icons/logo-light.svg'
          alt='logo'
          className='block dark:hidden'
        />
        <Image
          fill
          src='/icons/logo-dark.svg'
          alt='logo'
          className='hidden dark:block'
        />
      </div>

      {/* hero */}
      <section className='mt-14'>
        <h1 className='text-5xl font-black md:text-6xl lg:text-7xl'>Happening now</h1>

        <div className='max-w-xs lg:max-w-sm'>
          <div className='mt-10'>
            <h2 className='mb-6 text-3xl font-black md:text-4xl'>Join today.</h2>

            {/* social buttons */}
            <div className='flex flex-col gap-4'>
              <Button variant='secondary'>
                <FcGoogle />
                Continue with Google
              </Button>
              <Button variant='secondary'>
                <FaApple />
                Continue with Apple
              </Button>
            </div>

            {/* separator */}
            <div className='relative my-6'>
              <Separator />
              <span className='text-muted-foreground bg-background absolute top-1/2 left-1/2 inline-block -translate-x-1/2 -translate-y-1/2 px-2 text-sm'>
                OR
              </span>
            </div>

            {/* create account button */}
            <Button className='w-full'>Create account</Button>
            <p className='text-foreground/70 mt-1 text-xs tracking-wide'>
              By signing up, you agree to the{' '}
              <Link
                href='#'
                className='text-sky-600'
              >
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link
                href='#'
                className='text-sky-600'
              >
                Privacy Policy
              </Link>
              , including{' '}
              <Link
                href='#'
                className='text-sky-600'
              >
                Cookie Use
              </Link>
              .
            </p>
          </div>

          {/* sign in button */}
          <div className='mt-10'>
            <h3 className='mb-4 text-xl font-bold'>Already have an account?</h3>
            <Button className='w-full'>Sign in</Button>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Page
