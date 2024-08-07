import { emoji, http } from '@/utils'
import styles from './styles.less'
import { Avatar, Button, Divider, Image } from 'antd'
import { config } from '@/config'
import moment from 'moment'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

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

const Comment = ({ comment, onReply, type }) => {
  const [loadMore, setLoadMore] = useState(false)
  const [content, imgList] = parseContent(comment.content)
  const [childCommentList, setChildCommentList] = useState([])
  const [page, setPage] = useState(1)
  useEffect(() => {
    if (loadMore) {
      http
        .get('/comments/list', {
          params: {
            page,
            pageSize: 5,
            type,
            articleId: comment.articleId,
            rootId: comment.id
          }
        })
        .then(res => {
          setChildCommentList(res.records)
        })
    }
  }, [loadMore])

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
        <Button size="small" type="primary" ghost onClick={() => onReply(comment)}>
          回复
        </Button>
      </div>
      <div className={styles.bottom}>
        <div className={styles.content}>
          {comment.rootId !== comment.parentId && (
            <span className={styles.replyName}>@{comment.parentComment.publisher?.nickname}: </span>
          )}
          {content}
        </div>
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
      {comment.childCommentCount > 0 && (
        <div className={styles.more}>
          {!loadMore ? (
            <Divider plain>
              <span
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => setLoadMore(true)}
              >
                查看更多
              </span>
            </Divider>
          ) : (
            childCommentList.map(childComment => {
              return (
                <Comment
                  key={childComment.id}
                  comment={childComment}
                  onReply={() => {
                    onReply(childComment)
                    setLoadMore(false)
                  }}
                  type="type"
                />
              )
            })
          )}
        </div>
      )}
    </div>
  )
}

export default observer(Comment)
