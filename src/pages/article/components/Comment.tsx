import { observer } from 'mobx-react'
import { CommentInput, Comment } from '@/components'
import styles from './styles.less'
import { EditOutlined } from '@ant-design/icons'
import { useEffect } from 'react'
import { List } from 'antd'
import globalStore from '@/layout/store'

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
        dataSource={store.rootCommentList}
        renderItem={item => {
          return <Comment comment={item} />
        }}
      />
    </div>
  )
}

export default observer(Index)
