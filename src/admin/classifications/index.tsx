import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { Button } from 'antd'

const Index = () => {
  const columns = [
    {
      title: '分类名',
      dataIndex: 'name',
      search: {},
      model: {}
    },
    {
      title: '包含标签数量',
      dataIndex: 'tagCount',
      search: {
        type: 'dateRange'
      }
    },
    {
      title: '包含文章数量',
      dataIndex: 'articleCount',
      search: {
        options: [{ label: 1, value: 1 }]
      }
    }
  ]
  return (
    <Page>
      <ProTable api="classifications" columns={columns} />
    </Page>
  )
}

export default observer(Index)
