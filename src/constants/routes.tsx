import { BiSliderAlt, BiFootball } from 'react-icons/bi'
import { MdOutlineDashboard } from 'react-icons/md'
import { AiOutlineTrophy } from 'react-icons/ai'

const iconStyles = 'text-white text-xl'

export const userRoutes = [
  {
    path: '/inicio',
    icon: <MdOutlineDashboard className={iconStyles} />,
    name: 'Inicio'
  },
  {
    path: '/partidos',
    icon: <BiFootball className={iconStyles} />,
    name: 'Partidos'
  },
  {
    path: '/clasificatoria',
    icon: <AiOutlineTrophy className={iconStyles} />,
    name: 'Clasificatoria'
  },
  {
    path: '/configuracion',
    icon: <BiSliderAlt className={iconStyles} />,
    name: 'Configuracion'
  },
]