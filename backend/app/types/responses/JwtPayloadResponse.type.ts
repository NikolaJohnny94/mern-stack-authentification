import type { Jwt } from 'jsonwebtoken'

export type JwtPayloadResponse = Jwt & { id: string }
