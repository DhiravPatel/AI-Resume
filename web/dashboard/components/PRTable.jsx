import { Eye, Check, Clock, AlertCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function PRTable({ prs }) {
  const navigate = useNavigate()

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Reviewed':
        return { class: 'badge-success', icon: Check }
      case 'Pending':
        return { class: 'badge-warning', icon: Clock }
      case 'Changes Requested':
      case 'Changes':
        return { class: 'badge-danger', icon: AlertCircle }
      default:
        return { class: 'badge-info', icon: Clock }
    }
  }

  return (
    <div className="t-card overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b t-border-subtle">
              <th className="px-6 py-4 text-left text-xs font-semibold t-text-secondary uppercase tracking-wider">Pull Request</th>
              <th className="px-6 py-4 text-left text-xs font-semibold t-text-secondary uppercase tracking-wider hidden sm:table-cell">Repository</th>
              <th className="px-6 py-4 text-left text-xs font-semibold t-text-secondary uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-right text-xs font-semibold t-text-secondary uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="">
            {prs.map((pr) => {
              const statusConfig = getStatusConfig(pr.status)
              const StatusIcon = statusConfig.icon
              return (
                <tr key={pr.id} className="hover:bg-surface-700/10 transition-colors group border-t t-border-subtle hover:t-bg-surface">
                  <td className="px-6 py-4">
                    <div>
                      <p className="t-text font-medium text-sm group-hover:text-brand-400 transition-colors">{pr.title}</p>
                      <p className="t-text-faint text-xs mt-0.5">by {pr.author} • {pr.date}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4 hidden sm:table-cell">
                    <span className="t-text-secondary text-sm font-mono">{pr.repo}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={statusConfig.class}>
                      <StatusIcon size={12} />
                      {pr.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => navigate(`/dashboard/pr/${pr.id}`)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 text-brand-400 hover:bg-brand-500/20 transition-all text-xs font-medium border border-brand-500/20"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}
