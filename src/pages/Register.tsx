import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterUserInput } from '../schema/auth'
import { toast } from 'react-toastify'
import { convertBase64 } from '../utils/convertToBase64'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { User } from '../types'
import { axios } from '../services'

function Register() {
  const [registerInfo, setRegisterInfo] = useState<RegisterUserInput>({
    password: '',
    email: '',
    username: '',
    imagen: ''
  })
  const [sending, setSending] = useState(false)
  const { setUser } = userStore()
  const nav = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterInfo({
      ...registerInfo,
      [e.target.name]: e.target.value
    })
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files
    if (file !== null) {
      const base64 = await convertBase64(file[0])
      const imagen = base64 as string
      await setRegisterInfo({
        ...registerInfo,
        imagen
      })
    } else return
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault()
      setSending(true)
      await toast.promise(
        async () => {
          const { data }: AxiosResponse<User['body']> = await axios.post(
            '/api/register',
            registerInfo
          )
          await setUser(data)
        },
        {
          pending: 'Enviando informacion',
          success: 'Usuario creado satisfactoriamente',
          error: 'Error'
        }
      )
      setSending(false)
      nav('/inicio')
    } catch (e: any) {
      console.error(e)
      toast.error(e)
      setSending(false)
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
            alt='tailus logo'
          />
          <div className='rounded-xl border bg-opacity-50 backdrop-blur-2xl bg-white shadow-xl'>
            <div className='lg:grid lg:grid-cols-2'>
              <div className='rounded-lg lg:block' hidden>
                <img
                  src='register-hero.jpg'
                  className='rounded-l-xl object-cover'
                  loading='lazy'
                  height=''
                  width=''
                  alt='music mood'
                />
              </div>
              <div className='p-6 sm:p-16'>
                <h2 className='mb-8 text-2xl text-cyan-900 font-bold'>
                  Registrarse
                </h2>
                <form className='space-y-8' onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor='user' className='text-gray-700'>
                      Usuario
                    </label>
                    <input
                      onChange={handleChange}
                      name='username'
                      id='user'
                      className='block w-full px-4 py-3 rounded-md border border-gray-300 text-gray-600 transition duration-300 focus:ring-2 focus:ring-sky-300 focus:outline-none invalid:ring-2 invalid:ring-red-400'
                    />
                  </div>
                  <div>
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
                  <div>
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
                  <div>
                    <label
                      className='block mb-2 text-gray-700'
                      htmlFor='file_input'
                    >
                      Subir Imagen
                    </label>
                    <input
                      className='block w-full text-gray-700 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer focus:outline-none'
                      id='file_input'
                      type='file'
                      name='imagen'
                      onChange={uploadImage}
                    ></input>
                    <p
                      className='mt-1 text-sm text-gray-500'
                      id='file_input_help'
                    >
                      SVG, PNG, JPG or GIF (MAX. 800x400px).
                    </p>
                  </div>
                  {sending ? (
                    <button
                    disabled
                    className='w-full py-3 px-6 rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500'
                  >
                    <span className='text-white'>Registrarse</span>
                  </button>
                  ) : (
                    <button
                    type='submit'
                    className='w-full py-3 px-6 rounded-md bg-sky-600 focus:bg-sky-700 active:bg-sky-500'
                  >
                    <span className='text-white'>Registrarse</span>
                  </button>
                  )}
                  <p className='border-t pt-6 text-sm'>
                    Ya tienes una cuenta?{' '}
                    <Link to='/' className='text-sky-500'>
                      Iniciar Sesion
                    </Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
