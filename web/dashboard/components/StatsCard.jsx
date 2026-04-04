import { TrendingUp, TrendingDown } from 'lucide-react'

export default function StatsCard({ icon: Icon, title, value, trend, trendLabel, color = 'brand' }) {
  const colorMap = {
    brand: {
      iconBg: 'bg-brand-500/15',
      iconColor: 'text-brand-400',
      trendUp: 'text-brand-400',
    },
    red: {
      iconBg: 'bg-red-500/15',
      iconColor: 'text-red-400',
      trendUp: 'text-red-400',
    },
    amber: {
      iconBg: 'bg-amber-500/15',
      iconColor: 'text-amber-400',
      trendUp: 'text-amber-400',
    },
    cyan: {
      iconBg: 'bg-cyan-500/15',
      iconColor: 'text-cyan-400',
      trendUp: 'text-cyan-400',
    },
  }

  const colors = colorMap[color] || colorMap.brand
  const isPositive = trend > 0

  return (
    <div className="t-card-hover p-5 lg:p-6 group">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="t-text-muted text-xs font-medium uppercase tracking-wider mb-3">{title}</p>
          <h3 className="text-2xl lg:text-3xl font-bold t-text mb-1">{value}</h3>
          {trend !== undefined && (
            <div className="flex items-center gap-1.5 mt-2">
              {isPositive ? (
                <TrendingUp size={14} className="text-brand-400" />
              ) : (
                <TrendingDown size={14} className="text-red-400" />
              )}
              <span className={`text-xs font-medium ${isPositive ? 'text-brand-400' : 'text-red-400'}`}>
                {isPositive ? '+' : ''}{trend}%
              </span>
              <span className="t-text-faint text-xs">
                {trendLabel || 'vs last week'}
              </span>
            </div>
          )}
        </div>
        <div className={`w-11 h-11 rounded-xl ${colors.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className={colors.iconColor} size={22} />
        </div>
      </div>
    </div>
  )
}
