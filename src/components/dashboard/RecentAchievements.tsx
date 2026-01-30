import React from 'react'
import { Award, Star, TrendingUp, Users, Calendar } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardContent, Badge } from '@/components/common'
import { formatRelativeTime } from '@/utils'

interface Achievement {
    id: string
    type: 'badge' | 'points' | 'milestone' | 'streak'
    title: string
    description: string
    icon?: string
    color?: string
    timestamp: Date
}

interface RecentAchievementsProps {
    achievements: Achievement[]
    maxDisplay?: number
    onViewAll?: () => void
    className?: string
}

export const RecentAchievements: React.FC<RecentAchievementsProps> = ({
    achievements,
    maxDisplay = 5,
    onViewAll,
    className = '',
}) => {
    const displayedAchievements = achievements.slice(0, maxDisplay)

    const getIcon = (type: Achievement['type'], icon?: string) => {
        if (icon) return <span className="text-2xl">{icon}</span>

        switch (type) {
            case 'badge':
                return <Award className="w-5 h-5" />
            case 'points':
                return <Star className="w-5 h-5" />
            case 'milestone':
                return <TrendingUp className="w-5 h-5" />
            case 'streak':
                return <Calendar className="w-5 h-5" />
            default:
                return <Award className="w-5 h-5" />
        }
    }

    const getColor = (type: Achievement['type'], customColor?: string) => {
        if (customColor) return customColor

        switch (type) {
            case 'badge':
                return '#F59E0B'
            case 'points':
                return '#3E8FCC'
            case 'milestone':
                return '#16A34A'
            case 'streak':
                return '#DC2626'
            default:
                return '#6B7280'
        }
    }

    return (
        <Card className={className}>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle>Recent Achievements</CardTitle>
                    {onViewAll && achievements.length > maxDisplay && (
                        <button
                            onClick={onViewAll}
                            className="text-sm font-medium text-primary hover:text-primary-dark transition-colors"
                        >
                            View All
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </CardHeader>

            <CardContent>
                {achievements.length === 0 ? (
                    <div className="text-center py-8">
                        <Users className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                        <p className="text-text-secondary">No recent achievements</p>
                        <p className="text-sm text-text-tertiary mt-1">
                            Start completing sessions to earn achievements
                        </p>
                    </div>
                ) : (
                    <div className="space-y-3">
                        {displayedAchievements.map((achievement) => {
                            const color = getColor(achievement.type, achievement.color)

                            return (
                                <div
                                    key={achievement.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-lightest transition-colors animate-fadeIn"
                                >
                                    <div
                                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${color}20`, color }}
                                    >
                                        {getIcon(achievement.type, achievement.icon)}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-text-primary">
                                            {achievement.title}
                                        </p>
                                        <p className="text-xs text-text-secondary mt-0.5">
                                            {achievement.description}
                                        </p>
                                        <p className="text-xs text-text-tertiary mt-1">
                                            {formatRelativeTime(achievement.timestamp)}
                                        </p>
                                    </div>
                                    <Badge
                                        variant={
                                            achievement.type === 'badge' ? 'warning' :
                                                achievement.type === 'points' ? 'info' :
                                                    achievement.type === 'milestone' ? 'success' :
                                                        'neutral'
                                        }
                                        size="sm"
                                    >
                                        {achievement.type}
                                    </Badge>
                                </div>
                            )
                        })}
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
