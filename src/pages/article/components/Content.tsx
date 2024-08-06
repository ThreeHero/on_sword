import { MDEditor } from '@/components'
import { observer } from 'mobx-react'
import styles from './styles.less'
import { useTranscend, useMouseWheel } from '@/hooks'
import cls from 'classnames'
import { Avatar } from 'antd'
import { config } from '@/config'
import { useNavigate } from 'react-router'
import { LikeFilled, StarFilled } from '@ant-design/icons'
import { debounce } from 'lodash-es'

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

  return (
    <div className={styles.content}>
      <MDEditor.Viewer value={store.articleInfo.content || ''} />
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
      </div>
    </div>
  )
}

export default observer(Content)
