import { Layout, Dropdown, Avatar, Space, Modal } from 'antd'
import styles from './index.less'
import Logo from './Logo'
import { config } from '@/config'
import { useNavigate } from 'react-router'
import globalStore from '@/layout/store'
import { observer } from 'mobx-react'
import { MoonOutlined, SunOutlined } from '@ant-design/icons'

const items = [
  {
    key: 'goHome',
    label: '回到首页'
  },
  {
    key: 'logout',
    danger: true,
    label: '退出登录'
  }
]

const DarkIcon = observer(({ onClick }) => {
  return globalStore.isDark ? (
    <MoonOutlined className={styles.icon} onClick={onClick} />
  ) : (
    <SunOutlined className={styles.icon} spin onClick={onClick} />
  )
})

const Header = () => {
  const navigate = useNavigate()
  const userInfo = globalStore.currentUser || {}

  return (
    <Layout.Header className={styles.header}>
      <Logo />
      <Space size={20}>
        <div className={styles.nickname}>{userInfo?.nickname}</div>
        <DarkIcon onClick={() => globalStore.toggleDark()} />
        <Dropdown
          menu={{
            items,
            onClick: ({ key }) => {
              if (key === 'logout') {
                Modal.confirm({
                  okText: '确定',
                  cancelText: '取消',
                  title: '提示',
                  content: '确定退出登录吗？',
                  onOk: () => globalStore.logout(() => navigate('/'))
                })
              } else if (key === 'goHome') {
                navigate('/', { replace: true })
              }
            }
          }}
        >
          <Avatar src={userInfo?.avatar?.resource()} style={{ cursor: 'pointer' }}>
            <Avatar src={config.defaultAvatar} />
          </Avatar>
        </Dropdown>
      </Space>
    </Layout.Header>
  )
}

export default observer(Header)
