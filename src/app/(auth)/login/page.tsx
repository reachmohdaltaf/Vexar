import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Card, CardContent, CardDescription } from '@/components/ui/card'
import LoginForm from '@/components/LoginForm'

const LoginPage = () => {
  return (
<div className='flex flex-col gap-10 items-center mt-6 md:mt-28 min-h-screen'>
      <Link href={'/'} className="logo flex items-center gap-2">
        <Image src={'/logo.svg'} height={50} width={50} alt='logo' />
        <h1 className='text-3xl font-bold '>Vexar</h1>
      </Link>

      <LoginForm />

      <Card className='w-full border-none md:max-w-md flex items-center justify-center'>
        <CardContent className='text-center '>
          Need help signing up?
          <br />
          <Link href={'/signup'} className='font-semibold underline'>Learn more</Link>
        </CardContent>
      </Card>

      <Card className='bg-transparent shadow-none gap-0 border-none'>
        <CardDescription className='text-sm text-center'>
          Trusted by Industry-leading Teams
        </CardDescription>
        <div className='flex items-center gap-2 justify-center'>
          <Image src={'/notion.svg'} height={90} width={90} alt='notion' className='mr-4 h-14 w-14 md:h-20 md:w-20' />
          <Image src={'/brex.svg'} height={90} width={90} alt='brex' className='mr-4 h-14 w-14 md:h-20 md:w-20' />
          <Image src={'/nea.svg'} height={80} width={80} alt='nea' className='mr-4 h-14 w-14 md:h-20 md:w-20' />
          <Image src={'/accel.svg'} height={80} width={80} alt='accel' className='mr-4 h-14 w-14 md:h-20 md:w-20' />
        </div>
        <CardDescription className='text-center'>
          © 2025 Vexar AI, Inc · All rights reserved
        </CardDescription>
      </Card>
    </div>
  )
}

export default LoginPage
