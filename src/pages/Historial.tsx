import { useState, useEffect } from 'react'
import { Layout } from "../components"
import { Pronostico } from '../types'
import { userStore } from '../store'
import { AxiosResponse } from 'axios'
import { axios } from '../services'
function Historial() {
  const { user } = userStore()
  const [data, setData] = useState<Pronostico['body'][] | []>([])
  const [loading, setLoading] = useState(true)

  async function fetchData () {
    const { data }: AxiosResponse<Pronostico['body'][]> = await axios.get('/api/pronosticos')

    const filteredData = data.filter(pronostico => pronostico.usuario === user?._id)

    setData(filteredData)
    setLoading(false)
  }

  useEffect(() => {
    fetchData()
  }, [])

  useEffect(() => {
    console.log(data)
  }, [data])

  if (loading) return <Layout title="Historial">
    <div>{loading && 'loading'}</div>
  </Layout>

  return (
    <Layout title='Historial'>
      <main className='w-[90%] my-4 mx-auto grid grid-flow-row gap-4'>
        <header className='flex justify-between w-full'>
          <h4 className='font-semibold'>Tu Pronostico</h4>
          <h4 className='font-semibold'>Partido</h4>
        </header>
        {data.map(item => (
          <article key={item._id} className='w-full p-4 rounded-md bg-gray-300 grid grid-cols-2 place-items-center gap-14 relative'>
            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center flex-col'>
                <img src={item.partido.equipoLocal.imagen} className='w-8' alt="" />
                <strong>{item.golesLocal}</strong>
              </div>

              <strong>VS</strong>

              <div className='flex items-center flex-col'>
                <img src={item.partido.equipoVisita.imagen} className='w-8' alt="" />
                <strong>{item.golesVisita}</strong>
              </div>
            </div>

            <div className='h-[60px] w-[2px] bg-gray-100 absolute z-10' />

            <div className='flex justify-between items-center w-full'>
              <div className='flex items-center flex-col'>
                <img src={item.partido.equipoLocal.imagen} className='w-8' alt="" />
                <strong>{item.partido.golesLocal}</strong>
              </div>

              <strong>VS</strong>

              <div className='flex items-center flex-col'>
                <img src={item.partido.equipoVisita.imagen} className='w-8' alt="" />
                <strong>{item.partido.golesVisita}</strong>
              </div>
            </div>
          </article>
        ))}
      </main>
    </Layout>
  )
}

export default Historial
