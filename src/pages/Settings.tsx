import { useState, useEffect, useRef } from 'react'
import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { Layout } from '../components'
import { axios } from '../services'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { User } from '../types'
import { BsUpload } from 'react-icons/bs'

function Settings() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user, setUser } = userStore()
  const [name, setName] = useState(user?.username ? user?.username : '')
  const [img, setImg] = useState('')

  const src =
    user?.imagen !== ''
      ? user?.imagen
      : 'https://flowbite.com/docs/images/people/profile-picture-2.jpg'

  const cloudinaryRef = useRef()
  const widgetRef = useRef()

  useEffect(() => {
    // @ts-ignore
    cloudinaryRef.current = window.cloudinary
    // @ts-ignore

    widgetRef.current = cloudinaryRef?.current?.createUploadWidget(
      {
        cloudName: 'ricardocastrodev',
        uploadPreset: 't1iklimr'
      },
      // @ts-ignore
      function (error, result) {
        if (result.info.secure_url !== undefined) {
          setImg(result.info.secure_url)
          console.log(result.info.secure_url)
        }
      }
    )
  }, [])

  const toggleModal = () => setModalOpen(!modalOpen)

  const handleSubmit = async () => {
    toggleModal()
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

  const Btn = () => {
    return (
      // @ts-ignore
      <p
        className='block w-full text-white text-sm bg-blue-500 rounded-lg cursor-pointer focus:outline-none flex justify-center item-center gap-3 hover:bg-blue-400 transition py-2'
        onClick={e => {
          e.preventDefault()
          // @ts-ignore
          widgetRef.current.open()
        }}
      >
        <BsUpload className='text-xl text-white'/>
        Subir Imagen
      </p>
    )
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

          <Btn />

          {img !== '' && <img src={img} alt='' className='w-16 h-16' />}

          <Button onClick={() => setModalOpen(true)}>Enviar</Button>
        </div>

        <Modal
          show={modalOpen}
          size='md'
          popup={true}
          onClose={() => setModalOpen(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <div className='text-center'>
              <HiOutlineExclamationCircle className='mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200' />
              <h3 className='mb-5 text-lg font-normal text-gray-500 dark:text-gray-400'>
                Estas seguro de enviar estos cambios?
              </h3>
              <div className='flex justify-center gap-4'>
                <Button color='failure' onClick={handleSubmit}>
                  Si, Estoy Seguro
                </Button>
                <Button color='gray' onClick={() => setModalOpen(false)}>
                  No, cancelar
                </Button>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </Layout>
  )
}

export default Settings
