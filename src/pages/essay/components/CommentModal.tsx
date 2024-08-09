import { Modal, List } from 'antd'
import { observer } from 'mobx-react'
import { useEffect } from 'react'
import { CommentInput, Comment } from '@/components'
import globalStore from '@/layout/store'
import ReplyModal from './ReplyModal'
import { config } from '@/config'
import styles from './styles.less'

const CommentModal = ({ store }) => {
  useEffect(() => {
    if ((store.commentModal, store.currentShowEssayId)) {
      store.getRootCommentList()
    }
  }, [store.commentModal, store.currentShowEssayId])
  return (
    <Modal
      open={store.commentModal}
      width={'80vw'}
      title="评论"
      maskClosable={false}
      closable={false}
      className={styles.commentModal}
      destroyOnClose
      onCancel={() => {
        store.commentModal = false
        store.currentShowEssayId = null
      }}
    >
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
          return (
            <Comment key={(item as any).id} comment={item} onReply={store.reply} type="ESSAY" />
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
      <ReplyModal store={store} />
    </Modal>
  )
}

export default observer(CommentModal)
