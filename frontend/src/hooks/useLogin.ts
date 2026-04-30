import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../service/api'
import { User } from '../types'

interface UseLoginReturn {
  username: string
  setUsername: (value: string) => void
  password: string
  setPassword: (value: string) => void
  error: string
  loading: boolean
  handleSubmit: (e: React.SyntheticEvent) => Promise<void> 
}

export function useLogin(): UseLoginReturn {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const { login } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await api.post('/auth/login', { username, password })
      const { token } = response.data as { token: string }

      localStorage.setItem('token', token)

      const userResponse = await api.get('/users/me')
      login(userResponse.data as User)

      navigate('/')
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string; error?: string } } }
      setError(error.response?.data?.message || error.response?.data?.error || 'Ошибка входа')
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    setUsername,
    password,
    setPassword,
    error,
    loading,
    handleSubmit,
  }
}