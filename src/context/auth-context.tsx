import React, { ReactNode, useState } from 'react'
import * as auth from '../auth-provider'
import { User } from '../screens/project-list/search-panel'
import { useMount } from '../utils'
import { http } from '../utils/http'

interface AuthForm {
    username: string
    password: string
}

// 启动时初始化，保持登陆状态
const bootstrapUser = async () => {
    let user = null
    const token = auth.getToken()
    if (token) {
        const data = await http('me', { token })
        user = data.user
    }
    return user
}
const AuthContext = React.createContext<
    | {
          user: User | null
          register: (form: AuthForm) => Promise<void>
          login: (form: AuthForm) => Promise<void>
          logout: () => Promise<void>
      }
    | undefined
>(undefined)
AuthContext.displayName = 'AuthContext'

// 创建AuthProvider组件，接收value属性，传递给消费组件
export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null)

    const login = (form: AuthForm) => auth.login(form).then(setUser)
    const register = (form: AuthForm) => auth.register(form).then(setUser)
    const logout = () => auth.logout().then(() => setUser(null))

    useMount(() => {
        bootstrapUser().then(setUser)
    })

    return (
        <AuthContext.Provider
            // eslint-disable-next-line react/no-children-prop
            children={children}
            // eslint-disable-next-line react/jsx-no-constructed-context-values
            value={{ user, login, register, logout }}
        />
    )
}

export const useAuth = () => {
    const context = React.useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth必须在AuthProvider中使用')
    }
    return context
}
