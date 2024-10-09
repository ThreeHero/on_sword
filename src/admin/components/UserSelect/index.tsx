import { http } from '@/utils'
import { Select } from 'antd'
import { debounce } from 'lodash-es'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'

interface IProps {
  onChange?: (value: any) => void
  value?: any
  title?: string
}

// TODO
const UserSelect: FC<IProps> = observer(({ onChange, value, title = '用户' }) => {
  const [options, setOptions] = useState([])
  const [loading, setLoading] = useState(false)

  const getUserList = async (name?: string) => {
    try {
      setLoading(true)
      const res = await http.get('/users/list', {
        params: { page: 1, pageSize: 10, nickname: name }
      })
      const userList = res.records.map(item => ({
        value: item.id,
        label: item.nickname
      }))
      setOptions(userList)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getUserList()
  }, [])

  const searchUser = debounce(async (value: string) => {
    if (!!value) getUserList(value)
  }, 300)

  return (
    <Select
      showSearch
      loading={loading}
      filterOption={false}
      options={options}
      allowClear
      placeholder={'请选择' + title}
      value={value}
      onSearch={searchUser}
      onChange={onChange}
    />
  )
})

export default UserSelect
