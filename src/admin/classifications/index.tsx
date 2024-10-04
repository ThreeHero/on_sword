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
        options: [
          { label: '到底是啥', value: 1 },
          { label: '到底是啥2', value: 2 }
        ]
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
