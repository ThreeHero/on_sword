import { useState } from 'react'
import CommentInput from '../CommentInput'
import { Modal } from 'antd'
const Reply = ({ open, onCancel, onSubmit }) => {
  const [value, setValue] = useState('')
  return (
    <Modal open={open} onCancel={onCancel} footer={null} title="回复" destroyOnClose>
      <CommentInput
        value={value}
        onChange={setValue}
        onSubmit={() => {
          onSubmit(value)
          setValue('')
        }}
      />
    </Modal>
  )
}

export default Reply
