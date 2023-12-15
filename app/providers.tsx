'use client'

import { ApolloProvider } from '@apollo/client'
import createApolloClient from '@/apollo-client'
import { AuthProvider } from '@/providers'
import { ChakraProvider } from '@chakra-ui/react'

export function Providers({ children }: { children: React.ReactNode }) {
  const apolloClient = createApolloClient();
  return (
    <ApolloProvider client={apolloClient}>
      <ChakraProvider>
        <AuthProvider>
          {children}
        </AuthProvider>
      </ChakraProvider>
    </ApolloProvider>
  )
}
