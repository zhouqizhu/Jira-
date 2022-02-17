import React from 'react'
import { useAuth } from './context/auth-context'
import { ProjectListScreen } from './screens/project-list'

export function AuthenticatedApp() {
    const { logout } = useAuth()
    return (
        <div>
            <button type="button" onClick={logout}>
                登出
            </button>
            <ProjectListScreen />
        </div>
    )
}
