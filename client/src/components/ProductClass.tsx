export default interface ProductClass {
  name: string
  price: number
  user: User
  createdAt: Date
  updatedAt: Date
  objectId: string
}

export interface User {
  username: string
  authData: AuthData
  createdAt: Date
  updatedAt: Date
  accounts: string[]
  ethAddress: string
  ACL: ACL
  sessionToken: string
  objectId: string
  __type: string
  className: string
}

export interface ACL {
  po6X6euCSRyqwuQWYlccvwQz: Po6X6EuCSRyqwuQWYlccvwQz
}

export interface Po6X6EuCSRyqwuQWYlccvwQz {
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
