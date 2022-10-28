import { Link } from 'react-router-dom'

interface Props {
  body: {
    id: number
    imgA: string
    imgB: string
    nameA: string
    nameB: string
    isActive: boolean
  }
}

function TeamsCard({ imgA, imgB, nameA, nameB, isActive, id }: Props['body']) {
  return (
    isActive ? (
      <article className='w-full max-w-md'>
      <div className='bg-cyan-500 p-8 rounded-md'>
        <div className='flex flex-col items-center justify-center'>
          <header className='flex flex-col md:flex-row gap-2 md:gap-6 items-center justify-center'>
            <div className='flex justify-center flex-col items-center'>
              <img
                className='mb-3 h-24 w-24 rounded-full shadow-lg'
                src={imgA}
                alt={nameA}
              />
              <h5 className='mb-1 text-xl overscroll-contain font-medium text-white'>
                {nameA}
              </h5>
            </div>
            <h4 className='text-3xl text-white font-extrabold'>VS</h4>
            <div className='flex justify-center flex-col items-center'>
              <img
                className='mb-3 h-24 w-24 rounded-full shadow-lg'
                src={imgB}
                alt={nameB}
              />
              <h5 className='mb-1 text-xl font-medium text-white'>
                {nameB}
              </h5>
            </div>
          </header>
          <div className='mt-4 flex space-x-3 lg:mt-6'>
            <Link
              to={`/apostar/${id}`}
              className='inline-flex items-center rounded-lg bg-lime-500 py-2 px-4 text-center text-sm font-medium text-white focus:outline-none focus:ring-4 focus:ring-lime-300 transition'
            >
              Apostar
            </Link>
          </div>
        </div>
      </div>
    </article>
    ) : null
  )
}

export default TeamsCard
