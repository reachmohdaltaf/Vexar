import Navbar from '@/components/Navbar'
import React from 'react'

const HomeLayout = ({children} : {children: React.ReactNode}) => {
  return (
    <div className='bg-white'>
                <Navbar/>

        {children}
        
        </div>
  )
}

export default HomeLayout