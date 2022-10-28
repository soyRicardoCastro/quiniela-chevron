import { AxiosResponse } from 'axios'

import { Equipo } from '../types'
import { axios } from '.'

export async function getEquipos () {
  const { data }: AxiosResponse<Array<Equipo['body']>> = await axios.get('/api/equipos')

  return data
}

export async function getEquipo (id: string) {
  const { data }: AxiosResponse<Equipo['body']> = await axios.get(`/api/equipos/${id}`)

  return data
}