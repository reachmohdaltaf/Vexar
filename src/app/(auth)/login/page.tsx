import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const LoginPage = () => {
  return (
    <div className='flex gap-8 flex-col items-center mt-28 min-h-screen'>
        <Link href={'/'} className="logo flex items-center gap-2">
            <Image
            src={'/logo.svg'} 
            height={50}
            width={50}
            alt='logo'
            />
            <h1 className='text-4xl font-semibold'>Vexar</h1>
        </Link>
        <Card className='w-full md:max-w-md border-none'>
            <CardHeader className='gap-0 py-0'>
                <CardTitle className='text-2xl'>Log In</CardTitle>
               <div className='flex flex-col mt-4 gap-2 '>
                 <Button size={'lg'} className='rounded-md flex items-center' variant={'outline'}><Image src={'/google.svg'} height={20} width={20} alt='google'/> Login with Google</Button>
                <Button size={'lg'} className=' rounded-md flex items-center' variant={'outline'}><Image src={'/microsoft.svg'} height={15} width={15} alt='google'/> Login with Google</Button>
               </div>
               <CardDescription className='mt-4'>
                 <div className='flex items-center justify-center'>
                or
            </div>
               </CardDescription>
            </CardHeader>

           <CardContent className='gap-3 flex flex-col'>
          <div className='flex flex-col gap-1'>
              <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="(eg) your.name@example.com" />
          </div>
          <Button size={'lg'} className='rounded-md bg-[#F5F5F5] border' variant={'ghost'}>
            Continue
          </Button>
          <CardDescription className='text-sm'>
            By using Vexar, you agree to our <Link href={'/privacy-policy'} className='underline'>
                Privacy Policy</Link> and our <Link href={'/terms-of-services'}>Terms of Service</Link>.
          </CardDescription>
           </CardContent>

        </Card>

        <Card className='w-full border-none md:max-w-md flex items-center justify-center'>
            <CardContent className='text-center '>
                Need help signing up?
<br />
<Link href={'/signup'} className='font-semibold underline'>Learn more</Link>
            </CardContent>
        </Card>

        <Card className='bg-transparent shadow-none gap-0 border-none'>
            <CardDescription className='text-sm text-center '>Trusted by Industry-leading Teams</CardDescription>
               <div className='flex items-center gap-2 justify-center'>
             <Image 
             src={'/notion.svg'}
             height={90}
             width={90}
             alt='notion'
             className='mr-4'
             />
             <Image 
             src={'/brex.svg'}
             height={90}
             width={90}
             alt='notion'
             className='mr-4'
             />
             <Image 
             src={'/nea.svg'}
             height={80}
             width={80}
             alt='notion'
             className='mr-4'
             />
             <Image 
             src={'/accel.svg'}
             height={80}
             width={80}
             alt='notion'
             className='mr-4'
             />
        </div>
        <CardDescription className='text-center'>
            © 2025 Vexar AI, Inc · All rights reserved
        </CardDescription>
        </Card>
     

    </div>
  )
}

export default LoginPage