import type { FC } from 'react'

type Props = {
  message: string
}

export const ValidationError: FC<Props> = ({ message }) => {
  return <span className='text-red-500 pt-3'>{message}</span>
}
