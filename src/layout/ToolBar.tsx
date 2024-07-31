import { observer } from 'mobx-react'
import styles from './index.less'
import store from './store'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'
import { useScroll } from '@/hooks'

const DarkIcon = observer(({ onClick }) => {
  return store.isDark ? (
    <MoonOutlined className={styles.icon} onClick={onClick} />
  ) : (
    <SunOutlined className={styles.icon} spin onClick={onClick} />
  )
})
const ToolBar = () => {
  const { top } = useScroll()

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles['tool-bar']}>
      <div className={styles['scroll-height']} onClick={scrollTop}>
        {top + '%'}
      </div>
      <DarkIcon onClick={() => store.toggleDark()} />
    </div>
  )
}
export default observer(ToolBar)
