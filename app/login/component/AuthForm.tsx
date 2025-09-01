'use client'

import { GoogleIcon, MicrosoftIcon } from '@/components/logos'
import { EyeIcon, EyeSlashIcon } from '@/components/icons'
import { useLogin } from '@/hooks'
import { Input } from '@heroui/react'
import toast from 'react-hot-toast'

export const AuthForm = () => {
  const {
    errors,
    handleSocialLogin,
    handleSubmit,
    isSubmitting,
    isVisible,
    register,
    onSubmit,
    toggleVisibility
  } = useLogin({
    onSuccess: () => {
      toast.success('Inicio de sesión exitoso!');
    },
    onError: (error) => {
      toast.error('Usuario o contraseña incorrectos');
    }
  })


  return (
    <>
      <form className="space-y-6" onSubmit={handleSubmit(onSubmit)} suppressHydrationWarning>
        <div className="flex flex-col gap-y-5 mt-8">

          <Input
            {...register("email")}
            label="Correo electrónico"
            labelPlacement="outside"
            type="email"
            variant="bordered"
            radius="sm"
            placeholder="Ingresa tu correo electrónico"
            errorMessage={errors.email ? errors.email.message : ''}
            isInvalid={errors.email ? true : false}
          />

          <div className="flex flex-col gap-y-2">
            <Input
              {...register("password")}
              label="Contraseña"
              labelPlacement="outside"
              type={isVisible ? 'text' : 'password'}
              variant="bordered"
              radius="sm"
              placeholder="Ingresa tu contraseña"
              errorMessage={errors.password ? errors.password.message : ''}
              isInvalid={errors.password ? true : false}
              endContent={
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                >
                  {isVisible ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400" />
                  )}
                </button>
              }
            />
            <div className="flex items-center justify-end text-sm">
              <a href="#" className="font-semibold text-blue-700 hover:text-blue-500">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full justify-center rounded-md bg-zinc-900 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-zinc-900"
          >
            {isSubmitting ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </div>
      </form>

      <div className="flex items-center my-6">
        <div className="flex-grow border-t border-gray-300"></div>
        <span className="flex-shrink mx-4 text-gray-500 text-sm">O continúa con</span>
        <div className="flex-grow border-t border-gray-300"></div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <button
          type="button"
          onClick={() => handleSocialLogin('Google')}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
        >
          <GoogleIcon />
          <span className="text-sm font-semibold leading-6">Google</span>
        </button>
        <button
          type="button"
          onClick={() => handleSocialLogin('Microsoft')}
          className="flex w-full items-center justify-center gap-3 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-50"
        >
          <MicrosoftIcon />
          <span className="text-sm font-semibold leading-6">Microsoft</span>
        </button>
      </div>
    </>
  )
}
