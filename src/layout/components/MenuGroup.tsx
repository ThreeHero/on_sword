import { observer } from 'mobx-react'
import styles from './styles.less'
import { getUserinfo } from '@/utils'

const currentUser = getUserinfo()

const MenuGroup = () => {
  return (
    <div className={styles['menu-group']}>
      {/* 登录按钮 */}
      <div></div>
    </div>
  )
}

export default observer(MenuGroup)
