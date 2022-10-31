import { Link } from 'react-router-dom'
import { Layout } from '../components'
import { userStore } from '../store'

function Dashboard() {
  const { user } = userStore()
  const image =
    user?.imagen === ''
      ? 'https://flowbite.com/docs/images/people/profile-picture-4.jpg'
      : user?.imagen

  return (
    <Layout title='Inicio'>
      <div className='max-w-xl mx-auto'>
        <div className='flex flex-col items-center pb-10'>
          <img
            className='mb-3 h-24 w-24 rounded-full shadow-lg'
            src={image}
            alt='Bonnie image'
          />
          <h5 className='mb-1 text-3xl font-medium text-gray-900'>
            {user?.username}
          </h5>
          <span className='text-md text-gray-500 font-bold dark:text-gray-400'>
            {user?.puntos} puntos
          </span>
          <div className='mt-4 flex lg:mt-6 flex-col items-center justify-center gap-3'>
            <Link
              to='/partidos'
              className='inline-flex w-full justify-center items-center transition rounded-lg bg-lime-400 py-3 px-6 text-center text-md font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-300'
            >
              Ver Partidos
            </Link>
            <Link
              to='/configuracion'
              className='inline-flex transition w-full justify-center items-center rounded-lg border border-gray-300 bg-white py-3 px-6 text-center text-md font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200'
            >
              Configuracion
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Dashboard
