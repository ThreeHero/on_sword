import { Layout, Menu } from 'antd'
import styles from './index.less'
import { useMemo, useState } from 'react'
import menu from './menu.json'
import { useNavigate, useLocation } from 'react-router'
import { getCache, setCache } from '@/utils'

const Sider = () => {
  const [isFold, setIsFold] = useState(() => {
    return !!getCache('isFold', false)
  })
  const location = useLocation()
  const navigate = useNavigate()

  const { pathname } = location

  const activeKey = useMemo(() => {
    const key = pathname.replace('/admin', '')
    if (key.length === 0) return '/'
    return key
  }, [pathname])

  return (
    <Layout.Sider
      className={styles.sider}
      collapsed={isFold}
      collapsible
      onCollapse={v => {
        setIsFold(v)
        setCache('isFold', v, false)
      }}
    >
      <Menu
        mode="inline"
        items={menu}
        defaultOpenKeys={activeKey.split('/')}
        defaultSelectedKeys={[activeKey]}
        className={styles.menu}
        onClick={({ key }) => {
          if (key === '/') key = ''
          navigate('/admin' + key)
        }}
      />
    </Layout.Sider>
  )
}

export default Sider
