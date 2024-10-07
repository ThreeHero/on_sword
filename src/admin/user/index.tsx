import { message, Modal, Select, Tag } from 'antd'
import { Page, ProTable } from '../components'
import { http } from '@/utils'
import globalStore from '@/layout/store'
import { useRef } from 'react'
import { observer } from 'mobx-react'

const TypeTag = observer(({ value, record }) => {
  const user = globalStore.currentUser
  const { label, color } = globalStore.getDictValue({
    dict: 'userIdentity',
    value
  })
  return (
    <>
      <Tag color={color} style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})` }}>
        {label}
      </Tag>
      {user.id === record.id && (
        <Tag color={color} style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})` }}>
          我
        </Tag>
      )}
    </>
  )
})

function Index() {
  const ref = useRef<any>()
  const columns = [
    {
      title: '账号',
      name: 'account',
      width: 100,
      search: {}
    },
    {
      title: '昵称',
      name: 'nickname',
      width: 150,
      search: {}
    },
    {
      title: '身份',
      name: 'identity',
      width: 160,

      search: {
        options: globalStore.getDictItem('userIdentity')
      },
      render: (val, r) => <TypeTag value={val} record={r} />
    },
    {
      title: '邮箱',
      name: 'email',
      width: 160,
      search: {}
    },
    {
      title: '状态',
      name: 'status',
      width: 120,
      search: {
        options: globalStore.getDictItem('userStatus')
      },
      render: val => {
        const label = globalStore.getDictValue({
          dict: 'userStatus',
          value: val,
          findField: 'label'
        })
        return label
      }
    },
    {
      title: '创建时间',
      name: 'createdAt',
      width: 180,
      search: {
        type: 'dateRange',
        name: 'createdRange'
      }
    },
    {
      title: '最后修改时间',
      name: 'updatedAt',
      width: 180,
      search: {
        type: 'dateRange',
        name: 'updatedRange'
      }
    }
  ]

  const setIdentity = async data => {
    const user = globalStore.currentUser
    if (data.id === user.id) {
      return message.error('不能操作自己')
    }
    let identity = data.identity
    const typeList = globalStore.getDictItem('userIdentity')
    if (identity <= user.identity || user.identity >= 0) {
      return message.error('权限不足')
    }

    Modal.confirm({
      title: '设置为...',
      content: (
        <Select
          options={typeList
            .filter(item => item.value > user.identity || user.identity === -100)
            .map(item => {
              if (item.value === user.identity) {
                return {
                  value: item.value,
                  label: item.label,
                  disabled: true
                }
              }
              return {
                value: item.value,
                label: item.label
              }
            })}
          style={{ width: '100%' }}
          defaultValue={identity}
          onChange={v => (identity = v)}
        />
      ),
      onOk: async () => {
        await http.put('/users/identity', null, {
          params: {
            id: data.id,
            identity
          }
        })
        ref.current.search()
        message.success('设置成功')
      }
    })
  }
  const toggleStatus = async data => {
    const user = globalStore.currentUser
    if (data.id === user.id) {
      return message.error('不能操作自己')
    }
    if (data.identity <= user.identity || user.identity >= 0) {
      return message.error('权限不足')
    }
    Modal.confirm({
      title: `确定${data.status ? '冻结' : '恢复'}用户${data.nickname}？`,
      onOk: async () => {
        await http.put('/users/status', null, {
          params: {
            id: data.id,
            status: +!data.status
          }
        })
        ref.current.search()
        message.success((data.status ? '冻结' : '恢复') + '成功')
      }
    })
  }

  return (
    <Page>
      <ProTable
        ref={ref}
        api="users"
        columns={columns}
        actions={false}
        searchTransform={values => {
          const timeFieldList = ['createdRange', 'updatedRange']
          let res = { ...values }
          timeFieldList.map(key => {
            if (Array.isArray(values[key])) {
              res[key] = values[key].map(item => item.format('YYYY-MM-DD')).join(',')
            }
          })
          return res
        }}
        contextMenus={[
          { label: '设置身份', key: 'setIdentity' },
          { label: '切换状态', key: 'toggleStatus' }
        ]}
        contextClickMap={{
          setIdentity,
          toggleStatus
        }}
      />
    </Page>
  )
}

export default observer(Index)
