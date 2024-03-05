import React from 'react'
import { AppRouter } from './router/AppRouter'
import { AuthProvider } from './auth/context'

export const EcommerceApp = () => {
  return (
    <AuthProvider>
        <AppRouter/>
    </AuthProvider>
  )
}
