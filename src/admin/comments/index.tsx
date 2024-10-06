import { observer } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo } from 'react'
import { Button, Popconfirm, Space, Table, Tooltip, Typography } from 'antd'
import { useLocation, useNavigate } from 'react-router'
import { parseContent } from '@/utils'
import styles from './index.less'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { Page } from '../components'

const Comments = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    // 没有type 则返回
    if (!state?.type) {
      navigate(-1)
    }
  }, [state])

  const store = useMemo(() => new Store({ ...state, title: undefined }), [])

  const columns = [
    {
      title: '发布人',
      dataIndex: 'publisher',
      width: 140,

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
            <Typography.Text style={{ width: 140 }} ellipsis>
              {v}
            </Typography.Text>
          </Tooltip>
        )
      }
    },
    {
      title: '地区',
      dataIndex: 'region',
      width: 140
    },
    { title: '回复数量', dataIndex: 'childCommentCount', width: 100 },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      width: 200
    },
    {
      title: '操作',
      width: 140,
      render: (_, r: any) => {
        return (
          <Space size={0}>
            {r.childCommentCount > 0 && (
              <Button type="link" onClick={() => store.showMore(r.id, r.subPage)}>
                查看更多
              </Button>
            )}
            <Popconfirm title="确定删除？" onConfirm={() => store.remove(r.id)}>
              <Button type="link" danger>
                删除
              </Button>
            </Popconfirm>
          </Space>
        )
      }
    }
  ]

  return (
    <Page>
      <Table
        columns={columns}
        title={() => state.title}
        bordered
        rowKey={'id'}
        loading={store.loading}
        dataSource={store.dataSource}
        pagination={{
          current: store.page,
          pageSize: store.pageSize,
          total: store.total,
          // showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          onChange: store.changePage
        }}
      />
    </Page>
  )
}

export default observer(Comments)
