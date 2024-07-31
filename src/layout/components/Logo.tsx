import { config } from '@/config'
import cls from 'classnames'
import styles from './styles.less'
import { observer } from 'mobx-react'
import { useNavigate } from 'react-router'
const Logo = ({ isBg }) => {
  const navigate = useNavigate()

  return (
    <div className={styles.logo} onClick={() => navigate('/')}>
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
