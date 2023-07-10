import { GoogleAuthProvider, User, signInWithPopup, signOut } from 'firebase/auth'
import React, { useEffect } from 'react'
import { auth } from '~/firebase/firebase'
import Loading from '~/pages/Loading'

interface Props {
  children: React.ReactNode
}

export type AuthContextType = {
  login: () => Promise<void>
  logout: () => Promise<void>
  user: User | null
}

export const AuthContext = React.createContext<AuthContextType | null>(null)

const AuthContextProvider = ({ children }: Props) => {
  const [user, setUser] = React.useState<User | null>(null)
  const [loading, setLoading] = React.useState(true)

  const login = async () => {
    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    await signOut(auth)
  }

  useEffect(() => {
    const unSubscribe = auth.onAuthStateChanged(async (currentUser) => {
      if (currentUser) {
        setUser(currentUser)
      } else {
        setUser(null)
      }
      console.log('User', currentUser)
      setLoading(false)
    })
    return () => {
      unSubscribe()
    }
  }, [])

  const value = { login, logout, user }
  return loading ? <Loading /> : <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

export const useAuth = () => {
  return React.useContext(AuthContext) as AuthContextType
}
