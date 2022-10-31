import { Navigate } from 'react-router-dom'
import { Layout } from '../components'
import TeamsCard from '../components/Partidos/TeamsCard'
import { usePronosticos } from '../query/pronosticos'
import { userStore } from '../store'

function Pronosticos() {
  const { user } = userStore()

  if (!user) return <Navigate to='/' />

  const { data } = usePronosticos(user._id)
  console.log(data)
  
  return (
    <Layout title='Mis Pronosticos'>
      <div className='grid place-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {data?.map(pronostico => (
          <TeamsCard
            key={pronostico._id}
            id={pronostico.idPartido}
            imgA={pronostico.partido.equipoLocal.imagen}
            nameA={pronostico.partido.equipoLocal.nombre}
            imgB={pronostico.partido.equipoVisita.imagen}
            nameB={pronostico.partido.equipoVisita.nombre}
            isActive={pronostico.partido.status}
            pronosticoId={pronostico._id}
            golesLocal={pronostico.golesLocal}
            golesVisita={pronostico.golesVisita}
            pronosticar
          />
        ))}
      </div>
    </Layout>
  )
}

export default Pronosticos
 