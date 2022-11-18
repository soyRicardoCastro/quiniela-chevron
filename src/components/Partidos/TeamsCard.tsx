import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  body: {
    id: number
    imgA: string
    imgB: string
    nameA: string
    nameB: string
    date?: string
    isActive: boolean
    isPlaying: boolean
    isFinish: boolean
    golesA?: number
    golesB?: number
  }
}

function TeamsCard({ imgA, imgB, nameA, nameB, isActive, id, date, isPlaying, isFinish, golesA, golesB }: Props['body']) {
  const [todayDate, setTodayDate] = useState('')

  const today = new Date()

  let day = today.getDate()
  let month = today.getMonth() + 1
  let year = today.getFullYear()

  useEffect(() => {
    if (month < 10) setTodayDate(`${day}/0${month}/${year}`)
    else setTodayDate(`${day}/${month}/${year}`)
  }, [])


  return isActive ? (
    <article className='w-full max-w-md'>
      <div className='bg-cyan-500 p-4 md:p-8 rounded-md'>
        <div className='flex flex-col items-center justify-center gap-4'>
          <p className='text-md text-center font-bold text-white'>{date && date === todayDate ? 'Hoy' : date}</p>
          <header className='flex flex-col md:grid md:grid-cols-3 md:place-content-center md:place-items-center gap-3 md:gap-6 items-center justify-center'>
            <div className='flex justify-center flex-col items-center'>
              <figure className='w-24'>
                <img className='mb-3 w-full rounded-md' src={imgA} alt={nameA} />
              </figure>
              <h5 className='mb-1 text-2xl overscroll-contain font-semibold text-white text-center'>
                {nameA}
              </h5>
              {isPlaying || isFinish && <strong className='text-xl text-white font-semibold'>{golesA}</strong>}
            </div>
            <h4 className='text-4xl text-white font-extrabold'>VS</h4>
            <div className='flex justify-center flex-col items-center'>
              <figure className='w-24'>
                <img className='mb-3 w-full rounded-md' src={imgB} alt={nameB} />
              </figure>
              <h5 className='mb-1 text-2xl font-semibold text-white text-center'>
                {nameB}
              </h5>
              {isPlaying || isFinish && <strong className='text-xl text-white font-semibold'>{golesB}</strong>}
            </div>
          </header>
          <div className='mt-4 flex space-x-3 lg:mt-6'>
            {isPlaying || isFinish ? (
              <h5 className='text-white text-center text-md font-bold'>Partido en curso</h5>
            ) : (
            <Link
              to={`/apostar/${id}`}
              className='inline-flex items-center rounded-lg bg-lime-500 py-3 px-6 text-center text-xl font-medium text-white focus:outline-none focus:ring-4 focus:ring-lime-300 transition'
            >
              Pronosticar
            </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  ) : null
}

export default TeamsCard
