'use server'

import { authFetch } from './authFetch'
import { BACKEND_URL } from './constants'

export const getProfile = async () => {
  // const session = await getSession();
  // const response = await fetch(`${BACKEND_URL}/auth/protected`, {
  //   headers: {
  //     authorization: `Bearer ${session?.accessToken}`,
  //   },
  // });

  const response = await authFetch(`${BACKEND_URL}/auth/profile`)

  const result = await response.json()
  return result
}
