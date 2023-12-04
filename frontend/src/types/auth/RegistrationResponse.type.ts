import type { LoginResponse } from './LoginResponse.type'

export type RegistrationResponse = Pick<LoginResponse, 'message' | 'success'>
