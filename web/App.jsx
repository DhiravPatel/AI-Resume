import { useLocation } from 'react-router-dom'
import { AuthProvider } from './shared/context/AuthContext'
import { ThemeProvider } from './shared/context/ThemeContext'
import ProtectedRoute from './shared/components/ProtectedRoute'
import LandingApp from './landing/App'
import LoginApp from './login/App'
import DashboardApp from './dashboard/App'

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')
  const isAuth = location.pathname === '/login' || location.pathname.startsWith('/auth/')

  return (
    <AuthProvider>
      {isDashboard ? (
        <ThemeProvider>
          <ProtectedRoute>
            <DashboardApp />
          </ProtectedRoute>
        </ThemeProvider>
      ) : isAuth ? (
        <LoginApp />
      ) : (
        <LandingApp />
      )}
    </AuthProvider>
  )
}
