import { object, string, TypeOf } from 'zod'

export const loginSchema = object({
  email: string({
    required_error: 'Email is required'
  }).email('Not a valid email'),
  password: string({
    required_error: 'Password is required'
  }).min(6, 'Password should be 6 chars minimun')
})

export const registerSchema = object({
  username: string({
    required_error: 'User is required'
  }).min(1),
  password: string({
    required_error: 'Password is required'
  }).min(6, 'Password too short - should be 6 chars minimum'),
  email: string({
    required_error: 'Email is required'
  }).email('Not a valid email'),
  imagen: string().optional()
})

export type LoginInput = TypeOf<typeof loginSchema>

export type RegisterUserInput = TypeOf<typeof registerSchema>