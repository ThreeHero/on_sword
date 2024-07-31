import { observer } from 'mobx-react'
import styles from './styles.less'

const Content = ({ store }) => {
  return <div className={styles.content}>Content</div>
}
export default observer(Content)
