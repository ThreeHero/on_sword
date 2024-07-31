import { observer } from 'mobx-react'
import styles from './styles.less'
import store from '../store'
import { detectDeviceType } from '@/utils/base'
import { useNavigate } from 'react-router'

const LoginMenu = observer(() => {
  // 手机端菜单
  const isMobile = detectDeviceType() === 'mobile'
  return isMobile ? <></> : <></>
})

const MenuGroup = () => {
  const navigate = useNavigate()
  return (
    <div className={styles['menu-group']}>
      {store.isLogin ? (
        <LoginMenu />
      ) : (
        <>
          <div className={styles.menuItem} onClick={() => navigate('/essay')}>
            随笔
          </div>
          <div className={styles.loginBtn} onClick={() => navigate('/login')}>
            登录
          </div>
        </>
      )}
    </div>
  )
}

export default observer(MenuGroup)
