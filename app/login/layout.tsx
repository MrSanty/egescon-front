import { Meteors } from '@/components/ui/Meteors'
import React from 'react'

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      {children}
      <Meteors className='absolute inset-0 -z-10' />
    </div>
  )
}
