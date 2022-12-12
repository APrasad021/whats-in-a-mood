import { Session } from 'next-auth'

export const getWithAccessToken = async (url: string, session: Session) => {
  const res = await fetch(url, {
    headers: {
      // @ts-ignore
      Authorization: `Bearer ${session.user.accessToken}`,
    },
  }).then((res) => res.json())

  return res
}
