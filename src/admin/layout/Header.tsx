import { Layout } from 'antd'
import styles from './index.less'
import Logo from './Logo'

const Header = () => {
  return (
    <Layout.Header className={styles.header}>
      <Logo />
      {/* TODO */}
      <div>info</div>
    </Layout.Header>
  )
}

export default Header
