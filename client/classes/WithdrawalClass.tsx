import User from './User'

export interface WithdrawalClass {
  user: User
  ethAddress: string
  balance: string
  createdAt: Date
  updatedAt: Date
  objectId: string
}
