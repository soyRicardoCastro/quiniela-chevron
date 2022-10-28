import { AxiosResponse } from 'axios'

import { User } from '../types'
import { axios } from '.'

export async function getUsers () {
  const { data }: AxiosResponse<Array<User['body']>> = await axios.get('/api/usuarios')

  return data
}

export async function getUser (id: string) {
  const { data }: AxiosResponse<User['body']> = await axios.get(`/api/usuarios/${id}`)

  return data
}