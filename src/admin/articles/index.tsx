import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { Input } from 'antd'

const Index = () => {
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 140,
      search: {}
    },
    {
      title: '发布人',
      name: 'userInfo',
      width: 140,
      render(v) {
        return v?.nickname
      }
    },
    {
      title: '发布时间',
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
      <ProTable
        api="articles"
        columns={columns}
        actions={false}
        contextMenus={[]}
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
      />
    </Page>
  )
}

export default observer(Index)
