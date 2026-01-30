import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import {
  Dashboard,
  PointsAndBadges,
  SessionFeedback,
  SessionHistory,
  PreviewSessionCompleted,
  PreviewBadgeUnlocked,
  PreviewFeedbackForm,
  PreviewManageBadges,
  PreviewPointsManage,
} from './pages'

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="points-badges" element={<PointsAndBadges />} />
          <Route path="history" element={<SessionHistory />} />
          <Route path="preview/manage-badges" element={<PreviewManageBadges />} />
          <Route path="preview/manage-points" element={<PreviewPointsManage />} />
        </Route>

        <Route path="/session/feedback" element={<SessionFeedback />} />
        <Route path="/preview/session-completed" element={<PreviewSessionCompleted />} />
        <Route path="/preview/badge-unlocked" element={<PreviewBadgeUnlocked />} />
        <Route path="/preview/feedback-form" element={<PreviewFeedbackForm />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
