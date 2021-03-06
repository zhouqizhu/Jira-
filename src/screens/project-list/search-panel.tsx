import { Input, Select } from 'antd'
import React from 'react'

export interface User {
    id: string
    name: string
    email: string
    title: string
    organization: string
    token: string
}

interface SearchPanelProps {
    users: User[]
    param: {
        name: string
        personId: string
    }
    setParam: (param: SearchPanelProps['param']) => void
}

export function SearchPanel({ users, param, setParam }: SearchPanelProps) {
    return (
        <form>
            <div>
                <Input
                    type="text"
                    value={param.name}
                    onChange={(evt) =>
                        setParam({
                            ...param,
                            name: evt.target.value,
                        })
                    }
                />
                <Select
                    value={param.personId}
                    onChange={(value) =>
                        setParam({
                            ...param,
                            personId: value,
                        })
                    }
                >
                    <Select.Option value="">负责人</Select.Option>
                    {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.name}
                        </option>
                    ))}
                </Select>
            </div>
        </form>
    )
}
