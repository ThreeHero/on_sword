import { config } from '@/config'
import cls from 'classnames'
import styles from './index.less'
import { useNavigate } from 'react-router'
import { memo } from 'react'

const Logo = memo(() => {
  const navigate = useNavigate()

  return (
    <div className={styles.logo} onClick={() => navigate('/admin')}>
      <div className={cls(styles['logo-bg'])}>{config.appName}</div>
    </div>
  )
})

export default Logo
