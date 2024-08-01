import { observer } from 'mobx-react'
import styles from './styles.less'
import store from '../store'
import { detectDeviceType } from '@/utils/base'
import { useNavigate } from 'react-router'
import { Fragment } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Drawer } from 'antd'
import { config } from '@/config'

const menuList = [
  {
    name: '随笔',
    path: '/essay',
    hasLogin: false
  }
]

/**
 * 移动端菜单
 */
const MobileMenu = observer(() => {
  return (
    <div className={styles.mobile}>
      <MenuOutlined className={styles.icon} onClick={() => (store.mobileMenu = true)} />
      <Drawer
        open={store.mobileMenu}
        onClose={() => (store.mobileMenu = false)}
        width={'70vw'}
        placement="left"
        closeIcon={false}
        title={config.mobileMenuTitle}
        className={styles.mobileDrawer}
      >
        <img className={styles.bg} src={config.homeMenuBg} />
        23
      </Drawer>
    </div>
  )
})

/**
 * PC端菜单
 */
const PCMenu = observer(() => {
  const navigate = useNavigate()

  return (
    <>
      {/* 菜单栏 */}
      {menuList.map(menu => {
        if (menu.hasLogin && !store.isLogin) {
          return <Fragment key={menu.path} />
        }
        return (
          <div className={styles.menuItem} key={menu.path} onClick={() => navigate(menu.path)}>
            {menu.name}
          </div>
        )
      })}
      {store.isLogin ? (
        <div className={styles.loginBtn} onClick={() => navigate('/login')}>
          登录
        </div>
      ) : (
        <div>图片</div>
      )}
    </>
  )
})
const MenuGroup = () => {
  const isMobile = detectDeviceType() === 'mobile'

  return <div className={styles['menu-group']}>{isMobile ? <MobileMenu /> : <PCMenu />}</div>
}

export default observer(MenuGroup)
