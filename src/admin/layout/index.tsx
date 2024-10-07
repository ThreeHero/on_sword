import { FC, useEffect } from 'react'
import { getUserinfo, detectDeviceType } from '@/utils'
import { Outlet, useNavigate } from 'react-router'
import { message, Layout as AntdLayout } from 'antd'
import Content from './Content'
import { useTitle } from '@/hooks'
import { config } from '@/config'
import Header from './Header'
import Sider from './Sider'
import styles from './index.less'

const Layout: FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    // 判断账号权限 判断是否pc
    const userInfo = getUserinfo()

    const { identity } = userInfo || {}
    const isMobile = detectDeviceType() === 'mobile'
    if (identity === 0 || isMobile) {
      message.info('暂不支持访问管理系统')
      navigate('/', {
        replace: true
      })
    }
  }, [])

  useTitle(config.appName + '后台管理系统')

  useEffect(() => {
    const shield = e => e.preventDefault()
    document.addEventListener('contextmenu', shield)

    return () => {
      document.removeEventListener('contextmenu', shield)
    }
  }, [])

  return (
    <AntdLayout className={styles.layout}>
      <Header />
      <AntdLayout>
        <Sider />
        <Content>
          <Outlet />
        </Content>
      </AntdLayout>
    </AntdLayout>
  )
}

export default Layout
