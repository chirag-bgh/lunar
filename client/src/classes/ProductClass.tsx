import User from './User'

export default interface ProductClass {
  name: string
  price: number
  recurrence: string
  managed_account: string
  callback_url: string
  user: User
  createdAt: Date
  updatedAt: Date
  objectId: string
}
