import { config } from '@/config'
import styles from './styles.less'
import { PictureOutlined, SmileOutlined } from '@ant-design/icons'
import { useState } from 'react'
import cls from 'classnames'
import { Button } from 'antd'

const CommentInput = ({ value = '', onChange, onSubmit }) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  return (
    <div className={styles.commentInput}>
      <textarea
        placeholder={config.commentPlaceholder}
        className={cls(styles.textarea, {
          [styles.focus]: isEmojiOpen
        })}
        value={value}
        onChange={e => onChange(e.target.value)}
      />

      <div
        className={cls(styles.toolBar, {
          [styles.focusTool]: isEmojiOpen
        })}
      >
        <div className={styles.tool}>
          <SmileOutlined
            className={cls(styles.icon, { [styles.active]: isEmojiOpen })}
            onClick={() => setIsEmojiOpen(!isEmojiOpen)}
          />
          <PictureOutlined className={styles.icon} />
        </div>
        <Button
          className={styles.submit}
          type="primary"
          size="small"
          ghost
          onClick={onSubmit}
          disabled={!value.length}
        >
          提交
        </Button>
      </div>
    </div>
  )
}

export default CommentInput
