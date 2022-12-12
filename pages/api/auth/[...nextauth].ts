import NextAuth from 'next-auth'
import SpotifyProvider from 'next-auth/providers/spotify'

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.SPOTIFY_CLIENT_ID || '',
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || '',
      authorization: {
        params: {
          scope:
            'user-read-email playlist-modify-public playlist-modify-private',
        },
      },
    }),
    // ...add more providers here
  ],
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.id = account.id
        token.expires_at = account.expires_at
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }) {
      session.user = token
      return session
    },
  },
})

//export default NextAuth(authOptions)
