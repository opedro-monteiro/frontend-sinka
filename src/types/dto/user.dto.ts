import { Role } from '@/lib/type'

export interface UserDto {
  id: string
  role: Role
  name: string
  email: string
  tenantId: string
}
