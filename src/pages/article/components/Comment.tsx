import { observer } from 'mobx-react'
import { CommentInput, Comment } from '@/components'
import styles from './styles.less'
import { EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { List } from 'antd'
import globalStore from '@/layout/store'
import { config } from '@/config'

const Index = ({ store }) => {
  useEffect(() => {
    store.getRootCommentList()
  }, [])
  return (
    <div className={styles.comment}>
      <div className={styles.title}>
        <EditOutlined />
        评论
      </div>
      {globalStore.currentUser?.id && (
        <CommentInput
          value={store.commentValue}
          onChange={store.setCommentValue}
          onSubmit={() => store.submitComment()}
        />
      )}
      <List
        style={{ marginBottom: 80 }}
        dataSource={store.rootCommentList}
        renderItem={item => {
          return (
            <Comment
              key={(item as any).id}
              comment={item}
              callback={store.getRootCommentList}
              type="ARTICLE"
            />
          )
        }}
        locale={{
          emptyText: config.emptyText
        }}
        pagination={{
          hideOnSinglePage: true,
          current: store.commentPage,
          total: store.rootCommentTotal,
          pageSize: store.commentPageSize,
          showTotal: total => `共 ${total} 条`,
          onChange: (page, pageSize) => {
            store.commentPage = page
            store.getRootCommentList()
          }
        }}
      />
    </div>
  )
}

export default observer(Index)
