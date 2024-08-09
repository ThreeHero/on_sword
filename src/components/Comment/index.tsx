import { http, parseContent } from '@/utils'
import styles from './styles.less'
import { Avatar, Button, Divider, Image, message } from 'antd'
import { config } from '@/config'
import moment from 'moment'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react'
import { FC, useEffect, useState } from 'react'
import ImagePreview from '../ImagePreview'
import Reply from './Reply'

interface IProps {
  comment: any
  callback?: () => void
  type: string
  isRoot?: boolean
}

const Comment: FC<IProps> = ({ comment, type, callback, isRoot = true }) => {
  const [content, imgList] = parseContent(comment.content)

  const [loadMore, setLoadMore] = useState(false)
  const [childCommentList, setChildCommentList] = useState([])

  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)

  const [selectedImgList, setSelectedImgList] = useState([])
  const [imgPreview, setImgPreview] = useState(false)

  const [replyOpen, setReplyOpen] = useState(false)

  const handleSubmit = async value => {
    await http.post('/comments', {
      articleId: comment.articleId,
      content: value,
      type,
      parentId: comment.id
    })
    setReplyOpen(false)
    message.success('回复成功')
    !comment.childCommentCount && isRoot && callback?.()
    isRoot ? loadData() : callback?.()
  }

  const loadData = async () => {
    const res = await http.get('/comments/list', {
      params: {
        page: 1,
        pageSize,
        type,
        articleId: comment.articleId,
        rootId: comment.id
      }
    })
    setChildCommentList(res.records)
    setTotal(res.total)
  }

  useEffect(() => {
    if (loadMore) {
      loadData()
    }
  }, [loadMore, pageSize])

  return (
    <div className={styles.comment} key={comment.id}>
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
        <Button
          size="small"
          type="primary"
          ghost
          onClick={() => {
            setReplyOpen(true)
          }}
        >
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
                  key={img.url}
                  title={img.name}
                  className={cls(styles.img, {
                    [styles.darkImg]: globalStore.isDark
                  })}
                  onClick={() => {
                    // @ts-ignore
                    setSelectedImgList(imgList)
                    setImgPreview(true)
                  }}
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
            <>
              {childCommentList.map(childComment => {
                return (
                  <Comment
                    key={childComment.id}
                    comment={childComment}
                    callback={loadData}
                    type={type}
                    isRoot={false}
                  />
                )
              })}
              {total > pageSize && (
                <Divider plain>
                  <span
                    style={{ cursor: 'pointer', userSelect: 'none' }}
                    onClick={() => setPageSize(p => p + 5)}
                  >
                    查看更多
                  </span>
                </Divider>
              )}
            </>
          )}
        </div>
      )}
      <ImagePreview
        imgList={selectedImgList}
        visible={imgPreview}
        onCancel={() => setImgPreview(false)}
      />
      <Reply
        open={replyOpen}
        onCancel={() => {
          setReplyOpen(false)
        }}
        onSubmit={handleSubmit}
      />
    </div>
  )
}

export default observer(Comment)
