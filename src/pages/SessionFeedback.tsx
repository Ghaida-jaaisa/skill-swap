import React, { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { SessionCompletedScreen, PostSessionFeedbackLayout } from '@/components/feedback'
import { BadgeUnlockedScreen } from '@/components/gamification'
import { useSubmitFeedback } from '@/hooks'
import { useBadgesStore } from '@/store'
import { FeedbackFormData } from '@/types'
import { PostSessionTopNav } from '@/components/layout/PostSessionTopNav'
import { PostSessionFooter } from '@/components/layout/PostSessionFooter'

export const SessionFeedback: React.FC = () => {
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    const [showForm, setShowForm] = useState(false)
    const sessionId = searchParams.get('sessionId') || ''
    const partnerName = searchParams.get('partnerName') || 'Your Partner'
    const partnerAvatar = searchParams.get('partnerAvatar') || undefined
    const role = (searchParams.get('role') || 'seeker') as 'provider' | 'seeker'

    const submitFeedbackMutation = useSubmitFeedback()
    const { recentlyUnlocked, setRecentlyUnlocked } = useBadgesStore()

    const handleRateNow = () => {
        setShowForm(true)
    }

    const handleSkip = () => {
        navigate('/dashboard')
    }

    const handleSubmitFeedback = async (data: FeedbackFormData) => {
        try {
            await submitFeedbackMutation.mutateAsync({
                sessionId,
                toUserId: 'partner-user-id', // Replace with actual partner ID
                ...data,
            })

            const badgeUnlocked = false // Replace with actual check

            if (badgeUnlocked) {
            } else {
                navigate('/dashboard')
            }
        } catch (error) {
            console.error('Failed to submit feedback:', error)
        }
    }

    const handleCloseBadge = () => {
        setRecentlyUnlocked(null)
        navigate('/dashboard')
    }

    if (recentlyUnlocked) {
        return (
            <BadgeUnlockedScreen
                badge={recentlyUnlocked}
                onClose={handleCloseBadge}
            />
        )
    }
    if (!showForm) {
        return (
            <div className="min-h-screen bg-[var(--neutral-lightest)]">
                <PostSessionTopNav />
                <SessionCompletedScreen
                    sessionId={sessionId}
                    partnerName={partnerName}
                    partnerAvatar={partnerAvatar}
                    onRateNow={handleRateNow}
                    onSkip={handleSkip}
                />
                <PostSessionFooter />
            </div>
        )
    }
    return (
        <div className="min-h-screen bg-[var(--neutral-lightest)]">
            <PostSessionTopNav />
            <PostSessionFeedbackLayout
                partnerName={partnerName}
                partnerAvatar={partnerAvatar}
                role={role}
                onSubmit={(data) =>
                    handleSubmitFeedback({
                        rating: data.rating,
                        comment: data.comment,
                    } as FeedbackFormData)
                }
                onCancel={handleSkip}
                isSubmitting={submitFeedbackMutation.isPending}
            />
            <PostSessionFooter />
        </div>
    )
}
