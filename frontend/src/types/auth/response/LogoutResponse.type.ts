import type { LoginResponse } from './LoginResponse.type'

export type LogoutResponse = Pick<LoginResponse, 'success' | 'message'>
