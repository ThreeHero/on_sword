import { config } from '@/config'
import cls from 'classnames'
import styles from './styles.less'
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

export default Logo
