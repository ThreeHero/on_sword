import { Layout } from 'antd'
import styles from './index.less'

const Content = ({ children }) => {
  return <Layout.Content className={styles.content}>{children}</Layout.Content>
}

export default Content
