import { Suspense } from 'react'
import AuthCallback from './auth-callback'

export default function CallbackPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <AuthCallback />
    </Suspense>
  )
}
