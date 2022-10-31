import { AxiosResponse } from 'axios'

import { Pronostico } from '../types'
import { axios } from '.'

export async function getPartidos () {
  const { data }: AxiosResponse<Array<Pronostico['body']>> = await axios.get('/api/partidos')

  return data
}

export async function getPartido (id: string) {
  const { data }: AxiosResponse<Pronostico['body']> = await axios.get(`/api/partidos/${id}`)

  return data
}