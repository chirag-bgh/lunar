import User from './User'

export default interface DemographicsClass {
  email: string
  city: string
  country: string
  createdAt: string
  totalSpent: number
  subscriptions: number
  purchases: number
  user: User
}
