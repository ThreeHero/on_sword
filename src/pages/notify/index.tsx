import { observer } from 'mobx-react'
import Store from './store'
import { useEffect, useMemo } from 'react'
import { Button, List, Popconfirm, Popover } from 'antd'
import styles from './styles.less'
import globalStore from '@/layout/store'
import { useNavigate } from 'react-router'

// TODO : 分页 删除

const Index = () => {
  const store = useMemo(() => new Store(), [])
  const navigate = useNavigate()

  useEffect(() => {
    store.read()
    globalStore.getUnreadNotifyCount()
  }, [])

  return (
    <div className={styles.container}>
      <div className={styles.placeholder} />
      <List
        dataSource={store.list}
        rowKey={'id'}
        pagination={{
          align: 'center',
          current: store.page,
          pageSize: store.pageSize,
          total: store.total,
          // showSizeChanger: true,
          showTotal: total => `共 ${total} 条`,
          onChange: store.changePage
        }}
        renderItem={item => {
          const typeMap = {
            USER: '我',
            COMMENT: '我的评论',
            ESSAY: '我的随笔',
            ARTICLE: '我的文章'
          }

          return (
            <List.Item
              className={styles.item}
              onClick={() => {
                if (item.articleType === 'ARTICLE') {
                  navigate('/article/' + item.jumpUrl)
                }
              }}
            >
              <div className={styles.itemContent}>
                <span
                  className={styles.nickname}
                  onClick={e => {
                    e.stopPropagation()
                    navigate('/user/' + item.userId)
                  }}
                >
                  {item.userInfo.nickname}
                </span>
                <span>
                  {globalStore.getDictValue({
                    dict: 'noticeType',
                    value: item.type,
                    findField: 'label'
                  })}
                  了
                </span>
                <span>{typeMap[item.articleType]}</span>
              </div>
              <Popconfirm title="确定删除？" onConfirm={() => store.remove(item.id)}>
                <Button type="link" danger>
                  删除
                </Button>
              </Popconfirm>
            </List.Item>
          )
        }}
      ></List>
    </div>
  )
}

export default observer(Index)
