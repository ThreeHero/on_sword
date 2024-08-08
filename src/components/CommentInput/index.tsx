import { config } from '@/config'
import styles from './styles.less'
import { PictureOutlined, SmileOutlined } from '@ant-design/icons'
import { useRef, useState } from 'react'
import cls from 'classnames'
import { Button, message, Upload } from 'antd'
import { emoji, http } from '@/utils'
import globalStore from '@/layout/store'

const CommentInput = ({ value = '', onChange, onSubmit }) => {
  const [isEmojiOpen, setIsEmojiOpen] = useState(false)
  const ref = useRef()

  const insert = (v: string) => {
    const textarea: any = ref.current
    if (textarea) {
      const start = textarea.selectionStart
      onChange(value.slice(0, start) + v + value.slice(start))

      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start + v.length
        textarea.selectionEnd = start + v.length
      }, 0)
    }
  }

  const addEmoji = emojiItem => {
    const emojiValue = `[${emojiItem.title}]`
    insert(emojiValue)
  }

  const handleUpload = async ({ file }) => {
    if (!['jpg', 'jpeg', 'png'].includes(file.name.split('.').pop())) {
      return message.error('请上传图片')
    }
    const name = file.name
    const formData = new FormData()
    formData.append('file', file)
    formData.append('path', globalStore.currentUser.account + '/comment')
    const url = await http.post('/file/upload', formData)
    const fileValue = `![${name}](${url})`
    insert(fileValue)
  }

  const handleEnter = e => {
    if (e.code === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault()
        value.length > 0 && onSubmit?.()
      }
    }
  }

  /**
   * 粘贴图片
   * @param e
   * @returns
   */
  const handlePaste = e => {
    const items = e.clipboardData?.items
    if (!items) return null
    for (let i = 0; i < items.length; i++) {
      if (items[i].kind === 'file') {
        const file = items[i].getAsFile()
        e.preventDefault()
        if (file && file.type.startsWith('image/')) {
          handleUpload({ file })
          // 在这里可以处理图片文件，例如上传到服务器
        } else {
          return message.error('只能粘贴图片')
        }
      }
    }
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
        onKeyDown={handleEnter}
        onPaste={handlePaste}
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
          <Upload
            accept=".jpg,.jpeg,.png"
            maxCount={1}
            beforeUpload={() => false}
            showUploadList={false}
            fileList={[]}
            onChange={handleUpload}
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
