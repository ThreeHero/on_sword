import { observer } from 'mobx-react'
import store from './store'
import styles from './styles.less'

const MiddlePage = () => {
  return (
    <div className={styles.middle}>
      <div className={styles.btn} onClick={() => store.changePage()}>
        登录注册
      </div>
    </div>
  )
}

export default observer(MiddlePage)
