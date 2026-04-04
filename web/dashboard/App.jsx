import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import DashboardPage from './pages/DashboardPage'
import RepositoriesPage from './pages/RepositoriesPage'
import PullRequestsPage from './pages/PullRequestsPage'
import PRDetailPage from './pages/PRDetailPage'

export default function DashboardApp() {
  return (
    <div className="flex h-screen t-bg t-text transition-colors duration-300">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Topbar />
        <main className="flex-1 overflow-auto">
          <Routes>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/dashboard/repositories" element={<RepositoriesPage />} />
            <Route path="/dashboard/pull-requests" element={<PullRequestsPage />} />
            <Route path="/dashboard/pr/:id" element={<PRDetailPage />} />
          </Routes>
        </main>
      </div>
    </div>
  )
}
