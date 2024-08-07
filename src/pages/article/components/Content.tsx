import { MDEditor } from '@/components'
import { observer } from 'mobx-react'
import styles from './styles.less'
import { useTranscend, useMouseWheel } from '@/hooks'
import cls from 'classnames'
import { Avatar } from 'antd'
import { config } from '@/config'
import { useNavigate } from 'react-router'
import { EditFilled, LikeFilled, ProfileFilled, StarFilled } from '@ant-design/icons'
import { debounce } from 'lodash-es'
import Directory from './Directory'
import globalStore from '@/layout/store'
import moment from 'moment'

const FloatButton = observer(({ onClick, children }) => {
  return (
    <div className={styles.float} onClick={onClick}>
      {children}
    </div>
  )
})

const Content = ({ store }) => {
  const navigate = useNavigate()
  useMouseWheel()
  const isFixed = useTranscend()

  const like = debounce(() => {
    store.like()
  }, 300)

  const collect = debounce(() => {
    store.collect()
  }, 300)

  const edit = () => {
    navigate('/editor/' + store.articleInfo?.id)
  }

  return (
    <div className={styles.content}>
      <div className={styles.articleContent}>
        <MDEditor.Viewer value={store.articleInfo.content || ''} />
        <div className={styles.time}>
          <div>文章发布于 {moment(store.articleInfo.createdAt).format('YYYY-MM-DD')}</div>
          <div>最后更新于 {moment(store.articleInfo.updatedAt).format('YYYY-MM-DD')}</div>
        </div>
      </div>

      <div
        className={cls(styles.navbar, {
          [styles.fixed]: isFixed
        })}
      >
        <MDEditor.Navbar value={store.articleInfo.content || ''} />
      </div>
      <div
        className={cls(styles.toolBar, {
          [styles.fixed]: isFixed
        })}
      >
        {!!store.articleInfo?.userInfo && (
          <Avatar
            src={store.articleInfo?.userInfo?.avatar?.resource()}
            size={60}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/user/' + store.articleInfo?.userInfo?.id)}
          >
            <Avatar src={config.defaultAvatar} size={60} />
          </Avatar>
        )}
        <FloatButton onClick={() => like()}>
          <LikeFilled
            className={cls(styles.icon, {
              [styles.activeIcon]: store.isLike
            })}
          />
        </FloatButton>
        <FloatButton onClick={collect}>
          <StarFilled
            className={cls(styles.icon, {
              [styles.activeIcon]: store.isCollect
            })}
          />
        </FloatButton>
        {store.articleInfo?.userInfo?.id === globalStore.currentUser.id && (
          <FloatButton onClick={edit}>
            <EditFilled className={cls(styles.icon)} />
          </FloatButton>
        )}
      </div>
      {!store.articleInfo.isComment && <div className={styles.placeholder} />}
      <div className={styles.footer}>
        {!!store.articleInfo?.userInfo && (
          <Avatar
            src={store.articleInfo?.userInfo?.avatar?.resource()}
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/user/' + store.articleInfo?.userInfo?.id)}
          >
            <Avatar src={config.defaultAvatar} />
          </Avatar>
        )}
        <ProfileFilled
          className={cls(styles.icon)}
          onClick={() => (store.mobileDrawerVisible = true)}
        />
        <LikeFilled
          onClick={like}
          className={cls(styles.icon, {
            [styles.activeIcon]: store.isLike
          })}
        />
        <StarFilled
          onClick={collect}
          className={cls(styles.icon, {
            [styles.activeIcon]: store.isCollect
          })}
        />
      </div>
      <Directory store={store} />
    </div>
  )
}

export default observer(Content)
