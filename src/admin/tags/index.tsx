import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { Input } from 'antd'
import { useEffect, useState } from 'react'
import { http } from '@/utils'

const Index = () => {
  const [classificationList, setClassificationList] = useState([])
  async function getClassificationList() {
    const res = await http.get('/classifications/list')
    setClassificationList(
      res.records?.map(item => ({
        ...item,
        label: item.name,
        value: item.id
      }))
    )
  }
  useEffect(() => {
    getClassificationList()
  }, [])

  const columns = [
    {
      title: '标签名',
      dataIndex: 'name',
      width: 140,
      search: {},
      model: {
        item: {
          rules: [{ required: true, message: '请输入标签名' }]
        }
      }
    },
    {
      title: '所属分类',
      dataIndex: 'clazz',
      width: 140,
      search: {
        name: 'classificationId',
        options: classificationList
      },
      model: {
        options: classificationList,
        name: 'classificationId',
        item: {
          rules: [{ required: true, message: '请选择所属分类' }]
        }
      },
      render(v) {
        return v?.name
      }
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
  console.log(classificationList)
  return (
    <Page>
      <ProTable
        api="tags"
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
