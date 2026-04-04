import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useAuth as useAuthHook } from '../hooks/useAuth';

// Create a client
const queryClient = new QueryClient();

export function AuthProvider({ children }) {
  // Now simply wrap the app in the QueryClientProvider so that all components 
  // can use tanstack query hooks and the useAuth hook inside out app.
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}

// Re-export the new hook to maintain compatibility with existing components
export function useAuth() {
  return useAuthHook();
}
