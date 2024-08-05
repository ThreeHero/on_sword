import { observer } from 'mobx-react'
import styles from './styles.less'
import { useEffect } from 'react'
import ArticleList from './ArticleList'

const Content = ({ store }) => {
  useEffect(() => {
    store.getArticleList()
  }, [])
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.left}>1</div>
        <div className={styles.right}>
          <ArticleList store={store} />
        </div>
      </div>
    </div>
  )
}
export default observer(Content)
