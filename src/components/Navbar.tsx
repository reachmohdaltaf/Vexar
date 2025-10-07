'use client'
import Image from 'next/image'
import React, { useState } from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
  const [open, setOpen] = useState(false)

  const handleSidebar = () => {
    setOpen(!open)
  }

  return (
    <div className='p-2 bg-white md:p-5 flex items-center justify-between relative'>
      {/* Logo */}
      <Link href={'/'} className="logo flex items-center">
        <Image
          src={'/logo.svg'}
          height={40}
          width={40}
          alt='logo'
        />
      </Link>

      {/* Desktop Navigation */}
      <div className='hidden md:flex items-center'>
        <ul className='flex gap-4 text-sm font-medium text-primary/40'>
          <Link href="/customer-stories" className='hover:text-primary cursor-pointer flex items-center'>Customer Stories</Link>
          <Link href="/pricing" className='hover:text-primary cursor-pointer flex items-center'>Pricing</Link>
          <Link href="/features" className='hover:text-primary cursor-pointer flex items-center'>Features</Link>
          <Link href="/career" className='hover:text-primary cursor-pointer flex items-center'>Career</Link>
          <Link href="/support" className='hover:text-primary cursor-pointer flex items-center'>Support</Link>
          <Link href="/why-us" className='hover:text-primary cursor-pointer flex items-center'>Why us?</Link>
        </ul>
      </div>

      {/* Right Section */}
      <div className='flex gap-2 items-center'>
        {/* Desktop Buttons */}
        <Link href='/login' className='hidden md:block'>
          <Button size='lg' variant='ghost'>Login</Button>
        </Link>
        <Link href='/signup' className='hidden md:block'>
          <Button size='lg'>Get a Demo</Button>
        </Link>

        {/* Mobile Menu Button */}
        <Button size='lg' onClick={handleSidebar} variant='ghost' className='md:hidden'>
          {open ? <X /> : <Menu />}
        </Button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className='absolute top-full left-0 w-full bg-white shadow-md flex flex-col p-4 md:hidden z-50'>
          <Link onClick={handleSidebar} href="/customer-stories" className='py-2 text-primary/70 hover:text-primary'>Customer Stories</Link>
          <Link onClick={handleSidebar} href="/pricing" className='py-2 text-primary/70 hover:text-primary'>Pricing</Link>
          <Link onClick={handleSidebar} href="/features" className='py-2 text-primary/70 hover:text-primary'>Features</Link>
          <Link onClick={handleSidebar} href="/career" className='py-2 text-primary/70 hover:text-primary'>Career</Link>
          <Link onClick={handleSidebar} href="/support" className='py-2 text-primary/70 hover:text-primary'>Support</Link>
          <Link onClick={handleSidebar} href="/why-us" className='py-2 text-primary/70 hover:text-primary'>Why us?</Link>
          <div className='flex flex-col gap-2 mt-4'>
            <Link href='/login'>
              <Button size='lg' variant='ghost' className='w-full'>Login</Button>
            </Link>
            <Link href='/signup'>
              <Button size='lg' className='w-full'>Get a Demo</Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar
