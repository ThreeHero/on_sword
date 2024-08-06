import { FC, useState } from 'react'
import styles from './styles.less'
import { detectDeviceType } from '@/utils/base'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react-lite'
import { Input, message, Modal, Tag, Tooltip } from 'antd'
import { useNavigate } from 'react-router'
import Icon from '../Icon'

interface IProps {
  article: any
  index: number
}

function removeMarkdownSymbols(text: string) {
  if (!text) return
  // 正则表达式匹配Markdown中的特殊符号和删除线
  const regex = /(```|`|[*_#\-\[\]()>~\|\\])/g
  const regexDeleteLine = /---\n?.*\n?---/g

  // 先移除删除线及其内容
  let result = text.replace(regexDeleteLine, '')

  // 再移除其他特殊符号
  result = result.replace(regex, '')

  return result
}

const Article: FC<IProps> = ({ article, index }) => {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => {
    // 1. 私密类型
    // @ts-ignore
    if (globalStore.currentUser?.id !== article.publisher && article.accessType === 3) {
      return message.error('访问失败，该文章为私密文章')
    }
    // 2. 密码访问
    // @ts-ignore
    if (globalStore.currentUser?.id !== article.publisher && article.accessType === 2) {
      setPasswordOpen(true)
      return
    }
    // 3. 登录
    if (!globalStore.currentUser && article.accessType === 1) {
      return message.error('访问失败，该文章需要登录后访问')
    }
    navigate(`/article/${article.id}`)
  }
  return (
    <div
      className={cls(styles.article, {
        [styles.odd]: index % 2 === 1
      })}
      onClick={handleClick}
    >
      <div className={styles.articleInfo}>
        <div className={styles.container}>
          <div className={styles.top}>
            <div className={styles.publishInfo}>
              <div>
                <span>发布于</span>
                {article.createdAt}
              </div>
              <div>
                <span>发布人</span>
                {article.userInfo?.nickname ?? '未知'}
              </div>
            </div>
            <Tooltip title={article.title} arrow={false}>
              <div className={styles.title}>{article.title}</div>
            </Tooltip>
            <div className={styles.info}>
              <div>{article.viewCount}热度</div>
              <div>{article.commentCount}评论</div>
              <div>{article.likeCount}点赞</div>
              {!!article.isLike && (
                <Tag color="processing" bordered={false} style={{ marginRight: 0 }}>
                  已赞
                </Tag>
              )}
              {!!article.isRecommend && (
                <Tag color="warning" bordered={false}>
                  推荐
                </Tag>
              )}
            </div>
            <div className={styles.content}>
              {article.accessType === 2 ? '密码保护' : removeMarkdownSymbols(article.content)}
            </div>
          </div>
          <div className={styles.bottom}>
            {article.tagList?.map(tag => {
              return (
                <div key={tag.id} className={styles.tag}>
                  {tag.name}
                </div>
              )
            })}
          </div>
        </div>
      </div>
      <div className={styles.coverBox}>
        <img
          className={cls(styles.cover, {
            [styles.darkImg]: globalStore.isDark
          })}
          src={article.cover?.resource()}
        />
      </div>

      {passwordOpen && (
        <Modal
          open={passwordOpen}
          title="访问密码"
          width={300}
          onCancel={e => {
            e.stopPropagation()
            setPasswordOpen(false)
          }}
          footer={null}
          closable={false}
          maskClosable
          destroyOnClose
        >
          <Input.Password
            placeholder="输入密码，回车确认"
            onPressEnter={e => {
              // @ts-ignore
              if (e.target.value === article.password) {
                navigate(`/article/${article.id}`)
              } else {
                message.error('密码错误')
              }
            }}
          />
        </Modal>
      )}
    </div>
  )
}

export default observer(Article)
