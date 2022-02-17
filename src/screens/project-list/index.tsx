import React, { useEffect, useState } from 'react'
import { cleanObject, useDebounce, useMount } from '../../utils/index'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useHttp } from '../../utils/http'

export function ProjectListScreen() {
    const [param, setParam] = useState({
        name: '',
        personId: '',
    })
    const [list, setList] = useState([])
    const [users, setUsers] = useState([])

    const debouncedParam = useDebounce(param, 2000)

    const client = useHttp()

    useEffect(() => {
        client('projects', { data: cleanObject(debouncedParam) }).then(setList)
    }, [debouncedParam])

    useMount(() => {
        client('users').then(setUsers)
    })

    return (
        <div>
            <SearchPanel users={users} param={param} setParam={setParam} />
            <List users={users} list={list} />
        </div>
    )
}
