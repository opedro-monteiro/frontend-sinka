// 'use client'
// import { api } from '@/services/api'
// import { recoverUserInformation, signInRequest } from '@/services/auth'
// import { useRouter } from 'next/navigation'
// import { parseCookies, setCookie } from 'nookies'
// import { createContext, ReactNode, useEffect, useState } from 'react'

// type User = {
//   id: string
//   name: string
//   email: string
//   role: string
//   tenantId: string
// }

// type SignInData = {
//   email: string
//   password: string
// }

// type AuthContextType = {
//   isAuthenticated: boolean
//   user: User | null
//   signIn: (data: SignInData) => Promise<void>
// }

// export const AuthContext = createContext({} as AuthContextType)

// export function AuthProvider({ children }: { children: ReactNode }) {
//   const [user, setUser] = useState<User | null>(null)
//   const router = useRouter()
//   const isAuthenticated = !!user

//   useEffect(() => {
//     const { 'nextauth.token': token } = parseCookies()

//     if (token) {
//       recoverUserInformation().then((response) => {
//         setUser(response.user)
//       })
//     }
//   }, [])

//   async function signIn({ email, password }: SignInData) {
//     const { token, user } = await signInRequest({
//       email,
//       password,
//     })

//     setCookie(undefined, 'nextauth.token', token, {
//       maxAge: 60 * 60 * 1, // 1 hour
//     })

//     // api.defaults.headers.Authorization = `Bearer ${token}`

//     setUser(user)

//     router.push('/dashboard')
//   }

//   return (
//     <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }
