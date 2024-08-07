import { observer } from 'mobx-react'
import { CommentInput } from '@/components'
import styles from './styles.less'
import { EditOutlined } from '@ant-design/icons'

const Comment = ({ store }) => {
  return (
    <div className={styles.comment}>
      <div className={styles.title}>
        <EditOutlined />
        评论
      </div>
      <CommentInput
        value={store.commentValue}
        onChange={store.setCommentValue}
        onSubmit={store.submitComment}
      />
    </div>
  )
}

export default observer(Comment)
