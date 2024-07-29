import { observer } from 'mobx-react'
import cls from 'classnames'

import styles from './styles.less'

const Login = () => {
  return (
    <div className={cls(styles.login, styles.page)}>
      <div className={styles.form}>
        <h1 className={styles.title}>登录</h1>
      </div>
    </div>
  )
}

export default observer(Login)
