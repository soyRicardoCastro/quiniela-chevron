import { Layout } from '../components'
import TeamsCard from '../components/Partidos/TeamsCard'
import { usePartidos } from '../query/partidos'

function Partidos() {
  const { data } = usePartidos()

    console.log(data)
  return (
    <Layout title='Partidos'>
      <div className='grid place-items-center sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>

      {data?.map(partido => (
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