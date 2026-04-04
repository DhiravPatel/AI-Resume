import { ArrowLeft, AlertTriangle, Lightbulb, Shield, FileText, GitBranch, Plus, Minus, CheckCircle } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { getReviewData } from '../../shared/data'

export default function PRDetailPage() {
  const navigate = useNavigate()
  const { id } = useParams()
  const review = getReviewData(Number(id))

  if (!review) {
    return (
      <div className="p-8 text-center">
        <p className="t-text-secondary">Review not found.</p>
      </div>
    )
  }

  const { pr, diff, comments, summary } = review

  const getCommentStyle = (type) => {
    switch (type) {
      case 'security':
        return {
          bg: 'bg-red-500/8',
          border: 'border-red-500/20',
          iconBg: 'bg-red-500/15',
          iconColor: 'text-red-400',
          titleColor: 'text-red-400',
          Icon: Shield,
        }
      case 'warning':
        return {
          bg: 'bg-amber-500/8',
          border: 'border-amber-500/20',
          iconBg: 'bg-amber-500/15',
          iconColor: 'text-amber-400',
          titleColor: 'text-amber-400',
          Icon: AlertTriangle,
        }
      case 'suggestion':
      default:
        return {
          bg: 'bg-brand-500/8',
          border: 'border-brand-500/20',
          iconBg: 'bg-brand-500/15',
          iconColor: 'text-brand-400',
          titleColor: 'text-brand-400',
          Icon: Lightbulb,
        }
    }
  }

  const getScoreColor = (score) => {
    if (score >= 80) return 'text-brand-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getVerdictBadge = (verdict) => {
    switch (verdict) {
      case 'Approved':
        return 'badge-success'
      case 'Changes Requested':
        return 'badge-danger'
      default:
        return 'badge-warning'
    }
  }

  return (
    <div className="p-6 lg:p-8 max-w-5xl animate-fade-in">
      {/* Back Button */}
      <button
        id="pr-detail-back-btn"
        onClick={() => navigate('/dashboard/pull-requests')}
        className="flex items-center gap-2 t-text-secondary hover:t-text transition-colors mb-6 text-sm font-medium group"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        Back to Pull Requests
      </button>

      {/* Header */}
      <div className="t-card p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-surface-700 to-surface-800 border border-surface-600/50 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {pr.authorAvatar}
              </div>
              <div>
                <h1 className="text-xl lg:text-2xl font-bold t-text leading-tight">{pr.title}</h1>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs t-text-muted">
                  <span className="font-mono t-text-secondary">{pr.repo}</span>
                  <span>•</span>
                  <span>PR #{pr.number}</span>
                  <span>•</span>
                  <span>by {pr.author}</span>
                  <span>•</span>
                  <span>{pr.date}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Meta badges */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="badge-info">
              <GitBranch size={12} />
              {pr.branch}
            </span>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1 text-brand-400 bg-brand-500/10 px-2 py-1 rounded-md">
                <Plus size={12} />{pr.additions}
              </span>
              <span className="flex items-center gap-1 text-red-400 bg-red-500/10 px-2 py-1 rounded-md">
                <Minus size={12} />{pr.deletions}
              </span>
              <span className="flex items-center gap-1 t-text-secondary t-bg-input px-2 py-1 rounded-md">
                <FileText size={12} />{pr.files} files
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Diff Section */}
      <div className="t-card overflow-hidden mb-6">
        <div className="flex items-center justify-between px-6 py-4 border-b t-border-subtle">
          <h2 className="text-base font-semibold t-text">Code Changes</h2>
        </div>
        <div className="p-4 lg:p-6 font-mono text-xs md:text-sm leading-relaxed overflow-x-auto">
          {diff.map((line, idx) => {
            if (line.type === 'file') {
              return (
                <div key={idx} className="flex items-center gap-2 py-2 px-3 t-bg-surface rounded-lg mb-2 mt-2 first:mt-0">
                  <FileText size={14} className="t-text-muted" />
                  <span className="t-text-secondary font-medium">{line.name}</span>
                </div>
              )
            }
            if (line.type === 'spacer') {
              return <div key={idx} className="h-4" />
            }
            return (
              <div
                key={idx}
                className={`px-3 py-0.5 rounded-sm ${
                  line.type === 'add' ? 'code-line-add' :
                  line.type === 'remove' ? 'code-line-remove' :
                  'code-line-neutral'
                }`}
              >
                <span className="t-text-faint select-none inline-block w-8 text-right mr-3">
                  {line.line}
                </span>
                <span className="select-none mr-2 inline-block w-3">
                  {line.type === 'add' ? '+' : line.type === 'remove' ? '-' : ' '}
                </span>
                {line.content}
              </div>
            )
          })}
        </div>
      </div>

      {/* AI Review Comments */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold t-text mb-4">AI Review Comments</h2>
        <div className="space-y-4">
          {comments.map((comment) => {
            const style = getCommentStyle(comment.type)
            const CommentIcon = style.Icon
            return (
              <div
                key={comment.id}
                className={`rounded-2xl ${style.bg} border ${style.border} p-5 lg:p-6 transition-all hover:shadow-lg`}
              >
                <div className="flex gap-4">
                  <div className={`w-10 h-10 rounded-xl ${style.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <CommentIcon className={style.iconColor} size={20} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <h3 className={`font-semibold ${style.titleColor}`}>{comment.title}</h3>
                      <span className="text-[10px] t-text-faint font-mono t-bg-surface px-2 py-0.5 rounded">
                        {comment.file}:{comment.line}
                      </span>
                    </div>
                    <p className="t-text-secondary text-sm leading-relaxed mb-3">{comment.description}</p>
                    {comment.details && (
                      <ul className="space-y-1.5">
                        {comment.details.map((detail, didx) => (
                          <li key={didx} className="flex items-center gap-2 t-text-secondary text-sm">
                            <span className={`w-1 h-1 rounded-full ${style.iconColor.replace('text-', 'bg-')}`} />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Review Summary */}
      <div className="t-card p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold t-text">Review Summary</h3>
          <span className={getVerdictBadge(summary.verdict)}>
            {summary.verdict === 'Approved' && <CheckCircle size={12} />}
            {summary.verdict === 'Changes Requested' && <AlertTriangle size={12} />}
            {summary.verdict}
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
            <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Critical</p>
            <p className="text-2xl lg:text-3xl font-bold text-red-400">{summary.criticalIssues}</p>
          </div>
          <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
            <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Warnings</p>
            <p className="text-2xl lg:text-3xl font-bold text-amber-400">{summary.warnings}</p>
          </div>
          <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
            <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Suggestions</p>
            <p className="text-2xl lg:text-3xl font-bold text-brand-400">{summary.suggestions}</p>
          </div>
          <div className="text-center p-4 rounded-xl t-bg-surface border t-border-subtle">
            <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-2">Score</p>
            <p className={`text-2xl lg:text-3xl font-bold ${getScoreColor(summary.score)}`}>
              {summary.score}/100
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
