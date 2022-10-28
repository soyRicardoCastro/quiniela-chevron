import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { userStore } from '../store'

const RequireAuth = () => {
  const { user } = userStore()
  const location = useLocation()

  return (
    user
      ? <Outlet />
      : <Navigate to='/' state={{ from: location }} replace />
  )
}

export default RequireAuth