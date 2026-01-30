import React from 'react'
import { MoreVertical } from 'lucide-react'
import { Avatar, Button } from '@/components/common'
import { formatPoints, formatRelativeTime } from '@/utils'

interface UserListItemProps {
    userName: string
    userAvatar?: string
    totalPoints: number
    badges?: number
    rank?: number
    lastActive?: Date
    onEditPoints?: () => void
    onManageBadges?: () => void
    className?: string
}

export const UserListItem: React.FC<UserListItemProps> = ({
    userName,
    userAvatar,
    totalPoints,
    badges = 0,
    rank,
    lastActive,
    onEditPoints,
    onManageBadges,
    className = '',
}) => {
    const [showMenu, setShowMenu] = React.useState(false)
    const email = `${userName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`

    return (
        <div
            className={`bg-white border border-[var(--neutral-light)] rounded-xl p-5 shadow-[0_1px_3px_rgba(0,0,0,0.06)] ${className}`}
        >
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4 min-w-0">
                    <Avatar src={userAvatar} name={userName} size="xl" />
                    <div className="min-w-0">
                        <div className="text-lg font-semibold text-[var(--text-primary)] truncate">
                            {userName}
                        </div>
                        <div className="text-sm text-[var(--text-secondary)] truncate">{email}</div>
                        <div className="text-xs text-[var(--text-tertiary)] mt-1">
                            {lastActive ? `Last updated ${formatRelativeTime(lastActive)}` : 'Last updated 2 hours ago'}
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {onEditPoints && (
                        <Button
                            variant="secondary"
                            onClick={onEditPoints}
                            className="bg-white border border-[var(--primary)] text-[var(--primary)] hover:bg-[color-mix(in_srgb,var(--primary)_8%,white)]"
                        >
                            Edit Points
                        </Button>
                    )}
                    {onManageBadges && (
                        <Button variant="primary" onClick={onManageBadges} className="">
                            Manage Badges
                        </Button>
                    )}

                    {(onEditPoints || onManageBadges) && (
                        <div className="relative">
                            <button
                                onClick={() => setShowMenu(!showMenu)}
                                className="h-10 w-10 grid place-items-center rounded-lg hover:bg-[var(--neutral-lightest)] transition-colors border border-[var(--neutral-light)]"
                                title="Toggle menu"
                                aria-label="Toggle menu"
                            >
                                <MoreVertical className="w-5 h-5 text-[var(--text-secondary)]" />
                            </button>

                            {showMenu && (
                                <>
                                    <div className="fixed inset-0 z-10" onClick={() => setShowMenu(false)} />
                                    <div className="absolute right-0 top-full mt-2 bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-2 z-20 w-56">
                                        <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F9FAFB] transition-colors flex items-center gap-3">
                                            <span className="text-[#666666]">👤</span>
                                            <span className="text-[#0C0D0F]">View Full Profile</span>
                                        </button>
                                        <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F9FAFB] transition-colors flex items-center gap-3">
                                            <span className="text-[#666666]">📊</span>
                                            <span className="text-[#0C0D0F]">View Points History</span>
                                        </button>
                                        <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F9FAFB] transition-colors flex items-center gap-3">
                                            <span className="text-[#666666]">💬</span>
                                            <span className="text-[#0C0D0F]">Send Message</span>
                                        </button>
                                        <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-[#F9FAFB] transition-colors flex items-center gap-3">
                                            <span className="text-[#666666]">📥</span>
                                            <span className="text-[#0C0D0F]">Export User Data</span>
                                        </button>
                                        <div className="my-1 border-t border-[#E5E7EB]" />
                                        <button className="w-full px-4 py-2.5 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center gap-3">
                                            <span>⏸️</span>
                                            <span>Suspend User</span>
                                        </button>
                                        <button className="w-full px-4 py-2.5 text-left text-sm text-[#DC2626] hover:bg-[#FEF2F2] transition-colors flex items-center gap-3">
                                            <span>🗑️</span>
                                            <span>Delete User</span>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-lg bg-[var(--neutral-lightest)] border border-[var(--neutral-light)] p-4 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-[color-mix(in_srgb,var(--primary)_18%,white)] grid place-items-center">
                        <span className="text-[var(--primary)] font-bold">↗</span>
                    </div>
                    <div>
                        <div className="text-xs text-[var(--text-secondary)]">Current Points</div>
                        <div className="text-xl font-poppins font-bold text-[var(--text-primary)]">
                            {formatPoints(totalPoints)} <span className="text-sm font-medium text-[var(--text-secondary)]">Pts</span>
                        </div>
                    </div>
                </div>

                <div className="rounded-lg bg-[#FFFBF0] border border-[#FFE8B3] p-4">
                    <div className="text-xs text-[#666666] mb-2">Assigned Badges</div>
                    <div className="flex items-center gap-2">
                        {badges > 0 && (
                            <>
                                <div className="h-9 w-9 rounded-lg bg-[#FFD700] flex items-center justify-center shadow-sm">
                                    <span className="text-white text-lg">🛡️</span>
                                </div>
                                {badges > 1 && (
                                    <div className="h-9 w-9 rounded-lg bg-[#FF9800] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-lg">🛡️</span>
                                    </div>
                                )}
                                {badges > 2 && (
                                    <div className="h-9 w-9 rounded-lg bg-[#EF5350] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-lg">🛡️</span>
                                    </div>
                                )}
                                {badges > 3 && (
                                    <div className="h-9 w-9 rounded-lg bg-[#66BB6A] flex items-center justify-center shadow-sm">
                                        <span className="text-white text-lg">🛡️</span>
                                    </div>
                                )}
                            </>
                        )}
                        {badges > 4 && (
                            <div className="h-9 px-3 rounded-lg bg-[#E3F2FD] border border-[#90CAF9] flex items-center justify-center text-sm font-medium text-[#1976D2]">
                                +{badges - 4}
                            </div>
                        )}
                        {badges === 0 && (
                            <div className="text-sm text-[#9CA3AF]">No badges</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
