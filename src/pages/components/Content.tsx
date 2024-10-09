import { observer } from 'mobx-react'
import styles from './styles.less'
import { useEffect } from 'react'
import ArticleList from './ArticleList'
import ClassList from './ClassList'

const Content = ({ store }) => {
  useEffect(() => {
    store.currentPage = 1
    store.getArticleList()
  }, [store.isMine])
  return (
    <div className={styles.content}>
      <div className={styles.container}>
        <div className={styles.left}>
          <ClassList store={store} />
        </div>
        <div className={styles.right}>
          <ArticleList store={store} />
        </div>
      </div>
    </div>
  )
}
export default observer(Content)
