import { Page, ProTable, UserSelect } from '../components'
import { parseContent } from '@/utils'
import { message, Tooltip, Typography } from 'antd'
import styles from './styles.less'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { useNavigate } from 'react-router'
function Index() {
  const navigate = useNavigate()
  const columns = [
    {
      title: '发布人',
      name: 'publisher',
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
      title: '内容',
      dataIndex: 'content',
      width: 140,
      search: {},
      render: v => {
        const [content, imgList] = parseContent(v)

        return (
          <Tooltip
            title={
              <div className={styles.content}>
                {content}
                <div className={styles.imgList}>
                  {imgList.length > 0 &&
                    (imgList as any).map((img, index) => {
                      if (index > 3) return null
                      return (
                        <img
                          src={img.url}
                          key={img.url}
                          title={img.name}
                          className={cls(styles.img, {
                            [styles.darkImg]: globalStore.isDark
                          })}
                        />
                      )
                    })}
                </div>
              </div>
            }
          >
            <Typography.Text ellipsis copyable>
              {v}
            </Typography.Text>
          </Tooltip>
        )
      }
    },
    {
      title: '地区',
      name: 'region',
      width: 140
    },
    { title: '评论数量', name: 'childCommentCount', width: 100 },
    {
      title: '创建时间',
      name: 'createdAt',
      width: 140
    }
  ]

  const showComment = async ({ childCommentCount, id, content }) => {
    if (!(childCommentCount > 0)) {
      return message.warning('该条数据暂无评论')
    }

    navigate(`/admin/comments`, {
      state: {
        articleId: id,
        type: 'ESSAY',
        title: content
      }
    })
  }

  return (
    <Page>
      <ProTable
        api="essays"
        columns={columns}
        actions={false}
        contextMenus={[
          { label: '查看评论', key: 'showComment' },
          { label: '删除', key: 'DELETE', danger: true }
        ]}
        contextClickMap={{
          showComment
        }}
      />
    </Page>
  )
}

export default Index
