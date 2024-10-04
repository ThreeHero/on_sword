import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { Button, Input, InputNumber } from 'antd'

const Index = () => {
  const columns = [
    {
      title: '排序值',
      name: 'sort',
      width: 80,
      align: 'center',
      model: {
        item: {
          initialValue: 0,
          rules: [
            { required: true, message: '请输入排序值' },
            { pattern: /^-?[0-9]*$/, message: '请输入数字' }
          ]
        }
      }
    },
    {
      title: '分类名',
      dataIndex: 'name',
      width: 140,
      search: {},
      model: {
        item: {
          rules: [{ required: true, message: '请输入分类名' }]
        }
      }
    },
    {
      title: '描述',
      dataIndex: 'description',
      width: 200,
      model: {
        render: () => <Input.TextArea placeholder="请输入描述" />
      }
    },
    {
      title: '标签数量',
      dataIndex: 'tagCount',
      width: 100
    },
    {
      title: '文章数量',
      dataIndex: 'articleCount',
      width: 100
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
      <ProTable
        api="classifications"
        columns={columns}
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
