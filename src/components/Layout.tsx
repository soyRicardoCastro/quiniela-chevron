import React from 'react'
import Sidebar from './Sidebar'

interface Props {
  body: {
    children: JSX.Element | JSX.Element[]
  }
}

function Layout({ children }: Props['body']) {
  return (
    <main className='w-full h-full flex'>
      <Sidebar />
      
      <section className='w-full h-full bg-red-500'>
        {children}
      </section>
    </main>
  )
}

export default Layout