import { CommentInput } from '@/components'
import { Modal } from 'antd'
import { observer } from 'mobx-react-lite'

const ReplyModal = ({ store }) => {
  return (
    <Modal
      open={store.replyVisible}
      onCancel={() => (store.replyVisible = false)}
      footer={null}
      title="回复"
      destroyOnClose
    >
      <CommentInput
        value={store.replyValue}
        onChange={store.setReplyValue}
        onSubmit={store.replyComment}
      />
    </Modal>
  )
}

export default observer(ReplyModal)
