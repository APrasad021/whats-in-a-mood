import { Session } from 'next-auth'

export const isAuthenticated = (session: Session | null) => {
  if (
    !session ||
    Math.floor(Date.now()) >= (session.user as any).expires_at * 1000
  ) {
    return false
  }
  return true
}
