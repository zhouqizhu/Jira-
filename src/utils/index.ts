import { useEffect, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const cleanObject = (object: { [key: string]: unknown }) => {
    const result = { ...object }
    Object.keys(result).forEach((key) => {
        const value = result[key]
        // 如果为null或undefined删除
        if (isFalsy(value)) {
            delete result[key]
        }
    })
    return result
}

// 封装useEffect
export const useMount = (callback: () => void) => {
    useEffect(() => {
        callback()
    }, [])
}

// 封装debounce hook
export const useDebounce = <V>(value: V, delay?: number) => {
    const [debounceValue, setDebounceValue] = useState(value)

    useEffect(() => {
        // value变化以后设置一个定时器
        const timeout = setTimeout(() => setDebounceValue(value), delay)
        // 上一个useEffect处理完以后再运行
        return () => clearTimeout(timeout)
    }, [value, delay])

    return debounceValue
}
