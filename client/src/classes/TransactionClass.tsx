import User from './User'

export default interface TransactionClass {
  product: string
  status: boolean
  amount: number
  to_address: string
  from_address: string
  Type: string
  user: User
  customerid: string
  createdAt: Date
  updatedAt: Date
  objectId: string
}
