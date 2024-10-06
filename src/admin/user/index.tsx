import React from 'react'
import { Page, ProTable } from '../components'

function Index() {
  const columns = [
    {
      title: '账号',
      name: 'account',
      search: {}
    },
    {
      title: '昵称',
      name: 'nickname',
      search: {}
    },
    {
      title: '权限',
      name: 'identity',
      search: {}
    },
    {
      title: '邮箱',
      name: 'email',
      search: {}
    },
    {
      title: '状态',
      name: 'status',
      search: {}
    },
    {
      title: '创建时间',
      name: 'createdAt',
      width: 140,
      search: {
        type: 'dateRange',
        name: 'createdRange'
      }
    },
    {
      title: '最后修改时间',
      name: 'updatedAt',
      width: 140,
      search: {
        type: 'dateRange',
        name: 'updatedRange'
      }
    }
  ]
  return (
    <Page>
      <ProTable api="users" columns={columns} actions={false} contextMenus={[]} />
    </Page>
  )
}

export default Index
