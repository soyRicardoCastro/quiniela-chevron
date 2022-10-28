import { useState } from 'react'
import { Modal, Button } from 'flowbite-react'
import { HiOutlineExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'

import { Layout } from '../components'
import { convertBase64 } from '../utils/convertToBase64'
import { axios } from '../services'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { User } from '../types'

const MAXIMO_TAMANIO_BYTES = 2000000

function Settings() {
  const [modalOpen, setModalOpen] = useState(false)
  const { user, setUser } = userStore()
  const [name, setName] = useState(user?.username ? user?.username : '')
  const [base64Image, setBase64Image] = useState<string | unknown>('')
  const [img, setImg] = useState('')

  const image = base64Image as string

  const toggleModal = () => setModalOpen(!modalOpen)

  const handleSubmit = async () => {
    toggleModal()
    try {
      interface Send {
        username?: string
        imagen?: string | unknown
      }
      let send: Send  = {}
      if (name !== '') {
        send.username = name
      }
      if (base64Image !== '') {
        send.imagen = base64Image
      }
      console.log(send)
      const { data }: AxiosResponse<User['body']> = await axios.put(`/api/usuarios/${user?._id}`, send)
      setUser(data)
      console.log(data)
      toast.success('Usuario Actualizado con exito')
    } catch (error: any) {
      console.error(error)
      if (error.response.status === 413) return toast.error('La imagen es muy grande, elije otra')
      toast.error('Ocurrio un error')
    }
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files

    if (file !== null) {
      if (file[0].size > MAXIMO_TAMANIO_BYTES) {
        setImg('')
        toast.warning(`El tamaño máximo es 2 MB`);
        return
      }

      const base64 = await convertBase64(file[0])
      setBase64Image(base64)
    } else return
  }

  return (
    <Layout title='Configuracion'>
      <div className='flex items-center justify-center flex-col '>
        <div className='max-w-md p-6 rounded-md bg-cyan-500 flex flex-col gap-4 justify-center'>
          <label className='flex flex-col gap-2 my-5 text-white'>
            Nombre
            <input
              type='text'
              name='name'
              className='rounded-xl bg-cyan-900'
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </label>

          <label className='flex flex-col gap-2 my-5 text-white'>
            Imagen
            <input
              type='file'
              className='rounded-xl'
              name='image'
              maxLength={1}
              max={1}
              onChange={uploadImage}
            />
          </label>

          {image !== '' && <img src={image} alt='' className='w-16 h-16' />}

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
