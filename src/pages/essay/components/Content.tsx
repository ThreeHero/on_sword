import { observer } from 'mobx-react'
import styles from './styles.less'
import cls from 'classnames'
import { CommentInput, EssayItem } from '@/components'
import { useEffect } from 'react'
import { List } from 'antd'
import { config } from '@/config'
import CommentModal from './CommentModal'

const Content = ({ store }) => {
  useEffect(() => {
    store.getEssayList()
  }, [store.essayPage])
  return (
    <div className={styles.content}>
      <div className={cls('containerBox', styles.container)}>
        <CommentInput
          value={store.essayValue}
          onChange={store.setEssayValue}
          onSubmit={store.submitEssay}
        />
        <List
          dataSource={store.essayList}
          renderItem={item => {
            return (
              <EssayItem essay={item} remove={store.removeEssay} showComment={store.showComment} />
            )
          }}
          locale={{
            emptyText: config.emptyText
          }}
          pagination={{
            hideOnSinglePage: true,
            current: store.essayPage,
            total: store.essayTotal,
            pageSize: store.essayPageSize,
            showTotal: total => `共 ${total} 条`,
            onChange: (page, pageSize) => {
              store.essayPage = page
              // store.getRootCommentList()
            }
          }}
        />
      </div>
      <CommentModal store={store} />
    </div>
  )
}

export default observer(Content)
