import { observer } from 'mobx-react'
import { CommentInput } from '@/components'
import styles from './styles.less'

const Comment = ({ store }) => {
  return (
    <div>
      <CommentInput
        value={store.commentValue}
        onChange={store.setCommentValue}
        onSubmit={store.submitComment}
      />
    </div>
  )
}

export default observer(Comment)
