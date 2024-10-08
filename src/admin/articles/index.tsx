import { observer } from 'mobx-react'
import { ProTable, Page } from '../components'
import { message, Tag } from 'antd'
import { useNavigate } from 'react-router'
import globalStore from '@/layout/store'
import { UserSelect } from '@/admin/components'
import { useEffect, useRef, useState } from 'react'
import { http } from '@/utils'

const Index = () => {
  const [tags, setTags] = useState([])
  const [types, setTypes] = useState([])
  const ref = useRef<any>()
  useEffect(() => {
    http.get('/classifications/list').then(res => {
      setTypes(res.records?.map(item => ({ label: item.name, value: item.id })))
    })
  }, [])
  // TODO
  useEffect(() => {
    http.get('/tags/list', { params: { pageSize: 100 } }).then(res => {
      setTags(
        res.records?.map(item => ({
          label: item.name,
          value: item.id
        }))
      )
    })
  }, [])

  const navigate = useNavigate()
  const columns = [
    {
      title: '文章标题',
      dataIndex: 'title',
      width: 140,
      search: {
        title: '关键词',
        name: 'keyword'
      }
    },
    {
      title: '发布人',
      name: 'userInfo',
      width: 140,
      search: {
        name: 'publisherId',
        render(onChange) {
          return <UserSelect title="发布人" onChange={onChange} />
        }
      },
      render(v) {
        return v?.nickname
      }
    },
    {
      title: '所属分类',
      name: 'classifications',
      width: 100,
      search: {
        name: 'classificationId',
        options: types
      },
      render: v => v?.name ?? '-'
    },
    {
      title: '标签',
      name: 'tagList',
      width: 160,
      search: {
        name: 'tagId',
        options: tags
      },
      render: v => (
        <>
          {v?.map(item => (
            <Tag key={item.id} color="blue">
              {item.name}
            </Tag>
          ))}
        </>
      )
    },
    {
      title: '访问权限',
      name: 'accessType',
      width: 140,
      render(v) {
        return globalStore.getDictValue({
          dict: 'articleAccessType',
          value: v,
          findField: 'label'
        })
      }
    },
    {
      title: '推荐状态',
      name: 'isRecommend',
      width: 100,
      render: v => {
        return ['否', '是'][v]
      }
    },
    {
      title: '文章状态',
      name: 'status',
      width: 100,
      render: v => {
        return globalStore.getDictValue({
          dict: 'articleStatus',
          value: v,
          findField: 'label'
        })
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

  const showArticle = async data => {
    navigate(`/admin/articles/content`, {
      state: {
        id: data.id,
        title: data.title,
        content: data.content,
        status: data.status,
        isRecommend: data.isRecommend
      }
    })
  }

  return (
    <Page>
      <ProTable
        api="articles"
        ref={ref}
        params={{
          isMine: false
        }}
        columns={columns}
        actions={false}
        contextMenus={[
          { label: '查看文章', key: 'showArticle' },
          { label: '查看评论', key: 'showComment' }
        ]}
        contextClickMap={{
          showArticle,
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
