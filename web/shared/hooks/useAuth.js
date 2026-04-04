import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../api/axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export function useAuth() {
  const queryClient = useQueryClient();

  // Fetch the current user session from our backend API
  const { data, isLoading, error } = useQuery({
    queryKey: ['auth', 'me'],
    queryFn: async () => {
      const response = await api.get('/auth/me');
      return response.data?.data?.user || null;
    },
    retry: false, // Don't retry if hitting 401
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const loginMutation = useMutation({
    mutationFn: async () => {
      // Direct the user to the backend Google OAuth flow
      // This will redirect their browser entirely
      window.location.href = `${API_URL}/auth/google`;
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post('/auth/logout');
    },
    onSuccess: () => {
      // Clear React Query cache so the user data is universally dropped
      queryClient.setQueryData(['auth', 'me'], null);
      queryClient.clear();

      // Clear any lingering front-end storage (from the old Supabase days or other caching)
      localStorage.clear();
      sessionStorage.clear();

      // Bruteforce delete every single frontend readable cookie 
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });

      // Ensure the browser cleans up everything and kicks them safely to the login page
      window.location.href = '/login';
    },
  });

  // Parse backend authentication errors from the URL parameter (e.g. ?error=auth_failed)
  const urlParams = new URLSearchParams(window.location.search);
  const urlError = urlParams.get('error');
  const displayError = urlError === 'auth_failed' ? 'Google Authentication failed. Please try again.' : null;

  return {
    user: data || null,
    loading: isLoading,
    // We intentionally don't expose the /auth/me query error to the UI 
    // because a 401 Unauthorized simply means "not logged in yet".
    error: displayError,
    isAuthenticated: !!data,
    signInWithGoogle: () => loginMutation.mutateAsync(),
    signOut: () => logoutMutation.mutateAsync(),
  };
}
