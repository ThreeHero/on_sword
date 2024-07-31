import { observer } from 'mobx-react'
import styles from './styles.less'

const Content = ({ store }) => {
  return (
    <div className={styles.content}>
      <div className={styles.container}>content</div>
    </div>
  )
}
export default observer(Content)
