import { observer } from 'mobx-react'
import cls from 'classnames'

import styles from './styles.less'

const Register = () => {
  return (
    <div className={cls(styles.reg, styles.page)}>
      <div className={styles.form}>
        <h1 className={styles.title}>注册</h1>
      </div>
    </div>
  )
}

export default observer(Register)
