export interface Book {
  id: number
  title: string
  isbn: string
  publicationYear: number
  publisher: string
  available: boolean
  coverImage: string
  authors: string[]
  categories: string[]
}

export interface Category {
  id: number
  name: string
}

export interface User {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  role: string
  registrationDate: string
  isActive: boolean
}

export interface LoginRequest {
  username: string
  password: string
}

export interface LoginResponse {
  token: string
}

export interface RegisterRequest {
  username: string
  email: string
  password: string
  firstName: string
  lastName: string
}

export interface ChangePasswordRequest {
  oldPassword: string
  newPassword: string
}