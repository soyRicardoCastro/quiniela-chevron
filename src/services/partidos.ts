import { AxiosResponse } from 'axios'

import { Partido } from '../types'
import { axios } from '.'

export async function getPartidos () {
  const { data }: AxiosResponse<Array<Partido['body']>> = await axios.get('/api/partidos')

  return data
}

export async function getPartido (id: string) {
  const { data }: AxiosResponse<Partido['body']> = await axios.get(`/api/partidos/${id}`)

  return data
}