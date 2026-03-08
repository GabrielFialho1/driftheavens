'use client'

import { useNotifications } from '@/contexts/NotificationContext'
import { Notification } from '@/components/Notification'

export function NotificationContainer() {
  const { notifications, removeNotification } = useNotifications()

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          id={notification.id}
          type={notification.type}
          title={notification.title}
          message={notification.message}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))}
    </div>
  )
}
