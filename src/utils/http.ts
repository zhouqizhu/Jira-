// qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
import qs from 'qs'
import { useCallback } from 'react'
import * as auth from '../auth-provider'
import { useAuth } from '../context/auth-context'

const apiUrl = process.env.REACT_APP_API_URL

interface Config extends RequestInit {
    token?: string
    data?: object
}

// 判断是否登录，并返回信息
export const http = async (
    endpoint: string,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    { data, token, headers, ...customConfig }: Config = {}
) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : '',
        },
        ...customConfig,
    }

    if (config.method.toUpperCase() === 'GET') {
        // eslint-disable-next-line no-param-reassign
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    // axios 和 fetch 的表现不一样，axios可以直接在返回状态不为2xx的时候抛出异常
    return window
        .fetch(`${apiUrl}/${endpoint}`, config)
        .then(async (response) => {
            if (response.status === 401) {
                await auth.logout()
                window.location.reload()
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject({ message: '请重新登录' })
            }
            // eslint-disable-next-line @typescript-eslint/no-shadow
            const data = await response.json()
            if (response.ok) {
                return data
            }
            return Promise.reject(data)
        })
}

export const useHttp = () => {
    const { user } = useAuth()
    return useCallback(
        (...[endpoint, config]: Parameters<typeof http>) =>
            http(endpoint, { ...config, token: user?.token }),
        [user?.token]
    )
}
