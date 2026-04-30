import { createContext, useState, useEffect, ReactNode } from 'react'
import { User } from '../types'
import api from '../service/api'

interface AuthContextType {
  user: User | null
  login: (userData: User) => void
  logout: () => void
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps): React.ReactElement {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const loadUserFromToken = async () => {
      const token = localStorage.getItem('token')
      
      if (!token) {
        setLoading(false)
        return
      }
      
      try {
        const response = await api.get('/users/me')
        setUser(response.data)
      } catch (error) {
        console.error('Ошибка загрузки пользователя:', error)
        localStorage.removeItem('token')
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    
    loadUserFromToken()
  }, [])

  const login = (userData: User): void => {
    setUser(userData)
  }

  const logout = (): void => {
    localStorage.removeItem('token')
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}