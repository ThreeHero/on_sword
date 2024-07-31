import { observer } from 'mobx-react'
import styles from './index.less'
import store from './store'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

const DarkIcon = observer(({ onClick }) => {
  return store.isDark ? (
    <MoonOutlined className={styles.icon} onClick={onClick} />
  ) : (
    <SunOutlined className={styles.icon} spin onClick={onClick} />
  )
})
const ToolBar = () => {
  return (
    <div className={styles['tool-bar']}>
      <DarkIcon onClick={() => store.toggleDark()} />
    </div>
  )
}
export default observer(ToolBar)
