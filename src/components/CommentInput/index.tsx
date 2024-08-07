import { config } from '@/config'
import styles from './styles.less'
import { PictureOutlined, SmileOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import cls from 'classnames'
import { Button, Upload } from 'antd'
import { emoji } from '@/utils'

const CommentInput = ({ value = '', onChange, onSubmit }) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const ref = useRef()

  const addEmoji = emojiItem => {
    const textarea: any = ref.current
    if (textarea) {
      const emojiValue = `[${emojiItem.title}]`
      const start = textarea.selectionStart
      onChange(value.slice(0, start) + emojiValue + value.slice(start))

      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start + emojiValue.length
        textarea.selectionEnd = start + emojiValue.length
      }, 0)
    }
  }

  const handleUpload = file => {
    const blob = new Blob(file)
    console.log(file)
    return false
  }

  return (
    <div className={styles.commentInput}>
      <textarea
        ref={ref}
        placeholder={config.commentPlaceholder}
        className={cls(styles.textarea, {
          [styles.focus]: isEmojiOpen
        })}
        value={value}
        onChange={e => onChange(e.target.value)}
      />
      {isEmojiOpen && (
        <div className={styles.emoji}>
          {emoji.map(e => {
            if (e.hidden) return null
            return (
              <div
                key={e.id}
                className={styles.emojiItem}
                data-title={e.title}
                onClick={() => addEmoji(e)}
              >
                {e.emoji}
              </div>
            )
          })}
        </div>
      )}
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
          todo 上传文件解析
          <Upload
            maxCount={1}
            beforeUpload={handleUpload}
            showUploadList={false}
            fileList={[]}
            action={''}
          >
            <PictureOutlined className={styles.icon} />
          </Upload>
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
