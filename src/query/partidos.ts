import { useQuery } from 'react-query'
import { getPartido, getPartidos } from '../services'

const key = 'partidos'

export function usePartidos () {
  return useQuery([key], getPartidos)
}

export function usePartido (id: string) {
  return useQuery([key, id], async () => await getPartido(id))
}