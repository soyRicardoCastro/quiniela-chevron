import { AxiosResponse } from 'axios'
import { RegisterUserInput, LoginInput } from '../schema/auth'
import { User } from '../types'
import axios from './axios'

export async function register (body: RegisterUserInput) {
  const { data }: AxiosResponse<User['body']> = await axios.post('/api/register', body)

  return data
}

export async function login (body: LoginInput) {
  const { data }: AxiosResponse<User['body']> = await axios.post('/api/login', body)

  return data
}