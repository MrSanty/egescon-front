import Image from 'next/image'
import { AuthForm } from './component/AuthForm'
import { Copyright } from '@/components/shared'
import Logo from '@/public/images/logo.png'

export default function Login() {
  return (
    <div className="bg-white bg-opacity-90 rounded-lg shadow-xl overflow-hidden max-w-md w-full border border-zinc-200 mx-auto mt-1">
      <div className="p-8">
        <div className="text-center mb-4">
          <div className="mx-auto h-28 w-auto relative">
            <Image
              src={Logo}
              alt="Logo de eGesCon"
              fill
              style={{ objectFit: 'contain' }}
              priority
            />
          </div>
          <h2 className="text-2xl font-bold text-gray-800">Bienvenido</h2>
          <p className="text-gray-600">Inicia sesión en tu cuenta</p>
        </div>
        <AuthForm />
      </div>
      <div className="px-8 py-4 bg-gray-50 border-t border-gray-100 text-center">
        <Copyright />
      </div>
    </div>
  )
}
