import { createContext } from 'react'

export interface UserModel {
  id: any
  name: string
  role: string
}

export type MaybeUserModel = UserModel | null

export type UserAuthContextType = {
  user: MaybeUserModel
  onLogin: (data: UserModel) => void
  onLogout: () => void
}

export const UserAuthContext = createContext({} as UserAuthContextType)
