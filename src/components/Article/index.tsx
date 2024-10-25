import { FC, useState } from 'react'
import styles from './styles.less'
import cls from 'classnames'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react'
import { Input, message, Modal, Tag, Tooltip } from 'antd'
import { useNavigate } from 'react-router'
import moment from 'moment'
import { detectDeviceType, md5 } from '@/utils'

interface IProps {
  article: any
  index: number
}

function removeMarkdownSymbols(text: string) {
  if (!text) return
  // 正则表达式匹配Markdown中的特殊符号和删除线
  const regex = /(```|`|[*_#\-\[\]()>~\|\\])/g
  const regex1 = /theme:.*\n/g
  const regex2 = /highlight:.*\n/g

  // 先移除删除线及其内容
  let result = text.replace(regex, '')
  result = result.replace(regex1, '')
  result = result.replace(regex2, '')

  return result
}

const Article: FC<IProps> = ({ article, index }) => {
  const [passwordOpen, setPasswordOpen] = useState(false)
  const navigate = useNavigate()
  const handleClick = () => {
    if (article.contentCount > 5000 && detectDeviceType() === 'mobile')
      return message.error('文章内容过长，请使用PC端查看')
    if (globalStore.currentUser?.id !== article.publisher && article.accessType === 3) {
      // 1. 私密类型
      // @ts-ignore
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
                {moment(article.createdAt).format('YYYY-MM-DD')}
              </div>
              <div>
                <span>发布人</span>
                {article.userInfo?.nickname ?? '未知'}
              </div>
              <Tag
                bordered={false}
                style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})`, marginRight: 0 }}
                color={globalStore.getDictValue({
                  by: 'value',
                  value: article.accessType,
                  dict: 'accessType',
                  findField: 'color'
                })}
              >
                {globalStore.getDictValue({
                  by: 'value',
                  value: article.accessType,
                  dict: 'accessType',
                  findField: 'label'
                })}
              </Tag>
            </div>
            <Tooltip title={article.title} arrow={false}>
              <div className={styles.title}>{article.title}</div>
            </Tooltip>
            <div className={styles.info}>
              <div>{article.viewCount}热度</div>
              <div>{article.commentCount}评论</div>
              <div>{article.likeCount}点赞</div>
              {!!article.isLike && (
                <Tag
                  color="processing"
                  bordered={false}
                  style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})`, marginRight: 0 }}
                >
                  已赞
                </Tag>
              )}
              {!!article.isCollect && (
                <Tag
                  color="error"
                  bordered={false}
                  style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})`, marginRight: 0 }}
                >
                  已收藏
                </Tag>
              )}
              {!!article.isRecommend && (
                <Tag
                  color="warning"
                  bordered={false}
                  style={{ filter: `brightness(${globalStore.isDark ? 0.5 : 1})`, marginRight: 0 }}
                >
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
              if (md5(e.target.value) === article.password) {
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
