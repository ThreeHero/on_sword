import { observer } from 'mobx-react'
import styles from './styles.less'
import store from '../store'
import { detectDeviceType } from '@/utils/base'
import { useNavigate } from 'react-router'
import { Fragment } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Avatar, Drawer } from 'antd'
import { config } from '@/config'
import cls from 'classnames'

const menuList = [
  {
    name: '📃 随笔',
    path: '/essay',
    hasLogin: false
  }
]

/**
 * 移动端菜单
 */
const MobileMenu = observer(() => {
  const navigate = useNavigate()

  const jump = (path: string) => {
    store.mobileMenu = false
    navigate(path)
  }
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
        <img
          className={cls(styles.bg, {
            [styles.darkBg]: store.isDark
          })}
          src={config.homeMenuBg}
        />
        {menuList.map(menu => {
          if (menu.hasLogin && !store.isLogin) {
            return <Fragment key={menu.path} />
          }
          return (
            <div className={styles.menuItem} key={menu.path} onClick={() => jump(menu.path)}>
              {menu.name}
            </div>
          )
        })}
        {store.isLogin ? (
          <>
            <div className={styles.menuItem} onClick={() => jump('/user')}>
              👤 个人中心
            </div>
            <div
              className={styles.menuItem}
              onClick={() => {
                store.logout(() => {
                  const pathname = window.location.pathname
                  const path = pathname.split('/')?.[1]
                  if (!path || store.permissionPage.includes(path)) {
                    navigate('/')
                  }
                })
              }}
            >
              ❌ 退出
            </div>
          </>
        ) : (
          <div className={styles.menuItem} onClick={() => jump('/login')}>
            ✨ 登录
          </div>
        )}
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
        // @ts-ignore
        <Avatar src={store.currentUser?.avatar?.resource()}>
          <Avatar src={config.defaultAvatar} />
        </Avatar>
      ) : (
        <div className={styles.loginBtn} onClick={() => navigate('/login')}>
          登录
        </div>
      )}
    </>
  )
})
const MenuGroup = () => {
  const isMobile = detectDeviceType() === 'mobile'

  return <div className={styles['menu-group']}>{isMobile ? <MobileMenu /> : <PCMenu />}</div>
}

export default observer(MenuGroup)
