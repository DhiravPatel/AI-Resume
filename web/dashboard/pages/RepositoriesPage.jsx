import { RefreshCw, Star, GitBranch, ExternalLink, Clock, CheckCircle } from 'lucide-react'
import { useState } from 'react'
import { mockRepos } from '../../shared/data'

export default function RepositoriesPage() {
  const [syncing, setSyncing] = useState(null)

  const handleSync = (repoId) => {
    setSyncing(repoId)
    setTimeout(() => setSyncing(null), 2000)
  }

  const handleSyncAll = () => {
    setSyncing('all')
    setTimeout(() => setSyncing(null), 3000)
  }

  return (
    <div className="p-6 lg:p-8 max-w-7xl animate-fade-in">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold t-text tracking-tight mb-1">Repositories</h1>
          <p className="t-text-muted">
            {mockRepos.length} repositories connected to CodeReview AI
          </p>
        </div>
        <button
          id="sync-all-repos-btn"
          onClick={handleSyncAll}
          className="btn-primary text-sm"
          disabled={syncing === 'all'}
        >
          <RefreshCw size={16} className={syncing === 'all' ? 'animate-spin' : ''} />
          {syncing === 'all' ? 'Syncing...' : 'Sync All Repos'}
        </button>
      </div>

      {/* Repos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
        {mockRepos.map((repo, idx) => (
          <div
            key={repo.id}
            className="t-card-hover p-5 lg:p-6 group"
            style={{ animationDelay: `${idx * 80}ms` }}
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-base font-semibold t-text truncate group-hover:text-brand-400 transition-colors">
                    {repo.name}
                  </h3>
                  <ExternalLink size={14} className="t-text-muted opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                </div>
                <p className="t-text-faint text-xs font-mono truncate">{repo.fullName}</p>
              </div>
              <div className="flex items-center gap-1.5">
                <span
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: repo.languageColor }}
                />
                <span className="t-text-secondary text-xs font-medium">{repo.language}</span>
              </div>
            </div>

            {/* Description */}
            <p className="t-text-muted text-sm mb-4 line-clamp-2 leading-relaxed">
              {repo.description}
            </p>

            {/* Stats row */}
            <div className="flex gap-5 mb-4">
              <div className="flex items-center gap-1.5 t-text-muted">
                <Star size={14} />
                <span className="text-sm font-medium t-text-secondary">{repo.stars.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-1.5 t-text-muted">
                <GitBranch size={14} />
                <span className="text-sm font-medium t-text-secondary">{repo.openPRs} PRs</span>
              </div>
              <div className="flex items-center gap-1.5 t-text-muted">
                <Clock size={14} />
                <span className="text-xs">{repo.lastSync}</span>
              </div>
            </div>

            {/* Status + Action */}
            <div className="flex items-center justify-between pt-4 border-t t-border-subtle">
              <div className="flex items-center gap-1.5">
                {repo.status === 'synced' ? (
                  <>
                    <CheckCircle size={14} className="text-brand-400" />
                    <span className="text-brand-400 text-xs font-medium">Synced</span>
                  </>
                ) : (
                  <>
                    <Clock size={14} className="text-amber-400" />
                    <span className="text-amber-400 text-xs font-medium">Needs sync</span>
                  </>
                )}
              </div>
              <button
                onClick={() => handleSync(repo.id)}
                disabled={syncing === repo.id}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-all text-xs font-medium border border-brand-500/20 disabled:opacity-50"
              >
                <RefreshCw size={12} className={syncing === repo.id ? 'animate-spin' : ''} />
                {syncing === repo.id ? 'Syncing' : 'Sync'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
