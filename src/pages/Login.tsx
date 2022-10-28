import { AxiosResponse } from 'axios'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { LoginInput } from '../schema/auth'
import { axios } from '../services'
import { login } from '../services/auth'
import { userStore } from '../store'
import { User } from '../types'

function Login() {
  const [loginInfo, setLoginInfo] = useState<LoginInput>({
    email: '',
    password: ''
  })

  const { setUser } = userStore()

  const nav = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()

      const { data }: AxiosResponse<User['body']> = await axios.post('/api/login', loginInfo)

      await setUser(data)
      /*toast.promise(async () => {}, {
        pending: 'Enviando informacion',
        success: 'Inicio de sesion correctamente',
        error: 'Ha ocurrido un error'
      })*/

      nav('/inicio')
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div className='relative py-16 before:absolute before:inset-0 before:w-full before:h-[50%] before:bg-gray-200'>
      <div className='relative container m-auto px-6 text-gray-500 md:px-12 xl:px-40'>
        <div className='m-auto space-y-4 md:w-8/12 lg:w-full'>
          <img
            src='logo-brand.png'
            loading='lazy'
            className='w-16 ml-4'
            alt='Chevron logo'
          />
          <div className='rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl'>
            <div className='lg:grid lg:grid-cols-2'>
              <div className='rounded-lg lg:block' hidden>
                <img
                  src='login-hero.jpg'
                  className='rounded-l-xl object-cover'
                  loading='lazy'
                  height=''
                  width=''
                  alt='Hero'
                />
              </div>
              <div className='p-6 sm:p-16'>
                <h2 className='mb-8 text-2xl text-cyan-900 font-bold'>
                  Inicia Sesion en tu cuenta
                </h2>
                <form onSubmit={handleSubmit} className='space-y-8'>
                  <div className='space-y-2'>
                    <label htmlFor='email' className='text-gray-700'>
                      Correo
                    </label>
                    <input
                      onChange={handleChange}
                      type='email'
                      name='email'
                      id='email'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <div className='space-y-2'>
                    <label htmlFor='pwd' className='text-gray-700'>
                      Contraseña
                    </label>
                    <input
                      onChange={handleChange}
                      type='password'
                      name='password'
                      id='pwd'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <button
                    type='submit'
                    className='w-full py-3 px-6 rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500'
                  >
                    <span className='text-white'>Enviar</span>
                  </button>
                  <p className='border-t pt-6 text-sm'>
                    No tienes una cuenta?{' '}
                    <Link to='/register' className='text-sky-500'>
                      Registrarse
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
          <div className='text-center space-x-4'>
            <span>© Chevron - Quiniela</span>
            <a href='#' className='text-sm hover:text-sky-900'>
              Contact
            </a>
            <a href='#' className='text-sm hover:text-sky-900'>
              Privacy &amp; Terms
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
