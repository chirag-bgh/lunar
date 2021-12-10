export interface WithdrawalClass {
  user: User
  ethAddress: string
  balance: string
  createdAt: Date
  updatedAt: Date
  objectId: string
}

export interface User {
  authData: AuthData
  createdAt: Date
  username: string
  sessionToken: string
  updatedAt: Date
  accounts: string[]
  ACL: ACL
  ethAddress: string
  managed_account_pub: string
  managed_account_priv: string
  objectId: string
  __type: string
  className: string
}

export interface ACL {
  YmzXFvrMqTxt5zu6uon5HhHd: YmzXFvrMqTxt5Zu6Uon5HhHD
}

export interface YmzXFvrMqTxt5Zu6Uon5HhHD {
  read: boolean
  write: boolean
}

export interface AuthData {
  moralisEth: MoralisEth
}

export interface MoralisEth {
  id: string
  signature: string
  data: string
}
