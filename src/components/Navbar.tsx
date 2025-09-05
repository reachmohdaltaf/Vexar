import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
  return (
    <div className='p-6 flex items-center justify-between'>
        <div className="logo flex items-center">
            <Image
            src={'/logo.svg'}
            height={40}
            width={40}
            alt='logo'
            />
            <h1 className='text-2xl font-semibold'>Vexar</h1>
        </div>
        <div className='flex'>
            <ul className='flex gap-2 text-sm font-medium text-muted  items-center'>
                <li className='hover:text-primary cursor-pointer'>Customer Stories</li>
                <li  className='hover:text-primary cursor-pointer'>Pricing</li>
                <li  className='hover:text-primary cursor-pointer'>About</li>
                <li  className='hover:text-primary cursor-pointer'>Career</li>
            </ul>
        </div>
        <div className='flex gap-2 items-center'>
          <Link href={'/login'}>  <Button size={'lg'} className='' variant={'ghost'}>Login</Button></Link>
           <Link href={'/signup'}>  <Button size={'lg'}>Get Started</Button></Link> 
        </div>
    </div>
  )
}

export default Navbar