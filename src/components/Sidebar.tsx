import { useState, useEffect } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaWindowClose } from 'react-icons/fa'
import { IoMdExit } from 'react-icons/io'
import { userRoutes } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import { userStore } from '../store'

function Sidebar() {
  const [menuActive, setMenuActive] = useState(false)
  const { removeUser } = userStore()
  const [screenSize, setScreenSize] = useState(window.innerWidth)

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setMenuActive(false);
    } else {
      setMenuActive(true);
    }
  }, [screenSize]);

  const handleClick = () => {
    removeUser()
    const nav = useNavigate()
    nav('/')
  }

  return (
    <aside className='h-screen w-auto'>
      <div
        className={`sidebar relative h-screen overflow-hidden hover:bg-white hover:shadow-lg ${
          menuActive ? 'w-56' : 'w-[3.55rem]'
        }`}
      >
        <div className='flex fixed h-screen flex-col justify-between pt-2 pb-6'>
          <div>
            <div className='w-max p-2.5 flex flex-col gap-2 justify-center items-center mx-auto'>
              {menuActive ? (
                <FaWindowClose
                  onClick={() => setMenuActive(!menuActive)}
                  className='text-xl text-sky-600 inline-flex absolute left-[18px] top-[15px]'
                />
              ) : (
                <GiHamburgerMenu
                  onClick={() => setMenuActive(!menuActive)}
                  className='text-xl text-sky-600 inline-flex absolute left-[18px] top-[15px]'
                />
              )}
              <img
                src='logo-brand.png'
                className={`w-12 ${menuActive ? 'inline-flex' : 'hidden'}`}
                alt=''
              />
            </div>
            <ul className='mt-6 space-y-2 tracking-wide'>
              {userRoutes.map(route => (
                <li className='min-w-max' key={`sidebar-item-${route.name}`}>
                  <Link
                    to={route.path}
                    className='relative flex items-center mx-[2px] space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white rounded-xl'
                  >
                    {route.icon}{' '}
                    <span
                      className={`-mr-1 font-medium text-xl ${
                        menuActive ? 'inline-flex' : 'hidden'
                      }`}
                    >
                      {route.name}
                    </span>
                  </Link>
                </li>
              ))}
              <li className='min-w-max'>
                <button onClick={handleClick} className='relative flex items-center mx-[2px] space-x-4 bg-gradient-to-r from-red-700 to-red-600 px-4 py-3 text-white rounded-xl'>
                  <IoMdExit className='text-white text-2xl' />{' '}
                  <span
                    className={`-mr-1 text-md font-medium ${
                      menuActive ? 'inline-flex' : 'hidden'
                    }`}
                  >
                    Cerrar Sesion
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
