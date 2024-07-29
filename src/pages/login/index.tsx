import { observer } from 'mobx-react'

import styles from './styles.less'

const Index = () => {
  return <div className={styles.container}>1</div>
}

export default observer(Index)
