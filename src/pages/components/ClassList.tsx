import { observer } from 'mobx-react'
import styles from './styles.less'
import { useEffect } from 'react'
import cls from 'classnames'
import { Switch } from 'antd'

const ClassList = ({ store }) => {
  useEffect(() => {
    store.getClassList()
  }, [])

  const changeClass = key => {
    if (key !== store.activeClass) {
      store.activeClass = key
      store.currentPage = 1
      store.getArticleList()
    }
  }

  return (
    <div className={styles.class}>
      <div style={{ marginBottom: 16 }}>
        <Switch
          value={store.isMine}
          onChange={v => (store.isMine = v)}
          style={{ width: '100%' }}
          checkedChildren="我可查看"
          unCheckedChildren="全部文章"
        />
      </div>
      <div
        className={cls(styles.classItem, {
          [styles.activeClass]: 'all' === store.activeClass
        })}
        onClick={() => changeClass('all')}
      >
        综合
      </div>
      {store.classList?.map(classItem => {
        return (
          <div
            className={cls(styles.classItem, {
              [styles.activeClass]: classItem.id === store.activeClass
            })}
            key={classItem.id}
            onClick={() => changeClass(classItem.id)}
          >
            {classItem.name}
          </div>
        )
      })}
    </div>
  )
}

export default observer(ClassList)
