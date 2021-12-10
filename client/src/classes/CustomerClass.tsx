import User from './User'

export interface CustomerClass {
  User: User
  Type: string
  createdAt: Date
  updatedAt: Date
  objectId: string
}
