import { useLocation } from 'react-router-dom'
import { ThemeProvider } from './shared/context/ThemeContext'
import LandingApp from './landing/App'
import DashboardApp from './dashboard/App'

export default function App() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  if (isDashboard) {
    return (
      <ThemeProvider>
        <DashboardApp />
      </ThemeProvider>
    )
  }

  return <LandingApp />
}
