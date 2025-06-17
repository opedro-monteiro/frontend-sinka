export interface CostumerDto {
  id: string
  tenantId: string
  publicId: string
  name: string
  email: string
  isActive: boolean
  contact: string
  imageUrl: string
  address: Address
  createdAt: string
  updatedAt: string
}

export interface Address {
  id: string
  street: string
  neighborhood: string
  number: string
  state: string
}
