import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { options } from '@/utils'
import { message } from 'antd'
import { useNavigate } from 'react-router'

const Index = () => {
  const navigate = useNavigate()
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 140,
      search: {
        name: 'keyword'
      }
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
      title: '访问权限',
      name: 'accessType',
      width: 140,
      render(v) {
        return options.accessType.find(item => item.value === v)?.label || '-'
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
  const showComment = async ({ commentCount, id, title }) => {
    if (!(commentCount > 0)) {
      return message.warning('该条数据暂无评论')
    }

    navigate(`/admin/comments`, {
      state: {
        articleId: id,
        type: 'ARTICLE',
        title: title
      }
    })
  }

  return (
    <Page>
      <ProTable
        api="articles"
        params={{
          isMine: false
        }}
        columns={columns}
        actions={false}
        contextMenus={[
          { label: '查看文章', key: 'show' },
          { label: '查看评论', key: 'showComment' }
        ]}
        contextClickMap={{
          showComment
        }}
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
