// 真实环境中使用firebase等第三方auth服务的话，本文件不需要开发
import { User } from './screens/project-list/search-panel'

const apiUrl = process.env.REACT_APP_API_URL
const localStorageKey = '__auth_provider_token__'

export const getToken = () => window.localStorage.getItem(localStorageKey)

export const handleUserResponse = ({ user }: { user: User }) => {
    window.localStorage.setItem(localStorageKey, user.token || '')
    return user
}

// 发送登录请求，并返回登录信息
export const login = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }
        return Promise.reject(await response.json())
    })
}

export const register = (data: { username: string; password: string }) => {
    return fetch(`${apiUrl}/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    }).then(async (response) => {
        if (response.ok) {
            return handleUserResponse(await response.json())
        }
        return Promise.reject(await response.json())
    })
}

export const logout = async () =>
    window.localStorage.removeItem(localStorageKey)
