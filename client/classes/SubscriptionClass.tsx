import User from './User'

export default interface SubscriptionClass {
  product: string
  price: number
  recurrence: string
  created_at: Date
  currency: string
  email: string
  status: string
}
