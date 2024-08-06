import { MDEditor } from '@/components'
import { observer } from 'mobx-react'
import styles from './styles.less'
import { useTranscend, useMouseWheel } from '@/hooks'
import cls from 'classnames'

const Content = ({ store }) => {
  useMouseWheel()
  const isFixed = useTranscend()

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
    </div>
  )
}

export default observer(Content)
