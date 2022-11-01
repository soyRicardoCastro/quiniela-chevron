import { useEffect, useState } from 'react'
import { Layout } from '../components'
import TeamsCard from '../components/Partidos/TeamsCard'
import { getPartidos } from '../services/apostar'
import { Partido } from '../types'

function Partidos() {
  const [data, setData] = useState<any | Partido['body']>([])

  useEffect(() => {
    getPartidos().then(data => setData(data))
  }, [])
  
  return (
    <Layout title='Partidos'>
      <div className='grid place-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

      {data?.map((partido: Partido['body']) => (
        <TeamsCard
          key={partido._id}
          id={partido._id}
          imgA={partido.equipoLocal.imagen}
          nameA={partido.equipoLocal.nombre}
          imgB={partido.equipoVisita.imagen}
          nameB={partido.equipoVisita.nombre}
          isActive={partido.status}
        />
      ))}
      </div>
    </Layout>
  )
}

export default Partidos