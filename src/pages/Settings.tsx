import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import { Layout } from '../components'
import { axios } from '../services'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { User } from '../types'

function Settings() {
  const { user, setUser } = userStore()
  const [name, setName] = useState(user?.username ? user?.username : '')
  const [img, setImg] = useState(user?.imagen ? user?.imagen : '')
  const [enable, setEnable] = useState(false)

  const src =
    user?.imagen !== ''
      ? user?.imagen
      : 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'

  useEffect(() => {
    if (name !== '' && img !== '') setEnable(true)
    else setEnable(false)
  }, [name, img])


  // @ts-ignore
  const handleImage = (e) => {
    const file = e.target.files[0]
    setFileToBase(file)
  }
  // @ts-ignore
  const setFileToBase = (file) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    // @ts-ignore
    reader.onloadend = () => setImg(reader.result)
  }

  const handleSubmit = async () => {
    try {
      interface Send {
        username?: string
        imagen?: string | unknown
      }
      let send: Send = {}
      if (name !== '') {
        send.username = name
      }
      if (img !== '') {
        send.imagen = img
      }
      console.log(send)
      const { data }: AxiosResponse<User['body']> = await axios.put(
        `/api/usuarios/${user?._id}`,
        send
      )
      setUser(data)
      toast.success('Usuario Actualizado con exito')
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 413)
        return toast.error('La imagen es muy grande, elije otra')
      toast.error('Ocurrio un error')
    }
  }

  return (
    <Layout title='Configuración'>
      <div className='flex items-center justify-center flex-col '>
        <div className='max-w-md p-6 rounded-md flex flex-col gap-4 justify-center settings_ui'>
          <picture className='user-img'>
            <img src={src} alt='user_image' className='user_image' />
          </picture>

          <label className='flex flex-col gap-2 my-5 text-gray-800'>
            Nombre
            <input
              type='text'
              name='name'
              className='rounded-md'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className="block mb-2 text-md text-gray-800 dark:text-gray-300" htmlFor="file_input">Upload file</label>
          <input className="block w-full text-sm text-gray-800 bg-gray-50 rounded-lg border border-gray-300 cursor-pointer dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" id="file_input" name='image' type="file" onChange={(e) => handleImage(e)} />

          {img !== '' && <img src={img} alt='' className='w-16 h-16' />}

          {enable ? (
            <button type='submit' onClick={handleSubmit} className='py-2 px-4 rounded-md bg-lime-400 text-white text-md'>Enviar</button>
          ) : (
            <button disabled className='py-2 px-4 rounded-md bg-gray-200 cursor-not-allowed text-gray-400'>Enviar</button>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Settings
