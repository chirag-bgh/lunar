import User from './User'

export default interface TransactionClass {
  product: string
  status: boolean
  amount: number
  to_address: string
  from_address: string
  type: string
  email: string
  created_at: Date
}
