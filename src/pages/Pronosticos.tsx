import { Navigate } from 'react-router-dom'
import { Layout } from '../components'
import PronosticoCard from '../components/Partidos/PronosticoCard'
import { usePronosticos } from '../query/pronosticos'
import { userStore } from '../store'

function Pronosticos() {
  const { user } = userStore()
  
  if (!user) return <Navigate to='/' />
  const id = user._id

  const { data, isLoading } = usePronosticos()
  
  if (isLoading) return <Layout title='Pronostico'><p>Cargando</p></Layout>

  const filteredData = data?.filter(data => data.usuario === id)
  
  return (
    <Layout title='Mis Pronosticos'>
      <div className='grid place-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {filteredData?.map(pronostico => (
          <PronosticoCard
            key={pronostico._id}
            imgA={pronostico.partido.equipoLocal.imagen}
            nameA={pronostico.partido.equipoLocal.nombre}
            imgB={pronostico.partido.equipoVisita.imagen}
            nameB={pronostico.partido.equipoVisita.nombre}
            isActive={pronostico.partido.status}
            pronosticoId={pronostico._id}
            golesLocal={pronostico.golesLocal}
            golesVisita={pronostico.golesVisita}
          />
        ))}
      </div>
    </Layout>
  )
}

export default Pronosticos
 