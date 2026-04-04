import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'

export default function LoginApp() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
