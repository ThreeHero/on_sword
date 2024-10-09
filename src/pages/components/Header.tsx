import { observer } from 'mobx-react'
import styles from './styles.less'
import { Typewriter } from '@/components'
import { config } from '@/config'
const Header = ({ store }) => {
  return (
    <div className={styles.header}>
      <div className={styles.headerTitle}>{config.homeTitle}</div>
      <Typewriter value={store.writerValue} onClick={store.toggleWriterValue} />
    </div>
  )
}

export default observer(Header)
