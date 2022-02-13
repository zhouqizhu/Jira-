import React, { useEffect, useState } from 'react'
// qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
import * as qs from 'qs'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import { SearchPanel } from './search-panel'
import { List } from './list'

const apiUrl = process.env.REACT_APP_API_URL
export function ProjectListScreen() {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const debouncedParam = useDebounce(param, 2000)

    useEffect(() => {
        fetch(
            `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
        ).then(async (response) => {
            if (response.ok) {
                setList(await response.json())
            }
        })
    }, [debouncedParam])

    useMount(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    })

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    )
}
