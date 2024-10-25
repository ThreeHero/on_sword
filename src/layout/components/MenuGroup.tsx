import { observer } from 'mobx-react'
import styles from './styles.less'
import store from '../store'
import { detectDeviceType } from '@/utils/base'
import { useNavigate } from 'react-router'
import { Fragment, useEffect } from 'react'
import { MenuOutlined } from '@ant-design/icons'
import { Avatar, Badge, Drawer, Dropdown } from 'antd'
import { config } from '@/config'
import cls from 'classnames'

const menuList = [
  // {
  //   name: '🔍 搜索',
  //   path: '/search',
  //   hasLogin: false
  // },
  {
    name: '📃 随笔',
    path: '/essay',
    hasLogin: false
  },
  {
    name: '📢 通知',
    path: '/notify',
    hasLogin: true,
    isBadge: true
  },
  {
    name: '📝 写文章',
    path: '/editor',
    hasLogin: true,
    isPC: true
  },
  {
    name: '💻 后台',
    path: '/admin',
    hasLogin: true,
    isPC: true,
    isAuth: true
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
          if (menu.isPC) {
            return <Fragment key={menu.path} />
          }
          if (menu.isBadge) {
            return (
              <div className={styles.menuItem} key={menu.path} onClick={() => jump(menu.path)}>
                <Badge count={store.unreadNotifyCount} size="small" key={menu.path}>
                  {menu.name}
                </Badge>
              </div>
            )
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
                  if (store.permissionPage.includes(path)) {
                    navigate('/')
                  } else {
                    window.location.reload()
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

  const items = [
    {
      key: '/user',
      label: '个人中心'
    },
    {
      key: 'logout',
      danger: true,
      label: '退出登录'
    }
  ]

  const handleClick = ({ key }) => {
    if (key === 'logout') {
      store.logout(() => {
        const pathname = window.location.pathname
        const path = pathname.split('/')?.[1]
        if (store.permissionPage.includes(path)) {
          navigate('/')
        } else {
          window.location.reload()
        }
      })
    }
    if (key.startsWith('/')) {
      navigate(key)
    }
  }

  return (
    <>
      {/* 菜单栏 */}
      {menuList.map(menu => {
        // 只有0为普通用户
        if (menu.isAuth && store.currentUser?.identity === 0) {
          return <Fragment key={menu.path} />
        }
        if (menu.hasLogin && !store.isLogin) {
          return <Fragment key={menu.path} />
        }
        if (menu.isBadge) {
          return (
            <div className={styles.menuItem} key={menu.path} onClick={() => navigate(menu.path)}>
              <Badge count={store.unreadNotifyCount} size="small" key={menu.path}>
                {menu.name}
              </Badge>
            </div>
          )
        }
        return (
          <div className={styles.menuItem} key={menu.path} onClick={() => navigate(menu.path)}>
            {menu.name}
          </div>
        )
      })}
      {store.isLogin ? (
        <Dropdown menu={{ items, onClick: handleClick }} trigger={['click']}>
          {/* @ts-ignore */}
          <Avatar src={store.currentUser?.avatar?.resource()}>
            <Avatar src={config.defaultAvatar} />
          </Avatar>
        </Dropdown>
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
