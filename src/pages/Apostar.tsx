import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import { Layout } from '../components'
import { usePartido } from '../query/partidos'
import { axios } from '../services'
import { userStore } from '../store'

function Apostar() {
  const [golesLocal, setGolesLocal] = useState(0)
  const [golesVisita, setGolesVisita] = useState(0)
  const [sending, setSending] = useState(false)

  const { user } = userStore()

  const params = useParams()
  const id = params.id as string

  const { data } = usePartido(id)

  if (data?.status === false) {
    toast.warn('Ya no puedes apostar por este partido')
    return <Navigate to='/partidos' replace />
  }

  const minusVisita = () => golesVisita > 0 && setGolesVisita(golesVisita - 1)
  const minusLocal = () => golesLocal > 0 && setGolesLocal(golesLocal - 1)
  const plusVisita = () => setGolesVisita(golesVisita + 1)
  const plusLocal = () => setGolesLocal(golesLocal + 1)

  const handleSubmit = async () => {
    try {
      setSending(true)

      if (!user) return

      const apuesta = {
        idUsuario: user._id,
        idPartido: id,
        golesLocal: golesLocal,
        golesVisita: golesVisita
      }

      await toast.promise(
        async () => axios.post(`/api/pronostico`, apuesta),
        {
          pending: 'Enviando pronostico',
          success: 'Enviado correctamente',
          error: 'Ha ocurrido un error'
        }
      )

      setSending(false)
    } catch (e) {
      console.error(e)
      setSending(false)
    }
  }

  return (
    <Layout title='Apostar'>
      <article className='flex flex-col md:flex-row items-center justify-evenly max-w-md mx-auto py-3 px-3 bg-cyan-500 rounded-md gap-2'>
        <div className='text-xl text-white font-semibold flex flex-col items-center justify-center'>
          <img
            src={data?.equipoLocal.imagen}
            className='mb-3 h-24 w-24 rounded-full shadow-lg'
            alt={data?.equipoLocal.nombre}
          />

          <div className='flex flex-col w-full mx-auto justify-center items-center'>
            <p>Goles {data?.equipoLocal.nombre}</p>

            <div className='flex items-center justify-between w-full my-3'>
              <button onClick={minusLocal} className='text-2xl font-bold'>
                -
              </button>
              <p className='text-5xl font-bold'>{golesLocal}</p>
              <button onClick={plusLocal} className='text-2xl font-bold'>
                +
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className='text-3xl font-black text-white hidden md:inline-flex'>
            VS
          </h3>
        </div>

        <div className='text-xl text-white font-semibold flex flex-col items-center justify-center'>
          <img
            src={data?.equipoVisita.imagen}
            className='mb-3 h-24 w-24 rounded-full shadow-lg'
            alt={data?.equipoVisita.nombre}
          />

          <div className='flex flex-col w-full mx-auto justify-center items-center'>
            <p>Goles {data?.equipoVisita.nombre}</p>

            <div className='flex items-center justify-between w-full my-3'>
              <button onClick={minusVisita} className='text-2xl font-bold'>
                -
              </button>
              <p className='text-5xl font-bold'>{golesVisita}</p>
              <button onClick={plusVisita} className='text-2xl font-bold'>
                +
              </button>
            </div>
          </div>
        </div>
      </article>

      {sending ? (
        <button
          disabled
          className='mx-auto flex justify-center w-52 my-10 px-3 py-2 rounded-md bg-lime-400 text-white'
        >
          Hacer Apuesta
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          className='mx-auto flex justify-center w-52 my-10 px-3 py-2 rounded-md bg-lime-400 text-white'
        >
          Hacer Apuesta
        </button>
      )}
    </Layout>
  )
}

export default Apostar
