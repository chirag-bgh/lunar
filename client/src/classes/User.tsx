export default interface User {
  username: string
  authData: AuthData
  managed_account_pub: string
  encryptedKey: string
  createdAt: Date
  updatedAt: Date
  accounts: string[]
  ethAddress: string
  ACL: ACL
  sessionToken: string
  objectId: string
  __type: string
  className: string
  withdrawalAddress: string[]
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
