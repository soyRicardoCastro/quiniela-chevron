import { useQuery } from 'react-query'
import { getUsers, getUser } from '../services/users'

const key = 'users'

export function useUsers () {
  return useQuery([key], getUsers)
}

export function useUser (id: string) {
  return useQuery([key, id], async () => await getUser(id))
}