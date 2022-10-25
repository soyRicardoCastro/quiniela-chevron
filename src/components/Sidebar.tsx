import { useState } from 'react'
import { GiHamburgerMenu } from 'react-icons/gi'
import { FaWindowClose } from 'react-icons/fa'
import { userRoutes } from '../constants'
import { Link } from 'react-router-dom'

function Sidebar() {
  const [menuActive, setMenuActive] = useState(false)

  return (
    <aside className="h-screen bg-gray-100 w-auto">
      <div className={`sidebar h-screen overflow-hidden border-r hover:bg-white hover:shadow-lg ${menuActive ? 'w-56' : 'w-[3.55rem]'}`}>
        <div className="flex h-screen flex-col justify-between pt-2 pb-6">
          <div>
            <div className="w-max p-2.5 flex flex-col gap-2 justify-center items-center mx-auto">
              {menuActive ? (
                <FaWindowClose onClick={() => setMenuActive(!menuActive)} className='text-xl text-sky-600 inline-flex absolute left-[18px] top-[15px]' />
              ) : (
                <GiHamburgerMenu onClick={() => setMenuActive(!menuActive)} className='text-xl text-sky-600 inline-flex absolute left-[18px] top-[15px]' />
              )}
              <img
                src="logo-brand.png"
                className={`w-12 ${menuActive ? 'inline-flex' : 'hidden'}`}
                alt=""
              />
            </div>
            <ul className="mt-6 space-y-2 tracking-wide">
              {userRoutes.map(route => (
                <li className="min-w-max" key={`sidebar-item-${route.name}`}>
                  <Link to={route.path} className="relative flex items-center mx-[2px] space-x-4 bg-gradient-to-r from-sky-600 to-cyan-400 px-4 py-3 text-white rounded-xl">
                    {route.icon} <span className={`-mr-1 font-medium ${menuActive ? 'inline-flex' : 'hidden'}`}>{route.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar