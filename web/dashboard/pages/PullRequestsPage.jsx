import { useNavigate } from 'react-router-dom'
import { Eye, Check, Clock, AlertCircle, Filter, GitBranch, Plus, Minus, FileText } from 'lucide-react'
import { useState } from 'react'
import { mockPullRequests } from '../../shared/data'

export default function PullRequestsPage() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const filteredPRs = filter === 'all'
    ? mockPullRequests
    : mockPullRequests.filter((pr) =>
        filter === 'reviewed' ? pr.status === 'Reviewed' :
        filter === 'pending' ? pr.status === 'Pending' :
        pr.status === 'Changes Requested'
      )

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Reviewed':
        return { class: 'badge-success', icon: Check }
      case 'Pending':
        return { class: 'badge-warning', icon: Clock }
      case 'Changes Requested':
        return { class: 'badge-danger', icon: AlertCircle }
      default:
        return { class: 'badge-info', icon: Clock }
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight mb-1">Pull Requests</h1>
        <p className="t-text-muted">Review and manage all pull requests across your repositories</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2 mb-6">
        <Filter size={16} className="t-text-muted" />
        {[
          { key: 'all', label: 'All', count: mockPullRequests.length },
          { key: 'reviewed', label: 'Reviewed', count: mockPullRequests.filter(p => p.status === 'Reviewed').length },
          { key: 'pending', label: 'Pending', count: mockPullRequests.filter(p => p.status === 'Pending').length },
          { key: 'changes', label: 'Changes', count: mockPullRequests.filter(p => p.status === 'Changes Requested').length },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? 'bg-brand-500/15 text-brand-400 border border-brand-500/30'
                : 't-bg-input t-text-secondary border t-border-subtle hover:t-text hover:bg-surface-700/30'
            }`}
          >
            {f.label}
            <span className="ml-1.5 opacity-60">{f.count}</span>
          </button>
        ))}
      </div>

      {/* PRs List */}
      <div className="space-y-3">
        {filteredPRs.map((pr, idx) => {
          const statusConfig = getStatusConfig(pr.status)
          const StatusIcon = statusConfig.icon
          return (
            <div
              key={pr.id}
              className="t-card-hover p-5 lg:p-6 flex flex-col md:flex-row md:items-center gap-4 group cursor-pointer"
              onClick={() => navigate(`/dashboard/pr/${pr.id}`)}
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              {/* Avatar */}
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-700 to-surface-800 border border-surface-600/50 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {pr.authorAvatar}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-sm lg:text-base font-semibold t-text group-hover:text-brand-400 transition-colors truncate">
                    {pr.title}
                  </h3>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs t-text-muted">
                  <span className="font-mono t-text-secondary">{pr.repo}</span>
                  <span>•</span>
                  <span>{pr.branch}</span>
                  <span>•</span>
                  <span>by {pr.author}</span>
                  <span>•</span>
                  <span>{pr.date}</span>
                </div>
              </div>

              {/* Meta info */}
              <div className="flex items-center gap-3 md:gap-4 flex-shrink-0">
                {/* File changes */}
                <div className="hidden lg:flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1 text-brand-400">
                    <Plus size={12} />{pr.additions}
                  </span>
                  <span className="flex items-center gap-1 text-red-400">
                    <Minus size={12} />{pr.deletions}
                  </span>
                  <span className="flex items-center gap-1 t-text-muted">
                    <FileText size={12} />{pr.files}
                  </span>
                </div>

                {/* Status badge */}
                <span className={statusConfig.class}>
                  <StatusIcon size={12} />
                  {pr.status}
                </span>

                {/* View button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation()
                    navigate(`/dashboard/pr/${pr.id}`)
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-all text-xs font-medium border border-brand-500/20"
                >
                  <Eye size={14} />
                  View Review
                </button>
              </div>
            </div>
          )
        })}
      </div>

      {/* Empty state */}
      {filteredPRs.length === 0 && (
        <div className="t-card p-12 text-center">
          <GitBranch size={48} className="t-text-secondary mx-auto mb-4" />
          <h3 className="text-lg font-semibold t-text mb-2">No pull requests found</h3>
          <p className="t-text-muted text-sm">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  )
}
