import type { RegistrationInputData } from './RegistrationInputData.type'

// export type LoginInputData = Pick<RegistrationInputData, 'email' | 'password'>
export type LoginInputData = {
    loginIdentifier: string,
    password: string
}
