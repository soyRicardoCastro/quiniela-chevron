import { AxiosResponse } from 'axios'

import { Pronostico } from '../types'
import { axios } from '.'

export async function getPronosticos () {
  const { data }: AxiosResponse<Array<Pronostico['body']>> = await axios.get(`/api/pronosticos`)

  return data
}

export async function getPronostico (id: string) {
  const { data }: AxiosResponse<Pronostico['body']> = await axios.get(`/api/pronostico/${id}`)

  return data
}

export async function updatePronostico (id: string, body: any) {
  const { data }: AxiosResponse<Pronostico['body']> = await axios.put(`/api/pronostico/${id}`, body)

  return data 
}