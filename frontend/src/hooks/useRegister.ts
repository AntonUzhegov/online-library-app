import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../service/api'

interface UseRegisterReturn {
  username: string
  setUsername: (value: string) => void
  email: string
  setEmail: (value: string) => void
  firstName: string
  setFirstName: (value: string) => void
  lastName: string
  setLastName: (value: string) => void
  password: string
  setPassword: (value: string) => void
  confirmPassword: string
  setConfirmPassword: (value: string) => void
  error: string
  success: string
  loading: boolean
  handleSubmit: (e: React.SyntheticEvent) => Promise<void>
}

export function useRegister(): UseRegisterReturn {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [firstName, setFirstName] = useState<string>('')
  const [lastName, setLastName] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [success, setSuccess] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const navigate = useNavigate()

  const validateForm = (): boolean => {
    if (password !== confirmPassword) {
      setError('Пароли не совпадают')
      return false
    }

    if (password.length < 6) {
      setError('Пароль должен быть не менее 6 символов')
      return false
    }

    if (username.length < 3) {
      setError('Логин должен быть не менее 3 символов')
      return false
    }

    if (!email.includes('@')) {
      setError('Введите корректный email')
      return false
    }

    if (firstName.length < 2) {
      setError('Имя должно быть не менее 2 символов')
      return false
    }

    if (lastName.length < 2) {
      setError('Фамилия должна быть не менее 2 символов')
      return false
    }

    return true
  }

  const handleSubmit = async (e: React.SyntheticEvent): Promise<void> => {
    e.preventDefault()
    setError('')
    setSuccess('')
    
    if (!validateForm()) {
      return
    }
    
    setLoading(true)

    try {
      await api.post('/auth/register', {
        username,
        email,
        password,
        firstName,
        lastName
      })
      
      setSuccess('Регистрация прошла успешно!')
      
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string } } }
      setError(error.response?.data?.error || 'Ошибка регистрации')
    } finally {
      setLoading(false)
    }
  }

  return {
    username,
    setUsername,
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    success,
    loading,
    handleSubmit,
  }
}