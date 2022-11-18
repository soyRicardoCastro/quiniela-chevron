import { BiSliderAlt, BiFootball } from 'react-icons/bi'
import { MdOutlineDashboard } from 'react-icons/md'
import { AiOutlineTrophy } from 'react-icons/ai'
import { RiFileHistoryLine } from 'react-icons/ri'
import { BsDice5 } from 'react-icons/bs'

const iconStyles = 'text-white text-2xl'

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
    path: '/mis-pronosticos',
    icon: <BsDice5 className={iconStyles}/>,
    name: 'Mis Pronósticos'
  },
  {
    path: '/historial',
    icon: <RiFileHistoryLine className={iconStyles}/>,
    name: 'Historial'
  },
  {
    path: '/clasificatoria',
    icon: <AiOutlineTrophy className={iconStyles} />,
    name: 'Clasificatoria'
  },
  {
    path: '/configuracion',
    icon: <BiSliderAlt className={iconStyles} />,
    name: 'Configuración'
  },
]
