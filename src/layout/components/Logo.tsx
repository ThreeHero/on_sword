import { config } from '@/config'
import cls from 'classnames'
import styles from './styles.less'
import { observer } from 'mobx-react'
const Logo = ({ isBg }) => {
  return (
    <div className={styles.logo}>
      <div
        className={cls(styles['logo-bg'], {
          [styles['is-bg']]: isBg
        })}
      >
        {config.appName}
      </div>
    </div>
  )
}

export default observer(Logo)
