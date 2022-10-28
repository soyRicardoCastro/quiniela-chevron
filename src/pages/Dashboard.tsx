import { Link } from 'react-router-dom'
import { Layout } from '../components'
import { userStore } from '../store'

function Dashboard() {
  const { user } = userStore()
  const image = user?.imagen === '' ?  'https://flowbite.com/docs/images/people/profile-picture-3.jpg' : user?.imagen

  console.log(user)

  return (
    <Layout title='Inicio'>
      <div className='max-w-xl mx-auto'>
        <article>
          <div className='flex flex-col items-center pb-10'>
            <img
              className='mb-3 h-24 w-24 rounded-full shadow-lg'
              src={image}
              alt='Bonnie image'
            />
            <h5 className='mb-1 text-xl font-medium text-gray-900 dark:text-white'>
              {user?.username}
            </h5>
            <span className='text-sm text-gray-500 font-bold dark:text-gray-400'>
              {user?.puntos} puntos
            </span>
            <div className='mt-4 flex space-x-3 lg:mt-6'>
              <Link
                to='/partidos'
                className='inline-flex items-center transition rounded-lg bg-lime-400 py-2 px-4 text-center text-sm font-medium text-white hover:bg-lime-500 focus:outline-none focus:ring-4 focus:ring-lime-300'
              >
                Ir a Apostar
              </Link>
              <Link
                to='/configuracion'
                className='inline-flex transition items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              >
                Configuracion
              </Link>
            </div>
          </div>
        </article>
      </div>
    </Layout>
  )
}

export default Dashboard
