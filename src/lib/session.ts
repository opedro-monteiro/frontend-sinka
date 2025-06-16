'use server'
import { jwtVerify, SignJWT } from 'jose'

import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { Role } from './type'

export type Session = {
  user: {
    id: string
    role: Role
    name: string
    email: string
    tenantId: string
  }
  accessToken: string
  refreshToken: string
}

const secretKey = process.env.SESSION_SECRET_KEY!
const encodedKey = new TextEncoder().encode(secretKey)

export async function createSession(payload: Session) {
  const expiredAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

  const session = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(encodedKey)

  const cookie = await cookies()

  cookie.set('session', session, {
    httpOnly: true,
    secure: false, // Ativar para produção
    expires: expiredAt,
    sameSite: 'lax',
    path: '/',
  })
}

export async function getSession() {
  const cookie = await cookies()

  const cookieStatus = cookie.get('session')?.value

  if (!cookieStatus) return null

  try {
    const { payload } = await jwtVerify(cookieStatus, encodedKey, {
      algorithms: ['HS256'],
    })

    return payload as Session
  } catch (err) {
    redirect('/auth/login')
  }
}

export async function deleteSession() {
  const cookie = await cookies()
  cookie.delete('session')
}

export async function updateTokens({
  accessToken,
  refreshToken,
}: {
  accessToken: string
  refreshToken: string
}) {
  const cookie = await cookies()
  const cookieValue = cookie.get('session')?.value

  if (!cookieValue) return null

  const { payload } = await jwtVerify<Session>(cookieValue, encodedKey)

  if (!payload) throw new Error('Session not found')

  const newPayload: Session = {
    user: {
      ...payload.user,
    },
    accessToken,
    refreshToken,
  }

  await createSession(newPayload)
}
