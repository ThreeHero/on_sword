import { observer } from 'mobx-react'
import styles from './styles.less'
import cls from 'classnames'
import { CommentInput, EssayItem } from '@/components'
import { useEffect } from 'react'
import { List } from 'antd'
import { config } from '@/config'

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
            return <EssayItem essay={item} />
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
    </div>
  )
}

export default observer(Content)
