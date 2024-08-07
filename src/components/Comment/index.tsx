import { emoji } from '@/utils'
import styles from './styles.less'
import { Avatar, Button, Image } from 'antd'
import { config } from '@/config'
import moment from 'moment'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react'

const parseContent = (content: string) => {
  const imgList: any[] = []

  // 1. 解析图片集
  const imgReg = /!\[(.*?)\]\((.*?)\)/g
  const imgMatch = content.match(imgReg)
  if (imgMatch) {
    const roundBracketRegex = /\(([^()]*)\)/g
    const squareBracketRegex = /\[([^[\]]*)\]/g
    imgMatch.map(item => {
      const name = item.match(squareBracketRegex)
      const url = item.match(roundBracketRegex)
      imgList.push({
        name: name[0].replace(/\[|\]/g, ''),
        // @ts-ignore
        url: url[0].replace(/\(|\)/g, '').resource()
      })
    })
    content = content.replace(imgReg, '')
  }
  // 2. 解析emoji
  const emojiReg = /\[([^\]]*)\]/g
  const emojiMatch = content.match(emojiReg)
  if (emojiMatch) {
    emojiMatch.map(item => {
      const currentEmoji = emoji.find(
        e => e.title === item.replace('[', '').replace(']', '')
      )?.emoji
      if (currentEmoji) {
        content = content.replace(item, currentEmoji)
      }
    })
  }
  return [content, imgList]
}

const Comment = ({ comment }) => {
  console.log(comment)
  const [content, imgList] = parseContent(comment.content)
  return (
    <div className={styles.comment}>
      <div className={styles.top}>
        <div className={styles.user}>
          <Avatar src={comment.publisher?.avatar?.resource()} shape="square">
            <Avatar src={config.defaultAvatar} shape="square" />
          </Avatar>

          <div className={styles.userInfo}>
            <div className={styles.name}>{comment.publisher?.nickname}</div>
            <div className={styles.subtitle}>
              <div className={styles.time}>{moment(comment.createdAt).format('YYYY-MM-DD')}</div>
              <div>{comment.region}</div>
            </div>
          </div>
        </div>
        <Button size="small" type="primary" ghost>
          回复
        </Button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>{content}</div>
        {/* 图片预览 */}
        <div className={styles.imgList}>
          {imgList.length > 0 &&
            (imgList as any).map((img, index) => {
              if (index > 3) return null
              return (
                <img
                  src={img.url}
                  title={img.name}
                  className={cls(styles.img, {
                    [styles.darkImg]: globalStore.isDark
                  })}
                />
              )
            })}
        </div>
      </div>
    </div>
  )
}

export default observer(Comment)
