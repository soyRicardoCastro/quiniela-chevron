import { useQuery } from 'react-query'
import { getPronostico, getPronosticos } from '../services/pronosticos'

const key = 'partidos'

export function usePronostico (id: string) {
  return useQuery([key, id], async () => await getPronostico(id))
}

export function usePronosticos () {
  return useQuery([key], getPronosticos)
}