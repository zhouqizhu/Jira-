import React, { useEffect, useState } from 'react'
// qs 是一个增加了一些安全性的查询字符串解析和序列化字符串的库。
import qs from 'qs'
import { cleanObject } from '../../utils/index.js'
import { SearchPanel } from './search-panel.js'
import { List } from './list.js'

const apiUrl = process.env.REACT_APP_API_URL
export function ProjectListScreen() {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(param))}`).then(
            async (response) => {
                if (response.ok) {
                    setList(await response.json())
                }
            }
        )
    }, [param])

    useEffect(() => {
        fetch(`${apiUrl}/users`).then(async (response) => {
            if (response.ok) {
                setUsers(await response.json())
            }
        })
    }, [])

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    )
}
